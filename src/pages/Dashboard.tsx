import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Globe, Loader2, Link as LinkIcon, Heading } from 'lucide-react';
import { ScrapeResult } from '../types/scrape';
import { mockResults } from '../data/mockData';

export default function Dashboard() {
  const { t } = useLanguage();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScrapeResult | null>(null);

  const handleScrape = async () => {
    if (!url) return;

    setIsLoading(true);
    setResult(null);

    await new Promise(resolve => setTimeout(resolve, 2000));

    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setResult({
      ...randomResult,
      url: url,
      date: new Date().toISOString().split('T')[0]
    });

    setIsLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t('website_content_scraper')}</h2>
            <p className="text-gray-600">{t('scrape_websites')}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              {t('enter_url')}
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('url_placeholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleScrape}
            disabled={isLoading || !url}
            className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('scraping')}
              </>
            ) : (
              t('scrape_button')
            )}
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('website_title')}</h3>
            <p className="text-xl font-bold text-blue-600">{result.title}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Heading className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('headings')}</h3>
            </div>
            <ul className="space-y-2">
              {result.headings.map((heading, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-700">{heading}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <LinkIcon className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">{t('links')}</h3>
            </div>
            <ul className="space-y-2">
              {result.links.map((link, index) => (
                <li key={index}>
                  <span className="text-blue-600 hover:text-blue-700 break-all">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('ai_summary')}</h3>
            <p className="text-gray-700 leading-relaxed">{result.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}
