// src/components/MarqueeText.jsx
export default function MarqueeText({
  text,
  speed = '12s',
  reverse = false,
  fontClass = 'font-londrina',
}) {
  const animationClass = reverse ? 'marquee-reverse' : 'marquee';

  return (
    <div className="marquee-container bg-transparent text-white py-4">
      <div
        className={`marquee-track block mb-1 text-4xl font-extrabold ${fontClass} ${animationClass}`}
        style={{ animationDuration: speed }}
      >
        <span className="mr-2">{text}</span>
        <span className="mr-2">{text}</span>
      </div>
    </div>
  );
}
