export interface OpelDealerRaw {
    dealerName: string;
    generalContact?: {
        phone1?: string;
        email?: string;
    };
    dealerUrl?: string;
    geolocation?: {
        latitude?: string;
        longitude?: string;
    };
    address?: {
        addressLine1?: string;
        postalCode?: string;
        cityName?: string;
    };
}
