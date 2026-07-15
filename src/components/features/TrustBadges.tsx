'use client';

import { Truck, ShieldCheck, CreditCard, HeadphonesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function TrustBadges() {
  const t = useTranslations('trustBadges');
  
  const badges = [
    { icon: Truck, label: t('fastDelivery') },
    { icon: ShieldCheck, label: t('premiumQuality') },
    { icon: CreditCard, label: t('securePayment') },
    { icon: HeadphonesIcon, label: t('support') },
  ];

  return (
    <section className="w-full py-6 px-4 sm:px-6 lg:px-8 border-b border-[var(--color-divider)] bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, i) => (
          <div key={i} className="flex flex-col items-center justify-center gap-2 p-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center text-[var(--color-primary)] shadow-sm">
              <badge.icon size={24} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-semibold text-[var(--color-text-secondary)]">{badge.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
