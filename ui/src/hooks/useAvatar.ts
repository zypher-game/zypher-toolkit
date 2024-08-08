import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { refreshAvatarState } from "../components/ConnectWallet/state/connectWalletState";
import generateAvatar from "../utils/generateAvatar";
import { WebAppData } from "../rainbow/Ton";
import { TelegramUserInfoState } from "./useTelegramUser";

export const useAvatar = (account?: string, hideAvatars?: boolean) => {
  const [avatars, setAvatars] = useState<{
    selectedAvatar: string;
    selectedBackground: string;
  }>({
    selectedAvatar: "",
    selectedBackground: "",
  });
  const refreshAvatar = useRecoilValue(refreshAvatarState);
  const userInfo = useRecoilValue(TelegramUserInfoState);
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
    if (window.IS_TELEGRAM && userInfo) {
      src = `https://zypher-static.s3.amazonaws.com/telegram/${userInfo.id}`;
    } else {
      src = `https://tvl-avatar.s3.us-west-2.amazonaws.com/${account?.toLowerCase()}.png`;
    }
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
  }, [account, refreshAvatar, JSON.stringify(userInfo)]);
  return avatars || {};
};
