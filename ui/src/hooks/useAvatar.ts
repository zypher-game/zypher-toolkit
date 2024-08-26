import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { refreshAvatarState } from "../components/ConnectWallet/state/connectWalletState";
import generateAvatar from "../utils/generateAvatar";

export const useAvatar = (
  account?: string,
  hideAvatars?: boolean,
  name?: string
) => {
  const [avatars, setAvatars] = useState<{
    selectedAvatar: string;
    selectedBackground: string;
  }>({
    selectedAvatar: "",
    selectedBackground: "",
  });
  const refreshAvatar = useRecoilValue(refreshAvatarState);
  useEffect(() => {
    if (account && !hideAvatars) {
      getData();
    } else {
      const { selectedAvatar, selectedBackground } = generateAvatar(account);
      setAvatars({ selectedAvatar, selectedBackground });
    }
  }, [account, refreshAvatar]);
  const getData = useCallback(() => {
    const img = new Image();
    let src = "";
    let selectedBackground = "#fff";
    if (window.IS_TELEGRAM) {
      src = `https://zypher-static.s3.amazonaws.com/telegram/${account?.toLowerCase()}`;
    } else {
      selectedBackground = "#1A1B1F";
      src = `https://tvl-avatar.s3.us-west-2.amazonaws.com/${account?.toLowerCase()}.png`;
    }
    img.src = src;
    img.onload = () => {
      setAvatars({
        selectedAvatar: `${src}?9999999${refreshAvatar}`,
        selectedBackground: selectedBackground,
      });
    };
    img.onerror = () => {
      const { selectedAvatar, selectedBackground } = generateAvatar(account);
      setAvatars({ selectedAvatar, selectedBackground });
    };
  }, [account, refreshAvatar]);
  return avatars || {};
};
