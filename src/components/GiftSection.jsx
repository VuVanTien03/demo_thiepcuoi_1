import React from 'react';
import { motion } from 'framer-motion';

export default function GiftSection({ onOpenGiftModal }) {
  return (
    <section className="t39-gift-section" onClick={onOpenGiftModal}>
      <motion.div 
        className="t39-gift-icon-wrapper"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <img 
          src="/images/template39/gift_box_icon.png" 
          alt="Hộp Yêu Thương" 
        />
      </motion.div>

      <h3 className="t39-gift-title">Hộp Yêu Thương</h3>
    </section>
  );
}
