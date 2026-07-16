import React from 'react';
import { Apple, Shirt, Laptop, RotateCcw, Filter, Star } from 'lucide-react';

const CATEGORY_ICONS = {
  Groceries: <Apple size={16} />,
  Clothing: <Shirt size={16} />,
  Electronics: <Laptop size={16} />
};

export default function FilterPanel({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRanges,
  setSelectedPriceRanges,
  minRating,
  setMinRating,
  categoryCounts,
  resetFilters,
  hasActiveFilters
}) {
  
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handlePriceRangeChange = (range) => {
    if (selectedPriceRanges.includes(range)) {
      setSelectedPriceRanges(selectedPriceRanges.filter(r => r !== range));
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const priceRangesList = [
    { label: 'Below ₹500', value: 'below-500' },
    { label: '₹500 – ₹2,000', value: '500-2000' },
    { label: 'Above ₹2,000', value: 'above-2000' }
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4.2 ★ & Above', value: 4.2 },
    { label: '4.5 ★ & Above', value: 4.5 },
    { label: '4.8 ★ & Above', value: 4.8 }
  ];

  return (
    <aside className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      padding: '1.75rem',
      border: '1px solid var(--border-color)',
      height: 'fit-content',
      position: 'sticky',
      top: '90px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.75rem'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={18} style={{ color: 'var(--primary)' }} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Filters</h2>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            <RotateCcw size={13} /> Reset
          </button>
        )}
      </div>

      {/* Category Section */}
      <div>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
          Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {Object.keys(categoryCounts).map((category) => (
            <label key={category} className="custom-checkbox-container">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="checkmark"></span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {CATEGORY_ICONS[category] || null}
                  </span>
                  {category}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', backgroundColor: 'var(--bg-tertiary)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>
                  {categoryCounts[category]}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
          Price Range
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {priceRangesList.map((range) => (
            <label key={range.value} className="custom-checkbox-container">
              <input
                type="checkbox"
                checked={selectedPriceRanges.includes(range.value)}
                onChange={() => handlePriceRangeChange(range.value)}
              />
              <span className="checkmark"></span>
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Section */}
      <div>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.85rem' }}>
          Customer Rating
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {ratingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMinRating(opt.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid',
                borderColor: minRating === opt.value ? 'var(--primary)' : 'var(--border-color)',
                backgroundColor: minRating === opt.value ? 'var(--primary-glow)' : 'transparent',
                color: minRating === opt.value ? 'var(--primary)' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '0.85rem',
                fontWeight: minRating === opt.value ? 600 : 500
              }}
            >
              <Star
                size={14}
                style={{
                  fill: minRating === opt.value || opt.value > 0 ? 'currentColor' : 'none'
                }}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
