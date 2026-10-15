import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CheckCircle2 } from 'lucide-react';

export default function RSVPInlineCard() {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState('yes');
  const [guestCount, setGuestCount] = useState('1');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (attending === 'yes') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#8B2F30', '#D4AF37', '#FF758C', '#FFFFFF']
      });
    }

    setSubmitted(true);
  };

  return (
    <section className="t39-rsvp-card-container">
      <motion.div 
        className="t39-rsvp-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="t39-rsvp-title">Xác nhận tham dự</h3>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 10px' }}>
            <CheckCircle2 size={44} color="#8B2F30" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '17px', fontWeight: 600, color: '#1A1A1A', marginBottom: '6px' }}>
              Cảm ơn {name}!
            </h4>
            <p style={{ fontSize: '13.5px', color: '#555' }}>
              {attending === 'yes'
                ? `Thanh Hằng & Minh Trí rất háo hức được đón tiếp bạn (${guestCount} người) vào ngày 15/12!`
                : 'Cảm ơn bạn đã gửi lời nhắn. Chúng mình rất tiếc khi bạn không thể tham dự.'}
            </p>
            <button 
              onClick={() => setSubmitted(false)}
              style={{
                marginTop: '16px',
                background: 'none',
                border: '1px solid #CCC',
                padding: '6px 16px',
                borderRadius: '4px',
                fontSize: '12.5px',
                color: '#666',
                cursor: 'pointer'
              }}
            >
              Chỉnh sửa thông tin
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="t39-form-group">
              <label htmlFor="rsvp-name-input" className="t39-form-label">Họ và tên</label>
              <input 
                id="rsvp-name-input"
                type="text" 
                className="t39-form-input"
                placeholder="Nhập tên của bạn"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="t39-form-group">
              <label className="t39-form-label">Bạn sẽ tham dự chứ?</label>
              <div className="t39-radio-options">
                <label className="t39-radio-label">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="yes"
                    checked={attending === 'yes'}
                    onChange={() => setAttending('yes')}
                    accentColor="#8B2F30"
                  />
                  <span>Có, tôi sẽ tham dự</span>
                </label>
                <label className="t39-radio-label">
                  <input 
                    type="radio" 
                    name="attendance" 
                    value="no"
                    checked={attending === 'no'}
                    onChange={() => setAttending('no')}
                    accentColor="#8B2F30"
                  />
                  <span>Tôi bận, rất tiếc không thể tham dự</span>
                </label>
              </div>
            </div>

            <div className="t39-form-group">
              <label htmlFor="rsvp-guest-select" className="t39-form-label">Số lượng người tham dự</label>
              <select 
                id="rsvp-guest-select"
                className="t39-form-select"
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n} người</option>
                ))}
              </select>
            </div>

            <button type="submit" className="t39-rsvp-submit-btn">
              Gửi xác nhận
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
