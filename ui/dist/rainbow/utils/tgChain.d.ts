import { Chain } from "wagmi";
import { IWebAppData } from "../../hooks/useTelegramUser";
export declare const tgChain: ({ WebAppData, publicClient, chains, }: {
    WebAppData?: IWebAppData | undefined;
    publicClient: any;
    chains: Chain[];
}) => any;
