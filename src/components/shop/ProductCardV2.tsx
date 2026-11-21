import { useCart } from "@/components/shop/cart";
import { Beef, Box, CalendarDays, Citrus, Droplet, Droplets, Leaf, MapPin, ShieldCheck, ShoppingCart, Sprout, Star, Stethoscope, Zap } from "lucide-react";
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

/** Wide showcase card converted from the NutriMart HTML reference. */
export function ProductCardV2({ product, onOpenNutritionist }: Props) {
  const vendor = VENDORS[product.vendorId];
  const nutritionist = NUTRITIONISTS[product.nutritionistId];
  const n = product.nutrients;
  const isFood = product.category !== "medicine";
  const { add, lines } = useCart();
  const qty = lines.find((line) => line.product.id === product.id)?.qty ?? 0;

  const nutrients = [
    { label: "Cal", value: n.cal, icon: Zap, tone: "bg-n-cal-soft text-n-cal" },
    { label: "Protein", value: n.protein, icon: Beef, tone: "bg-n-protein-soft text-n-protein" },
    { label: "Carbs", value: n.carbs, icon: Droplet, tone: "bg-n-carbs-soft text-n-carbs" },
    { label: "Fat", value: n.fat, icon: Droplets, tone: "bg-n-fat-soft text-n-fat" },
    { label: "Fiber", value: n.fiber, icon: Sprout, tone: "bg-n-fiber-soft text-n-fiber" },
    { label: n.vitamin.label, value: n.vitamin.value, icon: Citrus, tone: "bg-n-vit-soft text-n-vit" },
  ];

  return (
    <article
      aria-label={`${product.name} product information card`}
      className={cn(
        "@container overflow-hidden rounded-[1.6rem] border border-[#e7ebf5] bg-card shadow-sm",
        categoryClass(product.category),
      )}
    >
      <header
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 @min-[36rem]:gap-4 @min-[36rem]:px-6 @min-[36rem]:py-5"
        style={{
          background:
            "linear-gradient(105deg, var(--c) 0%, color-mix(in oklab, var(--c) 50%, white) 42%, var(--c-tint) 100%)",
          borderBottom: "5px solid var(--c)",
          borderRadius: "0 0 42% 6% / 0 0 18% 10%",
        }}
      >
        <div className="flex items-center border-r-2 border-cat-deep/40 pr-2 @min-[36rem]:pr-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label={`${vendor.role}: ${vendor.name}`}
                className="size-12 overflow-hidden rounded-full border-[3px] border-card bg-card shadow-soft outline-none ring-2 ring-card transition hover:scale-105 focus-visible:ring-4 @min-[36rem]:size-20 @min-[36rem]:border-4"
              >
                <img src={vendor.photo} alt={vendor.name} className="size-full object-cover" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="rounded-xl bg-ink px-3 py-2 text-ink-foreground">
              <p className="text-[0.65rem] uppercase tracking-wider opacity-70">{vendor.role}</p>
              <p className="text-sm font-semibold">{vendor.name}</p>
              <p className="text-xs opacity-80">{vendor.place}</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="min-w-0 text-center">
          <h3 className="truncate text-lg font-extrabold tracking-tight text-ink @min-[28rem]:text-2xl @min-[36rem]:text-4xl">{product.name}</h3>
          <div className="mt-1.5 flex flex-wrap items-center justify-center gap-1">
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#f7f8fb] px-2 py-0.5 text-[0.65rem] font-semibold text-[#152d52] shadow-sm @min-[36rem]:px-3 @min-[36rem]:py-1.5 @min-[36rem]:text-sm">
              <Box className="size-3 @min-[36rem]:size-4" /> Min: {product.minOrder}
            </span>
            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-[#d5e9ff] px-2 py-0.5 text-[0.65rem] font-semibold text-[#153a74] shadow-sm @min-[36rem]:px-3 @min-[36rem]:py-1.5 @min-[36rem]:text-sm">
              <MapPin className="size-3 shrink-0 fill-sky/20 text-sky @min-[36rem]:size-4" />
              From: {product.from}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 border-l-2 border-cat-deep/40 pl-2 @min-[36rem]:gap-2 @min-[36rem]:pl-4">
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
            <div className="flex items-center justify-center gap-0.5">
              <Star className="size-4 fill-[#ffb414] text-[#ffb414] @min-[36rem]:size-7" />
              <span className="text-lg font-extrabold leading-none text-ink @min-[36rem]:text-3xl">{product.rating.toFixed(1)}</span>
            </div>
            <p className="text-[0.6rem] font-medium text-ink @min-[36rem]:text-xs">Nutritionist Rating</p>
          </div>
        </div>
      </header>

      <div className="grid items-center gap-2 px-3 py-3 @min-[22rem]:grid-cols-[0.8fr_1.2fr] @min-[36rem]:gap-5 @min-[36rem]:px-6 @min-[36rem]:py-5">
        <div
          className="relative grid aspect-[5/4] place-items-center"
          style={{
            background: "radial-gradient(ellipse at 45% 48%, var(--c-soft) 0%, var(--c-tint) 43%, white 73%)",
            borderRadius: "48% 52% 45% 55% / 48% 44% 56% 52%",
          }}
        >
          <img src={product.image} alt={product.name} className="relative z-[1] h-full w-full object-contain p-2" />
        </div>

        <section aria-label="Nutrition and vitamins" className="min-w-0 rounded-2xl border-2 border-[#edf0f8] bg-gradient-to-br from-white to-[#fbfcff] p-2.5 @min-[36rem]:rounded-[1.75rem] @min-[36rem]:p-5">
          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-extrabold text-ink @min-[36rem]:mb-4 @min-[36rem]:text-2xl">
            <Leaf className="size-4 shrink-0 fill-leaf/30 text-leaf @min-[36rem]:size-7" />
            <span className="min-w-0">Nutrition &amp; Vitamins</span>
          </h4>
          <dl className="grid grid-cols-2 gap-x-1 gap-y-2 @min-[36rem]:grid-cols-3 @min-[36rem]:gap-4">
            {nutrients.map(({ label, value, icon: Icon, tone }) => (
              <div key={label} className="flex min-w-0 items-center gap-1 @min-[36rem]:gap-2">
                <span className={cn("grid size-7 shrink-0 place-items-center rounded-full @min-[36rem]:size-12", tone)}>
                  <Icon className="size-3.5 @min-[36rem]:size-5" />
                </span>
                <div className="min-w-0 leading-tight">
                  <dd className="truncate text-xs font-extrabold text-ink @min-[36rem]:text-xl">{value}</dd>
                  <dt className="truncate text-[0.62rem] text-[#71809e] @min-[36rem]:text-sm">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <footer className="mx-2 mb-2 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#e9fbdc] via-[#e5f4ff] to-[#f0e3ff] p-2 @min-[36rem]:mx-3 @min-[36rem]:mb-3 @min-[36rem]:gap-3 @min-[36rem]:p-4">
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1 @min-[36rem]:px-1">
          {product.organic ? (
            <p className="inline-flex items-center gap-1 whitespace-nowrap text-[0.65rem] font-extrabold text-[#125a1c] @min-[36rem]:gap-2 @min-[36rem]:text-base">
              <Leaf className="size-3.5 shrink-0 fill-leaf text-leaf @min-[36rem]:size-5" /> Organic Product
            </p>
          ) : (
            <p className="inline-flex items-center gap-1 whitespace-nowrap text-[0.65rem] font-extrabold text-sky-deep @min-[36rem]:gap-2 @min-[36rem]:text-base">
              <ShieldCheck className="size-3.5 shrink-0 @min-[36rem]:size-5" /> {isFood ? "Quality Tested" : "DGDA Certified"}
            </p>
          )}
          <p className="inline-flex items-center gap-1 whitespace-nowrap text-[12px] text-ink @min-[36rem]:text-base">
            <CalendarDays className="size-3.5 shrink-0 text-leaf-deep @min-[36rem]:size-4" />
            <span>
              {product.dateLabel}: <strong>{product.date}</strong>
            </span>
          </p>
        </div>

        <div className="flex w-[9.25rem] shrink-0 flex-col gap-1.5 rounded-2xl bg-white/70 px-2 py-1.5">
          <div className="flex items-baseline justify-between gap-1">
            <span className="text-[11.4px] font-bold text-ink/70">Price</span>
            <span className="flex items-baseline gap-1">
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
