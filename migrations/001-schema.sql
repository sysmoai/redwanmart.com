-- Redwan Mart Database Schema
-- Cloudflare D1

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT DEFAULT '',
  images JSON DEFAULT '[]',
  category_id INTEGER REFERENCES categories(id),
  stock INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  parent_id INTEGER REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  items JSON NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  r2_url TEXT,
  mime_type TEXT,
  size_bytes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at);

-- Seed categories
INSERT OR IGNORE INTO categories (id, slug, name, parent_id) VALUES
  (1, 'electronics', 'Electronics', NULL),
  (2, 'fashion', 'Fashion', NULL),
  (3, 'home-living', 'Home & Living', NULL),
  (4, 'beauty', 'Beauty', NULL),
  (5, 'sports', 'Sports', NULL),
  (6, 'books', 'Books', NULL),
  (7, 'toys', 'Toys', NULL),
  (8, 'food', 'Food', NULL);

-- Seed sample products
INSERT OR IGNORE INTO products (id, slug, title, price, description, images, category_id, stock) VALUES
  (1, 'premium-wireless-earbuds', 'Premium Wireless Earbuds', 2499, 'High-quality wireless earbuds with noise cancellation and 30-hour battery life.', '["https://placehold.co/400x400/EC1713/FFFFFF?text=Earbuds"]', 1, 50),
  (2, 'classic-cotton-tshirt', 'Classic Cotton T-Shirt', 799, '100% cotton, comfortable fit for everyday wear.', '["https://placehold.co/400x400/FFB805/000000?text=TShirt"]', 2, 100),
  (3, 'smart-led-bulb', 'Smart LED Bulb', 1299, 'WiFi-enabled smart bulb with app control and 16 million colors.', '["https://placehold.co/400x400/16A34A/FFFFFF?text=Bulb"]', 3, 75),
  (4, 'organic-face-cream', 'Organic Face Cream', 549, 'Natural ingredients for glowing, healthy skin.', '["https://placehold.co/400x400/EC1713/FFFFFF?text=Cream"]', 4, 200),
  (5, 'yoga-mat-premium', 'Premium Yoga Mat', 1899, 'Non-slip, eco-friendly yoga mat with carrying strap.', '["https://placehold.co/400x400/FFB805/000000?text=Yoga"]', 5, 30),
  (6, 'bestseller-novel-set', 'Bestseller Novel Set', 699, 'Collection of top-rated novels — 5 books in one set.', '["https://placehold.co/400x400/16A34A/FFFFFF?text=Books"]', 6, 60),
  (7, 'kids-building-blocks', 'Kids Building Blocks', 999, 'Creative building blocks set for children ages 3+.', '["https://placehold.co/400x400/EC1713/FFFFFF?text=Toys"]', 7, 40),
  (8, 'organic-honey-jar', 'Organic Honey Jar', 449, 'Pure organic honey sourced from local farms.', '["https://placehold.co/400x400/FFB805/000000?text=Honey"]', 8, 150);
