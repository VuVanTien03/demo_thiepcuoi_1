import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Gift, QrCode } from 'lucide-react';

export default function GiftBoxModal({ isOpen, onClose, couple }) {
  const [activeTab, setActiveTab] = useState('groom');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentPerson = activeTab === 'groom' ? couple.groom : couple.bride;
  const { bank } = currentPerson;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
            background: '#FFFFFF',
            borderRadius: 24,
            padding: 24,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            maxHeight: '92vh',
            overflowY: 'auto'
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

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'var(--color-rose-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 10px',
                color: 'var(--color-rose)'
              }}
            >
              <Gift size={22} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 10,
                letterSpacing: 3,
                color: 'var(--color-primary)',
                textTransform: 'uppercase'
              }}
            >
              Wedding Gift
            </span>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 24,
                color: 'var(--color-text-main)',
                marginTop: 2,
                fontWeight: 600
              }}
            >
              HỘP YÊU THƯƠNG
            </h3>
            <p style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>
              Cảm ơn tình cảm và sự chúc phúc chân thành của quý khách!
            </p>
          </div>

          {/* Toggle Tabs (Chú Rể / Cô Dâu) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              background: 'var(--color-bg)',
              borderRadius: 999,
              padding: 4,
              marginBottom: 20
            }}
          >
            <button
              onClick={() => setActiveTab('groom')}
              style={{
                padding: '9px 12px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'groom' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'groom' ? 'var(--color-primary-dark)' : 'var(--color-text-muted)',
                boxShadow: activeTab === 'groom' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              Mừng Chú Rể (Nhà Trai)
            </button>
            <button
              onClick={() => setActiveTab('bride')}
              style={{
                padding: '9px 12px',
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                background: activeTab === 'bride' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'bride' ? 'var(--color-rose)' : 'var(--color-text-muted)',
                boxShadow: activeTab === 'bride' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer'
              }}
            >
              Mừng Cô Dâu (Nhà Gái)
            </button>
          </div>

          {/* QR Code and Account Details Box */}
          <div
            style={{
              background: 'var(--color-bg)',
              borderRadius: 18,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid var(--color-border-gold)',
              textAlign: 'center'
            }}
          >
            {/* VietQR Code Frame */}
            <div
              style={{
                width: 190,
                height: 190,
                background: '#FFFFFF',
                borderRadius: 12,
                padding: 10,
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <img
                src={bank.qrUrl}
                alt={`Mã QR Mừng cưới ${currentPerson.fullName}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Bank Info */}
            <div style={{ width: '100%', marginBottom: 14 }}>
              <span
                style={{
                  fontSize: 11,
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: 1
                }}
              >
                {bank.bankName}
              </span>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: 'var(--color-text-main)',
                  marginTop: 2
                }}
              >
                {bank.accountName}
              </p>
            </div>

            {/* Account Number Copy Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                background: '#FFFFFF',
                borderRadius: 12,
                padding: '10px 14px',
                border: '1px solid var(--color-border-soft)'
              }}
            >
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 15,
                  fontWeight: 600,
                  color: 'var(--color-text-main)',
                  letterSpacing: 1
                }}
              >
                {bank.accountNumber}
              </span>

              <button
                onClick={() => handleCopy(bank.accountNumber)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: copied ? 'var(--color-primary-light)' : 'var(--color-bg)',
                  color: copied ? '#fff' : 'var(--color-text-main)',
                  padding: '6px 12px',
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Đã chép!' : 'Sao chép'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
