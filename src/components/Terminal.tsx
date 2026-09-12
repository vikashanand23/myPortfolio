import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { personal } from "@/data/portfolio";
import { runCommand, suggest, welcomeLines, type TerminalLine } from "@/lib/terminalCommands";
import { toRoute } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Block = { id: number; input?: string; lines: TerminalLine[] };

const prompt = `${personal.terminalUser}@${personal.terminalHost}:~$`;

function LineView({ line, onNavigate }: { line: TerminalLine; onNavigate: (route: string) => void }) {
  switch (line.kind) {
    case "spacer":
      return <div className="h-3" aria-hidden />;
    case "heading":
      return <p className="mt-1 font-mono text-sm font-semibold text-terminal-accent">{line.text}</p>;
    case "kv":
      return (
        <p className="flex flex-wrap gap-x-3 font-mono text-sm">
          <span className="min-w-[9rem] text-terminal-accent">{line.key}</span>
          <span className="text-terminal-fg">{line.value}</span>
        </p>
      );
    case "bullet":
      return <p className="font-mono text-sm text-terminal-fg">&nbsp;&nbsp;• {line.text}</p>;
    case "error":
      return <p className="font-mono text-sm text-terminal-error">{line.text}</p>;
    case "success":
      return <p className="font-mono text-sm text-terminal-success">{line.text}</p>;
    case "link":
      return (
        <button
          type="button"
          onClick={() => onNavigate(line.route)}
          className="block text-left font-mono text-sm text-terminal-accent underline-offset-4 hover:underline"
        >
          {line.text}
        </button>
      );
    case "external":
      return (
        <a
          href={line.url}
          target="_blank"
          rel="noreferrer noopener"
          className="block font-mono text-sm text-terminal-accent underline underline-offset-4"
        >
          {line.text}
        </a>
      );
    default:
      return (
        <p className={cn("font-mono text-sm", line.dim ? "text-terminal-dim" : "text-terminal-fg")}>
          {line.text || "\u00a0"}
        </p>
      );
  }
}

export function Terminal({ onOpenPalette }: { onOpenPalette?: () => void }) {
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<Block[]>([{ id: 0, lines: welcomeLines }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const counter = useRef(1);

  const suggestions = useMemo(() => suggest(input), [input]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [blocks]);

  const go = useCallback(
    (route: string) => {
      navigate({ to: toRoute(route) });
    },
    [navigate],
  );

  const execute = useCallback(
    (raw: string) => {
      const value = raw.trim();
      if (!value) return;
      setHistory((h) => [...h, value]);
      setHistoryIndex(-1);

      const result = runCommand(value);
      if (result.action?.type === "clear") {
        setBlocks([]);
        return;
      }
      setBlocks((b) => [...b, { id: counter.current++, input: value, lines: result.lines }]);
      if (result.action?.type === "navigate") {
        window.setTimeout(() => go(result.action!.type === "navigate" ? result.action!.route : "/"), 450);
      }
    },
    [go],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      execute(input);
      setInput("");
      return;
    }
    if (event.key === "l" && event.ctrlKey) {
      event.preventDefault();
      setBlocks([]);
      return;
    }
    if (event.key === "k" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      onOpenPalette?.();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      if (suggestions.length) setInput(suggestions[0] + " ");
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === -1) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      }
    }
  };

  return (
    <div className="flex h-full min-h-[70vh] flex-1 flex-col overflow-hidden rounded-xl border border-border bg-terminal-bg shadow-2xl">
      <div className="flex items-center gap-2 border-b border-border/80 bg-surface px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-error/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-terminal-success/70" />
        </span>
        <p className="ml-2 truncate font-mono text-xs text-muted-foreground">{prompt} — portfolio-sh</p>
      </div>

      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-5 sm:px-6"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {blocks.map((block) => (
          <div key={block.id} className="space-y-0.5 break-words">
            {block.input && (
              <p className="font-mono text-sm">
                <span className="text-terminal-accent">{prompt}</span>{" "}
                <span className="text-terminal-fg">{block.input}</span>
              </p>
            )}
            {block.lines.map((line, i) => (
              <LineView key={i} line={line} onNavigate={go} />
            ))}
          </div>
        ))}

        <div className="flex items-center gap-2 font-mono text-sm">
          <label htmlFor="terminal-input" className="shrink-0 text-terminal-accent">
            {prompt}
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal command input"
            className="min-w-0 flex-1 bg-transparent font-mono text-sm text-terminal-fg outline-none placeholder:text-terminal-dim"
            placeholder="type help"
          />
          <span aria-hidden className="caret-blink h-4 w-2 bg-terminal-accent" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border/80 bg-surface px-4 py-2.5">
        {suggestions.length > 0 ? (
          suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setInput(s + " ");
                inputRef.current?.focus();
              }}
              className="rounded border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary/50 hover:text-foreground"
            >
              {s}
            </button>
          ))
        ) : (
          <>
            {["help", "whoami", "projects", "skills", "find kubernetes", "neofetch"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  execute(s);
                  setInput("");
                  inputRef.current?.focus();
                }}
                className="rounded border border-border bg-background px-2 py-1 font-mono text-[11px] text-muted-foreground hover:border-primary/50 hover:text-foreground"
              >
                {s}
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
