CREATE TYPE product_categories AS ENUM ('FASHION', 'GROCERY', 'ELECTRONICS', 'MOBILE_PHONES');

CREATE TABLE products (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(64) NOT NULL, 
  price integer NOT NULL,
  category product_categories
);