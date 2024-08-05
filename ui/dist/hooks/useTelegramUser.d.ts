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
}
export declare const TelegramUserInfoState: import("recoil").RecoilState<TelegramUserInfoDto | null>;
export declare const TelegramUserIdEvmAddressKey = "TgUserIdEvmAddressKey";
export declare const useTelegramUser: () => void;
