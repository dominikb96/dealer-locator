import { pool } from "../db.js";

type SearchParams = {
  query: string;
  radiusKm: number;
  brands?: string[];
};

export async function findDealersInRadius({
  query,
  radiusKm,
  brands
}: SearchParams) {
  const values: any[] = [query, radiusKm];
  let brandFilter = "";

  if (brands && brands.length > 0) {
    values.push(brands);
    brandFilter = `AND brand = ANY($${values.length})`;
  }
  const sql = `
  SELECT
    d.id,
    d.name,
    d.brand,
    d.city,
    d.street,
    d.zip,
    d.latitude,
    d.longitude,
    d.phone,
    d.email,
    d.website,
    (
      6371 * acos(
        cos(radians(ref.latitude)) *
        cos(radians(d.latitude)) *
        cos(radians(d.longitude) - radians(ref.longitude)) +
        sin(radians(ref.latitude)) *
        sin(radians(d.latitude))
      )
    ) AS distance_km
  FROM dealers d
  CROSS JOIN (
    SELECT latitude, longitude
    FROM dealers
    WHERE city ILIKE '%' || $1 || '%' OR zip = $1
    LIMIT 1
  ) ref
  WHERE (
    6371 * acos(
      cos(radians(ref.latitude)) *
      cos(radians(d.latitude)) *
      cos(radians(d.longitude) - radians(ref.longitude)) +
      sin(radians(ref.latitude)) *
      sin(radians(d.latitude))
    )
  ) <= $2
  ${brandFilter}
  ORDER BY distance_km ASC;
`;

  const result = await pool.query(sql, values);
  return result.rows;
}
