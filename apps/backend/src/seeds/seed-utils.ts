import { pool } from "../db.js"
import type { Dealer } from "@dealer-locator/shared";

export async function clearDealers() {
    await pool.query("TRUNCATE dealers RESTART IDENTITY CASCADE");
}

export async function insertDealers(dealers: Dealer[]) {
    for (const d of dealers) {
        await pool.query(
            `
      INSERT INTO dealers
      (name, brand, street, zip, city, country, latitude, longitude, phone, email, website)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
      `,
            [
                d.name,
                d.brand,
                d.street,
                d.zip,
                d.city,
                d.country,
                d.latitude,
                d.longitude,
                d.phone ?? null,
                d.email ?? null,
                d.website ?? null
            ]
        );
    }
}
