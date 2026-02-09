import type { Request, Response } from "express";
import { findDealersInRadius } from "../repositories/dealers.repository.js";
import { buildDealersXlsx } from "../services/dealers-export.service.js";

export async function exportDealersController(
    req: Request,
    res: Response
) {
    const { query, radius, brands } = req.query;

    if (!query || !radius) {
        return res.status(400).json({
            message: "query und radius sind erforderlich"
        });
    }

    const parsedBrands =
        typeof brands === "string" ? brands.split(",") : undefined;

    const dealers = await findDealersInRadius({
        query: String(query),
        radiusKm: Number(radius),
        brands: parsedBrands
    });

    console.log("EXPORT DEALERS COUNT:", dealers.length);

    const buffer = buildDealersXlsx(dealers);

    res.setHeader(
        "Content-Disposition",
        'attachment; filename="dealers.xlsx"'
    );
    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.send(buffer);
}
