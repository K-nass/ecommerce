"use client";

import { useRef, useCallback } from "react";
import { SearchInput } from "./SearchInput";
import { SearchAutocompleteDropdown } from "./SearchAutocompleteDropdown";
import { useSearchAutocomplete } from "../../hooks/useSearchAutocomplete";
import { cn } from "@/shared/utils/cn";

interface SearchAutocompleteProps {
  wrapperClassName?: string;
  inputClassName?: string;
  prefixText: string;
  highlightText: string;
}

export function SearchAutocomplete({
  wrapperClassName,
  inputClassName,
  prefixText,
  highlightText,
}: SearchAutocompleteProps) {
  const {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    open,
    close,
  } = useSearchAutocomplete();

  const blurTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBlur = useCallback(() => {
    blurTimeoutRef.current = setTimeout(() => {
      close();
    }, 200);
  }, [close]);

  const handleFocus = useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
      blurTimeoutRef.current = null;
    }
    if (results.length > 0) {
      open();
    }
  }, [results, open]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [setQuery],
  );

  return (
    <div className={cn("relative", wrapperClassName)}>
      <SearchInput
        value={query}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        prefixText={prefixText}
        highlightText={highlightText}
        inputClassName={inputClassName}
      />
      <SearchAutocompleteDropdown
        results={results}
        isLoading={isLoading}
        isOpen={isOpen}
        query={query}
        onClose={close}
      />
    </div>
  );
}
