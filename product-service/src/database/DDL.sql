CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS products (
	id UUID DEFAULT	uuid_generate_v4() PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT,
	price MONEY,
	src TEXT
);

CREATE TABLE IF NOT EXISTS stocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID UNIQUE,
  count INTEGER,
  CONSTRAINT fk_product 
  FOREIGN KEY(product_id) 
  REFERENCES products(id) ON DELETE CASCADE
);
