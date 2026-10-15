import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function QuoteSection({ quote }) {
  return (
    <section
      style={{
        padding: '50px 24px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, #FAF7F2 0%, #FFFFFF 100%)',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="glass-card"
        style={{
          padding: '40px 24px',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Background Watermark */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-script)',
            fontSize: 120,
            color: 'rgba(184, 125, 75, 0.05)',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}
        >
          Sweet Love
        </div>

        {/* Quote Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'var(--color-rose-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: 'var(--color-rose)'
          }}
        >
          <Quote size={20} />
        </div>

        {/* English Love Poetry */}
        <p
          style={{
            fontFamily: 'var(--font-quote)',
            fontSize: 18,
            fontStyle: 'italic',
            lineHeight: 1.7,
            color: 'var(--color-text-main)',
            marginBottom: 16
          }}
        >
          "{quote.en}"
        </p>

        <div className="gold-divider" />

        {/* Vietnamese Translation */}
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 15,
            color: 'var(--color-text-muted)',
            lineHeight: 1.8,
            maxWidth: 340,
            margin: '0 auto'
          }}
        >
          {quote.vi}
        </p>
      </motion.div>
    </section>
  );
}
