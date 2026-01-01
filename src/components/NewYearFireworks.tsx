import { useEffect, useState } from 'react';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: Particle[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

const NewYearFireworks = () => {
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const colors = [
      '#FF0000', '#FF6B6B', '#FFD700', '#FFA500',
      '#00FF00', '#00CED1', '#4169E1', '#9370DB',
      '#FF1493', '#FF69B4', '#FFFFFF', '#FFFF00'
    ];

    const createFirework = () => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.6);
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      const particles: Particle[] = [];
      const particleCount = 50 + Math.random() * 50;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 4;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          alpha: 1,
          color: Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)]
        });
      }

      return {
        id: Date.now() + Math.random(),
        x,
        y,
        color,
        particles
      };
    };

    const interval = setInterval(() => {
      setFireworks(prev => {
        const newFirework = createFirework();
        return [...prev.slice(-20), newFirework];
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animationFrame = setInterval(() => {
      setFireworks(prev =>
        prev.map(fw => ({
          ...fw,
          particles: fw.particles
            .map(p => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              vy: p.vy + 0.1,
              alpha: p.alpha - 0.015
            }))
            .filter(p => p.alpha > 0)
        }))
        .filter(fw => fw.particles.length > 0)
      );
    }, 50);

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <svg className="w-full h-full">
        {fireworks.map(fw =>
          fw.particles.map((p, i) => (
            <circle
              key={`${fw.id}-${i}`}
              cx={p.x}
              cy={p.y}
              r="3"
              fill={p.color}
              opacity={p.alpha}
              style={{
                filter: 'blur(1px)',
                boxShadow: `0 0 10px ${p.color}`
              }}
            />
          ))
        )}
      </svg>

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center">
        <h1 
          className="text-5xl md:text-7xl lg:text-9xl font-bold animate-pulse"
          style={{
            color: '#FFD700',
            textShadow: `
              0 0 20px rgba(255, 215, 0, 0.8),
              0 0 40px rgba(255, 215, 0, 0.6),
              0 0 60px rgba(255, 215, 0, 0.4),
              0 0 80px rgba(255, 100, 100, 0.3),
              3px 3px 0px rgba(255, 0, 0, 0.5),
              -3px -3px 0px rgba(0, 100, 255, 0.5)
            `,
            animation: 'rainbow-glow 3s ease-in-out infinite',
            fontFamily: 'Georgia, serif',
            fontWeight: 900,
            letterSpacing: '0.05em'
          }}
        >
          С НОВЫМ
          <br />
          2026 ГОДОМ!
        </h1>
      </div>

      <style>{`
        @keyframes rainbow-glow {
          0%, 100% {
            text-shadow: 
              0 0 20px rgba(255, 215, 0, 0.8),
              0 0 40px rgba(255, 215, 0, 0.6),
              0 0 60px rgba(255, 215, 0, 0.4),
              3px 3px 0px rgba(255, 0, 0, 0.5),
              -3px -3px 0px rgba(0, 100, 255, 0.5);
          }
          25% {
            text-shadow: 
              0 0 20px rgba(255, 100, 100, 0.8),
              0 0 40px rgba(255, 100, 100, 0.6),
              0 0 60px rgba(255, 0, 0, 0.4),
              3px 3px 0px rgba(0, 255, 100, 0.5),
              -3px -3px 0px rgba(255, 215, 0, 0.5);
          }
          50% {
            text-shadow: 
              0 0 20px rgba(100, 200, 255, 0.8),
              0 0 40px rgba(100, 150, 255, 0.6),
              0 0 60px rgba(0, 100, 255, 0.4),
              3px 3px 0px rgba(255, 100, 255, 0.5),
              -3px -3px 0px rgba(100, 255, 100, 0.5);
          }
          75% {
            text-shadow: 
              0 0 20px rgba(200, 100, 255, 0.8),
              0 0 40px rgba(150, 100, 255, 0.6),
              0 0 60px rgba(100, 0, 255, 0.4),
              3px 3px 0px rgba(255, 215, 0, 0.5),
              -3px -3px 0px rgba(255, 100, 100, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default NewYearFireworks;