import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'id' ? 'en' : 'id';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <button onClick={toggleLanguage} className="px-3 py-1 rounded bg-gray-200 text-gray-700 text-sm hover:bg-[#00B8BA] hover:text-white transition">
      {i18n.language === 'id' ? 'EN' : 'ID'}
    </button>
  );
};

export default LanguageToggle;