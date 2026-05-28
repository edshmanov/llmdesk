'use client';

import dynamic from 'next/dynamic';

const TokenCounter = dynamic(() => import('@/tools/token-counter'), { ssr: false });
const ApiCostCalculator = dynamic(() => import('@/tools/api-cost-calculator'), { ssr: false });
const AiJsonRepairer = dynamic(() => import('@/tools/ai-json-repairer'), { ssr: false });
const SystemPromptGenerator = dynamic(() => import('@/tools/system-prompt-generator'), { ssr: false });
const TextChunker = dynamic(() => import('@/tools/text-chunker'), { ssr: false });
const MarkdownToPlainText = dynamic(() => import('@/tools/markdown-to-plain-text'), { ssr: false });
const EmojiStripper = dynamic(() => import('@/tools/emoji-stripper'), { ssr: false });
const AiTellPhraseRemover = dynamic(() => import('@/tools/ai-tell-phrase-remover'), { ssr: false });
const SmartQuoteCleaner = dynamic(() => import('@/tools/smart-quote-cleaner'), { ssr: false });
const BulletToProseConverter = dynamic(() => import('@/tools/bullet-to-prose-converter'), { ssr: false });

export function ToolClientWrapper({ slug }: { slug: string }) {
  switch (slug) {
    case 'token-counter': return <TokenCounter />;
    case 'api-cost-calculator': return <ApiCostCalculator />;
    case 'ai-json-repairer': return <AiJsonRepairer />;
    case 'system-prompt-generator': return <SystemPromptGenerator />;
    case 'text-chunker': return <TextChunker />;
    case 'markdown-to-plain-text': return <MarkdownToPlainText />;
    case 'emoji-stripper': return <EmojiStripper />;
    case 'ai-tell-phrase-remover': return <AiTellPhraseRemover />;
    case 'smart-quote-cleaner': return <SmartQuoteCleaner />;
    case 'bullet-to-prose-converter': return <BulletToProseConverter />;
    default: return null;
  }
}
