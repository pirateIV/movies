import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useLocalStorage from "hooks/useLocalStorage";

export const languages = [
  { value: "de-DE", name: "Deutsch" },
  { value: "en", name: "English" },
  { value: "es-ES", name: "Español" },
  { value: "fr-FR", name: "Français" },
  { value: "it", name: "Italiano" },
  { value: "ja", name: "日本語" },
  { value: "pt-BR", name: "Português (Brasil)" },
  { value: "pt-PT", name: "Português (Portugal)" },
  { value: "zh", name: "中文" },
];

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useLocalStorage("i18nextLng", "en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const changeLanguage = (lng) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <label
        htmlFor="langSwitcher"
        className="text-sm sm:text-base text-gray-200"
      >
        {t("Language")}:&nbsp;
      </label>
      <select
        id="langSwitcher"
        className="p-1 text-sm rounded"
        defaultValue={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
