import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/ui/search-bar";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 via-white to-sky-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Hero Section */}
      <section className="w-full max-w-3xl mt-20 md:mt-32 flex flex-col items-center text-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full px-4 py-1 bg-gradient-to-r from-blue-100 via-indigo-100 to-sky-200 dark:from-blue-900 dark:to-sky-900 text-xs font-semibold text-blue-700 dark:text-sky-100 tracking-wide mb-3 shadow-sm">
            New: AI-Enhanced IEEE Xplore Search
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-lg">
            Discover Research with <span className="text-indigo-600 dark:text-indigo-400">AI-Powered Search</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 mb-2 max-w-xl">
            Instantly surface the most relevant IEEE Xplore publications, trends, and organizations using natural language queries.
          </p>
        </div>

        <div className="w-full mt-8">
          <SearchBar
            placeholder="E.g. Recent advances in quantum computing, top AI conferences..."
            buttonLabel="Search"
            className="shadow-xl"
          />
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition-all shadow-md text-base md:text-lg"
          >
            <span>Try the AI Search Now</span>
            <svg width="22" height="22" fill="none" viewBox="0 0 22 22" className="inline-block">
              <path d="M6 11h10m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Powered by advanced AI, built for researchers and innovators.
          </span>
        </div>
      </section>

      {/* Visual Illustration */}
      <section className="w-full flex justify-center mt-16 md:mt-24">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-indigo-100 dark:border-indigo-900 max-w-xl">
          <Image
            src="https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load"
            alt="AI-powered research illustration"
            width={1200}
            height={800}
            unoptimized
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      </section>
    </main>
  );
}
