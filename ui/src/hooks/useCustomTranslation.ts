import { useTranslation as useBaseTranslation } from "react-i18next";

export const useCustomTranslation = (namespaces: string[]) => {
  const { t, i18n } = useBaseTranslation(namespaces);
  return { t, i18n };
};
