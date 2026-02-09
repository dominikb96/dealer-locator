CREATE TABLE IF NOT EXISTS dealers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  street TEXT NOT NULL,
  zip TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'DE',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  phone TEXT,
  email TEXT,
  website TEXT
);

CREATE INDEX IF NOT EXISTS idx_dealers_zip ON dealers(zip);
CREATE INDEX IF NOT EXISTS idx_dealers_city ON dealers(city);
CREATE INDEX IF NOT EXISTS idx_dealers_brand ON dealers(brand);
CREATE INDEX IF NOT EXISTS idx_dealers_lat_lon ON dealers(latitude, longitude);
