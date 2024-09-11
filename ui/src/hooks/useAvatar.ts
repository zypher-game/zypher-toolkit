import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { refreshAvatarState } from "../components/ConnectWallet/state/connectWalletState";
import generateAvatar from "../utils/generateAvatar";
import { useIsTelegram } from "./useIsTelegram";
import { ownerListState } from "./useGetOwnAddress";

export const useAvatar = (account?: string, hideAvatars?: boolean) => {
  const [avatars, setAvatars] = useState<{
    selectedAvatar: string;
    selectedBackground: string;
  }>({
    selectedAvatar: "",
    selectedBackground: "",
  });
  const refreshAvatar = useRecoilValue(refreshAvatarState);
  const IS_TELEGRAM = useIsTelegram();
  const [_account, _setAccount] = useState(account);
  const ownerList = useRecoilValue(ownerListState);
  console.log({ ownerList, account, _account });
  const getAccount = useCallback(async () => {
    try {
      if (account) {
        _setAccount(ownerList[account.toLowerCase()] ?? account);
      }
    } catch (err) {
      console.log("error _account", err);
    }
  }, [JSON.stringify(ownerList), account]);
  useEffect(() => {
    getAccount();
  }, [getAccount]);
  useEffect(() => {
    if (_account && !hideAvatars) {
      getData();
    } else {
      const { selectedAvatar, selectedBackground } = generateAvatar(_account);
      setAvatars({ selectedAvatar, selectedBackground });
    }
  }, [_account, refreshAvatar]);
  const getData = useCallback(() => {
    const img = new Image();
    let src = "";
    let selectedBackground = "#fff";
    if (IS_TELEGRAM) {
      src = `https://zypher-static.s3.amazonaws.com/telegram/${_account?.toLowerCase()}`;
    } else {
      selectedBackground = "#1A1B1F";
      src = `https://tvl-avatar.s3.us-west-2.amazonaws.com/${_account?.toLowerCase()}.png`;
    }
    img.src = src;
    img.onload = () => {
      setAvatars({
        selectedAvatar: `${src}?9999999${refreshAvatar}`,
        selectedBackground: selectedBackground,
      });
    };
    img.onerror = () => {
      const { selectedAvatar, selectedBackground } = generateAvatar(_account);
      setAvatars({ selectedAvatar, selectedBackground });
    };
  }, [_account, refreshAvatar]);
  return {
    avatars: avatars || {},
    aa_mm_address: _account,
  };
};
