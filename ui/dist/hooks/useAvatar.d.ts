export declare const avatarState: import("recoil").RecoilState<Record<string, {
    selectedAvatar: string;
    selectedBackground: string;
}>>;
export declare const useAvatar: (account?: string, hideAvatars?: boolean) => {
    avatars: {
        selectedAvatar: string;
        selectedBackground: string;
    };
    aa_mm_address: string | undefined;
    account: string | undefined;
};
