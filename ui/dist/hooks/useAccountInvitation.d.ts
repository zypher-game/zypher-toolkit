import { ChainId } from "..";
import { TransactionReceipt } from "viem";
export type IInvitationAddress = {
    address: string;
    chainId: ChainId;
};
export declare const invitationAddressState: import("recoil").RecoilState<IInvitationAddress | undefined>;
export declare const getApilUrl: (env: string) => {
    accountInfo: string;
    accountListInfo: string;
    accountInfoUpdate: string;
};
export declare const useAccountInvitation: (env: string) => {
    postAccountUpdate: ({ tx }: {
        tx: TransactionReceipt;
    }) => Promise<void>;
};
