import { useLanguage, Language } from '../contexts/LanguageContext';
import { useTheme, Theme } from '../contexts/ThemeContext';
import CategoryManagement from '../components/CategoryManagement';
import { Globe, Palette } from 'lucide-react';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: t('lang_en') },
    { value: 'de', label: t('lang_de') },
    { value: 'es', label: t('lang_es') },
    { value: 'sk', label: t('lang_sk') },
  ];

  const themes: { value: Theme; label: string }[] = [
    { value: 'default', label: t('theme_default') },
    { value: 'modern', label: t('theme_modern') },
    { value: 'dark', label: t('theme_dark') },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('settings')}</h2>
        <p className="text-gray-600">Customize your application preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('language_settings')}</h3>
            <p className="text-gray-600 text-sm">Choose your preferred language</p>
          </div>
        </div>

        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
            {t('language')}
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Palette className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t('theme_settings')}</h3>
            <p className="text-gray-600 text-sm">Select your visual theme</p>
          </div>
        </div>

        <div>
          <label htmlFor="theme" className="block text-sm font-medium text-gray-700 mb-2">
            {t('theme')}
          </label>
          <select
            id="theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value as Theme)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
          >
            {themes.map((themeOption) => (
              <option key={themeOption.value} value={themeOption.value}>
                {themeOption.label}
              </option>
            ))}
          </select>

          <div className="mt-6 grid grid-cols-3 gap-4">
            {themes.map((themeOption) => (
              <button
                key={themeOption.value}
                onClick={() => setTheme(themeOption.value)}
                className={`p-4 rounded-lg border-2 transition ${
                  theme === themeOption.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div
                  className={`h-16 rounded-lg mb-2 ${
                    themeOption.value === 'default'
                      ? 'bg-gradient-to-br from-blue-50 to-white'
                      : themeOption.value === 'modern'
                      ? 'bg-gradient-to-br from-gray-50 to-white'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900'
                  }`}
                />
                <p className="text-sm font-medium text-gray-900">{themeOption.label}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <CategoryManagement />
    </div>
  );
}
