import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Loader2, FileText, AlertCircle } from 'lucide-react';
import { ResearchResponse } from '../types/scrape';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default function Dashboard() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Supabase environment variables missing");
      }

      const apiUrl = `${SUPABASE_URL}/functions/v1/research`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const text = await response.text();
      console.log("API RESPONSE:", text);

      if (!text) {
        throw new Error("Empty response from API");
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        throw new Error(data.error || "Research failed");
      }

      setResult(data);
    } catch (err: any) {
      console.error("Research error:", err);
      setError(err.message || "Failed to complete research. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI Research Assistant</h2>
            <p className="text-gray-600">Ask a question and get a comprehensive research briefing</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-gray-700 mb-2">
              Research Question
            </label>
            <textarea
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., What are the latest trends in AI-powered web scraping?"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleResearch}
            disabled={isLoading || !query.trim()}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Researching...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Start Research
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900">Error</h4>
            <p className="text-red-700 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Research Briefing</h3>
            </div>
            <div className="prose max-w-none">
              <div className="bg-gray-50 rounded-lg p-6 mb-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Question:</p>
                <p className="text-gray-900 font-medium">{result.query}</p>
              </div>
              <div
                className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: result.briefing
                    .replace(/## (.*?)$/gm, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h2>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources ({result.sources.length})</h3>
            <ul className="space-y-3">
              {result.sources.map((source, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <span className="text-blue-600 font-bold flex-shrink-0">{index + 1}.</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 mb-1">{source.title}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm break-all"
                    >
                      {source.url}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
