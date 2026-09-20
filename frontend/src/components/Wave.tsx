"use client";

/** Organic wave divider — the app's signature shape. */
export default function Wave({
  fill = "#f6f4f0",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 390 34"
      preserveAspectRatio="none"
      aria-hidden
      className={`block w-full h-[26px] ${className}`}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path
        d="M0 16 C 46 32, 92 2, 146 13 C 198 24, 240 33, 294 21 C 338 11, 366 15, 390 23 L 390 34 L 0 34 Z"
        fill={fill}
      />
    </svg>
  );
}
