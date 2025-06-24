-- Drop tables if they exist to start from a clean state
DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS restaurant_tables;
DROP TABLE IF EXISTS rooms;

-- Create rooms table
CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    room_number INT UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Available', 'Occupied', 'Cleaning'))
);

-- Create restaurant_tables table
CREATE TABLE restaurant_tables (
    id SERIAL PRIMARY KEY,
    table_number INT UNIQUE NOT NULL,
    capacity INT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Available', 'Occupied', 'Reserved'))
);

-- Create menu_items table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_status VARCHAR(20) NOT NULL CHECK (stock_status IN ('In Stock', 'Low Stock', 'Out of Stock'))
);

-- Create reservations table
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    guest_name VARCHAR(100) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Room', 'Restaurant')),
    details VARCHAR(255),
    check_in_date DATE,
    check_out_date DATE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Confirmed', 'Pending', 'Checked-in', 'Checked-out', 'Seated', 'Cancelled'))
);

-- Insert sample data for rooms (20)
INSERT INTO rooms (room_number, type, status) VALUES
(101, 'Standard', 'Available'),
(102, 'Standard', 'Occupied'),
(103, 'Standard', 'Cleaning'),
(104, 'Standard', 'Available'),
(201, 'Deluxe', 'Available'),
(202, 'Deluxe', 'Occupied'),
(203, 'Deluxe', 'Available'),
(204, 'Deluxe', 'Occupied'),
(205, 'Deluxe', 'Available'),
(301, 'Suite', 'Cleaning'),
(302, 'Suite', 'Available'),
(303, 'Suite', 'Occupied'),
(304, 'Suite', 'Available'),
(401, 'Penthouse', 'Available'),
(105, 'Standard', 'Available'),
(106, 'Standard', 'Occupied'),
(206, 'Deluxe', 'Cleaning'),
(305, 'Suite', 'Available'),
(306, 'Suite', 'Occupied'),
(402, 'Penthouse', 'Available');


-- Insert sample data for restaurant_tables (15)
INSERT INTO restaurant_tables (table_number, capacity, status) VALUES
(1, 2, 'Available'),
(2, 2, 'Occupied'),
(3, 4, 'Reserved'),
(4, 4, 'Available'),
(5, 4, 'Occupied'),
(6, 6, 'Available'),
(7, 6, 'Reserved'),
(8, 8, 'Available'),
(9, 2, 'Available'),
(10, 2, 'Occupied'),
(11, 4, 'Available'),
(12, 4, 'Available'),
(13, 6, 'Occupied'),
(14, 8, 'Reserved'),
(15, 8, 'Available');


-- Insert sample data for menu_items (25)
INSERT INTO menu_items (name, category, price, stock_status) VALUES
('Grilled Salmon', 'Main Course', 24.50, 'In Stock'),
('Caesar Salad', 'Appetizer', 12.00, 'In Stock'),
('New York Cheesecake', 'Dessert', 9.50, 'Low Stock'),
('Filet Mignon', 'Main Course', 45.00, 'In Stock'),
('Margarita Pizza', 'Main Course', 18.00, 'Out of Stock'),
('Iced Tea', 'Beverage', 4.00, 'In Stock'),
('Tomato Soup', 'Appetizer', 8.00, 'In Stock'),
('Chicken Alfredo', 'Main Course', 22.00, 'In Stock'),
('Chocolate Lava Cake', 'Dessert', 10.00, 'In Stock'),
('Coca-Cola', 'Beverage', 3.50, 'In Stock'),
('Bruschetta', 'Appetizer', 9.00, 'Low Stock'),
('Ribeye Steak', 'Main Course', 38.00, 'In Stock'),
('Tiramisu', 'Dessert', 8.50, 'In Stock'),
('Espresso', 'Beverage', 3.00, 'In Stock'),
('Spring Rolls', 'Appetizer', 7.50, 'Out of Stock'),
('Lobster Thermidor', 'Main Course', 55.00, 'In Stock'),
('Panna Cotta', 'Dessert', 7.00, 'In Stock'),
('Orange Juice', 'Beverage', 5.00, 'In Stock'),
('Garlic Bread', 'Appetizer', 6.00, 'In Stock'),
('Vegetable Curry', 'Main Course', 19.00, 'In Stock'),
('Apple Pie', 'Dessert', 8.00, 'Low Stock'),
('Cappuccino', 'Beverage', 4.50, 'In Stock'),
('Onion Rings', 'Appetizer', 8.50, 'In Stock'),
('Spaghetti Carbonara', 'Main Course', 20.50, 'In Stock'),
('Lemonade', 'Beverage', 4.00, 'In Stock');


-- Insert sample data for reservations (40)
INSERT INTO reservations (guest_name, type, details, check_in_date, check_out_date, status) VALUES
('Liam Johnson', 'Room', 'Deluxe King - #204', '2024-08-15', '2024-08-18', 'Confirmed'),
('Olivia Smith', 'Restaurant', 'Table for 2', '2024-08-16', NULL, 'Seated'),
('Noah Williams', 'Room', 'Standard Queen - #112', '2024-08-16', '2024-08-17', 'Checked-in'),
('Emma Brown', 'Room', 'Presidential Suite - #401', '2024-08-20', '2024-08-25', 'Pending'),
('James Jones', 'Restaurant', 'Table for 6', '2024-08-17', NULL, 'Confirmed'),
('Ava Garcia', 'Room', 'Standard Twin - #108', '2024-08-15', '2024-08-16', 'Checked-out'),
('William Miller', 'Room', 'Deluxe Twin - #208', '2024-08-18', '2024-08-20', 'Confirmed'),
('Sophia Davis', 'Restaurant', 'Table for 4', '2024-08-18', NULL, 'Confirmed'),
('Michael Rodriguez', 'Room', 'Standard King - #105', '2024-08-19', '2024-08-21', 'Checked-in'),
('Isabella Wilson', 'Room', 'Suite - #301', '2024-08-22', '2024-08-26', 'Pending'),
('Ethan Martinez', 'Restaurant', 'Table for 5', '2024-08-19', NULL, 'Cancelled'),
('Mia Anderson', 'Room', 'Standard Queen - #110', '2024-08-18', '2024-08-19', 'Checked-out'),
('Alexander Taylor', 'Room', 'Deluxe King - #201', '2024-08-20', '2024-08-22', 'Confirmed'),
('Charlotte Thomas', 'Restaurant', 'Table for 2', '2024-08-20', NULL, 'Seated'),
('Daniel Moore', 'Room', 'Penthouse - #402', '2024-08-25', '2024-08-30', 'Confirmed'),
('Amelia Jackson', 'Restaurant', 'Table for 8', '2024-08-21', NULL, 'Confirmed'),
('Benjamin White', 'Room', 'Suite - #302', '2024-08-21', '2024-08-23', 'Checked-in'),
('Harper Harris', 'Room', 'Standard Twin - #106', '2024-08-23', '2024-08-24', 'Pending'),
('Jacob Martin', 'Restaurant', 'Table for 3', '2024-08-22', NULL, 'Confirmed'),
('Evelyn Thompson', 'Room', 'Standard King - #102', '2024-08-20', '2024-08-21', 'Checked-out'),
('Logan Garcia', 'Room', 'Deluxe Queen - #203', '2024-09-01', '2024-09-05', 'Confirmed'),
('Abigail Martinez', 'Restaurant', 'Table for 4', '2024-09-01', NULL, 'Confirmed'),
('Lucas Robinson', 'Room', 'Suite - #303', '2024-09-02', '2024-09-06', 'Pending'),
('Ella Clark', 'Restaurant', 'Table for 6', '2024-09-02', NULL, 'Cancelled'),
('Aiden Rodriguez', 'Room', 'Standard King - #103', '2024-09-03', '2024-09-07', 'Checked-in'),
('Madison Lewis', 'Room', 'Deluxe King - #205', '2024-09-04', '2024-09-08', 'Confirmed'),
('Jackson Lee', 'Restaurant', 'Table for 2', '2024-09-03', NULL, 'Seated'),
('Scarlett Walker', 'Room', 'Standard Twin - #104', '2024-09-05', '2024-09-06', 'Checked-out'),
('Jack Hall', 'Restaurant', 'Table for 1', '2024-09-04', NULL, 'Confirmed'),
('Victoria Allen', 'Room', 'Penthouse - #401', '2024-09-10', '2024-09-15', 'Pending'),
('Levi Young', 'Room', 'Suite - #304', '2024-09-06', '2024-09-10', 'Confirmed'),
('Grace Hernandez', 'Restaurant', 'Table for 5', '2024-09-05', NULL, 'Confirmed'),
('Mateo King', 'Room', 'Deluxe Twin - #206', '2024-09-07', '2024-09-09', 'Checked-in'),
('Chloe Wright', 'Restaurant', 'Table for 3', '2024-09-06', NULL, 'Cancelled'),
('David Lopez', 'Room', 'Standard Queen - #107', '2024-09-08', '2024-09-11', 'Confirmed'),
('Riley Hill', 'Room', 'Suite - #305', '2024-09-09', '2024-09-12', 'Checked-out'),
('Zoe Scott', 'Restaurant', 'Table for 2', '2024-09-07', NULL, 'Seated'),
('Owen Green', 'Room', 'Deluxe King - #207', '2024-09-11', '2024-09-14', 'Pending'),
('Nora Adams', 'Restaurant', 'Table for 8', '2024-09-08', NULL, 'Confirmed'),
('Caleb Baker', 'Room', 'Standard King - #109', '2024-09-12', '2024-09-13', 'Confirmed');
