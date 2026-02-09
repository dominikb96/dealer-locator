export const BRANDS = ["KIA", "SEAT", "OPEL"] as const;

export type Brand = typeof BRANDS[number];
