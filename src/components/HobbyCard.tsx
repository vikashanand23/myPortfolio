import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Hobby } from "@/data/portfolio";
import { SafeImage, Value } from "@/components/Placeholders";

export function HobbyCard({ hobby }: { hobby: Hobby }) {
  const [index, setIndex] = useState(0);
  const count = Math.max(hobby.images.length, 1);
  const image = hobby.images[index];

  return (
    <article className="animate-rise overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative">
        <SafeImage
          src={image?.src ?? ""}
          alt={image?.alt ?? `${hobby.title} photo`}
          aspect="aspect-[16/10]"
          className="rounded-none"
        />
        {count > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 backdrop-blur transition-colors hover:border-primary/60"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => setIndex((i) => (i + 1) % count)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/80 p-2 backdrop-blur transition-colors hover:border-primary/60"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {hobby.images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === index}
                  onClick={() => setIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold">{hobby.title}</h3>
          <span className="prompt-label">
            status: <Value value={hobby.status} />
          </span>
        </div>
        <p className="mt-1 text-sm text-primary">{hobby.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{hobby.description}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="prompt-label">Since</dt>
            <dd className="mt-1 text-muted-foreground">
              <Value value={hobby.since} />
            </dd>
          </div>
          <div>
            <dt className="prompt-label">Story</dt>
            <dd className="mt-1 text-muted-foreground">
              <Value value={hobby.story} />
            </dd>
          </div>
        </dl>

        <div className="mt-4">
          <p className="prompt-label">$ cat milestones</p>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            {hobby.milestones.map((m, i) => (
              <li key={i} className="flex flex-wrap gap-2">
                <span className="font-mono text-xs text-primary">
                  <Value value={m.date} />
                </span>
                <Value value={m.text} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
