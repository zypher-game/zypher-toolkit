import { PointsIcon, preStaticUrl } from "@ui/src";
import classnames from "classnames";
import { isEqual } from "lodash";
import React, { FC, memo } from "react";

import { IPlayerRankingItem } from "../Ranking";
import RankCol from "./RankCol";
import css from "./rankingTable.module.stylus";
type IProps = {
  isMobile: boolean;
  players: IPlayerRankingItem[];
  tab: number;
  myItem: IPlayerRankingItem | undefined;
};
const RankingTable: FC<IProps> = memo(
  ({ isMobile, players, tab, myItem }: IProps) => {
    return (
      <div className={css.ranking_table}>
        {players.map((v) => (
          <RankingItem
            key={v.index}
            player={v}
            isMobile={isMobile}
            tab={tab}
            className={
              (v?.index ?? 0) % 2 !== 0 ? css["even-row"] : css["odd-row"]
            }
          />
        ))}
      </div>
    );
  },
  isEqual
);
export type IRankingItemProps = {
  player: IPlayerRankingItem;
  isMobile: boolean;
  className?: string;
  tab: number;
  otherStr?: string;
};
export const RankingItem: FC<IRankingItemProps> = memo(
  ({ player, tab, isMobile, className, otherStr }: IRankingItemProps) => {
    return (
      <div className={classnames(css.item, className)}>
        <RankCol
          rank={`${player.index}`}
          account={player.address}
          isMobile={isMobile}
          showLine={true}
          otherStr={otherStr}
        />
        <div className={css.number}>
          <img
            src={preStaticUrl + "/img/home/data_points 02.svg"}
            alt="point"
          />
          <p className="textbg">
            {" "}
            {tab === 0 ? player.joinAmount : player.winAmount}
          </p>
        </div>
      </div>
    );
  },
  isEqual
);
export default RankingTable;
