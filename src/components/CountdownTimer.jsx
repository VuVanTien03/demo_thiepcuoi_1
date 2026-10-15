import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarPlus, Clock } from 'lucide-react';

export default function CountdownTimer({ dateData }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(dateData.targetIso).getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [dateData.targetIso]);

  const handleAddToCalendar = () => {
    const { title, details, location, startDate, endDate } = dateData.calendarEvent;
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${startDate}/${endDate}`;
    window.open(gCalUrl, '_blank');
  };

  const blocks = [
    { label: 'NGÀY', value: timeLeft.days },
    { label: 'GIỜ', value: timeLeft.hours },
    { label: 'PHÚT', value: timeLeft.minutes },
    { label: 'GIÂY', value: timeLeft.seconds }
  ];

  return (
    <section
      style={{
        padding: '50px 20px',
        background: '#FAF7F2',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: 28 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 11,
            letterSpacing: 4,
            color: 'var(--color-primary)',
            textTransform: 'uppercase'
          }}
        >
          Counting Down
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 26,
            color: 'var(--color-text-main)',
            marginTop: 4,
            fontWeight: 600
          }}
        >
          ĐẾM NGƯỢC NGÀY CHUNG ĐÔI
        </h2>
        <div className="gold-divider" />
      </div>

      {/* 4 Countdown Blocks */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 10,
          maxWidth: 380,
          margin: '0 auto 28px'
        }}
      >
        {blocks.map((b, idx) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card"
            style={{
              padding: '16px 8px 12px',
              background: '#FFFFFF',
              boxShadow: '0 6px 18px -4px rgba(184, 125, 75, 0.15)',
              border: '1px solid rgba(184, 125, 75, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 26,
                fontWeight: 700,
                color: 'var(--color-rose)',
                lineHeight: 1.1
              }}
            >
              {String(b.value).padStart(2, '0')}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 9,
                letterSpacing: 1.5,
                color: 'var(--color-text-muted)',
                marginTop: 6
              }}
            >
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Wedding Date Details */}
      <div style={{ marginBottom: 24 }}>
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 18,
            fontWeight: 600,
            color: 'var(--color-text-main)'
          }}
        >
          {dateData.solarDate}
        </p>
        <p
          style={{
            fontSize: 13,
            color: 'var(--color-text-muted)',
            fontStyle: 'italic',
            marginTop: 2
          }}
        >
          ({dateData.lunarDate})
        </p>
      </div>

      {/* Add To Calendar Button */}
      <button
        onClick={handleAddToCalendar}
        className="btn-outline"
        title="Lưu ngày cưới vào Google Calendar"
      >
        <CalendarPlus size={16} color="var(--color-primary)" />
        <span>Thêm vào Google Calendar</span>
      </button>
    </section>
  );
}
