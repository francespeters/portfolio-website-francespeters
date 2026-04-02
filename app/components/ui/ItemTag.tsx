import { Color } from "react-bootstrap/esm/types";

export default function ItemTag({ text, date, color = "text-white" }: { text: string, date: string, color?: string }) {
  return (
    <div className="w-full flex items-center justify-between">
      <div>
        <p className={`text-${color}`}>{text}</p>
      </div>
      <div>
        <p className={`text-${color}`}>{date}</p>
      </div>
    </div>
  );
}
