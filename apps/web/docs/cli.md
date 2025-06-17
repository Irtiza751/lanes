# ⚡ Sparkit CLI Generator

A simple CLI tool to generate boilerplate files (component, class, interface) with consistent naming and structure using EJS templates.

---

## 📦 Installation

If not already done, ensure you have the CLI available via a script in your `package.json`:

```json
{
  "scripts": {
    "cli": "tsx ./scripts/cli/index.ts"
  }
}
```

---

## 🚀 Usage

```bash
yarn cli g <type> <name-or-path> [--dry-run]
```

---

### 🔧 Arguments

| Argument      | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `<type>`      | Type of file to generate: `component`, `class`, or `interface`. |
| `<name/path>` | Name of the file (with optional path relative to `src/`).       |

---

### 🏷️ Options

| Flag        | Description                                                              |
| ----------- | ------------------------------------------------------------------------ |
| `--dry-run` | Prints the output path and generated content instead of writing to disk. |

---

## 🧠 Examples

### ✅ Generate a component with fallback path

```bash
yarn cli g component Button
```

Creates: `src/shared/components/Button.tsx`

---

### ✅ Generate a class with custom directory

```bash
yarn cli g class services/auth/UserService
```

Creates: `src/services/auth/UserService.ts`

---

### ✅ Generate an interface and suffix it automatically

```bash
yarn cli g interface user/User
```

Creates: `src/user/UserInterface.ts`

---

### ✅ Dry run (preview)

```bash
yarn cli g component ui/Button --dry-run
```

Outputs the file content and destination without writing.

---

## 📁 Default Paths

If no custom path is provided, the CLI uses these default directories:

```ts
export const templateMap = {
  component: 'src/shared/components',
  class: 'src/shared/lib/classes',
  interface: 'src/types',
}
```
