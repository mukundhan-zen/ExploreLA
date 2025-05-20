import { notFound } from "next/navigation";
import { searchAI } from "@/actions/searchActions";
import { Suspense } from "react";
import Image from "next/image";

type Paper = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  link: string;
  year: number;
  journal?: string;
};

type Org = {
  id: string;
  name: string;
  country?: string;
  link?: string;
};

type Trend = {
  keyword: string;
  popularity: number;
};

type SearchResults = {
  summary: string;
  papers: Paper[];
  organizations: Org[];
  trends: Trend[];
};

export default async function SearchResultsPage({ query }: { query: string }) {
  if (!query || query.trim().length === 0) {
    return (
      <div className="mt-20 text-center text-gray-500 dark:text-gray-400 text-lg">
        Enter a research topic or question above to begin your AI-powered search.
      </div>
    );
  }

  let results: SearchResults | null = null;
  let error: string | null = null;

  try {
    results = await searchAI(query);
  } catch (e: any) {
    error = e?.message || "Failed to fetch results.";
  }

  if (error) {
    return (
      <div className="mt-20 text-center text-red-500 dark:text-red-400 text-lg">
        {error}
      </div>
    );
  }

  if (!results || (!results.papers?.length && !results.organizations?.length && !results.trends?.length)) {
    return (
      <div className="mt-20 text-center text-gray-500 dark:text-gray-400 text-lg">
        No results found for <span className="font-semibold">{query}</span>.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {/* AI Summary */}
      {results.summary && (
        <div className="bg-white dark:bg-gray-900 border border-indigo-100 dark:border-indigo-900 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-indigo-700 dark:text-indigo-200">
            AI Summary
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-base md:text-lg">{results.summary}</p>
        </div>
      )}

      {/* Research Papers */}
      {results.papers?.length > 0 && (
        <section>
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Relevant Papers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.papers.map(paper => (
              <a
                key={paper.id}
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white dark:bg-gray-950 border border-indigo-100 dark:border-indigo-900 rounded-lg p-5 transition-transform hover:scale-[1.025] shadow-md hover:shadow-xl group"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="h-10 w-10 flex-shrink-0 rounded bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-indigo-600 dark:text-indigo-300">
                      <path d="M6 4h12v16H6z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                      <path d="M10 8h4M10 12h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-md font-bold text-indigo-800 dark:text-indigo-200 group-hover:underline">
                      {paper.title}
                    </h4>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {paper.authors?.join(", ")} {paper.year && <>· {paper.year}</>}
                      {paper.journal && <> · <span className="italic">{paper.journal}</span></>}
                    </div>
                  </div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4 mb-2">{paper.abstract}</div>
                <div className="text-indigo-700 dark:text-indigo-300 text-xs font-medium mt-2">View on IEEE Xplore →</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Organizations */}
      {results.organizations?.length > 0 && (
        <section>
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Notable Organizations
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.organizations.map(org => (
              <li key={org.id} className="flex items-center gap-4 bg-white dark:bg-gray-950 border border-indigo-100 dark:border-indigo-900 rounded-lg p-4 shadow-sm">
                <div className="h-9 w-9 flex-shrink-0 rounded-full bg-indigo-200 dark:bg-indigo-800 flex items-center justify-center">
                  <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="text-indigo-800 dark:text-indigo-200">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-indigo-800 dark:text-indigo-300">{org.name}</div>
                  {org.country && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">{org.country}</div>
                  )}
                  {org.link && (
                    <a
                      href={org.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 dark:text-indigo-300 underline"
                    >
                      Website
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Trends */}
      {results.trends?.length > 0 && (
        <section>
          <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-3">
            {results.trends
              .sort((a, b) => b.popularity - a.popularity)
              .map(trend => (
                <span
                  key={trend.keyword}
                  className="inline-flex items-center gap-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-indigo-200 font-medium rounded-full px-4 py-1 text-sm shadow-sm"
                >
                  <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  {trend.keyword}
                  <span className="ml-1 text-xs text-gray-500 dark:text-gray-300">({trend.popularity})</span>
                </span>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
