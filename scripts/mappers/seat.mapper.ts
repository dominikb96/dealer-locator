import type { Dealer } from "../../packages/shared/src/types/dealer";
import type { SeatDealerRaw } from "../types/seat-dealer.raw";

export function mapSeatDealer(raw: SeatDealerRaw): Dealer {
    return {
        name: raw.NAME1,
        brand: "SEAT",
        street: raw.STRAßE,
        zip: raw.PLZ,
        city: raw.ORT,
        country: "DE",
        latitude: Number(raw.XPOS),
        longitude: Number(raw.YPOS),
        phone: raw.TELEFON || undefined,
        email: raw.EMAIL || undefined,
        website: raw.URL || undefined
    };
}
