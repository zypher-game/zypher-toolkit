import { preStaticUrl, useSetRecoilState } from "@ui/src";
import { isEqual } from "lodash";
import React, { FC, memo, useCallback } from "react";

import { monsterNftRuleDialogState } from "@/pages/state/state";

import MonsterNftDialog from "../dialog/monsterNftDialog/monsterNftDialog";
import css from "./LevelIcon.module.stylus";
type IMonsterIcon = {
  hasMonsterNft: boolean;
};
const MonsterIcon: FC<IMonsterIcon> = memo(
  ({ hasMonsterNft }: IMonsterIcon) => {
    const setMonsterNftOpen = useSetRecoilState(monsterNftRuleDialogState);

    const showNftRule = useCallback(() => {
      setMonsterNftOpen(true);
    }, []);
    if (!hasMonsterNft) {
      return <></>;
    }
    return (
      <>
        <img
          onClick={showNftRule}
          src={preStaticUrl + `/img/profile/monster_nft.svg`}
          alt="level"
          className={css.levelImg}
        />
        <MonsterNftDialog />
      </>
    );
  },
  isEqual
);

export default MonsterIcon;
