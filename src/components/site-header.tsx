'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Features', href: '/#features' },
  { label: 'Examples', href: '/#examples' },
  { label: 'Pricing', href: '/pricing' },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 focus:outline-none"
      aria-label="OpenHouseCast home"
    >
      <span
        className={cn(
          'grid size-8 place-items-center rounded-lg transition-colors',
          light ? 'bg-amber text-evergreen-deep' : 'bg-evergreen text-amber',
        )}
      >
        <Home className="size-4.5" strokeWidth={2.1} />
      </span>
      <span
        className={cn(
          'text-[17px] font-semibold tracking-tight font-display',
          light ? 'text-paper' : 'text-evergreen-deep',
        )}
      >
        OpenHouse<span className="text-amber">Cast</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ light = false }: { light?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors',
        light
          ? 'border-white/10 bg-evergreen-deep/85'
          : 'border-line/70 bg-paper/85',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo light={light} />

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                light
                  ? 'text-paper/80 hover:text-paper hover:bg-white/10'
                  : 'text-clay hover:text-evergreen-deep hover:bg-evergreen/5',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" className="font-medium">
            <Link href="/auth/login">Log in</Link>
          </Button>
          <Button asChild variant="amber" size="lg" className="font-semibold">
            <Link href="/generate">Get started</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className={cn(
            'grid size-10 place-items-center rounded-md md:hidden',
            light
              ? 'text-paper hover:bg-white/10'
              : 'text-evergreen-deep hover:bg-evergreen/5',
          )}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            'border-t px-4 pb-4 pt-2 md:hidden',
            light ? 'border-white/10 bg-evergreen-deep' : 'border-line bg-paper',
          )}
        >
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'rounded-md px-3 py-2.5 text-sm font-medium',
                  light
                    ? 'text-paper/85 hover:bg-white/10'
                    : 'text-evergreen-deep hover:bg-evergreen/5',
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2">
              <Button asChild variant="ghost" onClick={() => setOpen(false)}>
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button asChild variant="amber" onClick={() => setOpen(false)}>
                <Link href="/generate">Get started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}