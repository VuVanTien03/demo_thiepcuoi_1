import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function FloatingPetals() {
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Rose petals and subtle gold sparkles
    const petalCount = 28;
    const petals = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.8 + 0.4,
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.25,
        type: Math.random() > 0.35 ? 'petal' : 'sparkle',
        swing: Math.random() * 2 + 1,
        swingStep: Math.random() * Math.PI
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        // Soft rose petal shape
        ctx.beginPath();
        ctx.fillStyle = '#E88B9E';
        ctx.ellipse(0, 0, p.size, p.size * 1.6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // Delicate petal highlight
        ctx.beginPath();
        ctx.fillStyle = '#FFF0F3';
        ctx.ellipse(-1, -1, p.size * 0.6, p.size, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Subtle gold sparkle
        ctx.beginPath();
        ctx.fillStyle = '#F3D299';
        ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = '#E6AF5C';
        ctx.shadowBlur = 6;
      }
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swingStep += 0.02;
        p.y += p.speedY;
        p.x += Math.sin(p.swingStep) * p.swing + p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  return (
    <>
      {enabled && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 15
          }}
        />
      )}
      <button
        onClick={() => setEnabled((prev) => !prev)}
        title={enabled ? "Tắt hiệu ứng hoa rơi" : "Bật hiệu ứng hoa rơi"}
        aria-label="Chuyển đổi hiệu ứng hoa rơi"
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          zIndex: 60,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(184, 125, 75, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: enabled ? '#C04D63' : '#9C948F',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          cursor: 'pointer'
        }}
      >
        <Sparkles size={18} />
      </button>
    </>
  );
}
