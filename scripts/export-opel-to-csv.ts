import fs from "fs";
import axios from "axios";
import { stringify } from "csv-stringify/sync";
import { mapOpelDealer } from "./mappers/opel.mapper";

const OPEL_API =
    "https://www.opel.de/apps/atomic/DealersServlet?distance=300&latitude=52.51604&longitude=13.37691&maxResults=1000&orderResults=false&path=L2NvbnRlbnQvb3BlbC93b3JsZHdpZGUvZ2VybWFueS9kZQ%3D%3D&searchType=latlong";

async function run() {
    const res = await axios.get(OPEL_API);

    const rawDealers = res.data?.payload?.dealers;

    if (!Array.isArray(rawDealers)) {
        throw new Error("Opel API response does not contain dealer list");
    }

    const dealers = rawDealers.map(mapOpelDealer);

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

    fs.writeFileSync("data/opel_dealers.csv", csv);
    console.log(`✅ Exported ${dealers.length} Opel dealers`);
}

run().catch((err) => {
    console.error("❌ Opel export failed", err);
    process.exit(1);
});
