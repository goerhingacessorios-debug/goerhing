import { Star } from "lucide-react";

export default function Rating({
  value,
  reviews,
  size = 14,
}: {
  value: number;
  reviews?: number;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={size}
            className={
              i <= Math.round(value)
                ? "fill-brand-orange text-brand-orange"
                : "fill-neutral-200 text-neutral-200"
            }
          />
        ))}
      </div>
      <span className="text-xs font-medium text-neutral-500">
        {value.toFixed(1)}
        {reviews !== undefined && ` (${reviews})`}
      </span>
    </div>
  );
}
