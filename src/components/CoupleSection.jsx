import React from 'react';
import { motion } from 'framer-motion';

export default function CoupleSection({ couple }) {
  const { bride, groom } = couple;

  return (
    <section className="t39-couple-section">
      {/* 1. Bride Card */}
      <motion.div 
        className="t39-profile-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
      >
        <img 
          src={bride.avatar} 
          alt={bride.fullName} 
          className="t39-profile-img" 
        />
        <div className="t39-profile-text-overlay">
          <div className="t39-profile-role-script">{bride.role}</div>
          <div className="t39-profile-fullname">{bride.fullName.toUpperCase()}</div>
          <div className="t39-profile-birthdate">{bride.birthDate}</div>
        </div>
      </motion.div>

      {/* 2. Groom Card */}
      <motion.div 
        className="t39-profile-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        <img 
          src={groom.avatar} 
          alt={groom.fullName} 
          className="t39-profile-img" 
        />
        <div className="t39-profile-text-overlay">
          <div className="t39-profile-role-script">{groom.role}</div>
          <div className="t39-profile-fullname">{groom.fullName.toUpperCase()}</div>
          <div className="t39-profile-birthdate">{groom.birthDate}</div>
        </div>
      </motion.div>
    </section>
  );
}
