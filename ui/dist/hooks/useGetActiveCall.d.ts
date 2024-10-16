import { ChainId } from "../constant/constant";
export declare const useGetHero: () => {
    getHero: ({ address, chainId, linkType, }: {
        address: string;
        chainId: ChainId;
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
        isTwitterPost: any;
        twitter: {
            avatar: any;
            nickname: any;
            followerCount: string;
            isLoading: boolean;
        };
        discord: {
            avatar: any;
            nickname: any;
            followerCount: string;
            isLoading: boolean;
        };
    } | {
        invitationCode: string;
        signedStr: string;
        avatar: string;
        id: string;
        nickname: string;
        twitter: {
            avatar: string;
            nickname: string;
            followerCount: string;
            isLoading: boolean;
        };
        discord: {
            avatar: string;
            nickname: string;
            followerCount: string;
            isLoading: boolean;
        };
    } | undefined>;
};
