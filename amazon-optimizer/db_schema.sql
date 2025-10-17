-- SQL Schema for amazon_optimizer database

-- Drop database if it exists and create a new one
-- This is for easy setup/reset. In production, you would only create.
DROP DATABASE IF EXISTS amazon_optimizer;
CREATE DATABASE amazon_optimizer;
USE amazon_optimizer;

-- Table to store product optimization history
CREATE TABLE optimizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asin VARCHAR(10) NOT NULL,
    
    -- Original Data
    original_title TEXT NOT NULL,
    original_bullets TEXT, -- Stored as JSON string or concatenated text
    original_description TEXT,
    
    -- Optimized Data
    optimized_title TEXT,
    optimized_bullets TEXT, -- Stored as JSON string or concatenated text
    optimized_description TEXT,
    optimized_keywords TEXT, -- Stored as comma-separated string
    
    -- Metadata
    optimization_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Index for quick lookup by ASIN
    INDEX idx_asin (asin)
);

-- Example of how to insert a record (for testing)
-- INSERT INTO optimizations (asin, original_title, original_bullets, original_description, optimized_title, optimized_bullets, optimized_description, optimized_keywords)
-- VALUES (
--     'B07H65KP63',
--     'Original Product Title',
--     '["Bullet 1", "Bullet 2", "Bullet 3"]',
--     'This is the original product description.',
--     'Optimized Product Title - Keyword Rich',
--     '["Optimized Bullet 1", "Optimized Bullet 2", "Optimized Bullet 3"]',
--     'This is the new, persuasive, and compliant product description.',
--     'keyword1,keyword2,keyword3'
-- );

