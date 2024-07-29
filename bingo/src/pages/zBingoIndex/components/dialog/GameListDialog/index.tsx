import "./antd.stylus";

import { DialogContent, DialogOverlay } from "@reach/dialog";
import {
  ChainId,
  IGameList,
  preStaticUrl,
  useRecoilValue,
  useSetRecoilState,
} from "@ui/src";
import { isEqual } from "lodash";
import React, { memo, useCallback } from "react";

import { IGameListBeta } from "@/hooks/useRecentGames";
import {
  bingoVersionState,
  gameListDialogState,
  IBingoVersion,
} from "@/pages/state/state";

import GameList from "./GameList";
import GameListBeta from "./GameListBeta";
import css from "./index.module.stylus";
const GameListDialog = memo(
  ({
    bingoMapList,
    listBetaMapList,
    bingoHasError,
  }: {
    bingoMapList: Map<ChainId, IGameList[]> | undefined;
    listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined;
    bingoHasError: boolean;
  }) => {
    const bingoVersion = useRecoilValue(bingoVersionState);
    const isModalOpen = useRecoilValue(gameListDialogState);
    const setIsModalOpen = useSetRecoilState(gameListDialogState);
    const handleCancel = useCallback(() => {
      setIsModalOpen(false);
    }, []);

    return (
      <>
        <DialogOverlay
          isOpen={isModalOpen}
          onDismiss={handleCancel}
          className={css.bg}
        >
          <DialogContent className={css.gameList}>
            <img
              src={preStaticUrl + `/img/bingo/close.png`}
              alt="close"
              className={css.close}
              onClick={handleCancel}
            />
            <p className={css.title}>Games List</p>
            <div className={css.inner}>
              {bingoVersion === IBingoVersion.v1 ? (
                <GameList
                  bingoHasError={bingoHasError}
                  bingoMapList={bingoMapList}
                />
              ) : null}
              {bingoVersion === IBingoVersion.beta ? (
                <GameListBeta
                  bingoHasError={bingoHasError}
                  listBetaMapList={listBetaMapList}
                />
              ) : null}
            </div>
          </DialogContent>
        </DialogOverlay>
      </>
    );
  },
  isEqual
);
export default GameListDialog;
