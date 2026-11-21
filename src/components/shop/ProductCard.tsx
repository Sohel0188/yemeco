import { useCart } from "@/components/shop/cart";
import { Box, CalendarDays, Droplet, Droplets, Leaf, MapPin, ShieldCheck, ShoppingCart, Sprout, Star, Stethoscope, Zap, Beef, Citrus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  NUTRITIONISTS,
  VENDORS,
  categoryClass,
  type Product,
} from "@/lib/shop-data";

type Props = {
  product: Product;
  onOpenNutritionist: (product: Product) => void;
};

export function ProductCard({ product, onOpenNutritionist }: Props) {
  const vendor = VENDORS[product.vendorId];
  const nutritionist = NUTRITIONISTS[product.nutritionistId];
  const n = product.nutrients;

  const nutrients = [
    { label: "Cal", value: n.cal, icon: Zap, tone: "bg-n-cal-soft text-n-cal" },
    { label: "Protein", value: n.protein, icon: Beef, tone: "bg-n-protein-soft text-n-protein" },
    { label: "Carbs", value: n.carbs, icon: Droplet, tone: "bg-n-carbs-soft text-n-carbs" },
    { label: "Fat", value: n.fat, icon: Droplets, tone: "bg-n-fat-soft text-n-fat" },
    { label: "Fiber", value: n.fiber, icon: Sprout, tone: "bg-n-fiber-soft text-n-fiber" },
    { label: n.vitamin.label, value: n.vitamin.value, icon: Citrus, tone: "bg-n-vit-soft text-n-vit" },
  ];

  const isFood = product.category !== "medicine";
  const { add, lines } = useCart();
  const qty = lines.find((line) => line.product.id === product.id)?.qty ?? 0;

  return (
    <article
      className={cn(
        "@container group overflow-hidden rounded-[1.75rem] bg-card shadow-sm ring-1 ring-cat/40",
        categoryClass(product.category),
      )}
    >
      {/* ── Header ───────────────────────────── */}
      <header className="pcard-head px-3 pb-4 pt-3 @min-[22rem]:px-3.5 @min-[36rem]:px-6 @min-[36rem]:pb-6 @min-[36rem]:pt-4">
        <div className="flex flex-wrap items-center justify-between gap-2 @min-[22rem]:flex-nowrap @min-[22rem]:gap-2 @min-[36rem]:gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${vendor.role}: ${vendor.name}`}
                className="relative size-12 shrink-0 overflow-hidden rounded-full border-2 border-card bg-cat-soft shadow-soft outline-none ring-2 ring-cat transition hover:scale-105 focus-visible:ring-4 @min-[36rem]:size-16 @min-[42rem]:size-20 @min-[36rem]:border-4"
              >
                <img src={vendor.photo} alt={vendor.name} loading="lazy" width={80} height={80} className="size-full object-cover" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="rounded-xl bg-ink px-3 py-2 text-ink-foreground">
              <p className="text-[0.65rem] uppercase tracking-wider opacity-70">{vendor.role}</p>
              <p className="text-sm font-semibold">{vendor.name}</p>
              <p className="text-xs opacity-80">{vendor.place}</p>
            </TooltipContent>
          </Tooltip>

          <span aria-hidden className="hidden h-10 w-px shrink-0 bg-cat-deep/25 @min-[36rem]:block @min-[36rem]:h-14" />

          <div className="order-last w-full min-w-0 text-center @min-[22rem]:order-none @min-[22rem]:w-auto @min-[22rem]:flex-1">
            <h3 className="truncate text-lg font-extrabold leading-tight text-ink @min-[36rem]:text-3xl @min-[42rem]:text-[2.1rem]">{product.name}</h3>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1 @min-[36rem]:mt-2 @min-[36rem]:gap-1.5">
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-card/80 px-2 py-0.5 text-[0.65rem] text-ink shadow-sm @min-[36rem]:px-2.5 @min-[36rem]:py-1 @min-[36rem]:text-sm">
                <Box className="size-3 @min-[36rem]:size-4" /> Min: <b className="font-semibold">{product.minOrder}</b>
              </span>
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-card/80 px-2 py-0.5 text-[0.65rem] text-ink shadow-sm @min-[36rem]:px-2.5 @min-[36rem]:py-1 @min-[36rem]:text-sm">
                <MapPin className="size-3 shrink-0 fill-sky/25 text-sky @min-[36rem]:size-4" />
                From: <b className="font-semibold">{product.from}</b>
              </span>
            </div>
          </div>

          <span aria-hidden className="hidden h-10 w-px shrink-0 bg-cat-deep/25 @min-[36rem]:block @min-[36rem]:h-14" />

          <div className="flex shrink-0 items-center gap-1.5 @min-[36rem]:gap-2.5">
            <button
              type="button"
              onClick={() => onOpenNutritionist(product)}
              aria-label={`View ${nutritionist.name}'s profile`}
              className="relative size-8 shrink-0 rounded-full outline-none transition hover:scale-110 focus-visible:ring-4 focus-visible:ring-cat @min-[36rem]:size-11"
            >
              <img src={nutritionist.photo} alt={nutritionist.name} loading="lazy" width={44} height={44} className="size-full rounded-full border-2 border-card object-cover shadow-soft" />
              <span className="absolute -bottom-0.5 -right-0.5 grid size-4 place-items-center rounded-full border-2 border-card bg-leaf text-primary-foreground @min-[36rem]:-bottom-1 @min-[36rem]:-right-1 @min-[36rem]:size-5">
                <Stethoscope className="size-2.5 @min-[36rem]:size-3" />
              </span>
            </button>
            <div className="text-center leading-tight">
              <div className="flex items-center justify-center gap-0.5 @min-[36rem]:gap-1">
                <Star className="size-4 fill-sun text-sun drop-shadow-sm @min-[36rem]:size-7" />
                <span className="font-display text-lg font-extrabold text-ink @min-[36rem]:text-3xl">{product.rating.toFixed(1)}</span>
              </div>
              <p className="text-[0.6rem] font-medium text-ink/80 @min-[36rem]:text-xs">Nutritionist Rating</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── Body ─────────────────────────────── */}
      <div className="grid items-center gap-3 px-3 py-3 @min-[22rem]:grid-cols-[0.78fr_1.22fr] @min-[22rem]:gap-2.5 @min-[36rem]:grid-cols-[0.9fr_1.1fr] @min-[36rem]:gap-4 @min-[36rem]:px-6 @min-[36rem]:py-4">
        <div className="relative mx-auto aspect-[5/4] w-full max-w-[18rem]">
          <div aria-hidden className="pcard-blob absolute -left-4 inset-y-0 right-6 rounded-full" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={816}
            height={816}
            className="relative size-full object-contain drop-shadow-xl transition duration-500 group-hover:scale-105 group-hover:-rotate-2"
          />
        </div>

        <div className="min-w-0 rounded-2xl border bg-card p-2.5 shadow-sm @min-[36rem]:p-4">
          <h4 className="flex min-w-0 items-center gap-1.5 text-sm font-bold leading-tight text-ink @min-[36rem]:gap-2 @min-[36rem]:text-xl">
            <Leaf className="size-4 shrink-0 fill-leaf/30 text-leaf @min-[36rem]:size-5" />
            <span className="min-w-0">Nutrition &amp; Vitamins</span>
          </h4>
          <dl className="mt-2 grid grid-cols-2 gap-x-1 gap-y-2 @min-[26rem]:grid-cols-3 @min-[36rem]:mt-3 @min-[36rem]:gap-y-3">
            {nutrients.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="flex min-w-0 items-center gap-1 @min-[36rem]:gap-1.5">
                <span className={cn("grid size-7 shrink-0 place-items-center rounded-full @min-[36rem]:size-10", tone)}>
                  <Icon className="size-3.5 @min-[36rem]:size-[1.1rem]" />
                </span>
                <div className="min-w-0 leading-tight">
                  <dd className="truncate text-[0.8rem] font-bold text-ink @min-[36rem]:text-base">{value}</dd>
                  <dt className="truncate text-[0.68rem] text-muted-foreground @min-[36rem]:text-sm">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ── Footer ───────────────────────────── */}
      <footer className="pcard-foot mx-2 mb-2 flex items-center gap-2 rounded-2xl p-2 @min-[36rem]:mx-3 @min-[36rem]:mb-3 @min-[36rem]:gap-3 @min-[36rem]:p-3">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          {product.organic ? (
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-leaf-soft px-2 py-0.5 text-[0.65rem] font-semibold text-leaf-deep ring-1 ring-leaf/30 @min-[36rem]:px-2.5 @min-[36rem]:text-xs">
              <Leaf className="size-3 fill-leaf text-leaf" /> Organic Product
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-sky-soft px-2 py-0.5 text-[0.65rem] font-semibold text-sky-deep ring-1 ring-sky/30 @min-[36rem]:px-2.5 @min-[36rem]:text-xs">
              <ShieldCheck className="size-3" /> {isFood ? "Quality Tested" : "DGDA Certified"}
            </span>
          )}
          <p className="inline-flex items-center gap-1 whitespace-nowrap text-[12.4px] leading-none text-ink/80 @min-[36rem]:gap-1.5 @min-[36rem]:text-base">
            <CalendarDays className="size-3.5 shrink-0 text-leaf-deep @min-[36rem]:size-4" />
            <span>
              {product.dateLabel}: <b className="font-semibold text-ink">{product.date}</b>
            </span>
          </p>
        </div>

        <div className="flex w-[9.25rem] shrink-0 flex-col gap-1.5 rounded-2xl bg-cat-soft px-2 py-2 ring-1 ring-cat/40">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[11.4px] font-bold text-ink/70">Price</span>
            <span className="flex items-baseline gap-1.5">
              <span className="font-display text-[15px] font-extrabold text-ink">৳{product.sellPrice}</span>
              {product.sellPrice < product.price && (
                <span className="text-[11.4px] font-bold text-ink/50 line-through">৳{product.price}</span>
              )}
            </span>
          </div>
          <button
            type="button"
            onClick={() => add(product)}
            className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-ink px-2 py-1.5 text-[0.7rem] font-semibold text-ink-foreground transition hover:bg-ink/90"
          >
            <ShoppingCart className="size-3.5" />
            {qty > 0 ? `Added · ${qty}` : "Add to cart"}
          </button>
        </div>
      </footer>
    </article>
  );
}
