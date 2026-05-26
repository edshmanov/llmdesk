import type { ReactNode } from "react";

export interface ToolUseCasesProps {
  /** Paragraph content for the section. ~150 words target. */
  children: ReactNode;
}

export function ToolUseCases({ children }: ToolUseCasesProps) {
  return (
    <section className="prose-tool" aria-labelledby="use-cases-heading">
      <h2 id="use-cases-heading">Use cases</h2>
      {children}
    </section>
  );
}
