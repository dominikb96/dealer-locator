import { BRANDS } from "@dealer-locator/shared";
import type { Brand } from "@dealer-locator/shared";

export function parseBrand(value: string): Brand {
    const normalized = value.trim().toUpperCase();

    if (!BRANDS.includes(normalized as Brand)) {
        throw new Error(`Invalid brand in CSV: "${value}"`);
    }

    return normalized as Brand;
}
