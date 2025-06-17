# Sparkit Boilerplate Architecture

Welcome to **Sparkit Boilerplate** — a modern, opinionated React starter built with Vite and designed for speed, scalability, and simplicity.

---

## Stack Overview

| Tool                | Purpose                     |
| ------------------- | --------------------------- |
| **Vite**            | Lightning-fast build tool   |
| **React**           | Core UI library             |
| **TypeScript**      | Static typing               |
| **Tailwind CSS**    | Utility-first styling       |
| **Zustand**         | Lightweight global state    |
| **React Hook Form** | Form state + validation     |
| **TanStack Query**  | Data fetching and caching   |
| **TanStack Router** | Type-safe routing           |
| **Helmet**          | SEO and head management     |
| **i18next**         | Internationalization (i18n) |

---

## Folder Structure

```
sparkit-boilerplate/
├── docs/
│   └── architecture.md           # Boilerplate and architecture documentation
│
├── public/
│   └── favicon.svg                # Public assets
│
├── scripts/
│   └── cli/
│       ├── templates/
│       │   └── module/             # EJS templates for CLI-generated modules
│       └── index.ts                # CLI entry file
│
├── src/
│   ├── assets/
│   │   ├── images/                 # Static images (e.g., logos, illustrations)
│   │   └── svg/                    # SVG files
│   │
│   ├── layouts/
│   │   └── MainLayout.tsx          # Main app layout
│   │
│   ├── modules/                    # Application modules (features)
│   │   └── example/
│   │       ├── components/         # Module-specific components
│   │       ├── hooks/              # Module-specific hooks
│   │       ├── services/           # API service layer
│   │       ├── types/              # Types/interfaces for the module
│   │       └── index.tsx           # Module entry point
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx           # TanStack Router configuration
│   │
│   ├── shared/
│   │   ├── components/             # Global reusable components
│   │   ├── hooks/                  # Global hooks
│   │   ├── lib/                    # Libraries (e.g., Axios instance)
│   │   ├── utils/                  # Utility functions
│   │   └── constants/              # App-wide constants
│   │
│   ├── store/
│   │   ├── modules/
│   │   │   └── example.store.ts    # Zustand store per module
│   │   ├── useAppStore.ts          # Global Zustand store (theme, settings, etc.)
│   │   └── index.ts                # Export all stores
│   │
│   ├── types/
│   │   └── global.d.ts             # Global TypeScript types
│   │
│   ├── App.tsx                     # Main App component
│   ├── main.tsx                    # ReactDOM render, QueryClientProvider, RouterProvider, etc.
│   └── vite-env.d.ts                # Vite's TypeScript environment types
│
├── .eslintrc.js                    # ESLint configuration
├── .prettierrc                      # Prettier configuration
├── tailwind.config.ts              # TailwindCSS config
├── postcss.config.ts               # PostCSS config
├── tsconfig.json                   # TypeScript config
├── vite.config.ts                  # Vite configuration
├── package.json
├── README.md
└── yarn.lock
```

---

## Modules Architecture

Each module (e.g. `auth`, `cart`) is self-contained:

- **UI** in `components/`
- **API** in `services.ts`
- **State** in `store.ts`
- **Types** in `types.ts`

This structure encourages separation of concerns and ease of maintenance.

---

## Routing

Using **TanStack Router** with:

- Lazy-loaded route components
- Nested layouts support
- Strong type inference
- Guards (via route loaders)

All routes are defined in `src/router/routes.tsx`.

---

## State Management

- **Zustand** handles global or local store needs per module.
- **React Query** handles async data and caching.
- Stores should be kept minimal and composable.

---

## CLI Tool

Inside `cli/`, a custom script generates:

- Components
- Interfaces
- Classes
- Modules

> Coming soon: automated route injection, i18n key scaffolding, and test boilerplates.

---

## Styling & Theming

- TailwindCSS provides atomic utility-first classes.
- Extend theme via `tailwind.config.js`
- Consistent design system encouraged in `config/theme.ts`

---

## i18n

- Managed using `react-i18next`
- Language files are in `src/i18n/`
- Auto-detects user language
- Modular translation keys preferred (`auth.login.title`, `cart.total.label`)

---

## SEO

- Helmet context provided app-wide
- Define SEO metadata in `config/seo.ts`
- Override per route using `<Helmet>` in pages

---

## Contributing

1. `yarn install`
2. `yarn dev`
3. Add a new module? Run CLI: `yarn cli g module auth`
4. Follow consistent coding style via ESLint + Prettier

---

## GitHub Template

This boilerplate is designed to be used via the **"Use this template"** button on GitHub.

---

## Future Plans

- CLI: More powerful generators
- Authentication flow
- Unit and E2E test setup
- GitHub Actions

---

## License

MIT

---

Built with love by Muhammad Irtiza (@Irtiza751).
