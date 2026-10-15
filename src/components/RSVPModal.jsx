import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, CheckCircle, Heart, Users, Send } from 'lucide-react';

export default function RSVPModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    guestCount: '1',
    side: 'both',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Trigger colorful confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF758C', '#C04D63', '#ECC89B', '#B87D4B', '#FFD166']
      });
    } catch {}

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      attending: 'yes',
      guestCount: '1',
      side: 'both',
      message: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 110,
          background: 'rgba(18, 16, 16, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 16
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-card"
          style={{
            width: '100%',
            maxWidth: 400,
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            position: 'relative'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'var(--color-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>

          {!isSubmitted ? (
            <>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 10,
                    letterSpacing: 3,
                    color: 'var(--color-primary)',
                    textTransform: 'uppercase'
                  }}
                >
                  Confirmation
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 24,
                    color: 'var(--color-text-main)',
                    marginTop: 4,
                    fontWeight: 600
                  }}
                >
                  XÁC NHẬN THAM DỰ
                </h3>
                <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
                  Sự hiện diện của bạn là niềm hạnh phúc lớn nhất của chúng mình!
                </p>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Name */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1px solid var(--color-border-gold)',
                      fontSize: 14,
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="VD: 0912 345 678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1px solid var(--color-border-gold)',
                      fontSize: 14,
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Attendance Toggle */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 6 }}>
                    Bạn sẽ đến chung vui chứ? *
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: 'yes' })}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 10,
                        border: formData.attending === 'yes' ? '2px solid var(--color-rose)' : '1px solid var(--color-border-soft)',
                        background: formData.attending === 'yes' ? 'var(--color-rose-light)' : 'var(--color-bg)',
                        color: formData.attending === 'yes' ? 'var(--color-rose)' : 'var(--color-text-muted)',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      ✨ Có, tôi sẽ tham dự
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, attending: 'no' })}
                      style={{
                        padding: '10px 8px',
                        borderRadius: 10,
                        border: formData.attending === 'no' ? '2px solid var(--color-text-muted)' : '1px solid var(--color-border-soft)',
                        background: formData.attending === 'no' ? '#EAE6E1' : 'var(--color-bg)',
                        color: 'var(--color-text-muted)',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Tiếc quá, tôi bận rồi
                    </button>
                  </div>
                </div>

                {formData.attending === 'yes' && (
                  <>
                    {/* Guest Count */}
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                        Số lượng người tham dự
                      </label>
                      <select
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 14px',
                          borderRadius: 10,
                          border: '1px solid var(--color-border-gold)',
                          fontSize: 13,
                          outline: 'none',
                          background: '#fff',
                          fontFamily: 'inherit'
                        }}
                      >
                        <option value="1">Đi một mình (1 người)</option>
                        <option value="2">Đi cùng người thương / Bạn bè (2 người)</option>
                        <option value="3">Gia đình (3+ người)</option>
                      </select>
                    </div>

                    {/* Guest Side */}
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                        Bạn là khách của
                      </label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['groom', 'bride', 'both'].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setFormData({ ...formData, side: s })}
                            style={{
                              flex: 1,
                              padding: '8px 4px',
                              borderRadius: 8,
                              fontSize: 11,
                              fontWeight: 500,
                              border: formData.side === s ? '1px solid var(--color-primary)' : '1px solid var(--color-border-soft)',
                              background: formData.side === s ? 'var(--color-primary-light)' : 'var(--color-bg)',
                              color: formData.side === s ? '#fff' : 'var(--color-text-muted)',
                              cursor: 'pointer'
                            }}
                          >
                            {s === 'groom' ? 'Nhà Trai' : s === 'bride' ? 'Nhà Gái' : 'Bạn chung'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, marginBottom: 5 }}>
                    Lời nhắn gửi cặp đôi
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Gửi vài lời chúc ngọt ngào..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1px solid var(--color-border-gold)',
                      fontSize: 13,
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ width: '100%', marginTop: 8 }}
                >
                  <Send size={15} />
                  <span>Gửi xác nhận tham dự</span>
                </button>
              </form>
            </>
          ) : (
            /* Submission Success State */
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'var(--color-rose-light)',
                  color: 'var(--color-rose)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CheckCircle size={32} />
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, color: 'var(--color-text-main)' }}>
                CẢM ƠN BẠN RẤT NHIỀU!
              </h3>

              <p style={{ fontSize: 13, color: 'var(--color-text-muted)', marginTop: 8, lineHeight: 1.6 }}>
                Thông tin xác nhận của <strong>{formData.name}</strong> đã được gửi tới cô dâu &amp; chú rể thành công.
                Hẹn gặp bạn trong ngày hạnh phúc nhất của chúng mình nhé!
              </p>

              <button
                onClick={handleReset}
                className="btn-gold"
                style={{ marginTop: 24, width: '100%' }}
              >
                <Heart size={16} />
                <span>Hoàn tất</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
