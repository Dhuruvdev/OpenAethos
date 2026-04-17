export function AethosLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
      </defs>
      <path
        d="M16 3L6 8.5V23.5L16 29L26 23.5V8.5L16 3Z"
        fill="url(#logo-grad)"
        opacity="0.15"
      />
      <path
        d="M16 3L6 8.5V23.5L16 29L26 23.5V8.5L16 3Z"
        stroke="url(#logo-grad)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M16 8L10 11.5V18.5L16 22L22 18.5V11.5L16 8Z"
        fill="url(#logo-grad)"
        opacity="0.3"
      />
      <circle cx="16" cy="16" r="3" fill="url(#logo-grad)" />
      <line x1="16" y1="3" x2="16" y2="8" stroke="url(#logo-grad)" strokeWidth="1.5" />
      <line x1="26" y1="8.5" x2="22" y2="11.5" stroke="url(#logo-grad)" strokeWidth="1.5" />
      <line x1="26" y1="23.5" x2="22" y2="18.5" stroke="url(#logo-grad)" strokeWidth="1.5" />
      <line x1="16" y1="29" x2="16" y2="22" stroke="url(#logo-grad)" strokeWidth="1.5" />
      <line x1="6" y1="23.5" x2="10" y2="18.5" stroke="url(#logo-grad)" strokeWidth="1.5" />
      <line x1="6" y1="8.5" x2="10" y2="11.5" stroke="url(#logo-grad)" strokeWidth="1.5" />
    </svg>
  );
}
