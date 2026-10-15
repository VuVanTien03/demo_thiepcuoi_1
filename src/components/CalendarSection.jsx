import React from 'react';
import { motion } from 'framer-motion';

export default function CalendarSection({ calendar }) {
  const days = Array.from({ length: calendar.totalDays || 31 }, (_, i) => i + 1);

  return (
    <section className="t39-calendar-section">
      <div className="t39-calendar-header">
        <span className="t39-cal-left-title">Our wedding day</span>
        <span className="t39-cal-right-month">{calendar.monthTitle}</span>
      </div>

      <div className="t39-calendar-grid">
        {days.map((d) => {
          const isHighlighted = d === calendar.weddingDay;
          return (
            <div 
              key={d} 
              className={`t39-cal-day-cell ${isHighlighted ? 'highlighted' : ''}`}
            >
              {isHighlighted && (
                <motion.div 
                  className="t39-cal-heart-highlight"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
                />
              )}
              <span>{d}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
