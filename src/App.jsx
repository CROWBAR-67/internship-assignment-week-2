import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FilterPanel from './components/FilterPanel';
import ProductCard from './components/ProductCard';
import EmptyState from './components/EmptyState';
import { productsData } from './data/products';
import { CheckCircle } from 'lucide-react';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  // Cart & Feedback States
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');

  // Sync theme with body element
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleAddToCart = (product) => {
    setCartCount(prev => prev + 1);
    setToast({ show: true, message: `Successfully added "${product.name}" to cart!` });
    
    // Clear toast after timeout
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 2500);
  };

  // Reset Filters logic
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedPriceRanges([]);
    setMinRating(0);
    setSortBy('popularity');
  };

  // Determine if any filters are actively set
  const hasActiveFilters = useMemo(() => {
    return (
      searchQuery !== '' ||
      selectedCategories.length > 0 ||
      selectedPriceRanges.length > 0 ||
      minRating !== 0
    );
  }, [searchQuery, selectedCategories, selectedPriceRanges, minRating]);

  // Dynamic global category counts (independent of categories filter but respects search query if desired, let's keep it global for consistency)
  const categoryCounts = useMemo(() => {
    const counts = { Groceries: 0, Clothing: 0, Electronics: 0 };
    productsData.forEach(p => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });
    return counts;
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // 1. Search Query filter (matches Name, Description, Category)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }

    // 2. Category filter
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }

    // 3. Price Range filter
    if (selectedPriceRanges.length > 0) {
      result = result.filter(p => {
        return selectedPriceRanges.some(range => {
          if (range === 'below-500') return p.price < 500;
          if (range === '500-2000') return p.price >= 500 && p.price <= 2000;
          if (range === 'above-2000') return p.price > 2000;
          return true;
        });
      });
    }

    // 4. Rating filter
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    // 5. Sorting
    result.sort((a, b) => {
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'rating-desc') {
        return b.rating - a.rating;
      }
      // default: popularity (reviews * rating or popularity badge)
      const scoreA = a.reviews * a.rating + (a.isPopular ? 1000 : 0);
      const scoreB = b.reviews * b.rating + (b.isPopular ? 1000 : 0);
      return scoreB - scoreA;
    });

    return result;
  }, [searchQuery, selectedCategories, selectedPriceRanges, minRating, sortBy]);

  // Calculate Average Rating of matching items
  const avgRating = useMemo(() => {
    if (filteredProducts.length === 0) return 0;
    const sum = filteredProducts.reduce((acc, p) => acc + p.rating, 0);
    return (sum / filteredProducts.length).toFixed(1);
  }, [filteredProducts]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Premium Navbar */}
      <Navbar
        cartCount={cartCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <main className="app-container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hero Section */}
        <Hero
          totalProducts={productsData.length}
          activeCount={filteredProducts.length}
          avgRating={avgRating}
        />

        {/* Catalog Layout */}
        <div className="main-layout">
          {/* Sidebar Filters */}
          <FilterPanel
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedPriceRanges={selectedPriceRanges}
            setSelectedPriceRanges={setSelectedPriceRanges}
            minRating={minRating}
            setMinRating={setMinRating}
            categoryCounts={categoryCounts}
            resetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Catalog Grid Area */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Catalog Sorting Header */}
            <div className="glass-panel" style={{
              padding: '1rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredProducts.length}</strong> of{' '}
                  <strong style={{ color: 'var(--text-primary)' }}>{productsData.length}</strong> products
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '0.45rem 2rem 0.45rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      outline: 'none',
                      cursor: 'pointer',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.6rem center',
                      backgroundSize: '0.95rem'
                    }}
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Customer Rating</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Badges */}
              {hasActiveFilters && (
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                  marginTop: '0.75rem',
                  alignItems: 'center',
                  borderTop: '1px dashed var(--border-color)',
                  paddingTop: '0.75rem'
                }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                    Active Filters:
                  </span>
                  
                  {/* Category Pills */}
                  {selectedCategories.map(cat => (
                    <span key={cat} style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: 'var(--primary-glow)',
                      color: 'var(--primary)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {cat}
                      <button
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== cat))}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          padding: '0 0.1rem',
                          lineHeight: 1
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}

                  {/* Price Pills */}
                  {selectedPriceRanges.map(range => {
                    const label = range === 'below-500' ? 'Below ₹500' : range === '500-2000' ? '₹500 - ₹2000' : 'Above ₹2,000';
                    return (
                      <span key={range} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        backgroundColor: 'var(--primary-glow)',
                        color: 'var(--primary)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 600
                      }}>
                        {label}
                        <button
                          onClick={() => setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range))}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'inherit',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            display: 'inline-flex',
                            padding: '0 0.1rem',
                            lineHeight: 1
                          }}
                        >
                          &times;
                        </button>
                      </span>
                    );
                  })}

                  {/* Rating Pill */}
                  {minRating > 0 && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: 'var(--primary-glow)',
                      color: 'var(--primary)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      {minRating}+ ★
                      <button
                        onClick={() => setMinRating(0)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          padding: '0 0.1rem',
                          lineHeight: 1
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  )}

                  {/* Search Query Pill */}
                  {searchQuery && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      backgroundColor: 'var(--secondary-glow)',
                      color: 'var(--secondary)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      Search: "{searchQuery}"
                      <button
                        onClick={() => setSearchQuery('')}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'inherit',
                          cursor: 'pointer',
                          fontSize: '0.85rem',
                          fontWeight: 'bold',
                          display: 'inline-flex',
                          padding: '0 0.1rem',
                          lineHeight: 1
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  )}

                  {/* Clear All Link */}
                  <button
                    onClick={resetFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      borderBottom: '1px dashed var(--text-muted)',
                      padding: '0 0.1rem',
                      marginLeft: 'auto'
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}
            </div>

            {/* Grid display */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              width: '100%'
            }}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <EmptyState resetFilters={resetFilters} />
              )}
            </div>
          </section>
        </div>
      </main>

      {/* Premium Toast Notification */}
      <div className={`toast-msg ${toast.show ? 'show' : ''}`}>
        <CheckCircle size={18} />
        <span>{toast.message}</span>
      </div>

      {/* Premium Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 0',
        backgroundColor: 'var(--bg-secondary)',
        marginTop: 'auto',
        transition: 'background-color var(--transition-normal)'
      }}>
        <div className="app-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div>
            &copy; 2026 <strong>BazaarExpress</strong>. Designed with React.js &amp; CSS.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Contact Us</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
