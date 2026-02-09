import type { Request, Response } from "express";
import { findDealersInRadius } from "../repositories/dealers.repository.js";

export async function searchDealersController(
    req: Request,
    res: Response
) {
    const { query, radius, brands } = req.query;

    if (!query || !radius) {
        return res.status(400).json({
            message: "query und radius sind erforderlich"
        });
    }

    const parsedRadius = Number(radius);
    const parsedBrands =
        typeof brands === "string" ? brands.split(",") : undefined;

    try {
        const dealers = await findDealersInRadius({
            query: String(query),
            radiusKm: parsedRadius,
            brands: parsedBrands
        });

        res.json(dealers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Interner Serverfehler" });
    }
}
