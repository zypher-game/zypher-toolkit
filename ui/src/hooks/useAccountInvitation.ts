import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { ChainId, localStorageEffect, txStatus } from "..";
import { useCallback } from "react";
import { TransactionReceipt } from "viem";

import { request } from "../utils/request";
// 分享者的address
export type IInvitationAddress = {
  address: string;
  chainId: ChainId;
};
export const invitationAddressState = atom<IInvitationAddress | undefined>({
  key: "invitationAddressState",
  default: undefined,
  effects_UNSTABLE: [localStorageEffect("invitationAddressState")],
});
export const getApilUrl = (env: string) => {
  const apiPre =
    env === "develop"
      ? "https://testapi.zypher.game"
      : "https://api.zypher.game";
  return {
    accountInfo: apiPre + `/user/getone`,
    accountListInfo: apiPre + `/user/getmulti`,
    accountInfoUpdate: apiPre + `/user/infoupdate`,
  };
};
export const useAccountInvitation = (env: string) => {
  const { chainId, account } = useActiveWeb3React();
  const invitationAddres = useRecoilValue<IInvitationAddress | undefined>(
    invitationAddressState
  );
  const setInvitationAddressState = useSetRecoilState<
    IInvitationAddress | undefined
  >(invitationAddressState);

  const postAccountUpdate = useCallback(
    async ({ tx }: { tx: TransactionReceipt }) => {
      try {
        // post
        if (tx.status === txStatus) {
          const params: any = {
            user_addr: account,
            chain_id: `${chainId}`,
            tx_hash: tx.transactionHash,
          };
          if (
            invitationAddres &&
            invitationAddres.address !== "" &&
            // invitationAddres.chainId === chainId &&
            invitationAddres.address.toLowerCase() !==
              params.user_addr.toLowerCase()
          ) {
            params.sharer_addr = invitationAddres?.address;
          }
          const apiUrl = getApilUrl(env);
          const res = await request(apiUrl.accountInfoUpdate, {
            method: "POST",
            data: JSON.stringify(params),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (
            res.data &&
            res.data["code"] == 200 &&
            `${res.data.data}` === "1"
          ) {
            setInvitationAddressState(undefined);
          }
        }
      } catch (e) {
        console.error("PostAccountUpdate Error", e);
      }
    },
    [chainId, account, invitationAddres]
  );
  return {
    postAccountUpdate,
  };
};
