<div align="center">

# 📦 Inventory Manager

A full-featured inventory management demo for handling stock, sales, deliveries, returns, invoices, and transaction history.

[![Vue.js](https://img.shields.io/badge/Vue.js-3-42b883?logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Pinia](https://img.shields.io/badge/Pinia-3-f7d336?logo=pinia&logoColor=black)](https://pinia.vuejs.org/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)](https://vercel.com/)

### 🚀 [View Live Demo](https://inv-manager-frontend-alpha.vercel.app)

</div>

---

## 📖 Overview

**Inventory Manager** is a web-based inventory management system designed around practical day-to-day stock workflows.

The application brings inventory monitoring, sales, deliveries, dealer returns, invoices, stock movement history, and reporting into a single interface.

This repository contains the **public demo frontend**, configured to work with a completely isolated demo environment using fictional data.

Visitors can explore the application using the built-in guest access without creating an account.

---

## ✨ Features

### 📦 Inventory Overview

- View current stock quantities
- Identify low-stock and out-of-stock products
- Review recent inventory activity
- Search and filter product records
- Browse paginated transaction history

### 💰 Sales Management

- Record product sales
- Select products using item codes
- Automatically retrieve product details
- Calculate sales totals
- View completed transactions and invoice details

### ↩️ Dealer Returns

- Record returned products
- Categorize returns as good, damaged, or expired
- Track returned quantities
- Review return history

### 🚚 Goods Delivery Notes

- Record incoming inventory
- Review delivery-note details
- Realtime stock updates

### 🧾 Invoices

- Generate invoice views from completed transactions
- Use printable invoice layouts
- Review previous invoice information

### 🔄 Stock Transactions

- Track inventory movements
- Filter transactions by date
- Filter by transaction type
- Review stock increases and decreases
- Inspect individual transaction records

### 📊 Reports

- Generate bin card ledger records
- Filter reports by product
- Select custom date ranges
- Review opening, incoming, outgoing, and closing quantities
- Inspect daily stock activity

### 🔐 Demo Authentication

- Firebase Authentication integration
- Anonymous guest access for the public demo
- Protected application routes
- Firebase ID tokens attached to authenticated API requests
- Demo environment isolated from other deployments

### 📱 Responsive UI

- Desktop-focused inventory dashboard
- Tablet and mobile support
- Reusable Vue components
- Form validation
- Loading and empty states
- Search and autocomplete functionality

---

## 🧰 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Vue 3 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| State Management | Pinia |
| Routing | Vue Router |
| HTTP Client | Axios |
| Authentication | Firebase Authentication |
| Date Handling | date-fns |
| Testing | Vitest + Vue Test Utils |
| Code Quality | ESLint + Prettier |
| Container Support | Docker + Nginx |
| Demo Hosting | Vercel |

---

## 📁 Project Structure

```text
src/
├── api/              # Axios client and API modules
├── components/       # Reusable UI components
├── composables/      # Shared Vue composition logic
├── config/           # Application/environment configuration
├── router/           # Routes and authentication guards
├── stores/           # Pinia stores
├── types/            # TypeScript interfaces and types
├── views/            # Main application pages
├── firebase.ts       # Firebase initialization
├── App.vue           # Root Vue component
└── main.ts           # Application entry point
```

---

## 🔐 Demo Environment

The public deployment runs in demo mode:

```env
VITE_APP_MODE=demo
```

This changes application behaviour such as:

- Enabling **Continue as Guest**
- Using the demo Firebase project
- Connecting only to the demo backend
- Displaying fictional business information

The deployed frontend is configured with a dedicated API URL:

```env
VITE_API_URL=https://inventory-manager-demo-backend.vercel.app
```

The frontend does not contain database credentials or server-side secrets.

---

## ⚙️ Environment Variables

Create a `.env` file based on `.env.example`.

```env
# Application
VITE_APP_MODE=demo
VITE_APP_NAME=Inventory Manager Demo
VITE_APP_SUBTITLE=Explore inventory workflows using sample data

# Backend
VITE_API_URL=http://localhost:3000

# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Demo invoice branding
VITE_BUSINESS_NAME=Demo Distribution Co.
VITE_BUSINESS_ADDRESS=100 Sample Road, Colombo
VITE_BUSINESS_PHONE=+94 11 000 0000
VITE_BUSINESS_EMAIL=demo@example.com

VITE_AUTHORIZED_FOR_NAME=Demo Manufacturing Group
VITE_AUTHORIZED_FOR_ADDRESS=Colombo, Sri Lanka
VITE_AUTHORIZED_FOR_PHONE=+94 11 000 0001
```

> `VITE_*` variables are included in the frontend build. Never place database passwords, Firebase service-account credentials, private keys, or other secrets in them.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm
- A compatible Inventory Manager API
- A Firebase web project

### Clone the repository

```bash
git clone https://github.com/KaveeshaDharmaratne/inv-manager-frontend.git
cd inv-manager-frontend
```

### Install dependencies

```bash
npm install
```

### Configure the environment

```bash
cp .env.example .env
```

Update `.env` with your development configuration.

### Start the development server

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 📜 Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run type-check` | Run TypeScript/Vue checks |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source files |
| `npm run format:check` | Check formatting |
| `npm run test` | Run tests in watch mode |
| `npm run test:unit` | Run unit tests once |

---

## 🧪 Testing

Run the unit test suite:

```bash
npm run test:unit
```

Run tests interactively:

```bash
npm run test
```

Tests cover application areas such as:

- Vue components
- Pinia stores
- Router behaviour
- Composables
- Views
- Form and interface logic

---

## 🌐 Deployment

The public demo is deployed using Vercel.

### Build settings

```text
Framework:        Vite
Build command:    npm run build
Output directory: dist
```

Required production environment variables are configured directly in the Vercel project.

The included `vercel.json` provides SPA routing support so Vue Router routes continue to work when opened or refreshed directly.

---

## 🔗 Demo API

The frontend communicates with the dedicated demo [backend](https://github.com/KaveeshaDharmaratne/inventory-manager-demo-backend/):

### [Inventory Manager Demo API](https://inventory-manager-demo-backend.vercel.app)

API requests from authenticated guests include a Firebase ID token:

```http
Authorization: Bearer <firebase-id-token>
```

The backend verifies the token before allowing access to protected routes.

---

## 🗃️ Demo Data

All data available through the public demo is fictional and exists only to demonstrate the application's workflows.

The demo environment may contain sample:

- Products
- Dealers
- Stock quantities
- Sales
- Returns
- Goods delivery notes
- Invoices
- Stock transaction history

No operational or private business data is used by the demo environment.

---

## 🛣️ Possible Future Improvements

- Dashboard analytics and charts
- Product pricing and price management
- Accounting and financial management features
- Sales revenue, expenses, profit, and loss tracking
- Financial summaries and reports
- CSV/PDF report exports
- Role-based access control
- Barcode or QR scanning
- Bulk inventory imports
- Advanced audit logs

---

## 👨‍💻 Author

Developed and maintained by [Kaveesha Dharmaratne](https://github.com/KaveeshaDharmaratne) & [Lahiru Wimalarathna](https://github.com/lahiruC22).

---

## 📄 License

This repository is publicly available for portfolio and demonstration purposes.

No open-source license is currently granted.

---

<div align="center">

**Built to demonstrate a practical end-to-end inventory management workflow.**

[🚀 Open Demo](https://inv-manager-frontend-alpha.vercel.app)

</div>