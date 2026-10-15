import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';

export default function GuestbookDanmaku({ wishes }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate wishes array to create an infinite seamless upward scroll loop
  const displayWishes = [...wishes, ...wishes];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 72,
        left: 'max(14px, calc(50% - 226px))',
        width: 'min(285px, calc(100vw - 32px))',
        zIndex: 50,
        pointerEvents: 'auto'
      }}
    >
      {/* Visibility Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 4 }}>
        <button
          onClick={() => setIsVisible((prev) => !prev)}
          title={isVisible ? "Ẩn lời chúc" : "Hiện lời chúc"}
          style={{
            fontSize: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: 'rgba(0, 0, 0, 0.25)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            padding: '2px 8px',
            borderRadius: 999,
            color: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          {isVisible ? <EyeOff size={11} /> : <Eye size={11} />}
          <span>{isVisible ? 'Ẩn lời chúc' : 'Hiện lời chúc'}</span>
        </button>
      </div>

      {/* Auto-scrolling Blessing Box (CineLove Style) */}
      {isVisible && (
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          style={{
            height: 160,
            overflow: 'hidden',
            position: 'relative',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)'
          }}
        >
          <div
            className="blessing-scroll-track"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              animation: 'scrollUpBlessings 26s linear infinite',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {displayWishes.map((w, index) => (
              <div
                key={`${w.id || index}-${index}`}
                style={{
                  background: 'rgba(225, 117, 117, 0.42)', // CineLove style transparent rose-pink
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: 8,
                  padding: '4px 10px',
                  color: '#FFFFFF',
                  fontSize: 11,
                  lineHeight: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  flexShrink: 0,
                  maxWidth: '100%'
                }}
              >
                <span style={{ fontWeight: 700, color: '#FFE6EC', flexShrink: 0 }}>
                  {w.sender}:
                </span>
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {w.content}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
