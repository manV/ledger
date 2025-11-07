# Ledger Application

### Objective
Build a small Credit Ledger UI that lists transactions, computes a running balance, and supports optimistic add + undo, resilient fetching (debounce + abort + retry), client sorting/filtering/search - all without external state libraries.

Use the mock API provided in src/api.ts

To start dev server: `npm install` and `npm run dev`


### Core Requirements (Must-Have)
#### Ledger list + balance
- Render transactions (newest first) with type, amount, note, and a relative time (e.g., “2h ago”).
- Show a derived balance = sum(credits) − sum(debits), updated immediately on changes.


#### Add transaction
- form with fields: type (credit/debit), amount (> 0), optional note.
- If it fails: show error.
- Provide Undo for ~10 seconds after a successful add (clicking Undo calls deleteTransaction; if delete fails, restore the row).


#### Filtering, sorting, search (client-side)
- Filter: All | Credit | Debit.
- Sort: by amount (asc/desc) or by createdAt (asc/desc).
- Search over note with 300ms debounce.

#### Resilient fetching UX
- Initial load shows skeletons/placeholders.
- On fetch error, show an Retry button.
- If search text changes quickly, cancel in-flight fetch via AbortController and ensure latest-wins (no stale flashing).


#### Performance & code quality(good to have)
- Use useMemo/useCallback where it makes sense (derived lists, handlers).
- Keep re-renders low (stable keys, minimal prop churn).
- Type everything (no any).



Here is an example of how output should look like.
![alt text](image.png)