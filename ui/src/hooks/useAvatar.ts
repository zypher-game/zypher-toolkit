import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { refreshAvatarState } from "../components/ConnectWallet/state/connectWalletState";
import generateAvatar from "../utils/generateAvatar";
import { useIsTelegram } from "./useIsTelegram";
import { ownerListState } from "./useGetOwnAddress";
import { localStorageEffect } from "../utils/localStorageEffect";

export const avatarState = atom<
  Record<
    string,
    {
      selectedAvatar: string;
      selectedBackground: string;
    }
  >
>({
  key: "avatarState",
  default: {},
  effects_UNSTABLE: [localStorageEffect("avatarState")],
});
export const useAvatar = (account?: string, hideAvatars?: boolean) => {
  const [avatars, setAvatars] = useRecoilState(avatarState);
  const [avatarsNoAccount, setAvatarsNoAccount] = useState({
    selectedAvatar: "",
    selectedBackground: "",
  });
  const refreshAvatar = useRecoilValue(refreshAvatarState);
  const IS_TELEGRAM = useIsTelegram();
  const [_account, _setAccount] = useState(account);
  const ownerList = useRecoilValue(ownerListState);
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
      if (_account && !avatars[`${_account?.toLowerCase()}`]) {
        getData();
      }
    } else {
      const { selectedAvatar, selectedBackground } = generateAvatar(_account);
      setAvatarsNoAccount({
        selectedAvatar,
        selectedBackground,
      });
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
      setAvatars((pre) => ({
        ...pre,
        [(_account ?? "").toLowerCase()]: {
          selectedAvatar: `${src}?9999999${refreshAvatar}`,
          selectedBackground: selectedBackground,
        },
      }));
    };
    img.onerror = () => {
      const { selectedAvatar, selectedBackground } = generateAvatar(_account);
      setAvatars((pre) => ({
        ...pre,
        [(_account ?? "").toLowerCase()!]: {
          selectedAvatar,
          selectedBackground,
        },
      }));
    };
  }, [_account, refreshAvatar]);
  return {
    avatars: _account
      ? avatars[_account.toLowerCase()] ?? {}
      : avatarsNoAccount,
    aa_mm_address: _account,
    account: _account,
  };
};
