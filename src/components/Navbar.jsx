import React from 'react';
import { Search, ShoppingBag, Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar({
  cartCount,
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme
}) {
  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid var(--border-color)',
      padding: '1rem 0',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            color: 'white',
            width: '40px',
            height: '40px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)'
          }}>
            <Sparkles size={20} />
          </div>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em'
          }}>
            BazaarExpress
          </span>
        </div>

        {/* Global Search Bar (Only shown on Navbar for desktop/tablet, styled beautifully) */}
        <div style={{ flex: '1', maxWidth: '500px' }} className="navbar-search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon-inside" size={18} />
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Action Elements */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Theme Toggler */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Cart Icon */}
          <div style={{ position: 'relative', cursor: 'pointer' }}>
            <button style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <ShoppingBag size={18} />
            </button>
            {cartCount > 0 && (
              <span className="animate-fade-in" style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-secondary)',
                boxShadow: '0 2px 5px rgba(0,0,0,0.15)'
              }}>
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile indicator */}
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
            border: '2px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            color: '#475569',
            cursor: 'pointer'
          }}>
            IN
          </div>
        </div>
      </div>
    </nav>
  );
}
