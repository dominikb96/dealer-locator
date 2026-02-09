import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { clearDealers, insertDealers } from "./seed-utils.js";
import type { Dealer } from "@dealer-locator/shared";
import { parseBrand } from "./parsers/parseBrand.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "../../../../");

const CSV_FILES = [
    "data/kia_dealers.csv",
    "data/seat_dealers.csv",
    "data/opel_dealers.csv"
];

function readCsv(file: string): Promise<Dealer[]> {
    return new Promise((resolve, reject) => {
        const dealers: Dealer[] = [];

        const absolutePath = path.join(PROJECT_ROOT, file);

        fs.createReadStream(absolutePath)
            .pipe(csv())
            .on("data", (row) => {
                dealers.push({
                    name: row.name,
                    brand: parseBrand(row.brand),
                    street: row.street,
                    zip: row.zip,
                    city: row.city,
                    country: row.country,
                    latitude: Number(row.latitude),
                    longitude: Number(row.longitude),
                    phone: row.phone || undefined,
                    email: row.email || undefined,
                    website: row.website || undefined
                });
            })
            .on("end", () => resolve(dealers))
            .on("error", reject);
    });
}

async function run() {
    await clearDealers();

    for (const file of CSV_FILES) {
        const dealers = await readCsv(file);
        await insertDealers(dealers);
        console.log(`📥 Imported ${dealers.length} dealers from ${file}`);
    }

    console.log("✅ Real dealer data seeded");
    process.exit(0);
}

run().catch(console.error);
