import { atom } from "recoil";

import { localStorageEffect } from "../../../utils/localStorageEffect";
import { ChainId } from "../../../constant/constant";
import { IConnectorState } from "./connectWalletState.type";

export const connectorState = atom<IConnectorState>({
  key: "connectorState",
  default: {
    chainId: null,
    networkError: null,
  },
});

export const walletModalOpenState = atom({
  key: "walletModalOpenState",
  default: false,
});

export const ChainSelector = atom({
  key: "ChainSelector",
  default: false,
});

export const refreshBalanceState = atom({
  key: "refreshBalance",
  default: "0",
});
export const pointsDialogState = atom({
  key: "pointsDialog",
  default: false,
  effects_UNSTABLE: [localStorageEffect("pointsDialog")],
});
export const pointsAnimState = atom({
  key: "pointsAnim",
  default: false,
});
export const pointsAnimNumState = atom({
  key: "pointsAnimNum",
  default: 0,
});
export const pointsWarnState = atom({
  key: "pointsWarn",
  default: 0, // 0 显示提示   1 显示提示 2 隐藏
  // effects_UNSTABLE: [localStorageEffect('pointsWarn')]
});
export const hidePointsWarnState = atom({
  key: "hidePointsWarn",
  default: false, // 不显示提示
  effects_UNSTABLE: [localStorageEffect("hidePointsWarn")],
});
export const pointsRuleDialogState = atom({
  key: "pointsRuleDialog",
  default: false,
  // effects_UNSTABLE: [localStorageEffect('pointsRuleDialog')]
});

export const accountInfoDialogState = atom({
  key: "accountInfoDialog",
  default: false,
  effects_UNSTABLE: [localStorageEffect("accountInfoDialog")],
});

export const linkToBetaDialogState = atom({
  key: "linkToBetaDialog",
  default: false,
});
export const linkToBetaDialogChainIdState = atom<ChainId | undefined>({
  key: "linkToBetaDialogChainIdState",
  default: undefined,
});
export const nativeBalanceState = atom({
  key: "nativeBalance",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("nativeBalance")],
});
export const pointsBalanceState = atom({
  key: "pointsBalance",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("pointsBalance")],
});
