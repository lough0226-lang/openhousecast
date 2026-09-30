'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Zap, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { cn } from '@/lib/utils';

const FREE_FEATURES = [
  '2 long-form scripts per month',
  'Market Update content line',
  'Buyer Education content line',
  'Full script with timestamps',
  'Opening hook & CTA',
  '9-part output for generated scripts',
  'Fair Housing guardrails included',
];

const PRO_FEATURES = [
  '15 long-form scripts per month',
  'All 3 content lines (Market, Buyer, Seller)',
  'Complete 9-part package on every script',
  'B-roll / shot list for your shoot day',
  'Retention notes & on-screen text',
  'Paste MLS data → spoken market script',
  'Advanced hook library & tone controls',
  'Priority compliance screening',
  'Cancel anytime',
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-evergreen/15 bg-evergreen/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-evergreen">
            Pricing
          </span>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-evergreen-deep sm:text-5xl">
            Simple pricing, serious output
          </h1>
          <p className="mt-5 text-lg text-clay">
            Start free. Upgrade when you&#39;re ready to publish on a rhythm.
            No credit card required for Free.
          </p>

          <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-line bg-white p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                !annual ? 'bg-evergreen text-paper' : 'text-clay hover:text-evergreen-deep',
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                annual ? 'bg-evergreen text-paper' : 'text-clay hover:text-evergreen-deep',
              )}
            >
              Annual
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[11px] font-bold',
                  annual ? 'bg-amber text-evergreen-deep' : 'bg-muted text-clay',
                )}
              >
                Save 2 months
              </span>
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
          {/* FREE */}
          <div className="flex flex-col rounded-2xl border border-line bg-white p-8">
            <h2 className="text-lg font-semibold text-evergreen-deep">Free</h2>
            <p className="mt-1 text-sm text-clay">
              For agents testing the waters with video.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold text-evergreen-deep">
                $0
              </span>
              <span className="text-sm text-clay">/month · forever</span>
            </div>
            <Button asChild variant="outline" size="lg" className="mt-7 w-full font-semibold">
              <Link href="/generate">Start free</Link>
            </Button>
            <ul className="mt-8 space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-ink/80">
                  <Check className="mt-0.5 size-4 shrink-0 text-evergreen" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* PRO */}
          <div className="relative flex flex-col rounded-2xl border-2 border-evergreen bg-evergreen-deep p-8 text-paper shadow-[0_24px_60px_-30px_rgba(12,46,39,0.7)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wide text-evergreen-deep">
                <Zap className="size-3.5" /> Most popular
              </span>
            </div>
            <h2 className="text-lg font-semibold">Pro</h2>
            <p className="mt-1 text-sm text-paper/70">
              For agents building YouTube as a lead engine.
            </p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-display text-5xl font-semibold">
                {annual ? '$190' : '$19'}
              </span>
              <span className="text-sm text-paper/70">
                {annual ? '/year' : '/month'}
              </span>
            </div>
            {annual && (
              <p className="mt-1 text-sm font-medium text-amber">
                That&#39;s $15.83/mo — 2 months free vs. monthly.
              </p>
            )}
            <Button asChild variant="amber" size="lg" className="mt-7 w-full font-semibold">
              <Link href="/generate">
                Get started <ArrowRight className="size-4" />
              </Link>
            </Button>
            <ul className="mt-8 space-y-3">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-paper/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-amber" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm text-clay">
          <Shield className="mt-0.5 size-5 shrink-0 text-amber-dark" />
          <p>
            All plans include Fair Housing guardrails. Prices in USD and billed
            to your card on file. You can cancel or change plans at any time.
            Payment handling arrives in a future update.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}