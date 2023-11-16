import { useTranslation as useBaseTranslation } from "react-i18next";
import { LngNs } from "../utils/i18n";

export const useCustomTranslation = (namespaces: string[]) => {
  const { t, i18n } = useBaseTranslation([LngNs.common, ...namespaces]);
  return { t, i18n };
};
