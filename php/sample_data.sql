USE electronics_store;

-- Insert default user (username: admin, password: admin123)
INSERT INTO users (username, email, password_hash) VALUES (
    'admin',
    'admin@example.com',
    -- Password hash for 'admin123'
    '$2y$10$e0NRzQ6q6v6vQ6vQ6vQ6vO6vQ6vQ6vQ6vQ6vQ6vQ6vQ6vQ6vQ6vQ6'
);

-- Insert sample products with image paths (use placeholder images)
INSERT INTO products (name, category, description, price, image_path, stock_quantity) VALUES
('Laptop Model A', 'laptop', 'High performance laptop', 1200.00, 'images/laptop1.jpg', 10),
('Smartphone Model X', 'phone', 'Latest smartphone with great features', 800.00, 'images/phone1.jpg', 15),
('Wireless Mouse', 'accessory', 'Ergonomic wireless mouse', 25.00, 'images/mouse1.jpg', 50),
('Motherboard Z', 'component', 'High quality motherboard', 150.00, 'images/motherboard1.jpg', 20);
