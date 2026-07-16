import React from 'react';
import { HelpCircle, RefreshCw } from 'lucide-react';

export default function EmptyState({ resetFilters }) {
  return (
    <div className="glass-panel animate-fade-in" style={{
      gridColumn: '1 / -1',
      padding: '4rem 2rem',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border-color)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1.5rem'
    }}>
      {/* Icon Wrapper */}
      <div style={{
        backgroundColor: 'var(--bg-tertiary)',
        width: '80px',
        height: '80px',
        borderRadius: 'var(--radius-full)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        border: '2px dashed var(--border-color)',
      }}>
        <HelpCircle size={40} />
      </div>

      {/* Messages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          No Products Found
        </h3>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          maxWidth: '400px',
          margin: '0 auto',
          lineHeight: '1.5'
        }}>
          We couldn't find any products matching your current combination of categories, price ranges, or search terms. Try adjusting your filters.
        </p>
      </div>

      {/* Actions */}
      <button
        onClick={resetFilters}
        className="btn-primary"
        style={{
          boxShadow: '0 4px 12px var(--primary-glow)',
          fontSize: '0.9rem',
          padding: '0.65rem 1.25rem'
        }}
      >
        <RefreshCw size={16} /> Reset All Filters
      </button>
    </div>
  );
}
