# 📘 KhataFlow — Digital Khata & Personal Financial Companion

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express-5.2-lightgrey?logo=express)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%209-brightgreen?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

> **KhataFlow** is a modern, responsive full-stack personal finance web application inspired by the simplicity and trust of a traditional digital **Khata book**. It helps users budget their monthly income, track day-to-day expenses, calculate realistic living costs, and build toward long-term financial goals—without complex accounting jargon or paid third-party banking integrations.

---

## 📑 Table of Contents

- [Product Overview](#-product-overview)
- [Key Features](#-key-features)
  - [1. Authentication & Security](#1-authentication--security)
  - [2. "Plan My Money" 7-Step Budgeting Wizard](#2-plan-my-money-7-step-budgeting-wizard)
  - [3. Daily Expense Tracking (Khata Ledger)](#3-daily-expense-tracking-khata-ledger)
  - [4. Reports & Visual Analytics](#4-reports--visual-analytics)
  - [5. Financial Goals Tracker](#5-financial-goals-tracker)
  - [6. Unified Dashboard](#6-unified-dashboard)
- [Technology Stack](#-technology-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Financial Calculation Engine & Rules](#-financial-calculation-engine--rules)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [Core Architectural Principles](#-core-architectural-principles)
- [Roadmap & Development Phases](#-roadmap--development-phases)
- [Contributing & License](#-contributing--license)

---

## 💡 Product Overview

Many personal finance applications are either overly complex enterprise accounting tools or intrusive platforms requiring direct bank credentials and expensive third-party APIs. 

**KhataFlow** takes a different path:
- **Answers Core Financial Questions**:
  - *How much money do I take home each month?*
  - *What are my fixed essentials vs. discretionary lifestyle expenses?*
  - *How much can I realistically save and invest?*
  - *Where is my cash actually flowing day-to-day?*
  - *Am I on track to meet my major life goals?*
- **Self-Contained & Privacy-Focused**: Zero paid APIs, no bank credential scraping, and no arbitrary financial lock-in.
- **Calm, Human-Centric UI**: A focused palette prioritizing clarity, typography (Geist), readability, and accessibility over cluttered AI gradients and decorative widgets.

---

## ✨ Key Features

### 1. Authentication & Security
- **JWT in HttpOnly Cookies**: Token is safely stored inside an HTTP-only, SameSite-secured cookie to eliminate XSS token theft risks.
- **Bcrypt Password Encryption**: Industry-standard salted hashing with `bcryptjs`.
- **Protected Routing**: Global middleware (`protect`) enforces route guards on both API routes and client-side page views (`AuthContext`).
- **User-Scoped Isolation**: Users can only read, update, and delete their own financial records.

### 2. "Plan My Money" 7-Step Budgeting Wizard
A guided setup flow that structures personal budgeting without overwhelming forms:
1. **Basic Info**: Location/City, employment type, monthly net salary, additional income streams, dependents.
2. **Living Situation**: Housing status (Rented, Owned with EMI, Family home), rent/mortgage amount, utilities, and maintenance.
3. **Essential & Lifestyle Expenses**: Breakdown of groceries, transport, bills, dining out, entertainment, and shopping.
4. **Priorities & Aspirations**: Defining savings preferences and target emergency funds.
5. **Model Comparison**: Side-by-side comparison of standard budgeting models:
   - **50/30/20 Model**: 50% Essentials, 30% Lifestyle, 20% Savings.
   - **50/20/30 Model**: 50% Essentials, 20% Lifestyle, 30% Savings.
   - **60/20/20 Model**: 60% Essentials, 20% Lifestyle, 20% Savings.
   - **70/20/10 Model**: 70% Essentials, 20% Lifestyle, 10% Savings.
   - **Custom Model**: User-tailored allocations.
6. **Interactive Allocation**: Fine-tuning percentage and rupee amounts in real time.
7. **Review & Activation**: Final validation and storage of the active monthly plan.

> **City Estimates Engine**: Includes pre-seeded, editable baseline living cost estimates for Tier-1 (Mumbai, Bengaluru, Delhi NCR, etc.) and Tier-2 Indian cities, allowing quick setup without paid cost-of-living APIs.

### 3. Daily Expense Tracking (Khata Ledger)
- **Rapid Expense Logging**: Add transactions with title, rupee amount, category, date, and payment method.
- **Payment Method Tagging**: Supports `Cash`, `UPI`, `Credit Card`, `Debit Card`, and `Net Banking`.
- **Deep Filtering & Search**:
  - Filter by Category (Food, Utilities, Entertainment, Health, Education, etc.).
  - Filter by Payment Method.
  - Date Range Filtering (`startDate` to `endDate`).
  - Text search across titles and notes.
- **Multi-Order Sorting**: Sort by date (newest/oldest) or amount (highest/lowest).
- **In-Place Management**: Edit or delete logged expenses with instantaneous balance recalculation.

### 4. Reports & Visual Analytics
- **Visual Charts via Recharts**:
  - Interactive **Category Breakdown** (Donut & Bar charts).
  - **Payment Method Distribution** (Visualizing digital vs. cash transactions).
  - **Budget vs. Actual Spending** comparison.
- **Three-Tier Balance Transparency**:
  - **Planned Balance**: Projected leftover income from the active financial plan.
  - **Recorded Balance**: Actual cash flow derived from recorded income minus logged expenses.
  - *Distinction Notice*: KhataFlow clearly communicates that recorded balances represent logged data rather than live bank account feeds.

### 5. Financial Goals Tracker
- **Milestone Management**: Set goals for Emergency Funds, Home Down-Payment, Vehicle, Vacations, Gadgets, or Retirement.
- **Calculated Saving Cadence**:
  $$\text{Required Monthly Saving} = \frac{\text{Target Amount} - \text{Current Saved}}{\text{Remaining Months}}$$
- **Visual Progress Bars**: Real-time percentage completion indicators and priority badges (`High`, `Medium`, `Low`).
- **Full Lifecycle Management**: Edit targets, deposit contributions, or delete completed goals.

### 6. Unified Dashboard
- Consolidated summary displaying:
  - Active Financial Plan status & current monthly budget.
  - Total expenses recorded for the active cycle.
  - Active goals progress counter.
  - Quick-action shortcuts to log expenses, check reports, or update financial plans.

---

## 🛠 Technology Stack

### Frontend (`client/`)
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.3 (App Router)](https://nextjs.org/) | Modern React SSR/CSR architecture |
| **Library** | [React 19.2](https://react.dev/) | Component-driven user interface |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Modern utility-first CSS design system |
| **Charts** | [Recharts 3.10](https://recharts.org/) | Responsive SVG charts and visualizations |
| **Typography** | Geist (`next/font`) | Clean, modern financial-grade font hierarchy |
| **Language** | JavaScript (ESM / JSX) | Fast, clean development without TypeScript overhead |

### Backend (`server/`)
| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) (ES Modules) | Server execution environment |
| **Web Framework** | [Express.js 5.2](https://expressjs.com/) | High-performance RESTful API router |
| **Database** | [MongoDB](https://www.mongodb.com/) via [Mongoose 9.10](https://mongoosejs.com/) | Document store for users, plans, expenses, and goals |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Stateless JWT tokens & salted password hashing |
| **Cookie Parsing** | [cookie-parser](https://github.com/expressjs/cookie-parser) | Secure HttpOnly cookie handling |
| **CORS** | [cors](https://github.com/expressjs/cors) | Whitelisted cross-origin communication |
| **Process Tooling** | [nodemon](https://nodemon.io/) & [dotenv](https://github.com/motdotla/dotenv) | Local hot-reload and environment management |

---

## 📁 Project Architecture & Directory Structure

```text
KhataFlow/
├── client/                              # Next.js Frontend Application
│   ├── public/                          # Static assets and icons
│   ├── src/
│   │   ├── app/                         # Next.js App Router Pages
│   │   │   ├── layout.jsx               # Root layout (Navbar, Footer, Providers)
│   │   │   ├── page.jsx                 # Public landing page
│   │   │   ├── dashboard/               # Main user overview page
│   │   │   ├── plan-my-money/           # 7-step guided financial setup
│   │   │   ├── expenses/                # Expense ledger & transaction manager
│   │   │   ├── reports/                 # Analytics, charts & budget comparisons
│   │   │   ├── goals/                   # Financial targets & savings tracker
│   │   │   ├── login/ & register/       # User authentication pages
│   │   │   ├── about/ & contact/        # Informational static pages
│   │   │   └── globals.css              # Global styles and Tailwind v4 imports
│   │   ├── components/                  # Domain-driven React components
│   │   │   ├── expenses/                # ExpenseForm, ExpenseList, ExpenseSummary, Filters
│   │   │   ├── goals/                   # GoalCard, GoalForm, GoalList
│   │   │   ├── home/                    # Hero, Features, CTA components
│   │   │   ├── layout/                  # Navbar, Footer
│   │   │   ├── plan-my-money/           # Step 1 through Step 7 wizard views
│   │   │   ├── reports/                 # CategoryBreakdown, PaymentBreakdown, ReportSummary
│   │   │   └── ui/                      # Base UI elements (Button, Input, Card, Modal)
│   │   ├── context/                     # Shared React Contexts
│   │   │   ├── AuthContext.jsx          # User session & login/logout state
│   │   │   └── PlanMyMoneyContext.jsx   # Multi-step financial wizard state
│   │   └── lib/
│   │       └── api.js                   # Centralized API fetcher with cookie handling
│   ├── .env.example                     # Client environment template
│   └── package.json
│
├── server/                              # Express.js REST API Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # MongoDB Mongoose connection handler
│   │   ├── controllers/
│   │   │   ├── authController.js        # Register, Login, Logout, Profile
│   │   │   ├── expenseController.js     # Expense CRUD & multi-param filtering
│   │   │   ├── financialPlanController.js# Plan generation, models & city estimates
│   │   │   ├── goalController.js        # Goals CRUD & progress calculations
│   │   │   └── reportController.js      # Aggregation pipelines for spending reports
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js        # JWT cookie extraction & validation
│   │   │   └── errorMiddleware.js       # Global 404 & centralized error handlers
│   │   ├── models/
│   │   │   ├── User.js                  # User schema with bcrypt password hashing
│   │   │   ├── Expense.js               # Expense schema with category & payment method
│   │   │   ├── FinancialPlan.js         # Income, living expenses, allocations schema
│   │   │   └── Goal.js                  # Target amount, saved amount, priority schema
│   │   ├── routes/
│   │   │   ├── auth.js                  # /auth routes
│   │   │   ├── cityEstimates.js         # /cityEstimates routes
│   │   │   ├── expenseRoutes.js         # /expenses routes
│   │   │   ├── financialPlan.js         # /financialPlan routes
│   │   │   ├── goalRoutes.js            # /goals routes
│   │   │   ├── health.js                # /health route
│   │   │   └── reportRoutes.js          # /reports routes
│   │   ├── services/
│   │   │   └── financialCalculationService.js # Budget allocation formulas
│   │   ├── utils/
│   │   │   └── cityData.js              # Local Tier-1/Tier-2 city baseline estimates
│   │   └── server.js                    # Express app initialization & route mounting
│   ├── .env.example                     # Backend environment template
│   └── package.json
│
├── KhataFlow_Project_Direction.md       # Full product vision & development roadmap
└── README.md                            # Primary documentation
```

---

## 🧮 Financial Calculation Engine & Rules

KhataFlow computes balances and recommendations transparently using well-defined formulas:

| Metric | Mathematical Formula | Description |
| :--- | :--- | :--- |
| **Total Income** | $\text{Salary} + \text{Other Income}$ | Combined monthly inflow |
| **Total Planned Expenses** | $\sum \text{Planned Categories}$ | Needs + Wants allocated in plan |
| **Available Planned Balance** | $\text{Income} - \text{Expenses} - \text{Goal Allocations}$ | Unallocated buffer money |
| **Remaining Goal Amount** | $\text{Target Amount} - \text{Already Saved Amount}$ | Outstanding target gap |
| **Monthly Saving Cadence** | $\frac{\text{Remaining Goal Amount}}{\text{Remaining Months}}$ | Required monthly commitment |
| **Recorded Spending Balance**| $\text{Monthly Income} - \sum \text{Recorded Expenses}$ | Actual tracked cash remaining |

### Supported Allocation Frameworks
1. **50 / 30 / 20 Rule** (Default recommended):
   - $50\%$ Needs (Housing, Groceries, Utilities, Health)
   - $30\%$ Wants (Dining, Entertainment, Shopping, Travel)
   - $20\%$ Savings & Investments
2. **50 / 20 / 30 Rule**: Accelerated savings model for aggressive wealth building.
3. **60 / 20 / 20 Rule**: Adapted for high cost-of-living metropolitan cities.
4. **70 / 20 / 10 Rule**: Low-margin framework focusing primarily on essential living.
5. **Custom Allocation**: User-controlled sliders with automated sum-check validation ($= 100\%$).

---

## 🔌 API Reference

Base Server URL: `http://localhost:5000`

### 1. Health Check
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health/health` | Public | Verify server status and timestamp |

### 2. Authentication (`/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Create new account (`name`, `email`, `password`) |
| `POST` | `/auth/login` | Public | Authenticate user & issue HttpOnly JWT cookie |
| `POST` | `/auth/logout` | Public | Clear JWT session cookie |
| `GET` | `/auth/me` | Protected | Retrieve authenticated user profile |

### 3. Financial Planning (`/financialPlan`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/financialPlan/models` | Protected | List supported budget allocation models |
| `POST` | `/financialPlan/recommendations` | Protected | Generate recommended breakdown for user profile |
| `GET` | `/financialPlan` | Protected | Retrieve current active financial plan |
| `POST` | `/financialPlan` | Protected | Save and activate a new financial plan |
| `PUT` | `/financialPlan/:id` | Protected | Update existing financial plan |
| `DELETE` | `/financialPlan/:id` | Protected | Delete financial plan |

### 4. City Estimates (`/cityEstimates`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/cityEstimates?city={name}` | Public | Get editable baseline living expenses for a city |

### 5. Expenses (`/expenses`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/expenses` | Protected | Fetch user expenses with query filters (`sort`, `category`, `paymentMethod`, `startDate`, `endDate`, `search`) |
| `POST` | `/expenses` | Protected | Log a new expense (`title`, `amount`, `category`, `date`, `paymentMethod`, `notes`) |
| `GET` | `/expenses/:id` | Protected | Get single expense details |
| `PUT` | `/expenses/:id` | Protected | Update an expense record |
| `DELETE` | `/expenses/:id` | Protected | Delete an expense record |

### 6. Reports & Analytics (`/reports`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/reports/expenses` | Protected | Get aggregated category totals, payment method distributions, and summary stats |

### 7. Financial Goals (`/goals`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/goals` | Protected | Retrieve all user goals with calculated progress |
| `POST` | `/goals` | Protected | Create new financial goal |
| `GET` | `/goals/:id` | Protected | Fetch details of a specific goal |
| `PUT` | `/goals/:id` | Protected | Update target, saved amount, deadline, or priority |
| `DELETE` | `/goals/:id` | Protected | Delete a goal |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `pnpm` / `yarn`)
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection string.

---

### Backend Setup

1. **Navigate to the server directory**:
   ```bash
   cd server
   ```

2. **Install server dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and fill in your values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/khataflow
   JWT_SECRET=your_super_secret_jwt_key_at_least_32_characters
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

4. **Start the backend server in development mode**:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000` with nodemon auto-reloading.*

---

### Frontend Setup

1. **Navigate to the client directory**:
   ```bash
   cd ../client
   ```

2. **Install client dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
   Ensure it points to your Express backend:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```
   *Open [http://localhost:3000](http://localhost:3000) in your browser to interact with KhataFlow.*

---

## 🔒 Environment Variables

### Server (`server/.env`)
| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `PORT` | No | `5000` | Port on which Express server listens |
| `MONGODB_URI` | **Yes** | — | MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | **Yes** | — | Cryptographic secret for signing JWT session tokens |
| `CLIENT_URL` | No | `http://localhost:3000` | Allowed CORS origin for credentials & cookies |
| `NODE_ENV` | No | `development` | Environment mode (`development` or `production`) |

### Client (`client/.env.local`)
| Variable | Required | Default | Description |
| :--- | :---: | :--- | :--- |
| `NEXT_PUBLIC_API_URL`| No | `http://localhost:5000` | Root URL of the Express backend API |

---

## 🛡 Core Architectural Principles

1. **Zero Paid Third-Party APIs**:
   - KhataFlow is built to be resilient, private, and free of recurring API costs.
   - City living estimates, budget algorithms, and reporting aggregations are computed locally on the server.
2. **Strict Code Preservation**:
   - Refactorings preserve historical context and existing endpoints to ensure zero regression.
3. **Pure JavaScript (No TypeScript)**:
   - Built deliberately using modern ES Modules (`type: "module"`) on Node.js and clean JSX on Next.js.
4. **Design Restraint**:
   - UI avoids distracting neon glassmorphism and AI template clutter, maintaining a calm, trustworthy financial environment.

---

## 🗺 Roadmap & Development Progress

- [x] **Phase 1: Project Architecture & System Foundations**
  - Database schema models, folder structure, and design tokens.
- [x] **Phase 2: Core Infrastructure Setup**
  - Clean client/server separation and configuration.
- [x] **Phase 3: Authentication & Security Engine**
  - Secure registration, login, logout, and HttpOnly JWT cookie sessions.
- [x] **Phase 4: "Plan My Money" Budgeting Flow**
  - 7-step wizard, Tier-1/Tier-2 city estimates, allocation frameworks (50/30/20, custom).
- [x] **Phase 5: Expense Management (Khata Ledger)**
  - Transaction logging, multi-parameter filtering, search, and sorting.
- [x] **Phase 6: Reports & Visual Analytics**
  - Recharts analytics, spending distribution, and budget vs. actual breakdowns.
- [x] **Phase 7: Financial Goals & Dashboard Integration**
  - Goal milestone tracking, required monthly savings formula, and unified overview dashboard.
- [ ] **Phase 8: Planned Enhancements**
  - [ ] PDF & CSV statement exports.
  - [ ] Recurring expense automation (rent, subscriptions, EMIs).
  - [ ] Multi-currency selection (₹ INR default, $, €, £).
  - [ ] Offline PWA capability with IndexedDB synchronization.

---

## 📄 Contributing & License

Contributions, feedback, and issue reports are welcome! Please ensure that any architectural modifications align with the guidelines specified in [`KhataFlow_Project_Direction.md`](file:///e:/projects/KhataFlow/KhataFlow_Project_Direction.md).

Distributed under the **ISC License**.
