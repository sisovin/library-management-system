# Library Management System

This project is a Library Management System built with Deno. It includes features such as user authentication, book management, category management, borrowing and returning books, reviews, reading lists, and more. The system is designed to be modular and scalable, with a clear separation of concerns.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/githubnext/workspace-blank.git
   cd workspace-blank
   ```

2. Copy the example environment variables file and update it with your configuration:
   ```sh
   cp .env.example .env
   ```

3. Install the dependencies:
   ```sh
   deno task install
   ```

4. Start the Docker containers for Postgres and Redis:
   ```sh
   docker-compose up -d
   ```

5. Run the database migrations:
   ```sh
   deno task migrate
   ```

6. Seed the database with initial data:
   ```sh
   deno task seed
   ```

## Usage

1. Start the application:
   ```sh
   deno task start
   ```

2. The application will be available at `http://localhost:8000`.

## Backend Full Project Structure

Below is the full project structure for the Deno Library Management System with enhanced features:
```
library-management-system/
├── .env.example
├── deno.json
├── import_map.json
├── docker-compose.yml          # For Postgres+Redis containers
├── migrations/
│   ├── 0001_initial_schema.ts
│   ├── 0002_seed_data.ts
│   └── 0003_add_advanced_features.ts
├── src/
│   ├── config/
│   │   ├── app.ts             # App configuration
│   │   ├── db.ts             # Postgres config
│   │   ├── redis.ts          # Redis config
│   │   ├── auth.ts           # Auth constants
│   │   └── cache.ts          # Cache policies
│   ├── controllers/
│   │   ├── auth/
│   │   │   ├── controller.ts # Main auth controller
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── refresh.ts
│   │   │   ├── register.ts
│   │   │   └── password-reset.ts
│   │   ├── books/
│   │   │   ├── controller.ts
│   │   │   ├── crud/
│   │   │   │   ├── create.ts
│   │   │   │   └── update.ts
│   │   │   └── operations/
│   │   │       ├── search.ts
│   │   │       └── upload-cover.ts
│   │   ├── categories/
│   │   │   └── controller.ts
│   │   ├── borrows/
│   │   │   ├── controller.ts
│   │   │   └── reservations.ts
│   │   ├── reviews/
│   │   │   └── controller.ts
│   │   └── reading-lists/
│   │       └── controller.ts
│   ├── db/
│   │   ├── schema/           # Drizzle schemas
│   │   │   ├── users.ts
│   │   │   ├── books.ts
│   │   │   └── relations.ts  # All relations
│   │   ├── client.ts         # DB client
│   │   └── seed.ts           # Test data
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── argon2.ts
│   │   │   ├── jwt.ts
│   │   │   └── sessions.ts
│   │   ├── cache/
│   │   │   ├── redis.ts
│   │   │   └── strategies/
│   │   │       ├── books.ts
│   │   │       └── search.ts
│   │   └── search/           # Search engine
│   │       └── fulltext.ts
│   ├── middleware/
│   │   ├── auth/
│   │   │   ├── guard.ts      # Auth middleware
│   │   │   └── roles.ts      # RBAC
│   │   ├── validation/       # Zod validators
│   │   │   ├── books.ts
│   │   │   └── users.ts
│   │   └── rate-limit.ts
│   ├── models/
│   │   ├── user/
│   │   │   ├── model.ts
│   │   │   └── repository.ts # DB operations
│   │   ├── book/
│   │   │   ├── model.ts
│   │   │   └── repository.ts
│   │   └── ...               # Other models
│   ├── routes/
│   │   ├── v1/               # Versioned API
│   │   │   ├── auth.ts
│   │   │   ├── books.ts
│   │   │   └── index.ts      # Aggregated routes
│   │   └── docs.ts           # OpenAPI spec
│   ├── services/
│   │   ├── notification/
│   │   │   ├── email.ts
│   │   │   └── webhook.ts
│   │   ├── analytics/
│   │   │   └── books.ts
│   │   └── storage/          # File uploads
│   │       └── s3.ts
│   ├── types/
│   │   ├── database/         # DB types
│   │   ├── http/            # Request/response
│   │   └── lib/             # Utility types
│   ├── utils/
│   │   ├── api/
│   │   │   ├── response.ts  # Standard responses
│   │   │   └── error.ts     # Error handling
│   │   ├── pagination.ts
│   │   └── logger.ts        # Structured logging
│   └── app.ts               # App entrypoint
├── tests/
│   ├── integration/
│   │   ├── auth/
│   │   │   ├── login.test.ts
│   │   │   └── register.test.ts
│   │   ├── books/
│   │   │   └── crud.test.ts
│   │   └── setup.ts         # Test fixtures
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── auth/
│   │   │   │   └── jwt.test.ts
│   │   │   └── cache/
│   │   │       └── redis.test.ts
│   │   └── models/
│   │       └── user.test.ts
│   └── e2e/
│       ├── borrow-flow.test.ts
│       └── review-flow.test.ts
├── docs/
│   ├── api/                 # OpenAPI files
│   │   ├── swagger.yaml
│   │   └── postman.json
│   └── db/                  # Database diagrams
│       └── schema.puml
└── scripts/
    ├── deploy/
    │   ├── production.ts
    │   └── staging.ts
    ├── migrate.ts           # Migration runner
    └── seed.ts              # Data seeding
```
## Frontend Full Project Structure
Below is the complete frontend project structure for the Deno Library Management System using Next.js, TypeScript, and TailwindCSS:

```
library-frontend/
├── public/
│   ├── images/               # Static images
│   │   ├── logos/
│   │   └── book-covers/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (auth)/           # Auth routes group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/      # Dashboard routes group
│   │   │   ├── layout.tsx
│   │   │   ├── books/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── (admin)/          # Admin routes group
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   └── users/
│   │   │       └── page.tsx
│   │   ├── api/              # Frontend API routes
│   │   │   └── auth/
│   │   │       └── route.ts
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── ui/               # ShadCN-like primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ...
│   │   ├── auth/
│   │   │   ├── AuthForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── books/
│   │   │   ├── BookCard.tsx
│   │   │   ├── BookGrid.tsx
│   │   │   └── BookSearch.tsx
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── UserNav.tsx
│   │   │   └── StatsCards.tsx
│   │   ├── admin/
│   │   │   ├── AdminTable.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   └── BookCRUD.tsx
│   │   └── shared/
│   │       ├── Pagination.tsx
│   │       ├── Loading.tsx
│   │       └── ErrorBoundary.tsx
│   ├── config/
│   │   ├── site.ts           # App constants
│   │   ├── theme.ts          # Tailwind config
│   │   └── routes.ts         # Route definitions
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBooks.ts
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts     # Axios instance
│   │   │   ├── auth.ts
│   │   │   ├── books.ts
│   │   │   └── users.ts
│   │   ├── constants/
│   │   │   ├── book.ts
│   │   │   └── user.ts
│   │   ├── helpers/
│   │   │   ├── date.ts
│   │   │   └── strings.ts
│   │   └── validation/
│   │       ├── schema.ts     # Zod schemas
│   │       └── types.ts
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   ├── StoreProvider.tsx # Zustand
│   │   └── ThemeProvider.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── theme.css         # Custom CSS
│   ├── types/
│   │   ├── api/
│   │   │   ├── auth.d.ts
│   │   │   └── books.d.ts
│   │   └── index.ts
│   └── utils/
│       ├── api/
│       │   ├── error.ts
│       │   └── response.ts
│       └── cookies.ts
├── .env.local                # Environment variables
├── tailwind.config.ts
├── tsconfig.json
├── next.config.js
└── package.json
```

## Contribution Guidelines

We welcome contributions to the Library Management System. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Ensure that your changes pass the tests.
5. Submit a pull request with a clear description of your changes.
