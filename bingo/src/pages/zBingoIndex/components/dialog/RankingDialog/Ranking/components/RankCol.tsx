import { PlayerAvatar } from "@ui/src";
import { preStaticUrl } from "@ui/src";
import BigNumber from "bignumber.js";
import { isEqual } from "lodash";
import React, { FC, memo, useMemo } from "react";

import css from "./RankCol.module.stylus";

type IProp = {
  rank: string;
  account: string;
  isMobile: boolean;
  showLine?: boolean;
  otherStr?: string;
};
const RankCol: FC<IProp> = memo(
  ({ rank, account, isMobile, showLine = false, otherStr }: IProp) => {
    const rankId = useMemo(() => {
      if (rank && rank !== "undefined") {
        if (new BigNumber(rank).isLessThan(4)) {
          return (
            <img
              className={css.img}
              src={preStaticUrl + `/img/bingo/ranking${rank}.png`}
              title="ranking"
            />
          );
        }
        return <p className={css.p}>{rank}</p>;
      }
      return undefined;
    }, [rank]);
    const accountData = useMemo(() => {
      if (isMobile) {
        return {
          preLen: 3,
          endLen: 3,
          size: 28,
        };
      }
      return {
        preLen: undefined,
        endLen: undefined,
        size: 52,
      };
    }, [isMobile]);
    return (
      <div className={css.rank}>
        {rankId && <div className={css.rankIcon}>{rankId}</div>}
        <PlayerAvatar
          className={css.account}
          account={account}
          size={accountData.size}
          showAccount={true}
          border={false}
          preLen={accountData.preLen}
          endLen={accountData.endLen}
          AvatarBorder={ShowAvatarBorderWidget}
          otherStr={otherStr}
        />
      </div>
    );
  },
  isEqual
);
const ShowAvatarBorderWidget = memo(
  ({ children }: { children: React.ReactNode }) => {
    return <div className={css.avatarBorder}>{children}</div>;
  }
);
export default RankCol;
