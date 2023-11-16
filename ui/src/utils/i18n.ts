import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import language from "./language";
import { languageList } from "../components/SideBar/component/Language";
const _lng = language.split("-").join("_");
export const lng = languageList.map((v) => v.keyValue).filter((v) => v === _lng)
  .length
  ? _lng
  : "en_US";

export const LngNs = {
  common: "common",
  defense: "defense",
  points: "points",
  siderBar: "siderBar",
  home: "home",
  zBingo: "zBingo",
  invitation: "invitation",
  profile: "profile",
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: "en_US",
    backend: {
      loadPath: "https://static.zypher.game/i18n/{{lng}}/{{ns}}.json",
    },
    lng,
    ns: Object.values(LngNs),
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });