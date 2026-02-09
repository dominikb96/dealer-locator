import type { Dealer } from "@dealer-locator/shared";

export const dealersMock: Dealer[] = [
    {
        name: "Autohaus Müller",
        brand: "KIA",
        street: "Hauptstraße 1",
        zip: "10115",
        city: "Berlin",
        country: "DE",
        latitude: 52.532,
        longitude: 13.384,
        phone: "030123456",
        email: "kontakt@autohaus-mueller.de",
    },
    {
        name: "Seat Zentrum Hamburg",
        brand: "SEAT",
        street: "Altonaer Straße 5",
        zip: "22765",
        city: "Hamburg",
        country: "DE",
        latitude: 53.553,
        longitude: 9.935,
    },
    {
        name: "Autohaus Schneider",
        brand: "OPEL",
        street: "Marktplatz 1",
        zip: "80331",
        city: "München",
        phone: "089-555555",
        email: "service@opel-schneider.de",
        latitude: 48.137,
        longitude: 11.575,
        country: "DE",
    }
];
