import { useIconSize } from '@/shared/hooks/use-icon-size'
import { IconProps } from './type'

interface ProgressProps extends IconProps {
  percentage?: number; // 0 to 100
}

export function Progress({ size = 14, percentage = 0, color }: ProgressProps) {
  const [width, height] = useIconSize(14, 14, size);
  
  const radius = 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(percentage, 100)) / 100; // Clamp between 0 and 1
  const dashOffset = circumference * (1 - progress);

  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none">
      {/* Outer Circle (static) */}
      <circle
        cx="7"
        cy="7"
        r="6"
        fill="none"
        stroke={color ?? 'currentColor'}
        strokeWidth="1.5"
      />

      {/* Inner Circle (progress) */}
      <circle
        className="progress"
        cx="7"
        cy="7"
        r={radius}
        fill="none"
        stroke={color ?? 'currentColor'}
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
        transform="rotate(-90 7 7)"
        strokeLinecap="round"
      />
    </svg>
  )
}
