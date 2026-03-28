/* eslint-disable react/jsx-key */

type FilterOption = { label: string; value: string };

type FilterProps = {
    title: string;
    options: FilterOption[];
    value: string;                     
    onChange: (value: string) => void; 
};

export default function FilterHeading({ title, options, value, onChange }: FilterProps) {
  return (
    <div className="inline-flex items-baseline gap-[60px]">
    <p className="sub-heading1">{title}   </p>
    <div className="inline-flex items-baseline gap-[40px]">
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={["sub-heading2",
                    "border-none bg-transparent p-0 text-sm",
                    "hover:underline hover:underline-offset-4",
                    isActive ? "font-semibold underline underline-offset-4" : "text-gray-500",
                    ].join(" ")}
                >
                    {opt.label}
                </button>
        );
      })}
    </div>
    </div>
  );
}