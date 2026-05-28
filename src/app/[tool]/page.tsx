'use client';

import dynamic from 'next/dynamic';

const TokenCounter = dynamic(() => import('@/tools/token-counter'), { ssr: false });
const ApiCostCalculator = dynamic(() => import('@/tools/api-cost-calculator'), { ssr: false });
const AiJsonRepairer = dynamic(() => import('@/tools/ai-json-repairer'), { ssr: false });
const SystemPromptGenerator = dynamic(() => import('@/tools/system-prompt-generator'), { ssr: false });
const TextChunker = dynamic(() => import('@/tools/text-chunker'), { ssr: false });

export function ToolClientWrapper({ slug }: { slug: string }) {
  switch (slug) {
    case 'token-counter': return <TokenCounter />;
    case 'api-cost-calculator': return <ApiCostCalculator />;
    case 'ai-json-repairer': return <AiJsonRepairer />;
    case 'system-prompt-generator': return <SystemPromptGenerator />;
    case 'text-chunker': return <TextChunker />;
    default: return null;
  }
}
