CREATE TYPE order_status AS ENUM ('ACTIVE', 'COMPLETE');

CREATE TABLE orders (
  id SERIAL PRIMARY KEY, 
  status order_status DEFAULT 'ACTIVE' NOT NULL, 
  user_id bigint REFERENCES users(id)
);