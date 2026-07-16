import React from 'react';
import { ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function Hero({ totalProducts, activeCount, avgRating }) {
  return (
    <div style={{
      marginTop: '2rem',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      position: 'relative',
      background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)',
      border: '1px solid var(--border-color)',
      padding: '2.5rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      animation: 'fadeIn 0.5s ease-out'
    }}>
      {/* Background Decorative Glows */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '-50px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, rgba(255,255,255,0) 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: 'var(--primary-glow)',
          color: 'var(--primary)',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '1rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          <Sparkles size={12} /> Instant Filter Engine Activated
        </div>

        <h1 style={{
          fontSize: '2.4rem',
          lineHeight: '1.2',
          marginBottom: '0.5rem',
          fontWeight: 800,
          background: 'linear-gradient(to right, var(--text-primary) 30%, var(--primary) 70%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Discover Premium Indian Products
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '1.05rem',
          maxWidth: '650px',
          lineHeight: '1.6',
          marginBottom: '1.5rem'
        }}>
          Experience lightning-fast searches and dynamic categorization. Filter, sort, and browse electronics, clothing, and groceries instantly with zero page reloads.
        </p>

        {/* Live Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <div className="glass-panel" style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: 'var(--primary-glow)',
              color: 'var(--primary)',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {activeCount} <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>/ {totalProducts}</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Matching Products</div>
            </div>
          </div>

          <div className="glass-panel" style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: 'var(--secondary-glow)',
              color: 'var(--secondary)',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>★</span>
            </div>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                {avgRating} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>★</span>
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Average User Rating</div>
            </div>
          </div>

          <div className="glass-panel" style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
                Safe &amp; Secure
              </div>
              <div style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--text-secondary)' }}>100% Verified Indian Sellers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
