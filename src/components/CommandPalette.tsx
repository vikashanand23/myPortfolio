import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { groupResults, searchPortfolio } from "@/lib/portfolioSearch";
import { navItems } from "@/data/portfolio";
import { toRoute } from "@/lib/routes";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const grouped = useMemo(() => groupResults(searchPortfolio(query, 20)), [query]);

  const go = (route: string) => {
    onOpenChange(false);
    navigate({ to: toRoute(route) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search portfolio</DialogTitle>
        <DialogDescription className="sr-only">
          Search projects, skills, experience, hobbies and pages.
        </DialogDescription>
        <Command shouldFilter={false} className="bg-popover">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search portfolio…  try kubernetes, grimmspot, aws"
          />
          <CommandList className="max-h-[60vh]">
            {query.trim() === "" ? (
              <CommandGroup heading="Pages">
                {navItems.map((item) => (
                  <CommandItem key={item.to} value={item.to} onSelect={() => go(item.to)}>
                    <span className="font-mono text-xs text-muted-foreground">~{item.to}</span>
                    <span className="ml-3">{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : grouped.length === 0 ? (
              <CommandEmpty>No matches. Try “kubernetes”, “terraform” or “grimmspot”.</CommandEmpty>
            ) : (
              grouped.map(([category, results]) => (
                <CommandGroup key={category} heading={category}>
                  {results.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.id}
                      onSelect={() => go(result.route)}
                    >
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-sm">{result.title}</span>
                        <span className="truncate text-xs text-muted-foreground">
                          {result.snippet}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
