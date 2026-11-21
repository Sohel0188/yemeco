import { useCart } from "@/components/shop/cart";
import { CalendarDays, Leaf, MapPin, ShieldCheck, ShoppingCart, Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { NUTRITIONISTS, VENDORS, categoryClass, type CategoryId, type Product } from "@/lib/shop-data";

const CARD_TONE: Record<CategoryId, { solid: string; soft: string; ink: string; line: string }> = {
  fruit: { solid: "#f0b429", soft: "#fff6dc", ink: "#3f2a05", line: "#d4920d" },
  vegetable: { solid: "#1f9d57", soft: "#e7f8ee", ink: "#ffffff", line: "#178a4a" },
  biscuit: { solid: "#e7a15a", soft: "#fff4e8", ink: "#3d2410", line: "#d4893c" },
  medicine: { solid: "#3d8fd6", soft: "#e8f4fc", ink: "#ffffff", line: "#2d78b8" },
  other: { solid: "#e15b78", soft: "#fdecef", ink: "#ffffff", line: "#c94462" },
};

type Props = {
  product: Product;
  onOpenNutritionist: (product: Product) => void;
};

/** Solid-colour card converted from the White-Jamun HTML reference. */
export function ProductCardV3({ product, onOpenNutritionist }: Props) {
  const vendor = VENDORS[product.vendorId];
  const nutritionist = NUTRITIONISTS[product.nutritionistId];
  const isFood = product.category !== "medicine";
  const tone = CARD_TONE[product.category];
  const { add, lines } = useCart();
  const qty = lines.find((line) => line.product.id === product.id)?.qty ?? 0;
  const filled = Math.round(product.rating);

  return (
    <article
      aria-label={`${product.name} product information card`}
      className={cn("@container overflow-hidden rounded-[1.15rem] border-4 bg-white shadow-sm", categoryClass(product.category))}
      style={{ borderColor: tone.line }}
    >
      <header
        className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-2 py-2 @min-[36rem]:gap-3 @min-[36rem]:px-3 @min-[36rem]:py-2.5"
        style={{ background: tone.solid, color: tone.ink }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`${vendor.role}: ${vendor.name}`}
              className="size-12 overflow-hidden rounded-xl border-[3px] border-white bg-white outline-none transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-white @min-[36rem]:size-16"
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

        <div className="min-w-0">
          <h3 className="truncate text-base font-extrabold leading-tight @min-[28rem]:text-xl @min-[36rem]:text-2xl">{product.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.68rem] font-medium @min-[36rem]:text-sm">
            <span className="whitespace-nowrap">Mini order: {product.minOrder}</span>
            <span className="inline-flex items-center gap-0.5 whitespace-nowrap">
              <MapPin className="size-3 shrink-0 @min-[36rem]:size-3.5" />
              {product.from}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenNutritionist(product)}
          aria-label={`View ${nutritionist.name}'s profile, rating ${product.rating.toFixed(1)}`}
          className="flex min-w-[4.6rem] flex-col items-center justify-center rounded-[0.65rem] bg-white px-1.5 py-1 text-[#202820] outline-none transition hover:scale-105 focus-visible:ring-4 focus-visible:ring-white @min-[36rem]:min-h-14 @min-[36rem]:min-w-[6.5rem] @min-[36rem]:px-2"
        >
          <strong className="text-[0.62rem] @min-[36rem]:text-xs">Nutritionist</strong>
          <span className="mt-0.5 flex text-[#ffb900]" aria-hidden>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} className={cn("size-2.5 @min-[36rem]:size-3.5", i < filled ? "fill-[#ffb900]" : "fill-transparent text-[#ffb900]/35")} />
            ))}
          </span>
        </button>
      </header>

      <div className="h-40 overflow-hidden bg-white px-3 @min-[36rem]:h-52">
        <img src={product.image} alt={product.name} className="size-full object-contain" />
      </div>

      <footer className="flex items-center justify-between gap-2 px-2 py-2 @min-[36rem]:px-3 @min-[36rem]:py-3" style={{ background: tone.soft }}>
        <div className="min-w-0 text-[0.68rem] font-semibold text-ink @min-[36rem]:text-sm">
          <p className="flex items-center gap-1">
            <CalendarDays className="size-3.5 shrink-0 @min-[36rem]:size-5" style={{ color: tone.line }} />
            <span className="truncate">{product.date}</span>
          </p>
          <p className="mt-1 flex items-center gap-1 font-bold">
            {product.organic ? (
              <>
                <Leaf className="size-3.5 shrink-0 @min-[36rem]:size-5" style={{ color: tone.line }} />
                <span>organic</span>
              </>
            ) : (
              <>
                <ShieldCheck className="size-3.5 shrink-0 @min-[36rem]:size-5" style={{ color: tone.line }} />
                <span>{isFood ? "tested" : "certified"}</span>
              </>
            )}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[11.4px] font-bold text-ink/70">Price</span>
            <span className="font-display text-[15px] font-extrabold text-ink">৳{product.sellPrice}</span>
            {product.sellPrice < product.price && (
              <span className="text-[11.4px] font-bold text-ink/50 line-through">৳{product.price}</span>
            )}
          </div>
          <button
            type="button"
            onClick={() => add(product)}
            className="inline-flex items-center justify-center gap-1 rounded-xl px-2.5 py-1.5 text-[0.7rem] font-semibold text-white transition hover:brightness-110"
            style={{ background: tone.line }}
          >
            <ShoppingCart className="size-3.5" />
            {qty > 0 ? `Added · ${qty}` : "Add to cart"}
          </button>
        </div>
      </footer>
    </article>
  );
}
