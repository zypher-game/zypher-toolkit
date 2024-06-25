import "../utils/i18n";
import { FC, ReactNode } from "react";
import { ChainId } from "../constant/constant";
import { HeaderUIType } from "../components/Header/header";
type IProps = {
    env: string;
    children: ReactNode;
    chainIdList?: Array<ChainId>;
    type: HeaderUIType;
};
declare const RainbowKitWithThemeProvider: FC<IProps>;
export default RainbowKitWithThemeProvider;
