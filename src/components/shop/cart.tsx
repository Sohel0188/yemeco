import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Minus, Plus, ShoppingBasket, X } from "lucide-react";
import type { Product } from "@/lib/shop-data";

type Line = { product: Product; qty: number };

type CartValue = {
  lines: Line[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);
  const total = lines.reduce((sum, line) => sum + line.qty * line.product.sellPrice, 0);

  const value = useMemo<CartValue>(
    () => ({
      lines,
      count,
      total,
      open,
      setOpen,
      add: (product) => {
        setLines((prev) => {
          const found = prev.find((line) => line.product.id === product.id);
          if (!found) return [...prev, { product, qty: 1 }];
          return prev.map((line) => (line.product.id === product.id ? { ...line, qty: line.qty + 1 } : line));
        });
      },
      setQty: (id, qty) => {
        setLines((prev) => (qty <= 0 ? prev.filter((line) => line.product.id !== id) : prev.map((line) => (line.product.id === id ? { ...line, qty } : line))));
      },
    }),
    [lines, count, total, open],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used within CartProvider");
  return cart;
}

/** Compact cart card in the margin to the right of the first product row. */
export function CartSideCard() {
  const { count, total, setOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
      className="absolute left-[calc(100%+0.75rem)] top-[19.5rem] z-20 hidden w-[4.75rem] flex-col items-center gap-2 rounded-2xl bg-white px-2 py-3 text-center shadow-[0_16px_40px_-24px_rgba(20,24,16,0.45)] ring-1 ring-black/10 min-[1600px]:flex"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-[#ffe14a] text-[#172033]">
        <ShoppingBasket className="size-5" />
      </span>
      <span className="text-xs font-extrabold leading-tight text-ink">Cart</span>
      <span className="text-[11px] leading-tight text-ink/60">{count} {count === 1 ? "item" : "items"}</span>
      <span className="font-display text-sm font-extrabold text-ink">৳{total}</span>
    </button>
  );
}

export function CartDrawer() {
  const { lines, count, total, open, setOpen, setQty } = useCart();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <div className={open ? "fixed inset-0 z-50" : "pointer-events-none fixed inset-0 z-50"} aria-hidden={!open}>
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Cart"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between bg-[#ffe14a] px-4 py-3 text-[#172033]">
          <p className="flex items-center gap-2 font-extrabold">
            <ShoppingBasket className="size-5" />
            {count} {count === 1 ? "item" : "items"}
          </p>
          <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-1 text-sm font-semibold">
            <X className="size-4" /> Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <EmptyBasket />
            <p className="mt-6 text-base text-[#3d4554]">Looks like Your cart is empty.</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-2 text-base font-medium text-[#172033] underline-offset-4 hover:underline"
            >
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {lines.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3 rounded-2xl bg-[#f7f6f2] p-3">
                  <img src={product.image} alt="" className="size-16 shrink-0 rounded-xl bg-white object-contain" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-ink">{product.name}</p>
                    <p className="text-sm text-ink/60">৳{product.sellPrice}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button type="button" aria-label={`Decrease ${product.name}`} onClick={() => setQty(product.id, qty - 1)} className="grid size-7 place-items-center rounded-full bg-white ring-1 ring-black/10">
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{qty}</span>
                      <button type="button" aria-label={`Increase ${product.name}`} onClick={() => setQty(product.id, qty + 1)} className="grid size-7 place-items-center rounded-full bg-white ring-1 ring-black/10">
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-extrabold text-ink">৳{product.sellPrice * qty}</p>
                </li>
              ))}
            </ul>
            <footer className="border-t px-4 py-4">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink/60">Total</span>
                <span className="font-display text-2xl font-extrabold text-ink">৳{total}</span>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="mt-3 w-full rounded-full bg-[#172033] py-3 text-sm font-semibold text-white">
                Continue shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}

function EmptyBasket() {
  return (
    <svg viewBox="0 0 180 150" className="h-40 w-48" aria-hidden>
      <ellipse cx="90" cy="132" rx="52" ry="12" fill="#e7eef8" />
      <path d="M34 52h112l-12 58H46L34 52z" fill="#e31c23" />
      <path d="M46 70h88M50 86h80M54 102h72" stroke="#b11218" strokeWidth="3" />
      <path d="M58 52l8 58M90 52v58M122 52l-8 58" stroke="#f3f6fb" strokeWidth="3" opacity="0.7" />
      <path d="M28 52h124" stroke="#c41218" strokeWidth="8" strokeLinecap="round" />
      <path d="M78 34c2-16 28-18 32-2" fill="none" stroke="#1c1c1c" strokeWidth="7" strokeLinecap="round" />
      <rect x="96" y="78" width="28" height="20" rx="2" fill="#1a1a1a" />
      <path d="M100 88h20" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}
