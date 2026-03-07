import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockResults } from '../data/mockData';
import { ScrapeResult } from '../types/scrape';
import { Calendar, Globe, Eye, X, Link as LinkIcon, Heading } from 'lucide-react';

export default function History() {
  const { t } = useLanguage();
  const [selectedResult, setSelectedResult] = useState<ScrapeResult | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('previously_scraped')}</h2>
        <p className="text-gray-600">Browse through your scraping history</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockResults.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition duration-300"
          >
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{result.title}</h3>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-blue-600 break-all line-clamp-1">{result.url}</p>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  {result.date}
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    {result.category}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                {result.summary}
              </p>

              <button
                onClick={() => setSelectedResult(result)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {t('view_details')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">{selectedResult.title}</h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{t('url')}</p>
                <p className="text-blue-600 break-all">{selectedResult.url}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{t('date_scraped')}</p>
                  <p className="text-gray-900">{selectedResult.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{t('category')}</p>
                  <p className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    {selectedResult.category}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Heading className="w-5 h-5 text-gray-600" />
                  <p className="text-lg font-semibold text-gray-900">{t('headings')}</p>
                </div>
                <ul className="space-y-2 bg-gray-50 rounded-lg p-4">
                  {selectedResult.headings.map((heading, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span className="text-gray-700">{heading}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <LinkIcon className="w-5 h-5 text-gray-600" />
                  <p className="text-lg font-semibold text-gray-900">{t('links')}</p>
                </div>
                <ul className="space-y-2 bg-gray-50 rounded-lg p-4">
                  {selectedResult.links.map((link, index) => (
                    <li key={index}>
                      <span className="text-blue-600 hover:text-blue-700 break-all text-sm">{link}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900 mb-3">{t('ai_summary')}</p>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <p className="text-gray-700 leading-relaxed">{selectedResult.summary}</p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
              <button
                onClick={() => setSelectedResult(null)}
                className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition"
              >
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
