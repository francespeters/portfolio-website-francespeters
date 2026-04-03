
export default function QuoteCard({ quote, author }: { quote: string; author?: string }) {
  return (
    <div className="relative rounded-2xl bg-neutral-50 border border-neutral-200 px-8 py-6">
      <span className="absolute top-4 left-5 text-5xl leading-none text-neutral-300 select-none">&quot;</span>
      <p className="mt-4 text-neutral-700 text-lg italic leading-relaxed">{quote}</p>
      {author && (
        <p className="mt-4 text-sm font-medium text-neutral-500">— {author}</p>
      )}
    </div>
  );
}