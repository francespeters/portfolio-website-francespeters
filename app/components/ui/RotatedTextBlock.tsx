export default function RotatedTextBlock({ text, width = "w-160" }: { text: string, width?: string }) {
  return (
    <div className={`relative ${width} h-fit`}>
      <div
        className="absolute md:left-1/2 left-[45vw] sm:w-full md:w-full"
        style={{ transform: "translate(-50%, -50%) rotate(-4.5deg)" }}>
        <p className="text-white font-medium text-[26px] md:text-[40px] leading-normal" style={{ fontFamily: '"Labil Grotesk"' }}>{text}</p>
      </div>
    </div>
  );
}