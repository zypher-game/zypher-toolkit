import { useCallback } from "react";
import { request } from "../utils/request";
import { TVL_API, getLinkPre } from "../constant/tvlConstant";
import { ChainId } from "../constant/constant";

export const useGetHero = () => {
  const getHero = useCallback(
    async ({ address, linkType }: { address: string; linkType: number }) => {
      try {
        const res = await request(
          `${TVL_API}/api/user-role/${address.toLowerCase()}`,
          {
            method: "GET",
            params: {
              linkType: linkType,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.data && res.data["message"]) {
          return res.data["message"];
        } else {
          return undefined;
        }
      } catch (e: any) {
        return undefined;
      }
    },
    []
  );
  return { getHero };
};
export const useGetUserInfo = () => {
  const getUserInfo = useCallback(
    async ({ account, chainId }: { account: string; chainId: ChainId }) => {
      try {
        const linkType = getLinkPre(chainId);
        const info_res = await request(`${TVL_API}/api/info/${account}`, {
          method: "GET",
          params: {
            pageCount: 10,
            linkType: linkType.key,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (info_res.data) {
          const infoObj = form_info(info_res.data, chainId);
          return infoObj;
        }
      } catch (e) {
        console.log("useGetInfo", { e });
      }
    },
    []
  );
  return { getUserInfo };
};
const form_info = (data: any, chainId: ChainId) => {
  const linkType = getLinkPre(chainId);
  return {
    invitationCode: `${linkType.label}${data.curInviteCode}`,
    signedStr: "0000",
    avatar: data.headImg,
    id: `${data.id}`,
    nickname: data.nickname,
    twitter: {
      avatar: data.twitterImg,
      nickname: data.twitterName,
      followerCount: `${data.twitterFollower}`,
      isLoading: false,
    },
    discord: {
      avatar: data.discordImg,
      nickname: data.discordName,
      followerCount: "",
      isLoading: false,
    },
  };
};
