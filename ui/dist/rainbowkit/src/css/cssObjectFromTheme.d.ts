import { ThemeVars } from "./sprinkles.css";
export declare function cssObjectFromTheme(theme: ThemeVars | (() => ThemeVars), { extends: baseTheme }?: {
    extends?: ThemeVars | (() => ThemeVars);
}): {
    [k: string]: string;
};
