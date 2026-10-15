import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';

export default function InvitationSection({ couple, invitation }) {
  const { groom, bride } = couple;

  return (
    <section className="t39-invitation-section">
      {/* 1. Family Columns: Nhà Trai & Nhà Gái */}
      <motion.div 
        className="t39-parents-row"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="t39-parents-col">
          <h3>Nhà Trai</h3>
          <p>Ông. Phạm Minh Hải</p>
          <p>Bà. Nguyễn Mai Thu</p>
          <p style={{ marginTop: '4px', fontWeight: 500 }}>{groom.location}</p>
        </div>

        <div className="t39-parents-col">
          <h3>Nhà Gái</h3>
          <p>Ông. Trần Anh Tài</p>
          <p>Bà. Nguyễn Thanh Mai</p>
          <p style={{ marginTop: '4px', fontWeight: 500 }}>{bride.location}</p>
        </div>
      </motion.div>

      {/* 2. Cursive Couple Names */}
      <motion.div 
        className="t39-script-couple-names"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div className="t39-script-bride">{bride.name}</div>
        <div className="t39-script-amp">&amp;</div>
        <div className="t39-script-groom">{groom.name}</div>
      </motion.div>

      {/* 3. Formal Invitation Text */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className="t39-invitation-greeting">{invitation.invitationGreeting}</p>
        <p className="t39-invitation-time">{invitation.invitationTime}</p>
      </motion.div>

      {/* 4. Signature Calendar Date Block */}
      <motion.div 
        className="t39-signature-date-block"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <div className="t39-date-month">{invitation.dateMonth}</div>
        <div className="t39-date-big-num">{invitation.dateDay}</div>
        <div className="t39-date-year">{invitation.dateYear}</div>
      </motion.div>

      <p className="t39-lunar-date">{invitation.lunarDate}</p>

      {/* 5. Venue & Google Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h4 className="t39-venue-title">{invitation.venueName}</h4>

        <div className="t39-map-container">
          <iframe 
            src={invitation.mapEmbedUrl}
            title="Bản đồ Mường Thanh Luxury Quảng Ninh"
            loading="lazy"
            allowFullScreen
          />
        </div>

        <p className="t39-venue-address">{invitation.venueAddress}</p>
      </motion.div>
    </section>
  );
}
