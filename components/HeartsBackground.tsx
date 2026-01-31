
import React, { useEffect, useState } from 'react';

const HeartsBackground: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const newHeart = {
        id,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 20 + 10}px`,
        duration: `${Math.random() * 3 + 3}s`
      };
      setHearts(prev => [...prev.slice(-20), newHeart]);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart-particle absolute bottom-0 text-pink-300"
          style={{
            left: heart.left,
            fontSize: heart.size,
            animationDuration: heart.duration
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default HeartsBackground;
