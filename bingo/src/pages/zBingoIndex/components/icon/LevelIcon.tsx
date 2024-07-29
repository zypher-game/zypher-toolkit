import { preStaticUrl, useSetRecoilState } from "@ui/src";
import { isEqual } from "lodash";
import React, { memo, useCallback, useMemo } from "react";

import { levelRuleDialogState } from "@/pages/state/state";

import LevelRuleDialog from "../dialog/levelRuleDialog/levelRuleDialog";
import css from "./LevelIcon.module.stylus";
type ILevelIcon = {
  gamesWonNumber: string;
};
const LevelIcon = memo(({ gamesWonNumber }: ILevelIcon) => {
  const level = useMemo(() => {
    // 初级玩家：赢 0-9场游戏，可玩 5000 GP
    // 中级玩家：赢 10-24场游戏，可玩 5000 GP、1w GP
    // 高级玩家：赢 25场游戏 及以上，可玩 5000 GP、1w GP、2w GP
    const num = Number(gamesWonNumber);
    if (10 <= num && num <= 24) {
      return 2;
    } else if (num >= 25) {
      return 3;
    }
    return 1;
  }, [gamesWonNumber]);
  const setIsModalOpen = useSetRecoilState(levelRuleDialogState);

  const showLevelRule = useCallback(() => {
    setIsModalOpen(true);
  }, []);
  return (
    <>
      <img
        onClick={showLevelRule}
        src={preStaticUrl + `/img/profile/level${level}.svg`}
        alt="level"
        className={css.levelImg}
      />
      <LevelRuleDialog />
    </>
  );
}, isEqual);

export default LevelIcon;
