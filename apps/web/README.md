# 🚀 sparkit-boilerplate

A scalable, modern React boilerplate built with **Vite** to kickstart your next web app with batteries included.

---

## 🧰 Tech Stack

- **React 18** – Modern, performant UI library
- **Vite** – Lightning-fast dev/build tool
- **TypeScript** – Fully typed for safety and scalability
- **Zustand** – Simple and powerful state management
- **TanStack Query** – Powerful async data fetching & caching
- **Tailwind CSS** – Utility-first styling with design freedom
- **React Hook Form** – Simple, performant forms
- **i18next** – Internationalization support
- **Helmet** – SEO-friendly metadata
- **TanStack Router** – Type-safe, file-based routing system
- **Custom CLI (EJS-based)** – Easily scaffold components, interfaces, and classes

---

## 💡 Philosophy

`sparkit-boilerplate` is inspired by tools like **Ignite** (React Native) and **T3 Stack** (Next.js), aiming to provide:

- **Scalability** – Designed for growing teams and large apps
- **Simplicity** – Easy to onboard new developers
- **Convention over configuration** – Consistent folder structure and patterns
- **Separation of concerns** – Clean `modules/`, `services/`, `store/` layout
- **CLI productivity** – Save time with a custom CLI generator

---

## 🗂 Folder Structure Highlights

```bash
src/
│
├── assets/             # Images, icons, fonts
├── components/         # Shared UI components
├── hooks/              # Reusable logic
├── lib/                # Axios instance, utils, constants
├── modules/            # Feature-based modules (home, auth, dashboard, etc.)
├── routes/             # TanStack Router route definitions
├── services/           # API communication layer
├── store/              # Global Zustand stores
├── i18n/               # Translation configuration
├── types/              # App-wide TypeScript types
├── App.tsx             # Root app
└── main.tsx            # Entry point
```

---

## 🚀 Getting Started

```bash
yarn install
yarn dev
```

---

## ⚙️ CLI Tools

```bash
yarn spark g component Button
yarn spark g interface User
yarn spark g class AuthService
```

> Powered by [EJS](https://ejs.co) templates for full control.

---

## ✅ Why Use This?

- 💨 Fast startup and build via Vite
- 🧠 Designed for real-world apps
- 🧼 Prettier + ESLint pre-configured
- 🧪 Testing-ready (Jest or Vitest support optional)
- ✨ “Use this template” ready for GitHub
