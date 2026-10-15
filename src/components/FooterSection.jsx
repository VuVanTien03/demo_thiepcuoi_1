import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';

export default function FooterSection({ couple, onReopenEnvelope }) {
  return (
    <footer
      style={{
        padding: '50px 24px 110px', // Extra bottom space for floating toolbar
        background: 'linear-gradient(180deg, #FAF7F2 0%, #FFFFFF 100%)',
        textAlign: 'center',
        position: 'relative',
        borderTop: '1px solid rgba(184, 125, 75, 0.15)'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            letterSpacing: 4,
            color: 'var(--color-primary)',
            textTransform: 'uppercase'
          }}
        >
          With Sincere Gratitude
        </span>

        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--color-text-main)',
            margin: '8px 0 12px'
          }}
        >
          THANK YOU!
        </h3>

        <div className="gold-divider" />

        <p
          style={{
            fontSize: 14,
            color: 'var(--color-text-muted)',
            lineHeight: 1.8,
            maxWidth: 320,
            margin: '0 auto 24px'
          }}
        >
          Sự hiện diện và những lời chúc phúc ấm áp của quý khách là món quà quý giá nhất trong ngày vui của chúng mình.
        </p>

        <div
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 36,
            color: 'var(--color-rose)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 24
          }}
        >
          <span>{couple.groom.name}</span>
          <Heart size={16} fill="var(--color-rose)" stroke="none" />
          <span>{couple.bride.name}</span>
        </div>

        {/* Replay Envelope Button */}
        {onReopenEnvelope && (
          <button
            onClick={onReopenEnvelope}
            className="btn-outline"
            style={{ fontSize: 12, padding: '7px 16px', marginBottom: 24 }}
          >
            <Mail size={14} color="var(--color-primary)" />
            <span>Xem lại bìa thư sáp 3D</span>
          </button>
        )}

        <p
          style={{
            fontSize: 11,
            color: 'var(--color-text-light)',
            letterSpacing: 1
          }}
        >
          28 . 11 . 2026 • HÀ NỘI
        </p>
      </motion.div>
    </footer>
  );
}
