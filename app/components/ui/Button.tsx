type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-[var(--black-primary)] text-white hover:bg-gray-800"
      : "bg-transparent text-[var(--black-primary)] border border-[var(--black-primary)] hover:bg-[var(--black-primary)] hover:text-white";

  return (
    <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}