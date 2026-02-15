# Inventory Management Dashboard

A React + Vite single-page inventory dashboard with routing, stock management, supplier and reports pages, CSV import/export, and chart-based insights.

## Tech Stack

- **Frontend framework:** React 19
- **Build tool:** Vite 7
- **Routing:** react-router-dom 7
- **Styling:** Tailwind CSS 4 + PostCSS
- **Charts:** Recharts
- **Data import/export:** PapaParse, json2csv
- **Linting:** ESLint 9

## Current Project Structure

```text
inventory-management/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ InventoryForm.jsx
│  │  ├─ InventoryTable.jsx
│  │  ├─ Navbar.jsx
│  │  └─ Sidebar.jsx
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  ├─ Inventory.jsx
│  │  ├─ Login.jsx
│  │  ├─ NotFound.jsx
│  │  ├─ Reports.jsx
│  │  └─ Suppliers.jsx
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ eslint.config.js
├─ postcss.config.js
├─ tailwind.config.js
├─ vite.config.js
└─ package.json
```

## Tech Stack Structure Review

### What is good

1. **Simple, maintainable React app layout** with separation between pages and reusable components.
2. **Modern toolchain** (React 19 + Vite 7 + ESLint 9).
3. **Clear feature coverage** for inventory CRUD-like flow, dashboard analytics, login gate, and reports.
4. **Good library choices** for the use case (Recharts and CSV tooling).

### Highest-priority corrections

1. **Tailwind CSS versioning mismatch risk (Priority: High)**  
   The project uses Tailwind v4 package versions while keeping a v3-style `tailwind.config.js` customization approach (custom color tokens like `bg-bg`, `text-primary`, `bg-warn`). In Tailwind v4, token configuration is CSS-first by default, and custom utility generation may not behave as expected without proper v4 configuration flow.

   **Recommended fix (choose one approach):**
   - **Option A (recommended):** Stay on Tailwind v4 and move design tokens to `src/index.css` using v4 `@theme` variables and/or explicit utility layers.
   - **Option B:** Downgrade to Tailwind v3 if you want to keep current config semantics with minimal code refactor.

2. **State architecture scaling (Priority: Medium)**  
   App-level state (`user`, `items`, `dark`) is centralized in `App.jsx`. This is okay for small demos, but will become harder to maintain as features grow.

   **Recommended fix:** Introduce a small state layer (React Context + reducer, or Zustand) for auth and inventory state.

3. **Metadata cleanup in `package.json` (Priority: Low)**  
   Template fields are still present (`description`, `author`, `keywords`, `license` likely not final), and `main` points to `eslint.config.js`, which is unnecessary for this app.

   **Recommended fix:** Update metadata to reflect this product and remove irrelevant fields.

## Suggested Improvement Roadmap

### Phase 1 (stability)
- Align Tailwind setup (v4-first CSS tokens or downgrade to v3).
- Verify all custom classes render correctly (`bg-bg`, `text-primary`, `bg-warn`).
- Run lint/build after the style system fix.

### Phase 2 (maintainability)
- Extract shared types/shapes for inventory item objects.
- Add a dedicated state provider for auth/inventory.
- Add basic service helpers for CSV import/export and report formatting.

### Phase 3 (quality)
- Add unit tests for utility logic and critical component behavior.
- Add E2E smoke tests for login, add item, and report generation flow.

## Local Setup

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Linting:

```bash
npm run lint
```

## Conclusion

The overall stack choice is solid and appropriate for a small-to-medium inventory dashboard. The **main correction to prioritize is Tailwind configuration alignment** so design tokens and custom utility classes behave predictably.