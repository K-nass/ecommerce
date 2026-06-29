"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface CategoryMobileLayoutProps {
  sidebar: ReactNode;
  /** Pinned above the scrollable content — never scrolls away (e.g. filter bar). */
  topBar?: ReactNode;
  content: ReactNode;
}

/**
 * Mobile-only dual-panel layout with independent scrolling.
 *
 * On mount (mobile only):
 *  1. Measures the sticky mobile header's actual rendered height.
 *  2. Locks document.body overflow so the PAGE itself never scrolls.
 *  3. Sizes this container to fill exactly the remaining viewport space
 *     between the header and the fixed bottom-nav (56 px).
 *
 * Layout of the right panel:
 *   ┌─────────────────────────────┐
 *   │  topBar  (shrink-0, fixed)  │
 *   ├─────────────────────────────┤
 *   │  content (flex-1, scrolls)  │
 *   └─────────────────────────────┘
 *
 * On desktop (>991 px) this component renders nothing; the caller owns
 * the desktop layout.
 */
export function CategoryMobileLayout({
  sidebar,
  topBar,
  content,
}: CategoryMobileLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth > 991) return;

    const BOTTOM_NAV_H = 56; // px — MobileBottomNav fixed height

    const el = containerRef.current;
    if (!el) return;

    /**
     * Use the container's own top offset instead of querying the header.
     * This is always accurate: it's the exact distance from the viewport
     * top to where our panel begins, regardless of how many headers are
     * in the DOM or whether any are CSS-hidden.
     */
    const top = el.getBoundingClientRect().top;
    el.style.height = `calc(100dvh - ${top}px - ${BOTTOM_NAV_H}px)`;

    /** Lock body + html so the page itself does NOT scroll. */
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden max-[991px]:flex overflow-hidden -mx-4"
      /* JS corrects this immediately on mount via getBoundingClientRect */
      style={{ height: "100dvh" }}
    >
      {/* Sidebar panel — independent scroll */}
      <div className="shrink-0 w-[85px] bg-[#f4f5f7] overflow-y-auto overflow-x-hidden">
        {sidebar}
      </div>

      {/* Right panel: sticky topBar + scrollable content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Filter bar — never scrolls away */}
        {topBar && (
          <div className="shrink-0">
            {topBar}
          </div>
        )}
        {/* Products — independent scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-32">
          {content}
        </div>
      </div>
    </div>
  );
}
