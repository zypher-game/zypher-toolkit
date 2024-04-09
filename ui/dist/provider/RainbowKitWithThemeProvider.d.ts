import "../utils/i18n";
import "../../node_modules/@my/rainbowkit/dist/index.css";
import { FC, ReactNode } from "react";
import { ChainId } from "../constant/constant";
import { HeaderUIType } from "../components/Header/header";
type IProps = {
    env: string;
    children: ReactNode;
    chainIdList?: ChainId[];
    type: HeaderUIType;
};
declare const RainbowKitWithThemeProvider: FC<IProps>;
export default RainbowKitWithThemeProvider;
