CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    color VARCHAR(20) DEFAULT 'black',  -- for graphical feature
    icon VARCHAR(50),  -- store icon name or path
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
