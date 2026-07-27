import { db } from "./db.mjs";
import { getEmbedding } from "./embedding.mjs";

function indexsql(resource, indexFields) {
    return `SElECT * FROM ${resource} 
        where _index MATCH %?%
    ORDER BY id LIMIT ? OFFSET ?
    `;
}
export async function search(resource, options) {
    const { query, limit = 10, offset = 0, semantic = false, fulltext = false , stats = false} = options;
    let result = [];
    if (stats) {
        return getStats(resource);
    }
    if (semantic) {
            const embedding = await getEmbedding(query);
            result = db.prepare(`SELECT r.* 
                FROM ${resource} r
                JOIN vec_${resource} v ON r.id = v.rowid
                WHERE v.embedding MATCH ?
                ORDER BY distance  LIMIT ? OFFSET ?`).all(embedding, limit, offset);
    }
    else if (fulltext) {
        result = db.prepare(`SELECT * FROM ${resource} 
            WHERE fulltext LIKE ?
            ORDER BY id LIMIT ? OFFSET ?
        `).all(`%${query}%`, limit, offset);
    }
    else {
    result = db.prepare(`SELECT * FROM ${resource} 
        WHERE _index LIKE ?
        ORDER BY id LIMIT ? OFFSET ?
    `).all(`%${query}%`, limit, offset);
    }
    result = result.map(r => JSON.parse(r.fulltext));
    if(result.length === 1) {
        return result[0];
    }
    return result;
}
function getStats(resource) {
    const count = db.prepare(`SELECT COUNT(*) as count FROM ${resource}`).get().count;
    return { count };
}