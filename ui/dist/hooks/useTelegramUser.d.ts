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
    last256At: string;
    createdAt: string;
    updatedAt: string;
    star: string;
    onceTask: string;
    evmWallet: `0x${string}`;
    tonWallet: string;
    index?: string;
}
export declare const TelegramUserInfoState: import("recoil").RecoilState<TelegramUserInfoDto | null>;
export declare const WebAppDataState: import("recoil").RecoilState<IWebAppData | undefined>;
export declare const TelegramUserIdEvmAddressKey = "TgUserIdEvmAddressKey";
export declare const useTelegramUser: () => void;
export declare const useWebAppData: () => IWebAppData | undefined;
export declare const useTelegramAccountInit: (userInfo: TelegramUserInfoDto | null, _userInfo: SetterOrUpdater<TelegramUserInfoDto | null>) => TelegramUserInfoDto | null;
