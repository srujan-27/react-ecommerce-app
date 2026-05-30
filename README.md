# React E-Commerce Application

A full-stack e-commerce web application built with React and Express.js, featuring product browsing, user authentication, and shopping cart functionality.
## Features

- **Product Catalog** — Browse products with images, ratings, prices, and descriptions
- **Product Detail Pages** — View detailed product information with multiple images
- **User Authentication** — Login/logout with hashed password storage (SHA-256)
- **Shopping Cart** — Add products to cart, view cart contents, persistent cart per user
- **RESTful API** — Clean separation between frontend and backend via REST endpoints

## Screenshots

### Product Browsing
![Product Listing](screenshots/product-listing.png)

### Product Details
![Product Detail](screenshots/product-detail.png)

### Shopping Cart
![Cart](screenshots/cart.png)

## Tech Stack

### Frontend
- **React** with Vite
- **React Router** for client-side routing
- **CSS** for styling (Amazon-inspired UI)

### Backend
- **Node.js** with Express
- **JSON file storage** for products and user data
- **SHA-256** password hashing
- **CORS** enabled for cross-origin requests
- **Nodemon** for development

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | Fetch all products |
| GET | `/products/:id` | Fetch single product |
| POST | `/login` | User authentication |
| GET | `/user` | Get current user info |
| GET | `/cart` | Get user's cart |

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/srujan-27/react-ecommerce-app.git
   cd react-ecommerce-app
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in `server/` (see `.env.example` for reference):
   ```env
   PORT=3000
   JWT_SECRET=your_secret_key
   ```

3. **Start the backend**
   ```bash
   npm run start
   ```

4. **Set up the frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

## Project Structure

```
react-ecommerce-app/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── server/                  # Express backend
│   ├── data-store/          # JSON data files
│   │   ├── products.json
│   │   └── users.json
│   ├── src/                 # Server source code
│   ├── test/                # API tests
│   ├── .env.example
│   └── package.json
└── README.md
```

## Acknowledgments

Built upon starter code provided in CSC-575 Web Development course at Quinnipiac University. Extended with product catalog implementation, cart functionality, and user authentication flow.
