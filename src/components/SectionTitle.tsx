import { Badge } from "@/components/ui/Badge";

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
        light ? (
          <p className="text-sm font-semibold text-blue-300">{eyebrow}</p>
        ) : (
          <Badge variant="brand">{eyebrow}</Badge>
        )
      )}
      <h2
        className={`mt-3 text-3xl font-extrabold tracking-tight md:text-heading-lg ${
          light ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? "text-slate-400" : "text-ink-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
