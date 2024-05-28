import { ChainId } from "../constant/constant";
export declare const useGetHero: () => {
    getHero: ({ address, linkType }: {
        address: string;
        linkType: number;
    }) => Promise<any>;
};
export declare const useGetUserInfo: () => {
    getUserInfo: ({ account, chainId }: {
        account: string;
        chainId: ChainId;
    }) => Promise<{
        invitationCode: string;
        signedStr: string;
        avatar: any;
        id: string;
        nickname: any;
        twitter: {
            avatar: any;
            nickname: any;
            followerCount: string;
            isLoading: boolean;
        };
    } | undefined>;
};
