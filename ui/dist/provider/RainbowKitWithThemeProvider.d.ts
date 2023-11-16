import "../utils/i18n";
import "../../node_modules/@my/rainbowkit/dist/index.css";
import { FC, ReactNode } from "react";
type IProps = {
    env: string;
    children: ReactNode;
};
declare const RainbowKitWithThemeProvider: FC<IProps>;
export default RainbowKitWithThemeProvider;
