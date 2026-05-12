type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
};

export function SectionTitle({ eyebrow, title, description, center = false, light = false }: Props) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p className={`text-sm font-semibold ${light ? "text-blue-300" : "text-blue-600"}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-2 text-3xl font-extrabold tracking-tight md:text-4xl ${
          light ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed md:text-lg ${
            light ? "text-slate-400" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
