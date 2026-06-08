# Inventory Management Automation — Implementation Plan

## Phase 1: Foundation (Persistence + Core Automation)
- [x] Add persistence layer (localStorage) for items + user session
- [x] Refactor `src/App.jsx` to load/save inventory state

- [x] Implement Suppliers CRUD (real UI + persisted data)


- [x] Implement transaction-based inventory updates (receive/adjust) + stock ledger

- [x] Update Inventory UI to use transaction flows

- [ ] Add per-item fields needed for automation (reorderPoint, targetLevel, preferredSupplierId)

## Phase 2: Reorder Automation
- [ ] Compute reorder suggestions from reorderPoint/targetLevel
- [ ] Add “Generate Reorder List” (CSV export)
- [ ] Update dashboard to reflect reorder workload

## Phase 3: Reports
- [ ] Implement real reports (valuation, low stock, transactions)
- [ ] Add CSV export for reports

## Phase 4: UX + Polish
- [ ] Improve form validation (inline errors)
- [ ] Confirmation dialogs for delete
- [ ] Tailwind class verification/fixes

## Phase 5: Quality
- [x] Run `npm run lint`, `npm run build`
- [ ] Smoke test flows

