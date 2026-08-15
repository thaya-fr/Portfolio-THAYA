// Signal Noir reminder: THAYA. uses a restrained orange/cyan glitch signal; keep the effect limited to the wordmark.
import type { CSSProperties } from "react";
import "./GlitchText.css";

type GlitchTextProps = { children: string; className?: string; style?: CSSProperties };

export default function GlitchText({ children, className = "", style }: GlitchTextProps) {
  return (
    <span className={`glitch-text ${className}`.trim()} data-text={children} style={style} aria-label={children}>
      <span className="glitch-text-visible" aria-hidden="true">{children}</span>
    </span>
  );
}
