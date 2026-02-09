import type { Dealer } from "../../packages/shared/src/types/dealer";
import type { KiaDealerRaw } from "../types/kia-dealer.raw";

export function mapKiaDealer(raw: KiaDealerRaw): Dealer {
    return {
        name: raw.dealerName,
        brand: "KIA",
        street: raw.dealerAddress,
        zip: raw.dealerPostcode,
        city: raw.dealerResidence,
        country: raw.dealerCountry.toUpperCase(),
        latitude: Number(raw.dealerLatitude),
        longitude: Number(raw.dealerLongitude),
        phone: raw.dealerPhone || undefined,
        email: raw.dealerEmail || undefined,
        website: raw.websiteUrl || undefined
    };
}
