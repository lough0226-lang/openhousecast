import Link from 'next/link';
import { Logo } from '@/components/site-header';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/#features' },
      { label: 'Examples', href: '/#examples' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Script generator',
    links: [
      { label: 'Market Update', href: '/generate' },
      { label: 'Buyer Education', href: '/generate' },
      { label: 'Seller Education', href: '/generate' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Fair Housing commitment', href: '/#fair-housing' },
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-evergreen-deep text-paper/75">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              AI long-form YouTube scripts built for real estate —
              real-estate-specific frameworks, retention hooks, shot lists,
              and Fair Housing-safe guardrails in every output. Exclusively for
              5–15 minute videos, never short clips.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-paper">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-paper/60 transition-colors hover:text-amber"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-paper/40">
          © {new Date().getFullYear()} OpenHouseCast. Built for today&apos;s real
          estate professionals. All examples are Fair Housing compliant.
        </div>
      </div>
    </footer>
  );
}