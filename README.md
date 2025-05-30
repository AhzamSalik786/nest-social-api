# 📱 NestJS Social App

A feature-rich social media API built with [NestJS](https://nestjs.com/) and [TypeORM](https://typeorm.io/). This backend allows users to sign up, log in, create posts, and view posts with filtering and pagination.

## 🚀 Features

- ✅ User authentication (JWT-based)
- 📝 Create, read, and list social media posts
- 🔒 Role-based access control
- 🔄 Pagination and filtering
- 📂 One-to-Many relationship between Users and Posts
- 📘 API documentation with Swagger
- 🧪 Basic test coverage using Jest

## 🛠️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Database:** PostgreSQL
- **Authentication:** JWT (Passport strategy)
- **Validation:** class-validator, class-transformer
- **Docs:** Swagger (`@nestjs/swagger`)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nestjs-social-app.git
cd nestjs-social-app

# Install dependencies
npm install

# Run in development mode
npm run start:dev

# Build and run in production mode
npm run build
npm run start:prod

#Once the app is running, visit:
#You can test the endpoints, view schemas, and try requests directly from the Swagger UI.
http://localhost:3000/api-docs




