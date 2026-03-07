import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { mockResults, mockCategories } from '../data/mockData';
import { ScrapeResult } from '../types/scrape';
import { Eye, X, Link as LinkIcon, Heading, Search } from 'lucide-react';

export default function Results() {
  const { t } = useLanguage();
  const [selectedResult, setSelectedResult] = useState<ScrapeResult | null>(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchSummary, setSearchSummary] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredResults = mockResults.filter(result => {
    const matchTitle = result.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchSummary = result.summary.toLowerCase().includes(searchSummary.toLowerCase());
    const matchDate = searchDate === '' || result.date === searchDate;
    const matchCategory = selectedCategory === '' || result.category === selectedCategory;

    return matchTitle && matchSummary && matchDate && matchCategory;
  });

  const handleClearFilters = () => {
    setSearchTitle('');
    setSearchSummary('');
    setSearchDate('');
    setSelectedCategory('');
  };

  const hasActiveFilters = searchTitle || searchSummary || searchDate || selectedCategory;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{t('scraped_websites')}</h2>
          <p className="text-gray-600 mt-1">View all scraped website data</p>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('filter')}</h3>
            {hasActiveFilters && (
              <button
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {t('clear_filters')}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search_by_title')}
              </label>
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder={t('search_by_title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search_by_summary')}
              </label>
              <input
                type="text"
                value={searchSummary}
                onChange={(e) => setSearchSummary(e.target.value)}
                placeholder={t('search_by_summary')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('search_by_date')}
              </label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('category')}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="">{t('all_categories')}</option>
                {mockCategories.map(cat => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => {}}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            {t('search')}
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">{t('no_results')}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('url')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('title')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('category')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('date_scraped')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('summary')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{t('action')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredResults.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="text-blue-600 text-sm break-all">{result.url}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{result.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                        {result.category}
                      </span>
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
        )}
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
                  <p className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
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
