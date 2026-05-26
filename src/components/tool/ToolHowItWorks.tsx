import type { ReactNode } from "react";

export interface ToolHowItWorksProps {
  /** Paragraph content for the section. ~150 words target. */
  children: ReactNode;
}

export function ToolHowItWorks({ children }: ToolHowItWorksProps) {
  return (
    <section className="prose-tool mt-8" aria-labelledby="how-it-works-heading">
      <h2 id="how-it-works-heading">How it works</h2>
      {children}
    </section>
  );
}
