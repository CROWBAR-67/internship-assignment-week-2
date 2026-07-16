# BazaarExpress 🛒

BazaarExpress is a high-performance, premium React.js e-commerce catalog featuring lightning-fast search and multi-criteria filters. The application operates entirely in real-time, responding instantly to user queries, category selections, price filters, and rating selections with **zero page reloads**.

Built with a curated set of **12 premium Indian products** (spanning Electronics, Clothing, and Groceries), the app demonstrates clean state management, modular component design, and a stunning user interface styled with vanilla CSS.

---

## 🌟 Key Features

1. **Instant Search:** Dynamic full-text search matching product names, descriptions, and categories.
2. **Multi-Select Categories:** Filter by *Electronics*, *Clothing*, and *Groceries* simultaneously with dynamic item counts.
3. **Price Range Filtering:** Segment products by:
   - Below ₹500
   - ₹500 – ₹2,000
   - Above ₹2,000
4. **Interactive Ratings Filter:** Restrict products to specific customer rating thresholds (e.g., 4.2+, 4.5+, 4.8+ Stars).
5. **Advanced Sorting:** Sort catalog items on-the-fly by:
   - **Popularity:** Calculated using review volume, average ratings, and trending tags.
   - **Price:** Low to High & High to Low.
   - **Customer Rating:** Sort by highest average score.
6. **Live Catalog Metrics:** A reactive hero dashboard indicating the number of matching items, global average rating, and active filters.
7. **Persisted Dark Mode:** Sleek glassmorphism theme toggle between light and dark modes, persisting user preference in `localStorage`.
8. **Interactive Micro-Animations:** Adds items to the cart with smooth scale animations and a success toast notification.

---

## 🛠️ Tech Stack & Design Aesthetics

- **Core Framework:** React 19 (via Vite)
- **Programming Language:** JavaScript (ES6+)
- **Styling:** Vanilla CSS 3 with custom CSS Variables (design tokens), flexbox, grid, and CSS animations.
- **Icons:** `lucide-react` for modern, clean vector iconography.
- **Design Philosophy:** Premium glassmorphism panels, customized form controls, glowing hover states, and smooth hardware-accelerated transitions.

---

## 📂 Project Architecture

```bash
week_2/
├── index.html            # Entry HTML (with metadata and SEO description)
├── package.json          # Dependency configurations
├── vite.config.js        # Vite compilation rules
└── src/
    ├── main.jsx          # React DOM entry point
    ├── App.jsx           # Parent container orchestrating states, filters, and theme
    ├── App.css           # Cleaned stub (consolidated styles)
    ├── index.css         # Consolidated design tokens, global themes & layout rules
    ├── data/
    │   └── products.js   # 12 sample Indian products data
    └── components/
        ├── Navbar.jsx    # Sticky navigation, logo, cart indicator & theme toggler
        ├── Hero.jsx      # Glassmorphic header rendering catalog performance statistics
        ├── FilterPanel.jsx# Sidebar layout housing all filtering selections and resets
        ├── ProductCard.jsx# Individual product tile with custom image gradients & micro-states
        └── EmptyState.jsx# Fallback indicator when zero filters match the search criteria
```

---

## ⚙️ Filtering & State Management Logic

The application leverages React's **unidirectional data flow** and optimizes rendering efficiency by using **Memoized Computations** (`useMemo`) for heavy filter routines:

- **Filter Pipeline:** The filtered products are re-evaluated whenever any dependency changes (`searchQuery`, `selectedCategories`, `selectedPriceRanges`, `minRating`, `sortBy`):
  ```javascript
  const filteredProducts = useMemo(() => {
    let result = [...productsData];
    
    // 1. Search filter
    if (searchQuery) { ... }
    
    // 2. Category multi-select filter
    if (selectedCategories.length > 0) { ... }
    
    // 3. Price range matching
    if (selectedPriceRanges.length > 0) { ... }
    
    // 4. Minimum rating matching
    if (minRating) { ... }
    
    // 5. Sorting application
    return result.sort(...)
  }, [searchQuery, selectedCategories, selectedPriceRanges, minRating, sortBy]);
  ```
- **Local Storage Integration:** Persists dark theme selection state on mount/update:
  ```javascript
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  ```

---

## 🚀 Getting Started

Follow these instructions to run the application locally on your machine.

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed.

### Installation

1. Clone or download this repository to your computer:
   ```bash
   cd week_2
   ```

2. Install the package dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the local URL provided by Vite:
   ```text
   http://localhost:5173
   ```

### Building for Production

To compile a minified build:
```bash
npm run build
```
This outputs compiled static assets inside a `dist/` directory, optimized for deployment.

---

## 🔒 Verification & Compliance

This codebase has been verified to ensure:
- **0 build warnings or lint errors** using the production Vite bundler.
- Responsive scaling on mobile devices, tablets, and wide desktop screens.
- Seamless accessibility (using semantic elements like `<nav>`, `<aside>`, `<main>`, `<article>`, and `<footer>`).
