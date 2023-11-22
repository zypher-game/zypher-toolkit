import { useSetRecoilState } from "recoil";
import {
  IInvitationAddress,
  invitationAddressState,
} from "./useAccountInvitation";
import { useEffect } from "react";
import { ethers } from "ethers";
import { ChainId } from "../constant/constant";

export const useGetInvitationAddress = (): void => {
  // Games can start with as few as two players. You are free to start as soon as you have a single other player matched. Please do not quit during the matchmaking process.
  // (This step requires a gas fee)
  // /play/21/gameRoom
  // 0x9c6f0de000000000000000000000000000000000000000000000000000000000000000150000000000000000000000000000000000000000000000000000000000000022
  // 解析URL
  const setInvitationAddressState = useSetRecoilState<
    IInvitationAddress | undefined
  >(invitationAddressState);
  useEffect(() => {
    const urlObj = new URL(window.location.href);
    // 获取参数值
    const shareParam = urlObj.searchParams.get("share");
    const chain_id = urlObj.searchParams.get("chain_id");
    if (shareParam?.startsWith("0x")) {
      const isValidAddress = ethers.utils.isAddress(shareParam);
      if (isValidAddress) {
        setInvitationAddressState({
          address: shareParam,
          chainId: Number(chain_id) as ChainId,
        });
      }
    }
  }, []);
};
