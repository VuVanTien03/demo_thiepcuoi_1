import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection({ hero, couple }) {
  return (
    <section className="t39-hero">
      {/* Top Floating Script Title */}
      <motion.h1 
        className="t39-hero-top-script"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {hero.title || "Save The Date"}
      </motion.h1>

      {/* Main Couple Hero Photo with Bottom Script Overlay */}
      <div className="t39-hero-image-wrapper">
        <motion.img 
          src={hero.image} 
          alt={`${couple.bride.name} & ${couple.groom.name}`}
          className="t39-hero-img"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        <motion.div 
          className="t39-hero-couple-overlay"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="t39-hero-couple-name">{couple.bride.name}</div>
          <div className="t39-hero-ampersand">&amp;</div>
          <div className="t39-hero-couple-name">{couple.groom.name}</div>
        </motion.div>
      </div>
    </section>
  );
}
