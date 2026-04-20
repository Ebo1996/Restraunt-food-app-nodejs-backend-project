# Restaurant Food App - Backend API

A complete Node.js backend API for a restaurant food delivery application built with Express, MongoDB, and JWT authentication.

## Features 

- ✅ User Authentication (Register/Login with JWT)
- ✅ Food Management (CRUD operations)
- ✅ Category Management (CRUD operations)
- ✅ Role-based Access Control (Admin, Client, Vendor, Driver)
- ✅ Search and Filter functionality
- ✅ Pagination support
- ✅ Protected routes with middleware
- ✅ Request validation with express-validator
- ✅ Rate limiting for security
- ✅ Helmet.js for security headers
- ✅ Password security (select: false by default)
- ✅ Error handling middleware


## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing, helmet, rate limiting
- **Validation**: express-validator
- **Other**: cors, dotenv, morgan

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Ebo1996/Restraunt-food-app-nodejs-project.git
cd Restraunt-food-app-nodejs-project
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=8080
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Start the server:
```bash
npm run dev
```

## API Endpoints

For detailed API documentation, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

### Authentication

- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login and get JWT token

### Categories

- `POST /api/v1/category/create` - Create category (Admin only)
- `GET /api/v1/category/all` - Get all categories
- `GET /api/v1/category/:id` - Get single category
- `PUT /api/v1/category/update/:id` - Update category (Admin only)
- `DELETE /api/v1/category/delete/:id` - Delete category (Admin only)

### Food Items

- `POST /api/v1/food/create` - Create food item (Admin only)
- `GET /api/v1/food/all` - Get all food items (with pagination, search, filter)
- `GET /api/v1/food/:id` - Get single food item
- `GET /api/v1/food/category/:categoryId` - Get foods by category
- `PUT /api/v1/food/update/:id` - Update food item (Admin only)
- `DELETE /api/v1/food/delete/:id` - Delete food item (Admin only)

## User Types

The system supports four user types:
- `client` - Regular customers
- `admin` - Administrators (full access)
- `vendor` - Food vendors
- `driver` - Delivery drivers

## Request Examples

### Register User
```json
POST /api/v1/auth/register
{
  "userName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": ["123 Main St", "City, State"]
}
```

### Login
```json
POST /api/v1/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Category (Requires Admin Token)
```json
POST /api/v1/category/create
Headers: { Authorization: "Bearer your_jwt_token" }
{
  "name": "Pizza",
  "description": "Italian pizzas",
  "image": "https://example.com/pizza.jpg"
}
```

### Create Food Item (Requires Admin Token)
```json
POST /api/v1/food/create
Headers: { Authorization: "Bearer your_jwt_token" }
{
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with tomato and mozzarella",
  "price": 12.99,
  "category": "category_id_here",
  "image": "https://example.com/pizza.jpg"
}
```

### Get All Food Items (with query parameters)
```
GET /api/v1/food/all?page=1&limit=10&search=pizza&sort=price-asc&category=category_id
```

## Environment Variables

- `PORT` - Server port (default: 8080)
- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## Project Structure

```
Restraunt-food-app-nodejs-project/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── foodController.js  # Food CRUD operations
│   ├── categoryController.js  # Category CRUD operations
│   └── testController.js  # Test endpoint
├── middleware/
│   └── authMiddleware.js  # Authentication middleware
├── models/
│   ├── userModel.js       # User schema
│   ├── foodModel.js       # Food schema
│   └── categoryModel.js   # Category schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── foodRoutes.js      # Food endpoints
│   ├── categoryRoutes.js  # Category endpoints
│   └── testRoutes.js      # Test endpoint
├── server.js              # Entry point
└── package.json           # Dependencies
```

## Author

Restaurant EBISA BERHANU

