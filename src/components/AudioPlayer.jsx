import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AudioPlayer({ audioData, isEnvelopeOpened }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef(null);
  const synthCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Fallback soft synthesizer: plays romantic harp/chimes if audio element fails to load
  const startRomanticSynth = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      const pentatonicNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
      let noteIndex = 0;

      synthIntervalRef.current = setInterval(() => {
        if (ctx.state === 'suspended') ctx.resume();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const freq = pentatonicNotes[noteIndex % pentatonicNotes.length];
        noteIndex = (noteIndex + 1 + Math.floor(Math.random() * 2)) % pentatonicNotes.length;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 2.5);
      }, 700);
    } catch {
      // Audio context might be restricted
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
    if (synthCtxRef.current) {
      synthCtxRef.current.close().catch(() => {});
      synthCtxRef.current = null;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      stopRomanticSynth();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback to soft ambient harmonic chime
        startRomanticSynth();
        setIsPlaying(true);
      });
    }
  };

  // Autoplay when user opens envelope
  useEffect(() => {
    if (isEnvelopeOpened && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      }).catch(() => {
        // Fallback synthesizer
        startRomanticSynth();
        setIsPlaying(true);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4000);
      });
    }
  }, [isEnvelopeOpened]);

  return (
    <div style={{ position: 'absolute', top: 18, right: 18, zIndex: 60 }}>
      <audio
        ref={audioRef}
        src={audioData.src}
        loop
        preload="auto"
      />

      {/* Floating Vinyl Player Button */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={togglePlay}
          title={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
          aria-label="Điều khiển âm nhạc"
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #1A1717 0%, #2E2929 100%)',
            border: '2px solid rgba(184, 125, 75, 0.6)',
            boxShadow: isPlaying
              ? '0 0 18px rgba(184, 125, 75, 0.5), 0 4px 12px rgba(0,0,0,0.3)'
              : '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            padding: 0
          }}
        >
          {/* Vinyl Grooves */}
          <div
            className={isPlaying ? "animate-spin-slow" : ""}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, #B87D4B 22%, transparent 24%), repeating-radial-gradient(circle, #24201E 0, #24201E 2px, #181515 3px, #181515 4px)'
            }}
          >
            {/* Center Disc Label */}
            <div
              style={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF758C, #C04D63)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 8
              }}
            >
              ♥
            </div>
          </div>

          {/* Mute indicator slash when paused */}
          {!isPlaying && (
            <div
              style={{
                position: 'absolute',
                width: '70%',
                height: 2,
                background: '#fff',
                transform: 'rotate(45deg)',
                borderRadius: 2,
                boxShadow: '0 1px 3px rgba(0,0,0,0.5)'
              }}
            />
          )}
        </button>

        {/* Floating Sound Waves when playing */}
        {isPlaying && (
          <div
            style={{
              position: 'absolute',
              bottom: -6,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 2,
              alignItems: 'flex-end',
              height: 10,
              pointerEvents: 'none'
            }}
          >
            {[6, 10, 4, 9, 7].map((height, idx) => (
              <motion.span
                key={idx}
                animate={{ height: [height * 0.4, height, height * 0.3] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.6 + idx * 0.1,
                  ease: 'easeInOut'
                }}
                style={{
                  width: 2,
                  background: 'var(--color-primary-light)',
                  borderRadius: 1
                }}
              />
            ))}
          </div>
        )}

        {/* Song Title Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              style={{
                position: 'absolute',
                right: 52,
                top: 8,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(184, 125, 75, 0.3)',
                padding: '6px 14px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                pointerEvents: 'none'
              }}
            >
              <Music size={13} color="#C04D63" />
              <span style={{ fontSize: 12, fontWeight: 500, color: '#24201E' }}>
                {audioData.title}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
