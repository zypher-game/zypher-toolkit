import {
  bingoBetaSupportedChainId,
  ChainId,
  preStaticUrl,
  useActiveWeb3React,
  useChainModal,
  useSetRecoilState,
  walletModalOpenState,
} from "@ui/src";
import { isEqual } from "lodash";
import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useChainIdParams } from "@/hooks/useChainIdParams";
import { getChainNameText, GetGameListBoxImg } from "@/hooks/useMText";
import { IGameListBeta } from "@/hooks/useRecentGames";
import sleep from "@/utils/sleep";
import { toBingoPlayHref } from "@/utils/toBingoHref";

import CarouselList from "../carouselList/carouselList";
import css from "./InnerBeta.module.stylus";
const InnerBeta = memo(
  ({
    listBetaMapList,
    bingoHasError,
  }: {
    listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined;
    bingoHasError: boolean;
  }) => {
    const chainIdParams = useChainIdParams();
    const { account, chainId } = useActiveWeb3React();
    const setDialogOpen = useSetRecoilState(walletModalOpenState);
    const { openChainModal } = useChainModal();
    const navigate = useNavigate();
    const handleOnClick = useCallback(async () => {
      if (!account) {
        setDialogOpen(false);
        await sleep(1);
        setDialogOpen(true);
        return;
      }
      if (!bingoBetaSupportedChainId.includes(chainId)) {
        if (openChainModal) {
          openChainModal();
        }
        return;
      }
      toBingoPlayHref({
        chainIdParams,
        navigate,
      });
    }, [chainIdParams, account, chainId, openChainModal]);
    return (
      <div className={css.inner}>
        <CarouselList
          bingoMapList={listBetaMapList}
          bingoHasError={bingoHasError}
        />
        <div className={css.innerItemWrap}>
          <img
            src={preStaticUrl + "/img/bingo/bingo_title.png"}
            alt="bingo"
            className={css.title}
          />
          <h3>Prize: {getChainNameText(chainId)} zBox</h3>
          <div className={css.border}>
            <GetGameListBoxImg />
          </div>
          <p className={css.button} onClick={handleOnClick}>
            Play
          </p>
        </div>
      </div>
    );
  },
  isEqual
);

export default InnerBeta;
