import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Apple,
  ArrowRight,
  BadgeCheck,
  Carrot,
  ChevronDown,
  Cookie,
  Heart,
  Leaf,
  Menu,
  Package,
  Pill,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Stethoscope,
  Store,
  Truck,
  User,
  Wallet,
} from "lucide-react";
import heroImg from "@/assets/hero-basket.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductCardV2 } from "@/components/shop/ProductCardV2";
import { ProductCardV3 } from "@/components/shop/ProductCardV3";
import { ProductCardV4 } from "@/components/shop/ProductCardV4";
import { CartDrawer, CartProvider, CartSideCard, useCart } from "@/components/shop/cart";
import { NutritionistDialog } from "@/components/shop/NutritionistDialog";
import {
  CATEGORIES,
  NUTRITIONISTS,
  PRODUCTS,
  VENDORS,
  categoryClass,
  type CategoryId,
  type NutritionistId,
  type Product,
} from "@/lib/shop-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NutriHaat — Farm-fresh marketplace, checked by nutritionists" },
      {
        name: "description",
        content:
          "Shop fruits, vegetables, biscuits, medicine and more from local farmers and vendors. Every product is rated by a certified nutritionist.",
      },
      { property: "og:title", content: "NutriHaat — Farm-fresh marketplace" },
      {
        property: "og:description",
        content: "Multi-vendor grocery and pharmacy marketplace with nutritionist ratings on every product.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const CAT_ICONS: Record<CategoryId, typeof Apple> = {
  fruit: Apple,
  vegetable: Carrot,
  biscuit: Cookie,
  medicine: Pill,
  other: Package,
};

type CardVersion = "v1" | "v2" | "v3" | "v4";

function Index() {
  const [filter, setFilter] = useState<CategoryId | "all">("all");
  const [version, setVersion] = useState<CardVersion>("v1");
  const [dialog, setDialog] = useState<{ id: NutritionistId; product: Product | null } | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  const openFromProduct = (p: Product) => setDialog({ id: p.nutritionistId, product: p });

  return (
    <CartProvider>
    <div className="min-h-screen bg-background">
      <TopBar />
      <SiteHeader />

      <main>
        <Hero />
        <CategoryStrip active={filter} onPick={(c) => { setFilter(c); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }} />
        <TrustStrip />

        {/* Products */}
        <section id="products" className="relative mx-auto max-w-[1440px] px-4 py-16 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Today's picks</p>
              <h2 className="mt-2 text-4xl font-extrabold text-ink md:text-5xl">Fresh, rated &amp; ready</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Hover a farmer to meet them. Tap the nutritionist to read who rated it and why.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex gap-2" role="tablist" aria-label="Product card version">
                {(
                  [
                    ["v1", "Version 1"],
                    ["v2", "Version 2"],
                    ["v3", "Version 3"],
                    ["v4", "Version 4"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={version === id}
                    onClick={() => setVersion(id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      version === id ? "bg-ink text-ink-foreground shadow-soft" : "bg-muted text-foreground hover:bg-border",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
                <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All</FilterChip>
                {CATEGORIES.map((c) => {
                  const Icon = CAT_ICONS[c.id];
                  return (
                    <FilterChip key={c.id} cat={c.id} active={filter === c.id} onClick={() => setFilter(c.id)}>
                      <Icon className="size-4" /> {c.label}
                    </FilterChip>
                  );
                })}
              </div>
            </div>
          </div>

          {version === "v1" && (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} onOpenNutritionist={openFromProduct} />
              ))}
            </div>
          )}

          {version === "v2" && (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCardV2 key={p.id} product={p} onOpenNutritionist={openFromProduct} />
              ))}
            </div>
          )}

          {version === "v3" && (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCardV3 key={p.id} product={p} onOpenNutritionist={openFromProduct} />
              ))}
            </div>
          )}

          {version === "v4" && (
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => (
                <ProductCardV4 key={p.id} product={p} onOpenNutritionist={openFromProduct} />
              ))}
            </div>
          )}
          <CartSideCard />
        </section>

        <NutritionistSection onOpen={(id) => setDialog({ id, product: null })} />
        <PromoBanners />
        <VendorSection />
        <Newsletter />
      </main>

      <SiteFooter />

      <CartDrawer />

      <NutritionistDialog
        nutritionistId={dialog?.id ?? null}
        product={dialog?.product ?? null}
        onOpenChange={(o) => !o && setDialog(null)}
      />
    </div>
    </CartProvider>
  );
}

/* ───────────────────────── Header ───────────────────────── */

function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-2 text-xs md:px-8 md:text-sm">
        <p className="flex items-center gap-2">
          <Stethoscope className="size-4" /> Every food product is rated by a certified nutritionist
        </p>
        <p className="hidden gap-6 md:flex">
          <span>Free delivery over ৳999</span>
          <a href="#vendors" className="font-semibold underline-offset-4 hover:underline">Sell on NutriHaat</a>
        </p>
      </div>
    </div>
  );
}

function SiteHeader() {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-4 py-3 md:gap-8 md:px-8">
        <a href="#" className="flex shrink-0 items-center gap-2">
          <span className="grid size-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Leaf className="size-5" />
          </span>
          <span className="font-display text-2xl font-extrabold text-ink">
            Nutri<span className="text-primary">Haat</span>
          </span>
        </a>

        <form className="hidden flex-1 items-center rounded-full border bg-card p-1.5 shadow-sm md:flex" onSubmit={(e) => e.preventDefault()}>
          <button type="button" className="flex items-center gap-1 rounded-full bg-muted px-4 py-2 text-sm font-medium text-foreground">
            All categories <ChevronDown className="size-4" />
          </button>
          <input
            type="search"
            placeholder="Search bananas, vitamin C, digestive biscuits…"
            className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground"
          />
          <Button type="submit" size="icon" className="size-10 rounded-full">
            <Search />
          </Button>
        </form>

        <nav className="ml-auto flex items-center gap-1 md:ml-0">
          <IconBtn label="Search" className="md:hidden"><Search /></IconBtn>
          <IconBtn label="Wishlist" className="hidden sm:grid"><Heart /></IconBtn>
          <IconBtn label="Account" className="hidden sm:grid"><User /></IconBtn>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Cart, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative ml-1 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground"
          >
            <ShoppingBag className="size-4" /> <span className="hidden sm:inline">Cart</span>
            <span className="grid size-5 place-items-center rounded-full bg-sun text-xs text-sun-foreground">{count}</span>
          </button>
          <IconBtn label="Menu" className="lg:hidden"><Menu /></IconBtn>
        </nav>
      </div>
      <div className="hidden border-t lg:block">
        <div className="mx-auto flex max-w-[1440px] items-center gap-8 px-8 py-2.5 text-sm font-medium text-foreground/80">
          {CATEGORIES.map((c) => {
            const Icon = CAT_ICONS[c.id];
            return (
              <a key={c.id} href="#products" className={cn("flex items-center gap-2 transition hover:text-ink", categoryClass(c.id))}>
                <span className="grid size-6 place-items-center rounded-full bg-cat-soft text-cat-deep"><Icon className="size-3.5" /></span>
                {c.label}
              </a>
            );
          })}
          <span className="ml-auto flex items-center gap-6">
            <a href="#nutritionists" className="hover:text-ink">Nutritionists</a>
            <a href="#vendors" className="hover:text-ink">Vendors</a>
            <a href="#deals" className="font-semibold text-primary">Today's deals</a>
          </span>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return (
    <button aria-label={label} className={cn("grid size-10 place-items-center rounded-full text-foreground transition hover:bg-muted [&_svg]:size-5", className)}>
      {children}
    </button>
  );
}

/* ───────────────────────── Hero ───────────────────────── */

function Hero() {
  const nutri = NUTRITIONISTS.farzana;
  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-6 md:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-cream">
        <img
          src={heroImg}
          alt="Basket of fresh fruit and vegetables"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover object-right opacity-40 md:opacity-100"
        />
        <div aria-hidden className="hero-fade absolute inset-0 hidden md:block" />
        <div className="relative grid min-h-[560px] items-center px-6 py-14 md:px-14 lg:min-h-[620px]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-sm font-semibold text-primary shadow-sm">
              <BadgeCheck className="size-4" /> 1,200+ farmers &amp; vendors · 18 nutritionists
            </span>
            <h1 className="text-balance mt-5 text-5xl font-extrabold leading-[1.02] text-ink md:text-7xl">
              Straight from the farm. <span className="text-primary">Checked</span> by a nutritionist.
            </h1>
            <p className="mt-5 max-w-md text-lg text-foreground/80">
              Fruits, vegetables, biscuits, medicine and pantry goods from local sellers across Bangladesh — every item rated for real nutrition, not just taste.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="default" size="xl">
                <a href="#products">Start shopping <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" size="xl" className="bg-card">
                <a href="#nutritionists">Meet the nutritionists</a>
              </Button>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                ["35k+", "Products"],
                ["64", "Districts"],
                ["4.8★", "Avg. rating"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-extrabold text-ink">{v}</dt>
                  <dd className="text-sm text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="animate-float absolute bottom-8 right-8 hidden items-center gap-3 rounded-2xl bg-card/95 p-3 pr-5 shadow-card backdrop-blur lg:flex">
          <img src={nutri.photo} alt={nutri.name} width={56} height={56} className="size-14 rounded-xl object-cover" />
          <div>
            <p className="text-xs text-muted-foreground">This week's batches reviewed by</p>
            <p className="font-semibold text-ink">{nutri.name}</p>
            <p className="flex items-center gap-1 text-sm text-ink"><Star className="size-4 fill-sun text-sun" /> 2,140 products rated</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Categories ───────────────────────── */

function CategoryStrip({ active, onPick }: { active: CategoryId | "all"; onPick: (c: CategoryId) => void }) {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-14 md:px-8">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-extrabold text-ink md:text-4xl">Shop by type</h2>
        <p className="hidden text-sm text-muted-foreground md:block">Each type has its own card colour</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c) => {
          const Icon = CAT_ICONS[c.id];
          return (
            <button
              key={c.id}
              onClick={() => onPick(c.id)}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-cat-soft p-5 text-left ring-1 ring-cat/40 transition hover:-translate-y-1 hover:shadow-card",
                categoryClass(c.id),
                active === c.id && "ring-2 ring-cat-deep",
              )}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-cat text-ink transition group-hover:rotate-6">
                <Icon className="size-6" />
              </span>
              <p className="mt-6 font-display text-xl font-bold text-ink">{c.label}</p>
              <p className="text-sm text-cat-deep">{c.blurb}</p>
              <p className="mt-3 text-xs font-semibold text-ink/70">{c.count.toLocaleString()} items</p>
              <span aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-cat/30" />
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FilterChip({ children, active, onClick, cat }: { children: ReactNode; active: boolean; onClick: () => void; cat?: CategoryId }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition",
        cat && categoryClass(cat),
        active
          ? cat
            ? "bg-cat text-ink shadow-soft"
            : "bg-ink text-ink-foreground shadow-soft"
          : cat
            ? "bg-cat-soft text-cat-deep hover:bg-cat/60"
            : "bg-muted text-foreground hover:bg-border",
      )}
    >
      {children}
    </button>
  );
}

function TrustStrip() {
  const items = [
    { icon: Store, title: "Multi-vendor", text: "Buy from 1,200+ verified sellers" },
    { icon: Stethoscope, title: "Nutritionist rated", text: "Every food item reviewed" },
    { icon: Truck, title: "Same-day delivery", text: "Inside Dhaka before 8pm" },
    { icon: Wallet, title: "Cash on delivery", text: "bKash, Nagad & cards too" },
  ];
  return (
    <section className="mx-auto max-w-[1440px] px-4 pt-10 md:px-8">
      <div className="grid gap-4 rounded-3xl border bg-card p-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground"><Icon className="size-5" /></span>
            <div>
              <p className="font-semibold text-ink">{title}</p>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── Nutritionists ───────────────────────── */

function NutritionistSection({ onOpen }: { onOpen: (id: NutritionistId) => void }) {
  return (
    <section id="nutritionists" className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sun">Not customer reviews</p>
          <h2 className="mt-3 text-4xl font-extrabold md:text-5xl">Ratings from people who study food.</h2>
          <p className="mt-4 max-w-md text-ink-foreground/75">
            The star on every card comes from a certified nutritionist who checks freshness, ingredients and nutritional value — so you know what you're really eating.
          </p>
          <ol className="mt-8 space-y-4">
            {["Vendor lists a product with batch details", "Nutritionist inspects and lab-checks a sample", "Rating and notes go live on the product card"].map((s, i) => (
              <li key={s} className="flex items-center gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sun font-display font-bold text-sun-foreground">{i + 1}</span>
                <span className="text-ink-foreground/90">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {Object.values(NUTRITIONISTS).map((n) => (
            <button
              key={n.id}
              onClick={() => onOpen(n.id as NutritionistId)}
              className="group overflow-hidden rounded-3xl bg-card text-left text-card-foreground transition hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={n.photo} alt={n.name} loading="lazy" width={512} height={384} className="size-full object-cover object-top transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-primary"><BadgeCheck className="size-4" /> Verified · {n.experience} yrs</p>
                <p className="mt-1 font-display text-xl font-bold text-ink">{n.name}</p>
                <p className="text-sm text-muted-foreground">{n.title}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-ink">
                  View bio <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── Promos ───────────────────────── */

function PromoBanners() {
  return (
    <section id="deals" className="mx-auto grid max-w-[1440px] gap-6 px-4 py-16 md:grid-cols-2 md:px-8">
      {[
        { cat: "medicine" as const, kicker: "Pharmacy week", title: "15% off vitamins & supplements", cta: "Shop medicine", img: PRODUCTS.find((p) => p.id === "vitamin-c")!.image },
        { cat: "biscuit" as const, kicker: "Tea-time", title: "Buy 2 get 1 on bakery biscuits", cta: "Shop biscuits", img: PRODUCTS.find((p) => p.id === "digestive")!.image },
      ].map((b) => (
        <a key={b.cat} href="#products" className={cn("group relative flex min-h-60 items-center overflow-hidden rounded-[2rem] bg-cat-soft p-8 ring-1 ring-cat/40", categoryClass(b.cat))}>
          <div className="relative z-10 max-w-[55%]">
            <p className="text-sm font-semibold uppercase tracking-widest text-cat-deep">{b.kicker}</p>
            <h3 className="mt-2 text-3xl font-extrabold text-ink">{b.title}</h3>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground">
              {b.cta} <ArrowRight className="size-4" />
            </span>
          </div>
          <span aria-hidden className="absolute -right-10 top-1/2 size-72 -translate-y-1/2 rounded-full bg-cat/40" />
          <img src={b.img} alt="" loading="lazy" width={816} height={816} className="absolute -right-2 bottom-0 h-full w-1/2 object-contain transition duration-500 group-hover:scale-105" />
        </a>
      ))}
    </section>
  );
}

/* ───────────────────────── Vendors ───────────────────────── */

function VendorSection() {
  return (
    <section id="vendors" className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">The people behind it</p>
          <h2 className="mt-2 text-4xl font-extrabold text-ink">Top farmers &amp; vendors</h2>
        </div>
        <Button variant="sun" size="xl">Become a vendor <ArrowRight /></Button>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Object.values(VENDORS).map((v) => {
          const count = PRODUCTS.filter((p) => p.vendorId === v.id).length;
          return (
            <div key={v.id} className="flex items-center gap-4 rounded-3xl border bg-card p-4 transition hover:shadow-card">
              <img src={v.photo} alt={v.name} loading="lazy" width={72} height={72} className="size-18 rounded-2xl object-cover" />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-bold text-ink">{v.name}</p>
                <p className="text-sm text-muted-foreground">{v.role} · {v.place}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary"><ShieldCheck className="size-3.5" /> {count} listed products</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 pb-16 md:px-8">
      <div className="grid gap-6 rounded-[2rem] bg-primary px-8 py-12 text-primary-foreground md:grid-cols-[1.2fr_1fr] md:items-center md:px-14">
        <div>
          <h2 className="text-3xl font-extrabold md:text-4xl">Weekly nutrition tips + fresh deals</h2>
          <p className="mt-2 text-primary-foreground/80">One email a week from our nutritionists. No spam.</p>
        </div>
        <form className="flex gap-2 rounded-full bg-card p-1.5" onSubmit={(e) => e.preventDefault()}>
          <input type="email" required placeholder="you@email.com" className="min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          <Button type="submit" variant="sun" className="h-11 rounded-full px-6">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}

function SiteFooter() {
  const cols = [
    { title: "Shop", links: CATEGORIES.map((c) => c.label) },
    { title: "Sell", links: ["Become a vendor", "Seller centre", "Pricing", "Logistics"] },
    { title: "Help", links: ["Track order", "Returns", "Contact us", "FAQ"] },
  ];
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-14 md:grid-cols-[1.5fr_repeat(3,1fr)] md:px-8">
        <div>
          <p className="font-display text-2xl font-extrabold text-ink">Nutri<span className="text-primary">Haat</span></p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            A multi-vendor marketplace connecting Bangladeshi farmers, bakeries and pharmacies with families — with a nutritionist checking every shelf.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="font-semibold text-ink">{c.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {c.links.map((l) => (
                <li key={l}><a href="#" className="hover:text-ink">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">© 2026 NutriHaat. All rights reserved.</div>
    </footer>
  );
}
