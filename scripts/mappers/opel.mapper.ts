import type { Dealer } from "../../packages/shared/src/types/dealer";
import type { OpelDealerRaw } from "../types/opel-dealer.raw";

export function mapOpelDealer(raw: OpelDealerRaw): Dealer {
    return {
        name: raw.dealerName,
        brand: "OPEL",
        street: raw.address?.addressLine1 ?? "",
        zip: raw.address?.postalCode ?? "",
        city: raw.address?.cityName ?? "",
        country: "DE",
        latitude: Number(raw.geolocation?.latitude),
        longitude: Number(raw.geolocation?.longitude),
        phone: raw.generalContact?.phone1 || undefined,
        email: raw.generalContact?.email || undefined,
        website: raw.dealerUrl || undefined
    };
}
