import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function PhotoGallery({ gallery }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <section
      style={{
        padding: '50px 20px',
        background: '#FAF7F2',
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
          Sweet Memories
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
          ALBUM ẢNH CƯỚI
        </h2>
        <div className="gold-divider" />
      </div>

      {/* Magazine Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
          marginBottom: 20
        }}
      >
        {gallery.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => openLightbox(index)}
            style={{
              position: 'relative',
              borderRadius: index === 0 ? '24px 8px 8px 8px' : index === 3 ? '8px 8px 24px 8px' : '12px',
              overflow: 'hidden',
              aspectRatio: index === 0 ? '4/5' : '1/1',
              gridColumn: index === 0 ? 'span 2' : 'span 1',
              boxShadow: 'var(--shadow-sm)',
              cursor: 'pointer'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={item.url}
              alt={item.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              loading="lazy"
            />

            {/* Subtle Gradient & Hover Icon */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                padding: 14,
                color: '#fff'
              }}
            >
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 11, opacity: 0.8, fontStyle: 'italic' }}>
                  {item.caption}
                </p>
              </div>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(4px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Maximize2 size={13} color="#fff" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 120,
              background: 'rgba(18, 16, 16, 0.95)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 16
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 130
              }}
              title="Đóng"
            >
              <X size={22} />
            </button>

            {/* Prev Image Button */}
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: 14,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 130
              }}
              title="Ảnh trước"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Image Button */}
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: 14,
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 130
              }}
              title="Ảnh sau"
            >
              <ChevronRight size={24} />
            </button>

            {/* Active Image Box */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: 420,
                width: '100%',
                maxHeight: '80vh',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
                background: '#000'
              }}
            >
              <img
                src={gallery[selectedImage].url}
                alt={gallery[selectedImage].title}
                style={{
                  width: '100%',
                  maxHeight: '70vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
              <div
                style={{
                  padding: '14px 18px',
                  background: 'rgba(30, 26, 26, 0.9)',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 16 }}>
                    {gallery[selectedImage].title}
                  </h4>
                  <p style={{ fontSize: 12, opacity: 0.7 }}>
                    {gallery[selectedImage].caption}
                  </p>
                </div>
                <span style={{ fontSize: 12, opacity: 0.6, fontFamily: 'var(--font-sans)' }}>
                  {selectedImage + 1} / {gallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
