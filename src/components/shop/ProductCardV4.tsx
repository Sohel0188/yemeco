import { useCart } from "@/components/shop/cart";
import { Beef, CalendarDays, Citrus, Leaf, MapPin, ShieldCheck, ShoppingCart, Star, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NUTRITIONISTS, VENDORS, categoryClass, type Product } from "@/lib/shop-data";

type Props = {
  product: Product;
  onOpenNutritionist: (product: Product) => void;
};

/** Quiet shelf card: a fading product photo, then farmer, rating, a slim nutrition row, and the price. */
export function ProductCardV4({ product, onOpenNutritionist }: Props) {
  const vendor = VENDORS[product.vendorId];
  const nutritionist = NUTRITIONISTS[product.nutritionistId];
  const isFood = product.category !== "medicine";
  const { add, lines } = useCart();
  const qty = lines.find((line) => line.product.id === product.id)?.qty ?? 0;
  const n = product.nutrients;

  const highlights = [
    { label: "Cal", value: n.cal, icon: Zap, tone: "text-n-cal" },
    { label: "Protein", value: n.protein, icon: Beef, tone: "text-n-protein" },
    { label: n.vitamin.label, value: n.vitamin.value, icon: Citrus, tone: "text-n-vit" },
  ];

  return (
    <article
      aria-label={`${product.name} product information card`}
      className={cn(
        "@container overflow-hidden rounded-[1.75rem] bg-white shadow-[0_16px_40px_-28px_rgba(28,36,24,0.45)] ring-1 ring-black/[0.06]",
        categoryClass(product.category),
      )}
    >
      <div
        className="relative h-44"
        style={{ background: "linear-gradient(180deg, var(--c-soft) 0%, var(--c-tint) 62%, white 100%)" }}
      >
        <img src={product.image} alt={product.name} className="size-full object-contain px-8 pb-8 pt-3" />
      </div>

      <div className="px-4 pb-4">
        <div className="relative z-10 -mt-7 flex items-center justify-between gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${vendor.role}: ${vendor.name}`}
                className="flex min-w-0 items-center gap-2 rounded-full bg-white py-1 pl-1 pr-3 shadow-sm ring-1 ring-black/[0.06] outline-none transition hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-cat"
              >
                <img src={vendor.photo} alt="" className="size-8 shrink-0 rounded-full object-cover" />
                <span className="truncate text-xs font-semibold text-ink">{vendor.name}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="rounded-xl bg-ink px-3 py-2 text-ink-foreground">
              <p className="text-[0.65rem] uppercase tracking-wider opacity-70">{vendor.role}</p>
              <p className="text-sm font-semibold">{vendor.name}</p>
              <p className="text-xs opacity-80">{vendor.place}</p>
            </TooltipContent>
          </Tooltip>

          <button
            type="button"
            onClick={() => onOpenNutritionist(product)}
            aria-label={`View ${nutritionist.name}'s profile, rating ${product.rating.toFixed(1)}`}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-white py-1 pl-1 pr-2.5 shadow-sm ring-1 ring-black/[0.06] outline-none transition hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-cat"
          >
            <img src={nutritionist.photo} alt="" className="size-8 rounded-full object-cover" />
            <Star className="size-3.5 fill-[#f5b400] text-[#f5b400]" />
            <span className="text-sm font-extrabold tabular-nums text-ink">{product.rating.toFixed(1)}</span>
          </button>
        </div>

        <h3 className="mt-3 truncate text-[1.35rem] font-extrabold tracking-tight text-ink">{product.name}</h3>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.8rem] text-ink/65">
          <span className="whitespace-nowrap">Min: {product.minOrder}</span>
          <span aria-hidden className="text-ink/30">·</span>
          <span className="inline-flex items-center gap-1 whitespace-nowrap">
            <MapPin className="size-3.5 shrink-0 text-[#3b82c4]" />
            {product.from}
          </span>
        </p>

        <dl className="mt-3.5 grid grid-cols-3 overflow-hidden rounded-2xl bg-[#f6f5f1]">
          {highlights.map(({ label, value, icon: Icon, tone }, index) => (
            <div key={label} className={cn("min-w-0 px-2 py-2.5 text-center", index > 0 && "border-l border-white")}>
              <dt className={cn("flex items-center justify-center gap-1 text-[0.65rem] font-medium", tone)}>
                <Icon className="size-3 shrink-0" />
                <span className="truncate">{label}</span>
              </dt>
              <dd className="mt-0.5 truncate text-sm font-extrabold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-3.5 flex items-end justify-between gap-3 border-t border-black/[0.06] pt-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[0.75rem] text-ink/70">
              <CalendarDays className="size-3.5 shrink-0 text-ink/45" />
              <span className="truncate">
                {product.dateLabel}: {product.date}
              </span>
            </p>
            <p
              className={cn(
                "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.7rem] font-semibold",
                product.organic ? "bg-[#e7f6ea] text-[#1c7a3a]" : "bg-[#e7f1fb] text-[#1d5f99]",
              )}
            >
              {product.organic ? <Leaf className="size-3 fill-current" /> : <ShieldCheck className="size-3" />}
              {product.organic ? "Organic" : isFood ? "Quality tested" : "DGDA certified"}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <p className="flex items-baseline gap-1.5">
              <span className="text-[0.7rem] font-semibold text-ink/50">Price</span>
              <span className="font-display text-xl font-extrabold tracking-tight text-ink">৳{product.sellPrice}</span>
              {product.sellPrice < product.price && (
                <span className="text-xs font-semibold text-ink/40 line-through">৳{product.price}</span>
              )}
            </p>
            <button
              type="button"
              onClick={() => add(product)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#172033] px-3.5 py-2 text-[0.75rem] font-semibold text-white transition hover:bg-[#243049]"
            >
              <ShoppingCart className="size-3.5" />
              {qty > 0 ? `Added · ${qty}` : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
