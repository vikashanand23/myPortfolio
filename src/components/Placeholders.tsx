import { ImageIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { isPlaceholder } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Renders a value, or a clearly marked placeholder chip when unset. */
export function Value({ value, className }: { value: string; className?: string }) {
  if (isPlaceholder(value)) {
    return (
      <span className="inline-flex items-center rounded border border-dashed border-border px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
        add info
      </span>
    );
  }
  return <span className={className}>{value}</span>;
}

/**
 * Image with a graceful placeholder: until the real file exists at `src`,
 * a labelled frame is shown instead of a broken image.
 */
export function SafeImage({
  src,
  alt,
  className,
  aspect = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  className?: string;
  aspect?: string;
}) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(!src);
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={`${alt} (image not added yet)`}
        className={cn(
          "flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-surface text-muted-foreground",
          aspect,
          className,
        )}
      >
        <ImageIcon className="h-5 w-5" aria-hidden />
        <span className="px-4 text-center font-mono text-[11px]">{src || "image path not set"}</span>
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth === 0) setFailed(true);
      }}
      className={cn("w-full rounded-lg object-cover", aspect, className)}
    />
  );
}
