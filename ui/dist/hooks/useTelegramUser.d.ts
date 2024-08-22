import { SetterOrUpdater } from "recoil";
export type IWebAppData = {
    auth_date: string;
    hash: string;
    query_id: string;
    user: string;
};
export interface TelegramUserInfoDto {
    id: string;
    name: string;
    is_premium: boolean;
    ref: string;
    ref2: string;
    lastLoginAt: string;
    lastShareAt: string;
    lastBingoAt: string;
    bingoAt: string;
    createdAt: string;
    updatedAt: string;
    star: string;
    starStr: string;
    onceTask: string;
    evmWallet: `0x${string}`;
    tonWallet: string;
    index?: string;
}
export declare const RefreshState: import("recoil").RecoilState<number>;
export declare const TelegramUserInfoState: import("recoil").RecoilState<TelegramUserInfoDto | null>;
export declare const WebAppDataState: import("recoil").RecoilState<IWebAppData | undefined>;
export declare const TelegramUserIdEvmAddressKey = "TgUserIdEvmAddressKey";
export declare const useTelegramUser: () => IWebAppData | undefined;
export declare const useWebAppData: () => IWebAppData | undefined;
export declare const useTelegramAccountInit: (userInfo: TelegramUserInfoDto | null, _userInfo: SetterOrUpdater<TelegramUserInfoDto | null>, setIsModalOpen: SetterOrUpdater<boolean>) => TelegramUserInfoDto | null;
