import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FloatingToolbar({
  onOpenWishModal,
  onOpenGiftModal,
  likeCount,
  onLike
}) {
  const [floatingHearts, setFloatingHearts] = useState([]);

  const handleShootHeart = (e) => {
    onLike();

    confetti({
      particleCount: 15,
      spread: 40,
      origin: { x: 0.75, y: 0.9 },
      colors: ['#FF4969', '#FF9AA6', '#8B2F30']
    });

    const newHearts = Array.from({ length: 4 }).map(() => ({
      id: Math.random(),
      x: (Math.random() - 0.5) * 60,
      y: -Math.random() * 50 - 30,
      scale: Math.random() * 0.5 + 0.8,
      color: ['#FF4969', '#FF9AA6', '#8B2F30', '#FF3366'][Math.floor(Math.random() * 4)]
    }));

    setFloatingHearts((prev) => [...prev.slice(-12), ...newHearts]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 1200);
  };

  return (
    <>
      {/* Floating Hearts Particle Layer */}
      <div
        style={{
          position: 'fixed',
          bottom: 70,
          left: '50%',
          transform: 'translateX(50px)',
          width: 80,
          height: 120,
          pointerEvents: 'none',
          zIndex: 9999
        }}
      >
        <AnimatePresence>
          {floatingHearts.map((h) => (
            <motion.div
              key={h.id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.5 }}
              animate={{
                opacity: 0,
                x: h.x,
                y: -140,
                scale: h.scale,
                rotate: (Math.random() - 0.5) * 35
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%'
              }}
            >
              <Heart size={20} fill={h.color} stroke="none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Template 39 Floating Toolbar Dock */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 500,
          height: 60,
          boxSizing: 'border-box',
          padding: '0 12px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1000,
          pointerEvents: 'none'
        }}
      >
        {/* Left: Gửi lời chúc... Button */}
        <button
          onClick={onOpenWishModal}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            padding: '0 14px',
            color: '#FFFFFF',
            borderRadius: 30,
            fontSize: 13,
            height: 38,
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <span>Gửi lời chúc...</span>
          <MessageSquare size={16} color="#FFF" />
        </button>

        {/* Right Toolbar Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'auto' }}>
          {/* Bắn tim Pill Button */}
          <button
            onClick={handleShootHeart}
            style={{
              background: 'rgba(0, 0, 0, 0.45)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              padding: '0 12px',
              color: '#FFFFFF',
              borderRadius: 30,
              fontSize: 13,
              height: 38,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <span style={{ fontSize: 16 }}>💖</span>
            <span>Bắn tim</span>
          </button>

          {/* Gift Box Button */}
          <button
            onClick={onOpenGiftModal}
            title="Hộp Yêu Thương / Mừng Cưới"
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              padding: 6
            }}
          >
            <img 
              src="/images/template39/gift_box_icon.png" 
              alt="Hộp Quà" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </button>

          {/* Like Heart Button with counter */}
          <button
            onClick={handleShootHeart}
            title="Yêu thích"
            style={{
              position: 'relative',
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF9AA6 0%, #FF4969 100%)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 73, 105, 0.4)',
              cursor: 'pointer'
            }}
          >
            <Heart size={18} fill="#FFF" stroke="none" />
            <span
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                background: '#8B2F30',
                color: '#FFF',
                fontSize: 9,
                fontWeight: 700,
                borderRadius: '50%',
                minWidth: 16,
                height: 16,
                lineHeight: '16px',
                textAlign: 'center',
                padding: '0 2px'
              }}
            >
              {likeCount > 999 ? '999+' : likeCount}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
