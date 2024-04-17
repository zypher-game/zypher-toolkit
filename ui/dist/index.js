"use client";
// src/index.ts
import {
  useSetRecoilState as useSetRecoilState12,
  atom as atom6,
  selector,
  RecoilRoot,
  useRecoilState as useRecoilState11,
  useRecoilValue as useRecoilValue9,
  useResetRecoilState
} from "recoil";

// src/hooks/useNavItem.type.ts
var INavLinkType = /* @__PURE__ */ ((INavLinkType2) => {
  INavLinkType2["Games"] = "Games";
  INavLinkType2["Activities"] = "Activities";
  INavLinkType2["Language"] = "Language";
  INavLinkType2["Links"] = "Links";
  return INavLinkType2;
})(INavLinkType || {});

// src/types/gameList.types.ts
var IGameStatus = /* @__PURE__ */ ((IGameStatus2) => {
  IGameStatus2["Live"] = "live";
  IGameStatus2["End"] = "end";
  IGameStatus2["Overtime"] = "overtime";
  IGameStatus2["Invalid"] = "invalid";
  return IGameStatus2;
})(IGameStatus || {});
var IGameName = /* @__PURE__ */ ((IGameName2) => {
  IGameName2["zBingo"] = "zBingo";
  IGameName2["z2048"] = "z2048";
  return IGameName2;
})(IGameName || {});

// src/index.ts
import { useWalletClient as useWalletClient2, useSwitchNetwork } from "wagmi";

// src/constant/constant.ts
import { AddressZero } from "@ethersproject/constants";
import zkBingoContracts from "@zypher-game/bingo-periphery/contracts.json";
import zkBingoContractsV1 from "@zypher-game/bingo-periphery-v1/contracts.json";
import contract from "@zypher-game/events/contracts.json";
import BigNumberjs from "bignumber.js";
var appInfo = {
  appName: "Zypher Game"
};
var divisor6xBigNumber = new BigNumberjs("10").exponentiatedBy(6);
var divisorBigNumber = new BigNumberjs("10").exponentiatedBy(18);
var txStatus = "success";
var isPro = () => {
  const localpath = window.location.hostname;
  if (localpath.indexOf("app") > -1) {
    return true;
  }
  return false;
};
var preStaticUrl = isPro() ? "https://static.zypher.game" : "https://static-dev.zypher.game";
var ChainId = /* @__PURE__ */ ((ChainId9) => {
  ChainId9[ChainId9["Mainnet"] = 56] = "Mainnet";
  ChainId9[ChainId9["Testnet"] = 97] = "Testnet";
  ChainId9[ChainId9["Arbitrum"] = 42161] = "Arbitrum";
  ChainId9[ChainId9["ArbitrumRinkeby"] = 421611] = "ArbitrumRinkeby";
  ChainId9[ChainId9["LineaTestnet"] = 59140] = "LineaTestnet";
  ChainId9[ChainId9["LineaMainnet"] = 59144] = "LineaMainnet";
  ChainId9[ChainId9["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
  ChainId9[ChainId9["POLYGON_ZKEVM"] = 1442] = "POLYGON_ZKEVM";
  ChainId9[ChainId9["ArbitrumGoerli"] = 421613] = "ArbitrumGoerli";
  ChainId9[ChainId9["ScrollAlphaTestnet"] = 534353] = "ScrollAlphaTestnet";
  ChainId9[ChainId9["OPBNBTEST"] = 5611] = "OPBNBTEST";
  ChainId9[ChainId9["OPBNB"] = 204] = "OPBNB";
  ChainId9[ChainId9["ScrollSepoliaTestnet"] = 534351] = "ScrollSepoliaTestnet";
  ChainId9[ChainId9["MantaPacificMainnet"] = 169] = "MantaPacificMainnet";
  ChainId9[ChainId9["MantaPacificTestnet"] = 3441005] = "MantaPacificTestnet";
  ChainId9[ChainId9["Combo"] = 9980] = "Combo";
  ChainId9[ChainId9["ComboTestnet"] = 91715] = "ComboTestnet";
  ChainId9[ChainId9["Mantle"] = 5e3] = "Mantle";
  ChainId9[ChainId9["MantleTestnet"] = 5001] = "MantleTestnet";
  ChainId9[ChainId9["Sepolia"] = 11155111] = "Sepolia";
  return ChainId9;
})(ChainId || {});
var DPSupportChainId = !isPro() ? [
  59140 /* LineaTestnet */,
  59144 /* LineaMainnet */,
  5611 /* OPBNBTEST */,
  204 /* OPBNB */
] : [59144 /* LineaMainnet */, 204 /* OPBNB */];
var bingoV1SupportedChainId = !isPro() ? [
  59144 /* LineaMainnet */,
  59140 /* LineaTestnet */,
  204 /* OPBNB */,
  5611 /* OPBNBTEST */
] : [59144 /* LineaMainnet */, 204 /* OPBNB */];
var bingoBetaSupportedChainId = !isPro() ? [
  42161 /* Arbitrum */,
  421613 /* ArbitrumGoerli */,
  534351 /* ScrollSepoliaTestnet */,
  5001 /* MantleTestnet */,
  5e3 /* Mantle */,
  9980 /* Combo */,
  91715 /* ComboTestnet */,
  3441005 /* MantaPacificTestnet */,
  169 /* MantaPacificMainnet */
] : [
  42161 /* Arbitrum */,
  5e3 /* Mantle */,
  169 /* MantaPacificMainnet */,
  9980 /* Combo */
];
var bingoSupportedChainId = [
  ...bingoV1SupportedChainId,
  ...bingoBetaSupportedChainId
];
var supportedChainIds = (env, chainList2) => {
  return chainList2 ? chainList2 : !isPro() || env === "develop" ? [
    59144 /* LineaMainnet */,
    59140 /* LineaTestnet */,
    204 /* OPBNB */,
    5611 /* OPBNBTEST */,
    42161 /* Arbitrum */,
    421613 /* ArbitrumGoerli */,
    169 /* MantaPacificMainnet */,
    3441005 /* MantaPacificTestnet */,
    5e3 /* Mantle */,
    5001 /* MantleTestnet */,
    91715 /* ComboTestnet */,
    9980 /* Combo */,
    11155111 /* Sepolia */
  ] : [
    59144 /* LineaMainnet */,
    204 /* OPBNB */,
    42161 /* Arbitrum */,
    5e3 /* Mantle */,
    9980 /* Combo */,
    169 /* MantaPacificMainnet */
  ];
};
var ChainRpcUrls = {
  [59140 /* LineaTestnet */]: [
    "https://rpc.goerli.linea.build",
    "https://linea-goerli.blockpi.network/v1/rpc/public"
  ],
  [59144 /* LineaMainnet */]: ["https://rpc.linea.build"],
  [42161 /* Arbitrum */]: ["https://arb1.arbitrum.io/rpc"],
  [5611 /* OPBNBTEST */]: ["https://opbnb-testnet-rpc.bnbchain.org/"],
  [204 /* OPBNB */]: [
    "https://opbnb-mainnet-rpc.bnbchain.org",
    "https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"
  ],
  [534351 /* ScrollSepoliaTestnet */]: ["https://sepolia-rpc.scroll.io/"],
  [534353 /* ScrollAlphaTestnet */]: ["https://scroll-alpha-public.unifra.io"],
  [169 /* MantaPacificMainnet */]: ["https://pacific-rpc.manta.network/http"],
  [56 /* Mainnet */]: [
    "https://bsc-dataseed1.binance.org",
    "https://bsc-mainnet.nodereal.io/v1/a986025b4eae4b82b9c2d577c730d09a"
  ],
  [97 /* Testnet */]: [
    "https://endpoints.omniatech.io/v1/bsc/testnet/public",
    "https://bsc-testnet.publicnode.com",
    "https://bsc-testnet.nodereal.io/v1/9459391f32694c11b182c8d4d9cee750"
  ],
  [421611 /* ArbitrumRinkeby */]: ["https://rinkeby.arbitrum.io/rpc"],
  [421613 /* ArbitrumGoerli */]: [
    "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
    "https://goerli-rollup.arbitrum.io/rpc"
  ],
  [80001 /* POLYGON_MUMBAI */]: [
    "https://polygon-mumbai-bor.publicnode.com",
    "https://matic-mumbai.chainstacklabs.com",
    "https://rpc-mumbai.maticvigil.com",
    "https://matic-testnet-archive-rpc.bwarelabs.com"
  ],
  [1442 /* POLYGON_ZKEVM */]: ["https://rpc.public.zkevm-test.net"],
  [3441005 /* MantaPacificTestnet */]: [
    "https://manta-testnet.calderachain.xyz/http"
  ],
  [9980 /* Combo */]: [
    "https://combo-mainnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1",
    "https://combo-mainnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3",
    "https://combo-mainnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac"
  ],
  [91715 /* ComboTestnet */]: [
    "https://combo-testnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3",
    "https://combo-testnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac",
    "https://combo-testnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1"
  ],
  [5e3 /* Mantle */]: ["https://mantle.publicnode.com"],
  [5001 /* MantleTestnet */]: ["https://rpc.testnet.mantle.xyz"],
  [11155111 /* Sepolia */]: [
    "https://endpoints.omniatech.io/v1/eth/sepolia/public",
    "https://ethereum-sepolia-rpc.publicnode.com"
  ]
};
var ChainRpcWebSocketUrls = {
  [421613 /* ArbitrumGoerli */]: ["wss://arbitrum-goerli.publicnode.com"],
  [1442 /* POLYGON_ZKEVM */]: [],
  [534353 /* ScrollAlphaTestnet */]: [],
  [5611 /* OPBNBTEST */]: [],
  [204 /* OPBNB */]: [],
  [534351 /* ScrollSepoliaTestnet */]: []
};
var BlockExplorerUrls = {
  [56 /* Mainnet */]: ["https://bscscan.com"],
  [97 /* Testnet */]: ["https://testnet.bscscan.com"],
  [42161 /* Arbitrum */]: ["https://arbiscan.io"],
  [421611 /* ArbitrumRinkeby */]: ["https://testnet.arbiscan.io"],
  [59140 /* LineaTestnet */]: ["https://explorer.goerli.linea.build"],
  [80001 /* POLYGON_MUMBAI */]: ["https://mumbai.polygonscan.com/"],
  [59144 /* LineaMainnet */]: ["https://lineascan.build"],
  [421613 /* ArbitrumGoerli */]: ["https://goerli.arbiscan.io/"],
  [1442 /* POLYGON_ZKEVM */]: ["https://testnet-zkevm.polygonscan.com"],
  [5611 /* OPBNBTEST */]: ["https://opbnb-testnet.bscscan.com"],
  [204 /* OPBNB */]: ["https://opbnbscan.com/"],
  [534351 /* ScrollSepoliaTestnet */]: ["https://sepolia-blockscout.scroll.io"],
  [534353 /* ScrollAlphaTestnet */]: ["https://alpha-blockscout.scroll.io"],
  [169 /* MantaPacificMainnet */]: ["https://pacific-explorer.manta.network"],
  [3441005 /* MantaPacificTestnet */]: ["https://manta-testnet.calderaexplorer.xyz"],
  [91715 /* ComboTestnet */]: ["https://combotrace-testnet.nodereal.io/"],
  [5e3 /* Mantle */]: ["https://explorer.mantle.xyz"],
  [5001 /* MantleTestnet */]: ["https://explorer.testnet.mantle.xyz"],
  [9980 /* Combo */]: ["https://combotrace.nodereal.io"],
  [11155111 /* Sepolia */]: ["https://sepolia.etherscan.io"]
};
var ChainName = {
  [56 /* Mainnet */]: "BSC Mainnet",
  [97 /* Testnet */]: "BSC Testnet",
  [42161 /* Arbitrum */]: "Arbitrum One",
  [421613 /* ArbitrumGoerli */]: "Arbitrum Goerli Testnet",
  [421611 /* ArbitrumRinkeby */]: "Arbitrum Rinkeby",
  [59140 /* LineaTestnet */]: "Linea Testnet",
  [59144 /* LineaMainnet */]: "Linea Mainnet",
  [80001 /* POLYGON_MUMBAI */]: "Polygon Mumbai",
  [1442 /* POLYGON_ZKEVM */]: "Polygon zkEVM Testnet",
  [5611 /* OPBNBTEST */]: "opBNB testnet",
  [204 /* OPBNB */]: "opBNB Mainnet",
  [534353 /* ScrollAlphaTestnet */]: "Scroll Alpha Testnet",
  [534351 /* ScrollSepoliaTestnet */]: "Scroll Sepolia Testnet",
  [169 /* MantaPacificMainnet */]: "Manta Pacific",
  [3441005 /* MantaPacificTestnet */]: "Manta Pacific Testnet",
  [91715 /* ComboTestnet */]: "Combo Testnet",
  [5e3 /* Mantle */]: "Mantle",
  [5001 /* MantleTestnet */]: "Mantle Testnet",
  [9980 /* Combo */]: "Combo",
  [11155111 /* Sepolia */]: "Sepolia"
};
var ChainNetworkName = {
  [56 /* Mainnet */]: "bsc",
  [97 /* Testnet */]: "bsc-testnet",
  [42161 /* Arbitrum */]: "arbitrum",
  [421611 /* ArbitrumRinkeby */]: "arbitrum-rinkeby",
  [59140 /* LineaTestnet */]: "linea-testnet",
  [59144 /* LineaMainnet */]: "linea",
  [80001 /* POLYGON_MUMBAI */]: "maticmum",
  [421613 /* ArbitrumGoerli */]: "arbitrum-goerli",
  [1442 /* POLYGON_ZKEVM */]: "polygon_zkEVM_testnet",
  [534353 /* ScrollAlphaTestnet */]: "Scroll Alpha Testnet",
  [5611 /* OPBNBTEST */]: "opBNB testnet",
  [204 /* OPBNB */]: "opBNB Mainnet",
  [534351 /* ScrollSepoliaTestnet */]: "Scroll Sepolia Testnet",
  [169 /* MantaPacificMainnet */]: "Manta Pacific",
  [3441005 /* MantaPacificTestnet */]: "Manta Pacific",
  [9980 /* Combo */]: "Combo",
  [91715 /* ComboTestnet */]: "Combo Testnet",
  [5e3 /* Mantle */]: "Mantle",
  [5001 /* MantleTestnet */]: "Mantle Testnet",
  [11155111 /* Sepolia */]: "Sepolia"
};
var isTestnet = {
  [56 /* Mainnet */]: false,
  [97 /* Testnet */]: true,
  [42161 /* Arbitrum */]: false,
  [421611 /* ArbitrumRinkeby */]: true,
  [59140 /* LineaTestnet */]: true,
  [59144 /* LineaMainnet */]: false,
  [80001 /* POLYGON_MUMBAI */]: true,
  [1442 /* POLYGON_ZKEVM */]: true,
  [204 /* OPBNB */]: false,
  [5611 /* OPBNBTEST */]: true,
  [421613 /* ArbitrumGoerli */]: true,
  [534351 /* ScrollSepoliaTestnet */]: true,
  [534353 /* ScrollAlphaTestnet */]: true,
  [169 /* MantaPacificMainnet */]: false,
  [3441005 /* MantaPacificTestnet */]: true,
  [9980 /* Combo */]: false,
  [91715 /* ComboTestnet */]: true,
  [5e3 /* Mantle */]: false,
  [5001 /* MantleTestnet */]: true,
  [11155111 /* Sepolia */]: true
};
var ChainImage = {
  [56 /* Mainnet */]: preStaticUrl + "/img/bsc.png",
  [97 /* Testnet */]: preStaticUrl + "/img/bsc.png",
  [42161 /* Arbitrum */]: preStaticUrl + "/img/arbitrum.png",
  [421613 /* ArbitrumGoerli */]: preStaticUrl + "/img/arbitrum.png",
  [421611 /* ArbitrumRinkeby */]: preStaticUrl + "/img/arbitrum.png",
  [59140 /* LineaTestnet */]: preStaticUrl + "/img/linea.svg",
  [59144 /* LineaMainnet */]: preStaticUrl + "/img/linea_logo.svg",
  [80001 /* POLYGON_MUMBAI */]: preStaticUrl + "/img/matic-token-icon.svg",
  [1442 /* POLYGON_ZKEVM */]: preStaticUrl + "/img/matic-token-icon.svg",
  [5611 /* OPBNBTEST */]: preStaticUrl + "/img/bsc.png",
  [204 /* OPBNB */]: preStaticUrl + "/img/bsc.png",
  [534353 /* ScrollAlphaTestnet */]: preStaticUrl + "/img/scroll.svg",
  [534351 /* ScrollSepoliaTestnet */]: preStaticUrl + "/img/scroll.svg",
  [169 /* MantaPacificMainnet */]: preStaticUrl + "/img/manta.svg",
  [3441005 /* MantaPacificTestnet */]: preStaticUrl + "/img/manta.svg",
  [9980 /* Combo */]: preStaticUrl + "/crypto/chain/9980.svg",
  [91715 /* ComboTestnet */]: preStaticUrl + "/img/combo.svg",
  [5e3 /* Mantle */]: preStaticUrl + "/img/MNT.webp",
  [5001 /* MantleTestnet */]: preStaticUrl + "/img/MNT.webp",
  [11155111 /* Sepolia */]: preStaticUrl + "/img/ethereum.png"
};
var Currency = {
  [56 /* Mainnet */]: "BNB",
  [97 /* Testnet */]: "BNB",
  [42161 /* Arbitrum */]: "ETH",
  [421611 /* ArbitrumRinkeby */]: "ETH",
  [59140 /* LineaTestnet */]: "ETH",
  [59144 /* LineaMainnet */]: "ETH",
  [80001 /* POLYGON_MUMBAI */]: "MATIC",
  [421613 /* ArbitrumGoerli */]: "ETH",
  [1442 /* POLYGON_ZKEVM */]: "ETH",
  [5611 /* OPBNBTEST */]: "BNB",
  [204 /* OPBNB */]: "BNB",
  [534353 /* ScrollAlphaTestnet */]: "ETH",
  [534351 /* ScrollSepoliaTestnet */]: "ETH",
  [169 /* MantaPacificMainnet */]: "ETH",
  [3441005 /* MantaPacificTestnet */]: "ETH",
  [9980 /* Combo */]: "BNB",
  [91715 /* ComboTestnet */]: "BNB",
  [5e3 /* Mantle */]: "MNT",
  [5001 /* MantleTestnet */]: "MNT",
  [11155111 /* Sepolia */]: "ETH"
};
var CurrencyLogo = {
  [56 /* Mainnet */]: preStaticUrl + "/img/bnb.svg",
  [97 /* Testnet */]: preStaticUrl + "/img/bnb.svg",
  [42161 /* Arbitrum */]: preStaticUrl + "/img/ethereum.png",
  [421611 /* ArbitrumRinkeby */]: preStaticUrl + "/img/ethereum.png",
  [59140 /* LineaTestnet */]: preStaticUrl + "/img/ethereum.png",
  [59144 /* LineaMainnet */]: preStaticUrl + "/img/ethereum.png",
  [80001 /* POLYGON_MUMBAI */]: preStaticUrl + "/img/ethereum.png",
  [421613 /* ArbitrumGoerli */]: preStaticUrl + "/img/ethereum.png",
  [1442 /* POLYGON_ZKEVM */]: preStaticUrl + "/img/ethereum.png",
  [5611 /* OPBNBTEST */]: preStaticUrl + "/img/bnb.svg",
  [204 /* OPBNB */]: preStaticUrl + "/img/bnb.svg",
  [534351 /* ScrollSepoliaTestnet */]: preStaticUrl + "/img/ethereum.png",
  [534353 /* ScrollAlphaTestnet */]: preStaticUrl + "/img/ethereum.png",
  [169 /* MantaPacificMainnet */]: preStaticUrl + "/img/ethereum-logo.png",
  [3441005 /* MantaPacificTestnet */]: preStaticUrl + "/img/ethereum-logo.png",
  [9980 /* Combo */]: preStaticUrl + "/img/bnb.svg",
  [91715 /* ComboTestnet */]: preStaticUrl + "/img/bnb.svg",
  [5e3 /* Mantle */]: preStaticUrl + "/img/MNT.webp",
  [5001 /* MantleTestnet */]: preStaticUrl + "/img/MNT.webp",
  [11155111 /* Sepolia */]: preStaticUrl + "/img/ethereum.png"
};
var MulticallV3 = "0xca11bde05977b3631167028862be2a173976ca11";
var CurrencyContract = {
  [56 /* Mainnet */]: {
    multicall: [MulticallV3]
  },
  [97 /* Testnet */]: {
    multicall: [MulticallV3]
  },
  [42161 /* Arbitrum */]: {
    multicall: [MulticallV3]
  },
  [421611 /* ArbitrumRinkeby */]: {
    multicall: [MulticallV3]
  },
  [59140 /* LineaTestnet */]: {
    multicall: [
      "0xBA736a65D287D63012caF07558CA33abC925ea64",
      "0xae2F2660EdEf3197648cC89432a197a000b97EC3"
    ]
  },
  [59144 /* LineaMainnet */]: {
    multicall: [MulticallV3]
  },
  [80001 /* POLYGON_MUMBAI */]: {
    multicall: [MulticallV3]
  },
  [421613 /* ArbitrumGoerli */]: {
    multicall: [MulticallV3]
  },
  [1442 /* POLYGON_ZKEVM */]: {
    multicall: [MulticallV3]
  },
  [5611 /* OPBNBTEST */]: {
    multicall: [MulticallV3]
  },
  [204 /* OPBNB */]: {
    multicall: [MulticallV3]
  },
  [534351 /* ScrollSepoliaTestnet */]: {
    multicall: [MulticallV3, "0xA10417e9210E8Ad2e8665e11b5E78d804956eb6E"]
  },
  [534353 /* ScrollAlphaTestnet */]: {
    multicall: [MulticallV3]
  },
  [169 /* MantaPacificMainnet */]: {
    multicall: [MulticallV3]
  },
  [3441005 /* MantaPacificTestnet */]: {
    multicall: ["0xd4E91b4401EDb2BD95791462F4ccAaae4026540D"]
  },
  [9980 /* Combo */]: {
    multicall: ["0x67c369D697C7A3B5BAE1cA9AEF0bA32F6d4d815a"]
  },
  [91715 /* ComboTestnet */]: {
    multicall: ["0x4961661f732e995133fDAa7881481BB10e424f78"]
  },
  [5e3 /* Mantle */]: {
    multicall: [MulticallV3]
  },
  [5001 /* MantleTestnet */]: {
    multicall: ["0xcA11bde05977b3631167028862bE2a173976CA11"]
  },
  [11155111 /* Sepolia */]: {
    multicall: [MulticallV3]
  }
};
var IContractName = /* @__PURE__ */ ((IContractName2) => {
  IContractName2["Lobby"] = "lobby";
  IContractName2["Card"] = "card";
  IContractName2["Points"] = "points";
  IContractName2["ZypherGameToken"] = "ZypherGameToken";
  IContractName2["Reward"] = "reward";
  IContractName2["Fee"] = "ZkBingoFee";
  IContractName2["Monster"] = "Monster";
  IContractName2["Z2048SBT"] = "Z2048SBT";
  IContractName2["ZkGame2048"] = "ZkGame2048";
  IContractName2["ZkGame2048API"] = "ZkGame2048API";
  return IContractName2;
})(IContractName || {});
var zkBingoV0 = (chainId, name) => {
  var _a, _b, _c;
  if (!chainId) {
    throw Error(`Invalid V1 'chainId' parameter '${chainId}'.`);
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    const address = (_b = (_a = zkBingoContracts) == null ? void 0 : _a[chainId]) == null ? void 0 : _b[_repo];
    let returnAddress = AddressZero;
    if (name === "lobby" /* Lobby */) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === "card" /* Card */) {
      returnAddress = address.ZkBingoCard;
    } else if (name === "points" /* Points */) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === "ZypherGameToken" /* ZypherGameToken */) {
      returnAddress = (_c = address.ZypherGameToken) != null ? _c : address.ZkBingoToken;
    } else if (name === "reward" /* Reward */) {
      returnAddress = address.Reward;
    } else if (name === "ZkBingoFee" /* Fee */) {
      returnAddress = address.ZkBingoFee;
    }
    return returnAddress ? returnAddress : AddressZero;
  } catch (e) {
    throw Error(
      `zkBingo V1 Invalid 'chainId' parameter '${chainId}', name: ${name}`
    );
  }
};
var zkBingo = (chainId, name) => {
  var _a, _b, _c;
  if (!chainId) {
    throw Error(`Invalid V1 'chainId' parameter '${chainId}'.`);
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    const address = (_b = (_a = zkBingoContractsV1) == null ? void 0 : _a[chainId]) == null ? void 0 : _b[_repo];
    let returnAddress = AddressZero;
    if (name === "lobby" /* Lobby */) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === "card" /* Card */) {
      returnAddress = address.ZkBingoCard;
    } else if (name === "points" /* Points */) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === "ZypherGameToken" /* ZypherGameToken */) {
      returnAddress = (_c = address.ZypherGameToken) != null ? _c : address.ZkBingoToken;
    } else if (name === "reward" /* Reward */) {
      returnAddress = address.Reward;
    } else if (name === "ZkBingoFee" /* Fee */) {
      returnAddress = address.ZkBingoFee;
    } else if (name === "Monster" /* Monster */) {
      returnAddress = contract[5611].contracts.MonsterSlayer202310.address;
    }
    return returnAddress ? returnAddress : AddressZero;
  } catch (e) {
    throw Error(
      `zkBingo V1 Invalid 'chainId' parameter '${chainId}', name: ${name}`
    );
  }
};

// src/utils/localStorageEffect.ts
import { DefaultValue } from "recoil";
var localStorageEffect = (key) => ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    try {
      setSelf(JSON.parse(savedValue));
    } catch (error) {
      console.error("localStorageEffect:---", error);
    }
  }
  onSet((newValue) => {
    if (newValue instanceof DefaultValue || !newValue) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

// src/hooks/useNavItem.tsx
import { useEffect as useEffect4, useMemo as useMemo2 } from "react";
import { useSetRecoilState } from "recoil";

// src/utils/i18n.ts
import i18n2 from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

// src/utils/language.ts
import { getQueryStringByName } from "mobile-browser";

// src/utils/storage.js
function Storage(prefix, expire) {
  this.prefix = prefix || "";
  if (typeof window === "undefined") {
    return console.warn("no find window");
  }
  if (expire === -1) {
    this.driver = window.sessionStorage;
  } else {
    this.driver = window.localStorage;
    this.expire = expire || 0;
  }
}
Storage.prototype = {
  constructor: Storage,
  _key(key) {
    return this.prefix + key;
  },
  keys() {
    const keys = Object.keys(this.driver);
    if (this.prefix) {
      const index = this.prefix.length;
      return keys.map(function(key) {
        return key.substring(index);
      });
    }
    return keys;
  },
  remove(key) {
    this.driver.removeItem(this._key(key));
  },
  clear() {
    this.driver.clear();
  },
  set(key, value, expire) {
    const data = {
      value
    };
    if (typeof expire === "undefined") {
      expire = this.expire;
    }
    if (expire) {
      data.expire = Date.now() + expire * 1e3;
    }
    this.driver.setItem(this._key(key), JSON.stringify(data));
  },
  get(key) {
    let data = this.driver.getItem(this._key(key));
    if (data) {
      data = JSON.parse(data);
      if (data.expire) {
        if (data.expire < Date.now()) {
          this.remove(key);
          data = null;
        }
      }
    }
    return data && data.value;
  }
};
var storage_default = new Storage(null, 10 * 365 * 24 * 60 * 60);

// src/utils/language.ts
var query = getQueryStringByName("lng");
var language = storage_default.get("language");
if (query) {
  language = query;
  storage_default.set("language", query);
  storage_default.set("lng", query);
}
if (!language) {
  if (navigator.appName === "Netscape") {
    language = navigator.language;
  } else {
    language = navigator.userLanguage;
  }
  const sec = language.split("-");
  if (sec[1]) {
    sec[1] = sec[1].toUpperCase();
    storage_default.set("language", `${sec[0]}_${sec[1]}`);
  }
}
var language_default = language;

// src/components/SideBar/component/Language.tsx
import { changeLanguage } from "i18next";

// src/utils/lodash.ts
function sample(array) {
  if (array.length === 0) {
    return void 0;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
function isEqual(value1, value2) {
  try {
    if (typeof value1 !== typeof value2) {
      return false;
    }
    if (typeof value1 !== "object" || value1 === null || value2 === null) {
      return value1 === value2;
    }
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!isEqual(value1[key], value2[key])) {
        return false;
      }
    }
    return true;
  } catch {
    return false;
  }
}

// src/components/SideBar/component/Language.tsx
import React2, { memo as memo2, useCallback, useState as useState2 } from "react";

// src/hooks/useCustomTranslation.ts
import { useTranslation as useBaseTranslation } from "react-i18next";
var useCustomTranslation = (namespaces) => {
  const { t, i18n: i18n3 } = useBaseTranslation(namespaces);
  return { t, i18n: i18n3 };
};

// src/hooks/useCurrentLanguage.ts
import i18n from "i18next";
import { useEffect, useState } from "react";
var useCurrentLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const { t } = useCustomTranslation([LngNs.common]);
  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [t("language")]);
  return currentLanguage;
};

// src/components/SideBar/component/Language.tsx
import classnames from "classnames";

// src/components/PixelBtn/PixelFlatBtn.tsx
import React, { memo } from "react";
var PixelFlatBtn = memo((props) => {
  const { onClick, children, className, style } = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: `pixel_flat_btn ${className != null ? className : ""}`,
    onClick,
    style
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_btn_bg"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_btn_top_1"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_btn_top_2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_btn_inner"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_btn_bottom_1"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_btn_bottom_2"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "pixel_flat_inner"
  }, children));
});
var PixelFlatBtn_default = PixelFlatBtn;

// src/components/SideBar/component/Language.tsx
var languageList = [
  {
    label: "English",
    keyValue: "en_US",
    img: preStaticUrl + "/img/layout/en_US.png"
  },
  {
    label: "\uD55C\uAD6D\uC5B4",
    keyValue: "ko_KR",
    img: preStaticUrl + "/img/layout/ko_KR.png"
  },
  {
    label: "\u4E2D\u6587\u7E41\u9AD4",
    keyValue: "zh_TW",
    img: preStaticUrl + "/img/layout/zh_TW.png"
  }
];
var Language = memo2(({ type }) => {
  const [show, setShow] = useState2(false);
  const lang = useCurrentLanguage();
  const { t } = useCustomTranslation([LngNs.common]);
  const handle = useCallback(() => {
    setShow(!show);
  }, [show]);
  const changeLanguageHandle = useCallback((item) => {
    changeLanguage(item.keyValue);
    setShow(false);
    storage_default.set("language", item.keyValue);
  }, []);
  return /* @__PURE__ */ React2.createElement("div", {
    className: classnames(
      type === "pixel" ? "language_pixel" : type === "top" ? "language_top" : "",
      "language"
    )
  }, /* @__PURE__ */ React2.createElement("div", {
    className: classnames("horListItem", "languageItem"),
    onClick: handle
  }, type === "top" ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("img", {
    src: preStaticUrl + `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`,
    className: "img_arr"
  }), /* @__PURE__ */ React2.createElement("img", {
    src: preStaticUrl + `/img/layout/${lang}.png`,
    className: "img_lang"
  })) : type === "pixel" ? /* @__PURE__ */ React2.createElement(PixelFlatBtn_default, {
    className: "pixel_logo"
  }, /* @__PURE__ */ React2.createElement("img", {
    src: preStaticUrl + `/img/layout/${lang}.png`,
    className: "pixel_img_lang"
  })) : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("p", null, t("language")), /* @__PURE__ */ React2.createElement("img", {
    src: preStaticUrl + `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`
  }))), show ? /* @__PURE__ */ React2.createElement("ul", {
    className: "languageItemTip"
  }, languageList.map((v) => /* @__PURE__ */ React2.createElement("li", {
    key: v.label,
    className: "languageItemOn",
    onClick: () => changeLanguageHandle(v)
  }, v.label))) : null);
}, isEqual);
var Language_default = Language;

// src/utils/i18n.ts
var _lng = language_default.split("-").join("_");
var lng = languageList.map((v) => v.keyValue).filter((v) => v === _lng).length ? _lng : "en_US";
var LngNs = {
  common: "common",
  defense: "defense",
  points: "points",
  siderBar: "siderBar",
  home: "home",
  zBingo: "zBingo",
  invitation: "invitation",
  profile: "profile",
  dp: "dp"
};
i18n2.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: "en_US",
  backend: {
    loadPath: preStaticUrl + "/i18n/{{lng}}/{{ns}}.json"
  },
  lng,
  ns: Object.values(LngNs),
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

// src/hooks/useWindowSize.ts
import { useCallback as useCallback2, useContext, useEffect as useEffect3, useState as useState3 } from "react";

// src/provider/IsMobileProvider.tsx
import React3, { createContext, useEffect as useEffect2 } from "react";
import { atom, useRecoilState } from "recoil";
var isMobileState = atom({
  key: "isMobileState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isMobileState")]
});
var isWMdState = atom({
  key: "isWMdState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMdState")]
});
var isWMd1100State = atom({
  key: "isWMd1100State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMd1100State")]
});
var isWMd1220State = atom({
  key: "isWMd1220State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMd1220State")]
});
var IsMobileContext = createContext(void 0);
var IsMdContext = createContext(void 0);
var IsMd1100Context = createContext(void 0);
var IsMd1220Context = createContext(void 0);
var IsMobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const size = useWindowSize();
  useEffect2(() => {
    const nowIsMobile = size.width < 768;
    if (isMobile !== nowIsMobile) {
      setIsMobile(nowIsMobile);
    }
  }, [size.width, isMobile]);
  return /* @__PURE__ */ React3.createElement(IsMobileContext.Provider, {
    value: isMobile
  }, children);
};
var IsMdProvider = ({ children }) => {
  const [isWMd, setIsWMd] = useRecoilState(isWMdState);
  const size = useWindowSize();
  useEffect2(() => {
    const nowIsMdMobile = size.width < 950;
    if (isWMd !== nowIsMdMobile) {
      setIsWMd(nowIsMdMobile);
    }
  }, [size.width, isWMd]);
  return /* @__PURE__ */ React3.createElement(IsMdContext.Provider, {
    value: isWMd
  }, children);
};
var IsMd1100Provider = ({ children }) => {
  const [isWMd1100, setIsWMd1100] = useRecoilState(isWMd1100State);
  const size = useWindowSize();
  useEffect2(() => {
    const nowIsMd1100Mobile = size.width < 1100;
    if (isWMd1100 !== nowIsMd1100Mobile) {
      setIsWMd1100(nowIsMd1100Mobile);
    }
  }, [size.width, isWMd1100]);
  return /* @__PURE__ */ React3.createElement(IsMd1100Context.Provider, {
    value: isWMd1100
  }, children);
};
var IsMd1220Provider = ({ children }) => {
  const [isWMd1220, setIsWMd1220] = useRecoilState(isWMd1220State);
  const size = useWindowSize();
  useEffect2(() => {
    const nowIsMd1220Mobile = size.width < 1220;
    if (isWMd1220 !== nowIsMd1220Mobile) {
      setIsWMd1220(nowIsMd1220Mobile);
    }
  }, [size.width, isWMd1220]);
  return /* @__PURE__ */ React3.createElement(IsMd1220Context.Provider, {
    value: isWMd1220
  }, children);
};

// src/hooks/useWindowSize.ts
import { useRecoilState as useRecoilState2 } from "recoil";
function useWindowSize() {
  const [size, setSize] = useState3({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  const onResize = useCallback2(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);
  useEffect3(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
}
var useIsMobile = () => {
  const [isMobile] = useRecoilState2(isMobileState);
  if (isMobile === void 0) {
    return false;
  }
  return isMobile;
};
var useIsMd1100 = () => {
  try {
    const isMd1100 = useContext(IsMd1100Context);
    if (isMd1100 === void 0) {
      return false;
    }
    return isMd1100;
  } catch (e) {
    return false;
  }
};
var useIsMd1220 = () => {
  try {
    const isMd1220 = useContext(IsMd1220Context);
    if (isMd1220 === void 0) {
      return false;
    }
    return isMd1220;
  } catch (e) {
    return false;
  }
};
var useIsMd = () => {
  try {
    const isMd = useContext(IsMdContext);
    if (isMd === void 0) {
      return false;
    }
    return isMd;
  } catch (e) {
    return false;
  }
};

// src/components/SideBar/state.ts
import { atom as atom2 } from "recoil";
var defaultSelectedKey = atom2({
  key: "defaultSelectedKeys",
  default: "",
  effects_UNSTABLE: [localStorageEffect("defaultSelectedKeys")]
});

// src/hooks/useActiveWeb3React.ts
import { useChainId } from "@my/rainbowkit";
import { useMemo } from "react";
import { useAccount, usePublicClient } from "wagmi";
function useActiveWeb3React(env, chainList2) {
  const chainId = useChainId();
  const { address } = useAccount();
  const provider = usePublicClient();
  return useMemo(() => {
    return {
      chainId: chainId && !supportedChainIds(env, chainList2).includes(chainId) ? void 0 : chainId,
      account: chainId && !supportedChainIds(env, chainList2).includes(chainId) ? void 0 : address,
      provider
    };
  }, [chainId, address, provider]);
}

// src/hooks/useNavItem.tsx
var LinkList = [
  window.location.origin + "/bingo/",
  window.location.origin + "/2048/",
  isPro() ? "https://acequest.io/zAce/" : "https://testnet.acequest.io/zAce/",
  "https://test.zypher.game/CryptoRumble/",
  "",
  "",
  ""
];
var blankLinkList = [
  false,
  true,
  true,
  true,
  false,
  false,
  false
];
var usePathname = () => {
  const isMobile = useIsMobile();
  const setDefaultSelectedKey = useSetRecoilState(defaultSelectedKey);
  useEffect4(() => {
    const path = window.location.hash.split("/");
    const pathName = path[1];
    switch (pathName) {
      case "zBingo":
        return setDefaultSelectedKey("2");
      case "profile":
        return setDefaultSelectedKey("3");
      case "gbBox":
        return setDefaultSelectedKey("4");
      case "invitation":
        return setDefaultSelectedKey("7");
      case "ranking":
        return setDefaultSelectedKey("8");
      case "defense":
        return setDefaultSelectedKey("9");
      case "shop":
        return setDefaultSelectedKey("5");
      case "dp":
        return setDefaultSelectedKey("15");
      default:
        setDefaultSelectedKey("1");
    }
  }, [location, isMobile]);
};
var useNavItem = () => {
  const { t } = useCustomTranslation([LngNs.siderBar]);
  const { chainId } = useActiveWeb3React();
  return useMemo2(() => {
    return [
      {
        label: t("Home"),
        keyValue: "1",
        icon: "home.svg",
        link: "/",
        disabled: false,
        type: "Activities" /* Activities */
      },
      {
        label: t("zBingo"),
        keyValue: "2",
        icon: "zBingo.png",
        link: `${LinkList[0]}${chainId ? chainId + "/" : ""}`,
        disabled: false,
        type: "Games" /* Games */
      },
      {
        label: t("z2048"),
        keyValue: "10",
        icon: "z2048.png",
        link: LinkList[1],
        disabled: false,
        type: "Games" /* Games */
      },
      {
        label: t("zAce"),
        keyValue: "6",
        icon: "zACE.png",
        link: LinkList[2],
        disabled: false,
        type: "Games" /* Games */
      },
      {
        label: t("Candy Crush"),
        keyValue: "12",
        icon: "Candy.png",
        link: LinkList[3],
        disabled: false,
        type: "Games" /* Games */
      },
      {
        label: t("TCG"),
        keyValue: "14",
        icon: "TCG.png",
        link: "/tcg",
        disabled: true,
        type: "Games" /* Games */
      },
      {
        label: t("zMahjong"),
        keyValue: "11",
        icon: "zMahjong.png",
        link: "/zMahjong",
        disabled: true,
        type: "Games" /* Games */
      },
      {
        label: t("Murder Mystery"),
        keyValue: "13",
        icon: "Murder.png",
        link: "/murdermystery",
        disabled: true,
        type: "Games" /* Games */
      },
      {
        label: t("Profile"),
        keyValue: "3",
        icon: "profile.svg",
        link: "/profile",
        disabled: false,
        type: "Activities" /* Activities */
      }
    ];
  }, [t, chainId]);
};

// src/components/ConnectWallet/state/connectWalletState.ts
import { atom as atom3 } from "recoil";
var connectorState = atom3({
  key: "connectorState",
  default: {
    chainId: null,
    networkError: null
  }
});
var walletModalOpenState = atom3({
  key: "walletModalOpenState",
  default: false
});
var ChainSelector = atom3({
  key: "ChainSelector",
  default: false
});
var refreshBalanceState = atom3({
  key: "refreshBalance",
  default: "0"
});
var pointsDialogState = atom3({
  key: "pointsDialog",
  default: false,
  effects_UNSTABLE: [localStorageEffect("pointsDialog")]
});
var pointsAnimState = atom3({
  key: "pointsAnim",
  default: false
});
var pointsAnimNumState = atom3({
  key: "pointsAnimNum",
  default: 0
});
var pointsWarnState = atom3({
  key: "pointsWarn",
  default: 0
});
var hidePointsWarnState = atom3({
  key: "hidePointsWarn",
  default: false,
  effects_UNSTABLE: [localStorageEffect("hidePointsWarn")]
});
var pointsRuleDialogState = atom3({
  key: "pointsRuleDialog",
  default: false
});
var accountInfoDialogState = atom3({
  key: "accountInfoDialog",
  default: false,
  effects_UNSTABLE: [localStorageEffect("accountInfoDialog")]
});
var linkToBetaDialogState = atom3({
  key: "linkToBetaDialog",
  default: false
});
var linkToBetaDialogChainIdState = atom3({
  key: "linkToBetaDialogChainIdState",
  default: void 0
});
var nativeBalanceState = atom3({
  key: "nativeBalance",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("nativeBalance")]
});
var pointsBalanceState = atom3({
  key: "pointsBalance",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("pointsBalance")]
});

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
import classnames5 from "classnames";
import React10, { memo as memo6, useEffect as useEffect5, useState as useState6 } from "react";
import { useRecoilState as useRecoilState5, useRecoilValue as useRecoilValue4 } from "recoil";

// src/components/CurrencyLogo/index.tsx
import React5, { useState as useState4 } from "react";

// src/components/icons/index.tsx
import React4 from "react";
import classnames2 from "classnames";
var Icon = (props) => {
  return /* @__PURE__ */ React4.createElement("img", {
    className: classnames2("icon", props.className),
    src: preStaticUrl + `/img/icon/${props.name}.svg`,
    alt: ""
  });
};
var icons_default = Icon;

// src/components/CurrencyLogo/index.tsx
var Logo = ({ src, alt, ...rest }) => {
  const [bad, setBad] = useState4(false);
  if (src && !bad) {
    return /* @__PURE__ */ React5.createElement("img", {
      ...rest,
      alt,
      src,
      onError: () => {
        setBad(true);
      }
    });
  }
  return /* @__PURE__ */ React5.createElement("div", {
    ...rest
  }, /* @__PURE__ */ React5.createElement(icons_default, {
    name: "help"
  }));
};
var CurrencyLogo_default = Logo;

// src/utils/tool.tsx
import BigNumber from "bignumber.js";
import { utils } from "ethers";
BigNumber.config({ EXPONENTIAL_AT: 1e9 });
var eX = (value, x) => {
  return new BigNumber(`${value}e${x}`);
};
function pow10(num, decimals = 18) {
  if (!num) {
    return new BigNumber(0);
  }
  return new BigNumber(num).dividedBy(new BigNumber(10).pow(decimals));
}
function bnPow10(num, decimals = 18) {
  if (!num) {
    return new BigNumber(0);
  }
  return new BigNumber(num).multipliedBy(new BigNumber(10).pow(decimals));
}
var formatDecimal = (number, decimal = 2) => {
  if (number === void 0) {
    return "";
  }
  let num = number.toString();
  const index = num.indexOf(".");
  if (index !== -1) {
    num = num.substring(0, decimal + index + 1);
  } else {
    num = num.substring(0);
  }
  return parseFloat(num).toFixed(decimal);
};
var formatMoney = (value, n = 2) => {
  try {
    if (isNaN(Number(value))) {
      return Number(0).toFixed(n > 0 ? n : 0);
    }
    if (value === 0 || value === "0") {
      return Number(0).toFixed(n);
    }
    const isNegative = Number(value) < 0;
    const v = formatDecimal(Math.abs(Number(value)), n > 0 ? n : 0);
    const l = v.split(".")[0].split("").reverse();
    const r = v.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
    }
    let res = t.split("").reverse().join("");
    if (r && r !== "00") {
      res += `.${r.replace(/0+$/, "")}`;
    }
    return `${isNegative ? "-" : ""}${res}`;
  } catch (e) {
    console.error("formatMoney:", e);
    return "";
  }
};
function getShortenAddress(address, preLen = 6, endLen = 4) {
  if (!address) {
    return "";
  }
  const firstCharacters = address.substring(0, preLen);
  const lastCharacters = address.substring(
    address.length - endLen,
    address.length
  );
  return `${firstCharacters}...${lastCharacters}`;
}
function getShortenAddress2(address) {
  const firstCharacters = address.substring(0, 10);
  const lastCharacters = address.substring(address.length - 10, address.length);
  return `${firstCharacters}****${lastCharacters}`;
}
function filterInput(val) {
  const v = val.replace("-", "").replace(/^\.+|[^\d.]/g, "").replace(/^0\d+\./g, "0.").replace(/\.{6,}/, "").replace(/^0(\d)/, "$1").replace(/^(\-)*(\d+)\.(\d{0,6}).*$/, "$1$2.$3");
  return Number(v) >= 0 ? v : "";
}
var convertToLargeNumberRepresentation = (value) => {
  if (!value) {
    return "0";
  } else if (+value >= 1e5) {
    return `${eX(value.toString(), -6)}M`;
  } else if (+value >= 100) {
    return `${eX(value.toString(), -3)}K`;
  } else {
    return value.toString();
  }
};
var tCanvas;
function measureText(text, font) {
  const canvas = tCanvas || (tCanvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  return 0;
}
var splitArrByLen = (arr, len) => {
  const t = [];
  let index = 0;
  while (index < arr.length) {
    t.push(arr.slice(index, index += len));
  }
  return t;
};
var Units = [
  ["B", 1e9],
  ["M", 1e6],
  ["K", 1e3]
];
function formatCurrency(amount, precision = 2) {
  var _a;
  const [unit, base] = (_a = Units.find(
    ([, min]) => Number(amount) >= Number(min)
  )) != null ? _a : ["", 1];
  return `${utils.commify(
    (amount / base).toFixed(precision)
  )}${unit}`;
}
function formatSymbol(symbol) {
  return symbol ? symbol === "WTT" ? symbol.replace(/W/, "") : symbol.replace(/TT-/, "") : "";
}

// src/hooks/usePoint.ts
import BigNumberjs2 from "bignumber.js";

// src/hooks/useAccountInvitation.ts
import { atom as atom4, useRecoilValue, useSetRecoilState as useSetRecoilState2 } from "recoil";
import { useCallback as useCallback3 } from "react";

// src/utils/request.ts
import axios from "axios";
axios.defaults.withCredentials = false;
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  throw error;
}
async function request(reqUrl, options = { method: "GET" }) {
  const response = await axios(reqUrl, options).then(checkStatus).catch((err) => {
    throw err;
  });
  return response;
}

// src/hooks/useAccountInvitation.ts
var invitationAddressState = atom4({
  key: "invitationAddressState",
  default: void 0,
  effects_UNSTABLE: [localStorageEffect("invitationAddressState")]
});
var getApilUrl = (env) => {
  const apiPre = env === "develop" ? "https://testapi.zypher.game" : "https://api.zypher.game";
  return {
    accountInfo: apiPre + `/user/getone`,
    accountListInfo: apiPre + `/user/getmulti`,
    accountInfoUpdate: apiPre + `/user/infoupdate`
  };
};
var useAccountInvitation = (env) => {
  const { chainId, account } = useActiveWeb3React();
  const invitationAddres = useRecoilValue(
    invitationAddressState
  );
  const setInvitationAddressState = useSetRecoilState2(invitationAddressState);
  const postAccountUpdate = useCallback3(
    async ({ tx }) => {
      try {
        if (tx.status === txStatus) {
          const params = {
            user_addr: account,
            chain_id: `${chainId}`,
            tx_hash: tx.transactionHash
          };
          if (invitationAddres && invitationAddres.address !== "" && invitationAddres.address.toLowerCase() !== params.user_addr.toLowerCase()) {
            params.sharer_addr = invitationAddres == null ? void 0 : invitationAddres.address;
          }
          const apiUrl = getApilUrl(env);
          const res = await request(apiUrl.accountInfoUpdate, {
            method: "POST",
            data: JSON.stringify(params),
            headers: {
              "Content-Type": "application/json"
            }
          });
          if (res.data && res.data["code"] == 200 && `${res.data.data}` === "1") {
            setInvitationAddressState(void 0);
          }
        }
      } catch (e) {
        console.error("PostAccountUpdate Error", e);
      }
    },
    [chainId, account, invitationAddres]
  );
  return {
    postAccountUpdate
  };
};

// src/hooks/usePoint.ts
import { useCallback as useCallback5, useState as useState5 } from "react";
import { useRecoilState as useRecoilState3, useRecoilValue as useRecoilValue2, useSetRecoilState as useSetRecoilState3 } from "recoil";

// src/hooks/usePublicNodeWaitForTransaction.ts
import { useCallback as useCallback4 } from "react";
import { waitForTransaction } from "wagmi/actions";

// src/rainbow/rainbow.ts
import {
  bitgetWallet,
  metaMaskWallet,
  okxWallet,
  tokenPocketWallet,
  walletConnectWallet,
  connectorsForWallets
} from "@my/rainbowkit";
import { createPublicClient, fallback, http } from "viem";
import { configureChains, createConfig } from "wagmi";
import * as chainList from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import { ParticleNetwork } from "@particle-network/auth";
var WagmiChainList = Object.values(chainList);
var getSupportedChainIdList = (env, chainIdList) => {
  return supportedChainIds(env, chainIdList).map((chainId) => {
    var _a;
    const chainFilter = WagmiChainList.filter((v) => v.id === chainId);
    if (chainFilter && chainFilter.length) {
      const chainLocal = chainFilter[0];
      return chainLocal;
    }
    return {
      id: chainId,
      name: ChainName[chainId],
      network: ChainNetworkName[chainId],
      nativeCurrency: {
        name: `${Currency[chainId]}`,
        symbol: `${Currency[chainId]}`,
        decimals: 18
      },
      rpcUrls: {
        default: {
          http: ChainRpcUrls[chainId],
          webSocket: ChainRpcWebSocketUrls[chainId]
        },
        public: {
          http: ChainRpcUrls[chainId],
          webSocket: ChainRpcWebSocketUrls[chainId]
        }
      },
      blockExplorers: {
        default: {
          name: `${ChainName[chainId]} Explorer`,
          url: (_a = sample(BlockExplorerUrls[chainId])) != null ? _a : ""
        }
      },
      testnet: isTestnet[chainId]
    };
  });
};
new ParticleNetwork({
  appId: "a2ecac32-b520-477a-abf6-4fa8cdfcc046",
  clientKey: "clITVBUqxtJzy2ymp8z4SQOUFWIc5qPUUHPks8ap",
  projectId: "763e083a-deb5-4fe9-8b7a-2a9c56659199"
});
var getConfigureChains = (env, chainIdList) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    getSupportedChainIdList(env, chainIdList),
    [publicProvider()]
  );
  return { chains, publicClient, webSocketPublicClient };
};
var projectId = "bc467c124a7a7a8ce06a41ef40b1b842";
var getConnectors = (env, chainIdList) => {
  const { chains } = getConfigureChains(env, chainIdList);
  return connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet({ projectId, chains }),
        particleWallet({ chains }),
        walletConnectWallet({ projectId, chains })
      ]
    },
    {
      groupName: "More",
      wallets: [
        bitgetWallet({ projectId, chains }),
        okxWallet({ projectId, chains }),
        tokenPocketWallet({ projectId, chains }),
        ...[
          particleWallet({ chains, authType: "google" }),
          particleWallet({ chains, authType: "facebook" }),
          particleWallet({ chains, authType: "apple" })
        ]
      ]
    }
  ]);
};
var getWagmiConfig = (env, chainIdList) => {
  const connectors = getConnectors(env, chainIdList);
  const { publicClient, webSocketPublicClient } = getConfigureChains(
    env,
    chainIdList
  );
  return createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
  });
};
var viemClients = (env) => {
  const { chains } = getConfigureChains(env);
  return chains.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.id]: createPublicClient({
        chain: cur,
        transport: fallback(
          ChainRpcUrls[cur.id].map(
            (url) => http(url, {
              timeout: 15e3
            })
          ),
          {
            rank: false
          }
        ),
        batch: {
          multicall: {
            batchSize: cur.id === 1442 /* POLYGON_ZKEVM */ ? 128 : 1024 * 200
          }
        }
      })
    };
  }, {});
};
var getViemClients = ({
  env,
  chainId
}) => {
  return viemClients(env)[chainId];
};

// src/hooks/useActiveChainId.ts
import { useNetwork } from "wagmi";
var useActiveChainId = (env) => {
  var _a;
  const { chain } = useNetwork();
  const chainId = (_a = chain == null ? void 0 : chain.id) != null ? _a : void 0;
  const isError = !Object.values(supportedChainIds(env)).includes(
    Number(chainId)
  );
  return {
    chainId,
    isWrongNetwork: isError
  };
};

// src/hooks/usePublicNodeWaitForTransaction.ts
function usePublicNodeWaitForTransaction(env) {
  const { chainId } = useActiveChainId(env);
  const waitForTransaction_ = useCallback4(
    async (opts) => {
      if (!chainId) {
        return void 0;
      }
      const viemClients2 = viemClients(env);
      if (viemClients2[chainId]) {
        return viemClients2[chainId].waitForTransactionReceipt(opts);
      }
      return waitForTransaction({ ...opts, chainId });
    },
    [chainId]
  );
  return {
    waitForTransaction: waitForTransaction_
  };
}

// src/hooks/usePoint.ts
import { useWalletClient } from "wagmi";

// src/contract/bingoPoints.ts
import abi from "@zypher-game/bingo-periphery-v1/abi/ZkBingoPoints.json";

// src/connectors/contractV2.ts
import { AddressZero as AddressZero2 } from "@ethersproject/constants";
import { ethers, utils as utils2 } from "ethers";
import {
  getContract as viemGetContract
} from "viem";
var Contract = ethers.Contract;
var getAddress = utils2.getAddress;
var getContract = ({
  abi: abi2,
  address,
  chainId,
  publicClient,
  signer,
  env
}) => {
  const c = viemGetContract({
    abi: abi2,
    address,
    publicClient: publicClient != null ? publicClient : getViemClients({ env, chainId }),
    walletClient: signer
  });
  return {
    ...c,
    account: signer == null ? void 0 : signer.account,
    chain: signer == null ? void 0 : signer.chain
  };
};
function isAddress(value) {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}
function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}
function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}
var getContractFromRpc = async ({
  address,
  abi: abi2,
  library,
  account
}) => {
  if (!isAddress(address) || address === AddressZero2) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(
    address,
    abi2,
    getProviderOrSigner(library, account)
  );
};

// src/contract/bingoPoints.ts
var ZkBingoPointsContract = (chainId, env, address, signer) => {
  return getContract({
    env,
    abi,
    address: address != null ? address : zkBingo(chainId, "points" /* Points */),
    signer,
    chainId
  });
};
var bingoPoints_default = ZkBingoPointsContract;

// src/hooks/usePoint.ts
import { ethers as ethers2 } from "ethers";
var ChainPointPrice = {
  [59144 /* LineaMainnet */]: 1 / 2e6,
  [59140 /* LineaTestnet */]: 1 / 2e6,
  [204 /* OPBNB */]: 1 / 25e4,
  [5611 /* OPBNBTEST */]: 1 / 25e4
};
var pointsListDefault = (chainId) => {
  try {
    return [
      ["1000"],
      ["10000"],
      ["30000"],
      ["50000"],
      ["80000"],
      ["100000 ", "2"],
      ["300000", "5"],
      ["500000", "10"]
    ].map((v, index) => {
      const chainPrice = ChainPointPrice[chainId];
      const price = v[1] ? new BigNumberjs2(chainPrice).times(v[0]).times((100 - Number(v[1])) * 0.01).toFixed(8) : new BigNumberjs2(chainPrice).times(v[0]).toFixed(8);
      const priceStr = formatMoney(Number(price), 8);
      const pointAmountStr = formatMoney(Number(v[0]));
      return {
        index: index + 1,
        pointAmount: v[0],
        pointAmountStr,
        price,
        priceStr,
        discount: v[1]
      };
    });
  } catch (e) {
    console.error("pointsListDefault: ", e);
  }
  return void 0;
};
var useSwapPoint = ({
  env,
  dispatch,
  setSuccessToast,
  setErrorToast
}) => {
  const { account, chainId } = useActiveWeb3React();
  const { postAccountUpdate } = useAccountInvitation(env);
  const [isLoading, setIsLoading] = useState5(false);
  const setPointsDialogOpen = useSetRecoilState3(pointsDialogState);
  const setPointsAnimNumState = useSetRecoilState3(pointsAnimNumState);
  const [refreshBalance, setRefreshBalanceState] = useRecoilState3(refreshBalanceState);
  const { waitForTransaction: waitForTransaction2 } = usePublicNodeWaitForTransaction(env);
  const hidePointsWarn = useRecoilValue2(hidePointsWarnState);
  const [pointsWarn, setPointsWarn] = useRecoilState3(pointsWarnState);
  const [choseIndex, setChoseIndex] = useState5();
  const { data: walletClient } = useWalletClient();
  const swapPointHandle = useCallback5(
    async (index) => {
      if ((pointsWarn === 1 || hidePointsWarn) && walletClient) {
        const _index = choseIndex || choseIndex === 0 ? choseIndex : index;
        if (_index || _index === 0) {
          setPointsWarn(2);
          try {
            const pointsList = pointsListDefault(chainId);
            if (pointsList) {
              const v = pointsList[_index];
              setIsLoading(true);
              const pointsContract = bingoPoints_default(
                chainId,
                env,
                void 0,
                walletClient
              );
              if (!chainId || !pointsContract) {
                setPointsDialogOpen(false);
                if (!pointsContract) {
                  setErrorToast(dispatch, "PointsContract is not ready");
                }
                return;
              }
              const lobbyContractAddress = zkBingo(
                chainId,
                "lobby" /* Lobby */
              );
              const res = await pointsContract.write.nativeSwap(
                [lobbyContractAddress, v.index],
                {
                  value: ethers2.utils.parseEther(v.price),
                  account
                }
              );
              const hash = typeof res === "string" ? res : res.hash;
              const nativeSwapTx = await waitForTransaction2({ confirmations: 1, hash });
              if (nativeSwapTx && nativeSwapTx.status === txStatus) {
                setPointsAnimNumState(1);
                setSuccessToast(dispatch, {
                  title: "",
                  message: "Recharge successful"
                });
                setTimeout(() => {
                  setPointsDialogOpen(false);
                  postAccountUpdate({ tx: nativeSwapTx });
                  setRefreshBalanceState(refreshBalance + 1);
                }, 500);
              } else {
                throw Object.assign(
                  new Error("NativeSwap Transaction Failed"),
                  { name: "NativeSwap" }
                );
              }
            } else {
              throw Object.assign(new Error("Not pointsList"), {
                name: "NativeSwap"
              });
            }
          } catch (e) {
            setErrorToast(dispatch, e);
            console.error("swapPointHandle: ", e);
          } finally {
            setIsLoading(false);
          }
        } else {
          setPointsWarn(0);
        }
      } else {
        setChoseIndex(index);
        setPointsWarn(1);
      }
    },
    [
      account,
      choseIndex,
      hidePointsWarn,
      pointsWarn,
      chainId,
      refreshBalance,
      walletClient
    ]
  );
  return { isLoading, swapPointHandle };
};

// src/components/ConnectWallet/hooks/connectWalletHooks.ts
import { useMemo as useMemo3 } from "react";
import { useRecoilValue as useRecoilValue3 } from "recoil";
var useNativeBalanceStr = () => {
  const nativeBalance = useRecoilValue3(nativeBalanceState);
  return useMemo3(() => {
    return formatMoney(nativeBalance, 2);
  }, [nativeBalance]);
};
var usePointsBalanceStr = () => {
  const pointsBalance = useRecoilValue3(pointsBalanceState);
  return useMemo3(() => {
    return formatMoney(pointsBalance, 0);
  }, [pointsBalance]);
};

// src/components/ConnectWallet/components/DialogComponents/DialogTitle.tsx
import classnames3 from "classnames";
import React6, { memo as memo3, useCallback as useCallback6 } from "react";
var DialogTitle = memo3(
  ({ label, setDialogOpen, children, classNames }) => {
    const closeHandle = useCallback6(() => {
      setDialogOpen(false);
    }, [setDialogOpen]);
    return /* @__PURE__ */ React6.createElement("div", {
      className: classnames3("dialog_title_modalTitleInner", classNames)
    }, /* @__PURE__ */ React6.createElement("p", {
      className: "dialog_title_title"
    }, label), children ? children : null, /* @__PURE__ */ React6.createElement("span", {
      onClick: closeHandle
    }, /* @__PURE__ */ React6.createElement(icons_default, {
      name: "close"
    })));
  }
);
var DialogTitle_default = DialogTitle;

// src/components/ConnectWallet/components/PointsDialog/PoinsWarn.tsx
import React7, { memo as memo4 } from "react";
import { useRecoilState as useRecoilState4 } from "recoil";
var PoinsWarn = memo4(({ handleNext }) => {
  const { t } = useCustomTranslation([LngNs.points]);
  const [hidePointsWarn, setHidePointsWarn] = useRecoilState4(hidePointsWarnState);
  return /* @__PURE__ */ React7.createElement("div", {
    className: "points_dialog_dialogContainer"
  }, /* @__PURE__ */ React7.createElement("p", null, t("poinsWarnText01")), /* @__PURE__ */ React7.createElement("p", null, /* @__PURE__ */ React7.createElement("em", null), /* @__PURE__ */ React7.createElement("i", null, t("poinsWarnText02")), /* @__PURE__ */ React7.createElement("br", null), /* @__PURE__ */ React7.createElement("em", null), /* @__PURE__ */ React7.createElement("i", null, t("poinsWarnText03"))), /* @__PURE__ */ React7.createElement("p", null, t("poinsWarnText04")), /* @__PURE__ */ React7.createElement("p", {
    className: "points_dialog_flex",
    onClick: () => setHidePointsWarn(!hidePointsWarn)
  }, /* @__PURE__ */ React7.createElement(icons_default, {
    name: hidePointsWarn ? "checked" : "check"
  }), t("poinsWarnText05")), /* @__PURE__ */ React7.createElement("button", {
    className: "points_dialog_btn",
    onClick: handleNext
  }, t("Ok")));
}, isEqual);
var PoinsWarn_default = PoinsWarn;

// src/components/icons/PointsIcon/PointsIcon.tsx
import React8 from "react";
import { memo as memo5 } from "react";
import styled from "styled-components";
var PointsImg = styled.img`
  display: inline-block;
  width: ${({ isMobile }) => isMobile ? "20px" : "30px"};
  margin-left: ${({ isMobile }) => isMobile ? "4px" : "10px"};
`;
var PointsIcon = memo5(
  ({ isMobile, classname }) => {
    return /* @__PURE__ */ React8.createElement(PointsImg, {
      isMobile,
      src: preStaticUrl + `/img/home/data_points.svg`,
      alt: "",
      className: classname
    });
  },
  isEqual
);

// src/components/Modal/Modal.tsx
import React9 from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import classnames4 from "classnames";
var Modal = ({
  open,
  onCancel,
  footer,
  wrapClassName,
  destroyOnClose,
  closable,
  width,
  centered,
  transitionName,
  children
}) => {
  return /* @__PURE__ */ React9.createElement(DialogOverlay, {
    isOpen: open,
    onDismiss: onCancel,
    className: classnames4("customDialog", "bottom", wrapClassName),
    "aria-label": "Modal"
  }, /* @__PURE__ */ React9.createElement(DialogContent, {
    style: { width }
  }, children));
};
var Modal_default = Modal;

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
var PointsDialog = memo6(
  ({ env, dispatch, setSuccessToast, setErrorToast }) => {
    const { t } = useCustomTranslation([LngNs.points]);
    const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState5(pointsDialogState);
    const pointsWarn = useRecoilValue4(pointsWarnState);
    const { chainId } = useActiveWeb3React();
    const pointsBalanceStr = usePointsBalanceStr();
    const isMobile = useIsMobile();
    const [pointsList, setPointsList] = useState6([]);
    const { isLoading, swapPointHandle } = useSwapPoint({
      env,
      dispatch,
      setSuccessToast,
      setErrorToast
    });
    useEffect5(() => {
      if (chainId) {
        setTimeout(() => {
          const list = pointsListDefault(chainId);
          if (list) {
            setPointsList(list);
          }
        }, 800);
      }
    }, [chainId]);
    return /* @__PURE__ */ React10.createElement(Modal_default, {
      open: pointsDialogOpen,
      onCancel: () => setPointsDialogOpen(false),
      footer: null,
      wrapClassName: classnames5("customDialog", "bottom", "dialog"),
      width: isMobile ? "100%" : 604,
      destroyOnClose: true,
      closable: false,
      centered: isMobile ? false : true,
      transitionName: isMobile ? "ant-slide-down" : void 0
    }, /* @__PURE__ */ React10.createElement(DialogTitle_default, {
      label: t("Recharge Points"),
      setDialogOpen: setPointsDialogOpen,
      classNames: "modalTitleInner"
    }), /* @__PURE__ */ React10.createElement("div", {
      className: "modalMain"
    }, pointsWarn === 1 ? /* @__PURE__ */ React10.createElement(PoinsWarn_default, {
      isLoading,
      handleNext: swapPointHandle
    }) : isLoading ? /* @__PURE__ */ React10.createElement(IsLoading, null) : /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("div", {
      className: "balanceTitle"
    }, /* @__PURE__ */ React10.createElement("p", null, t("Balance"), ": ", /* @__PURE__ */ React10.createElement("strong", null, pointsBalanceStr)), /* @__PURE__ */ React10.createElement(PointsIcon, {
      isMobile,
      classname: "pointsIcon"
    })), /* @__PURE__ */ React10.createElement(PointsTable, {
      pointsList,
      chainId,
      onClick: swapPointHandle
    }))));
  },
  isEqual
);
var IsLoading = memo6(() => {
  const { t } = useCustomTranslation([LngNs.points]);
  return /* @__PURE__ */ React10.createElement("div", {
    className: "loading"
  }, /* @__PURE__ */ React10.createElement(icons_default, {
    name: "loading02"
  }), /* @__PURE__ */ React10.createElement("p", null, t("IsLoadingText1")));
}, isEqual);
var PointsTable = memo6(
  ({ pointsList, chainId, onClick }) => {
    return /* @__PURE__ */ React10.createElement("div", {
      className: "table"
    }, pointsList.map((v, index) => /* @__PURE__ */ React10.createElement("div", {
      className: classnames5("points", `points_${v.index}`),
      key: v.index,
      onClick: () => onClick(index)
    }, /* @__PURE__ */ React10.createElement("h3", null, v.pointAmountStr), /* @__PURE__ */ React10.createElement("img", {
      className: "points_img",
      src: preStaticUrl + `/img/points/points_${v.index}.png`,
      alt: "points"
    }), /* @__PURE__ */ React10.createElement("div", {
      className: "bottom"
    }, /* @__PURE__ */ React10.createElement("p", null, v.priceStr), /* @__PURE__ */ React10.createElement(CurrencyLogo_default, {
      className: "img",
      src: CurrencyLogo[chainId || 97]
    })), v.discount && /* @__PURE__ */ React10.createElement("div", {
      className: "discount"
    }, /* @__PURE__ */ React10.createElement("img", {
      className: "discount_img",
      src: preStaticUrl + `/img/points/discord.svg`,
      alt: "points"
    }), /* @__PURE__ */ React10.createElement("p", null, v.discount, "% ", /* @__PURE__ */ React10.createElement("br", null), "OFF")))));
  },
  isEqual
);
var PointsDialog_default = PointsDialog;

// src/components/SideBar/index.tsx
import classnames7 from "classnames";
import React18, { memo as memo13, useMemo as useMemo6 } from "react";

// src/components/SideBar/component/CommunityLink.tsx
import React12, { memo as memo7 } from "react";

// src/components/SvgComponent/SvgComponent.tsx
import React11, { useEffect as useEffect6, useState as useState7 } from "react";
var SvgComponent = ({ src, className, ...rest }) => {
  const [svgContent, setSvgContent] = useState7(null);
  useEffect6(() => {
    (async () => {
      try {
        const response = await fetch(src);
        if (!response.ok)
          throw new Error("Failed to load SVG");
        const text = await response.text();
        const wrapper = document.createElement("div");
        wrapper.innerHTML = text;
        const svgElement = wrapper.querySelector("svg");
        if (svgElement) {
          const Component = () => /* @__PURE__ */ React11.createElement("span", {
            className: `svg_component ${className != null ? className : ""}`,
            ...rest,
            dangerouslySetInnerHTML: { __html: svgElement.outerHTML }
          });
          setSvgContent(Component);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [src]);
  return svgContent || /* @__PURE__ */ React11.createElement(React11.Fragment, null);
};
var SvgComponent_default = SvgComponent;

// src/components/SideBar/component/CommunityLink.tsx
var CommunityLink = memo7(({ className }) => {
  return /* @__PURE__ */ React12.createElement("div", {
    className
  }, /* @__PURE__ */ React12.createElement("a", {
    href: "https://twitter.com/Zypher_Games",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React12.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/twitter.svg"
  })), /* @__PURE__ */ React12.createElement("a", {
    href: "https://discord.com/invite/MKJZhS4p2T",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React12.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/discord.svg"
  })), /* @__PURE__ */ React12.createElement("a", {
    href: "https://zyphergames.substack.com",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React12.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/medium.svg"
  })), /* @__PURE__ */ React12.createElement("a", {
    href: "https://github.com/zypher-game",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React12.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/github.svg"
  })), /* @__PURE__ */ React12.createElement("a", {
    href: "https://zyphergames.notion.site/Zypher-Games-101-58f3fc6362dc473db187dcec0b63e74e",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React12.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/gitbook.svg"
  })));
}, isEqual);
var CommunityLink_default = CommunityLink;

// src/components/SideBar/component/LinkItemA.tsx
import classnames6 from "classnames";
import React14, { memo as memo9, useCallback as useCallback7, useMemo as useMemo4 } from "react";
import { useRecoilValue as useRecoilValue5, useSetRecoilState as useSetRecoilState4 } from "recoil";

// src/components/Header/state.ts
import { atom as atom5 } from "recoil";
var siderCollapseState = atom5({
  key: "siderCollapseState",
  default: void 0,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")]
});

// src/components/SideBar/component/SmokeIndex.tsx
import React13, { memo as memo8 } from "react";
var SmokeIndex = memo8(() => {
  return /* @__PURE__ */ React13.createElement("div", {
    className: "h"
  }, /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React13.createElement("div", {
    className: "c"
  }));
}, isEqual);
var SmokeIndex_default = SmokeIndex;

// src/components/SideBar/component/LinkItemA.tsx
var useLink = (link, isMobile, useNavigate) => {
  const selectedKey = useRecoilValue5(defaultSelectedKey);
  const setDefaultSelectedKey = useSetRecoilState4(defaultSelectedKey);
  const setSiderCollapse = useSetRecoilState4(siderCollapseState);
  const navigate = useNavigate();
  const isOn = useMemo4(() => {
    if (selectedKey === link.keyValue) {
      return true;
    }
    return false;
  }, [selectedKey]);
  const linkClickHandle = useCallback7(
    (event) => {
      if (link.disabled) {
        return;
      }
      event.preventDefault();
      if (isMobile) {
        setSiderCollapse(true);
      }
      setTimeout(() => {
        try {
          if (link.link.indexOf("http") > -1) {
            window.open(link.link, "_blank");
          } else {
            setDefaultSelectedKey(link.keyValue);
            navigate(link.link);
          }
        } catch (e) {
          window.location.href = "/#" + link.link;
        }
      }, 200);
    },
    [navigate, isMobile]
  );
  return {
    isOn,
    linkClickHandle
  };
};
var LinkItem1 = memo9(
  ({
    className,
    className_on,
    isMobile,
    className_disable,
    className_imageContainer,
    useNavigate,
    ...link
  }) => {
    const { isOn, linkClickHandle } = useLink(link, isMobile, useNavigate);
    return /* @__PURE__ */ React14.createElement("div", {
      onClick: linkClickHandle,
      className: classnames6(
        className,
        link.disabled ? className_disable : "",
        isOn ? className_on : ""
      )
    }, /* @__PURE__ */ React14.createElement("div", {
      className: className_imageContainer
    }, /* @__PURE__ */ React14.createElement("img", {
      src: preStaticUrl + `/img/layout/${link.icon}`
    })), /* @__PURE__ */ React14.createElement("p", null, link.label), isOn ? /* @__PURE__ */ React14.createElement(SmokeIndex_default, null) : null);
  },
  isEqual
);
var LinkItemA_default = LinkItem1;

// src/components/SideBar/component/SideBarActivitiesList.tsx
import React15, { memo as memo10, useMemo as useMemo5 } from "react";
var SideBarActivitiesList = memo10(
  ({
    className_on,
    className_list,
    className_listItemHorDisable,
    className_listItemHor,
    className_listItemVerDisable,
    className_listItemVer,
    list,
    isMobile,
    useNavigate
  }) => {
    const { listItemDisable, listItem } = useMemo5(() => {
      if (isMobile) {
        return {
          listItemDisable: className_listItemVerDisable,
          listItem: className_listItemVer
        };
      }
      return {
        listItemDisable: className_listItemHorDisable,
        listItem: className_listItemHor
      };
    }, [isMobile]);
    return /* @__PURE__ */ React15.createElement("div", {
      className: className_list
    }, list.map((v) => /* @__PURE__ */ React15.createElement(LinkItemA_default, {
      useNavigate,
      className_on,
      className_disable: listItemDisable,
      isMobile,
      key: v.keyValue,
      className: listItem,
      ...v
    })));
  },
  isEqual
);
var SideBarActivitiesList_default = SideBarActivitiesList;

// src/components/SideBar/component/SideBarGamesList.tsx
import React16, { memo as memo11 } from "react";
var SideBarGamesList = memo11(
  ({
    className_on,
    className_list,
    className_listItemDisable,
    className_listItem,
    className_imageContainer,
    useNavigate,
    list,
    isMobile
  }) => {
    return /* @__PURE__ */ React16.createElement("div", {
      className: className_list
    }, list.map((v) => /* @__PURE__ */ React16.createElement(LinkItemA_default, {
      useNavigate,
      isMobile,
      className_on,
      className_disable: className_listItemDisable,
      key: v.keyValue,
      className: className_listItem,
      className_imageContainer,
      ...v
    })));
  },
  isEqual
);
var SideBarGamesList_default = SideBarGamesList;

// src/components/SideBar/component/SideBarTitle.tsx
import React17, { memo as memo12 } from "react";
var SideBarTitle = memo12(
  ({ className, logo_url_name, logo_title }) => {
    const { t } = useCustomTranslation([LngNs.siderBar]);
    return /* @__PURE__ */ React17.createElement("div", {
      className
    }, /* @__PURE__ */ React17.createElement("img", {
      src: preStaticUrl + `/img/layout/${logo_url_name}.svg`,
      title: t(logo_title)
    }), /* @__PURE__ */ React17.createElement("p", null, t(logo_title)));
  },
  isEqual
);
var SideBarTitle_default = SideBarTitle;

// src/components/SideBar/index.tsx
var ZypherLogo = memo13(({ isMobile }) => {
  return /* @__PURE__ */ React18.createElement("a", {
    href: "/",
    target: "_black",
    className: "zypher_logo"
  }, isMobile ? /* @__PURE__ */ React18.createElement("img", {
    src: preStaticUrl + "/img/layout/logo-min.svg"
  }) : /* @__PURE__ */ React18.createElement("img", {
    src: preStaticUrl + "/img/tvl/logo.svg"
  }), /* @__PURE__ */ React18.createElement("img", {
    src: preStaticUrl + "/img/layout/ai.svg"
  }));
});
var SideBar = (props) => {
  const { isMobile, useNavigate } = props;
  const items = useNavItem();
  usePathname();
  const {
    sideBarGamesLinkList,
    sideBarActivitiesLinkList
  } = useMemo6(() => {
    return {
      sideBarGamesLinkList: items.filter((v) => v.type === "Games" /* Games */),
      sideBarActivitiesLinkList: items.filter(
        (v) => !isMobile ? v.type === "Activities" /* Activities */ && v.keyValue !== "1" : v.type === "Activities" /* Activities */
      )
    };
  }, [items, isMobile]);
  return /* @__PURE__ */ React18.createElement("div", {
    className: classnames7(`${props.className}`, "sidebarWrap")
  }, /* @__PURE__ */ React18.createElement("div", {
    className: "sidebar"
  }, isMobile ? null : /* @__PURE__ */ React18.createElement(React18.Fragment, null, /* @__PURE__ */ React18.createElement(LinkItemA_default, {
    className_on: "item_on",
    className_disable: "horListItemDisable",
    className: "horListItem",
    isMobile,
    useNavigate,
    ...items[0]
  }), /* @__PURE__ */ React18.createElement("div", {
    className: "line"
  })), /* @__PURE__ */ React18.createElement(SideBarTitle_default, {
    logo_title: "Games",
    logo_url_name: "games",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React18.createElement(SideBarGamesList_default, {
    className_on: "item_on",
    className_list: "gamelist",
    className_listItem: "verListItem",
    className_listItemDisable: "verListItemDisable",
    list: sideBarGamesLinkList,
    isMobile,
    useNavigate,
    className_imageContainer: "imageContainerWaves"
  }), /* @__PURE__ */ React18.createElement("div", {
    className: "line"
  }), /* @__PURE__ */ React18.createElement(SideBarTitle_default, {
    logo_title: "Activities",
    logo_url_name: "activities",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React18.createElement(SideBarActivitiesList_default, {
    useNavigate,
    isMobile,
    className_on: "item_on",
    className_list: "activitiesList",
    className_listItemHorDisable: "horListItemDisable",
    className_listItemHor: "horListItem",
    className_listItemVerDisable: "verListItemDisable",
    className_listItemVer: "verListItem",
    list: sideBarActivitiesLinkList
  }), /* @__PURE__ */ React18.createElement("div", {
    className: "line"
  }), /* @__PURE__ */ React18.createElement(SideBarTitle_default, {
    logo_title: "Language",
    logo_url_name: "language",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React18.createElement(Language_default, {
    type: "side"
  }), /* @__PURE__ */ React18.createElement("div", {
    className: "line"
  }), /* @__PURE__ */ React18.createElement(SideBarTitle_default, {
    logo_title: "Links",
    logo_url_name: "links",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React18.createElement(CommunityLink_default, {
    className: "communityLink"
  })));
};
var SideBar_default = SideBar;

// src/components/DivWrap/DivWrap.tsx
import React19, { memo as memo14 } from "react";
var DivWrap = memo14(
  ({
    className,
    showDiv,
    children
  }) => {
    return showDiv ? /* @__PURE__ */ React19.createElement("div", {
      className
    }, " ", children) : /* @__PURE__ */ React19.createElement(React19.Fragment, null, children);
  },
  isEqual
);
var DivWrap_default = DivWrap;

// src/components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog.tsx
import { WarningOutlined } from "@ant-design/icons";
import classnames8 from "classnames";
import React20, { memo as memo15, useCallback as useCallback8, useEffect as useEffect7, useMemo as useMemo7 } from "react";
import { useRecoilState as useRecoilState6 } from "recoil";
import styled2 from "styled-components";

// src/components/ConnectWallet/components/linkToBetaDialog/localPathUrl.ts
var getChainNameText = (chainId) => {
  let text = "Beta";
  if (chainId === 91715 /* ComboTestnet */) {
    text = "Combo";
  } else if (chainId === 169 /* MantaPacificMainnet */ || chainId === 3441005 /* MantaPacificTestnet */) {
    text = "Manta";
  } else if (chainId === 5e3 /* Mantle */ || chainId === 5001 /* MantleTestnet */) {
    text = "Mantle";
  }
  return [text.toLowerCase(), text];
};

// src/components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog.tsx
var Content = styled2.div`
  text-align: center;
  padding: 50px;
`;
var DialogButton = styled2.div`
  border-radius: 12px;
  background: #6673ff;
  height: 48px;
  border: 0px;

  color: #fff;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
var Text = styled2.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-top: 30px;
`;
var LinkToBetaDialog = memo15(() => {
  const { t } = useCustomTranslation([LngNs.common]);
  const [linkToBetaDialogOpen, setLinkToBetaDialogOpen] = useRecoilState6(
    linkToBetaDialogState
  );
  const [linkToBetaDialogChainId, setLinkToBetaDialogChainId] = useRecoilState6(
    linkToBetaDialogChainIdState
  );
  const isMobile = useIsMobile();
  const ToUrlName = useMemo7(() => {
    if (linkToBetaDialogChainId) {
      if (linkToBetaDialogChainId === 9980 /* Combo */) {
        return ["https://app.zypher.game/2048/"];
      }
      return getChainNameText(linkToBetaDialogChainId);
    }
    return "";
  }, [linkToBetaDialogChainId]);
  const handleButtonClick = useCallback8(() => {
    setLinkToBetaDialogOpen(false);
    if (ToUrlName[0].startsWith("https")) {
      return window.open(ToUrlName[0], "_blank");
    } else {
      const _isTestnet = linkToBetaDialogChainId ? isTestnet[linkToBetaDialogChainId] : false;
      return window.open(
        `https://${_isTestnet ? "dev" : ""}${ToUrlName[0]}.zypher.game/`,
        "_blank"
      );
    }
  }, [ToUrlName]);
  useEffect7(() => {
    if (!linkToBetaDialogOpen) {
      setLinkToBetaDialogChainId(void 0);
    }
  }, [linkToBetaDialogOpen]);
  return /* @__PURE__ */ React20.createElement(Modal_default, {
    open: linkToBetaDialogOpen,
    onCancel: () => setLinkToBetaDialogOpen(false),
    footer: null,
    wrapClassName: classnames8("customDialog"),
    destroyOnClose: true,
    closable: false,
    width: isMobile ? "100%" : 360,
    centered: isMobile ? false : true
  }, /* @__PURE__ */ React20.createElement(DialogTitle_default, {
    label: t("Switch Networks"),
    setDialogOpen: setLinkToBetaDialogOpen,
    classNames: isMobile ? "modalTitleInner" : ""
  }), /* @__PURE__ */ React20.createElement(Content, null, /* @__PURE__ */ React20.createElement(WarningOutlined, {
    style: { color: "#6673FF", fontSize: "50px" }
  }), /* @__PURE__ */ React20.createElement(Text, null, linkToBetaDialogChainId === 9980 /* Combo */ ? "Combo is currently only deployed in 2048." : t("linkToBeta", {
    chainName: linkToBetaDialogChainId ? ChainName[linkToBetaDialogChainId] : "",
    toUrlName: ToUrlName[1]
  }))), /* @__PURE__ */ React20.createElement("div", {
    style: { padding: "0 20px 30px" }
  }, /* @__PURE__ */ React20.createElement(DialogButton, {
    onClick: handleButtonClick
  }, linkToBetaDialogChainId === 9980 /* Combo */ ? "Go to Play 2048" : t("GotoVersion", {
    toUrlName: ToUrlName[0]
  }))));
}, isEqual);
var LinkToBetaDialog_default = LinkToBetaDialog;

// src/components/Header/header.tsx
import classnames11 from "classnames";
import React35, { useEffect as useEffect11 } from "react";
import { useRecoilValue as useRecoilValue8, useSetRecoilState as useSetRecoilState10 } from "recoil";

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
import { ConnectButton } from "@my/rainbowkit";
import React34, { memo as memo26, useMemo as useMemo10 } from "react";

// src/components/Header/rainbow_account/rainbow_account.tsx
import React32, { memo as memo24, useCallback as useCallback14 } from "react";
import { useSetRecoilState as useSetRecoilState8 } from "recoil";

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import classnames10 from "classnames";
import React27, { memo as memo20, useCallback as useCallback10, useEffect as useEffect8 } from "react";
import { useRecoilState as useRecoilState8 } from "recoil";

// src/hooks/useActiveWallet.ts
import { useWalletConnectors } from "@my/rainbowkit";
import { useMemo as useMemo8 } from "react";
var useActiveWallet = () => {
  const wallets = useWalletConnectors();
  return useMemo8(() => {
    if (wallets) {
      const wall = wallets.filter((v) => v.ready && v.recent);
      return wall == null ? void 0 : wall[0];
    }
    return void 0;
  }, [wallets]);
};

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
import classnames9 from "classnames";
import React26, { memo as memo19, useMemo as useMemo9 } from "react";

// src/components/PlayerAvatar/index.tsx
import cx from "classnames";
import React23 from "react";
import styled4 from "styled-components";

// src/utils/generateAvatar.ts
function hashToSeed(ethereumAddress) {
  if (!ethereumAddress) {
    return 1;
  }
  if (window.mcrypto) {
    const hash = window.mcrypto.createHash("sha1").update(ethereumAddress).digest("hex");
    const seed = parseInt(hash.slice(0, 16), 16);
    return seed;
  }
  return 0;
}
var generateAvatar_default = (account) => {
  const seed = hashToSeed(account == null ? void 0 : account.toLowerCase());
  const selectedAvatar = [
    preStaticUrl + "/img/avatar1.png",
    preStaticUrl + "/img/avatar2.png",
    preStaticUrl + "/img/avatar3.png",
    preStaticUrl + "/img/avatar4.png",
    preStaticUrl + "/img/avatar5.png"
  ][seed % 6];
  const selectedBackground = [
    "#83A285",
    "#A083AE",
    "#FF637F",
    "#FFA26D",
    "#77BEFF",
    "#80F0BA",
    "#FFCF4E",
    "#FF603E",
    "#F44242",
    "#D57CFF",
    "#7075FF",
    "#808242",
    "#804343",
    "#FF56B1",
    "#6992A9"
  ][seed % 15];
  if (!account) {
    return {
      selectedAvatar: preStaticUrl + "/img/default_avatar.png",
      selectedBackground: "#EFEFEF"
    };
  }
  return { selectedAvatar, selectedBackground };
};

// src/components/Avatar/Avatar.tsx
import React22 from "react";

// src/components/Header/rainbow_account/IsPixelWidget.tsx
import React21, { memo as memo16 } from "react";
var IsPixelWidget = memo16(
  ({
    className,
    type,
    children,
    onClick
  }) => {
    return type === "pixel" ? /* @__PURE__ */ React21.createElement(PixelFlatBtn_default, {
      className: `pixel_border ${className != null ? className : ""}`,
      onClick
    }, children) : /* @__PURE__ */ React21.createElement("div", {
      className,
      onClick
    }, " ", children);
  }
);
var IsPixelWidget_default = IsPixelWidget;

// src/components/Avatar/Avatar.tsx
import styled3, { css } from "styled-components";
var IsPixelWidgetStyled = styled3(IsPixelWidget_default)`
  width: ${({ size }) => size}px !important;
  height: ${({ size }) => size}px !important;
  border-radius: ${({ type }) => type === "pixel" ? "0" : "50%"};
  overflow: hidden;
  ${({ type, style }) => type === "other" && style && css`
      ${style}
    `};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.pixel_flat_btn {
    img {
      width: 75%;
      height: 75%;
    }
  }
  .pixel_flat_btn_bg > div {
    ${({ type, style }) => type === "pixel" && style && css`
        ${style}
      `};
  }
`;
var Avatar = ({
  src,
  altText,
  style = {},
  size = 64,
  type = "other"
}) => {
  return /* @__PURE__ */ React22.createElement(IsPixelWidgetStyled, {
    type,
    size,
    style
  }, /* @__PURE__ */ React22.createElement("img", {
    src,
    alt: altText
  }));
};
var Avatar_default = Avatar;

// src/components/PlayerAvatar/index.tsx
var PlayerAvatar = ({
  account,
  showAccount = false,
  size = 60,
  border = false,
  AvatarBorder = React23.Fragment,
  AccountTextFrComp = React23.Fragment,
  className,
  preLen,
  endLen,
  otherStr,
  type = "other"
}) => {
  const { t } = useCustomTranslation([LngNs.zBingo]);
  const { selectedAvatar, selectedBackground } = generateAvatar_default(account);
  return /* @__PURE__ */ React23.createElement("div", {
    className: cx(className, "player_playerAvatar")
  }, account ? /* @__PURE__ */ React23.createElement(AvatarBorder, null, /* @__PURE__ */ React23.createElement(Avatar_default, {
    type,
    size,
    src: selectedAvatar,
    style: border ? {
      background: selectedBackground,
      border: "2px solid #62380C"
    } : { background: selectedBackground }
  })) : /* @__PURE__ */ React23.createElement("div", {
    className: "player_avatar",
    style: {
      width: `${size}px`,
      height: `${size}px`,
      overflow: "hidden",
      background: "rgba(138, 138, 138, 1)"
    }
  }, /* @__PURE__ */ React23.createElement(Avatar_default, {
    size,
    src: preStaticUrl + `/img/default_avatar.png`
  })), showAccount && /* @__PURE__ */ React23.createElement("p", {
    className: (className == null ? void 0 : className.includes("account")) ? "player_avatar_account" : ""
  }, account ? `${getShortenAddress(account, preLen, endLen)}${otherStr ? ` ${otherStr}` : ""}` : t("waiting"), /* @__PURE__ */ React23.createElement(AccountTextFrComp, null)));
};
var OuterCircle = styled4.div`
  background: ${({ isGrey, isGreen }) => {
  if (isGreen) {
    return "linear-gradient(180deg, #8FCA3A 0%, #59B11C 32.81%, #259900 100%)";
  }
  if (isGrey) {
    return "linear-gradient(180deg, #ddd 0%, #434343 100%)";
  }
  return "linear-gradient(180deg, #F1A541 0%, #D48A2B 45.31%, #9F5A03 100%)";
}};
  border-radius: 50%;
  position: relative;
  ${({ winner }) => winner && `&::after {
    content: '';
    position: absolute;
    top: -14px;
    right: -5px;
    width: 27px;
    height: 25px;
    background: url(${preStaticUrl}/img/layout/crown.svg) no-repeat;
  }`}

  padding: 1.875px;
  ${({ size }) => {
  if (size === "small") {
    return ` width: 40px;
    height: 40px;`;
  } else if (size === "large") {
    return ` width: 64px;
    height: 64px;
    padding: 3px;`;
  } else if (size) {
    return ` width: ${size}px;
    height: ${size}px;`;
  } else {
    return `
          width: 48px;
          height: 48px;
        `;
  }
}}

  .center-circle {
    background: ${({ isGrey, isGreen }) => {
  if (isGreen) {
    return "linear-gradient(180deg, #289B02 0%, #65B724 29.17%, #8CC939 100%)";
  }
  if (isGrey) {
    return "linear-gradient(180deg, #494949 0%, #d9d9d9 100%)";
  }
  return "linear-gradient(180deg, #AE6306 0%, #D68B2B 29.69%, #E79B3B 100%)";
}};
    border-radius: 50%;
    padding: ${({ size }) => {
  if (size == "large") {
    return "2px";
  }
  return "1.25px";
}};
    width: 100%;
    height: 100%;
    .inner-circle {
      background: #613c17;
      box-shadow: ${({ size }) => {
  if (size == "large") {
    return "0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset";
  }
  return "0px 1.25px 0px 0px rgba(0, 0, 0, 0.25) inset";
}};
      width: 100%;
      height: 100%;
      border-radius: 50%;
      img {
        border-radius: 50%;
        box-shadow: ${({ size }) => {
  if (size == "large") {
    return "0px 2px 0px 0px rgba(0, 0, 0, 0.25) inset";
  }
  return "0px 1.25px 0px 0px rgba(0, 0, 0, 0.25) inset";
}};
      }
    }
  }
`;
var PlayerAvatarList = ({
  account,
  size,
  isGreen = false,
  isGrey = false,
  winner
}) => {
  const { selectedAvatar, selectedBackground } = generateAvatar_default(account);
  return /* @__PURE__ */ React23.createElement(OuterCircle, {
    size,
    isGreen,
    isGrey,
    winner
  }, /* @__PURE__ */ React23.createElement("div", {
    className: "center-circle "
  }, /* @__PURE__ */ React23.createElement("div", {
    className: "inner-circle"
  }, account ? /* @__PURE__ */ React23.createElement("img", {
    width: "100%",
    src: selectedAvatar,
    style: { background: selectedBackground }
  }) : /* @__PURE__ */ React23.createElement("img", {
    width: "100%",
    src: preStaticUrl + `/img/default_avatar.png`
  }))));
};
var PlayerAvatar_default = PlayerAvatar;

// src/components/ConnectWallet/components/ChainSelector/ChainSelectorWidget.tsx
import { useChainModal } from "@my/rainbowkit";
import React24, { memo as memo17, useCallback as useCallback9 } from "react";
import styled5 from "styled-components";
import { useRecoilState as useRecoilState7 } from "recoil";
var StatusI = styled5.i`
  box-sizing: content-box;
  display: inline-block;
  width: ${({ isMobile }) => isMobile ? "5px" : "6px"};
  height: ${({ isMobile }) => isMobile ? "5px" : "6px"};
  background-color: #65edbc;
  margin-left: ${({ isMobile }) => isMobile ? "4px" : "10px"};
  border-radius: 50%;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${({ isMobile }) => isMobile ? "-2px" : "-3px"};
    left: ${({ isMobile }) => isMobile ? "-2px" : "-3px"};
    border: ${({ isMobile }) => isMobile ? "2px" : "3px"} solid
      rgba(101, 237, 188, 0.19);
    box-sizing: content-box;
    border-radius: 50%;
  }
`;
var ChainSelectorWidget = memo17(({ className, type }) => {
  const { chainId } = useActiveWeb3React();
  const isMobile = useIsMobile();
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState7(
    accountInfoDialogState
  );
  const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState7(pointsDialogState);
  const [siderCollapse, setSiderCollapse] = useRecoilState7(siderCollapseState);
  const { openChainModal } = useChainModal();
  const openChainModalHandle = useCallback9(() => {
    if (accountInfoDialogOpen) {
      setAccountInfoDialogOpen(false);
    }
    if (pointsDialogOpen) {
      setPointsDialogOpen(false);
    }
    if (!siderCollapse) {
      setSiderCollapse(true);
    }
    if (openChainModal) {
      openChainModal();
    }
  }, [openChainModal]);
  return chainId ? /* @__PURE__ */ React24.createElement(IsPixelWidget_default, {
    type,
    onClick: openChainModalHandle
  }, /* @__PURE__ */ React24.createElement("div", {
    className: `ChainSelectorWidgetWrapper ${className != null ? className : ""}`
  }, /* @__PURE__ */ React24.createElement("div", {
    className: "img"
  }, /* @__PURE__ */ React24.createElement("img", {
    src: ChainImage[chainId],
    alt: ChainName[chainId]
  }), /* @__PURE__ */ React24.createElement("p", null, ChainName[chainId])), /* @__PURE__ */ React24.createElement(StatusI, {
    isMobile
  }))) : null;
}, isEqual);
var ChainSelectorWidget_default = ChainSelectorWidget;

// src/components/ConnectWallet/components/AccountInfoDialog/components/PcUserInfo.tsx
import { useAsyncImage } from "@my/rainbowkit";
import React25, { memo as memo18 } from "react";
var PcUserInfo = memo18(
  ({
    connectName,
    connectIcon,
    account,
    chainId,
    cancel,
    copy
  }) => {
    var _a;
    const { t } = useCustomTranslation([LngNs.common]);
    const src = useAsyncImage(connectIcon);
    return /* @__PURE__ */ React25.createElement("div", {
      className: "pc_user_pc_content"
    }, /* @__PURE__ */ React25.createElement("div", {
      className: "pc_user_box"
    }, /* @__PURE__ */ React25.createElement("div", {
      className: "pc_user_tit"
    }, t(
      "Connected with",
      {
        walletName: connectName
      }
    )), /* @__PURE__ */ React25.createElement("div", {
      className: "pc_user_info"
    }, connectIcon && /* @__PURE__ */ React25.createElement("img", {
      src,
      alt: connectName
    }), /* @__PURE__ */ React25.createElement("div", {
      className: "pc_user_text"
    }, getShortenAddress(account)), /* @__PURE__ */ React25.createElement("span", {
      onClick: () => copy(account)
    }, /* @__PURE__ */ React25.createElement(icons_default, {
      name: "copy"
    })), BlockExplorerUrls[chainId] && /* @__PURE__ */ React25.createElement("a", {
      href: `${(_a = BlockExplorerUrls[chainId]) != null ? _a : [0]}/address/${account}`,
      target: "_blank",
      rel: "noreferrer"
    }, /* @__PURE__ */ React25.createElement(icons_default, {
      name: "link"
    })))), /* @__PURE__ */ React25.createElement(DisconnectBtn, {
      cancel
    }));
  },
  isEqual
);
var DisconnectBtn = memo18(({ cancel }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  return /* @__PURE__ */ React25.createElement("p", {
    className: "pc_user_disconnect_btn",
    onClick: cancel
  }, t("Disconnect"));
}, isEqual);
var PcUserInfo_default = PcUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
var MUserInfo = memo19(({ account, chainId, cancel, type }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  const isMobile = useIsMobile();
  const list = useMemo9(() => {
    return [
      {
        balanceStr: pointsBalanceStr,
        logo: /* @__PURE__ */ React26.createElement(PointsIcon, {
          isMobile
        }),
        symbol: "Gold Points"
      },
      {
        balanceStr: nativeBalanceStr,
        logo: /* @__PURE__ */ React26.createElement(CurrencyLogo_default, {
          className: "m_user_img",
          src: CurrencyLogo[chainId]
        }),
        symbol: Currency[chainId]
      }
    ];
  }, []);
  return /* @__PURE__ */ React26.createElement("div", {
    className: "m_user_m_content"
  }, /* @__PURE__ */ React26.createElement(ChainSelectorWidget_default, {
    type,
    className: classnames9("m_user_border", "m_user_chain")
  }), /* @__PURE__ */ React26.createElement("div", {
    className: "m_user_border"
  }, /* @__PURE__ */ React26.createElement("p", {
    className: "m_user_tit"
  }, t("Your Wallet")), /* @__PURE__ */ React26.createElement("div", {
    className: "m_user_userInfoInner"
  }, /* @__PURE__ */ React26.createElement(PlayerAvatar_default, {
    className: "m_user_account",
    account,
    size: 24,
    showAccount: true
  }), /* @__PURE__ */ React26.createElement(DisconnectBtn, {
    cancel
  })), /* @__PURE__ */ React26.createElement("div", {
    className: "m_user_balance"
  }, list.map((v) => /* @__PURE__ */ React26.createElement("div", {
    key: v.symbol,
    className: "m_user_item"
  }, /* @__PURE__ */ React26.createElement("div", {
    className: "m_user_fl"
  }, v.logo, /* @__PURE__ */ React26.createElement("p", null, v.symbol)), /* @__PURE__ */ React26.createElement("p", null, v.balanceStr))))));
}, isEqual);
var MUserInfo_default = MUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import { useDisconnect } from "wagmi";
var AccountInfoDialog = memo20(
  ({ copy, type }) => {
    const { t } = useCustomTranslation([LngNs.common]);
    const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState8(
      accountInfoDialogState
    );
    const { account, chainId } = useActiveWeb3React();
    const isMobile = useIsMobile();
    const { disconnect } = useDisconnect();
    const wallet = useActiveWallet();
    const cancel = useCallback10(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
    }, [disconnect]);
    useEffect8(() => {
      if (accountInfoDialogOpen && isMobile) {
        setAccountInfoDialogOpen(false);
      }
    }, [isMobile]);
    return account && chainId ? /* @__PURE__ */ React27.createElement(React27.Fragment, null, /* @__PURE__ */ React27.createElement(Modal_default, {
      open: accountInfoDialogOpen,
      onCancel: () => setAccountInfoDialogOpen(false),
      footer: null,
      wrapClassName: classnames10(
        "customDialog",
        "bottom",
        "account_info_dialog_dialog"
      ),
      destroyOnClose: true,
      closable: false,
      width: isMobile ? "100%" : 440,
      centered: isMobile ? false : true,
      transitionName: isMobile ? "ant-slide-down" : void 0
    }, /* @__PURE__ */ React27.createElement(DialogTitle_default, {
      label: t("Your Wallet"),
      setDialogOpen: setAccountInfoDialogOpen,
      classNames: isMobile ? "modalTitleInner" : ""
    }), /* @__PURE__ */ React27.createElement("div", {
      className: "account_info_dialog_modalMain"
    }, isMobile ? /* @__PURE__ */ React27.createElement(MUserInfo_default, {
      copy,
      account,
      chainId,
      cancel,
      type: "other"
    }) : /* @__PURE__ */ React27.createElement(PcUserInfo_default, {
      copy,
      account,
      chainId,
      cancel,
      connectName: wallet == null ? void 0 : wallet.name,
      connectIcon: wallet == null ? void 0 : wallet.iconUrl,
      type
    })))) : null;
  }
);
var AccountInfoDialog_default = AccountInfoDialog;

// src/components/ConnectWallet/components/Balance/Balance.tsx
import { SyncOutlined } from "@ant-design/icons";
import BigNumberjs3 from "bignumber.js";
import React30, { memo as memo23, useCallback as useCallback12, useEffect as useEffect10, useState as useState8 } from "react";
import { useRecoilValue as useRecoilValue6, useSetRecoilState as useSetRecoilState6 } from "recoil";
import styled6 from "styled-components";

// src/contract/abi/erc20Abi.json
var erc20Abi_default = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256"
      }
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256"
      }
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/contract/erc20.ts
var erc20Contract = (chainId, env, address, signer) => {
  if (!address) {
    throw new Error("No addrerss");
  }
  return getContract({ env, abi: erc20Abi_default, address, signer, chainId });
};
var erc20Abi = erc20Abi_default;
var erc20_default = erc20Contract;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
import { LoadingOutlined } from "@ant-design/icons";
import React29, { memo as memo22, useCallback as useCallback11, useEffect as useEffect9 } from "react";

// src/components/ConnectWallet/components/PointsDialog/GetPointsSuccess.tsx
import React28, { memo as memo21 } from "react";
import { useRecoilState as useRecoilState9 } from "recoil";
var GetPointsSuccess = memo21(() => {
  const [show] = useRecoilState9(pointsAnimState);
  if (show) {
    return /* @__PURE__ */ React28.createElement("div", {
      className: "getpointpoints"
    }, new Array(3).fill("").map((c, index) => /* @__PURE__ */ React28.createElement(PointsItem, {
      key: index
    })));
  }
  return null;
}, isEqual);
var PointsItem = () => {
  return /* @__PURE__ */ React28.createElement("div", {
    className: "getpointcoin"
  }, /* @__PURE__ */ React28.createElement("div", {
    className: "getpointcoin_front"
  }, /* @__PURE__ */ React28.createElement("img", {
    src: preStaticUrl + "/img/layout/Star.png",
    alt: "star"
  })), /* @__PURE__ */ React28.createElement("div", {
    className: "getpointcoin_middle"
  }), /* @__PURE__ */ React28.createElement("div", {
    className: "getpointcoin_back"
  }, /* @__PURE__ */ React28.createElement("img", {
    src: preStaticUrl + "/img/layout/Star.png",
    alt: "star"
  })));
};
var GetPointsSuccess_default = GetPointsSuccess;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
import { useRecoilState as useRecoilState10, useSetRecoilState as useSetRecoilState5 } from "recoil";
var BalanceItem = memo22(
  ({
    className,
    loading,
    balanceStr,
    logo,
    preChild,
    onClick,
    CountupNumber,
    balance,
    type
  }) => {
    const onClickHandle = useCallback11(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return /* @__PURE__ */ React29.createElement(IsPixelWidget_default, {
      type,
      className: `balance_item_balance
        ${className != null ? className : ""}
        ${type === "pixel" ? "balance_item_balance_pixel" : ""}`,
      onClick: onClickHandle
    }, preChild, loading ? /* @__PURE__ */ React29.createElement(LoadingOutlined, null) : /* @__PURE__ */ React29.createElement(React29.Fragment, null, CountupNumber && (balance || balance === 0) ? /* @__PURE__ */ React29.createElement(CountupNumber, {
      value: balance,
      decimals: 0,
      duration: 1.5,
      showDiv: false
    }) : balanceStr, logo));
  },
  isEqual
);
var BalanceCountUpItem = memo22(
  ({
    className,
    loading,
    balance,
    logo,
    preChild,
    onClick,
    CountupNumber,
    balanceStr,
    type
  }) => {
    const setPointsAnimState = useSetRecoilState5(pointsAnimState);
    const [mount, setMount] = useRecoilState10(pointsAnimNumState);
    const onClickHandle = useCallback11(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    useEffect9(() => {
      if (mount === 1) {
        setPointsAnimState(true);
        setTimeout(() => {
          setPointsAnimState(false);
          setMount(0);
        }, 3e3);
      }
    }, [mount]);
    return /* @__PURE__ */ React29.createElement(IsPixelWidget_default, {
      className: `balance_item_balance_point balance_item_balance 
        ${className != null ? className : ""}
        ${type === "pixel" ? "balance_item_balance_pixel" : ""}`,
      onClick: onClickHandle,
      type
    }, preChild, loading ? /* @__PURE__ */ React29.createElement(LoadingOutlined, null) : /* @__PURE__ */ React29.createElement(React29.Fragment, null, CountupNumber && (balance || balance === 0) ? /* @__PURE__ */ React29.createElement(CountupNumber, {
      value: balance,
      decimals: 0,
      duration: 1.5,
      showDiv: false
    }) : balanceStr, logo), /* @__PURE__ */ React29.createElement(GetPointsSuccess_default, null));
  },
  isEqual
);
var balanceItem_default = BalanceItem;

// src/components/ConnectWallet/components/Balance/Balance.tsx
var AddIcon = styled6(icons_default)`
  margin-right: ${({ isMobile }) => isMobile ? "4px" : "10px"};
  margin-left: 0 !important;
  width: ${({ isMobile }) => isMobile ? "20px" : "24px"};
`;
var Balance = memo23((props) => {
  const { showPointsModal, isMobile, env, CountupNumber, type } = props;
  const { chainId, account, provider } = useActiveWeb3React();
  const [loading, setLoading] = useState8(false);
  const setNativeBalance = useSetRecoilState6(nativeBalanceState);
  const setPointsBalance = useSetRecoilState6(pointsBalanceState);
  const refreshBalance = useRecoilValue6(refreshBalanceState);
  const fetchBalanceOf = useCallback12(async () => {
    if (!chainId || !account) {
      return;
    }
    setLoading(true);
    const balance = await provider.getBalance({ address: account });
    setNativeBalance(
      new BigNumberjs3(balance.toString()).dividedBy(divisorBigNumber).toNumber()
    );
    await fetchErc20Balance();
    setLoading(false);
  }, [chainId, account, provider]);
  const fetchErc20Balance = useCallback12(async () => {
    if (!chainId || !account || !provider) {
      return;
    }
    try {
      const pointsAddress = zkBingo(chainId, "ZypherGameToken" /* ZypherGameToken */);
      if (!pointsAddress) {
        setPointsBalance(0);
      } else {
        const pointsContract = erc20_default(chainId, env, pointsAddress);
        const balance = await pointsContract.read.balanceOf([account]);
        setPointsBalance(
          new BigNumberjs3(balance.toString()).dividedBy(divisorBigNumber).toNumber()
        );
      }
    } catch (e) {
      setPointsBalance(0);
    }
  }, [chainId, account, provider]);
  useEffect10(() => {
    if (account && chainId) {
      fetchBalanceOf();
    }
  }, [account, chainId, refreshBalance]);
  const pointsBalance = useRecoilValue6(pointsBalanceState);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  return /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement(IsPixelWidget_default, {
    type,
    className: `refresh_balance ${type === "pixel" ? "refresh_balance_pixel" : ""}`,
    onClick: fetchBalanceOf
  }, /* @__PURE__ */ React30.createElement(SyncOutlined, null)), DPSupportChainId.includes(chainId) ? /* @__PURE__ */ React30.createElement(BalanceCountUpItem, {
    onClick: showPointsModal,
    logo: /* @__PURE__ */ React30.createElement(PointsIcon, {
      isMobile
    }),
    balance: pointsBalance,
    loading,
    className: props.className,
    CountupNumber,
    preChild: /* @__PURE__ */ React30.createElement(AddIcon, {
      name: "add",
      isMobile
    }),
    balanceStr: pointsBalanceStr,
    type
  }) : null, !isMobile && /* @__PURE__ */ React30.createElement(balanceItem_default, {
    logo: /* @__PURE__ */ React30.createElement(CurrencyLogo_default, {
      className: "balance_item_img",
      src: CurrencyLogo[chainId || 97]
    }),
    balanceStr: nativeBalanceStr,
    loading,
    className: props.className,
    type
  }));
}, isEqual);
var Balance_default = Balance;

// src/components/ConnectWallet/components/PointsDialog/PointsRuleDialog.tsx
import { CloseOutlined } from "@ant-design/icons";
import { DialogContent as DialogContent2, DialogOverlay as DialogOverlay2 } from "@reach/dialog";
import React31, { useCallback as useCallback13 } from "react";
import { useRecoilValue as useRecoilValue7, useSetRecoilState as useSetRecoilState7 } from "recoil";
import { Trans } from "react-i18next";
var PointsRuleDialog = () => {
  const { t } = useCustomTranslation([LngNs.points]);
  const isModalOpen = useRecoilValue7(pointsRuleDialogState);
  const setIsModalOpen = useSetRecoilState7(pointsRuleDialogState);
  const handleCancel = useCallback13(() => {
    setIsModalOpen(false);
  }, []);
  return /* @__PURE__ */ React31.createElement(React31.Fragment, null, /* @__PURE__ */ React31.createElement(DialogOverlay2, {
    isOpen: isModalOpen,
    onDismiss: handleCancel,
    className: "points_dialog_zindex"
  }, /* @__PURE__ */ React31.createElement(DialogContent2, {
    className: "points_dialog_dialogContent"
  }, /* @__PURE__ */ React31.createElement("div", {
    className: "points_dialog_dialogHeader"
  }, /* @__PURE__ */ React31.createElement("h3", null, t("Rules")), /* @__PURE__ */ React31.createElement("div", {
    className: "points_dialog_cursor",
    onClick: handleCancel
  }, /* @__PURE__ */ React31.createElement(CloseOutlined, null))), /* @__PURE__ */ React31.createElement("div", {
    className: "points_dialog_dialogContainer"
  }, /* @__PURE__ */ React31.createElement("h4", null, t("PointsRuleText01")), /* @__PURE__ */ React31.createElement("p", null, t("PointsRuleText02")), /* @__PURE__ */ React31.createElement("p", null, /* @__PURE__ */ React31.createElement("em", null), /* @__PURE__ */ React31.createElement("i", null, t("PointsRuleText03")), /* @__PURE__ */ React31.createElement("br", null), /* @__PURE__ */ React31.createElement("em", null), /* @__PURE__ */ React31.createElement("i", null, t("PointsRuleText04")), /* @__PURE__ */ React31.createElement("br", null), /* @__PURE__ */ React31.createElement("em", null), /* @__PURE__ */ React31.createElement("i", null, t("PointsRuleText04")), /* @__PURE__ */ React31.createElement("br", null), /* @__PURE__ */ React31.createElement("em", null), " ", /* @__PURE__ */ React31.createElement("i", null, t("PointsRuleText06"))), /* @__PURE__ */ React31.createElement("p", null, /* @__PURE__ */ React31.createElement(Trans, {
    i18nKey: "PointsRuleText07",
    defaults: t("PointsRuleText07"),
    values: { Link: t("Link") },
    components: { bold: /* @__PURE__ */ React31.createElement("strong", null) }
  })), /* @__PURE__ */ React31.createElement("h4", null, t("PointsRuleText09")), /* @__PURE__ */ React31.createElement("p", null, /* @__PURE__ */ React31.createElement(Trans, {
    i18nKey: "PointsRuleText10",
    defaults: t("PointsRuleText10")
  }, /* @__PURE__ */ React31.createElement("a", {
    href: "https://discord.com/invite/MKJZhS4p2T",
    target: "_blank",
    className: "points_dialog_fontWhite",
    rel: "noreferrer"
  }, "Discord")))), /* @__PURE__ */ React31.createElement("div", {
    className: "points_dialog_btnWrap"
  }, /* @__PURE__ */ React31.createElement("button", {
    className: "points_dialog_btn",
    onClick: handleCancel
  }, t("Ok"))))));
};
var PointsRuleDialog_default = PointsRuleDialog;

// src/components/Header/rainbow_account/rainbow_account.tsx
var Account = memo24(
  ({
    showLang,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    CountupNumber,
    supportedChainList,
    type
  }) => {
    const isMobile = useIsMd1100();
    const setPointsDialogState = useSetRecoilState8(pointsDialogState);
    const showPointsModal = useCallback14(() => {
      setPointsDialogState(true);
    }, [setPointsDialogState]);
    const setAccountInfoDialogState = useSetRecoilState8(accountInfoDialogState);
    const showLogoutModal = useCallback14(() => {
      setAccountInfoDialogState(true);
    }, [setAccountInfoDialogState]);
    const { account } = useActiveWeb3React(env, supportedChainList);
    return /* @__PURE__ */ React32.createElement(React32.Fragment, null, /* @__PURE__ */ React32.createElement(Balance_default, {
      CountupNumber,
      env,
      isMobile,
      showPointsModal,
      type
    }), /* @__PURE__ */ React32.createElement(IsPixelWidget_default, {
      type,
      className: "address_wrap",
      onClick: showLogoutModal
    }, /* @__PURE__ */ React32.createElement(PlayerAvatar_default, {
      className: "account",
      account,
      size: isMobile ? 26 : 40,
      showAccount: isMobile ? false : true,
      type
    })), !isMobile && /* @__PURE__ */ React32.createElement(ChainSelectorWidget_default, {
      type
    }), /* @__PURE__ */ React32.createElement(AccountInfoDialog_default, {
      copy,
      type
    }), /* @__PURE__ */ React32.createElement(PointsDialog_default, {
      env,
      dispatch,
      setSuccessToast,
      setErrorToast
    }), /* @__PURE__ */ React32.createElement(PointsRuleDialog_default, null));
  },
  isEqual
);
var rainbow_account_default = Account;

// src/components/Header/rainbow_account/WrongNetwork.tsx
import { useChainModal as useChainModal2 } from "@my/rainbowkit";
import React33, { memo as memo25 } from "react";
import { useSetRecoilState as useSetRecoilState9 } from "recoil";
var WrongNetwork = memo25(({ type }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const { openChainModal } = useChainModal2();
  const setAccountInfoDialogOpen = useSetRecoilState9(accountInfoDialogState);
  return /* @__PURE__ */ React33.createElement(IsPixelWidget_default, {
    type,
    onClick: () => {
      if (openChainModal) {
        openChainModal();
        setAccountInfoDialogOpen(false);
      }
    },
    className: "connect_connect"
  }, /* @__PURE__ */ React33.createElement("p", null, t("Wrong network")));
}, isEqual);
var WrongNetwork_default = WrongNetwork;

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
var RainbowConnectWallet = memo26((props) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const {
    useLocation,
    className,
    env,
    copy,
    dispatch,
    setSuccessToast,
    setErrorToast,
    showLang,
    CountupNumber,
    supportedChainList,
    type
  } = props;
  const location2 = useLocation();
  const isPathLocation = useMemo10(() => {
    if (window.location.href.indexOf("/bingo/") > -1) {
      return true;
    }
    const arr = location2.pathname.split("/");
    return arr[1] === "play" || arr[1] === "zBingo" || arr[1] === "monster";
  }, [location2]);
  return /* @__PURE__ */ React34.createElement("div", {
    className: `
      ${type === "pixel" ? "connect_pixel_connectWallet" : "connect_connectWallet"}
        ${type === "other" && isPathLocation ? "connect_bgWallet" : ""}
        ${className != null ? className : ""}
        `
  }, /* @__PURE__ */ React34.createElement(ConnectButton.Custom, null, ({ chain, openConnectModal, mounted }) => {
    return /* @__PURE__ */ React34.createElement(React34.Fragment, null, !mounted || !chain ? /* @__PURE__ */ React34.createElement(IsPixelWidget_default, {
      type,
      onClick: openConnectModal,
      className: "connect_connect"
    }, /* @__PURE__ */ React34.createElement("p", null, t("Connect Wallet"))) : chain && (chain.unsupported || !supportedChainIds(env, supportedChainList).includes(
      chain.id
    )) ? /* @__PURE__ */ React34.createElement(WrongNetwork_default, {
      type
    }) : /* @__PURE__ */ React34.createElement(rainbow_account_default, {
      copy,
      env,
      dispatch,
      setSuccessToast,
      setErrorToast,
      showLang,
      CountupNumber,
      supportedChainList,
      type
    }));
  }), showLang ? /* @__PURE__ */ React34.createElement(Language_default, {
    type: type === "pixel" ? type : "top"
  }) : null);
}, isEqual);
var rainbow_connectWallet_default = RainbowConnectWallet;

// src/components/Header/header.tsx
var Header = (props) => {
  const isMobile = useIsMd1100();
  const setSiderCollapse = useSetRecoilState10(siderCollapseState);
  const collapsed = useRecoilValue8(siderCollapseState);
  const {
    hideMenu = false,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    useLocation,
    showLang,
    CountupNumber,
    supportedChainList,
    type,
    Middle,
    pathname
  } = props;
  useEffect11(() => {
    if (isMobile && collapsed === void 0) {
      setSiderCollapse(true);
    }
  }, [isMobile]);
  return /* @__PURE__ */ React35.createElement("header", {
    className: classnames11("header_header", props.className),
    style: { position: "sticky", top: 0, zIndex: 9, width: "100%" }
  }, type === "pixel" || type === "other" && isMobile ? /* @__PURE__ */ React35.createElement("div", {
    className: "header_left"
  }, /* @__PURE__ */ React35.createElement(ZypherLogo, {
    isMobile
  })) : null, Middle && /* @__PURE__ */ React35.createElement(Middle, {
    pathname
  }), /* @__PURE__ */ React35.createElement("div", {
    className: "header_right"
  }, /* @__PURE__ */ React35.createElement(rainbow_connectWallet_default, {
    showLang,
    useLocation,
    copy,
    isMobile,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    CountupNumber,
    supportedChainList,
    type
  }), isMobile && !hideMenu ? /* @__PURE__ */ React35.createElement(IsPixelWidget_default, {
    type,
    className: `${type === "pixel" ? "header_btn_pixel" : ""}`
  }, /* @__PURE__ */ React35.createElement("div", {
    className: "header_btn",
    onClick: () => setSiderCollapse(!collapsed)
  }, /* @__PURE__ */ React35.createElement(icons_default, {
    className: `header_icon ${collapsed ? "" : "header_close"}`,
    name: `${collapsed ? "menu" : "close"}`
  }))) : null), /* @__PURE__ */ React35.createElement(LinkToBetaDialog_default, null));
};
var header_default = Header;

// src/provider/RainbowKitWithThemeProvider.tsx
import { darkTheme, RainbowKitProvider } from "@my/rainbowkit";
import React36, { useMemo as useMemo11 } from "react";
import { WagmiConfig } from "wagmi";
var RainbowKitWithThemeProvider = ({
  children,
  env,
  chainIdList,
  type
}) => {
  const { wagmiConfig, chains, computedTheme } = useMemo11(() => {
    if (env) {
      const wagmiConfig2 = getWagmiConfig(env, chainIdList);
      const { chains: chains2 } = getConfigureChains(env);
      return {
        wagmiConfig: wagmiConfig2,
        chains: chains2,
        computedTheme: darkTheme({
          accentColor: "#6673FF",
          borderRadius: "large",
          fontStack: type === "pixel" ? "Pixel" : "system"
        })
      };
    }
    return {};
  }, []);
  if (!wagmiConfig || !chains || !computedTheme) {
    return null;
  }
  return /* @__PURE__ */ React36.createElement(WagmiConfig, {
    config: wagmiConfig
  }, /* @__PURE__ */ React36.createElement(RainbowKitProvider, {
    chains,
    appInfo,
    theme: computedTheme
  }, children));
};
var RainbowKitWithThemeProvider_default = RainbowKitWithThemeProvider;

// src/hooks/useInitRainbowFn.ts
import { useChainModal as useChainModal3 } from "@my/rainbowkit";
import { useEffect as useEffect12 } from "react";
var useInitRainbowFn = () => {
  const { setFn, closeChainModal } = useChainModal3();
  useEffect12(() => {
    if (setFn && closeChainModal) {
      setFn((_c) => {
        return true;
      });
    }
    return () => {
      setFn(void 0);
    };
  }, [setFn, closeChainModal]);
};

// src/hooks/useGetInvitationAddress.tsx
import { useSetRecoilState as useSetRecoilState11 } from "recoil";
import { useEffect as useEffect13 } from "react";
import { ethers as ethers3 } from "ethers";
var useGetInvitationAddress = () => {
  const setInvitationAddressState = useSetRecoilState11(invitationAddressState);
  useEffect13(() => {
    const urlObj = new URL(window.location.href);
    const shareParam = urlObj.searchParams.get("share");
    const chain_id = urlObj.searchParams.get("chain_id");
    if (shareParam == null ? void 0 : shareParam.startsWith("0x")) {
      const isValidAddress = ethers3.utils.isAddress(shareParam);
      if (isValidAddress) {
        setInvitationAddressState({
          address: shareParam,
          chainId: Number(chain_id)
        });
      }
    }
  }, []);
};

// src/hooks/useRecentGamesFromGraph.ts
import ZkBingoCardAbi from "@zypher-game/bingo-periphery/abi/BingoCard.json";
import ZkBingoLobbyAbi from "@zypher-game/bingo-periphery/abi/ZkBingoLobby.json";
import { useCallback as useCallback15, useEffect as useEffect15, useState as useState9 } from "react";

// src/hooks/useInterval.ts
import { useEffect as useEffect14, useRef } from "react";
function useInterval(callback, delay, leading = true) {
  const savedCallback = useRef();
  useEffect14(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect14(() => {
    function tick() {
      const current = savedCallback.current;
      current && current();
    }
    if (delay !== null) {
      if (leading)
        tick();
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return void 0;
  }, [delay, leading]);
}

// src/hooks/useRecentGamesFromGraph.ts
import BigNumberjs4 from "bignumber.js";
import { ethers as ethers4 } from "ethers";

// src/utils/data.ts
var getUTCSeconds = () => {
  const now = new Date();
  const utcSeconds = Math.floor(now.getTime() / 1e3);
  return utcSeconds;
};
var SECONDS_PER_DAY = 24 * 60 * 60;
var OFFSET19700101 = 2440588;
function timestampToDateStr(timestamp, split) {
  const _days = Math.floor(timestamp / SECONDS_PER_DAY);
  let L = _days + 68569 + OFFSET19700101;
  const N = Math.floor(4 * L / 146097);
  L = L - Math.floor((146097 * N + 3) / 4);
  let year = Math.floor(4e3 * (L + 1) / 1461001);
  L = L - Math.floor(1461 * year / 4) + 31;
  let month = Math.floor(80 * L / 2447);
  const day = L - Math.floor(2447 * month / 80);
  L = Math.floor(month / 11);
  month = month + 2 - 12 * L;
  year = 100 * (N - 49) + year + L;
  return `${year.toFixed(0)}${split}${month.toFixed(0)}${split}${day.toFixed(
    0
  )}`;
}
var getFormattedTime = (timestamp) => {
  const date = new Date(timestamp * 1e3);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${day}/${month}`;
  return formattedTime;
};
function isTimeout(startedAt, timeout) {
  const currentTime = Math.floor(Date.now() / 1e3);
  const elapsedSeconds = currentTime - startedAt;
  return elapsedSeconds > timeout;
}
var getFormattedTimeMobile = (timestamp) => {
  const date = new Date(timestamp * 1e3);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${day}-${month}`;
  return formattedTime;
};

// src/contract/multicall.ts
import { Multicall } from "ethereum-multicall";

// src/connectors/contract.ts
import { Contract as Contract2, providers } from "ethers";
var globalProvider;
var setProvider = async () => {
  if (window.ethereum) {
    return new providers.Web3Provider(window.ethereum);
  } else if (window.web3) {
    return new providers.Web3Provider(window.web3.currentProvider);
  } else {
    throw new Error("can't find default provider");
  }
};
var getProvider = (url) => {
  return new Promise(async (resolve, reject) => {
    if (url) {
      resolve(new providers.JsonRpcProvider(url));
    } else if (globalProvider) {
      resolve(globalProvider);
    } else {
      const res = await setProvider();
      if (res) {
        globalProvider = res;
        resolve(res);
      } else {
        reject("can't find default provider");
      }
    }
  });
};
window.addEventListener("load", async () => {
  setProvider();
});

// src/utils/getChainId.ts
var getChainId = async () => {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  const isError = !Object.values(ChainId).includes(network.chainId);
  if (isError) {
    throw new Error("Network not supported");
  }
  return network.chainId;
};

// src/contract/multicall.ts
var MulticallContract = async (chainIdParams) => {
  try {
    const chainId = chainIdParams != null ? chainIdParams : await getChainId();
    const provider = await getProvider(sample(ChainRpcUrls[chainId]));
    return new Multicall({
      ethersProvider: provider,
      tryAggregate: false,
      multicallCustomContractAddress: sample(
        CurrencyContract[chainId].multicall
      )
    });
  } catch (error) {
    console.error("Getting multicall failure:", error);
    return void 0;
  }
};
var multicall_default = MulticallContract;

// src/hooks/useRecentGamesFromGraph.ts
var useRecentGamesFromGraph = ({
  env
}) => {
  const [list, setList] = useState9();
  const [hasError, setHasError] = useState9(false);
  const fetchGameInfos = useCallback15(async () => {
    var _a, _b;
    try {
      const value_pre = await batchRequestFromGraph({ env });
      const value = value_pre.filter((v) => !!v);
      if (value.length) {
        const gameList = /* @__PURE__ */ new Map();
        for (let i = 0; i < value.length; i++) {
          if (value[i] && ((_a = value[i]) == null ? void 0 : _a[0].chainId)) {
            const chainId = (_b = value[i]) == null ? void 0 : _b[0].chainId;
            const mapValue = value[i];
            gameList.set(chainId, mapValue);
          }
          if (gameList.size) {
            setList(gameList);
          }
        }
      }
    } catch (e) {
      console.error("fetchGameInfos error: ", e);
      setHasError(true);
    }
  }, []);
  useEffect15(() => {
    fetchGameInfos();
  }, []);
  useInterval(fetchGameInfos, 5e4);
  return {
    list,
    hasError
  };
};
var graphqlApiUrl = {
  [59144 /* LineaMainnet */]: "https://graph-query.linea.build/subgraphs/name/zypher/bingo",
  [59140 /* LineaTestnet */]: "https://linea-goerli-graph.zypher.game/subgraphs/name/linea/goerli",
  [204 /* OPBNB */]: "https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/bingo",
  [5611 /* OPBNBTEST */]: "https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/bingo",
  [421613 /* ArbitrumGoerli */]: "https://arb-goerli-graph.zypher.game/subgraphs/name/arb/bingo"
};
var chainIdPre = {
  [56 /* Mainnet */]: "BNB",
  [97 /* Testnet */]: "BT",
  [42161 /* Arbitrum */]: "AO",
  [421613 /* ArbitrumGoerli */]: "AGT",
  [421611 /* ArbitrumRinkeby */]: "ARBR",
  [59140 /* LineaTestnet */]: "LT",
  [59144 /* LineaMainnet */]: "LM",
  [80001 /* POLYGON_MUMBAI */]: "PM",
  [1442 /* POLYGON_ZKEVM */]: "PZT",
  [204 /* OPBNB */]: "OB",
  [534351 /* ScrollSepoliaTestnet */]: "SST",
  [534353 /* ScrollAlphaTestnet */]: "SAT",
  [5611 /* OPBNBTEST */]: "OBT",
  [169 /* MantaPacificMainnet */]: "MPM",
  [3441005 /* MantaPacificTestnet */]: "MPT",
  [91715 /* ComboTestnet */]: "CbT",
  [5e3 /* Mantle */]: "MTM",
  [5001 /* MantleTestnet */]: "MTT",
  [9980 /* Combo */]: "Cb",
  [11155111 /* Sepolia */]: "Sp"
};
function getStatus(status) {
  if (status === 0) {
    return "invalid" /* Invalid */;
  } else if (status === 1) {
    return "live" /* Live */;
  } else if (status === 2) {
    return "end" /* End */;
  } else if (status === 3) {
    return "overtime" /* Overtime */;
  }
  return "invalid" /* Invalid */;
}
function formatDataFromGraph({
  chainId,
  data,
  recentGames
}) {
  return data.map((v, index) => {
    const {
      cardAddr,
      endedAt,
      feeRatio,
      feeAmount,
      joinAmount,
      id: idHex,
      lobbyAddr,
      pCount,
      startedAt,
      status: statusNumber,
      winAmount,
      winCardId,
      winner
    } = v || {};
    let status = getStatus(statusNumber);
    const id = parseInt(idHex, 16).toString();
    let winnerOrPlayers = `${pCount} players`;
    let inputPerPlayer = joinAmount ? new BigNumberjs4(ethers4.utils.formatEther(joinAmount)).dividedBy(new BigNumberjs4(pCount)).toNumber() : "-";
    let win = "-";
    let multiplier = "-";
    let cardNumbers;
    let selectedNumbers;
    if (status === "end" /* End */ && recentGames.size) {
      winnerOrPlayers = winner;
      const poolWin = new BigNumberjs4(ethers4.utils.formatEther(winAmount));
      win = formatMoney(poolWin.toNumber());
      multiplier = formatMoney(
        poolWin.dividedBy(new BigNumberjs4(inputPerPlayer)).toNumber()
      );
      cardNumbers = recentGames.get(
        "cardNumbers" + cardAddr.toLowerCase() + winCardId
      );
      selectedNumbers = recentGames.get(
        "selectedNumbers" + lobbyAddr.toLowerCase() + id
      );
    }
    if (status === "live" /* Live */) {
      const timeout = 30 * 60;
      if (isTimeout(startedAt, timeout)) {
        status = "overtime" /* Overtime */;
      }
    }
    inputPerPlayer = inputPerPlayer !== "-" ? formatMoney(Number(inputPerPlayer), 0) : "-";
    return {
      chainId,
      status,
      startTimeNumber: `${startedAt}`,
      startTime: getFormattedTime(startedAt),
      startTimeMobile: getFormattedTimeMobile(startedAt),
      game: "zBingo" /* zBingo */,
      winner,
      cardAddr,
      endedAt,
      feeAmount,
      feeRatio,
      lobbyAddr,
      roomID: id,
      roomIDStr: chainIdPre[chainId] + "B#" + id,
      bingoInfo: {
        cardNumbers,
        selectedNumbers
      },
      inputPerPlayer,
      multiplier,
      win,
      winnerOrPlayers
    };
  });
}
async function batchRequestFromGraph({
  env
}) {
  const requests = supportedChainIds(env).map(async (chainIdLocal) => {
    var _a;
    const api = graphqlApiUrl[chainIdLocal];
    if (!api) {
      return void 0;
    }
    const result = await request(api, {
      method: "POST",
      data: JSON.stringify({
        query: `query MyQuery {
          gameInfos(orderBy: startedAt, orderDirection: desc, first: 40) {
            cardAddr
            endedAt
            feeAmount
            feeRatio
            id
            joinAmount
            lobbyAddr
            pCount
            source
            startedAt
            status
            winAmount
            winCardId
            winner
          }
        }`,
        variables: {},
        operationName: "MyQuery"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (result.data && result.data.data && result.data.data.gameInfos) {
      if (result.data.data.gameInfos.length) {
        const gameIdList = result.data.data.gameInfos.map(
          (v) => parseInt(v.id, 16).toString()
        );
        const lobbyAddrList = result.data.data.gameInfos.map(
          (v) => v.lobbyAddr
        );
        const endFilter = result.data.data.gameInfos.filter((v) => getStatus(v.status) === "end" /* End */).map((v) => ({ winCardId: v.winCardId, cardAddr: v.cardAddr }));
        const winCardIdList = endFilter.map((v) => v.winCardId);
        const cardAddrList = endFilter.map((v) => v.cardAddr);
        const recentGames = (_a = await getRecentGameById({
          chainId: chainIdLocal,
          lobbyAddrList,
          gameIdList,
          cardAddrList,
          winCardIdList
        })) != null ? _a : /* @__PURE__ */ new Map();
        return formatDataFromGraph({
          chainId: chainIdLocal,
          data: result.data.data.gameInfos,
          recentGames
        });
      }
    }
    return void 0;
  });
  return Promise.all(requests);
}
var getRecentGameById = async ({
  chainId,
  lobbyAddrList,
  gameIdList,
  cardAddrList,
  winCardIdList
}) => {
  try {
    const paramsGameId = gameIdList.map((gameId, index) => ({
      reference: "selectedNumbers" + lobbyAddrList[index].toLowerCase() + gameId,
      contractAddress: lobbyAddrList[index],
      abi: ZkBingoLobbyAbi,
      calls: [
        {
          methodName: "getSelectedNumbers",
          reference: "getSelectedNumbers",
          methodParameters: [gameId]
        }
      ]
    }));
    const paramsCardId = winCardIdList.map((winCardId, index) => ({
      reference: "cardNumbers" + cardAddrList[index].toLowerCase() + winCardId,
      contractAddress: cardAddrList[index],
      abi: ZkBingoCardAbi,
      calls: [
        {
          methodName: "getCardNumbers",
          reference: "getCardNumbers",
          methodParameters: [winCardId]
        }
      ]
    }));
    const multicall = await multicall_default(chainId);
    if (multicall) {
      const { results } = await multicall.call([
        ...paramsGameId,
        ...paramsCardId
      ]);
      if (results) {
        const map = /* @__PURE__ */ new Map();
        Object.values(results).map((v) => {
          const num = v["callsReturnContext"][0]["returnValues"];
          map.set(v["originalContractCallContext"]["reference"], num);
        });
        return map;
      }
    }
    return void 0;
  } catch (err) {
    console.error("getRecentGameById err: ", err);
    return void 0;
  }
};

// src/index.ts
import { changeLanguage as changeLanguage2 } from "i18next";
import { useConnectModal, useChainModal as useChainModal4 } from "@my/rainbowkit";
export {
  Balance_default as Balance,
  BlockExplorerUrls,
  ChainId,
  ChainImage,
  ChainName,
  ChainNetworkName,
  ChainRpcUrls,
  ChainRpcWebSocketUrls,
  ChainSelector,
  ChainSelectorWidget_default as ChainSelectorWidget,
  CommunityLink_default as CommunityLink,
  Currency,
  CurrencyContract,
  CurrencyLogo,
  CurrencyLogo_default as CurrencyLogoComp,
  DPSupportChainId,
  DivWrap_default as DivWrap,
  header_default as Header,
  IContractName,
  IGameName,
  IGameStatus,
  INavLinkType,
  IsMd1100Provider,
  IsMd1220Provider,
  IsMdProvider,
  IsMobileProvider,
  LinkList,
  LinkToBetaDialog_default as LinkToBetaDialog,
  LngNs,
  AccountInfoDialog_default as LogoutDialog,
  multicall_default as MulticallContract,
  PixelFlatBtn_default as PixelFlatBtn,
  PlayerAvatar_default as PlayerAvatar,
  PlayerAvatarList,
  PointsDialog_default as PointsDialog,
  PointsIcon,
  PointsRuleDialog_default as PointsRuleDialog,
  RainbowKitWithThemeProvider_default as RainbowKitWithThemeProvider,
  RecoilRoot,
  SideBar_default as SideBar,
  SvgComponent_default as SvgComponent,
  bingoPoints_default as ZkBingoPointsContract,
  accountInfoDialogState,
  appInfo,
  atom6 as atom,
  bingoBetaSupportedChainId,
  bingoSupportedChainId,
  bingoV1SupportedChainId,
  blankLinkList,
  bnPow10,
  chainIdPre,
  changeLanguage2 as changeLanguage,
  connectorState,
  convertToLargeNumberRepresentation,
  defaultSelectedKey,
  divisor6xBigNumber,
  divisorBigNumber,
  eX,
  erc20Abi,
  erc20_default as erc20Contract,
  filterInput,
  formatCurrency,
  formatDataFromGraph,
  formatDecimal,
  formatMoney,
  formatSymbol,
  getChainId,
  getContract,
  getContractFromRpc,
  getFormattedTime,
  getFormattedTimeMobile,
  getProvider,
  getRecentGameById,
  getShortenAddress,
  getShortenAddress2,
  getStatus,
  getUTCSeconds,
  graphqlApiUrl,
  hidePointsWarnState,
  isPro,
  isTestnet,
  isTimeout,
  languageList,
  linkToBetaDialogChainIdState,
  linkToBetaDialogState,
  localStorageEffect,
  measureText,
  nativeBalanceState,
  pointsBalanceState,
  pointsDialogState,
  pointsRuleDialogState,
  pointsWarnState,
  pow10,
  preStaticUrl,
  refreshBalanceState,
  request,
  selector,
  siderCollapseState,
  splitArrByLen,
  supportedChainIds,
  timestampToDateStr,
  txStatus,
  useAccountInvitation,
  useActiveChainId,
  useActiveWallet,
  useActiveWeb3React,
  useChainModal4 as useChainModal,
  useConnectModal,
  useCurrentLanguage,
  useCustomTranslation,
  useGetInvitationAddress,
  useInitRainbowFn,
  useInterval,
  useIsMd,
  useIsMd1100,
  useIsMd1220,
  useIsMobile,
  useNativeBalanceStr,
  useNavItem,
  usePathname,
  usePointsBalanceStr,
  usePublicNodeWaitForTransaction,
  useRecentGamesFromGraph,
  useRecoilState11 as useRecoilState,
  useRecoilValue9 as useRecoilValue,
  useResetRecoilState,
  useSetRecoilState12 as useSetRecoilState,
  useSwapPoint,
  useSwitchNetwork,
  useWalletClient2 as useWalletClient,
  useWindowSize,
  walletModalOpenState,
  zkBingo,
  zkBingoV0
};
