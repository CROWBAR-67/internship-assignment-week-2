import React, { useState } from 'react';
import { Apple, Shirt, Laptop, Star, ShoppingCart, Check } from 'lucide-react';

const CATEGORY_ICONS = {
  Groceries: <Apple size={36} color="white" />,
  Clothing: <Shirt size={36} color="white" />,
  Electronics: <Laptop size={36} color="white" />
};

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    onAddToCart(product);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  // Calculate regular price from discount
  const originalPrice = Math.round(product.price / (1 - product.discount / 100));

  return (
    <article className="glass-panel animate-fade-in" style={{
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
      boxShadow: 'var(--shadow-sm)',
      position: 'relative',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.boxShadow = 'var(--shadow-premium)';
      e.currentTarget.style.borderColor = 'var(--primary)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      e.currentTarget.style.borderColor = 'var(--border-color)';
    }}
    >
      {/* Popular/Best Seller Badge */}
      {product.isPopular && (
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          backgroundColor: 'var(--badge-popular-bg)',
          color: 'var(--badge-popular-text)',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.25rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          zIndex: 10,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          Trending
        </span>
      )}

      {/* Discount Badge */}
      {product.discount > 0 && (
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: '#ef4444',
          color: 'white',
          fontSize: '0.7rem',
          fontWeight: 700,
          padding: '0.25rem 0.6rem',
          borderRadius: 'var(--radius-full)',
          zIndex: 10,
          letterSpacing: '0.05em'
        }}>
          {product.discount}% OFF
        </span>
      )}

      {/* Styled Image Backdrop (Premium CSS Gradient + Category Icon) */}
      <div style={{
        background: product.gradient,
        height: '160px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Grid Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.15,
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '16px 16px'
        }} />
        
        {/* Soft shadow behind icon */}
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-full)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          transform: 'scale(1)',
          transition: 'transform var(--transition-normal)'
        }}>
          {CATEGORY_ICONS[product.category]}
        </div>
      </div>

      {/* Content */}
      <div style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '0.75rem'
      }}>
        {/* Category & Stock Indicators */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}>
            {product.category}
          </span>
          
          <span className="badge" style={{
            backgroundColor: product.inStock ? 'var(--badge-instock-bg)' : 'var(--badge-outstock-bg)',
            color: product.inStock ? 'var(--badge-instock-text)' : 'var(--badge-outstock-text)',
            fontSize: '0.7rem'
          }}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: '1.4',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }} title={product.name}>
          {product.name}
        </h3>

        {/* Description */}
        <p style={{
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.5',
          margin: 0,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          height: '2.4rem' // Ensures cards remain aligned
        }}>
          {product.description}
        </p>

        {/* Rating Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.15rem',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '0.15rem 0.45rem',
            borderRadius: '4px',
            color: '#eab308',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            <Star size={12} fill="#eab308" stroke="#eab308" />
            <span>{product.rating}</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            ({product.reviews} reviews)
          </span>
        </div>

        {/* Price & Cart CTA */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-color)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.discount > 0 && (
                <span style={{ fontSize: '0.8rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                  ₹{originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdded}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: isAdded ? '#10b981' : 'var(--primary)',
              color: 'white',
              cursor: product.inStock ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              boxShadow: isAdded ? '0 4px 10px rgba(16, 185, 129, 0.2)' : 'none',
              transform: isAdded ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            {isAdded ? (
              <>
                <Check size={14} className="animate-fade-in" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
