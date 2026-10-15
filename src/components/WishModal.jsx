import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Send, Heart, Smile } from 'lucide-react';

export default function WishModal({ isOpen, onClose, onAddWish }) {
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const quickEmojis = ['💕', '💐', '🥂', '🎉', '👰', '🤵', '✨', '💖'];

  const handleAddEmoji = (emoji) => {
    setContent((prev) => prev + emoji);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sender.trim() || !content.trim()) return;

    onAddWish({
      id: Date.now().toString(),
      sender: sender.trim(),
      content: content.trim(),
      time: 'Vừa xong'
    });

    // Small celebratory confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF758C', '#C04D63', '#ECC89B']
      });
    } catch {}

    setSender('');
    setContent('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          background: 'rgba(18, 16, 16, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: 380,
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--color-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                letterSpacing: 3,
                color: 'var(--color-rose)',
                textTransform: 'uppercase'
              }}
            >
              Wedding Wishes
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                color: 'var(--color-text-main)',
                marginTop: 2,
                fontWeight: 600
              }}
            >
              GỬI LỜI CHÚC PHÚC
            </h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
              Lời chúc của bạn sẽ xuất hiện trực tiếp trên màn hình thiệp cưới!
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Sender Name */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                Tên của bạn *
              </label>
              <input
                type="text"
                required
                placeholder="VD: Bạn Linh, Minh Anh..."
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--color-border-gold)',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Content */}
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                Lời chúc gửi cô dâu chú rể *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Nhập lời chúc chân thành của bạn..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--color-border-gold)',
                  fontSize: 13,
                  outline: 'none',
                  fontFamily: 'inherit',
                  resize: 'none'
                }}
              />
            </div>

            {/* Quick Emojis */}
            <div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {quickEmojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleAddEmoji(emoji)}
                    style={{
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border-soft)',
                      borderRadius: 8,
                      padding: '4px 8px',
                      fontSize: 14,
                      cursor: 'pointer'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', marginTop: 8 }}
            >
              <Send size={15} />
              <span>Gửi lời chúc ngay</span>
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
