import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Navigation, Map } from 'lucide-react';

export default function EventDetails({ events }) {
  return (
    <section
      style={{
        padding: '50px 20px',
        background: '#FFFFFF',
        position: 'relative'
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            letterSpacing: 4,
            color: 'var(--color-primary)',
            textTransform: 'uppercase'
          }}
        >
          Ceremony &amp; Party
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 28,
            color: 'var(--color-text-main)',
            marginTop: 4,
            fontWeight: 600
          }}
        >
          SỰ KIỆN CƯỚI
        </h2>
        <div className="gold-divider" />
      </div>

      {/* Events List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
        {events.map((evt, idx) => (
          <motion.div
            key={evt.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="glass-card"
            style={{
              padding: '22px 20px',
              borderLeft: evt.id === 'tiec-cuoi' ? '4px solid var(--color-rose)' : '4px solid var(--color-primary)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--color-text-main)'
                }}
              >
                {evt.title}
              </h3>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-sans)',
                  color: evt.id === 'tiec-cuoi' ? 'var(--color-rose)' : 'var(--color-primary)',
                  background: evt.id === 'tiec-cuoi' ? 'var(--color-rose-light)' : 'var(--color-bg)',
                  padding: '3px 10px',
                  borderRadius: 999,
                  fontWeight: 500
                }}
              >
                {evt.tag}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--color-text-main)', marginBottom: 8 }}>
              <Clock size={16} color="var(--color-primary)" />
              <span style={{ fontSize: 14, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
                {evt.time} — {evt.date}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, color: 'var(--color-text-muted)', marginBottom: 16 }}>
              <MapPin size={16} color="var(--color-rose)" style={{ flexShrink: 0, marginTop: 3 }} />
              <div>
                <p style={{ fontWeight: 600, color: 'var(--color-text-main)', fontSize: 14 }}>
                  {evt.locationName}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.5, marginTop: 2 }}>
                  {evt.address}
                </p>
              </div>
            </div>

            <a
              href={evt.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ width: '100%', padding: '9px 16px', fontSize: 12 }}
            >
              <Navigation size={14} color="var(--color-primary)" />
              <span>Chỉ đường trên Google Maps</span>
            </a>
          </motion.div>
        ))}
      </div>

      {/* Embedded Google Maps for Main Banquet */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md), 0 0 0 1px var(--color-border-gold)',
          background: '#FFFFFF'
        }}
      >
        <div
          style={{
            padding: '14px 18px',
            background: 'var(--color-bg)',
            borderBottom: '1px solid var(--color-border-soft)',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}
        >
          <Map size={16} color="var(--color-rose)" />
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-main)' }}>
            Vị trí tiệc cưới chính (52 Miếu Đầm, Nam Từ Liêm)
          </span>
        </div>
        <div style={{ width: '100%', height: 260 }}>
          <iframe
            title="Bản đồ tiệc cưới"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src="https://maps.google.com/maps?q=52%20Mi%E1%BA%BFu%20%C4%90%E1%BA%A7m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed"
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
}
