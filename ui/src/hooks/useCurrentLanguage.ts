import i18n from "i18next";
import { useEffect, useState } from "react";
import { useCustomTranslation } from "./useCustomTranslation";
import { LngNs } from "../utils/i18n";

export const useCurrentLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { t } = useCustomTranslation([LngNs.common]);
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [t("language")]);
  return currentLanguage;
};
