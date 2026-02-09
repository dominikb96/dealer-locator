import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "dealer_user",
    password: "dealer_password",
    database: "dealer_locator"
});
