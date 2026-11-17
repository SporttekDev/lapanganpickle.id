/*
  Garis lapangan pickleball tampak atas (rasio 44 x 20 kaki):
  garis tepi, dua garis kitchen (non-volley zone), garis tengah servis, dan net.
  Dipakai sebagai motif visual. Dengan `animate`, garis "digambar" satu kali saat dimuat.
*/
export function CourtLines({ className, animate = false }: { className?: string; animate?: boolean }) {
  const draw = (delay: number) =>
    animate ? { className: "court-draw", style: { animationDelay: `${delay}s` } } : {};

  return (
    <svg
      viewBox="-10 -16 460 232"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M0 0H440V200H0Z" pathLength={1} {...draw(0)} />
      <path d="M150 0V200" pathLength={1} {...draw(0.55)} />
      <path d="M290 0V200" pathLength={1} {...draw(0.7)} />
      <path d="M0 100H150" pathLength={1} {...draw(1)} />
      <path d="M290 100H440" pathLength={1} {...draw(1.1)} />
      <path
        d="M220 -14V214"
        strokeDasharray="4 7"
        className={animate ? "court-fade" : undefined}
        style={animate ? { animationDelay: "1.6s" } : undefined}
      />
    </svg>
  );
}
