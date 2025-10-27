# Restaurant Food App - API Documentation

## Base URL
```
http://localhost:8080/api/v1
```

## Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

---

## Endpoints

### 🔐 Authentication

#### Register
```http
POST /auth/register
```

**Request Body:**
```json
{
  "userName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": ["123 Main St", "New York", "NY 10001"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully registered",
  "user": {
    "_id": "user_id",
    "userName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "userType": "client"
  }
}
```

---

#### Login
```http
POST /auth/login
```
*Rate Limited: 5 attempts per 15 minutes*

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "user_id",
    "userName": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "userType": "client"
  }
}
```

---

### 📁 Categories

#### Create Category (Admin Only)
```http
POST /category/create
```
*Requires: Authentication + Admin Role*

**Request Body:**
```json
{
  "name": "Pizza",
  "description": "Italian pizzas",
  "image": "https://example.com/pizza.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category created successfully",
  "category": {
    "_id": "category_id",
    "name": "Pizza",
    "slug": "pizza",
    "description": "Italian pizzas",
    "image": "https://example.com/pizza.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

#### Get All Categories
```http
GET /category/all
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "categories": [...]
}
```

---

#### Get Single Category
```http
GET /category/:id
```

**Response:**
```json
{
  "success": true,
  "category": {...}
}
```

---

#### Update Category (Admin Only)
```http
PUT /category/update/:id
```
*Requires: Authentication + Admin Role*

---

#### Delete Category (Admin Only)
```http
DELETE /category/delete/:id
```
*Requires: Authentication + Admin Role*

---

### 🍔 Food Items

#### Create Food Item (Admin Only)
```http
POST /food/create
```
*Requires: Authentication + Admin Role*

**Request Body:**
```json
{
  "name": "Margherita Pizza",
  "description": "Classic Italian pizza with tomato and mozzarella",
  "price": 12.99,
  "category": "category_id",
  "image": "https://example.com/margherita.jpg",
  "available": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Food item created successfully",
  "food": {...}
}
```

---

#### Get All Food Items
```http
GET /food/all
```

**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `search` - Search by name or description
- `category` - Filter by category ID
- `sort` - Sort options: `price-asc`, `price-desc`, `newest`

**Example:**
```
GET /food/all?page=1&limit=10&search=pizza&sort=price-asc&category=category_id
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "total": 50,
  "currentPage": 1,
  "totalPages": 5,
  "foods": [...]
}
```

---

#### Get Food by Category
```http
GET /food/category/:categoryId
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "foods": [...]
}
```

---

#### Get Single Food Item
```http
GET /food/:id
```

**Response:**
```json
{
  "success": true,
  "food": {
    "_id": "food_id",
    "name": "Margherita Pizza",
    "description": "...",
    "price": 12.99,
    "category": {
      "_id": "category_id",
      "name": "Pizza"
    },
    "vendor": {
      "_id": "vendor_id",
      "userName": "Pizza Shop",
      "email": "shop@example.com"
    },
    "image": "https://example.com/margherita.jpg",
    "available": true,
    "rating": 4.5,
    "numReviews": 120
  }
}
```

---

#### Update Food Item (Admin Only)
```http
PUT /food/update/:id
```
*Requires: Authentication + Admin Role*

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Name",
  "description": "Updated description",
  "price": 15.99,
  "category": "new_category_id",
  "image": "https://example.com/newimage.jpg",
  "available": false
}
```

---

#### Delete Food Item (Admin Only)
```http
DELETE /food/delete/:id
```
*Requires: Authentication + Admin Role*

**Response:**
```json
{
  "success": true,
  "message": "Food item deleted successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "msg": "Username must be at least 3 characters",
      "param": "userName",
      "location": "body"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Route not found"
}
```

### 429 Too Many Requests
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Error details"
}
```

---

## User Types

- **client**: Regular customer (default)
- **admin**: Administrator with full access
- **vendor**: Food vendor
- **driver**: Delivery driver

---

## Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Auth Endpoints**: 5 login attempts per 15 minutes per IP

---

## Security Features

- Helmet.js for security headers
- Rate limiting on all endpoints
- JWT authentication
- Password hashing with bcryptjs
- CORS enabled
- Request validation with express-validator
- Password field excluded from queries by default


