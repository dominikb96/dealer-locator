import type { Dealer } from "@dealer-locator/shared";

export async function getDealers() {
    const response = await fetch("http://localhost:3000/api/dealers");

    if (!response.ok) {
        throw new Error("get Dealers call failed");
    }

    return response.json() as Promise<{ dealers: Array<Dealer> }>;
}

export async function getDealersRad(lat: number, long: number, radiusKm: number) {
    const response = await fetch("http://localhost:3000/api/dealers/radius?lat=" + lat + "&lng=" + long + "&radius=" + radiusKm);

    if (!response.ok) {
        throw new Error("get DealersRad call failed");
    }

    return response.json() as Promise<{ dealers: Array<Dealer> }>;
}