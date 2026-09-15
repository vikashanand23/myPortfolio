import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { SafeImage } from "@/components/Placeholders";
import { isPlaceholder, socials } from "@/data/portfolio";

export const Route = createFileRoute("/payments")({
  head: () => ({
    meta: [
      { title: "Get This Portfolio — Vikash Anand" },
      {
        name: "description",
        content:
          "Get a polished, terminal-inspired developer portfolio like this one for a one-time payment.",
      },
      { property: "og:title", content: "Get This Portfolio — Vikash Anand" },
      {
        property: "og:description",
        content: "A premium, developer-focused portfolio with a Linux-style terminal experience.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/payments" },
    ],
    links: [{ rel: "canonical", href: "/payments" }],
  }),
  component: PaymentsPage,
});

const FEATURES = [
  "Terminal-inspired developer portfolio",
  "Responsive design for desktop and mobile",
  "Projects, skills and experience sections",
  "Interactive portfolio search",
  "Customizable personal branding",
  "GitHub / LinkedIn / social links",
  "Easy to deploy and maintain",
  "Clean, production-ready structure",
];

function PaymentsPage() {
  const emailSocial = socials.find((s) => s.id === "email");
  const emailConfigured = emailSocial && !isPlaceholder(emailSocial.url);
  const contactHref = emailConfigured ? emailSocial!.url : "/contact";
  const isMailLink = contactHref.startsWith("mailto:");

  const contactButtonClassName =
    "group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-medium transition-transform focus-visible:outline-offset-4";

  return (
    <SiteLayout>
      <div className="animate-rise">
        <PageHeader
          command="$ payments --get-portfolio"
          title="Want a portfolio like this?"
          description="Get a polished, developer-focused portfolio with a terminal-inspired experience, projects, skills, experience, and a personality that actually feels like you."
        />

        <section
          className="mb-10 rounded-2xl border border-border bg-card p-6 sm:p-8"
          aria-labelledby="pricing-heading"
        >
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p id="pricing-heading" className="prompt-label text-primary">
                $ price --onetime
              </p>
              <div className="mt-2 flex items-baseline gap-4">
                <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                  ₹149
                </span>
                <span className="text-lg text-muted-foreground sm:text-xl">$1.50</span>
              </div>
              <span className="mt-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                One-time payment
              </span>
            </div>

            {isMailLink ? (
              <a
                href={contactHref}
                rel="noreferrer noopener"
                className={`${contactButtonClassName} bg-primary text-primary-foreground hover:-translate-y-0.5`}
              >
                Paid? Let&apos;s build it.
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            ) : (
              <Link
                to="/contact"
                className={`${contactButtonClassName} bg-primary text-primary-foreground hover:-translate-y-0.5`}
              >
                Paid? Let&apos;s build it.
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        </section>

        <section className="mb-10" aria-labelledby="features-heading">
          <div className="mb-6 flex items-center gap-3">
            <span className="prompt-label text-primary">$ cat what-you-get.md</span>
            <h2 id="features-heading" className="sr-only">
              What you get
            </h2>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h3 className="text-xl font-semibold">What you get</h3>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex rounded-full bg-primary/10 p-1 text-primary">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="pay-heading">
          <div className="mb-6 flex items-center gap-3">
            <span className="prompt-label text-primary">$ qr --scan-to-pay</span>
            <h2 id="pay-heading" className="text-xl font-semibold">
              Pay and get started
            </h2>
          </div>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Scan either QR code to make the payment. After payment, contact me with your payment
            confirmation and I&apos;ll share the next steps.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Pay via UPI</h3>
                  <p className="text-sm text-muted-foreground">Scan with any UPI app</p>
                </div>
                <span className="prompt-label rounded border border-border px-2 py-1 text-[10px]">
                  IN
                </span>
              </div>
              <SafeImage
                src="/payments/upi-qr.png"
                alt="UPI QR code to pay ₹149 for the portfolio"
                aspect="aspect-square"
                className="rounded-xl bg-surface"
              />
            </div>

            <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 sm:p-8">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Pay via PayPal</h3>
                  <p className="text-sm text-muted-foreground">Scan with your PayPal app</p>
                </div>
                <span className="prompt-label rounded border border-border px-2 py-1 text-[10px]">
                  GLOBAL
                </span>
              </div>
              <SafeImage
                src="/payments/paypal-qr.png"
                alt="PayPal QR code to pay $1.50 for the portfolio"
                aspect="aspect-square"
                className="rounded-xl bg-surface"
              />
            </div>
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <span aria-hidden className="font-mono text-primary">
              ~
            </span>
            Please make sure the payment amount is ₹149 / $1.50 before confirming.
          </p>

          <div className="mt-10 flex justify-center">
            {isMailLink ? (
              <a
                href={contactHref}
                rel="noreferrer noopener"
                className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-offset-4"
              >
                Paid? Let&apos;s build it.
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            ) : (
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-offset-4"
              >
                Paid? Let&apos;s build it.
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            )}
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
