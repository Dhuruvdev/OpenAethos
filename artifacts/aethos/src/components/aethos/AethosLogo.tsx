export function AethosLogo({ size = 32 }: { size?: number }) {
  const id = `logo-g-${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4CA8F8" />
          <stop offset="50%" stopColor="#8B6CF7" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>
      </defs>
      {/* Center hub */}
      <circle cx="18" cy="18" r="3.5" fill={`url(#${id})`} />
      {/* 6 arms like a snowflake/asterisk */}
      {/* Top */}
      <line x1="18" y1="18" x2="18" y2="4" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="18" y1="6" x2="14.5" y2="9" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="6" x2="21.5" y2="9" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      {/* Bottom */}
      <line x1="18" y1="18" x2="18" y2="32" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="18" y1="30" x2="14.5" y2="27" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="30" x2="21.5" y2="27" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      {/* Top-right */}
      <line x1="18" y1="18" x2="29.2" y2="11.5" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="27.7" y1="12.3" x2="27.2" y2="16.2" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27.7" y1="12.3" x2="24.2" y2="10.8" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      {/* Bottom-left */}
      <line x1="18" y1="18" x2="6.8" y2="24.5" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="8.3" y1="23.7" x2="8.8" y2="19.8" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="8.3" y1="23.7" x2="11.8" y2="25.2" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      {/* Top-left */}
      <line x1="18" y1="18" x2="6.8" y2="11.5" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="8.3" y1="12.3" x2="11.8" y2="10.8" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="8.3" y1="12.3" x2="8.8" y2="16.2" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      {/* Bottom-right */}
      <line x1="18" y1="18" x2="29.2" y2="24.5" stroke={`url(#${id})`} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="27.7" y1="23.7" x2="24.2" y2="25.2" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="27.7" y1="23.7" x2="27.2" y2="19.8" stroke={`url(#${id})`} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
