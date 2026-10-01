'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { Mail, ArrowRight, Loader2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoginForm() {
  const params = useSearchParams();
  const callbackUrl = params.get('callbackUrl') || '/generate';
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validEmail) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      // Nodemailer email provider; if SMTP is not configured the API returns
      // an error and we surface it rather than pretending it worked.
      const res = await signIn('nodemailer', {
        email,
        callbackUrl,
        redirect: false,
      });
      if (res?.error) {
        toast.error(
          'Email sign-in is not configured on this deployment yet — use Google.',
        );
      } else {
        toast.success('Check your inbox for the sign-in link.');
      }
    } catch {
      toast.error('Could not start email sign-in. Please try Google.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full border-evergreen/20 bg-white font-semibold text-evergreen-deep hover:bg-evergreen/5"
        disabled={googleLoading}
        onClick={() => {
          setGoogleLoading(true);
          signIn('google', { callbackUrl });
        }}
      >
        {googleLoading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <GoogleIcon className="size-4" />
        )}
        Continue with Google
      </Button>

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs font-medium uppercase tracking-wider text-clay">
          or
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <form onSubmit={handleMagicLink} className="space-y-3">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-input bg-white py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-clay/60 focus:border-evergreen focus:outline-none focus:ring-2 focus:ring-evergreen/20"
            />
          </div>
        </div>
        <Button
          type="submit"
          variant="amber"
          size="lg"
          className="w-full font-semibold"
          disabled={submitting || !validEmail}
        >
          {submitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Email me a sign-in link
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </form>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-clay">
        <Shield className="mt-0.5 size-3.5 shrink-0 text-amber-dark" />
        By continuing you agree to our Terms and Privacy Policy. We never use
        content that references protected classes under the Fair Housing Act.
      </p>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.18 3.57-8.87Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.08 7.95-2.91l-3.88-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29A7.2 7.2 0 0 1 4.89 12c0-.8.14-1.57.38-2.29V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0A11.99 11.99 0 0 0 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}
