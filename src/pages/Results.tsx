import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockResults } from '../data/mockData';
import { ScrapeResult } from '../types/scrape';
import { Eye, X, Link as LinkIcon, Heading } from 'lucide-react';

export default function Results() {
  const { t } = useLanguage();
  const [selectedResult, setSelectedResult] = useState<ScrapeResult | null>(null);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{t('scraped_websites')}</h2>
          <p className="text-gray-600 mt-1">View all scraped website data</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('url')}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('title')}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('date_scraped')}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('summary')}</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <span className="text-blue-600 text-sm break-all">{result.url}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{result.title}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 text-sm">{result.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700 text-sm line-clamp-2">{result.summary}</span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedResult(result)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition"
                    >
                      <Eye className="w-4 h-4" />
                      {t('view')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{t('date_scraped')}</p>
                <p className="text-gray-900">{selectedResult.date}</p>
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
