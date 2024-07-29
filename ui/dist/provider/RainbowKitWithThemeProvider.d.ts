import "../utils/i18n";
import { FC, ReactNode } from "react";
import { ChainId } from "../constant/constant";
type IProps = {
    env: string;
    children: ReactNode;
    chainIdList?: Array<ChainId>;
};
declare const RainbowKitWithThemeProvider: FC<IProps>;
export default RainbowKitWithThemeProvider;
