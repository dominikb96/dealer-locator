import axios from "axios";
import type { DealerWithDistance } from "@dealer-locator/shared";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export async function searchDealers(params: {
    query: string;
    radius: number;
    brands: string[];
}): Promise<DealerWithDistance[]> {
    const { query, radius, brands } = params;

    const response = await api.get<DealerWithDistance[]>("/dealers", {
        params: {
            query,
            radius,
            brands: brands.length && !brands.includes("Alle")
                ? brands.join(",")
                : undefined
        }
    });

    return response.data;
}
