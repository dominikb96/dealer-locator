import { readFileSync } from "fs";
import path from "path";
import { pool } from "../db.js"

async function init() {
    const sqlPath = path.resolve("sql/init.sql");
    const sql = readFileSync(sqlPath, "utf-8");

    await pool.query(sql);
    console.log("✅ Database schema created");
    await pool.end();
}

init().catch((err) => {
    console.error("❌ Failed to init database", err);
    process.exit(1);
});
