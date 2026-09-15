import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Paperclip, TerminalSquare, X } from "lucide-react";
import { useRef, useState } from "react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { Value } from "@/components/Placeholders";
import { isPlaceholder, personal, socials } from "@/data/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vikash Anand" },
      {
        name: "description",
        content: "Get in touch with Vikash Anand, Cloud and DevOps Engineer based in Pune, India.",
      },
      { property: "og:title", content: "Contact — Vikash Anand" },
      {
        property: "og:description",
        content: "Reach out about cloud, DevOps and infrastructure work.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeReady = !isPlaceholder(personal.resumePath);

  const MAX_FILES = 3;
  const MAX_SIZE = 5 * 1024 * 1024;

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${Math.max(1, Math.round(bytes / 1024))} KB`
      : `${(bytes / 1024 / 1024).toFixed(1)} MB`;

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    const incoming = Array.from(list);
    const tooBig = incoming.find((file) => file.size > MAX_SIZE);
    if (tooBig) {
      setFileError(`"${tooBig.name}" is larger than 5 MB.`);
      return;
    }
    const merged = [...files, ...incoming].slice(0, MAX_FILES);
    setFileError(
      files.length + incoming.length > MAX_FILES
        ? `Only ${MAX_FILES} attachments can be added.`
        : "",
    );
    setFiles(merged);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (name: string) => {
    setFiles((current) => current.filter((file) => file.name !== name));
    setFileError("");
  };

  return (
    <SiteLayout>
      <PageHeader
        command="$ mail -s 'hello' vikash"
        title="Contact"
        description="Happy to talk about cloud platforms, Kubernetes, infrastructure automation — or a good ride route."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="rounded-xl border border-border bg-card p-6" aria-labelledby="details">
          <h2 id="details" className="text-base font-semibold">
            Details
          </h2>
          <dl className="mt-4 space-y-4 text-sm">
            {socials.map((social) => (
              <div key={social.id}>
                <dt className="prompt-label">{social.label}</dt>
                <dd className="mt-1">
                  {isPlaceholder(social.url) ? (
                    <Value value={social.url} />
                  ) : (
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {isPlaceholder(social.handle) ? social.url : social.handle}
                    </a>
                  )}
                </dd>
              </div>
            ))}
            <div>
              <dt className="prompt-label">Location</dt>
              <dd className="mt-1 text-muted-foreground">
                <Value value={personal.location} />
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            {resumeReady ? (
              <a
                href={personal.resumePath}
                download={personal.resumeFileName}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
              >
                <Download className="h-4 w-4" aria-hidden /> Download Resume
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-md border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground"
              >
                <Download className="h-4 w-4" aria-hidden /> Download Resume
              </button>
            )}
            <Link
              to="/terminal"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-sm font-medium hover:border-primary/60"
            >
              <TerminalSquare className="h-4 w-4" aria-hidden /> Open Terminal
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6" aria-labelledby="message">
          <h2 id="message" className="text-base font-semibold">
            Send a message
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            This form is presentation only for now — no message is sent until an email service is
            connected.
          </p>

          <form
            className="mt-5 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label htmlFor="name" className="prompt-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="prompt-label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="body" className="prompt-label">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                rows={5}
                required
                className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <span className="prompt-label">Attachments</span>
              <p className="mt-1 text-xs text-muted-foreground">
                Up to {MAX_FILES} files, 5 MB each (PDF, images, docs).
              </p>
              <input
                ref={fileInputRef}
                id="attachments"
                name="attachments"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,image/*"
                className="sr-only"
                onChange={(event) => handleFiles(event.target.files)}
              />
              <label
                htmlFor="attachments"
                className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/60"
              >
                <Paperclip className="h-4 w-4" aria-hidden /> Attach files
              </label>

              {files.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {files.map((file) => (
                    <li
                      key={file.name}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-sm"
                    >
                      <span className="truncate">{file.name}</span>
                      <span className="flex shrink-0 items-center gap-2 text-xs text-muted-foreground">
                        {formatSize(file.size)}
                        <button
                          type="button"
                          onClick={() => removeFile(file.name)}
                          aria-label={`Remove ${file.name}`}
                          className="rounded p-1 hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" aria-hidden />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <p aria-live="polite" className="mt-2 text-xs text-destructive">
                {fileError}
              </p>
            </div>

            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Send message
            </button>
            <p aria-live="polite" className="text-sm text-terminal-success">
              {sent ? "Thanks — connect an email service to start delivering these messages." : ""}
            </p>
          </form>
        </section>
      </div>
    </SiteLayout>
  );
}
