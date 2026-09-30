import Link from 'next/link';
import {
  LayoutTemplate,
  Sparkles,
  Shield,
  ArrowRight,
  Play,
  FileText,
  ListChecks,
  CalendarClock,
  MousePointerClick,
  Copy,
  CheckCircle2,
  TrendingUp,
  Home as HomeIcon,
  KeyRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

const BENEFITS = [
  {
    icon: LayoutTemplate,
    title: 'Real-estate-native long-form frameworks',
    body: 'Not a generic blog post dressed as a video. OpenHouseCast structures scripts the way top listing agents actually speak — a proven long-form arc built for watch-time.',
    tag: 'Frameworks',
  },
  {
    icon: TrendingUp,
    title: 'Paste market data, get a monthly report script',
    body: 'Drop in median price, inventory, days-on-market, and year-over-year change. We fold your numbers into a clean, spoken-word market update in seconds.',
    tag: 'Market reports',
  },
  {
    icon: Shield,
    title: 'Fair Housing guardrails, baked in',
    body: 'Every script is generated with Fair Housing compliance in mind. No steering, no protected-class language — just compliant, professional content you can publish with confidence.',
    tag: 'Compliance',
  },
];

const STEPS = [
  {
    n: '01',
    icon: MousePointerClick,
    title: 'Pick your content line',
    body: 'Choose Market Update, Buyer Education, or Seller Education — each has its own structure, hooks, and format built for that video type.',
  },
  {
    n: '02',
    icon: KeyRound,
    title: 'Fill in your prompts',
    body: 'Tell us your market, your audience, and what you want to cover. Paste MLS data if you have it — no uploads or CSV wrangling required.',
  },
  {
    n: '03',
    icon: Copy,
    title: 'Get your full 9-part package',
    body: 'Title, hook, timestamped script, shot list, on-screen text, retention notes, CTA, description, and tags — copied straight to your workflow.',
  },
];

const EXAMPLE_BLOCKS = [
  {
    kind: 'Market Update',
    title: '"Median Price Just Dropped in Austin. Here\u2019s What It Means."',
    hook: 'If you\u2019re waiting for prices in Austin to crash, the last 90 days will surprise you…',
    tags: ['#austinrealestate', '#marketupdate', '#housingmarket'],
  },
  {
    kind: 'Buyer Education',
    title: '"First-Time Buyers: 7 Costs Your Realtor Never Told You About"',
    hook: 'Your down payment is the smallest number on the closing sheet. Let\u2019s fix that today…',
    tags: ['#firsttimehomebuyer', '#homebuyingtips', '#closingcosts'],
  },
  {
    kind: 'Seller Education',
    title: '"How to Price Your Home in 2025 Without Leaving Money on the Table"',
    hook: 'The #1 mistake sellers make isn\u2019t overpricing. It\u2019s pricing on a feeling…',
    tags: ['#sellmyhome', '#homelisting', '#realestatetips'],
  },
];

const OUTPUTS = [
  'Video title',
  'Opening hook',
  'Timestamped script',
  'B-roll / shot list',
  'On-screen text',
  'Retention notes',
  'Call to action',
  'Description',
  'Tags',
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-evergreen/15 bg-evergreen/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-evergreen">
      {children}
    </span>
  );
}

function HeroMock() {
  return (
    <div className="relative rounded-2xl border border-line bg-white p-5 shadow-[0_24px_60px_-30px_rgba(12,46,39,0.5)]">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        <span className="text-[11px] font-medium text-clay">OpenHouseCast</span>
      </div>

      <div className="mt-4 flex gap-2">
        {['Market Update', 'Buyer Education', 'Seller Education'].map(
          (t, i) => (
            <span
              key={t}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                i === 0
                  ? 'bg-evergreen text-paper'
                  : 'bg-muted text-clay'
              }`}
            >
              {t}
            </span>
          ),
        )}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-paper px-3 py-2.5">
          <div className="space-y-1.5">
            <div className="h-2 w-32 rounded bg-line" />
            <div className="h-2 w-40 rounded bg-line" />
          </div>
          <CheckCircle2 className="size-4 text-amber" />
        </div>
        <div className="flex items-center justify-between rounded-lg bg-paper px-3 py-2.5">
          <div className="space-y-1.5">
            <div className="h-2 w-28 rounded bg-line" />
            <div className="h-2 w-36 rounded bg-line" />
          </div>
          <CheckCircle2 className="size-4 text-amber" />
        </div>
      </div>

      <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-amber py-2.5 text-sm font-semibold text-evergreen-deep">
        <Sparkles className="size-4" /> Generate script
      </button>

      {/* Output snippet */}
      <div className="mt-4 rounded-lg border border-line bg-muted/50 p-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wide text-evergreen">
            Opening hook · 0:00 – 0:10
          </span>
          <span className="rounded bg-white px-1.5 py-0.5 text-[10px] font-semibold text-clay">
            Copy
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-ink/80">
          If you\u2019ve been waiting to buy in Austin, the last 30 days have been
          good news for you…
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-evergreen/[0.04] to-transparent" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
            <div className="reveal">
              <Eyebrow>Built for real estate agents</Eyebrow>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-evergreen-deep sm:text-5xl lg:text-[3.4rem]">
                You know you should be posting. You&#39;re stuck writing the
                script.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-clay">
                OpenHouseCast turns your market data and local expertise into
                long-form YouTube scripts that buyers and sellers actually
                watch — with real-estate-specific structure, retention hooks,
                and Fair Housing-safe guardrails built into every output.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild variant="amber" size="lg" className="px-7 text-[15px] font-semibold">
                  <Link href="/generate">
                    Get started free <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-6 text-[15px]">
                  <Link href="#examples">
                    <Play className="size-4 text-evergreen" />
                    See example scripts
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-clay">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="size-4 text-amber" />
                  Free plan included
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-evergreen" />
                  No card required
                </span>
              </div>
            </div>
            <div className="reveal lg:pl-2" style={{ animationDelay: '120ms' }}>
              <HeroMock />
            </div>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="border-y border-line bg-white">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
              {[
                ['3', 'content lines'],
                ['9', 'deliverables per script'],
                ['10+', 'retention hooks'],
                ['100%', 'Fair Housing safe'],
              ].map(([n, label]) => (
                <div key={label}>
                  <div className="font-display text-3xl font-semibold text-evergreen">
                    {n}
                  </div>
                  <div className="mt-1 text-sm text-clay">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Why OpenHouseCast wins</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-evergreen-deep sm:text-4xl">
              A better script than any generic AI writer
            </h2>
            <p className="mt-4 text-lg text-clay">
              ChatGPT can write. It can&#39;t run your market, protect your
              license, or hold a viewer for 12 minutes. OpenHouseCast does.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-line bg-white p-7 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(12,46,39,0.4)]"
              >
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-evergreen/10 text-evergreen">
                  <b.icon className="size-6" strokeWidth={1.8} />
                </div>
                <span className="mt-5 inline-block text-xs font-semibold uppercase tracking-wider text-amber-dark">
                  {b.tag}
                </span>
                <h3 className="mt-1.5 text-lg font-semibold text-evergreen-deep">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-clay">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="scroll-mt-24 bg-evergreen-deep text-paper">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber">
                How it works
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                From idea to publish-ready script in minutes
              </h2>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <div key={s.n} className="relative">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-4xl font-semibold text-amber/80">
                      {s.n}
                    </span>
                    <span className="h-px flex-1 bg-white/15" />
                  </div>
                  <div className="mt-5 inline-flex size-10 items-center justify-center rounded-lg bg-amber/15 text-amber">
                    <s.icon className="size-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">
                    {s.body}
                  </p>
                  {i < 2 && (
                    <ArrowRight className="absolute -right-5 top-6 hidden size-5 text-amber/40 md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXAMPLES */}
        <section id="examples" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>Example scripts</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-evergreen-deep sm:text-4xl">
                The kind of opening that stops the scroll
              </h2>
            </div>
            <Button asChild variant="evergreen-ghost" className="font-medium">
              <Link href="/generate">
                Write your own <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {EXAMPLE_BLOCKS.map((e) => (
              <div
                key={e.title}
                className="flex flex-col rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(12,46,39,0.4)]"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-evergreen/10 px-3 py-1 text-xs font-semibold text-evergreen">
                  <FileText className="size-3.5" /> {e.kind}
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-evergreen-deep">
                  {e.title}
                </h3>
                <p className="mt-3 flex-1 text-sm italic leading-relaxed text-clay">
                  “{e.hook}”
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                  {e.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-muted px-2 py-0.5 text-xs text-clay"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-white p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-md">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-evergreen-deep">
                  <ListChecks className="size-5 text-amber" /> Every script ships
                  as a 9-part package
                </h3>
                <p className="mt-2 text-sm text-clay">
                  Stop re-formatting. Copy each piece straight into YouTube,
                  your editing tool, and your shoot day.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {OUTPUTS.map((o) => (
                  <span
                    key={o}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-paper px-3 py-1.5 text-xs font-medium text-evergreen-deep"
                  >
                    <CheckCircle2 className="size-3.5 text-amber" /> {o}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAIR HOUSING NOTE */}
        <section
          id="fair-housing"
          className="border-y border-line bg-white scroll-mt-24"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-center">
            <div className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber-dark">
              <Shield className="size-6" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-evergreen-deep">
                Compliance is not an afterthought
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-clay">
                OpenHouseCast generates scripts with the U.S. Fair Housing Act
                in mind. You won&#39;t get steering language or protected-class
                references — just professional, compliant content. You remain
                responsible for your local rules and final review.
              </p>
            </div>
          </div>
        </section>

        {/* CTA / pricing nudge */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-evergreen-deep px-6 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-amber/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-evergreen-soft/40 blur-3xl" />
            <div className="relative">
              <HomeIcon className="mx-auto size-10 text-amber" strokeWidth={1.6} />
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
                Your next great script is one prompt away
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-paper/70">
                Start free with 2 long-form scripts a month. Upgrade to Pro when
                you&#39;re ready to publish on a rhythm.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild variant="amber" size="lg" className="px-8 text-[15px] font-semibold">
                  <Link href="/generate">
                    Start free <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/25 bg-transparent text-paper hover:bg-white/10 hover:text-paper">
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}