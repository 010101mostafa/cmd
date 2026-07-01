import { db  } from './db.mjs';
import fs from 'fs';
import path, { basename } from 'path';
import { getEmbedding } from './embedding.mjs';
const dir = import.meta.dirname;
const paths = {
    tables: path.join(dir, 'tables.sql')
}
function tableSql(type) {
    return `CREATE TABLE IF NOT EXISTS ${type} (
        id INTEGER PRIMARY KEY,
        _index TEXT NOT NULL,
        fulltext TEXT NOT NULL,
        _embedding float[768]
    );

    CREATE VIRTUAL TABLE IF NOT EXISTS vec_${type} USING vec0(
        embedding float[768]
    );
    DELETE FROM ${type};
    DELETE FROM vec_${type};
    `
}
export function init(jsonFilePath,index) {
    console.log("Initializing SQLite and vectors...");
    const type = basename(jsonFilePath, '.json');
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
    
    // run the SQL script to create tables
    db.exec(tableSql(type));
    for (const item of data) {
        const fulltext = JSON.stringify(item);
        const indexStr = JSON.stringify(index.map(i => item[i]));
        db.prepare(`INSERT INTO ${type} (_index, fulltext) VALUES (?, ?)`).run(indexStr, fulltext);
    }
    console.log("Initialization complete.");
}
export async function embedding(type) {
    const rows = db.prepare(`SELECT id, _index FROM ${type} WHERE _embedding IS NULL`).all();
    for (const row of rows) {
        const embedding = await getEmbedding(row._index);
        db.prepare(`UPDATE ${type} SET _embedding = ? WHERE id = ?`).run(embedding, row.id);
        db.prepare(`INSERT INTO vec_${type} (rowid, embedding) VALUES (?, ?)`).run(row.id, embedding);
    }
}