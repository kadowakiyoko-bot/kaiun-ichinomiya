/**
 * UmeIcon — 梅の花SVGコンポーネント（富旅ブランド共通）
 * 5弁の梅の花。朱色のワンポイントとして使用。
 */

interface UmeIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
  className?: string;
}

export default function UmeIcon({
  size = 20,
  color = "#CE3A2D",
  filled = true,
  className,
}: UmeIconProps) {
  const petalRadius = 3.5;
  const petalDistance = 5.2;
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    return {
      cx: 12 + petalDistance * Math.cos(angle),
      cy: 12 + petalDistance * Math.sin(angle),
    };
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
    >
      {petals.map((petal, i) => (
        <circle
          key={i}
          cx={petal.cx}
          cy={petal.cy}
          r={petalRadius}
          fill={filled ? color : "none"}
          stroke={color}
          strokeWidth={filled ? 0 : 1.2}
          opacity={0.92}
        />
      ))}
      <circle
        cx={12}
        cy={12}
        r={2}
        fill={filled ? "#C4941A" : color}
        opacity={1}
      />
    </svg>
  );
}
