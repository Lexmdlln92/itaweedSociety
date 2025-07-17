export default function MarqueeText({ text, speed = "12s", reverse = false }) {
  const animationClass = reverse ? "marquee-reverse" : "marquee";

  return (
    <div className="marquee-container bg-black text-white py-2">
      <div
        className={`marquee-track text-lg font-semibold ${animationClass}`}
        style={{ animationDuration: speed }}
      >
        <span className="mr-2">{text}</span>
        <span className="mr-2">{text}</span>
      </div>
    </div>
  );
}
