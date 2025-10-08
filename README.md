# 🍞 Bakee - Bakery Management System

A full-stack bakery management application built with Next.js, Express.js, and MongoDB. This project provides a complete solution for managing bakery operations including product catalog, order management, customer management, and analytics.

## 🌟 Features

### Customer Features
- **Product Catalog**: Browse and filter bakery products with categories
- **Shopping Cart**: Add products to cart with quantity management
- **Order Management**: Place orders with delivery/pickup options
- **User Authentication**: Secure login and registration system
- **Order Tracking**: Real-time order status updates
- **Reviews & Ratings**: Customer feedback system
- **FAQ Section**: Frequently asked questions
- **Contact Form**: Customer support communication

### Admin Features
- **Dashboard**: Comprehensive analytics and overview
- **Product Management**: Add, edit, and manage bakery products
- **Order Management**: Process and track customer orders
- **Customer Management**: View and manage customer data
- **Analytics**: Sales reports and business insights
- **Inventory Management**: Stock tracking and management

### Kitchen Features
- **Order Processing**: Kitchen staff can view and update order status
- **Real-time Updates**: Live order status synchronization

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: Next.js 15.4.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **UI Components**: 
  - Heroicons
  - Lucide React
  - React Icons
- **Charts**: Chart.js, Recharts
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **PDF Generation**: jsPDF, html2pdf.js
- **Barcode/QR**: jsbarcode, qrcode.react

### Backend (Server)
- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **CORS**: Cross-origin resource sharing enabled

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Development Server**: Nodemon for backend

## 📁 Project Structure

```
Bakee/
├── client/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages and components
│   │   │   ├── admin/     # Admin dashboard and management
│   │   │   ├── cart/      # Shopping cart functionality
│   │   │   ├── kitchen/   # Kitchen order management
│   │   │   ├── product/   # Product catalog and details
│   │   │   └── components/ # Reusable UI components
│   │   ├── services/      # API service functions
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Express.js backend API
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   └── server.js        # Main server file
└── package.json         # Root package configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sachin-iam/Bakee.git
   cd Bakee
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/bakee
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. **Database Setup**
   
   Make sure MongoDB is running on your system. The application will automatically connect to the database specified in your `.env` file.

5. **Run the application**

   **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

   **Start the frontend client:**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:3000`

## 📱 Usage

### For Customers
1. Visit `http://localhost:3000`
2. Browse the product catalog
3. Add items to your cart
4. Register/Login to place orders
5. Track your order status

### For Admins
1. Navigate to `/admin` after logging in
2. Access the dashboard for analytics
3. Manage products, orders, and customers
4. View business insights and reports

### For Kitchen Staff
1. Navigate to `/kitchen`
2. View pending orders
3. Update order status as items are prepared

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status
- `GET /api/orders/user/:userId` - Get user orders

### Analytics
- `GET /api/analytics/overview` - Get business overview
- `GET /api/analytics/sales` - Get sales data
- `GET /api/analytics/products` - Get product analytics

## 🗄️ Database Schema

### Products
- name, description, price, image
- category, stock, isActive, isFeatured
- status (active/inactive)

### Orders
- user (reference), items, totalAmount
- status (Pending/Preparing/Ready/Delivered/Cancelled)
- orderType (Delivery/Pickup)
- deliveryCharge, specialInstructions

### Users
- Authentication and profile information
- Role-based access control

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Modern Interface**: Clean and intuitive design
- **Real-time Updates**: Live order status updates
- **Interactive Charts**: Business analytics visualization
- **Smooth Animations**: Enhanced user experience
- **Accessibility**: WCAG compliant components

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation and sanitization
- Role-based access control

## 📊 Analytics & Reporting

- Sales performance tracking
- Product popularity analysis
- Customer behavior insights
- Order status monitoring
- Revenue reporting
- Export capabilities (PDF, Excel)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sachin**
- GitHub: [@sachin-iam](https://github.com/sachin-iam)

## 🆘 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/sachin-iam/Bakee/issues) page
2. Create a new issue with detailed information
3. Contact the maintainer

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Deploy

### Backend (Railway/Heroku)
1. Set environment variables
2. Configure MongoDB connection
3. Deploy the server

---

**Happy Baking! 🍰🥖🧁**
.