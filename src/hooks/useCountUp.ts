import { useState, useEffect, useRef } from 'react';

interface Options {
  end: number;
  duration?: number;
  decimals?: number;
  active?: boolean;
}

function easeOutQuart(t: number) {
  return 1 - Math.pow(1 - t, 4);
}

export function useCountUp({ end, duration = 1600, decimals = 0, active = false }: Options) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;

    const startTime = performance.now();

    function animate(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = end * easeOutQuart(progress);
      setCount(parseFloat(value.toFixed(decimals)));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    }

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, end, duration, decimals]);

  return count;
}
