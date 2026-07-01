import { db } from "./db.mjs";
import { getEmbedding } from "./embedding.mjs";

function indexsql(resource, indexFields) {
    return `SElECT * FROM ${resource} 
        where _index MATCH %?%
    ORDER BY id LIMIT ? OFFSET ?
    `;
}
export async function search(resource, options) {
    const { query, limit = 10, offset = 0, semantic = false, fulltext = false, output } = options;
    let result = [];
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
    if (output) {
        result = result.map(r => r[output]);
    }
    if(result.length === 1) {
        return result[0];
    }
    return result;
}