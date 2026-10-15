import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

export default function IntroEnvelope({ couple, hero, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Burst golden heart sparkles
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#ECC89B', '#B87D4B', '#FF758C', '#FFFFFF'],
        shapes: ['circle']
      });
    } catch {}

    // Callback to parent after slide-up animation
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -60, transition: { duration: 0.8, ease: 'easeInOut' } }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(circle at 50% 30%, #302625 0%, #171313 100%)',
          padding: 16
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 420,
            perspective: 1200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Header Note */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', marginBottom: 28 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 12,
                letterSpacing: 4,
                color: 'var(--color-primary-light)',
                textTransform: 'uppercase'
              }}
            >
              Wedding Invitation
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 38,
                color: '#fff',
                marginTop: 4,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              {couple.groom.name} &amp; {couple.bride.name}
            </h2>
          </motion.div>

          {/* 3D Envelope Container */}
          <motion.div
            style={{
              width: '100%',
              height: 290,
              position: 'relative',
              borderRadius: 16,
              background: 'linear-gradient(145deg, #FAF7F2 0%, #EFE9E0 100%)',
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(184, 125, 75, 0.3)',
              overflow: 'visible',
              cursor: 'pointer'
            }}
            onClick={handleOpenEnvelope}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Elegant Inner Card (slides out upon opening) */}
            <motion.div
              animate={isOpen ? { y: -160, opacity: 1 } : { y: 0, opacity: 0.8 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                top: 15,
                left: 15,
                right: 15,
                bottom: 15,
                background: '#FFFFFF',
                borderRadius: 12,
                border: '1px solid rgba(184, 125, 75, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 10,
                  letterSpacing: 3,
                  color: 'var(--color-primary)'
                }}
              >
                SAVE OUR DATE
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: 1,
                  margin: '8px 0',
                  color: 'var(--color-text-main)'
                }}
              >
                15 . 12 . 2026
              </div>
              <p
                style={{
                  fontSize: 12,
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--color-text-muted)',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}
              >
                Trân trọng kính mời quý khách!
              </p>
            </motion.div>

            {/* Envelope Bottom Pocket (Folds) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 4,
                borderRadius: 16,
                pointerEvents: 'none',
                overflow: 'hidden'
              }}
            >
              {/* Bottom fold */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '55%',
                  background: 'linear-gradient(to top, #EDE5D8 0%, #FAF7F2 100%)',
                  clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)',
                  boxShadow: '0 -4px 15px rgba(0,0,0,0.04)'
                }}
              />
              {/* Left fold */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '50%',
                  background: 'linear-gradient(to right, #E7DDD0 0%, #FAF7F2 100%)',
                  clipPath: 'polygon(0% 0%, 0% 100%, 100% 50%)',
                  opacity: 0.85
                }}
              />
              {/* Right fold */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: '50%',
                  background: 'linear-gradient(to left, #E7DDD0 0%, #FAF7F2 100%)',
                  clipPath: 'polygon(100% 0%, 100% 100%, 0% 50%)',
                  opacity: 0.85
                }}
              />
            </div>

            {/* Gold Ribbon Crossing */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: 32,
                transform: 'translateY(-50%)',
                background: 'linear-gradient(90deg, #B87D4B 0%, #ECC89B 50%, #B87D4B 100%)',
                zIndex: 6,
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: 1,
                  background: 'rgba(255, 255, 255, 0.4)'
                }}
              />
            </div>

            {/* 3D Wax Seal (Con Dấu Sáp Hoàng Gia) */}
            <motion.div
              animate={
                isOpen
                  ? { scale: 1.4, opacity: 0, filter: 'blur(8px)' }
                  : { scale: [1, 1.05, 1] }
              }
              transition={
                isOpen
                  ? { duration: 0.4 }
                  : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
              }
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #E54B64 0%, #9B2236 60%, #680E1D 100%)',
                border: '3px solid #ECC89B',
                boxShadow: 'var(--shadow-wax)',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFE2B8'
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontWeight: 700,
                  fontSize: 16,
                  letterSpacing: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  textShadow: '0 1px 3px rgba(0,0,0,0.6)'
                }}
              >
                <span>H</span>
                <Heart size={10} fill="#FFE2B8" stroke="none" />
                <span>T</span>
              </div>
              <span
                style={{
                  fontSize: 7,
                  fontFamily: 'var(--font-display)',
                  letterSpacing: 1.5,
                  opacity: 0.85
                }}
              >
                OPEN
              </span>
            </motion.div>
          </motion.div>

          {/* Interaction Instruction Banner */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              marginTop: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              padding: '10px 22px',
              borderRadius: 999,
              border: '1px solid rgba(184, 125, 75, 0.3)',
              cursor: 'pointer'
            }}
            onClick={handleOpenEnvelope}
          >
            <Sparkles size={16} color="var(--color-primary-light)" />
            <span
              style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: 0.5
              }}
            >
              Chạm vào con dấu sáp để mở thiệp
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
