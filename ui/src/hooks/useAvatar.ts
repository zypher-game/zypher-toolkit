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
  // const { getUserInfo } = useGetUserInfo();
  useEffect(() => {
    if (account && !hideAvatars) {
      getData();
      // https://tvl-avatar.s3.us-west-2.amazonaws.com/0x2e1c9adc548963273d9e767413403719019bd639.png
      // setAvatars({ selectedAvatar, selectedBackground:bgColor[0] });
    } else {
      const { selectedAvatar, selectedBackground } = generateAvatar(account);
      setAvatars({ selectedAvatar, selectedBackground });
    }
  }, [account, refreshAvatar]);
  // https://tvl-avatar.s3.us-west-2.amazonaws.com/0x2e1c9adc548963273d9e767413403719019bd639.png
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
