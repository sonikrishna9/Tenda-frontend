'use client';

import { useRouter } from 'next/navigation';
import AnimatedPartnerButton from './AnimatedPartnerButton';

export default function PartnerQuickActions() {
  const router = useRouter();

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 hidden md:flex">
      <AnimatedPartnerButton
        onDealerClick={() => router.push('/partner-program/dealer')}
        onSiPartnerClick={() => router.push('/partner-program/sipartner')}
      />
    </div>
  );
}
