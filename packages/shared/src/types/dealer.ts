import { Brand } from "./brand.js";

export interface Dealer {
    name: string;
    brand: Brand;
    street: string;
    zip: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    phone?: string;
    email?: string;
    website?: string;
}

export interface DealerWithDistance {
    id: number;
    name: string;
    brand: Brand;
    city: string;
    latitude: number;
    longitude: number;
    phone?: string;
    email?: string;
    website?: string;
    distance_km: number;
}
