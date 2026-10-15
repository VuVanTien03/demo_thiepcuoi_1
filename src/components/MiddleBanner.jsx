import React from 'react';
import { motion } from 'framer-motion';

export default function MiddleBanner({ imageUrl }) {
  return (
    <section className="t39-middle-banner">
      <motion.img 
        src={imageUrl} 
        alt="Thanh Hằng & Minh Trí" 
        initial={{ opacity: 0, scale: 1.03 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      />
    </section>
  );
}
