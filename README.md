# ShoppyGlobe – Node.js & Express Backend

A complete backend API for the **ShoppyGlobe** e-commerce application, built with **Node.js**, **Express.js**, **MongoDB**, and **JWT authentication**. Powers product management, user authentication, and shopping cart operations for the frontend application.

## Features Implemented

### 1. User Authentication & Authorization
- JWT-based authentication for secure login and registration
- Passwords securely hashed using **bcrypt**
- Protected cart routes – only logged-in users can add, update, or remove items
- Comprehensive error handling for:
  - Invalid credentials
  - Missing required fields
  - Unauthorized access attempts

### 2. Product Management 
- `GET /api/products` – Fetch all products from MongoDB
- `GET /api/products/:id` – Fetch a single product by ID
- `POST /api/products` – Add a new product to the database
- Robust error handling for invalid product IDs and missing fields

### 3. Shopping Cart
- `POST /api/cart` – Add products to user-specific cart
- `PUT /api/cart/:id` – Update quantity of a cart item
- `DELETE /api/cart/:id` – Remove item from cart
- Cart securely linked to authenticated user via JWT token
- Real-time cart data updates persisted in MongoDB

### 4. API Error Handling & Validation 
- Centralized error handler middleware for consistent error responses
- Input validation for registration, login, and cart operations
- Proper HTTP status codes (e.g., 200, 201, 400, 401, 404, 500)

### 5. MongoDB Integration 
- **Products Collection**: Stores name, price, description, stock
- **Users Collection**: Stores username and hashed password
- **Cart Collection**: Stores user-specific cart items with product references
- Full CRUD operations implemented using **Mongoose ODM**

### 6. API Testing with ThunderClient
- All routes thoroughly tested for functionality and edge cases
- Test scenarios include:
  - Auth: Register, login, invalid credentials
  - Products: Fetch all, fetch by ID, create product, invalid ID handling
  - Cart: Add item, update quantity, delete item, unauthorized access attempts

## Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **dotenv** for environment variables
- **ThunderClient** for API testing


## GitHub Repository
🔗 **Repository**: [https://github.com/Aasthadixit13/ShoppyGlobe-Node.js-Express-Backend]