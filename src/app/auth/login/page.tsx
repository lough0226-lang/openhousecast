import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Shield,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

export const metadata: Metadata = {
  title: 'Log in',
  description:
    'Log in to OpenHouseCast to build long-form YouTube scripts for your real estate market.',
};

const PERKS = [
  '15 long-form scripts/mo on Pro',
  'Market, Buyer & Seller content lines',
  'Fair Housing-safe guardrails included',
];

export default function LoginPage() {
  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-evergreen/[0.04] to-transparent" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-20">
          {/* LEFT — value panel */}
          <div className="hidden lg:block">
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-evergreen text-amber">
              <Home className="size-7" strokeWidth={1.8} />
            </div>
            <h1 className="mt-6 max-w-md font-display text-4xl font-semibold leading-[1.1] tracking-tight text-evergreen-deep">
              Welcome back to your long-form video workflow
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-clay">
              Log in to continue where you left off — every script you save is
              built solely for 5–15 minute YouTube videos.
            </p>
            <ul className="mt-8 space-y-3">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-ink/80">
                  <Shield className="size-4 shrink-0 text-amber-dark" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT — form card */}
          <div className="mx-auto w-full max-w-md">
            <div className="rounded-2xl border border-line bg-white p-8 shadow-[0_24px_60px_-30px_rgba(12,46,39,0.35)]">
              <h2 className="font-display text-2xl font-semibold text-evergreen-deep">
                Log in
              </h2>
              <p className="mt-1.5 text-sm text-clay">
                No account yet?{' '}
                <Link
                  href="/pricing"
                  className="font-semibold text-evergreen underline-offset-4 hover:underline"
                >
                  Start free
                </Link>
              </p>

              <form className="mt-7 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-evergreen-deep"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-clay" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-input bg-white py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-clay/60 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/20"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-evergreen-deep"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs font-medium text-evergreen hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-clay" />
                    <input
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-input bg-white py-2.5 pl-9 pr-10 text-sm text-ink placeholder:text-clay/60 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/20"
                    />
                    <button
                      type="button"
                      aria-label="Toggle password visibility"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-clay hover:text-evergreen"
                    >
                      <Eye className="size-4" />
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2 text-sm text-clay">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-input accent-evergreen"
                  />
                  Keep me signed in
                </label>

                <Button asChild variant="amber" size="lg" className="w-full font-semibold">
                  <Link href="/generate">
                    Log in <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </form>

              <p className="mt-5 flex items-center gap-2 text-center text-xs text-clay">
                <Sparkles className="size-3.5 shrink-0 text-amber-dark" />
                Sign-in & subscription billing arrive in a future update. This
                page is a UI preview.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}