"use client";
// src/index.ts
import {
  useSetRecoilState as useSetRecoilState13,
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
import { useWalletClient as useWalletClient2, useSwitchNetwork as useSwitchNetwork2 } from "wagmi";

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
import React60, { useEffect as useEffect20, useMemo as useMemo8 } from "react";
import { useSetRecoilState as useSetRecoilState2 } from "recoil";

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
  const { onClick, children, className, style: style10 } = props;
  return /* @__PURE__ */ React.createElement("div", {
    className: `pixel_flat_btn ${className != null ? className : ""}`,
    onClick,
    style: style10
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
  const [isMobile2, setIsMobile] = useRecoilState(isMobileState);
  const size = useWindowSize();
  useEffect2(() => {
    const nowIsMobile = size.width < 768;
    if (isMobile2 !== nowIsMobile) {
      setIsMobile(nowIsMobile);
    }
  }, [size.width, isMobile2]);
  return /* @__PURE__ */ React3.createElement(IsMobileContext.Provider, {
    value: isMobile2
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
  const [isMobile2] = useRecoilState2(isMobileState);
  if (isMobile2 === void 0) {
    return false;
  }
  return isMobile2;
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

// src/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx
import React28, { Fragment, useContext as useContext6, useEffect as useEffect9, useState as useState7 } from "react";

// src/rainbowkit/src/css/touchableStyles.css.ts
import { createVar, style as style2, styleVariants } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

// src/rainbowkit/src/css/reset.css.ts
import { style } from "@vanilla-extract/css";
var base = style({
  border: 0,
  boxSizing: "border-box",
  fontSize: "100%",
  lineHeight: "normal",
  margin: 0,
  padding: 0,
  textAlign: "left",
  verticalAlign: "baseline",
  WebkitTapHighlightColor: "transparent"
});
var list = style({
  listStyle: "none"
});
var quote = style({
  quotes: "none",
  selectors: {
    "&:before, &:after": {
      content: "''"
    }
  }
});
var table = style({
  borderCollapse: "collapse",
  borderSpacing: 0
});
var appearance = style({
  appearance: "none"
});
var field = style([
  appearance,
  {
    "::placeholder": {
      opacity: 1
    },
    "outline": "none"
  }
]);
var mark = style({
  backgroundColor: "transparent",
  color: "inherit"
});
var select = style([
  field,
  {
    ":disabled": {
      opacity: 1
    },
    "selectors": {
      "&::-ms-expand": {
        display: "none"
      }
    }
  }
]);
var input = style([
  field,
  {
    selectors: {
      "&::-ms-clear": {
        display: "none"
      },
      "&::-webkit-search-cancel-button": {
        WebkitAppearance: "none"
      }
    }
  }
]);
var button = style({
  background: "none",
  cursor: "pointer",
  textAlign: "left"
});
var a = style({
  color: "inherit",
  textDecoration: "none"
});
var element = {
  a,
  blockquote: quote,
  button,
  input,
  mark,
  ol: list,
  q: quote,
  select,
  table,
  textarea: field,
  ul: list
};

// src/rainbowkit/src/css/sprinkles.css.ts
import { createGlobalThemeContract } from "@vanilla-extract/css";
import { createMapValueFn, createNormalizeValueFn, createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
var themeContractValues = {
  colors: {
    accentColor: "",
    accentColorForeground: "",
    actionButtonBorder: "",
    actionButtonBorderMobile: "",
    actionButtonSecondaryBackground: "",
    closeButton: "",
    closeButtonBackground: "",
    connectButtonBackground: "",
    connectButtonBackgroundError: "",
    connectButtonInnerBackground: "",
    connectButtonText: "",
    connectButtonTextError: "",
    connectionIndicator: "",
    connectionIndicatorBorder: "",
    downloadBottomCardBackground: "",
    downloadTopCardBackground: "",
    error: "",
    generalBorder: "",
    generalBorderDim: "",
    menuItemBackground: "",
    modalBackdrop: "",
    modalBackground: "",
    modalBorder: "",
    modalText: "",
    modalTextDim: "",
    modalTextSecondary: "",
    profileAction: "",
    profileActionHover: "",
    profileForeground: "",
    selectedOptionBorder: "",
    standby: "",
    standbyBorder: ""
  },
  fonts: {
    body: ""
  },
  radii: {
    actionButton: "",
    connectButton: "",
    menuButton: "",
    modal: "",
    modalMobile: ""
  },
  shadows: {
    connectButton: "",
    dialog: "",
    profileDetailsAction: "",
    selectedOption: "",
    selectedWallet: "",
    walletLogo: ""
  },
  blurs: {
    modalOverlay: ""
  }
};
var themeVars = createGlobalThemeContract(themeContractValues, (_, path) => `rk-${path.join("-")}`);
var spacing = {
  "-1": "-1px",
  "0": "0",
  "1": "1px",
  "2": "2px",
  "3": "3px",
  "4": "4px",
  "5": "5px",
  "6": "6px",
  "8": "8px",
  "10": "10px",
  "12": "12px",
  "14": "14px",
  "16": "16px",
  "18": "18px",
  "20": "20px",
  "24": "24px",
  "28": "28px",
  "32": "32px",
  "36": "36px",
  "44": "44px",
  "64": "64px"
};
var dimensions = {
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "8": "8px",
  "9": "9px",
  "12": "12px",
  "20": "20px",
  "24": "24px",
  "28": "28px",
  "30": "30px",
  "32": "32px",
  "34": "34px",
  "36": "36px",
  "40": "40px",
  "44": "44px",
  "48": "48px",
  "54": "54px",
  "60": "60px",
  "200": "200px",
  full: "100%",
  max: "max-content"
};
var flexAlignment = ["flex-start", "flex-end", "center"];
var textAlignments = ["left", "center", "inherit"];
var largeScreenMinWidth = 768;
var responsiveProperties = defineProperties({
  conditions: {
    smallScreen: {},
    largeScreen: {
      "@media": `screen and (min-width: ${largeScreenMinWidth}px)`
    }
  },
  defaultCondition: "smallScreen",
  properties: {
    alignItems: flexAlignment,
    display: ["none", "block", "flex", "inline"]
  }
});
var mapResponsiveValue = createMapValueFn(responsiveProperties);
var normalizeResponsiveValue = createNormalizeValueFn(responsiveProperties);
var unresponsiveProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    backgroundSize: ["cover"],
    borderRadius: {
      ...themeVars.radii,
      "1": "1px",
      "6": "6px",
      "10": "10px",
      "13": "13px",
      "25%": "25%",
      full: "9999px"
    },
    borderStyle: {
      solid: "solid"
    },
    borderWidth: {
      "0": "0px",
      "1": "1px",
      "2": "2px",
      "3": "3px",
      "4": "4px"
    },
    cursor: ["pointer"],
    flexDirection: ["row", "column"],
    fontFamily: themeVars.fonts,
    fontSize: {
      "12": { fontSize: "12px", lineHeight: "18px" },
      "13": { fontSize: "13px", lineHeight: "18px" },
      "14": { fontSize: "14px", lineHeight: "18px" },
      "16": { fontSize: "16px", lineHeight: "20px" },
      "18": { fontSize: "18px", lineHeight: "24px" },
      "20": { fontSize: "20px", lineHeight: "24px" },
      "23": { fontSize: "23px", lineHeight: "29px" }
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      heavy: "800"
    },
    gap: spacing,
    height: dimensions,
    justifyContent: [...flexAlignment, "space-between", "space-around"],
    textAlign: textAlignments,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    maxWidth: dimensions,
    minWidth: dimensions,
    overflow: ["hidden"],
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    position: ["absolute", "fixed", "relative"],
    right: {
      "0": "0"
    },
    transition: {
      default: "0.125s ease",
      transform: "transform 0.125s ease"
    },
    userSelect: ["none"],
    width: dimensions,
    backdropFilter: {
      ...themeVars.blurs
    }
  },
  shorthands: {
    margin: ["marginTop", "marginBottom", "marginLeft", "marginRight"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"]
  }
});
var colorProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" }
  },
  defaultCondition: "base",
  properties: {
    background: themeVars.colors,
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows,
    color: themeVars.colors
  }
});
var sprinkles = createSprinkles(colorProperties, responsiveProperties, unresponsiveProperties);

// src/rainbowkit/src/css/touchableStyles.css.ts
var hoverScaleValues = {
  grow: 1.025,
  growLg: 1.1
};
var activeScaleValues = {
  shrink: 0.95,
  shrinkSm: 0.9
};
var hoverScaleVar = createVar();
var activeScaleVar = createVar();
var base2 = style2([
  sprinkles({
    position: "relative"
  }),
  {
    selectors: {
      "&,&::after": {
        vars: {
          [hoverScaleVar]: "1",
          [activeScaleVar]: "1"
        }
      },
      "&:hover": {
        transform: `scale(${hoverScaleVar})`
      },
      "&:active": {
        transform: `scale(${activeScaleVar})`
      },
      "&:active::after": {
        bottom: -1,
        content: '""',
        display: "block",
        left: -1,
        position: "absolute",
        right: -1,
        top: -1,
        transform: `scale(${calc(1).divide(activeScaleVar).multiply(hoverScaleVar).toString()})`
      }
    }
  }
]);
var hover = styleVariants(hoverScaleValues, (scale) => ({
  selectors: {
    "&,&::after": {
      vars: { [hoverScaleVar]: String(scale) }
    }
  }
}));
var active = styleVariants(activeScaleValues, (scale) => ({
  selectors: {
    "&,&::after": {
      vars: { [activeScaleVar]: String(scale) }
    }
  }
}));

// src/rainbowkit/src/css/touchableStyles.ts
function touchableStyles({ active: active2, hover: hover2 }) {
  return [base2, hover2 && hover[hover2], active[active2]];
}

// src/rainbowkit/src/utils/browsers.ts
function isSafari() {
  return typeof navigator !== "undefined" && /Version\/([0-9._]+).*Safari/.test(navigator.userAgent);
}
function isArc() {
  return typeof document !== "undefined" && getComputedStyle(document.body).getPropertyValue("--arc-palette-focus") !== "";
}
function getBrowser() {
  var _a;
  if (typeof navigator === "undefined")
    return "Browser" /* Browser */;
  const ua = navigator.userAgent.toLowerCase();
  if ((_a = navigator.brave) == null ? void 0 : _a.isBrave)
    return "Brave" /* Brave */;
  else if (ua.indexOf("edg/") > -1)
    return "Edge" /* Edge */;
  else if (ua.indexOf("op") > -1)
    return "Opera" /* Opera */;
  else if (isArc())
    return "Arc" /* Arc */;
  else if (ua.indexOf("chrome") > -1)
    return "Chrome" /* Chrome */;
  else if (ua.indexOf("firefox") > -1)
    return "Firefox" /* Firefox */;
  else if (isSafari())
    return "Safari" /* Safari */;
  return "Browser" /* Browser */;
}

// src/rainbowkit/src/utils/groupBy.ts
function groupBy(items, getKey) {
  const groupedItems = {};
  items.forEach((item) => {
    const key = getKey(item);
    if (!key) {
      return;
    }
    if (!groupedItems[key]) {
      groupedItems[key] = [];
    }
    groupedItems[key].push(item);
  });
  return groupedItems;
}

// src/rainbowkit/src/wallets/useWalletConnectors.ts
import { useConnect } from "wagmi";

// src/rainbowkit/src/utils/flatten.ts
function flatten(array) {
  const flattenedItems = [];
  for (const items of array) {
    flattenedItems.push(...items);
  }
  return flattenedItems;
}

// src/rainbowkit/src/utils/indexBy.ts
function indexBy(items, getKey) {
  const indexedItems = {};
  items.forEach((item) => {
    const key = getKey(item);
    if (!key) {
      return;
    }
    indexedItems[key] = item;
  });
  return indexedItems;
}

// src/rainbowkit/src/utils/isNotNullish.ts
function isNotNullish(value) {
  return value != null;
}

// src/rainbowkit/src/components/RainbowKitProvider/RainbowKitChainContext.tsx
import React4, { createContext as createContext2, useContext as useContext2, useMemo } from "react";

// src/rainbowkit/src/components/RainbowKitProvider/provideRainbowKitChains.ts
var arbitrumIcon = {
  iconBackground: "#96bedc",
  iconUrl: async () => (await import("./arbitrum-7Z5RMUIY.js")).default
};
var comboIcon = {
  iconBackground: "transparent",
  iconUrl: async () => (await import("./combo-ZH2QNSNA.js")).default
};
var mantaIcon = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./manta-DBSOIVWO.js")).default
};
var mantleIcon = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./mantle-4MNSB3XO.js")).default
};
var avalancheIcon = {
  iconBackground: "#e84141",
  iconUrl: async () => (await import("./avalanche-SZDGTLVO.js")).default
};
var baseIcon = {
  iconBackground: "#0052ff",
  iconUrl: async () => (await import("./base-RERJ7KTI.js")).default
};
var bscIcon = {
  iconBackground: "#ebac0e",
  iconUrl: async () => (await import("./bsc-OPQDDJCD.js")).default
};
var cronosIcon = {
  iconBackground: "#002D74",
  iconUrl: async () => (await import("./cronos-QOXA3DWW.js")).default
};
var ethereumIcon = {
  iconBackground: "#484c50",
  iconUrl: async () => (await import("./ethereum-VMNZL6AX.js")).default
};
var hardhatIcon = {
  iconBackground: "#f9f7ec",
  iconUrl: async () => (await import("./hardhat-QKZDMVWX.js")).default
};
var optimismIcon = {
  iconBackground: "#ff5a57",
  iconUrl: async () => (await import("./optimism-DRZRCXRT.js")).default
};
var polygonIcon = {
  iconBackground: "#9f71ec",
  iconUrl: async () => (await import("./polygon-X4XLCKFF.js")).default
};
var zoraIcon = {
  iconBackground: "#000000",
  iconUrl: async () => (await import("./zora-WC6ITYKX.js")).default
};
var lineaIcon = {
  iconBackground: "#000",
  iconUrl: async () => (await import("./linea-GLBETBIC.js")).default
};
var lineaTestIcon = {
  iconBackground: "#4BDCFD",
  iconUrl: async () => (await import("./linea_test-MQQDFOFK.js")).default
};
var GSCIcon = {
  iconBackground: "#10253E",
  iconUrl: async () => (await import("./gsc-ECF4RIDP.js")).default
};
var ScrollIcon = {
  iconBackground: "#10253E",
  iconUrl: async () => (await import("./scroll-DTF4ZONL.js")).default
};
var chainMetadataByName = {
  arbitrum: { chainId: 42161, name: "Arbitrum", ...arbitrumIcon },
  arbitrumGoerli: { chainId: 421613, ...arbitrumIcon },
  avalanche: { chainId: 43114, ...avalancheIcon },
  avalancheFuji: { chainId: 43113, ...avalancheIcon },
  base: { chainId: 8453, ...baseIcon },
  baseGoerli: { chainId: 84531, ...baseIcon },
  bsc: { chainId: 56, name: "BSC", ...bscIcon },
  bscTestnet: { chainId: 97, ...bscIcon },
  cronos: { chainId: 25, ...cronosIcon },
  cronosTestnet: { chainId: 338, ...cronosIcon },
  goerli: { chainId: 5, ...ethereumIcon },
  hardhat: { chainId: 31337, ...hardhatIcon },
  kovan: { chainId: 42, ...ethereumIcon },
  localhost: { chainId: 1337, ...ethereumIcon },
  mainnet: { chainId: 1, ...ethereumIcon },
  optimism: { chainId: 10, name: "Optimism", ...optimismIcon },
  optimismGoerli: { chainId: 420, ...optimismIcon },
  optimismKovan: { chainId: 69, ...optimismIcon },
  polygon: { chainId: 137, ...polygonIcon },
  polygonMumbai: { chainId: 80001, ...polygonIcon },
  rinkeby: { chainId: 4, ...ethereumIcon },
  ropsten: { chainId: 3, ...ethereumIcon },
  sepolia: { chainId: 11155111, ...ethereumIcon },
  zora: { chainId: 7777777, ...zoraIcon },
  zoraTestnet: { chainId: 999, ...zoraIcon },
  lineaMainnet: { chainId: 59144, ...lineaIcon },
  lineaTestnet: { chainId: 59140, ...lineaTestIcon },
  opBNBMainnet: { chainId: 204, ...bscIcon },
  opBNBTestnet: { chainId: 5611, ...bscIcon },
  polygonZkEVMTestnet: { chainId: 1442, ...polygonIcon },
  GSCTestnet: { chainId: 1205, ...GSCIcon },
  scrollSepolia: { chainId: 534351, ...ScrollIcon },
  MantaPacificMainnet: { chainId: 169, ...mantaIcon },
  MantaPacificTestnet: { chainId: 3441005, ...mantaIcon },
  Combo: { chainId: 9980, ...comboIcon },
  ComboTestnet: { chainId: 91715, ...comboIcon },
  Mantle: { chainId: 5e3, ...mantleIcon },
  MantleTestnet: { chainId: 5001, ...mantleIcon }
};
var chainMetadataById = Object.fromEntries(
  Object.values(chainMetadataByName).filter(isNotNullish).map(({ chainId, ...metadata }) => [chainId, metadata])
);
var provideRainbowKitChains = (chains) => chains.map((chain) => {
  var _a;
  return {
    ...chain,
    ...(_a = chainMetadataById[chain.id]) != null ? _a : {}
  };
});

// src/rainbowkit/src/components/RainbowKitProvider/RainbowKitChainContext.tsx
var RainbowKitChainContext = createContext2({
  chains: []
});
function RainbowKitChainProvider({ chains, children, initialChain }) {
  return /* @__PURE__ */ React4.createElement(RainbowKitChainContext.Provider, {
    value: useMemo(
      () => ({
        chains: provideRainbowKitChains(chains),
        initialChainId: typeof initialChain === "number" ? initialChain : initialChain == null ? void 0 : initialChain.id
      }),
      [chains, initialChain]
    )
  }, children);
}
var useRainbowKitChains = () => {
  return useContext2(RainbowKitChainContext).chains;
};
var useInitialChainId = () => useContext2(RainbowKitChainContext).initialChainId;
var useRainbowKitChainsById = () => {
  const rainbowkitChains = useRainbowKitChains();
  return useMemo(() => {
    const rainbowkitChainsById = {};
    rainbowkitChains.forEach((rkChain) => {
      rainbowkitChainsById[rkChain.id] = rkChain;
    });
    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};

// src/rainbowkit/src/utils/isMobile.ts
function isAndroid() {
  return typeof navigator !== "undefined" && /android/i.test(navigator.userAgent);
}
function isSmallIOS() {
  return typeof navigator !== "undefined" && /iPhone|iPod/.test(navigator.userAgent);
}
function isLargeIOS() {
  return typeof navigator !== "undefined" && (/iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
function isIOS() {
  return isSmallIOS() || isLargeIOS();
}
function isMobile() {
  return isAndroid() || isIOS();
}

// src/rainbowkit/src/wallets/downloadUrls.ts
var getExtensionDownloadUrl = (wallet) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const browser = getBrowser();
  return (_l = {
    ["Arc" /* Arc */]: (_a = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _a.chrome,
    ["Brave" /* Brave */]: (_b = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _b.chrome,
    ["Chrome" /* Chrome */]: (_c = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _c.chrome,
    ["Edge" /* Edge */]: ((_d = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _d.edge) || ((_e = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _e.chrome),
    ["Firefox" /* Firefox */]: (_f = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _f.firefox,
    ["Opera" /* Opera */]: ((_g = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _g.opera) || ((_h = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _h.chrome),
    ["Safari" /* Safari */]: (_i = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _i.safari,
    ["Browser" /* Browser */]: (_j = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _j.browserExtension
  }[browser]) != null ? _l : (_k = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _k.browserExtension;
};
var getMobileDownloadUrl = (wallet) => {
  var _a, _b, _c, _d;
  const ios = isIOS();
  return (_d = ios ? (_a = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _a.ios : (_b = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _b.android) != null ? _d : (_c = wallet == null ? void 0 : wallet.downloadUrls) == null ? void 0 : _c.mobile;
};

// src/rainbowkit/src/wallets/recentWalletIds.ts
var storageKey = "rk-recent";
function safeParseJsonArray(string) {
  try {
    const value = string ? JSON.parse(string) : [];
    return Array.isArray(value) ? value : [];
  } catch (err) {
    return [];
  }
}
function getRecentWalletIds() {
  return typeof localStorage !== "undefined" ? safeParseJsonArray(localStorage.getItem(storageKey)) : [];
}
function dedupe(array) {
  return [...new Set(array)];
}
function addRecentWalletId(walletId) {
  const newValue = dedupe([walletId, ...getRecentWalletIds()]);
  localStorage.setItem(storageKey, JSON.stringify(newValue));
}

// src/rainbowkit/src/wallets/useWalletConnectors.ts
function useWalletConnectors() {
  const rainbowKitChains = useRainbowKitChains();
  const intialChainId = useInitialChainId();
  const { connectAsync, connectors: defaultConnectors_untyped } = useConnect();
  const defaultConnectors = defaultConnectors_untyped;
  async function connectWallet(walletId, connector) {
    var _a, _b, _c;
    const walletChainId = await connector.getChainId();
    const result = await connectAsync({
      chainId: (_c = intialChainId != null ? intialChainId : (_a = rainbowKitChains.find(({ id }) => id === walletChainId)) == null ? void 0 : _a.id) != null ? _c : (_b = rainbowKitChains[0]) == null ? void 0 : _b.id,
      connector
    });
    if (result) {
      addRecentWalletId(walletId);
    }
    return result;
  }
  async function connectToWalletConnectModal(walletId, walletConnectModalConnector) {
    try {
      return await connectWallet(walletId, walletConnectModalConnector);
    } catch (err) {
      const isUserRejection = err.name === "UserRejectedRequestError" || err.message === "Connection request reset. Please try again.";
      if (!isUserRejection) {
        throw err;
      }
    }
  }
  const walletInstances = flatten(
    defaultConnectors.map((connector) => {
      var _a;
      return (_a = connector._wallets) != null ? _a : [];
    })
  ).sort((a2, b) => a2.index - b.index);
  const walletInstanceById = indexBy(
    walletInstances,
    (walletInstance) => walletInstance.id
  );
  const MAX_RECENT_WALLETS = 3;
  const recentWallets = getRecentWalletIds().map((walletId) => walletInstanceById[walletId]).filter(isNotNullish).slice(0, MAX_RECENT_WALLETS);
  const groupedWallets = [
    ...recentWallets,
    ...walletInstances.filter(
      (walletInstance) => !recentWallets.includes(walletInstance)
    )
  ];
  const walletConnectors = [];
  groupedWallets.forEach((wallet) => {
    var _a;
    if (!wallet) {
      return;
    }
    const recent = recentWallets.includes(wallet);
    walletConnectors.push({
      ...wallet,
      connect: () => wallet.connector.showQrModal ? connectToWalletConnectModal(wallet.id, wallet.connector) : connectWallet(wallet.id, wallet.connector),
      extensionDownloadUrl: getExtensionDownloadUrl(wallet),
      groupName: wallet.groupName,
      mobileDownloadUrl: getMobileDownloadUrl(wallet),
      onConnecting: (fn) => wallet.connector.on(
        "message",
        ({ type }) => type === "connecting" ? fn() : void 0
      ),
      ready: ((_a = wallet.installed) != null ? _a : true) && wallet.connector.ready,
      recent,
      showWalletConnectModal: wallet.walletConnectModalConnector ? () => connectToWalletConnectModal(
        wallet.id,
        wallet.walletConnectModalConnector
      ) : void 0
    });
  });
  return walletConnectors;
}

// src/rainbowkit/src/components/Box/Box.ts
import clsx2 from "clsx";
import * as React5 from "react";

// src/rainbowkit/src/css/atoms.ts
import clsx from "clsx";
var atoms = ({ reset, ...rest }) => {
  if (!reset)
    return sprinkles(rest);
  const elementReset = element[reset];
  const sprinklesClasses = sprinkles(rest);
  return clsx(base, elementReset, sprinklesClasses);
};

// src/rainbowkit/src/components/Box/Box.ts
var Box = React5.forwardRef(
  ({ as = "div", className, testId, ...props }, ref) => {
    const atomProps = {};
    const nativeProps = {};
    for (const key in props) {
      if (sprinkles.properties.has(key)) {
        atomProps[key] = props[key];
      } else {
        nativeProps[key] = props[key];
      }
    }
    const atomicClasses = atoms({
      reset: typeof as === "string" ? as : "div",
      ...atomProps
    });
    return React5.createElement(as, {
      "className": clsx2(atomicClasses, className),
      ...nativeProps,
      "data-testid": testId ? `rk-${testId.replace(/^rk-/, "")}` : void 0,
      ref
    });
  }
);
Box.displayName = "Box";

// src/rainbowkit/src/components/ConnectModal/ConnectModalIntro.tsx
import React15, { useContext as useContext3 } from "react";

// src/rainbowkit/src/components/Button/ActionButton.tsx
import React8 from "react";

// src/rainbowkit/src/components/Text/Text.tsx
import React6 from "react";
var Text = React6.forwardRef(
  ({
    as = "div",
    children,
    className,
    color,
    display,
    font = "body",
    id,
    size = "16",
    style: style10,
    tabIndex,
    textAlign = "inherit",
    weight = "regular"
  }, ref) => {
    return /* @__PURE__ */ React6.createElement(Box, {
      as,
      className,
      color,
      display,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      id,
      ref,
      style: style10,
      tabIndex,
      textAlign
    }, children);
  }
);
Text.displayName = "Text";

// src/components/PixelBtn/ActivePixelButton.tsx
import React7, { memo as memo3, useCallback as useCallback3, useRef } from "react";
import styled from "styled-components";
var PixelStyled = styled(PixelFlatBtn_default)`
  height: ${({ height }) => height};
  min-height: ${({ height }) => height};
  max-width: ${({ width }) => width};
  width: ${({ width }) => width};
  &.pixel_loading {
    opacity: 0.8;
  }
  > .pixel_flat_btn_bg {
    color: #fff;
    > div {
      transition: all 0.3s ease;
      background-color: ${({ backgroundColor }) => backgroundColor};
    }
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
      height: ${({ pixel_height }) => pixel_height}px;
      @media screen and (max-width: 768px) {
        height: ${({ small_pixel_height }) => small_pixel_height}px;
      }
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      top: calc(${({ pixel_height }) => pixel_height}px * 2);
      left: 0;
      @media screen and (max-width: 768px) {
        height: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 4
        );
        top: calc(${({ small_pixel_height }) => small_pixel_height}px * 2);
      }
    }

    > .pixel_flat_btn_top_1 {
      top: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 4
        );
        left: calc(${({ small_pixel_height }) => small_pixel_height}px * 2);
      }
    }
    > .pixel_flat_btn_top_2 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      top: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 2
        );
        top: ${({ small_pixel_height }) => small_pixel_height}px;
        left: ${({ small_pixel_height }) => small_pixel_height}px;
      }
    }

    > .pixel_flat_btn_bottom_2 {
      bottom: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 4
        );
        left: calc(${({ small_pixel_height }) => small_pixel_height}px * 2);
      }
    }
    > .pixel_flat_btn_bottom_1 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      bottom: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
      @media screen and (max-width: 768px) {
        width: calc(
          100% - ${({ small_pixel_height }) => small_pixel_height}px * 2
        );
        bottom: ${({ small_pixel_height }) => small_pixel_height}px;
        left: ${({ small_pixel_height }) => small_pixel_height}px;
      }
    }
  }
  > .pixel_flat_inner {
    width: 100%;
    height: 100%;
  }
`;
var ActivePixelCard = memo3((props) => {
  const {
    pixel_height,
    small_pixel_height,
    onClick
  } = props;
  const lastClickTimeRef = useRef(Date.now());
  const clickHandle = useCallback3(() => {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTimeRef.current;
    if (timeSinceLastClick < 1e3) {
      return;
    }
    lastClickTimeRef.current = currentTime;
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return /* @__PURE__ */ React7.createElement(PixelStyled, {
    ...props,
    onClick: clickHandle,
    small_pixel_height: small_pixel_height != null ? small_pixel_height : pixel_height
  });
});
var ActivePixelCardStyled = styled(ActivePixelCard)`
  cursor: pointer;
`;
var ActivePixelButton = memo3((props) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height
  } = props;
  return /* @__PURE__ */ React7.createElement(ActivePixelCardStyled, {
    ...props,
    className,
    pixel_height,
    backgroundColor,
    width,
    height,
    isLoading,
    borderColor,
    small_pixel_height,
    smallWidth,
    smallHeight
  });
});
var PixelColorStyled = styled(PixelStyled)`
  > .pixel_flat_btn_bg {
    > div {
      background-color: ${({ backgroundColor }) => backgroundColor != null ? backgroundColor : "#1649ff"};
    }
    > .pixel_flat_btn_inner {
      &:before,
      &:after {
        content: "";
        position: absolute;
        width: ${({ pixel_height }) => pixel_height}px;
        height: ${({ pixel_height }) => pixel_height}px;
        @media screen and (max-width: 768px) {
          width: ${({ small_pixel_height }) => small_pixel_height}px;
          height: ${({ small_pixel_height }) => small_pixel_height}px;
        }
      }
      &:before {
        top: 0;
        left: 0;
        background-color: ${({ borderTopColor }) => borderTopColor != null ? borderTopColor : "#3360ff"};
      }
      &:after {
        bottom: 0;
        right: 0;
        background-color: ${({ borderBottomColor }) => borderBottomColor != null ? borderBottomColor : "#0f33b2"};
      }
    }
    > .pixel_flat_btn_top_1 {
      background-color: ${({ borderTopColor }) => borderTopColor != null ? borderTopColor : "#3360ff"};
    }
    > .pixel_flat_btn_top_2 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderTopColor }) => borderTopColor != null ? borderTopColor : "#3360ff"};
      @media screen and (max-width: 768px) {
        border-left: ${({ small_pixel_height }) => small_pixel_height}px solid
          ${({ borderTopColor }) => borderTopColor != null ? borderTopColor : "#3360ff"};
      }
    }
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ borderBottomColor }) => borderBottomColor != null ? borderBottomColor : "#0f33b2"};
    }
    > .pixel_flat_btn_bottom_1 {
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderBottomColor }) => borderBottomColor != null ? borderBottomColor : "#0f33b2"};
      @media screen and (max-width: 768px) {
        border-left: ${({ small_pixel_height }) => small_pixel_height}px solid
          ${({ borderBottomColor }) => borderBottomColor != null ? borderBottomColor : "#0f33b2"};
      }
    }
  }
`;
var ActivePixelColorCard = memo3((props) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height
  } = props;
  return /* @__PURE__ */ React7.createElement(PixelColorStyled, {
    ...props,
    className,
    pixel_height,
    backgroundColor,
    width,
    height,
    isLoading,
    borderColor,
    small_pixel_height: pixel_height != null ? pixel_height : small_pixel_height,
    smallWidth,
    smallHeight
  });
});
var ActivePixelColorCardStyled = styled(ActivePixelColorCard)`
  cursor: pointer;
`;
var ActivePixelButtonColor = memo3((props) => {
  return /* @__PURE__ */ React7.createElement(ActivePixelColorCardStyled, {
    ...props
  });
});
var PixelBorderStyled = styled(PixelFlatBtn_default)`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  & > .pixel_flat_btn_bg {
    & > div {
      background-color: ${({ backgroundColor }) => backgroundColor != null ? backgroundColor : "#1d263b"};
    }
    .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
      height: calc(${({ pixel_height }) => pixel_height + "px"} + 1px);
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      top: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      left: 0;
      @media screen and (max-width: 768px) {
        height: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        top: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_inner,
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
      border: 1px solid ${({ borderColor }) => borderColor != null ? borderColor : "#3a4254"};
      transition: border 0.3s ease;
    }
    > .pixel_flat_btn_top_1 {
      border-bottom: none !important;
      z-index: 3;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_top_2 {
      border-bottom: none !important;
      z-index: 2;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
      top: ${({ pixel_height }) => pixel_height + "px"};
      left: ${({ pixel_height }) => pixel_height + "px"};
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
        top: ${({ pixel_height }) => pixel_height + "px"};
        left: ${({ pixel_height }) => pixel_height + "px"};
      }
    }
    > .pixel_flat_btn_bottom_2 {
      border-top: none !important;
      z-index: 4;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_bottom_1 {
      border-top: none !important;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
      bottom: ${({ pixel_height }) => pixel_height + "px"};
      left: ${({ pixel_height }) => pixel_height + "px"};
      @media screen and (max-width: 768px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
        bottom: ${({ pixel_height }) => pixel_height + "px"};
        left: ${({ pixel_height }) => pixel_height + "px"};
      }
    }
  }
  > .pixel_flat_inner {
    width: 100%;
    height: 100%;
  }
`;
var PixelBorderCard = memo3((props) => {
  const {
    className,
    pixel_height,
    small_pixel_height,
    width,
    height,
    backgroundColor,
    borderColor,
    showHover,
    onClick
  } = props;
  const lastClickTimeRef = useRef(Date.now());
  const clickHandle = useCallback3(() => {
    const currentTime = Date.now();
    const timeSinceLastClick = currentTime - lastClickTimeRef.current;
    if (timeSinceLastClick < 1e3) {
      return;
    }
    lastClickTimeRef.current = currentTime;
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  return /* @__PURE__ */ React7.createElement(PixelBorderStyled, {
    ...props,
    pixel_height,
    backgroundColor,
    width,
    height,
    borderColor,
    className: `${className} pixelBorderCard`,
    showHover,
    small_pixel_height: pixel_height != null ? pixel_height : small_pixel_height,
    onClick: clickHandle
  });
});
var PixelCube2Styled = styled(PixelStyled)`
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_top_1,
      > .pixel_flat_btn_bottom_2 {
        background-color: ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
      }
      > .pixel_flat_btn_inner,
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_1 {
        border-left: ${({ pixel_height }) => pixel_height}px solid
          ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
        border-right: ${({ pixel_height }) => pixel_height}px solid
          ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
      }
    }
  }
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ borderColor }) => borderColor};
    }
    > .pixel_flat_btn_inner,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
    }
  }
`;
var PixelCube2 = memo3((props) => {
  const {
    className,
    isLoading,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    smallWidth,
    height,
    smallHeight,
    small_pixel_height,
    borderTopColor,
    borderBottomColor
  } = props;
  return /* @__PURE__ */ React7.createElement(PixelCube2Styled, {
    ...props,
    className,
    pixel_height,
    backgroundColor,
    width,
    height,
    isLoading,
    borderColor,
    small_pixel_height: small_pixel_height != null ? small_pixel_height : pixel_height,
    smallWidth,
    smallHeight,
    borderTopColor,
    borderBottomColor
  });
});
var PixelCube3Styled = styled(PixelCube2)`
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_1 {
        &:before {
          border-left: ${({ pixel_height }) => pixel_height}px solid
            ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
          border-right: ${({ pixel_height }) => pixel_height}px solid
            ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
        }
      }
    }
  }
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_bottom_2 {
      width: calc(
        100% - ${({ pixel_height, size }) => `${pixel_height}px * ${2 * size}`}
      );
      left: calc(${({ pixel_height, size }) => `${pixel_height}px * ${size}`});
    }
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1 {
      width: calc(
        100% -
          ${({ pixel_height, size }) => `${pixel_height}px * ${2 * (size - 1)}`}
      );
      left: calc(
        ${({ pixel_height, size }) => `${pixel_height}px * ${size - 1}`}
      );
    }
    > .pixel_flat_btn_inner {
      height: calc(
        100% - ${({ pixel_height, size }) => `${pixel_height}px * ${2 * size}`}
      );
      top: calc(${({ pixel_height, size }) => `${size} * ${pixel_height}px`});
    }

    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_1 {
      &:before {
        content: "";
        transition: background-color, border 0.3s ease;
        position: absolute;
        height: ${({ pixel_height }) => pixel_height}px;
        width: calc(100% + ${({ pixel_height }) => pixel_height}px * 4);
        left: calc(-${({ pixel_height }) => pixel_height}px * 2);
        background-color: ${({ backgroundColor }) => backgroundColor};
        border-left: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
        border-right: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
      }
    }
    > .pixel_flat_btn_top_2 {
      &:before {
        top: ${({ pixel_height }) => pixel_height}px;
      }
    }
    > .pixel_flat_btn_bottom_1 {
      &:before {
        top: -${({ pixel_height }) => pixel_height}px;
      }
    }
  }
`;
var PixelCube3 = memo3((props) => {
  const { pixel_height, small_pixel_height, size } = props;
  return /* @__PURE__ */ React7.createElement(PixelCube3Styled, {
    ...props,
    size: size != null ? size : 3,
    small_pixel_height: small_pixel_height != null ? small_pixel_height : pixel_height
  });
});
var PixelCube5Styled = styled(PixelCube3Styled)`
  > .pixel_flat_btn_bg {
    > .pixel_flat_btn_inner {
      &:after,
      &:before {
        content: "";
        position: absolute;
        height: ${({ pixel_height }) => pixel_height}px;
        width: 100%;
        left: 0;
        background-color: ${({ backgroundColor }) => backgroundColor};
      }
      &:before {
        top: -${({ pixel_height }) => pixel_height}px;
      }
      &:after {
        bottom: -${({ pixel_height }) => pixel_height}px;
      }
    }
    > .pixel_flat_btn_top_1:before,
    > .pixel_flat_btn_bottom_2:after {
      content: "";
      position: absolute;
      height: ${({ pixel_height }) => pixel_height}px;
      width: calc(100% + ${({ pixel_height }) => pixel_height}px * 6);
      left: calc(-${({ pixel_height }) => pixel_height}px * 3);
      background-color: ${({ backgroundColor }) => backgroundColor};
    }
    > .pixel_flat_btn_top_1:before {
      top: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
    > .pixel_flat_btn_bottom_2:after {
      bottom: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
  }
`;
var PixelCube5 = memo3((props) => {
  const { pixel_height, small_pixel_height, size } = props;
  return /* @__PURE__ */ React7.createElement(PixelCube5Styled, {
    ...props,
    small_pixel_height: small_pixel_height != null ? small_pixel_height : pixel_height,
    size: size != null ? size : 5
  });
});
var PixelBorderCardStyled = styled(PixelBorderCard)`
  cursor: pointer;
  &:hover {
    > .pixel_flat_btn_bg {
      > .pixel_flat_btn_inner,
      > .pixel_flat_btn_top_1,
      > .pixel_flat_btn_top_2,
      > .pixel_flat_btn_bottom_2,
      > .pixel_flat_btn_bottom_1 {
        border: 1px solid
          ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
      }
    }
  }
`;
var PixelBorderCardButton = memo3((props) => {
  return /* @__PURE__ */ React7.createElement(PixelBorderCardStyled, {
    ...props
  });
});

// src/rainbowkit/src/components/Button/ActionButton.tsx
var sizeVariants = {
  large: {
    fontSize: "16",
    paddingX: "24",
    paddingY: "10"
  },
  medium: {
    fontSize: "14",
    height: "28",
    paddingX: "12",
    paddingY: "4"
  },
  small: {
    fontSize: "14",
    paddingX: "10",
    paddingY: "5"
  }
};
function ActionButton({
  disabled = false,
  href,
  label,
  onClick,
  rel = "noreferrer noopener",
  size = "medium",
  target = "_blank",
  testId,
  type = "primary"
}) {
  const isPrimary = type === "primary";
  const isNotLarge = size !== "large";
  const mobile = isMobile();
  const background = !disabled ? isPrimary ? "#1649FF" : isNotLarge ? "#3360FF" : void 0 : "#1D263B";
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size];
  const hasBorder = !mobile || !isNotLarge;
  return /* @__PURE__ */ React8.createElement(PixelCube2, {
    pixel_height: 2,
    borderColor: background,
    backgroundColor: background,
    height: height ? height + "px" : void 0
  }, /* @__PURE__ */ React8.createElement(Box, {
    ...href ? !disabled ? { as: "a", href, rel, target } : {} : { as: "button", type: "button" },
    onClick: !disabled ? onClick : void 0,
    className: !disabled && touchableStyles({ active: "shrinkSm", hover: "grow" }),
    display: "block",
    paddingX,
    paddingY,
    style: { willChange: "transform" },
    testId,
    textAlign: "center",
    transition: "transform"
  }, /* @__PURE__ */ React8.createElement(Text, {
    color: !disabled ? isPrimary ? "accentColorForeground" : "accentColor" : "modalTextSecondary",
    size: fontSize,
    weight: "bold"
  }, label)));
}

// src/rainbowkit/src/components/Disclaimer/DisclaimerLink.tsx
import React9 from "react";
var DisclaimerLink = ({
  children,
  href
}) => {
  return /* @__PURE__ */ React9.createElement(Box, {
    as: "a",
    color: "accentColor",
    href,
    rel: "noreferrer",
    target: "_blank"
  }, children);
};

// src/rainbowkit/src/components/Disclaimer/DisclaimerText.tsx
import React10 from "react";
var DisclaimerText = ({ children }) => {
  return /* @__PURE__ */ React10.createElement(Text, {
    color: "modalTextSecondary",
    size: "12",
    weight: "medium"
  }, children);
};

// src/rainbowkit/src/components/Icons/Assets.tsx
import React12 from "react";

// src/rainbowkit/src/components/AsyncImage/AsyncImage.tsx
import React11, { useReducer as useReducer2 } from "react";

// src/rainbowkit/src/components/AsyncImage/useAsyncImage.ts
import { useEffect as useEffect4, useReducer } from "react";
var cachedUrls = /* @__PURE__ */ new Map();
var cachedRequestPromises = /* @__PURE__ */ new Map();
async function loadAsyncImage(asyncImage) {
  const cachedRequestPromise = cachedRequestPromises.get(asyncImage);
  if (cachedRequestPromise) {
    return cachedRequestPromise;
  }
  const load = async () => asyncImage().then(async (url) => {
    cachedUrls.set(asyncImage, url);
    return url;
  });
  const requestPromise = load().catch((_err) => {
    return load().catch((_err2) => {
      cachedRequestPromises.delete(asyncImage);
    });
  });
  cachedRequestPromises.set(asyncImage, requestPromise);
  return requestPromise;
}
async function loadImages(...urls) {
  return await Promise.all(
    urls.map((url) => typeof url === "function" ? loadAsyncImage(url) : url)
  );
}
function useForceUpdate() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
}
function useAsyncImage(url) {
  const cachedUrl = typeof url === "function" ? cachedUrls.get(url) : void 0;
  const forceUpdate = useForceUpdate();
  useEffect4(() => {
    if (typeof url === "function" && !cachedUrl) {
      loadAsyncImage(url).then(forceUpdate);
    }
  }, [url, cachedUrl, forceUpdate]);
  return typeof url === "function" ? cachedUrl : url;
}

// src/rainbowkit/src/components/AsyncImage/AsyncImage.tsx
function AsyncImage({
  alt,
  background,
  borderColor,
  borderRadius,
  boxShadow,
  height,
  src: srcProp,
  width
}) {
  const src6 = useAsyncImage(srcProp);
  const isRemoteImage = src6 && /^http/.test(src6);
  const [isRemoteImageLoaded, setRemoteImageLoaded] = useReducer2(
    () => true,
    false
  );
  return /* @__PURE__ */ React11.createElement(Box, {
    "aria-label": alt,
    borderRadius,
    boxShadow,
    height: typeof height === "string" ? height : void 0,
    position: "relative",
    role: "img",
    style: {
      background,
      height: typeof height === "number" ? height : void 0,
      width: typeof width === "number" ? width : void 0
    },
    width: typeof width === "string" ? width : void 0
  }, /* @__PURE__ */ React11.createElement(Box, {
    ...isRemoteImage ? {
      "aria-hidden": true,
      as: "img",
      onLoad: setRemoteImageLoaded,
      src: src6
    } : {
      backgroundSize: "cover"
    },
    height: "full",
    position: "absolute",
    style: {
      transition: "opacity .15s linear",
      userSelect: "none",
      backgroundSize: "100%",
      ...isRemoteImage ? {
        opacity: isRemoteImageLoaded ? 1 : 0
      } : {
        backgroundImage: src6 ? `url(${src6})` : void 0,
        backgroundRepeat: "no-repeat",
        opacity: src6 ? 1 : 0
      }
    },
    width: "full"
  }), borderColor ? /* @__PURE__ */ React11.createElement(Box, {
    ...typeof borderColor === "object" && "custom" in borderColor ? { style: { borderColor: borderColor.custom } } : { borderColor },
    borderRadius,
    borderStyle: "solid",
    borderWidth: "1",
    height: "full",
    position: "relative",
    width: "full"
  }) : null);
}

// src/rainbowkit/src/components/Icons/Assets.tsx
var src = async () => (await import("./assets-KLGNUBLR.js")).default;
var preloadAssetsIcon = () => loadImages(src);
var AssetsIcon = () => /* @__PURE__ */ React12.createElement(AsyncImage, {
  background: "#d0d5de",
  borderRadius: "10",
  height: "48",
  src,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Login.tsx
import React13 from "react";
var src2 = async () => (await import("./login-L4DFYQAF.js")).default;
var preloadLoginIcon = () => loadImages(src2);
var LoginIcon = () => /* @__PURE__ */ React13.createElement(AsyncImage, {
  background: "#d0d5de",
  borderRadius: "10",
  height: "48",
  src: src2,
  width: "48"
});

// src/rainbowkit/src/components/RainbowKitProvider/AppContext.ts
import { createContext as createContext3 } from "react";
var defaultAppInfo = {
  appName: void 0,
  disclaimer: void 0,
  learnMoreUrl: "https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore"
};
var AppContext = createContext3(defaultAppInfo);

// src/rainbowkit/src/components/ConnectModal/ConnectModalIntro.tsx
function ConnectModalIntro({
  compactModeEnabled = false,
  getWallet
}) {
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext3(AppContext);
  return /* @__PURE__ */ React15.createElement(React15.Fragment, null, /* @__PURE__ */ React15.createElement(Box, {
    alignItems: "center",
    color: "accentColor",
    display: "flex",
    flexDirection: "column",
    height: "full",
    justifyContent: "space-around"
  }, /* @__PURE__ */ React15.createElement(Box, {
    marginBottom: "10"
  }, !compactModeEnabled && /* @__PURE__ */ React15.createElement(Text, {
    color: "modalText",
    size: "18",
    weight: "heavy"
  }, "What is a Wallet?")), /* @__PURE__ */ React15.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "32",
    justifyContent: "center",
    marginY: "20",
    style: { maxWidth: 312 }
  }, /* @__PURE__ */ React15.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16"
  }, /* @__PURE__ */ React15.createElement(Box, {
    borderRadius: "6",
    height: "48",
    minWidth: "48",
    width: "48"
  }, /* @__PURE__ */ React15.createElement(AssetsIcon, null)), /* @__PURE__ */ React15.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, /* @__PURE__ */ React15.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "A Home for your Digital Assets"), /* @__PURE__ */ React15.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."))), /* @__PURE__ */ React15.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16"
  }, /* @__PURE__ */ React15.createElement(Box, {
    borderRadius: "6",
    height: "48",
    minWidth: "48",
    width: "48"
  }, /* @__PURE__ */ React15.createElement(LoginIcon, null)), /* @__PURE__ */ React15.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, /* @__PURE__ */ React15.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "A New Way to Log In"), /* @__PURE__ */ React15.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Instead of creating new accounts and passwords on every website, just connect your wallet.")))), /* @__PURE__ */ React15.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    margin: "10"
  }, /* @__PURE__ */ React15.createElement(ActionButton, {
    label: "Get a Wallet",
    onClick: getWallet
  }), /* @__PURE__ */ React15.createElement(Box, {
    as: "a",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    href: learnMoreUrl,
    paddingX: "12",
    paddingY: "4",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React15.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))), Disclaimer && !compactModeEnabled && /* @__PURE__ */ React15.createElement(Box, {
    marginBottom: "8",
    marginTop: "12",
    textAlign: "center"
  }, /* @__PURE__ */ React15.createElement(Disclaimer, {
    Link: DisclaimerLink,
    Text: DisclaimerText
  }))));
}

// src/rainbowkit/src/components/Icons/Back.tsx
import React16 from "react";
var BackIcon = () => /* @__PURE__ */ React16.createElement("svg", {
  fill: "none",
  height: "17",
  viewBox: "0 0 11 17",
  width: "11",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React16.createElement("path", {
  d: "M0.99707 8.6543C0.99707 9.08496 1.15527 9.44531 1.51562 9.79688L8.16016 16.3096C8.43262 16.5732 8.74902 16.7051 9.13574 16.7051C9.90918 16.7051 10.5508 16.0811 10.5508 15.3076C10.5508 14.9121 10.3838 14.5605 10.0938 14.2705L4.30176 8.64551L10.0938 3.0293C10.3838 2.74805 10.5508 2.3877 10.5508 2.00098C10.5508 1.23633 9.90918 0.603516 9.13574 0.603516C8.74902 0.603516 8.43262 0.735352 8.16016 0.999023L1.51562 7.51172C1.15527 7.85449 1.00586 8.21484 0.99707 8.6543Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/InfoButton/InfoButton.tsx
import React18 from "react";

// src/rainbowkit/src/components/Icons/Info.tsx
import React17 from "react";
var InfoIcon = () => /* @__PURE__ */ React17.createElement("svg", {
  fill: "none",
  height: "12",
  viewBox: "0 0 8 12",
  width: "8",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React17.createElement("path", {
  d: "M3.64258 7.99609C4.19336 7.99609 4.5625 7.73828 4.68555 7.24609C4.69141 7.21094 4.70312 7.16406 4.70898 7.13477C4.80859 6.60742 5.05469 6.35547 6.04492 5.76367C7.14648 5.10156 7.67969 4.3457 7.67969 3.24414C7.67969 1.39844 6.17383 0.255859 3.95898 0.255859C2.32422 0.255859 1.05859 0.894531 0.548828 1.86719C0.396484 2.14844 0.320312 2.44727 0.320312 2.74023C0.314453 3.37305 0.742188 3.79492 1.42188 3.79492C1.91406 3.79492 2.33594 3.54883 2.53516 3.11523C2.78711 2.47656 3.23242 2.21289 3.83594 2.21289C4.55664 2.21289 5.10742 2.65234 5.10742 3.29102C5.10742 3.9707 4.7793 4.29883 3.81836 4.87891C3.02148 5.36523 2.50586 5.92773 2.50586 6.76562V6.90039C2.50586 7.55664 2.96289 7.99609 3.64258 7.99609ZM3.67188 11.4473C4.42773 11.4473 5.04297 10.8672 5.04297 10.1406C5.04297 9.41406 4.42773 8.83984 3.67188 8.83984C2.91602 8.83984 2.30664 9.41406 2.30664 10.1406C2.30664 10.8672 2.91602 11.4473 3.67188 11.4473Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/InfoButton/InfoButton.tsx
var InfoButton = ({
  "aria-label": ariaLabel = "Info",
  onClick
}) => {
  const mobile = isMobile();
  return /* @__PURE__ */ React18.createElement(Box, {
    alignItems: "center",
    "aria-label": ariaLabel,
    as: "button",
    background: "closeButtonBackground",
    borderColor: "actionButtonBorder",
    borderRadius: "full",
    borderStyle: "solid",
    borderWidth: mobile ? "0" : "1",
    className: touchableStyles({ active: "shrinkSm", hover: "growLg" }),
    color: "closeButton",
    display: "flex",
    height: mobile ? "30" : "28",
    justifyContent: "center",
    onClick,
    style: { willChange: "transform" },
    transition: "default",
    type: "button",
    width: mobile ? "30" : "28"
  }, /* @__PURE__ */ React18.createElement(InfoIcon, null));
};

// src/rainbowkit/src/components/ModalSelection/ModalSelection.tsx
import React19, { useState as useState4 } from "react";

// src/rainbowkit/src/components/RainbowKitProvider/useCoolMode.ts
import { useContext as useContext4, useEffect as useEffect5, useRef as useRef2 } from "react";

// src/rainbowkit/src/components/RainbowKitProvider/CoolModeContext.ts
import { createContext as createContext4 } from "react";
var CoolModeContext = createContext4(false);

// src/rainbowkit/src/components/RainbowKitProvider/useCoolMode.ts
var useCoolMode = (imageUrl) => {
  const ref = useRef2(null);
  const coolModeEnabled = useContext4(CoolModeContext);
  const resolvedImageUrl = useAsyncImage(imageUrl);
  useEffect5(() => {
    if (coolModeEnabled && ref.current && resolvedImageUrl) {
      return makeElementCool(ref.current, resolvedImageUrl);
    }
  }, [coolModeEnabled, resolvedImageUrl]);
  return ref;
};
var getContainer = () => {
  const id = "_rk_coolMode";
  const existingContainer = document.getElementById(id);
  if (existingContainer) {
    return existingContainer;
  }
  const container = document.createElement("div");
  container.setAttribute("id", id);
  container.setAttribute(
    "style",
    ["overflow:hidden", "position:fixed", "height:100%", "top:0", "left:0", "right:0", "bottom:0", "pointer-events:none", "z-index:2147483647"].join(
      ";"
    )
  );
  document.body.appendChild(container);
  return container;
};
var instanceCounter = 0;
function makeElementCool(element2, imageUrl) {
  instanceCounter++;
  const sizes = [15, 20, 25, 35, 45];
  const limit = 35;
  let particles = [];
  let autoAddParticle = false;
  let mouseX = 0;
  let mouseY = 0;
  const container = getContainer();
  function createParticle() {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const speedHorz = Math.random() * 10;
    const speedUp = Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const top = mouseY - size / 2;
    const left = mouseX - size / 2;
    const direction = Math.random() <= 0.5 ? -1 : 1;
    const particle = document.createElement("div");
    particle.innerHTML = `<img src="${imageUrl}" width="${size}" height="${size}" style="border-radius: 25%">`;
    particle.setAttribute(
      "style",
      ["position:absolute", "will-change:transform", `top:${top}px`, `left:${left}px`, `transform:rotate(${spinVal}deg)`].join(";")
    );
    container.appendChild(particle);
    particles.push({
      direction,
      element: particle,
      left,
      size,
      speedHorz,
      speedUp,
      spinSpeed,
      spinVal,
      top
    });
  }
  function updateParticles() {
    particles.forEach((p) => {
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;
      if (p.top >= Math.max(window.innerHeight, document.body.clientHeight) + p.size) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }
      p.element.setAttribute(
        "style",
        ["position:absolute", "will-change:transform", `top:${p.top}px`, `left:${p.left}px`, `transform:rotate(${p.spinVal}deg)`].join(";")
      );
    });
  }
  let animationFrame;
  function loop() {
    if (autoAddParticle && particles.length < limit) {
      createParticle();
    }
    updateParticles();
    animationFrame = requestAnimationFrame(loop);
  }
  loop();
  const isTouchInteraction = "ontouchstart" in window || navigator.msMaxTouchPoints;
  const tap = isTouchInteraction ? "touchstart" : "mousedown";
  const tapEnd = isTouchInteraction ? "touchend" : "mouseup";
  const move = isTouchInteraction ? "touchmove" : "mousemove";
  const updateMousePosition = (e) => {
    var _a, _b;
    if ("touches" in e) {
      mouseX = (_a = e.touches) == null ? void 0 : _a[0].clientX;
      mouseY = (_b = e.touches) == null ? void 0 : _b[0].clientY;
    } else {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  };
  const tapHandler = (e) => {
    updateMousePosition(e);
    autoAddParticle = true;
  };
  const disableAutoAddParticle = () => {
    autoAddParticle = false;
  };
  element2.addEventListener(move, updateMousePosition, { passive: false });
  element2.addEventListener(tap, tapHandler);
  element2.addEventListener(tapEnd, disableAutoAddParticle);
  element2.addEventListener("mouseleave", disableAutoAddParticle);
  return () => {
    element2.removeEventListener(move, updateMousePosition);
    element2.removeEventListener(tap, tapHandler);
    element2.removeEventListener(tapEnd, disableAutoAddParticle);
    element2.removeEventListener("mouseleave", disableAutoAddParticle);
    const interval = setInterval(() => {
      if (animationFrame && particles.length === 0) {
        cancelAnimationFrame(animationFrame);
        clearInterval(interval);
        if (--instanceCounter === 0) {
          container.remove();
        }
      }
    }, 500);
  };
}

// src/rainbowkit/src/components/ModalSelection/ModalSelection.css.ts
import { style as style3 } from "@vanilla-extract/css";
var transparentBorder = style3({ borderColor: "transparent" });

// src/rainbowkit/src/components/ModalSelection/ModalSelection.tsx
var ModalSelection = ({
  as = "button",
  currentlySelected = false,
  iconBackground,
  iconUrl,
  name,
  onClick,
  ready,
  recent,
  testId,
  ...urlProps
}) => {
  const coolModeRef = useCoolMode(iconUrl);
  const [isMouseOver, setIsMouseOver] = useState4(false);
  return /* @__PURE__ */ React19.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    onMouseEnter: () => setIsMouseOver(true),
    onMouseLeave: () => setIsMouseOver(false),
    ref: coolModeRef
  }, /* @__PURE__ */ React19.createElement(ActivePixelCard, {
    pixel_height: 4,
    ...currentlySelected ? {
      backgroundColor: "#1649FF"
    } : {
      backgroundColor: "#3A4254"
    }
  }, /* @__PURE__ */ React19.createElement(Box, {
    as,
    borderRadius: "menuButton",
    borderStyle: "solid",
    borderWidth: "1",
    className: !currentlySelected ? [
      transparentBorder,
      touchableStyles({
        active: "shrink"
      })
    ] : void 0,
    disabled: currentlySelected,
    onClick,
    paddingY: "5",
    paddingX: "20",
    style: { willChange: "transform" },
    testId,
    transition: "default",
    width: "full",
    ...urlProps
  }, /* @__PURE__ */ React19.createElement(Box, {
    color: currentlySelected ? "accentColorForeground" : "modalText",
    disabled: !ready,
    fontFamily: "body",
    fontSize: "16",
    fontWeight: "bold",
    transition: "default"
  }, /* @__PURE__ */ React19.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "12",
    width: "max"
  }, /* @__PURE__ */ React19.createElement(AsyncImage, {
    background: iconBackground,
    ...isMouseOver ? {} : { borderColor: "actionButtonBorder" },
    borderRadius: "6",
    height: "28",
    src: iconUrl,
    width: "28"
  }), /* @__PURE__ */ React19.createElement(Box, null, /* @__PURE__ */ React19.createElement(Box, {
    style: { marginTop: recent ? -2 : void 0 }
  }, name), recent && /* @__PURE__ */ React19.createElement(Text, {
    color: currentlySelected ? "accentColorForeground" : "accentColor",
    size: "12",
    style: { lineHeight: 1, marginTop: -1 },
    weight: "medium"
  }, "Recent")))))));
};
ModalSelection.displayName = "ModalSelection";

// src/rainbowkit/src/components/RainbowKitProvider/ModalSizeContext.ts
import { createContext as createContext5 } from "react";
var ModalSizeOptions = {
  COMPACT: "compact",
  WIDE: "wide"
};
var ModalSizeContext = createContext5(
  ModalSizeOptions.WIDE
);

// src/rainbowkit/src/components/ConnectOptions/ConnectDetails.tsx
import React25, { useContext as useContext5, useEffect as useEffect7 } from "react";

// src/rainbowkit/src/hooks/useWindowSize.ts
import { useEffect as useEffect6, useState as useState5 } from "react";
var useWindowSize2 = () => {
  const [windowSize, setWindowSize] = useState5({
    height: void 0,
    width: void 0
  });
  useEffect6(() => {
    function handleResize() {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};

// src/rainbowkit/src/utils/colors.ts
var convertHexToRGBA = (hexCode, opacity = 1) => {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }
  return `rgba(${r},${g},${b},${opacity})`;
};
var getGradientRGBAs = (hexColor) => {
  if (!hexColor)
    return null;
  return [
    convertHexToRGBA(hexColor, 0.2),
    convertHexToRGBA(hexColor, 0.14),
    convertHexToRGBA(hexColor, 0.1)
  ];
};
var isHexString = (color) => {
  return /^#([0-9a-f]{3}){1,2}$/i.test(color);
};

// src/rainbowkit/src/components/Icons/Create.tsx
import React20 from "react";
var src3 = async () => (await import("./create-FJBUAUYV.js")).default;
var preloadCreateIcon = () => loadImages(src3);
var CreateIcon = () => /* @__PURE__ */ React20.createElement(AsyncImage, {
  background: "#e3a5e8",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src3,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Refresh.tsx
import React21 from "react";
var src4 = async () => (await import("./refresh-IPTTFCYG.js")).default;
var preloadRefreshIcon = () => loadImages(src4);
var RefreshIcon = () => /* @__PURE__ */ React21.createElement(AsyncImage, {
  background: "#515a70",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src4,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Scan.tsx
import React22 from "react";
var src5 = async () => (await import("./scan-WU4WMXIE.js")).default;
var preloadScanIcon = () => loadImages(src5);
var ScanIcon = () => /* @__PURE__ */ React22.createElement(AsyncImage, {
  background: "#515a70",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src5,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Spinner.tsx
import React23, { useMemo as useMemo2 } from "react";

// src/rainbowkit/src/components/Icons/Icons.css.ts
import { keyframes, style as style4 } from "@vanilla-extract/css";
var CloseIconClassName = sprinkles({
  marginLeft: "6"
});
var spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" }
});
var SpinnerIconClassName = style4({
  animation: `${spin} 3s infinite linear`
});
var SpinnerIconPathClassName = style4({
  background: `conic-gradient(from 180deg at 50% 50%, rgba(72, 146, 254, 0) 0deg, currentColor 282.04deg, rgba(72, 146, 254, 0) 319.86deg, rgba(72, 146, 254, 0) 360deg)`,
  height: 21,
  width: 21
});

// src/rainbowkit/src/components/Icons/Spinner.tsx
var useRandomId = (prefix) => useMemo2(
  () => `${prefix}_${Math.round(Math.random() * 1e9)}`,
  [prefix]
);
var SpinnerIcon = ({
  height = 21,
  width = 21
}) => {
  const id = useRandomId("spinner");
  return /* @__PURE__ */ React23.createElement("svg", {
    className: SpinnerIconClassName,
    fill: "none",
    height,
    viewBox: "0 0 21 21",
    width,
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React23.createElement("clipPath", {
    id
  }, /* @__PURE__ */ React23.createElement("path", {
    d: "M10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C11.3284 18 12 18.6716 12 19.5C12 20.3284 11.3284 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5C21 11.3284 20.3284 12 19.5 12C18.6716 12 18 11.3284 18 10.5C18 6.35786 14.6421 3 10.5 3Z"
  })), /* @__PURE__ */ React23.createElement("foreignObject", {
    clipPath: `url(#${id})`,
    height: "21",
    width: "21",
    x: "0",
    y: "0"
  }, /* @__PURE__ */ React23.createElement("div", {
    className: SpinnerIconPathClassName
  })));
};

// src/rainbowkit/src/components/QRCode/QRCode.tsx
import QRCodeUtil from "qrcode";
import React24, { useMemo as useMemo3 } from "react";

// src/rainbowkit/src/components/ConnectOptions/DesktopOptions.css.ts
import { style as style5 } from "@vanilla-extract/css";
var QRCodeBackgroundClassName = style5([
  {
    background: "white"
  }
]);
var ScrollClassName = style5([
  sprinkles({
    paddingX: "18"
  }),
  {
    maxHeight: 454,
    overflowY: "auto"
  }
]);
var sidebar = style5({
  "@media": {
    [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
      minWidth: "287px"
    }
  },
  "minWidth": "246px"
});
var sidebarCompactMode = style5({
  minWidth: "100%"
});

// src/rainbowkit/src/components/QRCode/QRCode.tsx
var generateMatrix = (value, errorCorrectionLevel) => {
  const arr = Array.prototype.slice.call(
    QRCodeUtil.create(value, { errorCorrectionLevel }).modules.data,
    0
  );
  const sqrt = Math.sqrt(arr.length);
  return arr.reduce(
    (rows, key, index) => (index % sqrt === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) && rows,
    []
  );
};
function QRCode({
  ecl = "M",
  logoBackground,
  logoMargin = 10,
  logoSize = 50,
  logoUrl,
  size: sizeProp = 200,
  uri
}) {
  const padding = "20";
  const size = sizeProp - parseInt(padding, 10) * 2;
  const dots = useMemo3(() => {
    const dots2 = [];
    const matrix = generateMatrix(uri, ecl);
    const cellSize = size / matrix.length;
    let qrList = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 }
    ];
    qrList.forEach(({ x, y }) => {
      const x1 = (matrix.length - 7) * cellSize * x;
      const y1 = (matrix.length - 7) * cellSize * y;
      for (let i = 0; i < 3; i++) {
        dots2.push(
          /* @__PURE__ */ React24.createElement("rect", {
            fill: i % 2 !== 0 ? "white" : "black",
            height: cellSize * (7 - i * 2),
            key: `${i}-${x}-${y}`,
            rx: (i - 2) * -5 + (i === 0 ? 2 : 0),
            ry: (i - 2) * -5 + (i === 0 ? 2 : 0),
            width: cellSize * (7 - i * 2),
            x: x1 + cellSize * i,
            y: y1 + cellSize * i
          })
        );
      }
    });
    const clearArenaSize = Math.floor((logoSize + 25) / cellSize);
    const matrixMiddleStart = matrix.length / 2 - clearArenaSize / 2;
    const matrixMiddleEnd = matrix.length / 2 + clearArenaSize / 2 - 1;
    matrix.forEach((row, i) => {
      row.forEach((_, j) => {
        if (matrix[i][j]) {
          if (!(i < 7 && j < 7 || i > matrix.length - 8 && j < 7 || i < 7 && j > matrix.length - 8)) {
            if (!(i > matrixMiddleStart && i < matrixMiddleEnd && j > matrixMiddleStart && j < matrixMiddleEnd)) {
              dots2.push(
                /* @__PURE__ */ React24.createElement("circle", {
                  cx: i * cellSize + cellSize / 2,
                  cy: j * cellSize + cellSize / 2,
                  fill: "black",
                  key: `circle-${i}-${j}`,
                  r: cellSize / 3
                })
              );
            }
          }
        }
      });
    });
    return dots2;
  }, [ecl, logoSize, size, uri]);
  const logoPosition = size / 2 - logoSize / 2;
  const logoWrapperSize = logoSize + logoMargin * 2;
  return /* @__PURE__ */ React24.createElement(Box, {
    borderColor: "generalBorder",
    borderRadius: "menuButton",
    borderStyle: "solid",
    borderWidth: "1",
    className: QRCodeBackgroundClassName,
    padding,
    width: "max"
  }, /* @__PURE__ */ React24.createElement(Box, {
    style: {
      height: size,
      userSelect: "none",
      width: size
    },
    userSelect: "none"
  }, /* @__PURE__ */ React24.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    style: {
      height: 0,
      top: logoPosition,
      width: size
    },
    width: "full"
  }, /* @__PURE__ */ React24.createElement(AsyncImage, {
    background: logoBackground,
    borderColor: { custom: "rgba(0, 0, 0, 0.06)" },
    borderRadius: "13",
    height: logoSize,
    src: logoUrl,
    width: logoSize
  })), /* @__PURE__ */ React24.createElement("svg", {
    height: size,
    style: { all: "revert" },
    width: size
  }, /* @__PURE__ */ React24.createElement("defs", null, /* @__PURE__ */ React24.createElement("clipPath", {
    id: "clip-wrapper"
  }, /* @__PURE__ */ React24.createElement("rect", {
    height: logoWrapperSize,
    width: logoWrapperSize
  })), /* @__PURE__ */ React24.createElement("clipPath", {
    id: "clip-logo"
  }, /* @__PURE__ */ React24.createElement("rect", {
    height: logoSize,
    width: logoSize
  }))), /* @__PURE__ */ React24.createElement("rect", {
    fill: "transparent",
    height: size,
    width: size
  }), dots)));
}

// src/rainbowkit/src/components/ConnectOptions/ConnectDetails.tsx
var getBrowserSrc = async () => {
  const browser = getBrowser();
  switch (browser) {
    case "Arc" /* Arc */:
      return (await import("./Arc-QHXFW6BY.js")).default;
    case "Brave" /* Brave */:
      return (await import("./Brave-IGE5TNU2.js")).default;
    case "Chrome" /* Chrome */:
      return (await import("./Chrome-LLDJSNDV.js")).default;
    case "Edge" /* Edge */:
      return (await import("./Edge-X3JHIAYZ.js")).default;
    case "Firefox" /* Firefox */:
      return (await import("./Firefox-MBOVDRHH.js")).default;
    case "Opera" /* Opera */:
      return (await import("./Opera-QE2OS6WF.js")).default;
    case "Safari" /* Safari */:
      return (await import("./Safari-RMROKLO4.js")).default;
    default:
      return (await import("./Browser-54KJZYQU.js")).default;
  }
};
var preloadBrowserIcon = () => loadImages(getBrowserSrc);
function GetDetail({
  getWalletDownload
}) {
  const wallets = useWalletConnectors();
  const shownWallets = wallets.splice(0, 5);
  return /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    marginTop: "18",
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    width: "full"
  }, shownWallets == null ? void 0 : shownWallets.filter(
    (wallet) => {
      var _a;
      return wallet.extensionDownloadUrl || wallet.qrCode && ((_a = wallet.downloadUrls) == null ? void 0 : _a.qrCode);
    }
  ).map((wallet) => {
    const { downloadUrls, iconBackground, iconUrl, id, name, qrCode } = wallet;
    const hasMobileCompanionApp = (downloadUrls == null ? void 0 : downloadUrls.qrCode) && qrCode;
    const hasExtension = !!wallet.extensionDownloadUrl;
    const hasMobileAndExtension = (downloadUrls == null ? void 0 : downloadUrls.qrCode) && hasExtension;
    return /* @__PURE__ */ React25.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "16",
      justifyContent: "space-between",
      key: wallet.id,
      width: "full"
    }, /* @__PURE__ */ React25.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16"
    }, /* @__PURE__ */ React25.createElement(AsyncImage, {
      background: iconBackground,
      borderColor: "actionButtonBorder",
      borderRadius: "10",
      height: "48",
      src: iconUrl,
      width: "48"
    }), /* @__PURE__ */ React25.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "2"
    }, /* @__PURE__ */ React25.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, name), /* @__PURE__ */ React25.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, hasMobileAndExtension ? "Mobile Wallet and Extension" : hasMobileCompanionApp ? "Mobile Wallet" : hasExtension ? "Browser Extension" : null))), /* @__PURE__ */ React25.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React25.createElement(ActionButton, {
      label: "GET",
      onClick: () => getWalletDownload(id),
      type: "secondary"
    })));
  })), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "column",
    gap: "8",
    justifyContent: "space-between",
    marginBottom: "4",
    paddingY: "8",
    style: { maxWidth: 275, textAlign: "center" }
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "Not what you\u2019re looking for?"), /* @__PURE__ */ React25.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Select a wallet on the left to get started with a different wallet provider.")));
}
var LOGO_SIZE = "44";
function ConnectDetail({
  changeWalletStep,
  compactModeEnabled,
  connectionError,
  onClose,
  qrCodeUri,
  reconnect,
  wallet
}) {
  var _a;
  const {
    downloadUrls,
    iconBackground,
    iconUrl,
    name,
    qrCode,
    ready,
    showWalletConnectModal
  } = wallet;
  const getDesktopDeepLink = (_a = wallet.desktop) == null ? void 0 : _a.getUri;
  const safari = isSafari();
  const hasExtension = !!wallet.extensionDownloadUrl;
  const hasQrCodeAndExtension = (downloadUrls == null ? void 0 : downloadUrls.qrCode) && hasExtension;
  const hasQrCode = qrCode && qrCodeUri;
  const secondaryAction = showWalletConnectModal ? {
    description: `Need the ${compactModeEnabled ? "" : "official"} WalletConnect modal?`,
    label: "OPEN",
    onClick: () => {
      onClose();
      showWalletConnectModal();
    }
  } : hasQrCode ? {
    description: `Don\u2019t have ${name}?`,
    label: "GET",
    onClick: () => changeWalletStep(
      hasQrCodeAndExtension ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : "DOWNLOAD" /* Download */
    )
  } : null;
  const { width: windowWidth } = useWindowSize2();
  const smallWindow = windowWidth && windowWidth < 768;
  useEffect7(() => {
    preloadBrowserIcon();
  }, []);
  return /* @__PURE__ */ React25.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, hasQrCode ? /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    height: "full",
    justifyContent: "center"
  }, /* @__PURE__ */ React25.createElement(QRCode, {
    logoBackground: iconBackground,
    logoSize: compactModeEnabled ? 60 : 72,
    logoUrl: iconUrl,
    size: compactModeEnabled ? 318 : smallWindow ? Math.max(280, Math.min(windowWidth - 308, 382)) : 382,
    uri: qrCodeUri
  })) : /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    style: { flexGrow: 1 }
  }, /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8"
  }, /* @__PURE__ */ React25.createElement(Box, {
    borderRadius: "10",
    height: LOGO_SIZE,
    overflow: "hidden"
  }, /* @__PURE__ */ React25.createElement(AsyncImage, {
    height: LOGO_SIZE,
    src: iconUrl,
    width: LOGO_SIZE
  })), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4",
    paddingX: "32",
    style: { textAlign: "center" }
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "modalText",
    size: "18",
    weight: "bold"
  }, ready ? `Opening ${name}...` : hasExtension ? `${name} is not installed` : `${name} is not available`), !ready && hasExtension ? /* @__PURE__ */ React25.createElement(Box, {
    paddingTop: "20"
  }, /* @__PURE__ */ React25.createElement(ActionButton, {
    href: wallet.extensionDownloadUrl,
    label: "INSTALL",
    type: "secondary"
  })) : null, ready && !hasQrCode && /* @__PURE__ */ React25.createElement(React25.Fragment, null, /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    textAlign: "center",
    weight: "medium"
  }, "Confirm connection in the extension")), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    color: "modalText",
    display: "flex",
    flexDirection: "row",
    height: "32",
    marginTop: "8"
  }, connectionError ? /* @__PURE__ */ React25.createElement(ActionButton, {
    label: "RETRY",
    onClick: getDesktopDeepLink ? async () => {
      const uri = await getDesktopDeepLink();
      window.open(uri, safari ? "_blank" : "_self");
    } : () => {
      reconnect(wallet);
    }
  }) : /* @__PURE__ */ React25.createElement(Box, {
    color: "modalTextSecondary"
  }, /* @__PURE__ */ React25.createElement(SpinnerIcon, null))))))), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "row",
    gap: "8",
    height: "28",
    justifyContent: "space-between",
    marginTop: "12"
  }, ready && secondaryAction && /* @__PURE__ */ React25.createElement(React25.Fragment, null, /* @__PURE__ */ React25.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, secondaryAction.description), /* @__PURE__ */ React25.createElement(ActionButton, {
    label: secondaryAction.label,
    onClick: secondaryAction.onClick,
    type: "secondary"
  }))));
}
var DownloadOptionsBox = ({
  actionLabel,
  description,
  iconAccent,
  iconBackground,
  iconUrl,
  isCompact,
  onAction,
  title,
  url,
  variant
}) => {
  const isBrowserCard = variant === "browser";
  const gradientRgbas = !isBrowserCard && iconAccent && getGradientRGBAs(iconAccent);
  return /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    borderRadius: "13",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    paddingX: isCompact ? "18" : "44",
    position: "relative",
    style: { flex: 1, isolation: "isolate" },
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    borderColor: "actionButtonBorder",
    borderRadius: "13",
    borderStyle: "solid",
    borderWidth: "1",
    style: {
      bottom: "0",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0",
      zIndex: 1
    }
  }), isBrowserCard && /* @__PURE__ */ React25.createElement(Box, {
    background: "downloadTopCardBackground",
    height: "full",
    position: "absolute",
    style: {
      zIndex: 0
    },
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    style: {
      bottom: "0",
      filter: "blur(20px)",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0",
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React25.createElement(Box, {
    style: {
      filter: "blur(100px)",
      marginLeft: -27,
      marginTop: -20,
      opacity: 0.6,
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React25.createElement(AsyncImage, {
    borderRadius: "full",
    height: "200",
    src: iconUrl,
    width: "200"
  })), /* @__PURE__ */ React25.createElement(Box, {
    style: {
      filter: "blur(100px)",
      marginRight: 0,
      marginTop: 105,
      opacity: 0.6,
      overflow: "auto",
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React25.createElement(AsyncImage, {
    borderRadius: "full",
    height: "200",
    src: iconUrl,
    width: "200"
  })))), !isBrowserCard && gradientRgbas && /* @__PURE__ */ React25.createElement(Box, {
    background: "downloadBottomCardBackground",
    style: {
      bottom: "0",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0"
    }
  }, /* @__PURE__ */ React25.createElement(Box, {
    position: "absolute",
    style: {
      background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[0]} 0%, ${gradientRgbas[1]} 25%, rgba(0,0,0,0) 100%)`,
      height: 564,
      left: -215,
      top: -197,
      transform: "translate3d(0, 0, 0)",
      width: 564
    }
  }), /* @__PURE__ */ React25.createElement(Box, {
    position: "absolute",
    style: {
      background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[2]} 0%, rgba(0, 0, 0, 0) 100%)`,
      height: 564,
      left: -1,
      top: -76,
      transform: "translate3d(0, 0, 0)",
      width: 564
    }
  })), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: "24",
    height: "max",
    justifyContent: "center",
    style: { zIndex: 1 }
  }, /* @__PURE__ */ React25.createElement(Box, null, /* @__PURE__ */ React25.createElement(AsyncImage, {
    height: "60",
    src: iconUrl,
    width: "60",
    ...iconBackground ? {
      background: iconBackground,
      borderColor: "generalBorder",
      borderRadius: "10"
    } : null
  })), /* @__PURE__ */ React25.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    style: { flex: 1 },
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, title), /* @__PURE__ */ React25.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, description), /* @__PURE__ */ React25.createElement(Box, {
    marginTop: "14",
    width: "max"
  }, /* @__PURE__ */ React25.createElement(ActionButton, {
    href: url,
    label: actionLabel,
    onClick: onAction,
    size: "medium"
  })))));
};
function DownloadOptionsDetail({
  changeWalletStep,
  wallet
}) {
  const browser = getBrowser();
  const modalSize = useContext5(ModalSizeContext);
  const isCompact = modalSize === "compact";
  const { extension, extensionDownloadUrl, mobileDownloadUrl } = wallet;
  useEffect7(() => {
    preloadCreateIcon();
    preloadScanIcon();
    preloadRefreshIcon();
  }, []);
  return /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    height: "full",
    marginBottom: "8",
    marginTop: "4",
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8",
    height: "full",
    justifyContent: "center",
    width: "full"
  }, extensionDownloadUrl && /* @__PURE__ */ React25.createElement(DownloadOptionsBox, {
    actionLabel: `Add to ${browser}`,
    description: "Access your wallet right from your favorite web browser.",
    iconUrl: getBrowserSrc,
    isCompact,
    onAction: () => changeWalletStep(
      (extension == null ? void 0 : extension.instructions) ? "INSTRUCTIONS_EXTENSION" /* InstructionsExtension */ : "CONNECT" /* Connect */
    ),
    title: `${wallet.name} for ${browser}`,
    url: extensionDownloadUrl,
    variant: "browser"
  }), mobileDownloadUrl && /* @__PURE__ */ React25.createElement(DownloadOptionsBox, {
    actionLabel: "Get the app",
    description: "Use the mobile wallet to explore the world of Ethereum.",
    iconAccent: wallet.iconAccent,
    iconBackground: wallet.iconBackground,
    iconUrl: wallet.iconUrl,
    isCompact,
    onAction: () => {
      changeWalletStep("DOWNLOAD" /* Download */);
    },
    title: `${wallet.name} for Mobile`,
    variant: "app"
  })));
}
function DownloadDetail({
  changeWalletStep,
  wallet
}) {
  const { downloadUrls, qrCode } = wallet;
  useEffect7(() => {
    preloadCreateIcon();
    preloadScanIcon();
  }, []);
  return /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    style: { maxWidth: 220, textAlign: "center" }
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "semibold"
  }, "Scan with your phone to download on iOS or Android")), /* @__PURE__ */ React25.createElement(Box, {
    height: "full"
  }, (downloadUrls == null ? void 0 : downloadUrls.qrCode) ? /* @__PURE__ */ React25.createElement(QRCode, {
    logoSize: 0,
    size: 268,
    uri: downloadUrls.qrCode
  }) : null), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "row",
    gap: "8",
    height: "34",
    justifyContent: "space-between",
    marginBottom: "12",
    paddingY: "8"
  }, /* @__PURE__ */ React25.createElement(ActionButton, {
    label: "Continue",
    onClick: () => changeWalletStep(
      (qrCode == null ? void 0 : qrCode.instructions) ? "INSTRUCTIONS_MOBILE" /* InstructionsMobile */ : "CONNECT" /* Connect */
    )
  })));
}
var stepIcons = {
  create: () => /* @__PURE__ */ React25.createElement(CreateIcon, null),
  install: (wallet) => /* @__PURE__ */ React25.createElement(AsyncImage, {
    background: wallet.iconBackground,
    borderColor: "generalBorder",
    borderRadius: "10",
    height: "48",
    src: wallet.iconUrl,
    width: "48"
  }),
  refresh: () => /* @__PURE__ */ React25.createElement(RefreshIcon, null),
  scan: () => /* @__PURE__ */ React25.createElement(ScanIcon, null)
};
function InstructionMobileDetail({
  connectWallet,
  wallet
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    justifyContent: "center",
    paddingY: "32",
    style: { maxWidth: 320 }
  }, (_b = (_a = wallet == null ? void 0 : wallet.qrCode) == null ? void 0 : _a.instructions) == null ? void 0 : _b.steps.map((d, idx) => {
    var _a2;
    return /* @__PURE__ */ React25.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16",
      key: idx
    }, /* @__PURE__ */ React25.createElement(Box, {
      borderRadius: "10",
      height: "48",
      minWidth: "48",
      overflow: "hidden",
      position: "relative",
      width: "48"
    }, (_a2 = stepIcons[d.step]) == null ? void 0 : _a2.call(stepIcons, wallet)), /* @__PURE__ */ React25.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React25.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, d.title), /* @__PURE__ */ React25.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, d.description)));
  })), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    marginBottom: "16"
  }, /* @__PURE__ */ React25.createElement(ActionButton, {
    label: "Connect",
    onClick: () => connectWallet(wallet)
  }), /* @__PURE__ */ React25.createElement(Box, {
    as: "a",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    href: (_d = (_c = wallet == null ? void 0 : wallet.qrCode) == null ? void 0 : _c.instructions) == null ? void 0 : _d.learnMoreUrl,
    paddingX: "12",
    paddingY: "4",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))));
}
function InstructionExtensionDetail({
  wallet
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React25.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    justifyContent: "center",
    paddingY: "32",
    style: { maxWidth: 320 }
  }, (_b = (_a = wallet == null ? void 0 : wallet.extension) == null ? void 0 : _a.instructions) == null ? void 0 : _b.steps.map((d, idx) => {
    var _a2;
    return /* @__PURE__ */ React25.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16",
      key: idx
    }, /* @__PURE__ */ React25.createElement(Box, {
      borderRadius: "10",
      height: "48",
      minWidth: "48",
      overflow: "hidden",
      position: "relative",
      width: "48"
    }, (_a2 = stepIcons[d.step]) == null ? void 0 : _a2.call(stepIcons, wallet)), /* @__PURE__ */ React25.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React25.createElement(Text, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, d.title), /* @__PURE__ */ React25.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, d.description)));
  })), /* @__PURE__ */ React25.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    marginBottom: "16"
  }, /* @__PURE__ */ React25.createElement(ActionButton, {
    label: "Refresh",
    onClick: window.location.reload.bind(window.location)
  }), /* @__PURE__ */ React25.createElement(Box, {
    as: "a",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    href: (_d = (_c = wallet == null ? void 0 : wallet.extension) == null ? void 0 : _c.instructions) == null ? void 0 : _d.learnMoreUrl,
    paddingX: "12",
    paddingY: "4",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React25.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))));
}

// src/components/DialogClose/DialogClose.tsx
import React27, { memo as memo4 } from "react";

// src/components/SvgComponent/SvgComponent.tsx
import React26, { useEffect as useEffect8, useState as useState6 } from "react";
var SvgComponent = ({ src: src6, className, ...rest }) => {
  const [svgContent, setSvgContent] = useState6(null);
  useEffect8(() => {
    (async () => {
      try {
        const response = await fetch(src6);
        if (!response.ok)
          throw new Error("Failed to load SVG");
        const text = await response.text();
        const wrapper = document.createElement("div");
        wrapper.innerHTML = text;
        const svgElement = wrapper.querySelector("svg");
        if (svgElement) {
          const Component = () => /* @__PURE__ */ React26.createElement("span", {
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
  }, [src6]);
  return svgContent || /* @__PURE__ */ React26.createElement(React26.Fragment, null);
};
var SvgComponent_default = SvgComponent;

// src/components/DialogClose/DialogClose.tsx
var DialogClose = memo4(({ onClick }) => {
  return /* @__PURE__ */ React27.createElement("div", {
    className: "dialog_close",
    onClick
  }, /* @__PURE__ */ React27.createElement(SvgComponent_default, {
    src: preStaticUrl + "/img/icon/pixel_close.svg"
  }));
});
var DialogClose_default = DialogClose;

// src/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx
function DesktopOptions({ onClose }) {
  const titleId = "rk_connect_title";
  const safari = isSafari();
  const [selectedOptionId, setSelectedOptionId] = useState7();
  const [selectedWallet, setSelectedWallet] = useState7();
  const [qrCodeUri, setQrCodeUri] = useState7();
  const hasQrCode = !!(selectedWallet == null ? void 0 : selectedWallet.qrCode) && qrCodeUri;
  const [connectionError, setConnectionError] = useState7(false);
  const modalSize = useContext6(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  const { disclaimer: Disclaimer } = useContext6(AppContext);
  const wallets = useWalletConnectors().filter((wallet) => wallet.ready || !!wallet.extensionDownloadUrl).sort((a2, b) => a2.groupIndex - b.groupIndex);
  const groupedWallets = groupBy(wallets, (wallet) => wallet.groupName);
  const connectToWallet = (wallet) => {
    var _a, _b, _c;
    setConnectionError(false);
    if (wallet.ready) {
      (_b = (_a = wallet == null ? void 0 : wallet.connect) == null ? void 0 : _a.call(wallet)) == null ? void 0 : _b.catch(() => {
        setConnectionError(true);
      });
      const getDesktopDeepLink = (_c = wallet.desktop) == null ? void 0 : _c.getUri;
      if (getDesktopDeepLink) {
        setTimeout(async () => {
          const uri = await getDesktopDeepLink();
          window.open(uri, safari ? "_blank" : "_self");
        }, 0);
      }
    }
  };
  const selectWallet = (wallet) => {
    var _a;
    connectToWallet(wallet);
    setSelectedOptionId(wallet.id);
    if (wallet.ready) {
      let callbackFired = false;
      (_a = wallet == null ? void 0 : wallet.onConnecting) == null ? void 0 : _a.call(wallet, async () => {
        var _a2, _b;
        if (callbackFired)
          return;
        callbackFired = true;
        const sWallet = wallets.find((w) => wallet.id === w.id);
        const uri = await ((_a2 = sWallet == null ? void 0 : sWallet.qrCode) == null ? void 0 : _a2.getUri());
        setQrCodeUri(uri);
        setTimeout(
          () => {
            setSelectedWallet(sWallet);
            changeWalletStep("CONNECT" /* Connect */);
          },
          uri ? 0 : 50
        );
        const provider = await (sWallet == null ? void 0 : sWallet.connector.getProvider());
        const connection = (_b = provider == null ? void 0 : provider.signer) == null ? void 0 : _b.connection;
        if ((connection == null ? void 0 : connection.on) && (connection == null ? void 0 : connection.off)) {
          const handleConnectionClose = () => {
            removeHandlers();
            selectWallet(wallet);
          };
          const removeHandlers = () => {
            connection.off("close", handleConnectionClose);
            connection.off("open", removeHandlers);
          };
          connection.on("close", handleConnectionClose);
          connection.on("open", removeHandlers);
        }
      });
    } else {
      setSelectedWallet(wallet);
      changeWalletStep(
        (wallet == null ? void 0 : wallet.extensionDownloadUrl) ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : "CONNECT" /* Connect */
      );
    }
  };
  const getWalletDownload = (id) => {
    var _a;
    setSelectedOptionId(id);
    const sWallet = wallets.find((w) => id === w.id);
    const isMobile2 = (_a = sWallet == null ? void 0 : sWallet.downloadUrls) == null ? void 0 : _a.qrCode;
    const isExtension = !!(sWallet == null ? void 0 : sWallet.extensionDownloadUrl);
    setSelectedWallet(sWallet);
    if (isMobile2 && isExtension) {
      changeWalletStep("DOWNLOAD_OPTIONS" /* DownloadOptions */);
    } else if (isMobile2) {
      changeWalletStep("DOWNLOAD" /* Download */);
    } else {
      changeWalletStep("INSTRUCTIONS_EXTENSION" /* InstructionsExtension */);
    }
  };
  const clearSelectedWallet = () => {
    setSelectedOptionId(void 0);
    setSelectedWallet(void 0);
    setQrCodeUri(void 0);
  };
  const changeWalletStep = (newWalletStep, isBack = false) => {
    if (isBack && newWalletStep === "GET" /* Get */ && initialWalletStep === "GET" /* Get */) {
      clearSelectedWallet();
    } else if (!isBack && newWalletStep === "GET" /* Get */) {
      setInitialWalletStep("GET" /* Get */);
    } else if (!isBack && newWalletStep === "CONNECT" /* Connect */) {
      setInitialWalletStep("CONNECT" /* Connect */);
    }
    setWalletStep(newWalletStep);
  };
  const [initialWalletStep, setInitialWalletStep] = useState7(
    "NONE" /* None */
  );
  const [walletStep, setWalletStep] = useState7("NONE" /* None */);
  let walletContent = null;
  let headerLabel = null;
  let headerBackButtonLink = null;
  let headerBackButtonCallback;
  useEffect9(() => {
    setConnectionError(false);
  }, [walletStep, selectedWallet]);
  const hasExtension = !!(selectedWallet == null ? void 0 : selectedWallet.extensionDownloadUrl);
  const hasExtensionAndMobile = !!(hasExtension && (selectedWallet == null ? void 0 : selectedWallet.mobileDownloadUrl));
  switch (walletStep) {
    case "NONE" /* None */:
      walletContent = /* @__PURE__ */ React28.createElement(ConnectModalIntro, {
        getWallet: () => changeWalletStep("GET" /* Get */)
      });
      break;
    case "LEARN_COMPACT" /* LearnCompact */:
      walletContent = /* @__PURE__ */ React28.createElement(ConnectModalIntro, {
        compactModeEnabled,
        getWallet: () => changeWalletStep("GET" /* Get */)
      });
      headerLabel = "What is a Wallet?";
      headerBackButtonLink = "NONE" /* None */;
      break;
    case "GET" /* Get */:
      walletContent = /* @__PURE__ */ React28.createElement(GetDetail, {
        getWalletDownload
      });
      headerLabel = "Get a Wallet";
      headerBackButtonLink = compactModeEnabled ? "LEARN_COMPACT" /* LearnCompact */ : "NONE" /* None */;
      break;
    case "CONNECT" /* Connect */:
      walletContent = selectedWallet && /* @__PURE__ */ React28.createElement(ConnectDetail, {
        changeWalletStep,
        compactModeEnabled,
        connectionError,
        onClose,
        qrCodeUri,
        reconnect: connectToWallet,
        wallet: selectedWallet
      });
      headerLabel = hasQrCode && `Scan with ${selectedWallet.name === "WalletConnect" ? "your phone" : selectedWallet.name}`;
      headerBackButtonLink = compactModeEnabled ? "NONE" /* None */ : null;
      headerBackButtonCallback = compactModeEnabled ? clearSelectedWallet : () => {
      };
      break;
    case "DOWNLOAD_OPTIONS" /* DownloadOptions */:
      walletContent = selectedWallet && /* @__PURE__ */ React28.createElement(DownloadOptionsDetail, {
        changeWalletStep,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile && "CONNECT" /* Connect */ ? initialWalletStep : null;
      break;
    case "DOWNLOAD" /* Download */:
      walletContent = selectedWallet && /* @__PURE__ */ React28.createElement(DownloadDetail, {
        changeWalletStep,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Install ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : initialWalletStep;
      break;
    case "INSTRUCTIONS_MOBILE" /* InstructionsMobile */:
      walletContent = selectedWallet && /* @__PURE__ */ React28.createElement(InstructionMobileDetail, {
        connectWallet: selectWallet,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get started with ${compactModeEnabled ? selectedWallet.shortName || selectedWallet.name : selectedWallet.name}`;
      headerBackButtonLink = "DOWNLOAD" /* Download */;
      break;
    case "INSTRUCTIONS_EXTENSION" /* InstructionsExtension */:
      walletContent = selectedWallet && /* @__PURE__ */ React28.createElement(InstructionExtensionDetail, {
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get started with ${compactModeEnabled ? selectedWallet.shortName || selectedWallet.name : selectedWallet.name}`;
      headerBackButtonLink = "DOWNLOAD_OPTIONS" /* DownloadOptions */;
      break;
    default:
      break;
  }
  return /* @__PURE__ */ React28.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    style: { maxHeight: compactModeEnabled ? 468 : 504 }
  }, (compactModeEnabled ? walletStep === "NONE" /* None */ : true) && /* @__PURE__ */ React28.createElement(Box, {
    className: compactModeEnabled ? sidebarCompactMode : sidebar,
    display: "flex",
    flexDirection: "column",
    marginTop: "16"
  }, /* @__PURE__ */ React28.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, compactModeEnabled && Disclaimer && /* @__PURE__ */ React28.createElement(Box, {
    marginLeft: "16",
    width: "28"
  }, /* @__PURE__ */ React28.createElement(InfoButton, {
    onClick: () => changeWalletStep("LEARN_COMPACT" /* LearnCompact */)
  })), compactModeEnabled && !Disclaimer && /* @__PURE__ */ React28.createElement(Box, {
    marginLeft: "16",
    width: "28"
  }), /* @__PURE__ */ React28.createElement(Box, {
    marginLeft: compactModeEnabled ? "0" : "6",
    paddingBottom: "8",
    paddingTop: "2",
    paddingX: "18"
  }, /* @__PURE__ */ React28.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: "18",
    weight: "heavy"
  }, "Connect a Wallet")), compactModeEnabled && /* @__PURE__ */ React28.createElement(Box, {
    marginRight: "16"
  }, /* @__PURE__ */ React28.createElement(DialogClose_default, {
    onClick: onClose
  }))), /* @__PURE__ */ React28.createElement(Box, {
    className: ScrollClassName,
    paddingBottom: "18"
  }, Object.entries(groupedWallets).map(
    ([groupName, wallets2], index) => wallets2.length > 0 && /* @__PURE__ */ React28.createElement(Fragment, {
      key: index
    }, groupName ? /* @__PURE__ */ React28.createElement(Box, {
      marginBottom: "8",
      marginTop: "16",
      marginX: "6"
    }, /* @__PURE__ */ React28.createElement(Text, {
      color: "modalTextSecondary",
      size: "14",
      weight: "bold"
    }, groupName)) : null, /* @__PURE__ */ React28.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, wallets2.map((wallet) => {
      return /* @__PURE__ */ React28.createElement(ModalSelection, {
        currentlySelected: wallet.id === selectedOptionId,
        iconBackground: wallet.iconBackground,
        iconUrl: wallet.iconUrl,
        key: wallet.id,
        name: wallet.name,
        onClick: () => selectWallet(wallet),
        ready: wallet.ready,
        recent: wallet.recent,
        testId: `wallet-option-${wallet.id}`
      });
    })))
  )), compactModeEnabled && /* @__PURE__ */ React28.createElement(React28.Fragment, null, /* @__PURE__ */ React28.createElement(Box, {
    background: "generalBorder",
    height: "1",
    marginTop: "-1"
  }), Disclaimer ? /* @__PURE__ */ React28.createElement(Box, {
    paddingX: "24",
    paddingY: "16",
    textAlign: "center"
  }, /* @__PURE__ */ React28.createElement(Disclaimer, {
    Link: DisclaimerLink,
    Text: DisclaimerText
  })) : /* @__PURE__ */ React28.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingX: "24",
    paddingY: "16"
  }, /* @__PURE__ */ React28.createElement(Box, {
    paddingY: "4"
  }, /* @__PURE__ */ React28.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "New to Ethereum wallets?")), /* @__PURE__ */ React28.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "4",
    justifyContent: "center"
  }, /* @__PURE__ */ React28.createElement(Box, {
    className: touchableStyles({
      active: "shrink",
      hover: "grow"
    }),
    cursor: "pointer",
    onClick: () => changeWalletStep("LEARN_COMPACT" /* LearnCompact */),
    paddingY: "4",
    style: { willChange: "transform" },
    transition: "default"
  }, /* @__PURE__ */ React28.createElement(Text, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More")))))), (compactModeEnabled ? walletStep !== "NONE" /* None */ : true) && /* @__PURE__ */ React28.createElement(React28.Fragment, null, !compactModeEnabled && /* @__PURE__ */ React28.createElement(Box, {
    background: "generalBorder",
    minWidth: "1",
    width: "1"
  }), /* @__PURE__ */ React28.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    margin: "16",
    style: { flexGrow: 1 }
  }, /* @__PURE__ */ React28.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12"
  }, /* @__PURE__ */ React28.createElement(Box, {
    width: "28"
  }, headerBackButtonLink && /* @__PURE__ */ React28.createElement(Box, {
    as: "button",
    className: touchableStyles({
      active: "shrinkSm",
      hover: "growLg"
    }),
    color: "accentColor",
    onClick: () => {
      headerBackButtonLink && changeWalletStep(headerBackButtonLink, true);
      headerBackButtonCallback == null ? void 0 : headerBackButtonCallback();
    },
    paddingX: "8",
    paddingY: "4",
    style: {
      boxSizing: "content-box",
      height: 17,
      willChange: "transform"
    },
    transition: "default",
    type: "button"
  }, /* @__PURE__ */ React28.createElement(BackIcon, null))), /* @__PURE__ */ React28.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    style: { flexGrow: 1 }
  }, headerLabel && /* @__PURE__ */ React28.createElement(Text, {
    color: "modalText",
    size: "18",
    textAlign: "center",
    weight: "heavy"
  }, headerLabel)), /* @__PURE__ */ React28.createElement(DialogClose_default, {
    onClick: onClose
  })), /* @__PURE__ */ React28.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    style: { minHeight: compactModeEnabled ? 396 : 432 }
  }, /* @__PURE__ */ React28.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "6",
    height: "full",
    justifyContent: "center",
    marginX: "8"
  }, walletContent)))));
}

// src/rainbowkit/src/components/ConnectOptions/MobileOptions.tsx
import React29, { useCallback as useCallback4, useContext as useContext7, useState as useState8 } from "react";

// src/rainbowkit/src/components/RainbowKitProvider/walletConnectDeepLink.ts
var storageKey2 = "WALLETCONNECT_DEEPLINK_CHOICE";
function setWalletConnectDeepLink({
  mobileUri,
  name
}) {
  localStorage.setItem(
    storageKey2,
    JSON.stringify({
      href: mobileUri.split("?")[0],
      name
    })
  );
}
function clearWalletConnectDeepLink() {
  localStorage.removeItem(storageKey2);
}

// src/rainbowkit/src/components/ConnectOptions/MobileOptions.css.ts
import { style as style6 } from "@vanilla-extract/css";
var scroll = style6({
  overflow: "auto",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  transform: "translateZ(0)"
});

// src/rainbowkit/src/components/ConnectOptions/MobileOptions.tsx
function WalletButton({
  onClose,
  wallet
}) {
  const {
    connect,
    connector,
    iconBackground,
    iconUrl,
    id,
    mobile,
    name,
    onConnecting,
    ready,
    shortName
  } = wallet;
  const getMobileUri = mobile == null ? void 0 : mobile.getUri;
  const coolModeRef = useCoolMode(iconUrl);
  return /* @__PURE__ */ React29.createElement(Box, {
    as: "button",
    color: ready ? "modalText" : "modalTextSecondary",
    disabled: !ready,
    fontFamily: "body",
    key: id,
    onClick: useCallback4(async () => {
      if (id === "walletConnect")
        onClose == null ? void 0 : onClose();
      connect == null ? void 0 : connect();
      let callbackFired = false;
      onConnecting == null ? void 0 : onConnecting(async () => {
        if (callbackFired)
          return;
        callbackFired = true;
        if (getMobileUri) {
          const mobileUri = await getMobileUri();
          if (connector.id === "walletConnect" || connector.id === "walletConnectLegacy") {
            setWalletConnectDeepLink({ mobileUri, name });
          }
          if (mobileUri.startsWith("http")) {
            const link = document.createElement("a");
            link.href = mobileUri;
            link.target = "_blank";
            link.rel = "noreferrer noopener";
            link.click();
          } else {
            window.location.href = mobileUri;
          }
        }
      });
    }, [connector, connect, getMobileUri, onConnecting, onClose, name, id]),
    ref: coolModeRef,
    style: { overflow: "visible", textAlign: "center" },
    testId: `wallet-option-${id}`,
    type: "button",
    width: "full"
  }, /* @__PURE__ */ React29.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, /* @__PURE__ */ React29.createElement(Box, {
    paddingBottom: "8",
    paddingTop: "10"
  }, /* @__PURE__ */ React29.createElement(AsyncImage, {
    background: iconBackground,
    borderRadius: "13",
    boxShadow: "walletLogo",
    height: "60",
    src: iconUrl,
    width: "60"
  })), /* @__PURE__ */ React29.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  }, /* @__PURE__ */ React29.createElement(Text, {
    as: "h2",
    color: wallet.ready ? "modalText" : "modalTextSecondary",
    size: "13",
    weight: "medium"
  }, /* @__PURE__ */ React29.createElement(Box, {
    as: "span",
    position: "relative"
  }, shortName != null ? shortName : name, !wallet.ready && " (unsupported)")), wallet.recent && /* @__PURE__ */ React29.createElement(Text, {
    color: "accentColor",
    size: "12",
    weight: "medium"
  }, "Recent"))));
}
function MobileOptions({ onClose }) {
  var _a;
  const titleId = "rk_connect_title";
  const wallets = useWalletConnectors();
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext7(AppContext);
  let headerLabel = null;
  let walletContent = null;
  let headerBackgroundContrast = false;
  let headerBackButtonLink = null;
  const [walletStep, setWalletStep] = useState8(
    "CONNECT" /* Connect */
  );
  const ios = isIOS();
  switch (walletStep) {
    case "CONNECT" /* Connect */: {
      headerLabel = "Connect a Wallet";
      headerBackgroundContrast = true;
      walletContent = /* @__PURE__ */ React29.createElement(Box, null, /* @__PURE__ */ React29.createElement(Box, {
        background: "profileForeground",
        className: scroll,
        display: "flex",
        paddingBottom: "20",
        paddingTop: "6"
      }, /* @__PURE__ */ React29.createElement(Box, {
        display: "flex",
        style: { margin: "0 auto" }
      }, wallets.filter((wallet) => wallet.ready).map((wallet) => {
        return /* @__PURE__ */ React29.createElement(Box, {
          key: wallet.id,
          paddingX: "20"
        }, /* @__PURE__ */ React29.createElement(Box, {
          width: "60"
        }, /* @__PURE__ */ React29.createElement(WalletButton, {
          onClose,
          wallet
        })));
      }))), /* @__PURE__ */ React29.createElement(Box, {
        background: "generalBorder",
        height: "1",
        marginBottom: "32",
        marginTop: "-1"
      }), /* @__PURE__ */ React29.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "32",
        paddingX: "32",
        style: { textAlign: "center" }
      }, /* @__PURE__ */ React29.createElement(Box, {
        display: "flex",
        flexDirection: "column",
        gap: "8",
        textAlign: "center"
      }, /* @__PURE__ */ React29.createElement(Text, {
        color: "modalText",
        size: "16",
        weight: "bold"
      }, "What is a Wallet?"), /* @__PURE__ */ React29.createElement(Text, {
        color: "modalTextSecondary",
        size: "16"
      }, "A wallet is used to send, receive, store, and display digital assets. It\u2019s also a new way to log in, without needing to create new accounts and passwords on\xA0every\xA0website."))), /* @__PURE__ */ React29.createElement(Box, {
        paddingTop: "32",
        paddingX: "20"
      }, /* @__PURE__ */ React29.createElement(Box, {
        display: "flex",
        gap: "14",
        justifyContent: "center"
      }, /* @__PURE__ */ React29.createElement(ActionButton, {
        label: "Get a Wallet",
        onClick: () => setWalletStep("GET" /* Get */),
        size: "large",
        type: "secondary"
      }), /* @__PURE__ */ React29.createElement(ActionButton, {
        href: learnMoreUrl,
        label: "Learn More",
        size: "large",
        type: "secondary"
      }))), Disclaimer && /* @__PURE__ */ React29.createElement(Box, {
        marginTop: "28",
        marginX: "32",
        textAlign: "center"
      }, /* @__PURE__ */ React29.createElement(Disclaimer, {
        Link: DisclaimerLink,
        Text: DisclaimerText
      })));
      break;
    }
    case "GET" /* Get */: {
      headerLabel = "Get a Wallet";
      headerBackButtonLink = "CONNECT" /* Connect */;
      const mobileWallets = (_a = wallets == null ? void 0 : wallets.filter(
        (wallet) => {
          var _a2, _b, _c;
          return ((_a2 = wallet.downloadUrls) == null ? void 0 : _a2.ios) || ((_b = wallet.downloadUrls) == null ? void 0 : _b.android) || ((_c = wallet.downloadUrls) == null ? void 0 : _c.mobile);
        }
      )) == null ? void 0 : _a.splice(0, 3);
      walletContent = /* @__PURE__ */ React29.createElement(Box, null, /* @__PURE__ */ React29.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "full",
        marginBottom: "36",
        marginTop: "5",
        paddingTop: "12",
        width: "full"
      }, mobileWallets.map((wallet, index) => {
        const { downloadUrls, iconBackground, iconUrl, name } = wallet;
        if (!(downloadUrls == null ? void 0 : downloadUrls.ios) && !(downloadUrls == null ? void 0 : downloadUrls.android) && !(downloadUrls == null ? void 0 : downloadUrls.mobile)) {
          return null;
        }
        return /* @__PURE__ */ React29.createElement(Box, {
          display: "flex",
          gap: "16",
          key: wallet.id,
          paddingX: "20",
          width: "full"
        }, /* @__PURE__ */ React29.createElement(Box, {
          style: { minHeight: 48, minWidth: 48 }
        }, /* @__PURE__ */ React29.createElement(AsyncImage, {
          background: iconBackground,
          borderColor: "generalBorder",
          borderRadius: "10",
          height: "48",
          src: iconUrl,
          width: "48"
        })), /* @__PURE__ */ React29.createElement(Box, {
          display: "flex",
          flexDirection: "column",
          width: "full"
        }, /* @__PURE__ */ React29.createElement(Box, {
          alignItems: "center",
          display: "flex",
          height: "48"
        }, /* @__PURE__ */ React29.createElement(Box, {
          width: "full"
        }, /* @__PURE__ */ React29.createElement(Text, {
          color: "modalText",
          size: "18",
          weight: "bold"
        }, name)), /* @__PURE__ */ React29.createElement(ActionButton, {
          href: (ios ? downloadUrls == null ? void 0 : downloadUrls.ios : downloadUrls == null ? void 0 : downloadUrls.android) || (downloadUrls == null ? void 0 : downloadUrls.mobile),
          label: "GET",
          size: "small",
          type: "secondary"
        })), index < mobileWallets.length - 1 && /* @__PURE__ */ React29.createElement(Box, {
          background: "generalBorderDim",
          height: "1",
          marginY: "10",
          width: "full"
        })));
      })), /* @__PURE__ */ React29.createElement(Box, {
        style: { marginBottom: "42px" }
      }), /* @__PURE__ */ React29.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "36",
        paddingX: "36",
        style: { textAlign: "center" }
      }, /* @__PURE__ */ React29.createElement(Box, {
        display: "flex",
        flexDirection: "column",
        gap: "12",
        textAlign: "center"
      }, /* @__PURE__ */ React29.createElement(Text, {
        color: "modalText",
        size: "16",
        weight: "bold"
      }, "Not what you\u2019re looking for?"), /* @__PURE__ */ React29.createElement(Text, {
        color: "modalTextSecondary",
        size: "16"
      }, "Select a wallet on the main screen to get started with a different wallet provider."))));
      break;
    }
  }
  return /* @__PURE__ */ React29.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "36"
  }, /* @__PURE__ */ React29.createElement(Box, {
    background: headerBackgroundContrast ? "profileForeground" : "modalBackground",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "4",
    paddingTop: "14"
  }, /* @__PURE__ */ React29.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "6",
    paddingX: "20",
    position: "relative"
  }, headerBackButtonLink && /* @__PURE__ */ React29.createElement(Box, {
    display: "flex",
    position: "absolute",
    style: {
      left: 0,
      marginBottom: -20,
      marginTop: -20
    }
  }, /* @__PURE__ */ React29.createElement(Box, {
    alignItems: "center",
    as: "button",
    className: touchableStyles({
      active: "shrinkSm",
      hover: "growLg"
    }),
    color: "accentColor",
    display: "flex",
    marginLeft: "4",
    marginTop: "20",
    onClick: () => setWalletStep(headerBackButtonLink),
    padding: "16",
    style: { height: 17, willChange: "transform" },
    transition: "default",
    type: "button"
  }, /* @__PURE__ */ React29.createElement(BackIcon, null))), /* @__PURE__ */ React29.createElement(Box, {
    marginTop: "4",
    textAlign: "center",
    width: "full"
  }, /* @__PURE__ */ React29.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: "20",
    weight: "bold"
  }, headerLabel)), /* @__PURE__ */ React29.createElement(Box, {
    alignItems: "center",
    display: "flex",
    height: "32",
    paddingRight: "14",
    position: "absolute",
    right: "0"
  }, /* @__PURE__ */ React29.createElement(Box, {
    style: { marginBottom: -20, marginTop: -20 }
  }, /* @__PURE__ */ React29.createElement(DialogClose_default, {
    onClick: onClose
  }))))), /* @__PURE__ */ React29.createElement(Box, {
    display: "flex",
    flexDirection: "column"
  }, walletContent));
}

// src/rainbowkit/src/components/Dialog/DialogContent.css.ts
import { style as style7 } from "@vanilla-extract/css";
var dialogContent = style7([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative"
  }),
  {
    "@media": {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: "360px"
      }
    },
    boxSizing: "content-box",
    maxWidth: "100vw",
    width: "360px"
  }
]);
var dialogContentWideMobile = style7([
  dialogContent,
  { width: "100vw" },
  {
    "@media": {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: "480px"
      }
    }
  }
]);
var dialogContentWideDesktop = style7([
  dialogContent,
  {
    width: largeScreenMinWidth
  },
  {
    "@media": {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        width: "720px"
      }
    }
  }
]);
var dialogContentCompactMode = style7([
  dialogContent,
  {
    minWidth: "368px",
    width: "368px"
  },
  {
    "@media": {
      [`screen and (min-width: ${largeScreenMinWidth}px)`]: {
        minWidth: "368px",
        width: "368px"
      }
    }
  }
]);
var dialogContentMobile = style7([
  sprinkles({
    borderRadius: "modalMobile"
  }),
  {
    borderWidth: "0px",
    boxSizing: "border-box",
    width: "100vw"
  }
]);
var bleed = 200;
var bottomSheetOverrides = style7({
  "@media": {
    [`screen and (max-width: ${largeScreenMinWidth - 1}px)`]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      marginTop: -bleed,
      paddingBottom: bleed,
      top: bleed
    }
  }
});

// src/rainbowkit/src/components/ConnectButton/ConnectButton.tsx
import React59 from "react";

// src/rainbowkit/src/hooks/useConnectionStatus.ts
import { useAccount as useAccount2 } from "wagmi";

// src/rainbowkit/src/components/RainbowKitProvider/AuthenticationContext.tsx
import React30, {
  createContext as createContext6,
  useContext as useContext8,
  useEffect as useEffect10,
  useMemo as useMemo4,
  useRef as useRef3
} from "react";
import { useAccount } from "wagmi";
var AuthenticationContext = createContext6(
  null
);
function useAuthenticationAdapter() {
  var _a;
  const { adapter } = (_a = useContext8(AuthenticationContext)) != null ? _a : {};
  if (!adapter) {
    throw new Error("No authentication adapter found");
  }
  return adapter;
}
function useAuthenticationStatus() {
  var _a;
  const contextValue = useContext8(AuthenticationContext);
  return (_a = contextValue == null ? void 0 : contextValue.status) != null ? _a : null;
}

// src/rainbowkit/src/hooks/useConnectionStatus.ts
function useConnectionStatus() {
  const authenticationStatus = useAuthenticationStatus();
  const { isConnected } = useAccount2();
  if (!isConnected) {
    return "disconnected";
  }
  if (!authenticationStatus) {
    return "connected";
  }
  if (authenticationStatus === "loading" || authenticationStatus === "unauthenticated") {
    return authenticationStatus;
  }
  return "connected";
}

// src/rainbowkit/src/components/Avatar/Avatar.tsx
import React33, { useContext as useContext9 } from "react";

// src/rainbowkit/src/components/RainbowKitProvider/AvatarContext.ts
import { createContext as createContext7 } from "react";

// src/rainbowkit/src/components/Avatar/EmojiAvatar.tsx
import React31, { useEffect as useEffect11, useMemo as useMemo5, useState as useState9 } from "react";

// src/rainbowkit/src/components/Avatar/emojiAvatarForAddress.ts
var colors = [
  "#FC5C54",
  "#FFD95A",
  "#E95D72",
  "#6A87C8",
  "#5FD0F3",
  "#75C06B",
  "#FFDD86",
  "#5FC6D4",
  "#FF949A",
  "#FF8024",
  "#9BA1A4",
  "#EC66FF",
  "#FF8CBC",
  "#FF9A23",
  "#C5DADB",
  "#A8CE63",
  "#71ABFF",
  "#FFE279",
  "#B6B1B6",
  "#FF6780",
  "#A575FF",
  "#4D82FF",
  "#FFB35A"
];
var avatars = [
  { color: colors[0], emoji: "\u{1F336}" },
  { color: colors[1], emoji: "\u{1F911}" },
  { color: colors[2], emoji: "\u{1F419}" },
  { color: colors[3], emoji: "\u{1FAD0}" },
  { color: colors[4], emoji: "\u{1F433}" },
  { color: colors[0], emoji: "\u{1F936}" },
  { color: colors[5], emoji: "\u{1F332}" },
  { color: colors[6], emoji: "\u{1F31E}" },
  { color: colors[7], emoji: "\u{1F412}" },
  { color: colors[8], emoji: "\u{1F435}" },
  { color: colors[9], emoji: "\u{1F98A}" },
  { color: colors[10], emoji: "\u{1F43C}" },
  { color: colors[11], emoji: "\u{1F984}" },
  { color: colors[12], emoji: "\u{1F437}" },
  { color: colors[13], emoji: "\u{1F427}" },
  { color: colors[8], emoji: "\u{1F9A9}" },
  { color: colors[14], emoji: "\u{1F47D}" },
  { color: colors[0], emoji: "\u{1F388}" },
  { color: colors[8], emoji: "\u{1F349}" },
  { color: colors[1], emoji: "\u{1F389}" },
  { color: colors[15], emoji: "\u{1F432}" },
  { color: colors[16], emoji: "\u{1F30E}" },
  { color: colors[17], emoji: "\u{1F34A}" },
  { color: colors[18], emoji: "\u{1F42D}" },
  { color: colors[19], emoji: "\u{1F363}" },
  { color: colors[1], emoji: "\u{1F425}" },
  { color: colors[20], emoji: "\u{1F47E}" },
  { color: colors[15], emoji: "\u{1F966}" },
  { color: colors[0], emoji: "\u{1F479}" },
  { color: colors[17], emoji: "\u{1F640}" },
  { color: colors[4], emoji: "\u26F1" },
  { color: colors[21], emoji: "\u26F5\uFE0F" },
  { color: colors[17], emoji: "\u{1F973}" },
  { color: colors[8], emoji: "\u{1F92F}" },
  { color: colors[22], emoji: "\u{1F920}" }
];
function hashCode(text) {
  let hash = 0;
  if (text.length === 0)
    return hash;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}
function emojiAvatarForAddress(address) {
  const resolvedAddress = typeof address === "string" ? address : "";
  const avatarIndex = Math.abs(
    hashCode(resolvedAddress.toLowerCase()) % avatars.length
  );
  return avatars[avatarIndex != null ? avatarIndex : 0];
}

// src/rainbowkit/src/components/Avatar/EmojiAvatar.tsx
var EmojiAvatar = ({ address, ensImage, size }) => {
  const [loaded, setLoaded] = useState9(false);
  useEffect11(() => {
    if (ensImage) {
      const img = new Image();
      img.src = ensImage;
      img.onload = () => setLoaded(true);
    }
  }, [ensImage]);
  const { color: backgroundColor, emoji } = useMemo5(
    () => emojiAvatarForAddress(address),
    [address]
  );
  return ensImage ? loaded ? /* @__PURE__ */ React31.createElement(Box, {
    backgroundSize: "cover",
    borderRadius: "full",
    position: "absolute",
    style: {
      backgroundImage: `url(${ensImage})`,
      backgroundPosition: "center",
      height: size,
      width: size
    }
  }) : /* @__PURE__ */ React31.createElement(Box, {
    alignItems: "center",
    backgroundSize: "cover",
    borderRadius: "full",
    color: "modalText",
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    style: {
      height: size,
      width: size
    }
  }, /* @__PURE__ */ React31.createElement(SpinnerIcon, null)) : /* @__PURE__ */ React31.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    style: {
      ...!ensImage && { backgroundColor },
      height: size,
      width: size
    }
  }, emoji);
};

// src/rainbowkit/src/components/RainbowKitProvider/AvatarContext.ts
var defaultAvatar = EmojiAvatar;
var AvatarContext = createContext7(defaultAvatar);

// src/rainbowkit/src/components/Avatar/Avatar.tsx
function Avatar({ address, imageUrl, loading, size }) {
  const AvatarComponent3 = useContext9(AvatarContext);
  return /* @__PURE__ */ React33.createElement(Box, {
    "aria-hidden": true,
    borderRadius: "full",
    overflow: "hidden",
    position: "relative",
    style: {
      height: `${size}px`,
      width: `${size}px`
    },
    userSelect: "none"
  }, /* @__PURE__ */ React33.createElement(Box, {
    alignItems: "center",
    borderRadius: "full",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    position: "absolute",
    style: {
      fontSize: `${Math.round(size * 0.55)}px`,
      height: `${size}px`,
      transform: loading ? "scale(0.72)" : void 0,
      transition: ".25s ease",
      transitionDelay: loading ? void 0 : ".1s",
      width: `${size}px`,
      willChange: "transform"
    },
    userSelect: "none"
  }, /* @__PURE__ */ React33.createElement(AvatarComponent3, {
    address,
    ensImage: imageUrl,
    size
  })), typeof loading === "boolean" && /* @__PURE__ */ React33.createElement(Box, {
    color: "accentColor",
    display: "flex",
    height: "full",
    position: "absolute",
    style: {
      opacity: loading ? 1 : 0,
      transition: loading ? "0.6s ease" : "0.2s ease",
      transitionDelay: loading ? ".05s" : void 0
    },
    width: "full"
  }, /* @__PURE__ */ React33.createElement(SpinnerIcon, {
    height: "100%",
    width: "100%"
  })));
}

// src/rainbowkit/src/components/Icons/Dropdown.tsx
import React34 from "react";
var DropdownIcon = () => /* @__PURE__ */ React34.createElement("svg", {
  fill: "none",
  height: "7",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React34.createElement("path", {
  d: "M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2.5",
  xmlns: "http://www.w3.org/2000/svg"
}));

// src/rainbowkit/src/components/ConnectButton/ConnectButtonRenderer.tsx
import React58, { useContext as useContext17 } from "react";
import { useAccount as useAccount11, useBalance as useBalance2, useNetwork as useNetwork7 } from "wagmi";

// src/rainbowkit/src/hooks/useIsMounted.ts
import { useEffect as useEffect12, useReducer as useReducer3 } from "react";
var useIsMounted = () => {
  const [mounted, setMounted] = useReducer3(() => true, false);
  useEffect12(setMounted, [setMounted]);
  return mounted;
};

// src/rainbowkit/src/hooks/useMainnetEnsAvatar.ts
import { useEnsAvatar } from "wagmi";

// src/rainbowkit/src/hooks/useMainnet.ts
import { usePublicClient } from "wagmi";
import { mainnet } from "wagmi/chains";
function useMainnet() {
  const chainId = mainnet.id;
  const provider = usePublicClient();
  const chains = Array.isArray(provider.chains) ? provider.chains : [];
  const enabled = chains == null ? void 0 : chains.some((chain) => (chain == null ? void 0 : chain.id) === chainId);
  return { chainId, enabled };
}

// src/rainbowkit/src/hooks/useMainnetEnsAvatar.ts
function useMainnetEnsAvatar(name) {
  const { chainId, enabled } = useMainnet();
  const { data: ensAvatar } = useEnsAvatar({
    chainId,
    enabled,
    name
  });
  return ensAvatar;
}

// src/rainbowkit/src/hooks/useMainnetEnsName.ts
import { useEnsName } from "wagmi";
function useMainnetEnsName(address) {
  const { chainId, enabled } = useMainnet();
  const { data: ensName } = useEnsName({
    address,
    chainId,
    enabled
  });
  return ensName;
}

// src/rainbowkit/src/transactions/useRecentTransactions.ts
import { useEffect as useEffect14, useState as useState11 } from "react";
import { useAccount as useAccount4 } from "wagmi";

// src/rainbowkit/src/hooks/useChainId.ts
import { useNetwork } from "wagmi";
function useChainId() {
  var _a;
  const { chain: activeChain } = useNetwork();
  return (_a = activeChain == null ? void 0 : activeChain.id) != null ? _a : null;
}

// src/rainbowkit/src/transactions/TransactionStoreContext.tsx
import React35, { createContext as createContext8, useContext as useContext10, useEffect as useEffect13, useState as useState10 } from "react";
import { useAccount as useAccount3, usePublicClient as usePublicClient2 } from "wagmi";

// src/rainbowkit/src/transactions/transactionStore.ts
var storageKey3 = "rk-transactions";
function safeParseJsonData(string) {
  try {
    const value = string ? JSON.parse(string) : {};
    return typeof value === "object" ? value : {};
  } catch (err) {
    return {};
  }
}
function loadData() {
  return safeParseJsonData(
    typeof localStorage !== "undefined" ? localStorage.getItem(storageKey3) : null
  );
}
var transactionHashRegex = /^0x([A-Fa-f0-9]{64})$/;
function validateTransaction(transaction) {
  const errors = [];
  if (!transactionHashRegex.test(transaction.hash)) {
    errors.push("Invalid transaction hash");
  }
  if (typeof transaction.description !== "string") {
    errors.push("Transaction must have a description");
  }
  if (typeof transaction.confirmations !== "undefined" && (!Number.isInteger(transaction.confirmations) || transaction.confirmations < 1)) {
    errors.push("Transaction confirmations must be a positiver integer");
  }
  return errors;
}
function createTransactionStore({
  provider: initialProvider
}) {
  let data = loadData();
  let provider = initialProvider;
  const listeners = /* @__PURE__ */ new Set();
  const transactionRequestCache = /* @__PURE__ */ new Map();
  function setProvider2(newProvider) {
    provider = newProvider;
  }
  function getTransactions(account, chainId) {
    var _a, _b;
    return (_b = (_a = data[account]) == null ? void 0 : _a[chainId]) != null ? _b : [];
  }
  function addTransaction(account, chainId, transaction) {
    const errors = validateTransaction(transaction);
    if (errors.length > 0) {
      throw new Error(["Unable to add transaction", ...errors].join("\n"));
    }
    updateTransactions(account, chainId, (transactions) => {
      return [
        { ...transaction, status: "pending" },
        ...transactions.filter(({ hash }) => {
          return hash !== transaction.hash;
        })
      ];
    });
  }
  function clearTransactions(account, chainId) {
    updateTransactions(account, chainId, () => {
      return [];
    });
  }
  function setTransactionStatus(account, chainId, hash, status) {
    updateTransactions(account, chainId, (transactions) => {
      return transactions.map(
        (transaction) => transaction.hash === hash ? { ...transaction, status } : transaction
      );
    });
  }
  async function waitForPendingTransactions(account, chainId) {
    await Promise.all(
      getTransactions(account, chainId).filter((transaction) => transaction.status === "pending").map(async (transaction) => {
        const { confirmations, hash } = transaction;
        const existingRequest = transactionRequestCache.get(hash);
        if (existingRequest) {
          return await existingRequest;
        }
        const requestPromise = provider.waitForTransactionReceipt({ confirmations, hash }).then(({ status }) => {
          transactionRequestCache.delete(hash);
          if (status === void 0) {
            return;
          }
          setTransactionStatus(
            account,
            chainId,
            hash,
            status === 0 || status === "reverted" ? "failed" : "confirmed"
          );
        });
        transactionRequestCache.set(hash, requestPromise);
        return await requestPromise;
      })
    );
  }
  function updateTransactions(account, chainId, updateFn) {
    var _a, _b;
    data = loadData();
    data[account] = (_a = data[account]) != null ? _a : {};
    let completedTransactionCount = 0;
    const MAX_COMPLETED_TRANSACTIONS = 10;
    const transactions = updateFn((_b = data[account][chainId]) != null ? _b : []).filter(({ status }) => {
      return status === "pending" ? true : completedTransactionCount++ <= MAX_COMPLETED_TRANSACTIONS;
    });
    data[account][chainId] = transactions.length > 0 ? transactions : void 0;
    persistData();
    notifyListeners();
    waitForPendingTransactions(account, chainId);
  }
  function persistData() {
    localStorage.setItem(storageKey3, JSON.stringify(data));
  }
  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }
  function onChange(fn) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  }
  return {
    addTransaction,
    clearTransactions,
    getTransactions,
    onChange,
    setProvider: setProvider2,
    waitForPendingTransactions
  };
}

// src/rainbowkit/src/transactions/TransactionStoreContext.tsx
var storeSingleton;
var TransactionStoreContext = createContext8(null);
function TransactionStoreProvider({ children }) {
  const provider = usePublicClient2();
  const { address } = useAccount3();
  const chainId = useChainId();
  const [store] = useState10(() => storeSingleton != null ? storeSingleton : storeSingleton = createTransactionStore({ provider }));
  useEffect13(() => {
    store.setProvider(provider);
  }, [store, provider]);
  useEffect13(() => {
    if (address && chainId) {
      store.waitForPendingTransactions(address, chainId);
    }
  }, [store, address, chainId]);
  return /* @__PURE__ */ React35.createElement(TransactionStoreContext.Provider, {
    value: store
  }, children);
}
function useTransactionStore() {
  const store = useContext10(TransactionStoreContext);
  if (!store) {
    throw new Error("Transaction hooks must be used within RainbowKitProvider");
  }
  return store;
}

// src/rainbowkit/src/transactions/useRecentTransactions.ts
function useRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount4();
  const chainId = useChainId();
  const [transactions, setTransactions] = useState11(
    () => store && address && chainId ? store.getTransactions(address, chainId) : []
  );
  useEffect14(() => {
    if (store && address && chainId) {
      setTransactions(store.getTransactions(address, chainId));
      return store.onChange(() => {
        setTransactions(store.getTransactions(address, chainId));
      });
    }
  }, [store, address, chainId]);
  return transactions;
}

// src/rainbowkit/src/components/RainbowKitProvider/ModalContext.tsx
import React57, {
  createContext as createContext11,
  useCallback as useCallback13,
  useContext as useContext16,
  useMemo as useMemo6,
  useRef as useRef6,
  useState as useState14
} from "react";
import { useAccount as useAccount10, useNetwork as useNetwork6 } from "wagmi";

// src/rainbowkit/src/components/AccountModal/AccountModal.tsx
import React51 from "react";
import { useAccount as useAccount9, useBalance, useDisconnect as useDisconnect2 } from "wagmi";

// src/rainbowkit/src/components/Dialog/Dialog.tsx
import React39, { useCallback as useCallback9, useEffect as useEffect18, useState as useState12 } from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

// src/rainbowkit/src/components/RainbowKitProvider/RainbowKitProvider.tsx
import React37, { createContext as createContext10, useContext as useContext11 } from "react";
import { useAccount as useAccount6 } from "wagmi";

// src/rainbowkit/src/css/cssObjectFromTheme.ts
import { assignInlineVars } from "@vanilla-extract/dynamic";
var resolveThemeVars = (theme) => typeof theme === "function" ? theme() : theme;
function cssObjectFromTheme(theme, { extends: baseTheme2 } = {}) {
  const resolvedThemeVars = {
    ...assignInlineVars(themeVars, resolveThemeVars(theme))
  };
  if (!baseTheme2) {
    return resolvedThemeVars;
  }
  const resolvedBaseThemeVars = assignInlineVars(
    themeVars,
    resolveThemeVars(baseTheme2)
  );
  const filteredVars = Object.fromEntries(
    Object.entries(resolvedThemeVars).filter(
      ([varName, value]) => value !== resolvedBaseThemeVars[varName]
    )
  );
  return filteredVars;
}

// src/rainbowkit/src/css/cssStringFromTheme.ts
function cssStringFromTheme(theme, options = {}) {
  return Object.entries(cssObjectFromTheme(theme, options)).map(([key, value]) => `${key}:${value.replace(/[:;{}</>]/g, "")};`).join("");
}

// src/rainbowkit/src/themes/baseTheme.ts
var systemFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
var fontStacks = {
  Pixel: `PixeloidSans`,
  rounded: `SFRounded, ui-rounded, "SF Pro Rounded", ${systemFontStack}`,
  system: systemFontStack
};
var radiusScales = {
  large: {
    actionButton: "9999px",
    connectButton: "12px",
    modal: "24px",
    modalMobile: "28px"
  },
  medium: {
    actionButton: "10px",
    connectButton: "8px",
    modal: "16px",
    modalMobile: "18px"
  },
  none: {
    actionButton: "0px",
    connectButton: "0px",
    modal: "0px",
    modalMobile: "0px"
  },
  small: {
    actionButton: "4px",
    connectButton: "4px",
    modal: "8px",
    modalMobile: "8px"
  }
};
var blurs = {
  large: {
    modalOverlay: "blur(20px)"
  },
  none: {
    modalOverlay: "blur(0px)"
  },
  small: {
    modalOverlay: "blur(4px)"
  }
};
var baseTheme = ({
  borderRadius = "large",
  fontStack = "rounded",
  overlayBlur = "none"
}) => ({
  blurs: {
    modalOverlay: blurs[overlayBlur].modalOverlay
  },
  fonts: {
    body: fontStacks[fontStack]
  },
  radii: {
    actionButton: radiusScales[borderRadius].actionButton,
    connectButton: radiusScales[borderRadius].connectButton,
    menuButton: radiusScales[borderRadius].connectButton,
    modal: radiusScales[borderRadius].modal,
    modalMobile: radiusScales[borderRadius].modalMobile
  }
});

// src/rainbowkit/src/themes/lightTheme.ts
var accentColors = {
  blue: { accentColor: "#0E76FD", accentColorForeground: "#FFF" },
  green: { accentColor: "#1DB847", accentColorForeground: "#FFF" },
  orange: { accentColor: "#FF801F", accentColorForeground: "#FFF" },
  pink: { accentColor: "#FF5CA0", accentColorForeground: "#FFF" },
  purple: { accentColor: "#5F5AFA", accentColorForeground: "#FFF" },
  red: { accentColor: "#FA423C", accentColorForeground: "#FFF" }
};
var defaultAccentColor = accentColors.blue;
var lightTheme = ({
  accentColor = defaultAccentColor.accentColor,
  accentColorForeground = defaultAccentColor.accentColorForeground,
  ...baseThemeOptions
} = {}) => ({
  ...baseTheme(baseThemeOptions),
  colors: {
    accentColor,
    accentColorForeground,
    actionButtonBorder: "rgba(0, 0, 0, 0.04)",
    actionButtonBorderMobile: "rgba(0, 0, 0, 0.06)",
    actionButtonSecondaryBackground: "rgba(0, 0, 0, 0.06)",
    closeButton: "rgba(60, 66, 66, 0.8)",
    closeButtonBackground: "rgba(0, 0, 0, 0.06)",
    connectButtonBackground: "#FFF",
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground: "linear-gradient(0deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.06))",
    connectButtonText: "#25292E",
    connectButtonTextError: "#FFF",
    connectionIndicator: "#65EDBC",
    connectionIndicatorBorder: "#2a443a",
    downloadBottomCardBackground: "linear-gradient(126deg, rgba(255, 255, 255, 0) 9.49%, rgba(171, 171, 171, 0.04) 71.04%), #FFFFFF",
    downloadTopCardBackground: "linear-gradient(126deg, rgba(171, 171, 171, 0.2) 9.49%, rgba(255, 255, 255, 0) 71.04%), #FFFFFF",
    error: "#FF494A",
    generalBorder: "rgba(0, 0, 0, 0.06)",
    generalBorderDim: "rgba(0, 0, 0, 0.03)",
    menuItemBackground: "rgba(60, 66, 66, 0.1)",
    modalBackdrop: "rgba(0, 0, 0, 0.3)",
    modalBackground: "#FFF",
    modalBorder: "transparent",
    modalText: "#25292E",
    modalTextDim: "rgba(60, 66, 66, 0.3)",
    modalTextSecondary: "rgba(60, 66, 66, 0.6)",
    profileAction: "#FFF",
    profileActionHover: "rgba(255, 255, 255, 0.5)",
    profileForeground: "rgba(60, 66, 66, 0.06)",
    selectedOptionBorder: "rgba(60, 66, 66, 0.1)",
    standby: "#FFD641",
    standbyBorder: "#5c5847"
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.12)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)"
  }
});
lightTheme.accentColors = accentColors;

// src/rainbowkit/src/components/RainbowKitProvider/ShowRecentTransactionsContext.ts
import { createContext as createContext9 } from "react";
var ShowRecentTransactionsContext = createContext9(false);

// src/rainbowkit/src/components/RainbowKitProvider/useFingerprint.ts
import { useCallback as useCallback5, useEffect as useEffect15 } from "react";
var storageKey4 = "rk-version";
function setRainbowKitVersion({ version }) {
  localStorage.setItem(storageKey4, version);
}
function useFingerprint() {
  const fingerprint = useCallback5(() => {
    setRainbowKitVersion({ version: "__buildVersion" });
  }, []);
  useEffect15(() => {
    fingerprint();
  }, [fingerprint]);
}

// src/rainbowkit/src/components/RainbowKitProvider/usePreloadImages.ts
import { useCallback as useCallback7, useEffect as useEffect16 } from "react";

// src/rainbowkit/src/components/SignIn/SignIn.tsx
import React36, { useCallback as useCallback6, useRef as useRef4 } from "react";
import { UserRejectedRequestError } from "viem";
import { useAccount as useAccount5, useDisconnect, useNetwork as useNetwork2, useSignMessage } from "wagmi";
var signInIcon = async () => (await import("./sign-IOXJRZQV.js")).default;
function SignIn({ onClose }) {
  const [{ status, ...state }, setState] = React36.useState({ status: "idle" });
  const authAdapter = useAuthenticationAdapter();
  const getNonce = useCallback6(async () => {
    try {
      const nonce = await authAdapter.getNonce();
      setState((x) => ({ ...x, nonce }));
    } catch (error) {
      setState((x) => ({
        ...x,
        errorMessage: "Error preparing message, please retry!",
        status: "idle"
      }));
    }
  }, [authAdapter]);
  const onceRef = useRef4(false);
  React36.useEffect(() => {
    if (onceRef.current)
      return;
    onceRef.current = true;
    getNonce();
  }, [getNonce]);
  const mobile = isMobile();
  const { address } = useAccount5();
  const { chain: activeChain } = useNetwork2();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();
  const cancel = () => disconnect();
  const signIn = async () => {
    try {
      const chainId = activeChain == null ? void 0 : activeChain.id;
      const { nonce } = state;
      if (!address || !chainId || !nonce) {
        return;
      }
      setState((x) => ({
        ...x,
        errorMessage: void 0,
        status: "signing"
      }));
      const message = authAdapter.createMessage({ address, chainId, nonce });
      let signature;
      try {
        signature = await signMessageAsync({
          message: authAdapter.getMessageBody({ message })
        });
      } catch (error) {
        if (error instanceof UserRejectedRequestError) {
          return setState((x) => ({
            ...x,
            status: "idle"
          }));
        }
        return setState((x) => ({
          ...x,
          errorMessage: "Error signing message, please retry!",
          status: "idle"
        }));
      }
      setState((x) => ({ ...x, status: "verifying" }));
      try {
        const verified = await authAdapter.verify({ message, signature });
        if (verified) {
          return;
        } else {
          throw new Error();
        }
      } catch (error) {
        return setState((x) => ({
          ...x,
          errorMessage: "Error verifying signature, please retry!",
          status: "idle"
        }));
      }
    } catch (error) {
      setState({
        errorMessage: "Oops, something went wrong!",
        status: "idle"
      });
    }
  };
  return /* @__PURE__ */ React36.createElement(Box, {
    position: "relative"
  }, /* @__PURE__ */ React36.createElement(Box, {
    display: "flex",
    paddingRight: "16",
    paddingTop: "16",
    position: "absolute",
    right: "0"
  }, /* @__PURE__ */ React36.createElement(DialogClose_default, {
    onClick: onClose
  })), /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "32" : "24",
    padding: "24",
    paddingX: "18",
    style: { paddingTop: mobile ? "60px" : "36px" }
  }, /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "6" : "4",
    style: { maxWidth: mobile ? 320 : 280 }
  }, /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "32" : "16"
  }, /* @__PURE__ */ React36.createElement(AsyncImage, {
    height: 40,
    src: signInIcon,
    width: 40
  }), /* @__PURE__ */ React36.createElement(Text, {
    color: "modalText",
    size: mobile ? "20" : "18",
    textAlign: "center",
    weight: "heavy"
  }, "Verify your account")), /* @__PURE__ */ React36.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "16" : "12"
  }, /* @__PURE__ */ React36.createElement(Text, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    textAlign: "center"
  }, "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account."), status === "idle" && state.errorMessage ? /* @__PURE__ */ React36.createElement(Text, {
    color: "error",
    size: mobile ? "16" : "14",
    textAlign: "center",
    weight: "bold"
  }, state.errorMessage) : null)), /* @__PURE__ */ React36.createElement(Box, {
    alignItems: !mobile ? "center" : void 0,
    display: "flex",
    flexDirection: "column",
    gap: "8",
    width: "full"
  }, /* @__PURE__ */ React36.createElement(ActionButton, {
    disabled: !state.nonce || status === "signing" || status === "verifying",
    label: !state.nonce ? "Preparing message..." : status === "signing" ? "Waiting for signature..." : status === "verifying" ? "Verifying signature..." : "Send message",
    onClick: signIn,
    size: mobile ? "large" : "medium",
    testId: "auth-message-button"
  }), mobile ? /* @__PURE__ */ React36.createElement(ActionButton, {
    label: "Cancel",
    onClick: cancel,
    size: "large",
    type: "secondary"
  }) : /* @__PURE__ */ React36.createElement(Box, {
    as: "button",
    borderRadius: "full",
    className: touchableStyles({ active: "shrink", hover: "grow" }),
    display: "block",
    onClick: cancel,
    paddingX: "10",
    paddingY: "5",
    rel: "noreferrer",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default"
  }, /* @__PURE__ */ React36.createElement(Text, {
    color: "closeButton",
    size: mobile ? "16" : "14",
    weight: "bold"
  }, "Cancel")))));
}

// src/rainbowkit/src/components/RainbowKitProvider/usePreloadImages.ts
function usePreloadImages() {
  const rainbowKitChains = useRainbowKitChains();
  const walletConnectors = useWalletConnectors();
  const isUnauthenticated = useAuthenticationStatus() === "unauthenticated";
  const preloadImages = useCallback7(() => {
    loadImages(...walletConnectors.map((wallet) => wallet.iconUrl), ...rainbowKitChains.map((chain) => chain.iconUrl).filter(isNotNullish));
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }
    if (isUnauthenticated) {
      loadImages(signInIcon);
    }
  }, [walletConnectors, rainbowKitChains, isUnauthenticated]);
  useEffect16(() => {
    preloadImages();
  }, [preloadImages]);
}

// src/rainbowkit/src/components/RainbowKitProvider/RainbowKitProvider.tsx
var ThemeIdContext = createContext10(void 0);
var attr = "data-rk";
var createThemeRootProps = (id) => ({ [attr]: id || "" });
var createThemeRootSelector = (id) => {
  if (id && !/^[a-zA-Z0-9_]+$/.test(id)) {
    throw new Error(`Invalid ID: ${id}`);
  }
  return id ? `[${attr}="${id}"]` : `[${attr}]`;
};
var useThemeRootProps = () => {
  const id = useContext11(ThemeIdContext);
  return createThemeRootProps(id);
};
var defaultTheme = lightTheme();
function RainbowKitProvider({
  appInfo: appInfo2,
  avatar,
  chains,
  children,
  coolMode = false,
  id,
  initialChain,
  modalSize = ModalSizeOptions.WIDE,
  showRecentTransactions = false,
  theme = defaultTheme
}) {
  usePreloadImages();
  useFingerprint();
  useAccount6({ onDisconnect: clearWalletConnectDeepLink });
  if (typeof theme === "function") {
    throw new Error(
      'A theme function was provided to the "theme" prop instead of a theme object. You must execute this function to get the resulting theme object.'
    );
  }
  const selector2 = createThemeRootSelector(id);
  const appContext = {
    ...defaultAppInfo,
    ...appInfo2
  };
  const avatarContext = avatar != null ? avatar : defaultAvatar;
  const { width } = useWindowSize2();
  const isSmallScreen = width && width < largeScreenMinWidth;
  return /* @__PURE__ */ React37.createElement(RainbowKitChainProvider, {
    chains,
    initialChain
  }, /* @__PURE__ */ React37.createElement(CoolModeContext.Provider, {
    value: coolMode
  }, /* @__PURE__ */ React37.createElement(ModalSizeContext.Provider, {
    value: isSmallScreen ? ModalSizeOptions.COMPACT : modalSize
  }, /* @__PURE__ */ React37.createElement(ShowRecentTransactionsContext.Provider, {
    value: showRecentTransactions
  }, /* @__PURE__ */ React37.createElement(TransactionStoreProvider, null, /* @__PURE__ */ React37.createElement(AvatarContext.Provider, {
    value: avatarContext
  }, /* @__PURE__ */ React37.createElement(AppContext.Provider, {
    value: appContext
  }, /* @__PURE__ */ React37.createElement(ThemeIdContext.Provider, {
    value: id
  }, /* @__PURE__ */ React37.createElement(ModalProvider, null, theme ? /* @__PURE__ */ React37.createElement("div", {
    ...createThemeRootProps(id)
  }, /* @__PURE__ */ React37.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: [
        `${selector2}{${cssStringFromTheme("lightMode" in theme ? theme.lightMode : theme)}}`,
        "darkMode" in theme ? `@media(prefers-color-scheme:dark){${selector2}{${cssStringFromTheme(theme.darkMode, {
          extends: theme.lightMode
        })}}}` : null
      ].join("")
    }
  }), children) : children)))))))));
}

// src/rainbowkit/src/components/Dialog/Dialog.css.ts
import { keyframes as keyframes2, style as style8 } from "@vanilla-extract/css";
var slideUp = keyframes2({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0)" }
});
var fadeIn = keyframes2({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 }
});
var nestedModalZIndexes = {
  coinbase: 2147483647,
  walletConnect: 99999999999999
};
var bleed2 = 200;
var overlay = style8([
  sprinkles({
    backdropFilter: "modalOverlay",
    background: "modalBackdrop",
    display: "flex",
    justifyContent: "center",
    position: "fixed"
  }),
  {
    animation: `${fadeIn} 150ms ease`,
    bottom: -bleed2,
    left: -bleed2,
    padding: bleed2,
    right: -bleed2,
    top: -bleed2,
    transform: "translateZ(0)",
    zIndex: Math.min(...Object.values(nestedModalZIndexes)) - 1
  }
]);
var content = style8([
  sprinkles({
    display: "flex",
    flexDirection: "column",
    position: "relative"
  }),
  {
    animation: `${slideUp} 350ms cubic-bezier(.15,1.15,0.6,1.00), ${fadeIn} 150ms ease`,
    maxWidth: "100vw"
  }
]);

// src/rainbowkit/src/components/Dialog/FocusTrap.tsx
import React38, { useCallback as useCallback8, useEffect as useEffect17, useRef as useRef5 } from "react";
var moveFocusWithin = (element2, position) => {
  const focusableElements = element2.querySelectorAll(
    "button:not(:disabled), a[href]"
  );
  if (focusableElements.length === 0)
    return;
  focusableElements[position === "end" ? focusableElements.length - 1 : 0].focus();
};
function FocusTrap(props) {
  const contentRef = useRef5(null);
  useEffect17(() => {
    const previouslyActiveElement = document.activeElement;
    return () => {
      var _a;
      (_a = previouslyActiveElement.focus) == null ? void 0 : _a.call(previouslyActiveElement);
    };
  }, []);
  useEffect17(() => {
    if (contentRef.current) {
      const elementToFocus = contentRef.current.querySelector("[data-auto-focus]");
      if (elementToFocus) {
        elementToFocus.focus();
      } else {
        contentRef.current.focus();
      }
    }
  }, [contentRef]);
  return /* @__PURE__ */ React38.createElement(React38.Fragment, null, /* @__PURE__ */ React38.createElement("div", {
    onFocus: useCallback8(
      () => contentRef.current && moveFocusWithin(contentRef.current, "end"),
      []
    ),
    tabIndex: 0
  }), /* @__PURE__ */ React38.createElement("div", {
    ref: contentRef,
    style: { outline: "none" },
    tabIndex: -1,
    ...props
  }), /* @__PURE__ */ React38.createElement("div", {
    onFocus: useCallback8(
      () => contentRef.current && moveFocusWithin(contentRef.current, "start"),
      []
    ),
    tabIndex: 0
  }));
}

// src/rainbowkit/src/components/Dialog/Dialog.tsx
var stopPropagation = (event) => event.stopPropagation();
function Dialog({ children, onClose, open, titleId }) {
  useEffect18(() => {
    const handleEscape = (event) => open && event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);
  const [bodyScrollable, setBodyScrollable] = useState12(true);
  useEffect18(() => {
    setBodyScrollable(getComputedStyle(window.document.body).overflow !== "hidden");
  }, []);
  const handleBackdropClick = useCallback9(() => onClose(), [onClose]);
  const themeRootProps = useThemeRootProps();
  const mobile = isMobile();
  return /* @__PURE__ */ React39.createElement(React39.Fragment, null, open ? createPortal(
    /* @__PURE__ */ React39.createElement(RemoveScroll, {
      enabled: bodyScrollable
    }, /* @__PURE__ */ React39.createElement(Box, {
      ...themeRootProps
    }, /* @__PURE__ */ React39.createElement(Box, {
      ...themeRootProps,
      alignItems: mobile ? "flex-end" : "center",
      "aria-labelledby": titleId,
      "aria-modal": true,
      className: overlay,
      onClick: handleBackdropClick,
      position: "fixed",
      role: "dialog"
    }, /* @__PURE__ */ React39.createElement(FocusTrap, {
      className: content,
      onClick: stopPropagation,
      role: "document"
    }, children)))),
    document.body
  ) : null);
}

// src/rainbowkit/src/components/Dialog/DialogContent.tsx
import React40, { useContext as useContext12 } from "react";
function DialogContent({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = "16",
  wide = false
}) {
  const mobile = isMobile();
  const modalSize = useContext12(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  return /* @__PURE__ */ React40.createElement(Box, {
    marginTop
  }, /* @__PURE__ */ React40.createElement(PixelBorderCard, {
    className: [
      wide ? mobile ? dialogContentWideMobile : compactModeEnabled ? dialogContentCompactMode : dialogContentWideDesktop : dialogContent,
      mobile ? dialogContentMobile : null,
      mobile && bottomSheetOnMobile ? bottomSheetOverrides : null
    ].join(" "),
    pixel_height: 10,
    backgroundColor: "#1D263B"
  }, /* @__PURE__ */ React40.createElement(Box, {
    padding,
    width: "full"
  }, children)));
}

// src/rainbowkit/src/components/ProfileDetails/ProfileDetails.tsx
import React50, { useCallback as useCallback11, useContext as useContext14, useEffect as useEffect19, useState as useState13 } from "react";

// src/rainbowkit/src/components/ConnectButton/abbreviateETHBalance.ts
var units = ["k", "m", "b", "t"];
function toPrecision(number, precision = 1) {
  return number.toString().replace(new RegExp(`(.+\\.\\d{${precision}})\\d+`), "$1").replace(/(\.[1-9]*)0+$/, "$1").replace(/\.$/, "");
}
function abbreviateETHBalance(number) {
  if (number < 1)
    return toPrecision(number, 3);
  if (number < 10 ** 2)
    return toPrecision(number, 2);
  if (number < 10 ** 4)
    return new Intl.NumberFormat().format(parseFloat(toPrecision(number, 1)));
  const decimalsDivisor = 10 ** 1;
  let result = String(number);
  for (let i = units.length - 1; i >= 0; i--) {
    const size = 10 ** ((i + 1) * 3);
    if (size <= number) {
      number = number * decimalsDivisor / size / decimalsDivisor;
      result = toPrecision(number, 1) + units[i];
      break;
    }
  }
  return result;
}

// src/rainbowkit/src/components/ConnectButton/formatAddress.ts
function formatAddress(address) {
  const leadingChars = 4;
  const trailingChars = 4;
  return address.length < leadingChars + trailingChars ? address : `${address.substring(0, leadingChars)}\u2026${address.substring(
    address.length - trailingChars
  )}`;
}

// src/rainbowkit/src/components/ConnectButton/formatENS.ts
function formatENS(name) {
  const parts = name.split(".");
  const last = parts.pop();
  if (parts.join(".").length > 24) {
    return `${parts.join(".").substring(0, 24)}...`;
  }
  return `${parts.join(".")}.${last}`;
}

// src/rainbowkit/src/components/Icons/Copied.tsx
import React41 from "react";
var CopiedIcon = () => /* @__PURE__ */ React41.createElement("svg", {
  fill: "none",
  height: "13",
  viewBox: "0 0 13 13",
  width: "13",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React41.createElement("path", {
  d: "M4.94568 12.2646C5.41052 12.2646 5.77283 12.0869 6.01892 11.7109L12.39 1.96973C12.5677 1.69629 12.6429 1.44336 12.6429 1.2041C12.6429 0.561523 12.1644 0.0966797 11.5082 0.0966797C11.057 0.0966797 10.7767 0.260742 10.5033 0.691406L4.9115 9.50977L2.07458 5.98926C1.82166 5.68848 1.54822 5.55176 1.16541 5.55176C0.502319 5.55176 0.0238037 6.02344 0.0238037 6.66602C0.0238037 6.95312 0.112671 7.20605 0.358765 7.48633L3.88611 11.7588C4.18005 12.1074 4.50818 12.2646 4.94568 12.2646Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Icons/Copy.tsx
import React42 from "react";
var CopyIcon = () => /* @__PURE__ */ React42.createElement("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 17 16",
  width: "17",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React42.createElement("path", {
  d: "M3.04236 12.3027H4.18396V13.3008C4.18396 14.8525 5.03845 15.7002 6.59705 15.7002H13.6244C15.183 15.7002 16.0375 14.8525 16.0375 13.3008V6.24609C16.0375 4.69434 15.183 3.84668 13.6244 3.84668H12.4828V2.8418C12.4828 1.29688 11.6283 0.442383 10.0697 0.442383H3.04236C1.48376 0.442383 0.629272 1.29004 0.629272 2.8418V9.90332C0.629272 11.4551 1.48376 12.3027 3.04236 12.3027ZM3.23376 10.5391C2.68689 10.5391 2.39294 10.2656 2.39294 9.68457V3.06055C2.39294 2.47949 2.68689 2.21289 3.23376 2.21289H9.8783C10.4252 2.21289 10.7191 2.47949 10.7191 3.06055V3.84668H6.59705C5.03845 3.84668 4.18396 4.69434 4.18396 6.24609V10.5391H3.23376ZM6.78845 13.9365C6.24158 13.9365 5.94763 13.6699 5.94763 13.0889V6.45801C5.94763 5.87695 6.24158 5.61035 6.78845 5.61035H13.433C13.9799 5.61035 14.2738 5.87695 14.2738 6.45801V13.0889C14.2738 13.6699 13.9799 13.9365 13.433 13.9365H6.78845Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Icons/Disconnect.tsx
import React43 from "react";
var DisconnectIcon = () => /* @__PURE__ */ React43.createElement("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 18 16",
  width: "18",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React43.createElement("path", {
  d: "M2.67834 15.5908H9.99963C11.5514 15.5908 12.399 14.7432 12.399 13.1777V10.2656H10.6354V12.9863C10.6354 13.5332 10.3688 13.8271 9.78772 13.8271H2.89026C2.3092 13.8271 2.0426 13.5332 2.0426 12.9863V3.15625C2.0426 2.60254 2.3092 2.30859 2.89026 2.30859H9.78772C10.3688 2.30859 10.6354 2.60254 10.6354 3.15625V5.89746H12.399V2.95801C12.399 1.39941 11.5514 0.544922 9.99963 0.544922H2.67834C1.12659 0.544922 0.278931 1.39941 0.278931 2.95801V13.1777C0.278931 14.7432 1.12659 15.5908 2.67834 15.5908ZM7.43616 8.85059H14.0875L15.0924 8.78906L14.566 9.14453L13.6842 9.96484C13.5406 10.1016 13.4586 10.2861 13.4586 10.4844C13.4586 10.8398 13.7321 11.168 14.1217 11.168C14.3199 11.168 14.4635 11.0928 14.6002 10.9561L16.7809 8.68652C16.986 8.48145 17.0543 8.27637 17.0543 8.06445C17.0543 7.85254 16.986 7.64746 16.7809 7.43555L14.6002 5.17285C14.4635 5.03613 14.3199 4.9541 14.1217 4.9541C13.7321 4.9541 13.4586 5.27539 13.4586 5.6377C13.4586 5.83594 13.5406 6.02734 13.6842 6.15723L14.566 6.98438L15.0924 7.33984L14.0875 7.27148H7.43616C7.01917 7.27148 6.65686 7.62012 6.65686 8.06445C6.65686 8.50195 7.01917 8.85059 7.43616 8.85059Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Txs/TxList.tsx
import React48, { useContext as useContext13 } from "react";
import { useNetwork as useNetwork4 } from "wagmi";

// src/rainbowkit/src/transactions/useClearRecentTransactions.ts
import { useCallback as useCallback10 } from "react";
import { useAccount as useAccount7 } from "wagmi";
function useClearRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount7();
  const chainId = useChainId();
  return useCallback10(() => {
    if (!address || !chainId) {
      throw new Error("No address or chain ID found");
    }
    store.clearTransactions(address, chainId);
  }, [store, address, chainId]);
}

// src/rainbowkit/src/utils/chainToExplorerUrl.ts
var chainToExplorerUrl = (chain) => {
  var _a, _b;
  return (_b = (_a = chain == null ? void 0 : chain.blockExplorers) == null ? void 0 : _a.default) == null ? void 0 : _b.url;
};

// src/rainbowkit/src/components/Icons/ExternalLink.tsx
import React44 from "react";
var ExternalLinkIcon = () => /* @__PURE__ */ React44.createElement("svg", {
  fill: "none",
  height: "19",
  viewBox: "0 0 20 19",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React44.createElement("path", {
  d: "M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM12.7158 12.1416C13.2432 12.1416 13.5684 11.7549 13.5684 11.1836V7.19336C13.5684 6.44629 13.1377 6.05957 12.417 6.05957H8.40918C7.8291 6.05957 7.45117 6.38477 7.45117 6.91211C7.45117 7.43945 7.8291 7.77344 8.40918 7.77344H9.69238L10.7207 7.63281L9.53418 8.67871L6.73047 11.4912C6.53711 11.6758 6.41406 11.9395 6.41406 12.2031C6.41406 12.7832 6.85352 13.1699 7.39844 13.1699C7.68848 13.1699 7.92578 13.0732 8.1543 12.8623L10.9316 10.0762L11.9775 8.89844L11.8545 9.98828V11.1836C11.8545 11.7725 12.1885 12.1416 12.7158 12.1416Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Txs/TxItem.tsx
import React47 from "react";
import { useNetwork as useNetwork3 } from "wagmi";

// src/rainbowkit/src/components/Icons/Cancel.tsx
import React45 from "react";
var CancelIcon = () => /* @__PURE__ */ React45.createElement("svg", {
  fill: "none",
  height: "19",
  viewBox: "0 0 20 19",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React45.createElement("path", {
  d: "M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM7.29297 13.3018C7.58301 13.3018 7.81152 13.2139 7.99609 13.0205L10 11.0166L12.0127 13.0205C12.1973 13.2051 12.4258 13.3018 12.707 13.3018C13.2432 13.3018 13.6562 12.8887 13.6562 12.3525C13.6562 12.0977 13.5508 11.8691 13.3662 11.6934L11.3535 9.67188L13.375 7.6416C13.5596 7.44824 13.6562 7.22852 13.6562 6.98242C13.6562 6.44629 13.2432 6.0332 12.7158 6.0332C12.4346 6.0332 12.2148 6.12109 12.0215 6.31445L10 8.32715L7.9873 6.32324C7.80273 6.12988 7.58301 6.04199 7.29297 6.04199C6.76562 6.04199 6.35254 6.45508 6.35254 6.99121C6.35254 7.2373 6.44922 7.46582 6.63379 7.6416L8.65527 9.67188L6.63379 11.6934C6.44922 11.8691 6.35254 12.1064 6.35254 12.3525C6.35254 12.8887 6.76562 13.3018 7.29297 13.3018Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Icons/Success.tsx
import React46 from "react";
var SuccessIcon = () => /* @__PURE__ */ React46.createElement("svg", {
  fill: "none",
  height: "20",
  viewBox: "0 0 20 20",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React46.createElement("path", {
  d: "M10 19.4443C15.0977 19.4443 19.2812 15.252 19.2812 10.1543C19.2812 5.06543 15.0889 0.873047 10 0.873047C4.90234 0.873047 0.71875 5.06543 0.71875 10.1543C0.71875 15.252 4.91113 19.4443 10 19.4443ZM10 17.1328C6.1416 17.1328 3.03906 14.0215 3.03906 10.1543C3.03906 6.2959 6.13281 3.18457 10 3.18457C13.8584 3.18457 16.9697 6.2959 16.9697 10.1543C16.9785 14.0215 13.8672 17.1328 10 17.1328ZM9.07715 14.3379C9.4375 14.3379 9.7627 14.1533 9.97363 13.8369L13.7441 8.00977C13.8848 7.79883 13.9814 7.5791 13.9814 7.36816C13.9814 6.84961 13.5244 6.48926 13.0322 6.48926C12.707 6.48926 12.4258 6.66504 12.2148 7.0166L9.05957 12.0967L7.5918 10.2949C7.37207 10.0225 7.13477 9.9082 6.84473 9.9082C6.33496 9.9082 5.92188 10.3125 5.92188 10.8223C5.92188 11.0684 6.00098 11.2793 6.18555 11.5078L8.1543 13.8545C8.40918 14.1709 8.70801 14.3379 9.07715 14.3379Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Txs/TxItem.tsx
var getTxStatusIcon = (status) => {
  switch (status) {
    case "pending":
      return SpinnerIcon;
    case "confirmed":
      return SuccessIcon;
    case "failed":
      return CancelIcon;
    default:
      return SpinnerIcon;
  }
};
function TxItem({ tx }) {
  const mobile = isMobile();
  const Icon2 = getTxStatusIcon(tx.status);
  const color = tx.status === "failed" ? "error" : "accentColor";
  const { chain: activeChain } = useNetwork3();
  const confirmationStatus = tx.status === "confirmed" ? "Confirmed" : tx.status === "failed" ? "Failed" : "Pending";
  const explorerLink = chainToExplorerUrl(activeChain);
  return /* @__PURE__ */ React47.createElement(React47.Fragment, null, /* @__PURE__ */ React47.createElement(Box, {
    ...explorerLink ? {
      as: "a",
      background: { hover: "profileForeground" },
      borderRadius: "menuButton",
      className: touchableStyles({ active: "shrink" }),
      href: `${explorerLink}/tx/${tx.hash}`,
      rel: "noreferrer noopener",
      target: "_blank",
      transition: "default"
    } : {},
    color: "modalText",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "8",
    width: "full"
  }, /* @__PURE__ */ React47.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: mobile ? "16" : "14"
  }, /* @__PURE__ */ React47.createElement(Box, {
    color
  }, /* @__PURE__ */ React47.createElement(Icon2, null)), /* @__PURE__ */ React47.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "3" : "1"
  }, /* @__PURE__ */ React47.createElement(Box, null, /* @__PURE__ */ React47.createElement(Text, {
    color: "modalText",
    font: "body",
    size: mobile ? "16" : "14",
    weight: "bold"
  }, tx == null ? void 0 : tx.description)), /* @__PURE__ */ React47.createElement(Box, null, /* @__PURE__ */ React47.createElement(Text, {
    color: tx.status === "pending" ? "modalTextSecondary" : color,
    font: "body",
    size: "14",
    weight: mobile ? "medium" : "regular"
  }, confirmationStatus)))), explorerLink && /* @__PURE__ */ React47.createElement(Box, {
    alignItems: "center",
    color: "modalTextDim",
    display: "flex"
  }, /* @__PURE__ */ React47.createElement(ExternalLinkIcon, null))));
}

// src/rainbowkit/src/components/Txs/TxList.tsx
var NUMBER_OF_VISIBLE_TXS = 3;
function TxList({ address }) {
  const recentTransactions = useRecentTransactions();
  const clearRecentTransactions = useClearRecentTransactions();
  const { chain: activeChain } = useNetwork4();
  const explorerLink = chainToExplorerUrl(activeChain);
  const visibleTxs = recentTransactions.slice(0, NUMBER_OF_VISIBLE_TXS);
  const hasTransactions = visibleTxs.length > 0;
  const mobile = isMobile();
  const { appName } = useContext13(AppContext);
  return /* @__PURE__ */ React48.createElement(React48.Fragment, null, /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "10",
    paddingBottom: "2",
    paddingTop: "16",
    paddingX: mobile ? "8" : "18"
  }, hasTransactions && /* @__PURE__ */ React48.createElement(Box, {
    paddingBottom: mobile ? "4" : "0",
    paddingTop: "8",
    paddingX: mobile ? "12" : "6"
  }, /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, "Recent Transactions"), /* @__PURE__ */ React48.createElement(Box, {
    style: {
      marginBottom: -6,
      marginLeft: -10,
      marginRight: -10,
      marginTop: -6
    }
  }, /* @__PURE__ */ React48.createElement(Box, {
    as: "button",
    background: {
      hover: "profileForeground"
    },
    borderRadius: "actionButton",
    className: touchableStyles({ active: "shrink" }),
    onClick: clearRecentTransactions,
    paddingX: mobile ? "8" : "12",
    paddingY: mobile ? "4" : "5",
    transition: "default",
    type: "button"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, "Clear All"))))), /* @__PURE__ */ React48.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, hasTransactions ? visibleTxs.map((tx) => /* @__PURE__ */ React48.createElement(TxItem, {
    key: tx.hash,
    tx
  })) : /* @__PURE__ */ React48.createElement(React48.Fragment, null, /* @__PURE__ */ React48.createElement(Box, {
    padding: mobile ? "12" : "8"
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalTextDim",
    size: mobile ? "16" : "14",
    weight: mobile ? "medium" : "bold"
  }, appName != null ? appName : "Your", " transactions will appear here...")), mobile && /* @__PURE__ */ React48.createElement(Box, {
    background: "generalBorderDim",
    height: "1",
    marginX: "12",
    marginY: "8"
  })))), explorerLink && /* @__PURE__ */ React48.createElement(Box, {
    paddingBottom: "18",
    paddingX: mobile ? "8" : "18"
  }, /* @__PURE__ */ React48.createElement(Box, {
    alignItems: "center",
    as: "a",
    background: { hover: "profileForeground" },
    borderRadius: "menuButton",
    className: touchableStyles({ active: "shrink" }),
    color: "modalTextDim",
    display: "flex",
    flexDirection: "row",
    href: `${explorerLink}/address/${address}`,
    justifyContent: "space-between",
    paddingX: "8",
    paddingY: "12",
    rel: "noreferrer noopener",
    style: { willChange: "transform" },
    target: "_blank",
    transition: "default",
    width: "full",
    ...mobile ? { paddingLeft: "12" } : {}
  }, /* @__PURE__ */ React48.createElement(Text, {
    color: "modalText",
    font: "body",
    size: mobile ? "16" : "14",
    weight: mobile ? "semibold" : "bold"
  }, "View more on Explorer"), /* @__PURE__ */ React48.createElement(ExternalLinkIcon, null))));
}

// src/rainbowkit/src/components/ProfileDetails/ProfileDetailsAction.tsx
import React49 from "react";
function ProfileDetailsAction({
  action,
  icon,
  label,
  testId,
  url
}) {
  const mobile = isMobile();
  return /* @__PURE__ */ React49.createElement(Box, {
    ...url ? { as: "a", href: url, rel: "noreferrer noopener", target: "_blank" } : { as: "button", type: "button" },
    background: {
      base: "profileAction",
      ...!mobile ? { hover: "profileActionHover" } : {}
    },
    borderRadius: "menuButton",
    boxShadow: "profileDetailsAction",
    className: touchableStyles({
      active: "shrinkSm",
      hover: !mobile ? "grow" : void 0
    }),
    display: "flex",
    onClick: action,
    padding: mobile ? "6" : "8",
    style: { willChange: "transform" },
    testId,
    transition: "default",
    width: "full"
  }, /* @__PURE__ */ React49.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1",
    justifyContent: "center",
    paddingTop: "2",
    width: "full"
  }, /* @__PURE__ */ React49.createElement(Box, {
    color: "modalText",
    height: "max"
  }, icon), /* @__PURE__ */ React49.createElement(Box, null, /* @__PURE__ */ React49.createElement(Text, {
    color: "modalText",
    size: mobile ? "12" : "13",
    weight: "semibold"
  }, label))));
}

// src/rainbowkit/src/components/ProfileDetails/ProfileDetails.tsx
function ProfileDetails({
  address,
  balanceData,
  ensAvatar,
  ensName,
  onClose,
  onDisconnect
}) {
  const showRecentTransactions = useContext14(ShowRecentTransactionsContext);
  const [copiedAddress, setCopiedAddress] = useState13(false);
  const copyAddressAction = useCallback11(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
    }
  }, [address]);
  useEffect19(() => {
    if (copiedAddress) {
      const timer = setTimeout(() => {
        setCopiedAddress(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [copiedAddress]);
  const accountName = !address ? "" : ensName ? formatENS(ensName) : formatAddress(address);
  const ethBalance = balanceData == null ? void 0 : balanceData.formatted;
  const displayBalance = ethBalance ? abbreviateETHBalance(parseFloat(ethBalance)) : void 0;
  const titleId = "rk_profile_title";
  const mobile = isMobile();
  if (!address) {
    return null;
  }
  return /* @__PURE__ */ React50.createElement(React50.Fragment, null, /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    flexDirection: "column"
  }, /* @__PURE__ */ React50.createElement(Box, {
    background: "profileForeground",
    padding: "16"
  }, /* @__PURE__ */ React50.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "16" : "12",
    justifyContent: "center",
    margin: "8",
    style: { textAlign: "center" }
  }, /* @__PURE__ */ React50.createElement(Box, {
    style: {
      position: "absolute",
      right: 16,
      top: 16,
      willChange: "transform"
    }
  }, /* @__PURE__ */ React50.createElement(DialogClose_default, {
    onClick: onClose
  })), /* @__PURE__ */ React50.createElement(Box, {
    marginTop: mobile ? "24" : "0"
  }, /* @__PURE__ */ React50.createElement(Avatar, {
    address,
    imageUrl: ensAvatar,
    size: mobile ? 82 : 74
  })), /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "4" : "0",
    textAlign: "center"
  }, /* @__PURE__ */ React50.createElement(Box, {
    textAlign: "center"
  }, /* @__PURE__ */ React50.createElement(Text, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: mobile ? "20" : "18",
    weight: "heavy"
  }, accountName)), balanceData && /* @__PURE__ */ React50.createElement(Box, {
    textAlign: "center"
  }, /* @__PURE__ */ React50.createElement(Text, {
    as: "h1",
    color: "modalTextSecondary",
    id: titleId,
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, displayBalance, " ", balanceData.symbol)))), /* @__PURE__ */ React50.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    gap: "8",
    margin: "2",
    marginTop: "16"
  }, /* @__PURE__ */ React50.createElement(ProfileDetailsAction, {
    action: copyAddressAction,
    icon: copiedAddress ? /* @__PURE__ */ React50.createElement(CopiedIcon, null) : /* @__PURE__ */ React50.createElement(CopyIcon, null),
    label: copiedAddress ? "Copied!" : "Copy Address"
  }), /* @__PURE__ */ React50.createElement(ProfileDetailsAction, {
    action: onDisconnect,
    icon: /* @__PURE__ */ React50.createElement(DisconnectIcon, null),
    label: "Disconnect",
    testId: "disconnect-button"
  }))), showRecentTransactions && /* @__PURE__ */ React50.createElement(React50.Fragment, null, /* @__PURE__ */ React50.createElement(Box, {
    background: "generalBorder",
    height: "1",
    marginTop: "-1"
  }), /* @__PURE__ */ React50.createElement(Box, null, /* @__PURE__ */ React50.createElement(TxList, {
    address
  })))));
}

// src/rainbowkit/src/components/AccountModal/AccountModal.tsx
function AccountModal({ onClose, open }) {
  const { address } = useAccount9();
  const { data: balanceData } = useBalance({ address });
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { disconnect } = useDisconnect2();
  const titleId = "rk_account_modal_title";
  if (!address) {
    return null;
  }
  return /* @__PURE__ */ React51.createElement(React51.Fragment, null, address && /* @__PURE__ */ React51.createElement(Dialog, {
    onClose,
    open,
    titleId
  }, /* @__PURE__ */ React51.createElement(DialogContent, {
    bottomSheetOnMobile: true,
    padding: "0"
  }, /* @__PURE__ */ React51.createElement(ProfileDetails, {
    address,
    balanceData,
    ensAvatar,
    ensName,
    onClose,
    onDisconnect: disconnect
  }))));
}

// src/rainbowkit/src/components/ChainModal/ChainModal.tsx
import React54, { Fragment as Fragment2, useCallback as useCallback12, useContext as useContext15 } from "react";
import { useDisconnect as useDisconnect3, useNetwork as useNetwork5, useSwitchNetwork } from "wagmi";

// src/rainbowkit/src/components/Icons/DisconnectSq.tsx
import React52 from "react";
var DisconnectSqIcon = ({ size }) => /* @__PURE__ */ React52.createElement("svg", {
  fill: "none",
  height: size,
  viewBox: "0 0 28 28",
  width: size,
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React52.createElement("path", {
  d: "M6.742 22.195h8.367c1.774 0 2.743-.968 2.743-2.758V16.11h-2.016v3.11c0 .625-.305.96-.969.96H6.984c-.664 0-.968-.335-.968-.96V7.984c0-.632.304-.968.968-.968h7.883c.664 0 .969.336.969.968v3.133h2.016v-3.36c0-1.78-.97-2.757-2.743-2.757H6.742C4.97 5 4 5.977 4 7.758v11.68c0 1.789.969 2.757 2.742 2.757Zm5.438-7.703h7.601l1.149-.07-.602.406-1.008.938a.816.816 0 0 0-.258.593c0 .407.313.782.758.782.227 0 .39-.086.547-.243l2.492-2.593c.235-.235.313-.47.313-.711 0-.242-.078-.477-.313-.719l-2.492-2.586c-.156-.156-.32-.25-.547-.25-.445 0-.758.367-.758.781 0 .227.094.446.258.594l1.008.945.602.407-1.149-.079H12.18a.904.904 0 0 0 0 1.805Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/MenuButton/MenuButton.tsx
import React53 from "react";

// src/rainbowkit/src/components/MenuButton/MenuButton.css.ts
import { style as style9 } from "@vanilla-extract/css";
var unsetBackgroundOnHover = style9({
  ":hover": {
    background: "unset"
  }
});

// src/rainbowkit/src/components/MenuButton/MenuButton.tsx
var MenuButton = React53.forwardRef(
  ({
    children,
    currentlySelected = false,
    onClick,
    testId,
    disabled,
    ...urlProps
  }, ref) => {
    const mobile = isMobile();
    return /* @__PURE__ */ React53.createElement(Box, {
      as: "button",
      borderRadius: "menuButton",
      disabled: disabled != null ? disabled : false,
      display: "flex",
      ref,
      testId,
      type: "button",
      marginLeft: "20",
      marginRight: "20",
      marginTop: "8",
      marginBottom: "8",
      onClick
    }, /* @__PURE__ */ React53.createElement(PixelCube3, {
      pixel_height: 3,
      backgroundColor: `${currentlySelected ? "#343C4F" : "#1D263B"}`,
      borderColor: `${currentlySelected ? "#1649FF" : "#3A4254"}`,
      showHover: true,
      width: "100%"
    }, /* @__PURE__ */ React53.createElement(Box, {
      className: [
        mobile ? unsetBackgroundOnHover : void 0,
        !currentlySelected && touchableStyles({ active: "shrink" })
      ],
      transition: "default",
      width: "full",
      padding: "16",
      ...currentlySelected ? {
        color: "accentColorForeground"
      } : {
        color: "modalText"
      },
      ...urlProps
    }, children)));
  }
);
MenuButton.displayName = "MenuButton";

// src/rainbowkit/src/components/ChainModal/ChainModal.tsx
function ChainModal({ onClose, open, fn }) {
  var _a;
  const { chain: activeChain } = useNetwork5();
  const { chains, pendingChainId, reset, switchNetwork } = useSwitchNetwork({
    onSettled: () => {
      reset();
      onClose();
    }
  });
  const { disconnect } = useDisconnect3();
  const titleId = "rk_chain_modal_title";
  const mobile = isMobile();
  const unsupportedChain = (_a = activeChain == null ? void 0 : activeChain.unsupported) != null ? _a : false;
  const chainIconSize = "24";
  const { appName } = useContext15(AppContext);
  const rainbowkitChains = useRainbowKitChains();
  const chainClickHandle = useCallback12(
    ({ isCurrentChain, chain }) => {
      if (isCurrentChain) {
        return;
      } else {
        switchNetwork ? switchNetwork(chain.id) : console.error("not switchNetwork");
        if (fn) {
          fn(chain.id);
        }
      }
    },
    [fn, switchNetwork]
  );
  if (!activeChain || !(activeChain == null ? void 0 : activeChain.id)) {
    return null;
  }
  return /* @__PURE__ */ React54.createElement(Dialog, {
    onClose,
    open,
    titleId
  }, /* @__PURE__ */ React54.createElement(DialogContent, {
    padding: "0",
    bottomSheetOnMobile: true
  }, /* @__PURE__ */ React54.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "14",
    marginBottom: "14"
  }, /* @__PURE__ */ React54.createElement(ActivePixelCard, {
    pixel_height: 10,
    className: `tvlPixelTable_header`,
    backgroundColor: "#293457",
    height: "64px"
  }, /* @__PURE__ */ React54.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, mobile && /* @__PURE__ */ React54.createElement(Box, {
    width: "30"
  }), /* @__PURE__ */ React54.createElement(Text, {
    as: "h3",
    color: "modalText",
    weight: "bold",
    id: titleId
  }, "Switch Networks"))), unsupportedChain && /* @__PURE__ */ React54.createElement(Box, {
    marginLeft: "20",
    marginRight: "20",
    textAlign: mobile ? "center" : "left"
  }, /* @__PURE__ */ React54.createElement(Text, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Wrong network detected, switch or disconnect to continue.")), /* @__PURE__ */ React54.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    padding: "2",
    style: { maxHeight: mobile ? "80vh" : "70vh", overflowY: "scroll" }
  }, switchNetwork ? rainbowkitChains.map(
    ({ iconBackground, iconUrl, id, name }, idx) => {
      var _a2;
      const chain = chains.find((c) => c.id === id);
      const isCurrentChain = chain ? chain.id === (activeChain == null ? void 0 : activeChain.id) : false;
      const switching = chain ? !isCurrentChain && chain.id === pendingChainId : false;
      if (!chain) {
        return null;
      }
      return /* @__PURE__ */ React54.createElement(Fragment2, {
        key: chain.id
      }, /* @__PURE__ */ React54.createElement(MenuButton, {
        disabled: false,
        currentlySelected: isCurrentChain,
        onClick: () => chainClickHandle({
          isCurrentChain,
          chain
        }),
        testId: `chain-option-${chain.id}`
      }, /* @__PURE__ */ React54.createElement(Box, {
        fontFamily: "body",
        fontSize: "16"
      }, /* @__PURE__ */ React54.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
      }, /* @__PURE__ */ React54.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        gap: "4",
        height: chainIconSize
      }, iconUrl && /* @__PURE__ */ React54.createElement(Box, {
        height: "full",
        marginRight: "8"
      }, /* @__PURE__ */ React54.createElement(AsyncImage, {
        alt: name != null ? name : chain.name,
        background: iconBackground,
        borderRadius: "full",
        height: chainIconSize,
        src: iconUrl,
        width: chainIconSize
      })), /* @__PURE__ */ React54.createElement("div", null, (_a2 = chain.name) != null ? _a2 : name)), isCurrentChain && /* @__PURE__ */ React54.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginRight: "6"
      }, /* @__PURE__ */ React54.createElement(Text, {
        color: "accentColorForeground",
        size: "14",
        weight: "medium"
      }, "Connected"), /* @__PURE__ */ React54.createElement(Box, {
        background: "connectionIndicator",
        borderColor: "connectionIndicatorBorder",
        borderRadius: "full",
        borderStyle: "solid",
        borderWidth: "3",
        height: "12",
        marginLeft: "8",
        width: "12"
      })), switching && /* @__PURE__ */ React54.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        marginRight: "6"
      }, /* @__PURE__ */ React54.createElement(Text, {
        color: "modalText",
        size: "14",
        weight: "medium"
      }, "Confirm in Wallet"), /* @__PURE__ */ React54.createElement(Box, {
        background: "standby",
        borderRadius: "full",
        height: "12",
        marginLeft: "8",
        width: "12",
        borderColor: "standbyBorder",
        borderStyle: "solid",
        borderWidth: "3"
      }))))), mobile && idx < rainbowkitChains.length - 1 && /* @__PURE__ */ React54.createElement(Box, {
        background: "generalBorderDim",
        height: "1",
        marginX: "8"
      }));
    }
  ) : /* @__PURE__ */ React54.createElement(Box, {
    background: "generalBorder",
    borderRadius: "menuButton",
    paddingX: "18",
    paddingY: "12"
  }, /* @__PURE__ */ React54.createElement(Text, {
    color: "modalText",
    size: "14",
    weight: "medium"
  }, "Your wallet does not support switching networks from", " ", appName != null ? appName : "this app", ". Try switching networks from within your wallet instead.")), unsupportedChain && /* @__PURE__ */ React54.createElement(React54.Fragment, null, /* @__PURE__ */ React54.createElement(Box, {
    background: "generalBorderDim",
    height: "1",
    marginX: "8"
  }), /* @__PURE__ */ React54.createElement(MenuButton, {
    onClick: () => disconnect(),
    testId: "chain-option-disconnect"
  }, /* @__PURE__ */ React54.createElement(Box, {
    color: "error",
    fontFamily: "body",
    fontSize: "16"
  }, /* @__PURE__ */ React54.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, /* @__PURE__ */ React54.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "4",
    height: chainIconSize
  }, /* @__PURE__ */ React54.createElement(Box, {
    alignItems: "center",
    color: "error",
    height: chainIconSize,
    justifyContent: "center",
    marginRight: "8"
  }, /* @__PURE__ */ React54.createElement(DisconnectSqIcon, {
    size: Number(chainIconSize)
  })), /* @__PURE__ */ React54.createElement("div", null, "Disconnect")))))))), /* @__PURE__ */ React54.createElement(DialogClose_default, {
    onClick: onClose
  })));
}

// src/rainbowkit/src/components/ConnectModal/ConnectModal.tsx
import React56 from "react";

// src/rainbowkit/src/components/ConnectOptions/ConnectOptions.tsx
import React55 from "react";
function ConnectOptions({ onClose }) {
  return isMobile() ? /* @__PURE__ */ React55.createElement(MobileOptions, {
    onClose
  }) : /* @__PURE__ */ React55.createElement(DesktopOptions, {
    onClose
  });
}

// src/rainbowkit/src/components/ConnectModal/ConnectModal.tsx
function ConnectModal({ onClose, open }) {
  const titleId = "rk_connect_title";
  const connectionStatus = useConnectionStatus();
  if (connectionStatus === "disconnected") {
    return /* @__PURE__ */ React56.createElement(Dialog, {
      onClose,
      open,
      titleId
    }, /* @__PURE__ */ React56.createElement(DialogContent, {
      bottomSheetOnMobile: true,
      padding: "0",
      wide: true
    }, /* @__PURE__ */ React56.createElement(ConnectOptions, {
      onClose
    })));
  }
  if (connectionStatus === "unauthenticated") {
    return /* @__PURE__ */ React56.createElement(Dialog, {
      onClose,
      open,
      titleId
    }, /* @__PURE__ */ React56.createElement(DialogContent, {
      bottomSheetOnMobile: true,
      padding: "0"
    }, /* @__PURE__ */ React56.createElement(SignIn, {
      onClose
    })));
  }
  return null;
}

// src/rainbowkit/src/components/RainbowKitProvider/ModalContext.tsx
import { useSetRecoilState } from "recoil";

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

// src/rainbowkit/src/components/RainbowKitProvider/ModalContext.tsx
function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState14(false);
  const setWalletDialogOpen = useSetRecoilState(walletModalOpenState);
  return {
    closeModal: useCallback13(() => {
      setWalletDialogOpen(false);
      setModalOpen(false);
    }, []),
    isModalOpen,
    openModal: useCallback13(() => setModalOpen(true), [])
  };
}
var ModalContext = createContext11({
  accountModalOpen: false,
  chainModalOpen: false,
  connectModalOpen: false
});
function ModalProvider({ children }) {
  const {
    closeModal: closeConnectModal,
    isModalOpen: connectModalOpen,
    openModal: openConnectModal
  } = useModalStateValue();
  const {
    closeModal: closeAccountModal,
    isModalOpen: accountModalOpen,
    openModal: openAccountModal
  } = useModalStateValue();
  const {
    closeModal: closeChainModal,
    isModalOpen: chainModalOpen,
    openModal: openChainModal
  } = useModalStateValue();
  const connectionStatus = useConnectionStatus();
  const { chain } = useNetwork6();
  const chainSupported = !(chain == null ? void 0 : chain.unsupported);
  const fn = useRef6();
  function closeModals({
    keepConnectModalOpen = false
  } = {}) {
    if (!keepConnectModalOpen) {
      closeConnectModal();
    }
    closeAccountModal();
    closeChainModal();
  }
  const isUnauthenticated = useAuthenticationStatus() === "unauthenticated";
  useAccount10({
    onConnect: () => closeModals({ keepConnectModalOpen: isUnauthenticated }),
    onDisconnect: () => closeModals()
  });
  return /* @__PURE__ */ React57.createElement(ModalContext.Provider, {
    value: useMemo6(
      () => ({
        accountModalOpen,
        chainModalOpen,
        connectModalOpen,
        closeChainModal,
        openAccountModal: chainSupported && connectionStatus === "connected" ? openAccountModal : void 0,
        openChainModal: connectionStatus === "connected" ? openChainModal : void 0,
        openConnectModal: connectionStatus === "disconnected" || connectionStatus === "unauthenticated" ? openConnectModal : void 0,
        setFn: (_fn) => {
          fn.current = _fn;
        }
      }),
      [
        connectionStatus,
        chainSupported,
        accountModalOpen,
        chainModalOpen,
        connectModalOpen,
        openAccountModal,
        openChainModal,
        openConnectModal
      ]
    )
  }, children, /* @__PURE__ */ React57.createElement(ConnectModal, {
    onClose: closeConnectModal,
    open: connectModalOpen
  }), /* @__PURE__ */ React57.createElement(AccountModal, {
    onClose: closeAccountModal,
    open: accountModalOpen
  }), /* @__PURE__ */ React57.createElement(ChainModal, {
    onClose: closeChainModal,
    open: chainModalOpen,
    fn: fn.current
  }));
}
function useModalState() {
  const { accountModalOpen, chainModalOpen, connectModalOpen } = useContext16(ModalContext);
  return {
    accountModalOpen,
    chainModalOpen,
    connectModalOpen
  };
}
function useAccountModal() {
  const { accountModalOpen, openAccountModal } = useContext16(ModalContext);
  return { accountModalOpen, openAccountModal };
}
function useChainModal() {
  const { chainModalOpen, openChainModal, closeChainModal, setFn } = useContext16(ModalContext);
  return { chainModalOpen, openChainModal, closeChainModal, setFn };
}
function useConnectModal() {
  const { connectModalOpen, openConnectModal } = useContext16(ModalContext);
  return { connectModalOpen, openConnectModal };
}

// src/rainbowkit/src/components/ConnectButton/ConnectButtonRenderer.tsx
var noop = () => {
};
function ConnectButtonRenderer({
  children
}) {
  var _a, _b, _c, _d;
  const mounted = useIsMounted();
  const { address } = useAccount11();
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { data: balanceData } = useBalance2({ address });
  const { chain: activeChain } = useNetwork7();
  const rainbowkitChainsById = useRainbowKitChainsById();
  const authenticationStatus = (_a = useAuthenticationStatus()) != null ? _a : void 0;
  const rainbowKitChain = activeChain ? rainbowkitChainsById[activeChain.id] : void 0;
  const chainName = (_b = rainbowKitChain == null ? void 0 : rainbowKitChain.name) != null ? _b : void 0;
  const chainIconUrl = (_c = rainbowKitChain == null ? void 0 : rainbowKitChain.iconUrl) != null ? _c : void 0;
  const chainIconBackground = (_d = rainbowKitChain == null ? void 0 : rainbowKitChain.iconBackground) != null ? _d : void 0;
  const resolvedChainIconUrl = useAsyncImage(chainIconUrl);
  const showRecentTransactions = useContext17(ShowRecentTransactionsContext);
  const hasPendingTransactions = useRecentTransactions().some(({ status }) => status === "pending") && showRecentTransactions;
  const displayBalance = balanceData ? `${abbreviateETHBalance(parseFloat(balanceData.formatted))} ${balanceData.symbol}` : void 0;
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { openAccountModal } = useAccountModal();
  const { accountModalOpen, chainModalOpen, connectModalOpen } = useModalState();
  return /* @__PURE__ */ React58.createElement(React58.Fragment, null, children({
    account: address ? {
      address,
      balanceDecimals: balanceData == null ? void 0 : balanceData.decimals,
      balanceFormatted: balanceData == null ? void 0 : balanceData.formatted,
      balanceSymbol: balanceData == null ? void 0 : balanceData.symbol,
      displayBalance,
      displayName: ensName ? formatENS(ensName) : formatAddress(address),
      ensAvatar: ensAvatar != null ? ensAvatar : void 0,
      ensName: ensName != null ? ensName : void 0,
      hasPendingTransactions
    } : void 0,
    accountModalOpen,
    authenticationStatus,
    chain: activeChain ? {
      hasIcon: Boolean(chainIconUrl),
      iconBackground: chainIconBackground,
      iconUrl: resolvedChainIconUrl,
      id: activeChain.id,
      name: chainName != null ? chainName : activeChain.name,
      unsupported: activeChain.unsupported
    } : void 0,
    chainModalOpen,
    connectModalOpen,
    mounted,
    openAccountModal: openAccountModal != null ? openAccountModal : noop,
    openChainModal: openChainModal != null ? openChainModal : noop,
    openConnectModal: openConnectModal != null ? openConnectModal : noop
  }));
}
ConnectButtonRenderer.displayName = "ConnectButton.Custom";

// src/rainbowkit/src/components/ConnectButton/ConnectButton.tsx
var defaultProps = {
  accountStatus: "full",
  chainStatus: { largeScreen: "full", smallScreen: "icon" },
  label: "Connect Wallet",
  showBalance: { largeScreen: true, smallScreen: false }
};
function ConnectButton({
  accountStatus = defaultProps.accountStatus,
  chainStatus = defaultProps.chainStatus,
  label = defaultProps.label,
  showBalance = defaultProps.showBalance
}) {
  const chains = useRainbowKitChains();
  const connectionStatus = useConnectionStatus();
  return /* @__PURE__ */ React59.createElement(ConnectButtonRenderer, null, ({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
    var _a, _b, _c;
    const ready = mounted && connectionStatus !== "loading";
    const unsupportedChain = (_a = chain == null ? void 0 : chain.unsupported) != null ? _a : false;
    return /* @__PURE__ */ React59.createElement(Box, {
      display: "flex",
      gap: "12",
      ...!ready && {
        "aria-hidden": true,
        style: {
          opacity: 0,
          pointerEvents: "none",
          userSelect: "none"
        }
      }
    }, ready && account && connectionStatus === "connected" ? /* @__PURE__ */ React59.createElement(React59.Fragment, null, chain && (chains.length > 1 || unsupportedChain) && /* @__PURE__ */ React59.createElement(Box, {
      alignItems: "center",
      "aria-label": "Chain Selector",
      as: "button",
      background: unsupportedChain ? "connectButtonBackgroundError" : "connectButtonBackground",
      borderRadius: "connectButton",
      boxShadow: "connectButton",
      className: touchableStyles({
        active: "shrink",
        hover: "grow"
      }),
      color: unsupportedChain ? "connectButtonTextError" : "connectButtonText",
      display: mapResponsiveValue(chainStatus, (value) => value === "none" ? "none" : "flex"),
      fontFamily: "body",
      fontWeight: "bold",
      gap: "6",
      key: unsupportedChain ? "unsupported" : "supported",
      onClick: openChainModal,
      paddingX: "10",
      paddingY: "8",
      testId: unsupportedChain ? "wrong-network-button" : "chain-button",
      transition: "default",
      type: "button"
    }, unsupportedChain ? /* @__PURE__ */ React59.createElement(Box, {
      alignItems: "center",
      display: "flex",
      height: "24",
      paddingX: "4"
    }, "Wrong network") : /* @__PURE__ */ React59.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6"
    }, chain.hasIcon ? /* @__PURE__ */ React59.createElement(Box, {
      display: mapResponsiveValue(chainStatus, (value) => value === "full" || value === "icon" ? "block" : "none"),
      height: "24",
      width: "24"
    }, /* @__PURE__ */ React59.createElement(AsyncImage, {
      alt: (_b = chain.name) != null ? _b : "Chain icon",
      background: chain.iconBackground,
      borderRadius: "full",
      height: "24",
      src: chain.iconUrl,
      width: "24"
    })) : null, /* @__PURE__ */ React59.createElement(Box, {
      display: mapResponsiveValue(chainStatus, (value) => {
        if (value === "icon" && !chain.iconUrl) {
          return "block";
        }
        return value === "full" || value === "name" ? "block" : "none";
      })
    }, (_c = chain.name) != null ? _c : chain.id)), /* @__PURE__ */ React59.createElement(DropdownIcon, null)), !unsupportedChain && /* @__PURE__ */ React59.createElement(Box, {
      alignItems: "center",
      as: "button",
      background: "connectButtonBackground",
      borderRadius: "connectButton",
      boxShadow: "connectButton",
      className: touchableStyles({
        active: "shrink",
        hover: "grow"
      }),
      color: "connectButtonText",
      display: "flex",
      fontFamily: "body",
      fontWeight: "bold",
      onClick: openAccountModal,
      testId: "account-button",
      transition: "default",
      type: "button"
    }, account.displayBalance && /* @__PURE__ */ React59.createElement(Box, {
      display: mapResponsiveValue(showBalance, (value) => value ? "block" : "none"),
      padding: "8",
      paddingLeft: "12"
    }, account.displayBalance), /* @__PURE__ */ React59.createElement(Box, {
      background: normalizeResponsiveValue(showBalance)[isMobile() ? "smallScreen" : "largeScreen"] ? "connectButtonInnerBackground" : "connectButtonBackground",
      borderColor: "connectButtonBackground",
      borderRadius: "connectButton",
      borderStyle: "solid",
      borderWidth: "2",
      color: "connectButtonText",
      fontFamily: "body",
      fontWeight: "bold",
      paddingX: "8",
      paddingY: "6",
      transition: "default"
    }, /* @__PURE__ */ React59.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6",
      height: "24"
    }, /* @__PURE__ */ React59.createElement(Box, {
      display: mapResponsiveValue(accountStatus, (value) => value === "full" || value === "avatar" ? "block" : "none")
    }, /* @__PURE__ */ React59.createElement(Avatar, {
      address: account.address,
      imageUrl: account.ensAvatar,
      loading: account.hasPendingTransactions,
      size: 24
    })), /* @__PURE__ */ React59.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6"
    }, /* @__PURE__ */ React59.createElement(Box, {
      display: mapResponsiveValue(accountStatus, (value) => value === "full" || value === "address" ? "block" : "none")
    }, account.displayName), /* @__PURE__ */ React59.createElement(DropdownIcon, null)))))) : /* @__PURE__ */ React59.createElement(Box, {
      as: "button",
      background: "accentColor",
      borderRadius: "connectButton",
      boxShadow: "connectButton",
      className: touchableStyles({ active: "shrink", hover: "grow" }),
      color: "accentColorForeground",
      fontFamily: "body",
      fontWeight: "bold",
      height: "40",
      key: "connect",
      onClick: openConnectModal,
      paddingX: "14",
      testId: "connect-button",
      transition: "default",
      type: "button"
    }, label));
  });
}
ConnectButton.__defaultProps = defaultProps;
ConnectButton.Custom = ConnectButtonRenderer;

// src/rainbowkit/src/themes/darkTheme.ts
var darkGrey = "#1A1B1F";
var accentColors2 = {
  blue: { accentColor: "#3898FF", accentColorForeground: "#FFF" },
  green: { accentColor: "#4BD166", accentColorForeground: darkGrey },
  orange: { accentColor: "#FF983D", accentColorForeground: darkGrey },
  pink: { accentColor: "#FF7AB8", accentColorForeground: darkGrey },
  purple: { accentColor: "#7A70FF", accentColorForeground: "#FFF" },
  red: { accentColor: "#FF6257", accentColorForeground: "#FFF" }
};
var defaultAccentColor2 = accentColors2.blue;
var darkTheme = ({
  accentColor = defaultAccentColor2.accentColor,
  accentColorForeground = defaultAccentColor2.accentColorForeground,
  ...baseThemeOptions
} = {}) => ({
  ...baseTheme(baseThemeOptions),
  colors: {
    accentColor,
    accentColorForeground,
    actionButtonBorder: "rgba(255, 255, 255, 0.04)",
    actionButtonBorderMobile: "rgba(255, 255, 255, 0.08)",
    actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
    closeButton: "rgba(224, 232, 255, 0.6)",
    closeButtonBackground: "rgba(255, 255, 255, 0.08)",
    connectButtonBackground: darkGrey,
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground: "linear-gradient(0deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.15))",
    connectButtonText: "#FFF",
    connectButtonTextError: "#FFF",
    connectionIndicator: "#65EDBC",
    connectionIndicatorBorder: "#2a443a",
    downloadBottomCardBackground: "linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.2) 71.04%), #1A1B1F",
    downloadTopCardBackground: "linear-gradient(126deg, rgba(120, 120, 120, 0.2) 9.49%, rgba(0, 0, 0, 0) 71.04%), #1A1B1F",
    error: "#FF494A",
    generalBorder: "rgba(255, 255, 255, 0.08)",
    generalBorderDim: "rgba(255, 255, 255, 0.04)",
    menuItemBackground: "rgba(224, 232, 255, 0.1)",
    modalBackdrop: "rgba(0, 0, 0, 0.5)",
    modalBackground: "#1A1B1F",
    modalBorder: "rgba(255, 255, 255, 0.08)",
    modalText: "#FFF",
    modalTextDim: "rgba(224, 232, 255, 0.3)",
    modalTextSecondary: "rgba(255, 255, 255, 0.6)",
    profileAction: "rgba(224, 232, 255, 0.1)",
    profileActionHover: "rgba(224, 232, 255, 0.2)",
    profileForeground: "rgba(224, 232, 255, 0.05)",
    selectedOptionBorder: "rgba(224, 232, 255, 0.1)",
    standby: "#FFD641",
    standbyBorder: "#5c5847"
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)"
  }
});
darkTheme.accentColors = accentColors2;

// src/rainbowkit/src/themes/midnightTheme.ts
var accentColors3 = {
  blue: { accentColor: "#3898FF", accentColorForeground: "#FFF" },
  green: { accentColor: "#4BD166", accentColorForeground: "#000" },
  orange: { accentColor: "#FF983D", accentColorForeground: "#000" },
  pink: { accentColor: "#FF7AB8", accentColorForeground: "#000" },
  purple: { accentColor: "#7A70FF", accentColorForeground: "#FFF" },
  red: { accentColor: "#FF6257", accentColorForeground: "#FFF" }
};
var defaultAccentColor3 = accentColors3.blue;
var midnightTheme = ({
  accentColor = defaultAccentColor3.accentColor,
  accentColorForeground = defaultAccentColor3.accentColorForeground,
  ...baseThemeOptions
} = {}) => ({
  ...baseTheme(baseThemeOptions),
  colors: {
    accentColor,
    accentColorForeground,
    actionButtonBorder: "rgba(255, 255, 255, 0.04)",
    actionButtonBorderMobile: "rgba(255, 255, 255, 0.1)",
    actionButtonSecondaryBackground: "rgba(255, 255, 255, 0.08)",
    closeButton: "rgba(255, 255, 255, 0.7)",
    closeButtonBackground: "rgba(255, 255, 255, 0.08)",
    connectButtonBackground: "#000",
    connectButtonBackgroundError: "#FF494A",
    connectButtonInnerBackground: "linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.12))",
    connectButtonText: "#FFF",
    connectButtonTextError: "#FFF",
    connectionIndicator: "#65EDBC",
    connectionIndicatorBorder: "#2a443a",
    downloadBottomCardBackground: "linear-gradient(126deg, rgba(0, 0, 0, 0) 9.49%, rgba(120, 120, 120, 0.1) 71.04%), #050505",
    downloadTopCardBackground: "linear-gradient(126deg, rgba(120, 120, 120, 0.1) 9.49%, rgba(0, 0, 0, 0) 71.04%), #050505",
    error: "#FF494A",
    generalBorder: "rgba(255, 255, 255, 0.08)",
    generalBorderDim: "rgba(255, 255, 255, 0.04)",
    menuItemBackground: "rgba(255, 255, 255, 0.08)",
    modalBackdrop: "rgba(0, 0, 0, 0.7)",
    modalBackground: "#000",
    modalBorder: "rgba(255, 255, 255, 0.08)",
    modalText: "#FFF",
    modalTextDim: "rgba(255, 255, 255, 0.2)",
    modalTextSecondary: "rgba(255, 255, 255, 0.6)",
    profileAction: "rgba(255, 255, 255, 0.1)",
    profileActionHover: "rgba(255, 255, 255, 0.2)",
    profileForeground: "rgba(255, 255, 255, 0.06)",
    selectedOptionBorder: "rgba(224, 232, 255, 0.1)",
    standby: "#FFD641",
    standbyBorder: "#5c5847"
  },
  shadows: {
    connectButton: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    dialog: "0px 8px 32px rgba(0, 0, 0, 0.32)",
    profileDetailsAction: "0px 2px 6px rgba(37, 41, 46, 0.04)",
    selectedOption: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    selectedWallet: "0px 2px 6px rgba(0, 0, 0, 0.24)",
    walletLogo: "0px 2px 16px rgba(0, 0, 0, 0.16)"
  }
});
midnightTheme.accentColors = accentColors3;

// src/rainbowkit/src/transactions/useAddRecentTransaction.ts
import { useCallback as useCallback14 } from "react";
import { useAccount as useAccount12 } from "wagmi";

// src/rainbowkit/src/wallets/connectorsForWallets.ts
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

// src/rainbowkit/src/utils/omitUndefinedValues.ts
function omitUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_key, value]) => value !== void 0)
  );
}

// src/rainbowkit/src/wallets/connectorsForWallets.ts
var connectorsForWallets = (walletList) => {
  return () => {
    let index = -1;
    const connectors = [];
    const visibleWallets = [];
    const potentiallyHiddenWallets = [];
    const walletInstances = [];
    walletList.forEach(({ groupName, wallets }, groupIndex) => {
      wallets.forEach((wallet) => {
        index++;
        if ((wallet == null ? void 0 : wallet.iconAccent) && !isHexString(wallet == null ? void 0 : wallet.iconAccent)) {
          throw new Error(`Property \`iconAccent\` is not a hex value for wallet: ${wallet.name}`);
        }
        const walletListItem = {
          ...wallet,
          groupIndex,
          groupName,
          index
        };
        if (typeof wallet.hidden === "function") {
          potentiallyHiddenWallets.push(walletListItem);
        } else {
          visibleWallets.push(walletListItem);
        }
      });
    });
    const walletListItems = [...visibleWallets, ...potentiallyHiddenWallets];
    walletListItems.forEach(({ createConnector: createConnector2, groupIndex, groupName, hidden, index: index2, ...walletMeta }) => {
      if (typeof hidden === "function") {
        const isHidden = hidden({
          wallets: [
            ...walletInstances.map(({ connector: connector2, id, installed, name }) => ({
              connector: connector2,
              id,
              installed,
              name
            }))
          ]
        });
        if (isHidden) {
          return;
        }
      }
      const { connector, ...connectionMethods } = omitUndefinedValues(createConnector2());
      let walletConnectModalConnector;
      if (walletMeta.id === "walletConnect" && connectionMethods.qrCode && !isMobile()) {
        const { chains, options } = connector;
        walletConnectModalConnector = new WalletConnectConnector({
          chains,
          options: {
            ...options,
            showQrModal: true
          }
        });
        connectors.push(walletConnectModalConnector);
      }
      const walletInstance = {
        connector,
        groupIndex,
        groupName,
        index: index2,
        walletConnectModalConnector,
        ...walletMeta,
        ...connectionMethods
      };
      walletInstances.push(walletInstance);
      if (!connectors.includes(connector)) {
        connectors.push(connector);
        connector._wallets = [];
      }
      connector._wallets.push(walletInstance);
    });
    return connectors;
  };
};

// src/rainbowkit/src/wallets/walletConnectors/braveWallet/braveWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/coinbaseWallet/coinbaseWallet.ts
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

// src/rainbowkit/src/wallets/walletConnectors/injectedWallet/injectedWallet.ts
import { InjectedConnector as InjectedConnector2 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// src/rainbowkit/src/utils/getWalletConnectUri.ts
async function getWalletConnectUri(connector, version) {
  const provider = await connector.getProvider();
  return version === "2" ? new Promise((resolve) => provider.once("display_uri", resolve)) : provider.connector.uri;
}

// src/rainbowkit/src/wallets/getWalletConnectConnector.ts
import { WalletConnectConnector as WalletConnectConnector2 } from "wagmi/connectors/walletConnect";
import { WalletConnectLegacyConnector } from "wagmi/connectors/walletConnectLegacy";
var sharedConnectors = /* @__PURE__ */ new Map();
function createConnector(version, config) {
  const connector = version === "1" ? new WalletConnectLegacyConnector(config) : new WalletConnectConnector2(config);
  sharedConnectors.set(JSON.stringify(config), connector);
  return connector;
}
function getWalletConnectConnector({
  chains,
  options = {},
  projectId: projectId2,
  version = "2"
}) {
  const exampleProjectId = "21fef48091f12692cad574a6f7753643";
  if (version === "2") {
    if (!projectId2 || projectId2 === "") {
      throw new Error(
        "No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure"
      );
    } else if (projectId2 === "YOUR_PROJECT_ID" || projectId2 === exampleProjectId) {
      console.warn(
        "Invalid projectId. Please create a unique WalletConnect Cloud projectId for your dApp https://www.rainbowkit.com/docs/installation#configure"
      );
    }
  }
  const config = {
    chains,
    options: version === "1" ? {
      qrcode: false,
      ...options
    } : {
      projectId: projectId2 === "YOUR_PROJECT_ID" ? exampleProjectId : projectId2,
      showQrModal: false,
      ...options
    }
  };
  const serializedConfig = JSON.stringify(config);
  const sharedConnector = sharedConnectors.get(serializedConfig);
  return sharedConnector != null ? sharedConnector : createConnector(version, config);
}

// src/rainbowkit/src/wallets/walletConnectors/metaMaskWallet/metaMaskWallet.ts
function isMetaMask(ethereum) {
  if (!(ethereum == null ? void 0 : ethereum.isMetaMask)) {
    return false;
  }
  if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state) {
    return false;
  }
  if (ethereum.isApexWallet) {
    return false;
  }
  if (ethereum.isAvalanche) {
    return false;
  }
  if (ethereum.isBackpack) {
    return false;
  }
  if (ethereum.isBifrost) {
    return false;
  }
  if (ethereum.isBitKeep) {
    return false;
  }
  if (ethereum.isBitski) {
    return false;
  }
  if (ethereum.isBlockWallet) {
    return false;
  }
  if (ethereum.isCoinbaseWallet) {
    return false;
  }
  if (ethereum.isDawn) {
    return false;
  }
  if (ethereum.isEnkrypt) {
    return false;
  }
  if (ethereum.isExodus) {
    return false;
  }
  if (ethereum.isFrame) {
    return false;
  }
  if (ethereum.isFrontier) {
    return false;
  }
  if (ethereum.isGamestop) {
    return false;
  }
  if (ethereum.isHyperPay) {
    return false;
  }
  if (ethereum.isImToken) {
    return false;
  }
  if (ethereum.isKuCoinWallet) {
    return false;
  }
  if (ethereum.isMathWallet) {
    return false;
  }
  if (ethereum.isOkxWallet || ethereum.isOKExWallet) {
    return false;
  }
  if (ethereum.isOneInchIOSWallet || ethereum.isOneInchAndroidWallet) {
    return false;
  }
  if (ethereum.isOpera) {
    return false;
  }
  if (ethereum.isPhantom) {
    return false;
  }
  if (ethereum.isPortal) {
    return false;
  }
  if (ethereum.isRabby) {
    return false;
  }
  if (ethereum.isRainbow) {
    return false;
  }
  if (ethereum.isStatus) {
    return false;
  }
  if (ethereum.isTalisman) {
    return false;
  }
  if (ethereum.isTally) {
    return false;
  }
  if (ethereum.isTokenPocket) {
    return false;
  }
  if (ethereum.isTokenary) {
    return false;
  }
  if (ethereum.isTrust || ethereum.isTrustWallet) {
    return false;
  }
  if (ethereum.isXDEFI) {
    return false;
  }
  if (ethereum.isZerion) {
    return false;
  }
  return true;
}
var metaMaskWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  var _a, _b;
  const providers2 = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.providers);
  const isMetaMaskInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (((_b = window.ethereum.providers) == null ? void 0 : _b.some(isMetaMask)) || window.ethereum.isMetaMask);
  const shouldUseWalletConnect = !isMetaMaskInjected;
  return {
    id: "metaMask",
    name: "MetaMask",
    iconUrl: async () => (await import("./matemask-MXFP7UTV.js")).default,
    iconAccent: "#f6851a",
    iconBackground: "transparent",
    installed: !shouldUseWalletConnect ? isMetaMaskInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.metamask",
      ios: "https://apps.apple.com/us/app/metamask/id1438144202",
      mobile: "https://metamask.io/download",
      qrCode: "https://metamask.io/download",
      chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm",
      firefox: "https://addons.mozilla.org/firefox/addon/ether-metamask",
      opera: "https://addons.opera.com/extensions/details/metamask-10",
      browserExtension: "https://metamask.io/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new MetaMaskConnector({
        chains,
        options: {
          getProvider: () => providers2 ? providers2.find(isMetaMask) : typeof window !== "undefined" ? window.ethereum : void 0,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `metamask://wc?uri=${encodeURIComponent(uri)}` : `https://metamask.app.link/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [
              {
                description: "We recommend putting MetaMask on your home screen for quicker access.",
                step: "install",
                title: "Open the MetaMask app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://metamask.io/faqs/",
            steps: [
              {
                description: "We recommend pinning MetaMask to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the MetaMask extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        }
      };
    }
  };
};

// src/rainbowkit/src/wallets/getInjectedConnector.ts
import { InjectedConnector as InjectedConnector3 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/safeWallet/safeWallet.ts
import { SafeConnector } from "wagmi/connectors/safe";

// src/rainbowkit/src/wallets/walletConnectors/walletConnectWallet/walletConnectWallet.ts
var walletConnectWallet = ({
  chains,
  options,
  projectId: projectId2,
  version = "2"
}) => ({
  id: "walletConnect",
  name: "WalletConnect",
  iconUrl: async () => (await import("./walletConnectWallet-YJLMXZ5T.js")).default,
  iconBackground: "#3b99fc",
  createConnector: () => {
    const ios = isIOS();
    const connector = version === "1" ? getWalletConnectConnector({
      version: "1",
      chains,
      options: {
        qrcode: ios,
        ...options
      }
    }) : getWalletConnectConnector({
      version: "2",
      chains,
      projectId: projectId2,
      options: {
        showQrModal: ios,
        ...options
      }
    });
    const getUri = async () => getWalletConnectUri(connector, version);
    return {
      connector,
      ...ios ? {} : {
        mobile: { getUri },
        qrCode: { getUri }
      }
    };
  }
});

// src/rainbowkit/src/wallets/walletConnectors/bifrostWallet/bifrostWallet.ts
import { InjectedConnector as InjectedConnector4 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/bitgetWallet/bitgetWallet.ts
import { InjectedConnector as InjectedConnector5 } from "wagmi/connectors/injected";
var bitgetWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isBitKeepInjected = typeof window !== "undefined" && window.bitkeep !== void 0 && window.bitkeep.ethereum !== void 0 && window.bitkeep.ethereum.isBitKeep === true;
  const shouldUseWalletConnect = !isBitKeepInjected;
  return {
    id: "bitGet",
    name: "Bitget Wallet",
    iconUrl: async () => (await import("./bitgetWallet-3TEFUJAE.js")).default,
    iconAccent: "#f6851a",
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isBitKeepInjected : void 0,
    downloadUrls: {
      android: "https://bitkeep.com/en/download?type=2",
      ios: "https://apps.apple.com/app/bitkeep/id1395301115",
      mobile: "https://bitkeep.com/en/download?type=2",
      qrCode: "https://bitkeep.com/en/download",
      chrome: "https://chrome.google.com/webstore/detail/bitkeep-crypto-nft-wallet/jiidiaalihmmhddjgbnbgdfflelocpak",
      browserExtension: "https://bitkeep.com/en/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        options: walletConnectOptions,
        projectId: projectId2,
        version: walletConnectVersion
      }) : new InjectedConnector5({
        chains,
        options: {
          getProvider: () => window.bitkeep.ethereum,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : `bitkeep://wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: "https://study.bitkeep.com",
            steps: [
              {
                description: "We recommend pinning BitKeep to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the BitKeep extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        },
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://study.bitkeep.com",
            steps: [
              {
                description: "We recommend putting BitKeep on your home screen for quicker access.",
                step: "install",
                title: "Open the BitKeep app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/bitKeepWallet/bitKeepWallet.ts
import { InjectedConnector as InjectedConnector6 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/bitskiWallet/bitskiWallet.ts
import { InjectedConnector as InjectedConnector7 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/coin98Wallet/coin98Wallet.ts
import { InjectedConnector as InjectedConnector8 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/coreWallet/coreWallet.ts
import { InjectedConnector as InjectedConnector9 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/dawnWallet/dawnWallet.ts
import { InjectedConnector as InjectedConnector10 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/enkryptWallet/enkryptWallet.ts
import { InjectedConnector as InjectedConnector11 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/foxWallet/foxWallet.ts
import { InjectedConnector as InjectedConnector12 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/frameWallet/frameWallet.ts
import { InjectedConnector as InjectedConnector13 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/frontierWallet/frontierWallet.ts
import { InjectedConnector as InjectedConnector14 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/mewWallet/mewWallet.ts
import { InjectedConnector as InjectedConnector15 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/okxWallet/okxWallet.ts
import { InjectedConnector as InjectedConnector16 } from "wagmi/connectors/injected";
var okxWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isOKXInjected = typeof window !== "undefined" && typeof window.okxwallet !== "undefined";
  const shouldUseWalletConnect = !isOKXInjected;
  return {
    id: "okx",
    name: "OKX Wallet",
    iconUrl: async () => (await import("./okxWallet-IFNB73K2.js")).default,
    iconAccent: "#000",
    iconBackground: "#000",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
      ios: "https://itunes.apple.com/app/id1327268470?mt=8",
      mobile: "https://okx.com/download",
      qrCode: "https://okx.com/download",
      chrome: "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
      edge: "https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha",
      firefox: "https://addons.mozilla.org/firefox/addon/okexwallet/",
      browserExtension: "https://okx.com/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector16({
        chains,
        options: {
          getProvider: () => window.okxwallet,
          ...options
        }
      });
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? async () => {
            const uri = await getWalletConnectUri(
              connector,
              walletConnectVersion
            );
            return isAndroid() ? uri : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description: "We recommend putting OKX Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the OKX Wallet app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description: "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the OKX Wallet extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        }
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/oneKeyWallet/oneKeyWallet.ts
import { InjectedConnector as InjectedConnector17 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/phantomWallet/phantomWallet.ts
import { InjectedConnector as InjectedConnector18 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/rabbyWallet/rabbyWallet.ts
import { InjectedConnector as InjectedConnector19 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/safeheronWallet/safeheronWallet.ts
import { InjectedConnector as InjectedConnector20 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/tahoWallet/tahoWallet.ts
import { InjectedConnector as InjectedConnector21 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/talismanWallet/talismanWallet.ts
import { InjectedConnector as InjectedConnector22 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/tokenPocketWallet/tokenPocketWallet.ts
import { InjectedConnector as InjectedConnector23 } from "wagmi/connectors/injected";
var tokenPocketWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => {
  var _a;
  const isTokenPocketInjected = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isTokenPocket) === true;
  const shouldUseWalletConnect = !isTokenPocketInjected;
  return {
    id: "tokenPocket",
    name: "TokenPocket",
    iconUrl: async () => (await import("./tokenPocketWallet-AHC3X3WT.js")).default,
    iconBackground: "#2980FE",
    installed: !shouldUseWalletConnect ? isTokenPocketInjected : void 0,
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/tokenpocket/mfgccjchihfkkindfppnaooecgfneiii",
      browserExtension: "https://extension.tokenpocket.pro/",
      android: "https://play.google.com/store/apps/details?id=vip.mytokenpocket",
      ios: "https://apps.apple.com/us/app/tp-global-wallet/id6444625622",
      qrCode: "https://tokenpocket.pro/en/download/app",
      mobile: "https://tokenpocket.pro/en/download/app"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId: projectId2,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector23({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isMobile() ? `tpoutside://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://help.tokenpocket.pro/en/",
            steps: [
              {
                description: "We recommend putting TokenPocket on your home screen for quicker access.",
                step: "install",
                title: "Open the TokenPocket app"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the scan button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://help.tokenpocket.pro/en/extension-wallet/faq/installation-tutorial",
            steps: [
              {
                description: "We recommend pinning TokenPocket to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the TokenPocket extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ]
          }
        }
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/trustWallet/trustWallet.ts
import { InjectedConnector as InjectedConnector24 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/xdefiWallet/xdefiWallet.ts
import { InjectedConnector as InjectedConnector25 } from "wagmi/connectors/injected";

// src/rainbowkit/src/wallets/walletConnectors/zerionWallet/zerionWallet.ts
import { InjectedConnector as InjectedConnector26 } from "wagmi/connectors/injected";

// src/hooks/useActiveWeb3React.ts
import { useMemo as useMemo7 } from "react";
import { useAccount as useAccount13, usePublicClient as usePublicClient3 } from "wagmi";
function useActiveWeb3React(env, chainList2) {
  const chainId = useChainId();
  const { address } = useAccount13();
  const provider = usePublicClient3();
  return useMemo7(() => {
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
  const isMobile2 = useIsMobile();
  const setDefaultSelectedKey = useSetRecoilState2(defaultSelectedKey);
  useEffect20(() => {
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
  }, [location, isMobile2]);
};
var useNavItem = () => {
  const { t } = useCustomTranslation([LngNs.siderBar]);
  const { chainId } = useActiveWeb3React();
  return useMemo8(() => {
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
        type: "Games" /* Games */,
        btn_label: "Live",
        btn_background_color: "#C5631D"
      },
      {
        label: t("z2048"),
        keyValue: "10",
        icon: "z2048.png",
        link: LinkList[1],
        disabled: false,
        btn_label: "Live",
        type: "Games" /* Games */,
        btn_background_color: "#C5631D"
      },
      {
        label: t("zAce"),
        keyValue: "6",
        icon: "zACE.png",
        link: LinkList[2],
        disabled: false,
        type: "Games" /* Games */,
        btn_label: "Testing",
        content: (className) => /* @__PURE__ */ React60.createElement("div", {
          className
        }, /* @__PURE__ */ React60.createElement("p", null, "Acequect Studio"), /* @__PURE__ */ React60.createElement("img", {
          src: preStaticUrl + "/img/games/star.svg"
        })),
        btn_background_color: "#AF2D6A"
      },
      {
        label: t("Candy Crush"),
        keyValue: "12",
        icon: "Candy.png",
        link: LinkList[3],
        disabled: false,
        type: "Games" /* Games */,
        btn_label: "Testing",
        btn_background_color: "#AF2D6A"
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

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
import classnames4 from "classnames";
import React68, { memo as memo9, useCallback as useCallback18, useEffect as useEffect21, useState as useState17 } from "react";
import { useRecoilState as useRecoilState5, useRecoilValue as useRecoilValue4 } from "recoil";

// src/components/CurrencyLogo/index.tsx
import React62, { useState as useState15 } from "react";

// src/components/icons/index.tsx
import React61 from "react";
import classnames2 from "classnames";
var Icon = (props) => {
  return /* @__PURE__ */ React61.createElement(SvgComponent_default, {
    className: classnames2("icon", props.className),
    src: preStaticUrl + `/img/icon/${props.name}.svg`,
    alt: ""
  });
};
var icons_default = Icon;

// src/components/CurrencyLogo/index.tsx
var Logo = ({ src: src6, alt, ...rest }) => {
  const [bad, setBad] = useState15(false);
  if (src6 && !bad) {
    return /* @__PURE__ */ React62.createElement("img", {
      ...rest,
      alt,
      src: src6,
      onError: () => {
        setBad(true);
      }
    });
  }
  return /* @__PURE__ */ React62.createElement("div", {
    ...rest
  }, /* @__PURE__ */ React62.createElement(icons_default, {
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
  const [unit, base3] = (_a = Units.find(
    ([, min]) => Number(amount) >= Number(min)
  )) != null ? _a : ["", 1];
  return `${utils.commify(
    (amount / base3).toFixed(precision)
  )}${unit}`;
}
function formatSymbol(symbol) {
  return symbol ? symbol === "WTT" ? symbol.replace(/W/, "") : symbol.replace(/TT-/, "") : "";
}

// src/hooks/usePoint.ts
import BigNumberjs2 from "bignumber.js";

// src/hooks/useAccountInvitation.ts
import { atom as atom4, useRecoilValue, useSetRecoilState as useSetRecoilState3 } from "recoil";
import { useCallback as useCallback15 } from "react";

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
  const setInvitationAddressState = useSetRecoilState3(invitationAddressState);
  const postAccountUpdate = useCallback15(
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
import { useCallback as useCallback17, useState as useState16 } from "react";
import { useRecoilState as useRecoilState3, useRecoilValue as useRecoilValue2, useSetRecoilState as useSetRecoilState4 } from "recoil";

// src/hooks/usePublicNodeWaitForTransaction.ts
import { useCallback as useCallback16 } from "react";
import { waitForTransaction } from "wagmi/actions";

// src/rainbow/rainbow.ts
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
import { useNetwork as useNetwork8 } from "wagmi";
var useActiveChainId = (env) => {
  var _a;
  const { chain } = useNetwork8();
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
  const waitForTransaction_ = useCallback16(
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
  const [isLoading, setIsLoading] = useState16(false);
  const setPointsDialogOpen = useSetRecoilState4(pointsDialogState);
  const setPointsAnimNumState = useSetRecoilState4(pointsAnimNumState);
  const [refreshBalance, setRefreshBalanceState] = useRecoilState3(refreshBalanceState);
  const { waitForTransaction: waitForTransaction2 } = usePublicNodeWaitForTransaction(env);
  const hidePointsWarn = useRecoilValue2(hidePointsWarnState);
  const [pointsWarn, setPointsWarn] = useRecoilState3(pointsWarnState);
  const [choseIndex, setChoseIndex] = useState16();
  const { data: walletClient } = useWalletClient();
  const swapPointHandle = useCallback17(
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
                  value: ethers2.utils.parseEther(v.price)
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
import { useMemo as useMemo9 } from "react";
import { useRecoilValue as useRecoilValue3 } from "recoil";
var useNativeBalanceStr = () => {
  const nativeBalance = useRecoilValue3(nativeBalanceState);
  return useMemo9(() => {
    return formatMoney(nativeBalance, 2);
  }, [nativeBalance]);
};
var usePointsBalanceStr = () => {
  const pointsBalance = useRecoilValue3(pointsBalanceState);
  return useMemo9(() => {
    return formatMoney(pointsBalance, 0);
  }, [pointsBalance]);
};

// src/components/ConnectWallet/components/PointsDialog/PointsWarn.tsx
import React63, { memo as memo5 } from "react";
import { useRecoilState as useRecoilState4 } from "recoil";
var PoinsWarn = memo5(({ handleNext }) => {
  const { t } = useCustomTranslation([LngNs.points]);
  const [hidePointsWarn, setHidePointsWarn] = useRecoilState4(hidePointsWarnState);
  return /* @__PURE__ */ React63.createElement("div", {
    className: "points_dialog_dialogContainer"
  }, /* @__PURE__ */ React63.createElement("p", null, t("poinsWarnText01")), /* @__PURE__ */ React63.createElement("p", null, /* @__PURE__ */ React63.createElement("em", null), /* @__PURE__ */ React63.createElement("i", null, t("poinsWarnText02")), /* @__PURE__ */ React63.createElement("br", null), /* @__PURE__ */ React63.createElement("em", null), /* @__PURE__ */ React63.createElement("i", null, t("poinsWarnText03"))), /* @__PURE__ */ React63.createElement("p", null, t("poinsWarnText04")), /* @__PURE__ */ React63.createElement("p", {
    className: "points_dialog_flex",
    onClick: () => setHidePointsWarn(!hidePointsWarn)
  }, /* @__PURE__ */ React63.createElement(icons_default, {
    name: hidePointsWarn ? "checked" : "check"
  }), t("poinsWarnText05")), /* @__PURE__ */ React63.createElement(ActivePixelButtonColor, {
    onClick: handleNext,
    width: "100%",
    height: "52px",
    pixel_height: 4,
    backgroundColor: "#1649FF",
    borderBottomColor: "#0F33B2",
    borderTopColor: "#3360FF",
    className: "points_dialog_btn"
  }, /* @__PURE__ */ React63.createElement("p", null, t("Ok"))));
}, isEqual);
var PointsWarn_default = PoinsWarn;

// src/components/icons/PointsIcon/PointsIcon.tsx
import React64 from "react";
import { memo as memo6 } from "react";
import styled2 from "styled-components";
var PointsImg = styled2.img`
  display: inline-block;
  width: ${({ isMobile: isMobile2 }) => isMobile2 ? "20px" : "30px"};
  margin-left: ${({ isMobile: isMobile2 }) => isMobile2 ? "4px" : "10px"};
`;
var PointsIcon = memo6(
  ({ isMobile: isMobile2, classname }) => {
    return /* @__PURE__ */ React64.createElement(PointsImg, {
      isMobile: isMobile2,
      src: preStaticUrl + `/img/home/data_points.svg`,
      alt: "",
      className: classname
    });
  },
  isEqual
);

// src/components/Modal/Modal.tsx
import React65 from "react";
import { DialogContent as DialogContent2, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import classnames3 from "classnames";
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
  return /* @__PURE__ */ React65.createElement(DialogOverlay, {
    isOpen: open,
    onDismiss: onCancel,
    className: classnames3("customDialog", "bottom", wrapClassName),
    "aria-label": "Modal"
  }, /* @__PURE__ */ React65.createElement(DialogContent2, {
    style: { width }
  }, children));
};
var Modal_default = Modal;

// src/components/PixelTable/PixelTable.tsx
import React66, { memo as memo7 } from "react";
var PixelTableBorder = memo7(
  ({
    header_children,
    body_children,
    pixel_height,
    classNameHeader,
    backgroundColor,
    headerBackgroundColor,
    borderColor,
    width
  }) => {
    return /* @__PURE__ */ React66.createElement(PixelBorderCard, {
      className: "tvlPixelTable",
      pixel_height,
      backgroundColor: `${backgroundColor != null ? backgroundColor : "#0d1120"}`,
      borderColor: `${borderColor != null ? borderColor : "#3A4254"}`,
      width
    }, /* @__PURE__ */ React66.createElement(ActivePixelCard, {
      className: `tvlPixelTable_header ${classNameHeader != null ? classNameHeader : ""}`,
      pixel_height,
      backgroundColor: `${headerBackgroundColor != null ? headerBackgroundColor : "#293457"}`
    }, header_children), body_children);
  }
);
var PixelTable = memo7(
  ({
    header_children,
    body_children,
    pixel_height,
    className,
    classNameHeader,
    backgroundColor,
    headerBackgroundColor,
    borderColor,
    width
  }) => {
    return /* @__PURE__ */ React66.createElement(ActivePixelCard, {
      className: `tvlPixelTable ${className != null ? className : ""}`,
      pixel_height,
      backgroundColor: `${backgroundColor != null ? backgroundColor : "#0d1120"}`,
      borderColor: `${borderColor != null ? borderColor : "#3A4254"}`,
      width
    }, /* @__PURE__ */ React66.createElement(ActivePixelCard, {
      className: `tvlPixelTable_header ${classNameHeader != null ? classNameHeader : ""}`,
      pixel_height,
      backgroundColor: `${headerBackgroundColor != null ? headerBackgroundColor : "#293457"}`
    }, header_children), body_children);
  }
);

// src/components/LoadingSvg/LoadingButton.tsx
import React67, { memo as memo8 } from "react";
var LoadingButton = memo8(
  ({ className, isLoading }) => {
    if (isLoading) {
      return /* @__PURE__ */ React67.createElement(SvgComponent_default, {
        className: `${className != null ? className : ""} animation_rotate LoadingButton`,
        src: preStaticUrl + "/img/icon/pixel_loading.svg"
      });
    }
    return /* @__PURE__ */ React67.createElement(React67.Fragment, null);
  }
);
var LoadingButton_default = LoadingButton;

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
var PointsDialog = memo9(
  ({ env, dispatch, setSuccessToast, setErrorToast }) => {
    const { t } = useCustomTranslation([LngNs.points]);
    const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState5(pointsDialogState);
    const pointsWarn = useRecoilValue4(pointsWarnState);
    const { chainId } = useActiveWeb3React();
    const pointsBalanceStr = usePointsBalanceStr();
    const isMobile2 = useIsMobile();
    const [pointsList, setPointsList] = useState17([]);
    const { isLoading, swapPointHandle } = useSwapPoint({
      env,
      dispatch,
      setSuccessToast,
      setErrorToast
    });
    useEffect21(() => {
      if (chainId) {
        setTimeout(() => {
          const list2 = pointsListDefault(chainId);
          if (list2) {
            setPointsList(list2);
          }
        }, 800);
      }
    }, [chainId]);
    const handleCancel = useCallback18(() => {
      setPointsDialogOpen(false);
    }, []);
    return /* @__PURE__ */ React68.createElement(Modal_default, {
      open: pointsDialogOpen,
      onCancel: () => setPointsDialogOpen(false),
      footer: null,
      wrapClassName: classnames4("customDialog", "bottom", "dialog"),
      width: isMobile2 ? "100%" : 604,
      destroyOnClose: true,
      closable: false,
      centered: isMobile2 ? false : true,
      transitionName: isMobile2 ? "ant-slide-down" : void 0
    }, /* @__PURE__ */ React68.createElement(PixelTable, {
      classNameHeader: "modalTitleInner",
      backgroundColor: "#1D263B",
      header_children: /* @__PURE__ */ React68.createElement("p", {
        className: "modalTitleInnerTitle"
      }, t("Recharge Points")),
      body_children: /* @__PURE__ */ React68.createElement(React68.Fragment, null, /* @__PURE__ */ React68.createElement("div", {
        className: "modalMain"
      }, pointsWarn === 1 ? /* @__PURE__ */ React68.createElement(PointsWarn_default, {
        isLoading,
        handleNext: swapPointHandle
      }) : isLoading ? /* @__PURE__ */ React68.createElement(IsLoading, null) : /* @__PURE__ */ React68.createElement(React68.Fragment, null, /* @__PURE__ */ React68.createElement("div", {
        className: "balanceTitle"
      }, /* @__PURE__ */ React68.createElement("p", null, t("Balance"), ": ", /* @__PURE__ */ React68.createElement("strong", null, pointsBalanceStr)), /* @__PURE__ */ React68.createElement(PointsIcon, {
        isMobile: isMobile2,
        classname: "pointsIcon"
      })), /* @__PURE__ */ React68.createElement(PointsTable, {
        pointsList,
        chainId,
        onClick: swapPointHandle
      })))),
      pixel_height: 10
    }), /* @__PURE__ */ React68.createElement(DialogClose_default, {
      onClick: handleCancel
    }));
  },
  isEqual
);
var IsLoading = memo9(() => {
  const { t } = useCustomTranslation([LngNs.points]);
  return /* @__PURE__ */ React68.createElement("div", {
    className: "loading"
  }, /* @__PURE__ */ React68.createElement(LoadingButton_default, {
    isLoading: true,
    className: "loading_size4"
  }), /* @__PURE__ */ React68.createElement("p", null, t("IsLoadingText1")));
}, isEqual);
var PointsTable = memo9(
  ({ pointsList, chainId, onClick }) => {
    return /* @__PURE__ */ React68.createElement("div", {
      className: "table"
    }, pointsList.map((v, index) => /* @__PURE__ */ React68.createElement(PixelBorderCardButton, {
      pixel_height: 4,
      backgroundColor: "#343C4F",
      borderColor: "#484F60",
      key: v.index,
      onClick: () => onClick(index)
    }, /* @__PURE__ */ React68.createElement("div", {
      className: classnames4("points", `points_${v.index}`)
    }, /* @__PURE__ */ React68.createElement("h3", null, v.pointAmountStr), /* @__PURE__ */ React68.createElement("img", {
      className: "points_img",
      src: preStaticUrl + `/img/points/points_${v.index}.png`,
      alt: "points"
    }), /* @__PURE__ */ React68.createElement(ActivePixelCard, {
      backgroundColor: "#1649FF",
      className: "bottom",
      pixel_height: 4
    }, /* @__PURE__ */ React68.createElement("p", null, v.priceStr), /* @__PURE__ */ React68.createElement(CurrencyLogo_default, {
      className: "img",
      src: CurrencyLogo[chainId || 97]
    })), v.discount && /* @__PURE__ */ React68.createElement("div", {
      className: "discount"
    }, /* @__PURE__ */ React68.createElement("img", {
      className: "discount_img",
      src: preStaticUrl + `/img/points/discord.svg`,
      alt: "points"
    }), /* @__PURE__ */ React68.createElement("p", null, v.discount, "% ", /* @__PURE__ */ React68.createElement("br", null), "OFF"))))));
  },
  isEqual
);
var PointsDialog_default = PointsDialog;

// src/components/SideBar/index.tsx
import classnames6 from "classnames";
import React75, { memo as memo16, useMemo as useMemo12 } from "react";

// src/components/SideBar/component/CommunityLink.tsx
import React69, { memo as memo10 } from "react";
var CommunityLink = memo10(({ className }) => {
  return /* @__PURE__ */ React69.createElement("div", {
    className
  }, /* @__PURE__ */ React69.createElement("a", {
    href: "https://twitter.com/Zypher_Games",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React69.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/twitter.svg"
  })), /* @__PURE__ */ React69.createElement("a", {
    href: "https://discord.com/invite/MKJZhS4p2T",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React69.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/discord.svg"
  })), /* @__PURE__ */ React69.createElement("a", {
    href: "https://zyphergames.substack.com",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React69.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/medium.svg"
  })), /* @__PURE__ */ React69.createElement("a", {
    href: "https://github.com/zypher-game",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React69.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/github.svg"
  })), /* @__PURE__ */ React69.createElement("a", {
    href: "https://zyphergames.notion.site/Zypher-Games-101-58f3fc6362dc473db187dcec0b63e74e",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React69.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/gitbook.svg"
  })));
}, isEqual);
var CommunityLink_default = CommunityLink;

// src/components/SideBar/component/LinkItemA.tsx
import classnames5 from "classnames";
import React71, { memo as memo12, useCallback as useCallback19, useMemo as useMemo10 } from "react";
import { useRecoilValue as useRecoilValue5, useSetRecoilState as useSetRecoilState5 } from "recoil";

// src/components/Header/state.ts
import { atom as atom5 } from "recoil";
var siderCollapseState = atom5({
  key: "siderCollapseState",
  default: void 0,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")]
});

// src/components/SideBar/component/SmokeIndex.tsx
import React70, { memo as memo11 } from "react";
var SmokeIndex = memo11(() => {
  return /* @__PURE__ */ React70.createElement("div", {
    className: "h"
  }, /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }), /* @__PURE__ */ React70.createElement("div", {
    className: "c"
  }));
}, isEqual);
var SmokeIndex_default = SmokeIndex;

// src/components/SideBar/component/LinkItemA.tsx
var useLink = (link, isMobile2, useNavigate) => {
  const selectedKey = useRecoilValue5(defaultSelectedKey);
  const setDefaultSelectedKey = useSetRecoilState5(defaultSelectedKey);
  const setSiderCollapse = useSetRecoilState5(siderCollapseState);
  const navigate = useNavigate();
  const isOn = useMemo10(() => {
    if (selectedKey === link.keyValue) {
      return true;
    }
    return false;
  }, [selectedKey]);
  const linkClickHandle = useCallback19(
    (event) => {
      if (link.disabled) {
        return;
      }
      event.preventDefault();
      if (isMobile2) {
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
    [navigate, isMobile2]
  );
  return {
    isOn,
    linkClickHandle
  };
};
var LinkItem1 = memo12(
  ({
    className,
    className_on,
    isMobile: isMobile2,
    className_disable,
    className_imageContainer,
    useNavigate,
    ...link
  }) => {
    const { isOn, linkClickHandle } = useLink(link, isMobile2, useNavigate);
    return /* @__PURE__ */ React71.createElement("div", {
      onClick: linkClickHandle,
      className: classnames5(
        className,
        link.disabled ? className_disable : "",
        isOn ? className_on : ""
      )
    }, /* @__PURE__ */ React71.createElement("div", {
      className: className_imageContainer
    }, /* @__PURE__ */ React71.createElement("img", {
      src: preStaticUrl + `/img/layout/${link.icon}`
    })), /* @__PURE__ */ React71.createElement("p", null, link.label), isOn ? /* @__PURE__ */ React71.createElement(SmokeIndex_default, null) : null);
  },
  isEqual
);
var LinkItemA_default = LinkItem1;

// src/components/SideBar/component/SideBarActivitiesList.tsx
import React72, { memo as memo13, useMemo as useMemo11 } from "react";
var SideBarActivitiesList = memo13(
  ({
    className_on,
    className_list,
    className_listItemHorDisable,
    className_listItemHor,
    className_listItemVerDisable,
    className_listItemVer,
    list: list2,
    isMobile: isMobile2,
    useNavigate
  }) => {
    const { listItemDisable, listItem } = useMemo11(() => {
      if (isMobile2) {
        return {
          listItemDisable: className_listItemVerDisable,
          listItem: className_listItemVer
        };
      }
      return {
        listItemDisable: className_listItemHorDisable,
        listItem: className_listItemHor
      };
    }, [isMobile2]);
    return /* @__PURE__ */ React72.createElement("div", {
      className: className_list
    }, list2.map((v) => /* @__PURE__ */ React72.createElement(LinkItemA_default, {
      useNavigate,
      className_on,
      className_disable: listItemDisable,
      isMobile: isMobile2,
      key: v.keyValue,
      className: listItem,
      ...v
    })));
  },
  isEqual
);
var SideBarActivitiesList_default = SideBarActivitiesList;

// src/components/SideBar/component/SideBarGamesList.tsx
import React73, { memo as memo14 } from "react";
var SideBarGamesList = memo14(
  ({
    className_on,
    className_list,
    className_listItemDisable,
    className_listItem,
    className_imageContainer,
    useNavigate,
    list: list2,
    isMobile: isMobile2
  }) => {
    return /* @__PURE__ */ React73.createElement("div", {
      className: className_list
    }, list2.map((v) => /* @__PURE__ */ React73.createElement(LinkItemA_default, {
      useNavigate,
      isMobile: isMobile2,
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
import React74, { memo as memo15 } from "react";
var SideBarTitle = memo15(
  ({ className, logo_url_name, logo_title }) => {
    const { t } = useCustomTranslation([LngNs.siderBar]);
    return /* @__PURE__ */ React74.createElement("div", {
      className
    }, /* @__PURE__ */ React74.createElement("img", {
      src: preStaticUrl + `/img/layout/${logo_url_name}.svg`,
      title: t(logo_title)
    }), /* @__PURE__ */ React74.createElement("p", null, t(logo_title)));
  },
  isEqual
);
var SideBarTitle_default = SideBarTitle;

// src/components/SideBar/index.tsx
var ZypherLogo = memo16(({ isMobile: isMobile2 }) => {
  return /* @__PURE__ */ React75.createElement("a", {
    href: "/",
    target: "_black",
    className: "zypher_logo"
  }, isMobile2 ? /* @__PURE__ */ React75.createElement("img", {
    src: preStaticUrl + "/img/layout/logo-min.svg"
  }) : /* @__PURE__ */ React75.createElement("img", {
    src: preStaticUrl + "/img/tvl/logo.svg"
  }), /* @__PURE__ */ React75.createElement("img", {
    src: preStaticUrl + "/img/layout/ai.svg"
  }));
});
var SideBar = (props) => {
  const { isMobile: isMobile2, useNavigate } = props;
  const items = useNavItem();
  usePathname();
  const {
    sideBarGamesLinkList,
    sideBarActivitiesLinkList
  } = useMemo12(() => {
    return {
      sideBarGamesLinkList: items.filter((v) => v.type === "Games" /* Games */),
      sideBarActivitiesLinkList: items.filter(
        (v) => !isMobile2 ? v.type === "Activities" /* Activities */ && v.keyValue !== "1" : v.type === "Activities" /* Activities */
      )
    };
  }, [items, isMobile2]);
  return /* @__PURE__ */ React75.createElement("div", {
    className: classnames6(`${props.className}`, "sidebarWrap")
  }, /* @__PURE__ */ React75.createElement("div", {
    className: "sidebar"
  }, isMobile2 ? null : /* @__PURE__ */ React75.createElement(React75.Fragment, null, /* @__PURE__ */ React75.createElement(LinkItemA_default, {
    className_on: "item_on",
    className_disable: "horListItemDisable",
    className: "horListItem",
    isMobile: isMobile2,
    useNavigate,
    ...items[0]
  }), /* @__PURE__ */ React75.createElement("div", {
    className: "line"
  })), /* @__PURE__ */ React75.createElement(SideBarTitle_default, {
    logo_title: "Games",
    logo_url_name: "games",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React75.createElement(SideBarGamesList_default, {
    className_on: "item_on",
    className_list: "gamelist",
    className_listItem: "verListItem",
    className_listItemDisable: "verListItemDisable",
    list: sideBarGamesLinkList,
    isMobile: isMobile2,
    useNavigate,
    className_imageContainer: "imageContainerWaves"
  }), /* @__PURE__ */ React75.createElement("div", {
    className: "line"
  }), /* @__PURE__ */ React75.createElement(SideBarTitle_default, {
    logo_title: "Activities",
    logo_url_name: "activities",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React75.createElement(SideBarActivitiesList_default, {
    useNavigate,
    isMobile: isMobile2,
    className_on: "item_on",
    className_list: "activitiesList",
    className_listItemHorDisable: "horListItemDisable",
    className_listItemHor: "horListItem",
    className_listItemVerDisable: "verListItemDisable",
    className_listItemVer: "verListItem",
    list: sideBarActivitiesLinkList
  }), /* @__PURE__ */ React75.createElement("div", {
    className: "line"
  }), /* @__PURE__ */ React75.createElement(SideBarTitle_default, {
    logo_title: "Language",
    logo_url_name: "language",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React75.createElement(Language_default, {
    type: "side"
  }), /* @__PURE__ */ React75.createElement("div", {
    className: "line"
  }), /* @__PURE__ */ React75.createElement(SideBarTitle_default, {
    logo_title: "Links",
    logo_url_name: "links",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React75.createElement(CommunityLink_default, {
    className: "communityLink"
  })));
};
var SideBar_default = SideBar;

// src/components/DivWrap/DivWrap.tsx
import React76, { memo as memo17 } from "react";
var DivWrap = memo17(
  ({
    className,
    showDiv,
    children
  }) => {
    return showDiv ? /* @__PURE__ */ React76.createElement("div", {
      className
    }, " ", children) : /* @__PURE__ */ React76.createElement(React76.Fragment, null, children);
  },
  isEqual
);
var DivWrap_default = DivWrap;

// src/components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog.tsx
import { WarningOutlined } from "@ant-design/icons";
import classnames8 from "classnames";
import React78, { memo as memo19, useCallback as useCallback21, useEffect as useEffect22, useMemo as useMemo13 } from "react";
import { useRecoilState as useRecoilState6 } from "recoil";
import styled3 from "styled-components";

// src/components/ConnectWallet/components/DialogComponents/DialogTitle.tsx
import classnames7 from "classnames";
import React77, { memo as memo18, useCallback as useCallback20 } from "react";
var DialogTitle = memo18(
  ({ label, setDialogOpen, children, classNames }) => {
    const closeHandle = useCallback20(() => {
      setDialogOpen(false);
    }, [setDialogOpen]);
    return /* @__PURE__ */ React77.createElement("div", {
      className: classnames7("dialog_title_modalTitleInner", classNames)
    }, /* @__PURE__ */ React77.createElement("p", {
      className: "dialog_title_title"
    }, label), children ? children : null, /* @__PURE__ */ React77.createElement("span", {
      onClick: closeHandle
    }, /* @__PURE__ */ React77.createElement(icons_default, {
      name: "close"
    })));
  }
);
var DialogTitle_default = DialogTitle;

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
var Content = styled3.div`
  text-align: center;
  padding: 50px;
`;
var DialogButton = styled3.div`
  border-radius: 12px;
  background: #1649ff;
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
var Text2 = styled3.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-top: 30px;
`;
var LinkToBetaDialog = memo19(() => {
  const { t } = useCustomTranslation([LngNs.common]);
  const [linkToBetaDialogOpen, setLinkToBetaDialogOpen] = useRecoilState6(
    linkToBetaDialogState
  );
  const [linkToBetaDialogChainId, setLinkToBetaDialogChainId] = useRecoilState6(
    linkToBetaDialogChainIdState
  );
  const isMobile2 = useIsMobile();
  const ToUrlName = useMemo13(() => {
    if (linkToBetaDialogChainId) {
      if (linkToBetaDialogChainId === 9980 /* Combo */) {
        return ["https://app.zypher.game/2048/"];
      }
      return getChainNameText(linkToBetaDialogChainId);
    }
    return "";
  }, [linkToBetaDialogChainId]);
  const handleButtonClick = useCallback21(() => {
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
  useEffect22(() => {
    if (!linkToBetaDialogOpen) {
      setLinkToBetaDialogChainId(void 0);
    }
  }, [linkToBetaDialogOpen]);
  return /* @__PURE__ */ React78.createElement(Modal_default, {
    open: linkToBetaDialogOpen,
    onCancel: () => setLinkToBetaDialogOpen(false),
    footer: null,
    wrapClassName: classnames8("customDialog"),
    destroyOnClose: true,
    closable: false,
    width: isMobile2 ? "100%" : 360,
    centered: isMobile2 ? false : true
  }, /* @__PURE__ */ React78.createElement(DialogTitle_default, {
    label: t("Switch Networks"),
    setDialogOpen: setLinkToBetaDialogOpen,
    classNames: isMobile2 ? "modalTitleInner" : ""
  }), /* @__PURE__ */ React78.createElement(Content, null, /* @__PURE__ */ React78.createElement(WarningOutlined, {
    style: { color: "#1649FF", fontSize: "50px" }
  }), /* @__PURE__ */ React78.createElement(Text2, null, linkToBetaDialogChainId === 9980 /* Combo */ ? "Combo is currently only deployed in 2048." : t("linkToBeta", {
    chainName: linkToBetaDialogChainId ? ChainName[linkToBetaDialogChainId] : "",
    toUrlName: ToUrlName[1]
  }))), /* @__PURE__ */ React78.createElement("div", {
    style: { padding: "0 20px 30px" }
  }, /* @__PURE__ */ React78.createElement(DialogButton, {
    onClick: handleButtonClick
  }, linkToBetaDialogChainId === 9980 /* Combo */ ? "Go to Play 2048" : t("GotoVersion", {
    toUrlName: ToUrlName[0]
  }))));
}, isEqual);
var LinkToBetaDialog_default = LinkToBetaDialog;

// src/components/Header/header.tsx
import classnames11 from "classnames";
import React93, { useEffect as useEffect26 } from "react";
import { useRecoilValue as useRecoilValue8, useSetRecoilState as useSetRecoilState11 } from "recoil";

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
import React92, { memo as memo30, useMemo as useMemo16 } from "react";

// src/components/Header/rainbow_account/rainbow_account.tsx
import React90, { memo as memo28, useCallback as useCallback27 } from "react";
import { useSetRecoilState as useSetRecoilState9 } from "recoil";

// src/components/ConnectWallet/components/Balance/Balance.tsx
import { SyncOutlined } from "@ant-design/icons";
import BigNumberjs3 from "bignumber.js";
import React82, { memo as memo23, useCallback as useCallback23, useEffect as useEffect24, useState as useState18 } from "react";
import { useRecoilValue as useRecoilValue6, useSetRecoilState as useSetRecoilState7 } from "recoil";
import styled4 from "styled-components";

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
import React81, { memo as memo22, useCallback as useCallback22, useEffect as useEffect23 } from "react";

// src/components/ConnectWallet/components/PointsDialog/GetPointsSuccess.tsx
import React79, { memo as memo20 } from "react";
import { useRecoilState as useRecoilState7 } from "recoil";
var GetPointsSuccess = memo20(() => {
  const [show] = useRecoilState7(pointsAnimState);
  if (show) {
    return /* @__PURE__ */ React79.createElement("div", {
      className: "getpointpoints"
    }, new Array(3).fill("").map((c, index) => /* @__PURE__ */ React79.createElement(PointsItem, {
      key: index
    })));
  }
  return null;
}, isEqual);
var PointsItem = () => {
  return /* @__PURE__ */ React79.createElement("div", {
    className: "getpointcoin"
  }, /* @__PURE__ */ React79.createElement("div", {
    className: "getpointcoin_front"
  }, /* @__PURE__ */ React79.createElement("img", {
    src: preStaticUrl + "/img/layout/Star.png",
    alt: "star"
  })), /* @__PURE__ */ React79.createElement("div", {
    className: "getpointcoin_middle"
  }), /* @__PURE__ */ React79.createElement("div", {
    className: "getpointcoin_back"
  }, /* @__PURE__ */ React79.createElement("img", {
    src: preStaticUrl + "/img/layout/Star.png",
    alt: "star"
  })));
};
var GetPointsSuccess_default = GetPointsSuccess;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
import { useRecoilState as useRecoilState8, useSetRecoilState as useSetRecoilState6 } from "recoil";

// src/components/Header/rainbow_account/IsPixelWidget.tsx
import React80, { memo as memo21 } from "react";
var IsPixelWidget = memo21(
  ({
    className,
    type,
    children,
    onClick
  }) => {
    return type === "pixel" ? /* @__PURE__ */ React80.createElement(PixelFlatBtn_default, {
      className: `pixel_border ${className != null ? className : ""}`,
      onClick
    }, children) : /* @__PURE__ */ React80.createElement("div", {
      className,
      onClick
    }, " ", children);
  }
);
var IsPixelWidget_default = IsPixelWidget;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
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
    const onClickHandle = useCallback22(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return /* @__PURE__ */ React81.createElement(IsPixelWidget_default, {
      type,
      className: `balance_item_balance
        ${className != null ? className : ""}
        ${type === "pixel" ? "balance_item_balance_pixel" : ""}`,
      onClick: onClickHandle
    }, preChild, loading ? /* @__PURE__ */ React81.createElement(LoadingOutlined, null) : /* @__PURE__ */ React81.createElement(React81.Fragment, null, CountupNumber && (balance || balance === 0) ? /* @__PURE__ */ React81.createElement(CountupNumber, {
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
    const setPointsAnimState = useSetRecoilState6(pointsAnimState);
    const [mount, setMount] = useRecoilState8(pointsAnimNumState);
    const onClickHandle = useCallback22(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    useEffect23(() => {
      if (mount === 1) {
        setPointsAnimState(true);
        setTimeout(() => {
          setPointsAnimState(false);
          setMount(0);
        }, 3e3);
      }
    }, [mount]);
    return /* @__PURE__ */ React81.createElement(IsPixelWidget_default, {
      className: `balance_item_balance_point balance_item_balance 
        ${className != null ? className : ""}
        ${type === "pixel" ? "balance_item_balance_pixel" : ""}`,
      onClick: onClickHandle,
      type
    }, preChild, loading ? /* @__PURE__ */ React81.createElement(LoadingOutlined, null) : /* @__PURE__ */ React81.createElement(React81.Fragment, null, CountupNumber && (balance || balance === 0) ? /* @__PURE__ */ React81.createElement(CountupNumber, {
      value: balance,
      decimals: 0,
      duration: 1.5,
      showDiv: false
    }) : balanceStr, logo), /* @__PURE__ */ React81.createElement(GetPointsSuccess_default, null));
  },
  isEqual
);
var balanceItem_default = BalanceItem;

// src/components/ConnectWallet/components/Balance/Balance.tsx
var AddIcon = styled4(icons_default)`
  margin-right: ${({ isMobile: isMobile2 }) => isMobile2 ? "4px" : "10px"};
  margin-left: 0 !important;
  width: ${({ isMobile: isMobile2 }) => isMobile2 ? "20px" : "24px"};
`;
var Balance = memo23((props) => {
  const { showPointsModal, isMobile: isMobile2, env, CountupNumber, type } = props;
  const { chainId, account, provider } = useActiveWeb3React();
  const [loading, setLoading] = useState18(false);
  const setNativeBalance = useSetRecoilState7(nativeBalanceState);
  const setPointsBalance = useSetRecoilState7(pointsBalanceState);
  const refreshBalance = useRecoilValue6(refreshBalanceState);
  const fetchBalanceOf = useCallback23(async () => {
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
  const fetchErc20Balance = useCallback23(async () => {
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
  useEffect24(() => {
    if (account && chainId) {
      fetchBalanceOf();
    }
  }, [account, chainId, refreshBalance]);
  const pointsBalance = useRecoilValue6(pointsBalanceState);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  return /* @__PURE__ */ React82.createElement(React82.Fragment, null, /* @__PURE__ */ React82.createElement(IsPixelWidget_default, {
    type,
    className: `refresh_balance ${type === "pixel" ? "refresh_balance_pixel" : ""}`,
    onClick: fetchBalanceOf
  }, /* @__PURE__ */ React82.createElement(SyncOutlined, null)), DPSupportChainId.includes(chainId) ? /* @__PURE__ */ React82.createElement(BalanceCountUpItem, {
    onClick: showPointsModal,
    logo: /* @__PURE__ */ React82.createElement(PointsIcon, {
      isMobile: isMobile2
    }),
    balance: pointsBalance,
    loading,
    className: props.className,
    CountupNumber,
    preChild: /* @__PURE__ */ React82.createElement(AddIcon, {
      name: "pixel_add",
      isMobile: isMobile2
    }),
    balanceStr: pointsBalanceStr,
    type
  }) : null, !isMobile2 && /* @__PURE__ */ React82.createElement(balanceItem_default, {
    logo: /* @__PURE__ */ React82.createElement(CurrencyLogo_default, {
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

// src/components/ConnectWallet/components/ChainSelector/ChainSelectorWidget.tsx
import React83, { memo as memo24, useCallback as useCallback24 } from "react";
import styled5 from "styled-components";
import { useRecoilState as useRecoilState9 } from "recoil";
var StatusI = styled5.i`
  box-sizing: content-box;
  display: inline-block;
  width: ${({ isMobile: isMobile2 }) => isMobile2 ? "5px" : "6px"};
  height: ${({ isMobile: isMobile2 }) => isMobile2 ? "5px" : "6px"};
  background-color: #65edbc;
  margin-left: ${({ isMobile: isMobile2 }) => isMobile2 ? "4px" : "10px"};
  border-radius: 50%;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${({ isMobile: isMobile2 }) => isMobile2 ? "-2px" : "-3px"};
    left: ${({ isMobile: isMobile2 }) => isMobile2 ? "-2px" : "-3px"};
    border: ${({ isMobile: isMobile2 }) => isMobile2 ? "2px" : "3px"} solid
      rgba(101, 237, 188, 0.19);
    box-sizing: content-box;
    border-radius: 50%;
  }
`;
var ChainSelectorWidget = memo24(({ className, type }) => {
  const { chainId } = useActiveWeb3React();
  const isMobile2 = useIsMobile();
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState9(
    accountInfoDialogState
  );
  const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState9(pointsDialogState);
  const [siderCollapse, setSiderCollapse] = useRecoilState9(siderCollapseState);
  const { openChainModal } = useChainModal();
  const openChainModalHandle = useCallback24(() => {
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
  return chainId ? /* @__PURE__ */ React83.createElement(IsPixelWidget_default, {
    type,
    onClick: openChainModalHandle
  }, /* @__PURE__ */ React83.createElement("div", {
    className: `ChainSelectorWidgetWrapper ${className != null ? className : ""}`
  }, /* @__PURE__ */ React83.createElement("div", {
    className: "img"
  }, /* @__PURE__ */ React83.createElement("img", {
    src: ChainImage[chainId],
    alt: ChainName[chainId]
  }), /* @__PURE__ */ React83.createElement("p", null, ChainName[chainId])), /* @__PURE__ */ React83.createElement(StatusI, {
    isMobile: isMobile2
  }))) : null;
}, isEqual);
var ChainSelectorWidget_default = ChainSelectorWidget;

// src/components/ConnectWallet/components/PointsDialog/PointsRuleDialog.tsx
import { DialogContent as DialogContent3, DialogOverlay as DialogOverlay2 } from "@reach/dialog";
import React84, { useCallback as useCallback25 } from "react";
import { useRecoilValue as useRecoilValue7, useSetRecoilState as useSetRecoilState8 } from "recoil";
import { Trans } from "react-i18next";
var PointsRuleDialog = () => {
  const { t } = useCustomTranslation([LngNs.points]);
  const isModalOpen = useRecoilValue7(pointsRuleDialogState);
  const setIsModalOpen = useSetRecoilState8(pointsRuleDialogState);
  const handleCancel = useCallback25(() => {
    setIsModalOpen(false);
  }, []);
  return /* @__PURE__ */ React84.createElement(React84.Fragment, null, /* @__PURE__ */ React84.createElement(DialogOverlay2, {
    isOpen: isModalOpen,
    onDismiss: handleCancel,
    className: "points_dialog_zindex"
  }, /* @__PURE__ */ React84.createElement(DialogContent3, {
    className: "points_dialog_dialogContent"
  }, /* @__PURE__ */ React84.createElement(PixelTable, {
    backgroundColor: "#1D263B",
    header_children: /* @__PURE__ */ React84.createElement("p", {
      className: "modalTitleInnerTitle"
    }, t("Rules")),
    body_children: /* @__PURE__ */ React84.createElement(React84.Fragment, null, /* @__PURE__ */ React84.createElement("div", {
      className: "points_dialog_dialogContainer"
    }, /* @__PURE__ */ React84.createElement("h4", null, t("PointsRuleText01")), /* @__PURE__ */ React84.createElement("p", null, t("PointsRuleText02")), /* @__PURE__ */ React84.createElement("p", null, /* @__PURE__ */ React84.createElement("em", null), /* @__PURE__ */ React84.createElement("i", null, t("PointsRuleText03")), /* @__PURE__ */ React84.createElement("br", null), /* @__PURE__ */ React84.createElement("em", null), /* @__PURE__ */ React84.createElement("i", null, t("PointsRuleText04")), /* @__PURE__ */ React84.createElement("br", null), /* @__PURE__ */ React84.createElement("em", null), /* @__PURE__ */ React84.createElement("i", null, t("PointsRuleText04")), /* @__PURE__ */ React84.createElement("br", null), /* @__PURE__ */ React84.createElement("em", null), " ", /* @__PURE__ */ React84.createElement("i", null, t("PointsRuleText06"))), /* @__PURE__ */ React84.createElement("p", null, /* @__PURE__ */ React84.createElement(Trans, {
      i18nKey: "PointsRuleText07",
      defaults: t("PointsRuleText07"),
      values: { Link: t("Link") },
      components: { bold: /* @__PURE__ */ React84.createElement("strong", null) }
    })), /* @__PURE__ */ React84.createElement("h4", null, t("PointsRuleText09")), /* @__PURE__ */ React84.createElement("p", null, /* @__PURE__ */ React84.createElement(Trans, {
      i18nKey: "PointsRuleText10",
      defaults: t("PointsRuleText10")
    }, /* @__PURE__ */ React84.createElement("a", {
      href: "https://discord.com/invite/MKJZhS4p2T",
      target: "_blank",
      className: "points_dialog_fontWhite",
      rel: "noreferrer"
    }, "Discord")))), /* @__PURE__ */ React84.createElement("div", {
      className: "points_dialog_btnWrap"
    }, /* @__PURE__ */ React84.createElement(ActivePixelButtonColor, {
      onClick: handleCancel,
      width: "340px",
      height: "52px",
      pixel_height: 4,
      backgroundColor: "#1649FF",
      borderBottomColor: "#0F33B2",
      borderTopColor: "#3360FF"
    }, t("Ok")))),
    pixel_height: 10
  }), /* @__PURE__ */ React84.createElement(DialogClose_default, {
    onClick: handleCancel
  }))));
};
var PointsRuleDialog_default = PointsRuleDialog;

// src/components/PlayerAvatar/index.tsx
import cx from "classnames";
import React86 from "react";
import styled7 from "styled-components";

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
import React85 from "react";
import styled6, { css } from "styled-components";
var IsPixelWidgetStyled = styled6(IsPixelWidget_default)`
  width: ${({ size }) => size}px !important;
  height: ${({ size }) => size}px !important;
  border-radius: ${({ type }) => type === "pixel" ? "0" : "50%"};
  overflow: hidden;
  ${({ type, style: style10 }) => type === "other" && style10 && css`
      ${style10}
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
    ${({ type, style: style10 }) => type === "pixel" && style10 && css`
        ${style10}
      `};
  }
`;
var Avatar2 = ({
  src: src6,
  altText,
  style: style10 = {},
  size = 64,
  type = "other"
}) => {
  return /* @__PURE__ */ React85.createElement(IsPixelWidgetStyled, {
    type,
    size,
    style: style10
  }, /* @__PURE__ */ React85.createElement("img", {
    src: src6,
    alt: altText
  }));
};
var Avatar_default = Avatar2;

// src/components/PlayerAvatar/index.tsx
var PlayerAvatar = ({
  account,
  showAccount = false,
  size = 60,
  border = false,
  AvatarBorder = React86.Fragment,
  AccountTextFrComp = React86.Fragment,
  className,
  preLen,
  endLen,
  otherStr,
  type = "other"
}) => {
  const { t } = useCustomTranslation([LngNs.zBingo]);
  const { selectedAvatar, selectedBackground } = generateAvatar_default(account);
  return /* @__PURE__ */ React86.createElement("div", {
    className: cx(className, "player_playerAvatar")
  }, account ? /* @__PURE__ */ React86.createElement(AvatarBorder, null, /* @__PURE__ */ React86.createElement(Avatar_default, {
    type,
    size,
    src: selectedAvatar,
    style: border ? {
      background: selectedBackground,
      border: "2px solid #62380C"
    } : { background: selectedBackground }
  })) : /* @__PURE__ */ React86.createElement("div", {
    className: "player_avatar",
    style: {
      width: `${size}px`,
      height: `${size}px`,
      overflow: "hidden",
      background: "rgba(138, 138, 138, 1)"
    }
  }, /* @__PURE__ */ React86.createElement(Avatar_default, {
    size,
    src: preStaticUrl + `/img/default_avatar.png`
  })), showAccount && /* @__PURE__ */ React86.createElement("p", {
    className: (className == null ? void 0 : className.includes("account")) ? "player_avatar_account" : ""
  }, account ? `${getShortenAddress(account, preLen, endLen)}${otherStr ? ` ${otherStr}` : ""}` : t("waiting"), /* @__PURE__ */ React86.createElement(AccountTextFrComp, null)));
};
var OuterCircle = styled7.div`
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
  return /* @__PURE__ */ React86.createElement(OuterCircle, {
    size,
    isGreen,
    isGrey,
    winner
  }, /* @__PURE__ */ React86.createElement("div", {
    className: "center-circle "
  }, /* @__PURE__ */ React86.createElement("div", {
    className: "inner-circle"
  }, account ? /* @__PURE__ */ React86.createElement("img", {
    width: "100%",
    src: selectedAvatar,
    style: { background: selectedBackground }
  }) : /* @__PURE__ */ React86.createElement("img", {
    width: "100%",
    src: preStaticUrl + `/img/default_avatar.png`
  }))));
};
var PlayerAvatar_default = PlayerAvatar;

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import classnames10 from "classnames";
import React89, { memo as memo27, useCallback as useCallback26, useEffect as useEffect25, useState as useState19 } from "react";
import { useRecoilState as useRecoilState10 } from "recoil";

// src/hooks/useActiveWallet.ts
import { useMemo as useMemo14 } from "react";
var useActiveWallet = () => {
  const wallets = useWalletConnectors();
  return useMemo14(() => {
    if (wallets) {
      const wall = wallets.filter((v) => v.ready && v.recent);
      return wall == null ? void 0 : wall[0];
    }
    return void 0;
  }, [wallets]);
};

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
import classnames9 from "classnames";
import React88, { memo as memo26, useMemo as useMemo15 } from "react";

// src/components/ConnectWallet/components/AccountInfoDialog/components/PcUserInfo.tsx
import React87, { memo as memo25 } from "react";
var PcUserInfo = memo25(
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
    const src6 = useAsyncImage(connectIcon);
    return /* @__PURE__ */ React87.createElement("div", {
      className: "pc_user_pc_content"
    }, /* @__PURE__ */ React87.createElement("div", {
      className: "pc_user_box"
    }, /* @__PURE__ */ React87.createElement("div", {
      className: "pc_user_tit"
    }, t(
      "Connected with",
      {
        walletName: connectName
      }
    )), /* @__PURE__ */ React87.createElement("div", {
      className: "pc_user_info"
    }, connectIcon && /* @__PURE__ */ React87.createElement("img", {
      src: src6,
      alt: connectName
    }), /* @__PURE__ */ React87.createElement("div", {
      className: "pc_user_text"
    }, getShortenAddress(account)), /* @__PURE__ */ React87.createElement("span", {
      onClick: () => copy(account)
    }, /* @__PURE__ */ React87.createElement(icons_default, {
      name: "copy"
    })), BlockExplorerUrls[chainId] && /* @__PURE__ */ React87.createElement("a", {
      href: `${(_a = BlockExplorerUrls[chainId]) != null ? _a : [0]}/address/${account}`,
      target: "_blank",
      rel: "noreferrer"
    }, /* @__PURE__ */ React87.createElement(icons_default, {
      name: "link"
    })))), /* @__PURE__ */ React87.createElement(DisconnectBtn, {
      cancel
    }));
  },
  isEqual
);
var DisconnectBtn = memo25(({ cancel }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  return /* @__PURE__ */ React87.createElement("p", {
    className: "pc_user_disconnect_btn",
    onClick: cancel
  }, t("Disconnect"));
}, isEqual);
var PcUserInfo_default = PcUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
var MUserInfo = memo26(({ account, chainId, cancel, type }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  const isMobile2 = useIsMobile();
  const list2 = useMemo15(() => {
    return [
      {
        balanceStr: pointsBalanceStr,
        logo: /* @__PURE__ */ React88.createElement(PointsIcon, {
          isMobile: isMobile2
        }),
        symbol: "Gold Points"
      },
      {
        balanceStr: nativeBalanceStr,
        logo: /* @__PURE__ */ React88.createElement(CurrencyLogo_default, {
          className: "m_user_img",
          src: CurrencyLogo[chainId]
        }),
        symbol: Currency[chainId]
      }
    ];
  }, []);
  return /* @__PURE__ */ React88.createElement("div", {
    className: "m_user_m_content"
  }, /* @__PURE__ */ React88.createElement(ChainSelectorWidget_default, {
    type,
    className: classnames9("m_user_border", "m_user_chain")
  }), /* @__PURE__ */ React88.createElement("div", {
    className: "m_user_border"
  }, /* @__PURE__ */ React88.createElement("p", {
    className: "m_user_tit"
  }, t("Your Wallet")), /* @__PURE__ */ React88.createElement("div", {
    className: "m_user_userInfoInner"
  }, /* @__PURE__ */ React88.createElement(PlayerAvatar_default, {
    className: "m_user_account",
    account,
    size: 24,
    showAccount: true
  }), /* @__PURE__ */ React88.createElement(DisconnectBtn, {
    cancel
  })), /* @__PURE__ */ React88.createElement("div", {
    className: "m_user_balance"
  }, list2.map((v) => /* @__PURE__ */ React88.createElement("div", {
    key: v.symbol,
    className: "m_user_item"
  }, /* @__PURE__ */ React88.createElement("div", {
    className: "m_user_fl"
  }, v.logo, /* @__PURE__ */ React88.createElement("p", null, v.symbol)), /* @__PURE__ */ React88.createElement("p", null, v.balanceStr))))));
}, isEqual);
var MUserInfo_default = MUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import { useDisconnect as useDisconnect4 } from "wagmi";
var AccountInfoDialog = memo27(
  ({ copy, type }) => {
    const { t } = useCustomTranslation([LngNs.common]);
    const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState10(
      accountInfoDialogState
    );
    const { account, chainId } = useActiveWeb3React();
    const isMobile2 = useIsMd1100();
    const { disconnect } = useDisconnect4();
    const wallet = useActiveWallet();
    const cancel = useCallback26(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
    }, [disconnect]);
    useEffect25(() => {
      if (accountInfoDialogOpen && isMobile2) {
        setAccountInfoDialogOpen(false);
      }
    }, [isMobile2]);
    return account && chainId ? /* @__PURE__ */ React89.createElement(React89.Fragment, null, /* @__PURE__ */ React89.createElement(Modal_default, {
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
      width: isMobile2 ? "100%" : 440,
      centered: isMobile2 ? false : true,
      transitionName: isMobile2 ? "ant-slide-down" : void 0
    }, /* @__PURE__ */ React89.createElement(DialogTitle_default, {
      label: t("Your Wallet"),
      setDialogOpen: setAccountInfoDialogOpen,
      classNames: isMobile2 ? "modalTitleInner" : ""
    }), /* @__PURE__ */ React89.createElement("div", {
      className: "account_info_dialog_modalMain"
    }, isMobile2 ? /* @__PURE__ */ React89.createElement(MUserInfo_default, {
      copy,
      account,
      chainId,
      cancel,
      type: "other"
    }) : /* @__PURE__ */ React89.createElement(PcUserInfo_default, {
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
var AddressWrapPop = memo27(
  ({ copy }) => {
    const [index, setIndex] = useState19();
    const { account, chainId } = useActiveWeb3React();
    const { disconnect } = useDisconnect4();
    const [, setAccountInfoDialogOpen] = useRecoilState10(accountInfoDialogState);
    useEffect25(() => {
      if (index || index === 0) {
        setTimeout(() => {
          setIndex(void 0);
        }, 2e3);
      }
    }, [index]);
    const copyAddressHandle = useCallback26(() => {
      copy(account);
      setIndex(0);
    }, [account]);
    const openHandle = useCallback26(() => {
      var _a;
      window.open(
        `${(_a = BlockExplorerUrls[chainId]) != null ? _a : [0]}/address/${account}`,
        "_blank"
      );
      setIndex(1);
    }, [account, chainId]);
    const cancelHandle = useCallback26(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
      setIndex(2);
    }, [disconnect]);
    return /* @__PURE__ */ React89.createElement(PixelBorderCard, {
      className: "address_wrap_pop",
      pixel_height: 4,
      backgroundColor: "#1D263B",
      borderColor: "#3A4254"
    }, /* @__PURE__ */ React89.createElement(AddressWrapPopItem, {
      iconName: "pixel_copy",
      label: "Copy address",
      onClick: copyAddressHandle,
      on: index === 0
    }), /* @__PURE__ */ React89.createElement(AddressWrapPopItem, {
      iconName: "pixel_blackchain",
      label: "Blackchain Explorer",
      onClick: openHandle,
      on: index === 1
    }), /* @__PURE__ */ React89.createElement(AddressWrapPopItem, {
      iconName: "pixel_disconnect",
      label: "Disconnect",
      onClick: cancelHandle,
      on: index === 2
    }));
  }
);
var AddressWrapPopItem = memo27(
  ({
    iconName,
    label,
    onClick,
    on
  }) => {
    return /* @__PURE__ */ React89.createElement(PixelCube2, {
      className: `address_wrap_pop_item ${on ? "on" : ""}`,
      onClick,
      pixel_height: 3,
      backgroundColor: "#1D263B",
      borderColor: "#1D263B",
      width: "100%",
      height: "36px"
    }, /* @__PURE__ */ React89.createElement(icons_default, {
      name: iconName
    }), /* @__PURE__ */ React89.createElement("p", null, label));
  }
);
var AccountInfoDialog_default = AccountInfoDialog;

// src/components/Header/rainbow_account/rainbow_account.tsx
var Account = memo28(
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
    const isMobile2 = useIsMd1100();
    const setPointsDialogState = useSetRecoilState9(pointsDialogState);
    const showPointsModal = useCallback27(() => {
      setPointsDialogState(true);
    }, [setPointsDialogState]);
    const setAccountInfoDialogState = useSetRecoilState9(accountInfoDialogState);
    const showLogoutModal = useCallback27(() => {
      setAccountInfoDialogState(true);
    }, [setAccountInfoDialogState]);
    const { account } = useActiveWeb3React(env, supportedChainList);
    return /* @__PURE__ */ React90.createElement(React90.Fragment, null, /* @__PURE__ */ React90.createElement(Balance_default, {
      CountupNumber,
      env,
      isMobile: isMobile2,
      showPointsModal,
      type
    }), /* @__PURE__ */ React90.createElement(IsPixelWidget_default, {
      type,
      className: "address_wrap",
      onClick: showLogoutModal
    }, /* @__PURE__ */ React90.createElement(PlayerAvatar_default, {
      className: "account",
      account,
      size: isMobile2 ? 26 : 40,
      showAccount: isMobile2 ? false : true,
      type
    }), type === "pixel" ? /* @__PURE__ */ React90.createElement(AddressWrapPop, {
      copy,
      type
    }) : null), !isMobile2 && /* @__PURE__ */ React90.createElement(ChainSelectorWidget_default, {
      type
    }), type !== "pixel" ? /* @__PURE__ */ React90.createElement(AccountInfoDialog_default, {
      copy,
      type
    }) : null, /* @__PURE__ */ React90.createElement(PointsDialog_default, {
      env,
      dispatch,
      setSuccessToast,
      setErrorToast
    }), /* @__PURE__ */ React90.createElement(PointsRuleDialog_default, null));
  },
  isEqual
);
var rainbow_account_default = Account;

// src/components/Header/rainbow_account/WrongNetwork.tsx
import React91, { memo as memo29 } from "react";
import { useSetRecoilState as useSetRecoilState10 } from "recoil";
var WrongNetwork = memo29(({ type }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const { openChainModal } = useChainModal();
  const setAccountInfoDialogOpen = useSetRecoilState10(accountInfoDialogState);
  return /* @__PURE__ */ React91.createElement(IsPixelWidget_default, {
    type,
    onClick: () => {
      if (openChainModal) {
        openChainModal();
        setAccountInfoDialogOpen(false);
      }
    },
    className: "connect_connect"
  }, /* @__PURE__ */ React91.createElement("p", null, t("Wrong network")));
}, isEqual);
var WrongNetwork_default = WrongNetwork;

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
var RainbowConnectWallet = memo30((props) => {
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
  const isPathLocation = useMemo16(() => {
    if (window.location.href.indexOf("/bingo/") > -1) {
      return true;
    }
    const arr = location2.pathname.split("/");
    return arr[1] === "play" || arr[1] === "zBingo" || arr[1] === "monster";
  }, [location2]);
  return /* @__PURE__ */ React92.createElement("div", {
    className: `
      ${type === "pixel" ? "connect_pixel_connectWallet" : "connect_connectWallet"}
        ${type === "other" && isPathLocation ? "connect_bgWallet" : ""}
        ${className != null ? className : ""}
        `
  }, /* @__PURE__ */ React92.createElement(ConnectButton.Custom, null, ({ chain, openConnectModal, mounted }) => {
    return /* @__PURE__ */ React92.createElement(React92.Fragment, null, !mounted || !chain ? /* @__PURE__ */ React92.createElement(IsPixelWidget_default, {
      type,
      onClick: openConnectModal,
      className: "connect_connect"
    }, /* @__PURE__ */ React92.createElement("p", null, t("Connect Wallet"))) : chain && (chain.unsupported || !supportedChainIds(env, supportedChainList).includes(
      chain.id
    )) ? /* @__PURE__ */ React92.createElement(WrongNetwork_default, {
      type
    }) : /* @__PURE__ */ React92.createElement(rainbow_account_default, {
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
  }), showLang ? /* @__PURE__ */ React92.createElement(Language_default, {
    type: type === "pixel" ? type : "top"
  }) : null);
}, isEqual);
var rainbow_connectWallet_default = RainbowConnectWallet;

// src/components/Header/header.tsx
var Header = (props) => {
  const isMobile2 = useIsMd1100();
  const setSiderCollapse = useSetRecoilState11(siderCollapseState);
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
  useEffect26(() => {
    if (isMobile2 && collapsed === void 0) {
      setSiderCollapse(true);
    }
  }, [isMobile2]);
  return /* @__PURE__ */ React93.createElement("header", {
    className: classnames11("header_header", props.className),
    style: { position: "sticky", top: 0, zIndex: 9, width: "100%" }
  }, type === "pixel" || type === "other" && isMobile2 ? /* @__PURE__ */ React93.createElement("div", {
    className: "header_left"
  }, /* @__PURE__ */ React93.createElement(ZypherLogo, {
    isMobile: isMobile2
  })) : null, Middle && /* @__PURE__ */ React93.createElement(Middle, {
    pathname
  }), /* @__PURE__ */ React93.createElement("div", {
    className: "header_right"
  }, /* @__PURE__ */ React93.createElement(rainbow_connectWallet_default, {
    showLang,
    useLocation,
    copy,
    isMobile: isMobile2,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    CountupNumber,
    supportedChainList,
    type
  }), isMobile2 && !hideMenu ? /* @__PURE__ */ React93.createElement(IsPixelWidget_default, {
    type,
    className: `${type === "pixel" ? "header_btn_pixel" : ""}`
  }, /* @__PURE__ */ React93.createElement("div", {
    className: "header_btn",
    onClick: () => setSiderCollapse(!collapsed)
  }, /* @__PURE__ */ React93.createElement(icons_default, {
    className: `header_icon ${collapsed ? "" : "header_close"}`,
    name: `${collapsed ? "menu" : "close"}`
  }))) : null), /* @__PURE__ */ React93.createElement(LinkToBetaDialog_default, null));
};
var header_default = Header;

// src/provider/RainbowKitWithThemeProvider.tsx
import React94, { useMemo as useMemo17 } from "react";
import { WagmiConfig } from "wagmi";
var RainbowKitWithThemeProvider = ({
  children,
  env,
  chainIdList,
  type
}) => {
  const { wagmiConfig, chains, computedTheme } = useMemo17(() => {
    if (env) {
      const wagmiConfig2 = getWagmiConfig(env, chainIdList);
      const { chains: chains2 } = getConfigureChains(env);
      return {
        wagmiConfig: wagmiConfig2,
        chains: chains2,
        computedTheme: darkTheme({
          accentColor: "#fff",
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
  return /* @__PURE__ */ React94.createElement(WagmiConfig, {
    config: wagmiConfig
  }, /* @__PURE__ */ React94.createElement(RainbowKitProvider, {
    chains,
    appInfo,
    theme: computedTheme
  }, children));
};
var RainbowKitWithThemeProvider_default = RainbowKitWithThemeProvider;

// src/hooks/useInitRainbowFn.ts
import { useEffect as useEffect27 } from "react";
var useInitRainbowFn = () => {
  const { setFn, closeChainModal } = useChainModal();
  useEffect27(() => {
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
import { useSetRecoilState as useSetRecoilState12 } from "recoil";
import { useEffect as useEffect28 } from "react";
import { ethers as ethers3 } from "ethers";
var useGetInvitationAddress = () => {
  const setInvitationAddressState = useSetRecoilState12(invitationAddressState);
  useEffect28(() => {
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
import { useCallback as useCallback28, useEffect as useEffect30, useState as useState20 } from "react";

// src/hooks/useInterval.ts
import { useEffect as useEffect29, useRef as useRef7 } from "react";
function useInterval(callback, delay, leading = true) {
  const savedCallback = useRef7();
  useEffect29(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect29(() => {
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
  const [list2, setList] = useState20();
  const [hasError, setHasError] = useState20(false);
  const fetchGameInfos = useCallback28(async () => {
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
  useEffect30(() => {
    fetchGameInfos();
  }, []);
  useInterval(fetchGameInfos, 5e4);
  return {
    list: list2,
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
    const id = parseInt(idHex, 16).toFixed();
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
          (v) => parseInt(v.id, 16).toFixed()
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

// src/components/PixelTab/PixelTab.tsx
import React95, { memo as memo31 } from "react";
var PixelTab = memo31(
  ({
    tabList,
    height,
    pixel_height
  }) => {
    return /* @__PURE__ */ React95.createElement("ul", {
      className: "pixe_active_tvl_tab"
    }, tabList.map((v, index) => /* @__PURE__ */ React95.createElement(PixelTabLiItem, {
      onClick: v.onClick,
      key: v.label,
      on: v.on,
      index,
      label: v.label,
      height,
      pixel_height
    })));
  }
);
var PixelTabLiItem = memo31(
  ({
    onClick,
    on,
    index,
    label,
    height,
    pixel_height
  }) => {
    if (on) {
      return /* @__PURE__ */ React95.createElement("li", null, /* @__PURE__ */ React95.createElement(ActivePixelButtonColor, {
        height,
        pixel_height,
        className: "active_tvl_tab_on"
      }, /* @__PURE__ */ React95.createElement("p", null, label)));
    }
    return /* @__PURE__ */ React95.createElement("li", null, /* @__PURE__ */ React95.createElement(ActivePixelButton, {
      height,
      pixel_height,
      backgroundColor: "#1D263B",
      className: "active_tvl_tab",
      onClick
    }, /* @__PURE__ */ React95.createElement("p", null, label)));
  }
);
var PixelTab_default = PixelTab;

// src/components/PixelTab/PixelTabBorder.tsx
import React96, { memo as memo32 } from "react";
var PixelTabBorder = memo32(
  ({
    className,
    tabList,
    height,
    pixel_height
  }) => {
    return /* @__PURE__ */ React96.createElement(PixelCube2, {
      className: `ActiveTVLStaking_tab ${className != null ? className : ""}`,
      pixel_height,
      height,
      backgroundColor: "#1D263B",
      borderColor: "#1649FF"
    }, tabList.map((v, index) => /* @__PURE__ */ React96.createElement("div", {
      className: `ActiveTVLStaking_tab_li ${v.on ? "on" : ""}`,
      key: v.label,
      onClick: v.onClick
    }, /* @__PURE__ */ React96.createElement("p", null, v.label))));
  }
);
var PixelTabBorder_default = PixelTabBorder;
export {
  ActivePixelButton,
  ActivePixelButtonColor,
  ActivePixelCard,
  ActivePixelColorCard,
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
  DialogClose_default as DialogClose,
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
  LoadingButton_default as LoadingButton,
  multicall_default as MulticallContract,
  PixelBorderCard,
  PixelBorderCardButton,
  PixelCube2,
  PixelCube3,
  PixelCube5,
  PixelTab_default as PixelTab,
  PixelTabBorder_default as PixelTabBorder,
  PixelTable,
  PixelTableBorder,
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
  useChainModal,
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
  useSetRecoilState13 as useSetRecoilState,
  useSwapPoint,
  useSwitchNetwork2 as useSwitchNetwork,
  useWalletClient2 as useWalletClient,
  useWindowSize,
  walletModalOpenState,
  zkBingo,
  zkBingoV0
};
