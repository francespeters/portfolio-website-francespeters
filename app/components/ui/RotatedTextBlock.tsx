
export default function RotatedTextBlock({ text }: { text: string }) {
  return (
    <div className="relative w-64 h-64">
      <div
        className="absolute top-1/2 display left-1/2 text-center text-xl font-bold"
        style={{ transform: "translate(-50%, -50%) rotate(-15deg)" }}
      >
        <p>
            {text}
        </p>
        
      </div>
    </div>
  );
}   