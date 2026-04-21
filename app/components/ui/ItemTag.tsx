
export default function ItemTag({ text, date, tags = [], color = "text-white" }: { text: string, date: string, tags?: string[], color?: string }) {
  return (
  <div className="w-full flex items-baseline gap-3">
      <div className="flex items-center">
        <p className="tag-text m-0">{text}</p>
      </div>
      <div className="flex items-center">
        {tags.map((tag, index) => (
          <span key={index} className="flex items-center">
            <span className="tag-text-2">
              {tag}
            </span>
            {index < tags.length - 1 && <span className="mx-1 text-gray-400">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}