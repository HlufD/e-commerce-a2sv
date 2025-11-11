# E-Commerce Project

A backend application for managing an e-commerce platform, built with Node.js, NestJS, and PostgreSQL.

---

## Technology Choices

### NestJS

I chose **NestJS** because it provides a robust and scalable framework for building backend applications. Its **modular architecture** and **built-in dependency injection** make the codebase easier to maintain and extend, especially for complex applications like an e-commerce platform. NestJS also integrates seamlessly with TypeScript, giving strong typing and developer productivity.

### Prisma

**Prisma** is my choice for the database ORM because it simplifies database access with **type-safe queries** and **auto-generated models**. This reduces runtime errors and improves development speed. Prisma’s migration system ensures that schema changes are version-controlled and easy to apply in different environments.

### PostgreSQL

**PostgreSQL** was selected as the database for its **reliability, strong relational data support, and scalability**. It handles complex queries and transactional operations efficiently, which is essential for managing e-commerce orders, users, and products.

### Architectural Pattern: Hexagonal + Domain-Driven Design (DDD)

I combined **Hexagonal Architecture** and **Domain-Driven Design (DDD)** to structure the application for maintainability and testability:

- **Hexagonal Architecture** separates the core business logic (domain) from external dependencies like databases, APIs, or messaging systems. This allows the core logic to remain independent, making it easier to swap out or test infrastructure components.
- **Domain-Driven Design** focuses on modeling the business domain accurately. By organizing code around **entities, value objects, and aggregates**, the application reflects real-world business rules and behaviors.

The combination of Hexagonal + DDD ensures that the system is **modular, scalable, and highly maintainable**, which is ideal for an evolving e-commerce platform.

---

## Folder Structure

The project follows a modular structure aligned with Hexagonal and DDD principles:

```
src
├── auth
│   ├── decorators       # Custom decorators for authentication and authorization
│   ├── domain
│   │   ├── entities     # Core Auth entities (User, Role, etc.)
│   │   └── interfaces   # Interfaces defining contracts for Auth repository
│   ├── dto              # Data Transfer Objects for Auth module
│   ├── enums            # Enum definitions (e.g., roles, permissions)
│   ├── guard            # Guards for route protection
│   └── storage
│       ├── memory       # In-memory implementation of repositories
│       └── prisma       # Prisma implementation of repositories
├── orders
│   ├── domain
│   │   ├── entities     # Core Order entities
│   │   └── interfaces   # Interfaces defining contracts for Order repository
│   ├── dto              # Data Transfer Objects for Orders
│   └── storage
│       ├── memory       # In-memory repository implementation
│       └── prisma       # Prisma repository implementation
├── prisma               # Prisma schema and client setup
├── products
│   ├── domain
│   │   ├── entities     # Core Product entities
│   │   └── interfaces   # Interfaces defining contracts for Product repository
│   ├── dto              # Data Transfer Objects for Products
│   └── storage
│       ├── memory       # In-memory repository implementation
│       └── prisma       # Prisma repository implementation
└── shared
    ├── exceptions      # Custom exception classes
    ├── interfaces      # Shared interfaces across modules
    └── utils           # Utility functions
```

This structure ensures:

- **Separation of concerns:** Each module manages its own domain logic and persistence.
- **Testability:** In-memory repositories allow unit tests without hitting the database.
- **Scalability:** New modules or features can be added with minimal impact on existing code.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
  - [Development Mode](#development-mode)
  - [Production Mode](#production-mode)

- [Swagger API Documentation](#swagger-api-documentation)
- [Testing](#testing)
- [Linting and Formatting](#linting-and-formatting)

---

## Prerequisites

Ensure the following tools are installed on your machine:

- [Node.js](https://nodejs.org/) (v20.x recommended)
- npm or [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)

---

## Installation

1. Clone the repository:

```bash
git clone git@github.com:HlufD/e-commerce-a2sv.git
cd e-commerce-a2sv
```

2. Install dependencies:

```bash
pnpm install
```

---

## Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Then fill in your environment variables, for example:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5433/e-commerce-db
JWT_SECRET=thisisasecret
JWT_TTL=3600
```

---

## Database Setup

Run the following commands to initialize and generate the database schema using Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Running the Project

### Development Mode

```bash
npm run start
# or
pnpm run start
```

The server will start at `http://localhost:3000` by default.

### Production Mode

```bash
npm run build
npm run start:prod
# or
pnpm build
pnpm start:prod
```

---

## Swagger API Documentation

The API is documented using **Swagger**. Once the server is running, you can access the Swagger UI at:

```
http://localhost:3000/api#/
```

Swagger provides a complete overview of all endpoints, request/response schemas, and allows you to test the API directly from the browser.

> **Note:** Protected endpoints require JWT authorization. Use the **Authorize** button in Swagger to enter your JWT token.

---

## Testing

Run unit and integration tests:

```bash
pnpm run test
pnpm run test:cov
```

---

## Linting and Formatting

Check code quality and format code consistently:

```bash
pnpm run lint
pnpm run format
```
