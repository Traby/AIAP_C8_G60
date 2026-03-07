import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Category } from '../types/scrape';
import { Plus, Trash2, CreditCard as Edit2, X } from 'lucide-react';
import { mockCategories } from '../data/mockData';

export default function CategoryManagement() {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName.trim()
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleEditCategory = (id: string, name: string) => {
    setEditingId(id);
    setEditingName(name);
  };

  const handleSaveEdit = (id: string) => {
    if (editingName.trim()) {
      setCategories(categories.map(cat =>
        cat.id === id ? { ...cat, name: editingName.trim() } : cat
      ));
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Plus className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{t('category_management')}</h3>
          <p className="text-gray-600 text-sm">{t('manage_categories')}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
            placeholder={t('enter_category_name')}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
          />
          <button
            onClick={handleAddCategory}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            {t('add_category')}
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="space-y-2">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">{t('no_categories')}</p>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition"
                >
                  {editingId === category.id ? (
                    <div className="flex-1 flex gap-2 items-center">
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(category.id)}
                        className="px-3 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition text-sm"
                      >
                        {t('save')}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-2 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition text-sm"
                      >
                        {t('cancel')}
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditCategory(category.id, category.name)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}