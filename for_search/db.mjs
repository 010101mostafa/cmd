import Database from 'better-sqlite3';
import fs from 'fs';
import * as sqliteVec from 'sqlite-vec';
import path from 'path';
const dir = import.meta.dirname;
export const dbPath = path.join(dir, '/.db/database.db');
export const db = new Database(dbPath, { verbose: (sql) => {
    const line = `[${new Date().toISOString()}] run sql: \n\t${sql.replace(/\n/g, '\n\t')} \n`;
    fs.appendFileSync(path.join(dir, '/.db/db.log'), line);
} });
// Load sqlite-vec extension for vector support
sqliteVec.load(db);
db.pragma('journal_mode = WAL');