export default function RotatedTextBlock({ text, width = "w-160" }: { text: string, width?: string }) {
  return (
    <div className={`relative ${width} h-fit`}>
      <div
        className="absolute left-1/2 w-full text-xl font-bold"
        style={{ transform: "translate(-50%, -50%) rotate(-4.5deg)" }}>
        <p className="text-white font-medium text-[40px] leading-normal" style={{ fontFamily: '"Labil Grotesk"' }}>{text}</p>
      </div>
    </div>
  );
}