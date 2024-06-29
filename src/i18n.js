import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "locales/de-DE/de-DE.json";
import en from "locales/en/en.json";
import es from "locales/es-ES/es-ES.json";
import fr from "locales/fr-FR/fr-FR.json";
import it from "locales/it/it.json";
import ja from "locales/ja/ja.json";
import pt_b from "locales/pt-BR/pt-BR.json";
import pt_p from "locales/pt-PT/pt-PT.json";
import zh from "locales/zh-CN/zh-CN.json";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  debug: !0,
  lng: "en",
  resources: {
    "de-DE": { translation: de },
    en: { translation: en },
    "es-ES": { translation: es },
    "fr-FR": { translation: fr },
    it: { translation: it },
    ja: { translation: ja },
    "pt-BR": { translation: pt_b },
    "pt-PT": { translation: pt_p },
    "zh-CN": { translation: zh },
  },
});
export default i18n;
