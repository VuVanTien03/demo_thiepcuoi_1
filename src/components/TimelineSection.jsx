import React from 'react';
import { motion } from 'framer-motion';

export default function TimelineSection({ timeline, note }) {
  return (
    <section className="t39-timeline-section">
      <motion.h2 
        className="t39-timeline-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Timeline
      </motion.h2>

      <div className="t39-timeline-list">
        {timeline.map((item, index) => (
          <motion.div 
            key={index} 
            className="t39-timeline-item"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            <img 
              src={item.icon} 
              alt={item.title} 
              className="t39-timeline-icon" 
            />
            <div className="t39-timeline-time">{item.time}</div>
            <div className="t39-timeline-event-name">{item.title}</div>
          </motion.div>
        ))}
      </div>

      <motion.p 
        className="t39-timeline-note"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
      >
        {note}
      </motion.p>
    </section>
  );
}
