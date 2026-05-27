'use client';

import dynamic from 'next/dynamic';

const TokenCounter = dynamic(() => import('@/tools/token-counter'), { ssr: false });
const ApiCostCalculator = dynamic(() => import('@/tools/api-cost-calculator'), { ssr: false });

export function ToolClientWrapper({ slug }: { slug: string }) {
  switch (slug) {
    case 'token-counter':
      return <TokenCounter />;
    case 'api-cost-calculator':
      return <ApiCostCalculator />;
    default:
      return null;
  }
}
