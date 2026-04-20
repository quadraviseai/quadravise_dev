# AGENTS.md

## Purpose
This project uses a custom MCP workflow to generate and update React + Ant Design applications safely and consistently.

The goal is:
- clean production-style UI
- reusable React components
- Ant Design-first implementation
- predictable file structure
- minimal unnecessary changes
- developer-safe code generation

---

## Core Rules

### 1. Framework and UI
- Use **React** only.
- Use **Ant Design** as the primary UI library.
- Do not use Bootstrap, Tailwind, Material UI, or raw static HTML website structures unless explicitly requested.
- Prefer Ant Design components before custom markup.

### 2. Styling
- Avoid large inline styles.
- Inline styles are allowed only for very small dynamic or layout-specific cases.
- Prefer Ant Design layout primitives such as:
  - Layout
  - Row
  - Col
  - Space
  - Flex
  - Card
  - Typography
- Keep spacing visually balanced and consistent.
- Do not add unnecessary padding, margin, shadows, or decorative elements.

### 3. Code Quality
- Use **functional components** only.
- Keep components modular and reusable.
- Avoid overengineering.
- Avoid unnecessary abstractions for small features.
- Keep naming clean and deterministic.
- Keep code readable and maintainable.

### 4. File Safety
- Do not refactor unrelated files.
- Do not rename unrelated files.
- Do not delete existing code unless explicitly instructed.
- When modifying an existing project, prefer isolated changes.
- Preserve existing project structure unless there is a strong reason not to.

### 5. Project Structure
Prefer this structure unless the project already uses a different convention:

- `src/pages`
- `src/components`
- `src/layouts`
- `src/routes`
- `src/services`
- `src/types`
- `src/schemas`
- `src/data`
- `src/hooks`
- `src/store`

If the project already follows another clear structure, match that structure instead of forcing a new one.

### 6. Routing
- Prefer `react-router-dom`.
- Keep routes explicit and readable.
- Do not duplicate existing routes.
- Keep route names aligned with page names.
- Use sidebar/top navigation entries only when the page is meant to be user-visible navigation.

### 7. Forms
- Use Ant Design `Form`.
- Keep labels clear and business-friendly.
- Use validation where appropriate.
- Prefer structured layouts over crowded forms.
- For CRUD pages, prefer modal or drawer forms unless the workflow clearly needs a full page form.

### 8. Tables and CRUD
- Use Ant Design `Table` for listing data.
- Include practical actions like:
  - Add
  - Edit
  - Delete
  - View
- Keep columns business-relevant.
- Do not generate fake complexity.
- Mock data should look realistic enough for UI testing.

### 9. TypeScript
- Prefer TypeScript when the project is already TS or when scaffolding a new production app.
- If TypeScript is used:
  - type component props
  - type form values
  - type entities
  - type table rows
- Keep types simple and useful.

### 10. API and Data Layer
- Service files should be clean and minimal.
- Prefer one service per entity/module.
- Keep endpoint naming predictable.
- Do not invent backend behavior beyond reasonable CRUD assumptions unless explicitly requested.

---

## UI Expectations

### General UI Standard
The generated UI should feel:
- professional
- clean
- business-focused
- responsive
- not overly decorative

### For Admin Panels
Prefer:
- sidebar layout
- clear page header
- summary cards where useful
- structured tables
- practical forms
- settings grouped in sections or tabs

### For Business Websites
Prefer:
- strong hero section
- clean content hierarchy
- readable cards/sections
- contact or CTA blocks
- clear service/product presentation

### For Ecommerce/Inventory Work
Prefer:
- cards or tables for products
- category visibility
- status labels/tags
- stock/inventory clarity
- order/customer separation

---

## MCP-Specific Rules

### When generating new code
- Prefer isolated, additive changes.
- Generate complete files when creating new modules.
- Avoid partial broken snippets.
- Ensure imports are included.
- Ensure routes/menu entries are not duplicated.

### When updating code
- Read the existing structure first if possible.
- Match existing file naming and extension style (`.js/.jsx` vs `.ts/.tsx`).
- Preserve current project conventions where reasonable.
- Avoid changing formatting style unnecessarily.

### When preview mode is available
- Prefer preview/dry-run before destructive updates.
- Show file list and change targets clearly.

---

## Output Rules for Agents

When asked to create or modify code:

- Return code only if specifically requested.
- Otherwise keep explanations brief and practical.
- Do not include long theory unless asked.
- Do not output placeholder pseudo-code when real code can be written.
- Do not use lorem ipsum in production-like UI.
- Use realistic labels and business-friendly text.

---

## Preferred Naming Conventions

### Pages
- `DashboardPage`
- `ServicesPage`
- `OrdersPage`
- `CustomersPage`

### Components
- `ServiceForm`
- `CustomerTable`
- `InventoryCard`
- `AppLayout`

### Services
- `services/customerService.ts`
- `services/orderService.ts`

### Types
- `types/Customer.ts`
- `types/Order.ts`

### Schemas
- `schemas/CustomerSchema.ts`
- `schemas/OrderSchema.ts`

---

## Do Not Do These
- Do not switch to another UI framework without being asked.
- Do not create plain HTML/CSS websites instead of React pages.
- Do not refactor the whole project when only one page/module is requested.
- Do not introduce random dependencies.
- Do not use multiple competing styling systems.
- Do not generate bloated code for simple requirements.
- Do not change working code outside requested scope.

---

## Strong Defaults
Unless told otherwise, assume:
- React + Ant Design
- reusable components
- responsive layout
- `react-router-dom`
- business-oriented design
- maintainable folder structure
- minimal unrelated changes

---

## Good Example Requests
- Generate a Services CRUD module using Ant Design.
- Create a Customers page with table and modal form.
- Scaffold a TypeScript admin panel with sidebar layout.
- Add Inventory route and menu item safely.
- Create Zod schema and API service for Orders.

---

## Final Principle
Optimize for **developer productivity, consistency, and safety**.

Every generated change should be:
- easy to understand
- easy to extend
- safe to review
- aligned with the project structure
- useful in real development