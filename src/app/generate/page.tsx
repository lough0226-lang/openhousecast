import { redirect } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { GenerateClient } from './generate-client';
import { auth } from '@/lib/auth';

export default async function GeneratePage() {
  const session = await auth();

  // Protect the generator: send unauthenticated visitors to the custom
  // sign-in page, preserving where they were headed.
  if (!session?.user) {
    redirect('/auth/login?callbackUrl=%2Fgenerate');
  }

  return (
    <>
      <SiteHeader />
      <GenerateClient />
      <SiteFooter />
    </>
  );
}
