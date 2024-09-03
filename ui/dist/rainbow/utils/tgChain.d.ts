import { Chain } from "wagmi";
import { IWebAppData } from "../../hooks/useTelegramUser";
import { SetterOrUpdater } from "recoil";
import { IAAWallet } from "../../hooks/aaWallet/aaWalletAtoms";
export declare const tgChain: ({ WebAppData, publicClient, chains, setAaWallet, }: {
    WebAppData?: IWebAppData | undefined;
    publicClient: any;
    chains: Chain[];
    setAaWallet: SetterOrUpdater<IAAWallet>;
}) => any;
