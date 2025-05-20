'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
  initialValue?: string;
}

export default function SearchBar({
  placeholder = "Search IEEE Xplore...",
  buttonLabel = "Search",
  className,
  initialValue = "",
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length === 0) return;
    // Redirect to /search with query as URL param
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-2 shadow-sm transition-colors w-full",
        className
      )}
      role="search"
      aria-label="AI-powered search"
    >
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none border-none text-lg md:text-xl text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 px-2"
        aria-label="Enter your search query"
        autoFocus
      />
      <button
        type="submit"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg px-5 py-2 transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label={buttonLabel}
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5"/>
        </svg>
        {buttonLabel}
      </button>
    </form>
  );
}
