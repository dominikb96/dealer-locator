import fs from "fs";
import axios from "axios";
import { stringify } from "csv-stringify/sync";
import { mapSeatDealer } from "./mappers/seat.mapper";

const SEAT_API =
    "https://haendlersuche.seat.de///tmp/b93b5efda7f2cc5a13f0ae5bbb3c9981.cache?ver=559";

async function run() {
    const res = await axios.get(SEAT_API);

    const rawDealers = res.data?.allDealers?.v;

    if (!Array.isArray(rawDealers)) {
        throw new Error("SEAT API response does not contain dealer list");
    }

    const dealers = rawDealers.map(mapSeatDealer);

    const csv = stringify(dealers, {
        header: true,
        columns: [
            "name",
            "brand",
            "street",
            "zip",
            "city",
            "country",
            "latitude",
            "longitude",
            "phone",
            "email",
            "website"
        ]
    });

    fs.writeFileSync("data/seat_dealers.csv", csv);
    console.log(`✅ Exported ${dealers.length} SEAT dealers`);
}

run().catch((err) => {
    console.error("❌ SEAT export failed", err);
    process.exit(1);
});
