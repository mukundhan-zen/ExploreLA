import { Suspense } from "react";
import SearchResultsPage from "@/components/ui/search-results-page";

export const metadata = {
  title: "AI Search Results – IEEE Xplore",
  description: "Unified AI-powered search results for IEEE Xplore publications, organizations, and trends."
};

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = typeof searchParams.q === "string" ? searchParams.q : "";

  return (
    <main className="min-h-screen py-8 px-2 md:px-8 bg-gradient-to-b from-white via-indigo-50 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Search Results
        </h1>
        <Suspense fallback={<div className="mt-12 text-center text-gray-500 dark:text-gray-400">Loading results...</div>}>
          <SearchResultsPage query={query} />
        </Suspense>
      </div>
    </main>
  );
}
