# Project Architecture & Constraints Blueprint

This file serves as the strict architectural single source of truth for all AI agents, assistants, and LLMs working on this repository. You must adhere to the definitions, folder layout, and rules specified below.

## Directory Layout

```text
.
├── AGENTS.md                  # This file (AI instructions)
├── CLAUDE.md                  # IDE/Build configuration shortcuts
├── app/                       # Routing views and layout compositions
│   ├── cart/                  # Cart view and page routing
│   │   └── components/        # Isolated UI pieces used ONLY in the cart route
│   ├── checkout/              # Checkout form routing steps
│   │   ├── components/        # Isolated UI pieces used ONLY in checkout
│   │   └── success/           # Order confirmation landing page
│   ├── products/              # Product listing / catalog route
│   │   ├── components/        # Isolated UI pieces used ONLY in catalog
│   │   └── [id]/              # Dynamic Product Detail Page (PDP)
│   ├── globals.css            # Tailwind global stylesheet
│   ├── layout.tsx             # Root template wrapper (Providers, Navbar, Footer)
│   └── page.tsx               # Main landing storefront
├── components/                # Global stateless UI design system primitives
│   ├── ui/                    # Atomic design elements (Button, Input, Badge, etc.)
│   ├── Navbar.tsx             # Global application header
│   └── Footer.tsx             # Global application footer
├── features/                  # Cross-route functional business modules
│   └── auth/                  # Shared state, modals, and forms for authentication
├── lib/                       # Low-level core configurations and SDK instances
│   ├── api.ts                 # Shared Axios client with global interceptors
│   └── utils.ts               # Core structural code helpers (e.g., Tailwind 'cn')
├── services/                  # Server logic, API request functions, and operations
│   └── products.ts            # Product API services pulling from lib/api
└── types/                     # Global Type definitions
    └── index.ts               # Centralized domain types (Product, Order, User)