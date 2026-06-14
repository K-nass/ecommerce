"use client";

import { useState } from "react";

interface ExpandableListProps {
  items: string[];
  seeMoreText: string;
  seeLessText: string;
}

export default function ExpandableList({
  items,
  seeMoreText,
  seeLessText,
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(false);
  const maxVisible = 6;
  const hasMore = items.length > maxVisible;
  const visibleItems = expanded ? items : items.slice(0, maxVisible);
  const remaining = items.length - maxVisible;

  return (
    <>
      {visibleItems.map((value) => (
        <label
          key={value}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input type="checkbox" className="accent-primary" />
          {value}
        </label>
      ))}
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary font-medium hover:underline mt-1"
        >
          {expanded ? seeLessText : `${seeMoreText} (+${remaining})`}
        </button>
      )}
    </>
  );
}
