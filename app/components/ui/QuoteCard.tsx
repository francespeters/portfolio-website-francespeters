
export default function QuoteCard({ quote, author }: { quote: string; author?: string }) {
  return (
    <div className="relative rounded-2xl bg-neutral-50 border border-neutral-200 px-8 py-6">
      <span className="absolute top-4 left-5 text-5xl select-none">&quot;</span>
      <p className="mt-4 quote-body-text leading-relaxed">{quote}</p>
      {author && (
        <p className="mt-4 text-sm font-medium quote-body-text">— {author}</p>
      )}
    </div>
  );
}