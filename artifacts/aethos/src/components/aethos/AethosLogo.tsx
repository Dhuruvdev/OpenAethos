import openAethosLogo from "@assets/IMG_20260417_222337-removebg-preview_1776448310497.png";

export function AethosLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src={openAethosLogo}
      alt="OpenAethos"
      width={size}
      height={size}
      className="object-cover"
      style={{
        width: size,
        height: size,
        borderRadius: "9999px",
        objectPosition: "center",
        filter: "drop-shadow(0 8px 18px rgba(75, 141, 187, 0.24))",
      }}
    />
  );
}
