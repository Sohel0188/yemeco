import { Award, BadgeCheck, Briefcase, Hospital, MessageSquareQuote, Star } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { NUTRITIONISTS, categoryClass, type Nutritionist, type NutritionistId, type Product } from "@/lib/shop-data";
import { cn } from "@/lib/utils";

type Props = {
  nutritionistId: NutritionistId | null;
  product: Product | null;
  onOpenChange: (open: boolean) => void;
};

export function NutritionistDialog({ nutritionistId, product, onOpenChange }: Props) {
  const person: Nutritionist | undefined = nutritionistId ? NUTRITIONISTS[nutritionistId] : undefined;

  return (
    <Dialog open={!!person} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[92vh] max-w-xl gap-0 overflow-y-auto rounded-3xl border-0 p-0",
          product ? categoryClass(product.category) : "cat-vegetable",
        )}
      >
        {person && (
          <>
            <div className="pcard-head relative flex items-end gap-4 px-6 pb-8 pt-8">
              <img
                src={person.photo}
                alt={person.name}
                width={112}
                height={112}
                className="size-28 shrink-0 rounded-3xl border-4 border-card object-cover shadow-card"
              />
              <div className="min-w-0 pb-1">
                <span className="inline-flex items-center gap-1 rounded-full bg-leaf px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                  <BadgeCheck className="size-3.5" /> Verified Nutritionist
                </span>
                <DialogTitle className="mt-2 text-2xl font-extrabold text-ink">{person.name}</DialogTitle>
                <DialogDescription className="text-sm font-medium text-ink/75">{person.title}</DialogDescription>
              </div>
            </div>

            <div className="space-y-5 px-6 pb-6 pt-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <Stat icon={Briefcase} value={`${person.experience} yrs`} label="Experience" />
                <Stat icon={Star} value={person.reviews.toLocaleString()} label="Products rated" />
                <Stat icon={Award} value={String(person.credentials.length)} label="Certifications" />
              </div>

              <section>
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Bio</h4>
                <p className="mt-1.5 leading-relaxed text-foreground">{person.bio}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Hospital className="size-4" /> {person.hospital}
                </p>
              </section>

              <section className="flex flex-wrap gap-2">
                {person.credentials.map((c) => (
                  <span key={c} className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-ink-foreground">
                    {c}
                  </span>
                ))}
                {person.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {s}
                  </span>
                ))}
              </section>

              {product && (
                <section className="rounded-2xl bg-cat-soft p-4 ring-1 ring-cat/40">
                  <div className="flex items-center justify-between gap-3">
                    <p className="flex items-center gap-2 text-sm font-semibold text-cat-deep">
                      <MessageSquareQuote className="size-4" /> Review of {product.name}
                    </p>
                    <span className="inline-flex items-center gap-1 font-display text-lg font-extrabold text-ink">
                      <Star className="size-5 fill-sun text-sun" /> {product.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink">“{product.note}”</p>
                </section>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Star; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-muted px-2 py-3">
      <Icon className="mx-auto size-4 text-primary" />
      <p className="mt-1 font-display text-lg font-bold text-ink">{value}</p>
      <p className="text-[0.7rem] text-muted-foreground">{label}</p>
    </div>
  );
}
