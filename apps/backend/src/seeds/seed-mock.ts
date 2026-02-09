import { clearDealers, insertDealers } from "./seed-utils.js";
import { dealersMock } from "../data/dealers.mock.js";

async function run() {
    await clearDealers();
    await insertDealers(dealersMock);

    console.log("✅ Mock dealers seeded");
    process.exit(0);
}

run().catch(console.error);
