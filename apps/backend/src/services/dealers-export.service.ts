import * as XLSX from "xlsx";

type DealerExportRow = {
    Name: string;
    Marke: string;
    Straße: string;
    PLZ: string;
    Ort: string;
    Telefon?: string;
    EMail?: string;
    Website?: string;
    Entfernung_km: number;
};

export function buildDealersXlsx(dealers: any[]): Buffer {
    const rows: DealerExportRow[] = dealers.map((d) => ({
        Name: d.name,
        Marke: d.brand,
        Straße: d.street,
        PLZ: d.zip,
        Ort: d.city,
        Telefon: d.phone ?? "",
        EMail: d.email ?? "",
        Website: d.website ?? "",
        Entfernung_km: Number(d.distance_km.toFixed(2))
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    worksheet["!cols"] = [
        { wch: 30 }, // Name
        { wch: 10 }, // Marke
        { wch: 30 }, // Straße
        { wch: 10 }, // PLZ
        { wch: 20 }, // Ort
        { wch: 18 }, // Telefon
        { wch: 25 }, // E-Mail
        { wch: 35 }, // Website
        { wch: 15 }  // Entfernung_km
    ];

    XLSX.utils.book_append_sheet(workbook, worksheet, "Händler");

    return XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx"
    });
}
