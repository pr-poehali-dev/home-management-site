import { useEffect, useRef } from 'react';

interface RunningLineProps {
  text: string;
  speed?: number;
}

const RunningLine = ({ text, speed = 50 }: RunningLineProps) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const textElement = line.querySelector('.running-text') as HTMLElement;
    if (!textElement) return;

    const textWidth = textElement.offsetWidth;
    const containerWidth = line.offsetWidth;

    const totalDistance = textWidth + containerWidth;
    const duration = totalDistance / speed;

    textElement.style.animationDuration = `${duration}s`;
  }, [text, speed]);

  return (
    <div className="relative z-20 w-full overflow-hidden bg-gradient-to-r from-secondary via-accent to-secondary py-4 shadow-lg">
      <div 
        ref={lineRef}
        className="whitespace-nowrap"
      >
        <div className="running-text inline-block animate-running-line">
          <span className="text-lg md:text-xl font-semibold text-accent-foreground px-8">
            {text}
          </span>
          <span className="text-lg md:text-xl font-semibold text-accent-foreground px-8">
            {text}
          </span>
          <span className="text-lg md:text-xl font-semibold text-accent-foreground px-8">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RunningLine;
