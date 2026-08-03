type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  type?: "button" | "submit";
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const base =
    "rounded-full px-5 py-2.5 text-sm font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

  const variants = {
    primary:
      "bg-brand-lime text-brand-forest hover:bg-brand-lime-dark ring-1 ring-brand-forest/10",
    secondary: "bg-brand-lavender text-brand-forest hover:bg-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]}`}
    >
      {label}
    </button>
  );
}
