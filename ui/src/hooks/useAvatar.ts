import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { refreshAvatarState } from "../components/ConnectWallet/state/connectWalletState";
import generateAvatar from "../utils/generateAvatar";

export const useAvatar = (account?: string, hideAvatars?: boolean) => {
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
    const src = `https://tvl-avatar.s3.us-west-2.amazonaws.com/${account?.toLowerCase()}.png`;
    img.src = src;
    img.onload = () => {
      setAvatars({
        selectedAvatar: `${src}?${refreshAvatar}`,
        selectedBackground: "#1d263b",
      });
    };
    img.onerror = () => {
      const { selectedAvatar, selectedBackground } = generateAvatar(account);
      setAvatars({ selectedAvatar, selectedBackground });
    };
  }, [account, refreshAvatar]);
  return avatars || {};
};
