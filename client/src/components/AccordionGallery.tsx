import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "gsap";
import "./AccordionGallery.css";

type GalleryItem = {
  image: string;
  label: string;
  description?: string;
  alt?: string;
};

type AccordionGalleryProps = {
  items: GalleryItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  duration?: number;
  trigger?: "hover" | "click";
};

export default function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#ff6f37",
  overlayColor = "#120b07",
  textColor = "#fffaf4",
  height = 430,
  gap = 10,
  radius = 3,
  expandRatio = 0.48,
  duration = 0.62,
  trigger = "hover",
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(Math.min(Math.max(defaultIndex, 0), Math.max(items.length - 1, 0)));
  const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const applyLayout = useCallback((animate = true) => {
    const panels = panelRefs.current;
    if (!panels.length) return;
    const ratio = Math.min(Math.max(expandRatio, 0.2), 0.82);
    const grow = items.length > 1 ? (ratio * (items.length - 1)) / (1 - ratio) : 1;
    timelineRef.current?.kill();
    const timeline = gsap.timeline();
    const durationValue = animate && !reduceMotion ? duration : 0;

    panels.forEach((panel, index) => {
      if (!panel) return;
      const isActive = active !== null && index === active;
      const media = mediaRefs.current[index];
      const label = labelRefs.current[index];
      const tilt = active === null ? 0 : isActive ? 0 : index < active ? 3 : -3;
      timeline.to(panel, { flexGrow: isActive ? grow : 1, rotateY: tilt, duration: durationValue, ease: "power3.out" }, 0);
      if (media) timeline.to(media, { scale: isActive ? 1.03 : 1.12, xPercent: isActive || active === null ? -50 : index < active ? -56 : -44, filter: isActive ? "grayscale(0)" : "grayscale(.3)", duration: durationValue, ease: "power3.out" }, 0);
      if (label) timeline.to(label, { opacity: isActive ? 1 : 0, y: isActive ? 0 : 8, duration: durationValue, ease: "power3.inOut" }, 0);
    });
    timelineRef.current = timeline;
  }, [active, duration, expandRatio, items.length, reduceMotion]);

  useEffect(() => {
    const resize = () => applyLayout(false);
    applyLayout(false);
    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); timelineRef.current?.kill(); if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current); };
  }, [applyLayout]);

  const selectPanel = (index: number) => {
    if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current);
    setActive(index);
  };

  const scheduleReset = () => {
    if (leaveTimerRef.current) window.clearTimeout(leaveTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => setActive(null), 120);
  };

  return (
    <div
      ref={rootRef}
      className="accordion-gallery"
      style={{ "--ag-accent": accentColor, "--ag-overlay": overlayColor, "--ag-text": textColor, "--ag-gap": `${gap}px`, "--ag-radius": `${radius}px`, height: `${height}px` } as CSSProperties}
      role="list"
      aria-label="Certifications gallery"
      onMouseLeave={scheduleReset}
    >
      {items.map((item, index) => {
        const isActive = active === index;
        return (
          <div
            key={item.label}
            ref={(element) => { panelRefs.current[index] = element; }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            role="listitem"
            tabIndex={0}
            aria-label={item.label}
            onMouseEnter={() => trigger === "hover" && selectPanel(index)}
            onMouseLeave={scheduleReset}
            onFocus={() => selectPanel(index)}
            onClick={() => selectPanel(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); selectPanel((index + 1) % items.length); }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); selectPanel((index - 1 + items.length) % items.length); }
            }}
          >
            <div className="ag-panel__frame">
              <div className="ag-panel__media" ref={(element) => { mediaRefs.current[index] = element; }}>
                <img src={item.image} alt={item.alt || item.label} draggable={false} />
              </div>
              <div className="ag-panel__overlay" aria-hidden="true" />
            </div>
            <div className="ag-panel__label" ref={(element) => { labelRefs.current[index] = element; }}>
              <span className="ag-panel__bar" />
              <div>
                <strong>{item.label}</strong>
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
            <span className="ag-panel__index">0{index + 1}</span>
          </div>
        );
      })}
    </div>
  );
}
