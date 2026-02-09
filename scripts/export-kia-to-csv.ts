import axios from "axios";
import fs from "fs";
import { stringify } from "csv-stringify/sync";
import { mapKiaDealer } from "./mappers/kia.mapper";

const KIA_API =
    "https://www.kia.com/api/bin/dealer?locale=de-de&program=dealerLocatorSearch";

async function run() {
    const res = await axios.get(KIA_API);
    const rawDealers = res.data.list;
    const dealers = rawDealers.map(mapKiaDealer);
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
    fs.writeFileSync("data/kia_dealers.csv", csv);
    console.log(`✅ Exported ${dealers.length} KIA dealers`);
}

run().catch(console.error);
