import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownSection({ countdownData }) {
  const { targetIso, thankYouMessage, bgImage } = countdownData;

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const targetTime = new Date(targetIso).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetIso]);

  return (
    <section className="t39-countdown-closing">
      <img src={bgImage} alt="Countdown Backdrop" className="t39-countdown-bg" />
      <div className="t39-countdown-overlay" />

      <div className="t39-countdown-inner">
        <motion.h2 
          className="t39-countdown-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Countdown
        </motion.h2>

        <motion.div 
          className="t39-countdown-tiles"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="t39-cd-box">
            <span className="t39-cd-number">{timeLeft.days}</span>
            <span className="t39-cd-label">ngày</span>
          </div>
          <div className="t39-cd-box">
            <span className="t39-cd-number">{timeLeft.hours}</span>
            <span className="t39-cd-label">giờ</span>
          </div>
          <div className="t39-cd-box">
            <span className="t39-cd-number">{timeLeft.minutes}</span>
            <span className="t39-cd-label">phút</span>
          </div>
          <div className="t39-cd-box">
            <span className="t39-cd-number">{timeLeft.seconds}</span>
            <span className="t39-cd-label">giây</span>
          </div>
        </motion.div>

        <motion.p 
          className="t39-countdown-message"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {thankYouMessage}
        </motion.p>

        <motion.div 
          className="t39-countdown-signature"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          forever
        </motion.div>
      </div>
    </section>
  );
}
