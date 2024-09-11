"use client";
// src/index.ts
import {
  toUserFriendlyAddress,
  useTonAddress,
  useTonConnectUI as useTonConnectUI2,
  useTonWallet as useTonWallet2
} from "@tonconnect/ui-react";
import {
  useSetRecoilState as useSetRecoilState18,
  atom as atom10,
  selector,
  RecoilRoot,
  useRecoilState as useRecoilState14,
  useRecoilValue as useRecoilValue14,
  useResetRecoilState
} from "recoil";
import {
  motion as motion4,
  AnimatePresence as AnimatePresence2,
  useMotionValue,
  animate,
  useTransform,
  useSpring
} from "framer-motion";

// src/constant/motionConstant.ts
var dialogVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

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
  if (window.location.host.startsWith("app") || window.location.host.startsWith("zypher")) {
    return true;
  }
  return false;
};
var isLocalhost = () => {
  if (window.location.host.startsWith("192.168")) {
    return true;
  }
  return false;
};
var preStaticUrl = isPro() ? "https://static.zypher.game" : "https://static-dev.zypher.game";
var ChainId = /* @__PURE__ */ ((ChainId9) => {
  ChainId9["Bsc"] = "56";
  ChainId9["BscTestnet"] = "97";
  ChainId9["Arbitrum"] = "42161";
  ChainId9["ArbitrumRinkeby"] = "421611";
  ChainId9["ArbitrumGoerli"] = "421613";
  ChainId9["LineaSepolia"] = "59141";
  ChainId9["LineaMainnet"] = "59144";
  ChainId9["POLYGON_MUMBAI"] = "80001";
  ChainId9["POLYGON_ZKEVM"] = "1442";
  ChainId9["ScrollAlphaTestnet"] = "534353";
  ChainId9["OPBNBTEST"] = "5611";
  ChainId9["OPBNB"] = "204";
  ChainId9["ScrollSepoliaTestnet"] = "534351";
  ChainId9["MantaPacificMainnet"] = "169";
  ChainId9["MantaPacificTestnet"] = "3441005";
  ChainId9["Combo"] = "9980";
  ChainId9["ComboTestnet"] = "91715";
  ChainId9["Mantle"] = "5000";
  ChainId9["MantleTestnet"] = "5001";
  ChainId9["Sepolia"] = "11155111";
  ChainId9["B2"] = "223";
  ChainId9["B2Testnet"] = "1123";
  ChainId9["ZytronLineaSepoliaTestnet"] = "19546";
  ChainId9["ZytronLineaMain"] = "9901";
  ChainId9["ZytronB2Testnet"] = "50097";
  ChainId9["Taiko"] = "167000";
  ChainId9["SagaMainnet"] = "2717465680371000";
  ChainId9["B3Mainnet"] = "8333";
  return ChainId9;
})(ChainId || {});
var TGChainId = window.IS_TELEGRAM ? ["2717465680371000" /* SagaMainnet */] : void 0;
var DPSupportChainId = !isPro() ? [
  "59144" /* LineaMainnet */,
  "59141" /* LineaSepolia */,
  "5611" /* OPBNBTEST */,
  "204" /* OPBNB */,
  "19546" /* ZytronLineaSepoliaTestnet */,
  "9901" /* ZytronLineaMain */
] : ["59144" /* LineaMainnet */, "204" /* OPBNB */];
var bingoV1SupportedChainId = DPSupportChainId;
var bingoBetaSupportedChainId = TGChainId ? TGChainId : !isPro() ? [
  "42161" /* Arbitrum */,
  "5000" /* Mantle */,
  "9980" /* Combo */,
  "169" /* MantaPacificMainnet */,
  "8333" /* B3Mainnet */
] : [
  "42161" /* Arbitrum */,
  "5000" /* Mantle */,
  "169" /* MantaPacificMainnet */,
  "9980" /* Combo */,
  "8333" /* B3Mainnet */
];
var bingoSupportedChainId = TGChainId || [
  ...bingoV1SupportedChainId,
  ...bingoBetaSupportedChainId
];
var supportedChainIds = (env, chainList) => {
  return TGChainId ? TGChainId : chainList ? chainList : !isPro() || env === "develop" ? [
    "59144" /* LineaMainnet */,
    "59141" /* LineaSepolia */,
    "223" /* B2 */,
    "1123" /* B2Testnet */,
    "167000" /* Taiko */,
    "204" /* OPBNB */,
    "5611" /* OPBNBTEST */,
    "42161" /* Arbitrum */,
    "421613" /* ArbitrumGoerli */,
    "169" /* MantaPacificMainnet */,
    "3441005" /* MantaPacificTestnet */,
    "5000" /* Mantle */,
    "5001" /* MantleTestnet */,
    "91715" /* ComboTestnet */,
    "9980" /* Combo */,
    "11155111" /* Sepolia */,
    "19546" /* ZytronLineaSepoliaTestnet */,
    "9901" /* ZytronLineaMain */,
    "50097" /* ZytronB2Testnet */,
    "8333" /* B3Mainnet */
  ] : [
    "59144" /* LineaMainnet */,
    "204" /* OPBNB */,
    "167000" /* Taiko */,
    "42161" /* Arbitrum */,
    "5000" /* Mantle */,
    "9980" /* Combo */,
    "169" /* MantaPacificMainnet */,
    "223" /* B2 */,
    "8333" /* B3Mainnet */
  ];
};
var ChainRpcUrls = {
  ["59141" /* LineaSepolia */]: ["https://rpc.sepolia.linea.build"],
  ["59144" /* LineaMainnet */]: ["https://rpc.linea.build"],
  ["42161" /* Arbitrum */]: ["https://arb1.arbitrum.io/rpc"],
  ["5611" /* OPBNBTEST */]: ["https://opbnb-testnet-rpc.bnbchain.org/"],
  ["204" /* OPBNB */]: [
    "https://opbnb-mainnet-rpc.bnbchain.org",
    "https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"
  ],
  ["534351" /* ScrollSepoliaTestnet */]: ["https://sepolia-rpc.scroll.io/"],
  ["534353" /* ScrollAlphaTestnet */]: ["https://scroll-alpha-public.unifra.io"],
  ["169" /* MantaPacificMainnet */]: ["https://pacific-rpc.manta.network/http"],
  ["56" /* Bsc */]: [
    "https://bsc-dataseed1.binance.org",
    "https://bsc-mainnet.nodereal.io/v1/a986025b4eae4b82b9c2d577c730d09a"
  ],
  ["97" /* BscTestnet */]: [
    "https://endpoints.omniatech.io/v1/bsc/testnet/public",
    "https://bsc-testnet.publicnode.com",
    "https://bsc-testnet.nodereal.io/v1/9459391f32694c11b182c8d4d9cee750"
  ],
  ["421611" /* ArbitrumRinkeby */]: ["https://rinkeby.arbitrum.io/rpc"],
  ["421613" /* ArbitrumGoerli */]: [
    "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
    "https://goerli-rollup.arbitrum.io/rpc"
  ],
  ["80001" /* POLYGON_MUMBAI */]: [
    "https://polygon-mumbai-bor.publicnode.com",
    "https://matic-mumbai.chainstacklabs.com",
    "https://rpc-mumbai.maticvigil.com",
    "https://matic-testnet-archive-rpc.bwarelabs.com"
  ],
  ["1442" /* POLYGON_ZKEVM */]: ["https://rpc.public.zkevm-test.net"],
  ["3441005" /* MantaPacificTestnet */]: [
    "https://manta-testnet.calderachain.xyz/http"
  ],
  ["9980" /* Combo */]: [
    "https://combo-mainnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1",
    "https://combo-mainnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3",
    "https://combo-mainnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac"
  ],
  ["91715" /* ComboTestnet */]: [
    "https://combo-testnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3",
    "https://combo-testnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac",
    "https://combo-testnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1"
  ],
  ["5000" /* Mantle */]: ["https://mantle.publicnode.com"],
  ["5001" /* MantleTestnet */]: ["https://rpc.testnet.mantle.xyz"],
  ["11155111" /* Sepolia */]: [
    "https://endpoints.omniatech.io/v1/eth/sepolia/public",
    "https://ethereum-sepolia-rpc.publicnode.com"
  ],
  ["223" /* B2 */]: ["https://rpc.bsquared.network"],
  ["1123" /* B2Testnet */]: ["https://b2-testnet.alt.technology"],
  ["9901" /* ZytronLineaMain */]: ["https://linea-mainnet-zytron.zypher.game"],
  ["19546" /* ZytronLineaSepoliaTestnet */]: [
    "https://linea-testnet-zytron.zypher.game"
  ],
  ["50097" /* ZytronB2Testnet */]: ["https://b2-testnet-zytron.zypher.game"],
  ["167000" /* Taiko */]: ["https://rpc.hekla.taiko.xyz"],
  ["2717465680371000" /* SagaMainnet */]: [
    "https://zypher-2717465680371000-1.jsonrpc.sagarpc.io"
  ],
  ["8333" /* B3Mainnet */]: ["https://mainnet-rpc.b3.fun"]
};
var BlockExplorerUrls = {
  ["56" /* Bsc */]: ["https://bscscan.com"],
  ["97" /* BscTestnet */]: ["https://testnet.bscscan.com"],
  ["42161" /* Arbitrum */]: ["https://arbiscan.io"],
  ["421611" /* ArbitrumRinkeby */]: ["https://testnet.arbiscan.io"],
  ["80001" /* POLYGON_MUMBAI */]: ["https://mumbai.polygonscan.com"],
  ["59144" /* LineaMainnet */]: ["https://lineascan.build"],
  ["59141" /* LineaSepolia */]: ["https://sepolia.lineascan.build"],
  ["421613" /* ArbitrumGoerli */]: ["https://goerli.arbiscan.io/"],
  ["1442" /* POLYGON_ZKEVM */]: ["https://testnet-zkevm.polygonscan.com"],
  ["5611" /* OPBNBTEST */]: ["https://opbnb-testnet.bscscan.com"],
  ["204" /* OPBNB */]: ["https://opbnbscan.com/"],
  ["534351" /* ScrollSepoliaTestnet */]: ["https://sepolia-blockscout.scroll.io"],
  ["534353" /* ScrollAlphaTestnet */]: ["https://alpha-blockscout.scroll.io"],
  ["169" /* MantaPacificMainnet */]: ["https://pacific-explorer.manta.network"],
  ["3441005" /* MantaPacificTestnet */]: ["https://manta-testnet.calderaexplorer.xyz"],
  ["91715" /* ComboTestnet */]: ["https://combotrace-testnet.nodereal.io/"],
  ["5000" /* Mantle */]: ["https://explorer.mantle.xyz"],
  ["5001" /* MantleTestnet */]: ["https://explorer.testnet.mantle.xyz"],
  ["9980" /* Combo */]: ["https://combotrace.nodereal.io"],
  ["11155111" /* Sepolia */]: ["https://sepolia.etherscan.io"],
  ["223" /* B2 */]: ["https://explorer.bsquared.network"],
  ["1123" /* B2Testnet */]: ["https://testnet-explorer.bsquared.network"],
  ["9901" /* ZytronLineaMain */]: [
    "https://linea-mainnet-zytron-blockscout.zypher.game"
  ],
  ["19546" /* ZytronLineaSepoliaTestnet */]: [
    "https://linea-testnet-zytron-blockscout.zypher.game"
  ],
  ["50097" /* ZytronB2Testnet */]: [
    "https://b2-testnet-zytron-blockscout.zypher.game"
  ],
  ["167000" /* Taiko */]: ["https://hekla.taikoscan.network"],
  ["2717465680371000" /* SagaMainnet */]: ["https://zypher-2717465680371000-1.sagaexplorer.io"],
  ["8333" /* B3Mainnet */]: ["https://explorer.b3.fun"]
};
var ChainName = {
  ["56" /* Bsc */]: "BSC Mainnet",
  ["97" /* BscTestnet */]: "BSC Testnet",
  ["42161" /* Arbitrum */]: "Arbitrum One",
  ["421613" /* ArbitrumGoerli */]: "Arbitrum Goerli Testnet",
  ["421611" /* ArbitrumRinkeby */]: "Arbitrum Rinkeby",
  ["59141" /* LineaSepolia */]: "Linea Sepolia",
  ["59144" /* LineaMainnet */]: "Linea Mainnet",
  ["80001" /* POLYGON_MUMBAI */]: "Polygon Mumbai",
  ["1442" /* POLYGON_ZKEVM */]: "Polygon zkEVM Testnet",
  ["5611" /* OPBNBTEST */]: "opBNB testnet",
  ["204" /* OPBNB */]: "opBNB Mainnet",
  ["534353" /* ScrollAlphaTestnet */]: "Scroll Alpha Testnet",
  ["534351" /* ScrollSepoliaTestnet */]: "Scroll Sepolia Testnet",
  ["169" /* MantaPacificMainnet */]: "Manta Pacific",
  ["3441005" /* MantaPacificTestnet */]: "Manta Pacific Testnet",
  ["91715" /* ComboTestnet */]: "Combo Testnet",
  ["5000" /* Mantle */]: "Mantle",
  ["5001" /* MantleTestnet */]: "Mantle Testnet",
  ["9980" /* Combo */]: "Combo",
  ["11155111" /* Sepolia */]: "Sepolia",
  ["223" /* B2 */]: "B\xB2",
  ["1123" /* B2Testnet */]: "B\xB2 Testnet",
  ["19546" /* ZytronLineaSepoliaTestnet */]: "Zytron Linea(Sepolia) Testnet",
  ["9901" /* ZytronLineaMain */]: "Zytron Linea",
  ["50097" /* ZytronB2Testnet */]: "Zytron B\xB2 Testnet",
  ["167000" /* Taiko */]: "Taiko Mainnet",
  ["2717465680371000" /* SagaMainnet */]: "Saga Zypher",
  ["8333" /* B3Mainnet */]: "B3"
};
var ChainNetworkName = {
  ["56" /* Bsc */]: "bsc",
  ["97" /* BscTestnet */]: "bsc-testnet",
  ["42161" /* Arbitrum */]: "arbitrum",
  ["421611" /* ArbitrumRinkeby */]: "arbitrum-rinkeby",
  ["59141" /* LineaSepolia */]: "Linea Sepolia",
  ["59144" /* LineaMainnet */]: "linea",
  ["80001" /* POLYGON_MUMBAI */]: "maticmum",
  ["421613" /* ArbitrumGoerli */]: "arbitrum-goerli",
  ["1442" /* POLYGON_ZKEVM */]: "polygon_zkEVM_testnet",
  ["534353" /* ScrollAlphaTestnet */]: "Scroll Alpha Testnet",
  ["5611" /* OPBNBTEST */]: "opBNB testnet",
  ["204" /* OPBNB */]: "opBNB Mainnet",
  ["534351" /* ScrollSepoliaTestnet */]: "Scroll Sepolia Testnet",
  ["169" /* MantaPacificMainnet */]: "Manta Pacific",
  ["3441005" /* MantaPacificTestnet */]: "Manta Pacific",
  ["9980" /* Combo */]: "Combo",
  ["91715" /* ComboTestnet */]: "Combo Testnet",
  ["5000" /* Mantle */]: "Mantle",
  ["5001" /* MantleTestnet */]: "Mantle Testnet",
  ["11155111" /* Sepolia */]: "Sepolia",
  ["223" /* B2 */]: "B\xB2 Mainnet",
  ["1123" /* B2Testnet */]: "B\xB2 Testnet",
  ["19546" /* ZytronLineaSepoliaTestnet */]: "Zytron Linea(Sepolia) Testnet",
  ["9901" /* ZytronLineaMain */]: "Zytron Linea",
  ["50097" /* ZytronB2Testnet */]: "Zytron B\xB2 Testnet",
  ["167000" /* Taiko */]: "Taiko Mainnet",
  ["2717465680371000" /* SagaMainnet */]: "Saga Zypher",
  ["8333" /* B3Mainnet */]: "B3"
};
var isTestnet = {
  ["56" /* Bsc */]: false,
  ["97" /* BscTestnet */]: true,
  ["42161" /* Arbitrum */]: false,
  ["421611" /* ArbitrumRinkeby */]: true,
  ["59141" /* LineaSepolia */]: true,
  ["59144" /* LineaMainnet */]: false,
  ["80001" /* POLYGON_MUMBAI */]: true,
  ["1442" /* POLYGON_ZKEVM */]: true,
  ["204" /* OPBNB */]: false,
  ["5611" /* OPBNBTEST */]: true,
  ["421613" /* ArbitrumGoerli */]: true,
  ["534351" /* ScrollSepoliaTestnet */]: true,
  ["534353" /* ScrollAlphaTestnet */]: true,
  ["169" /* MantaPacificMainnet */]: false,
  ["3441005" /* MantaPacificTestnet */]: true,
  ["9980" /* Combo */]: false,
  ["91715" /* ComboTestnet */]: true,
  ["5000" /* Mantle */]: false,
  ["5001" /* MantleTestnet */]: true,
  ["11155111" /* Sepolia */]: true,
  ["223" /* B2 */]: false,
  ["1123" /* B2Testnet */]: true,
  ["19546" /* ZytronLineaSepoliaTestnet */]: true,
  ["9901" /* ZytronLineaMain */]: false,
  ["50097" /* ZytronB2Testnet */]: true,
  ["167000" /* Taiko */]: false,
  ["2717465680371000" /* SagaMainnet */]: true,
  ["8333" /* B3Mainnet */]: false
};
var Currency = {
  ["56" /* Bsc */]: "BNB",
  ["97" /* BscTestnet */]: "BNB",
  ["42161" /* Arbitrum */]: "ETH",
  ["421611" /* ArbitrumRinkeby */]: "ETH",
  ["59141" /* LineaSepolia */]: "ETH",
  ["59144" /* LineaMainnet */]: "ETH",
  ["80001" /* POLYGON_MUMBAI */]: "ETH",
  ["421613" /* ArbitrumGoerli */]: "ETH",
  ["1442" /* POLYGON_ZKEVM */]: "ETH",
  ["5611" /* OPBNBTEST */]: "BNB",
  ["204" /* OPBNB */]: "BNB",
  ["534353" /* ScrollAlphaTestnet */]: "ETH",
  ["534351" /* ScrollSepoliaTestnet */]: "ETH",
  ["169" /* MantaPacificMainnet */]: "ETH",
  ["3441005" /* MantaPacificTestnet */]: "ETH",
  ["9980" /* Combo */]: "BNB",
  ["91715" /* ComboTestnet */]: "BNB",
  ["5000" /* Mantle */]: "MNT",
  ["5001" /* MantleTestnet */]: "MNT",
  ["11155111" /* Sepolia */]: "ETH",
  ["223" /* B2 */]: "BTC",
  ["1123" /* B2Testnet */]: "BTC",
  ["9901" /* ZytronLineaMain */]: "ETH",
  ["19546" /* ZytronLineaSepoliaTestnet */]: "ETH",
  ["50097" /* ZytronB2Testnet */]: "BTC",
  ["167000" /* Taiko */]: "ETH",
  ["2717465680371000" /* SagaMainnet */]: "zyp",
  ["8333" /* B3Mainnet */]: "ETH"
};
var getCryptoImg = (fileName, key, type = ".svg") => {
  return preStaticUrl + "/crypto/" + fileName + "/" + key + type;
};
var ChainImage = Object.fromEntries(
  Object.values(ChainId).map((v) => [
    v,
    getCryptoImg("chain", v)
  ])
);
var CurrencyLogo = Object.fromEntries(
  Object.values(ChainId).map((v) => [
    v,
    getCryptoImg("token", Currency[v])
  ])
);
var MulticallV3 = "0xca11bde05977b3631167028862be2a173976ca11";
var CurrencyContract = {
  ["56" /* Bsc */]: {
    multicall: [MulticallV3]
  },
  ["97" /* BscTestnet */]: {
    multicall: [MulticallV3]
  },
  ["42161" /* Arbitrum */]: {
    multicall: [MulticallV3]
  },
  ["421611" /* ArbitrumRinkeby */]: {
    multicall: [MulticallV3]
  },
  ["59141" /* LineaSepolia */]: {
    multicall: [MulticallV3]
  },
  ["59144" /* LineaMainnet */]: {
    multicall: [MulticallV3]
  },
  ["80001" /* POLYGON_MUMBAI */]: {
    multicall: [MulticallV3]
  },
  ["421613" /* ArbitrumGoerli */]: {
    multicall: [MulticallV3]
  },
  ["1442" /* POLYGON_ZKEVM */]: {
    multicall: [MulticallV3]
  },
  ["5611" /* OPBNBTEST */]: {
    multicall: [MulticallV3]
  },
  ["204" /* OPBNB */]: {
    multicall: [MulticallV3]
  },
  ["534351" /* ScrollSepoliaTestnet */]: {
    multicall: [MulticallV3]
  },
  ["534353" /* ScrollAlphaTestnet */]: {
    multicall: [MulticallV3]
  },
  ["169" /* MantaPacificMainnet */]: {
    multicall: [MulticallV3]
  },
  ["3441005" /* MantaPacificTestnet */]: {
    multicall: ["0xd4E91b4401EDb2BD95791462F4ccAaae4026540D"]
  },
  ["9980" /* Combo */]: {
    multicall: ["0x67c369D697C7A3B5BAE1cA9AEF0bA32F6d4d815a"]
  },
  ["91715" /* ComboTestnet */]: {
    multicall: ["0x4961661f732e995133fDAa7881481BB10e424f78"]
  },
  ["5000" /* Mantle */]: {
    multicall: [MulticallV3]
  },
  ["5001" /* MantleTestnet */]: {
    multicall: ["0xcA11bde05977b3631167028862bE2a173976CA11"]
  },
  ["11155111" /* Sepolia */]: {
    multicall: [MulticallV3]
  },
  ["223" /* B2 */]: { multicall: ["0x58d644e9B8cfBb07fb7913Bb373b7eCAAEbdF202"] },
  ["1123" /* B2Testnet */]: {
    multicall: ["0x58d644e9B8cfBb07fb7913Bb373b7eCAAEbdF202"]
  },
  ["9901" /* ZytronLineaMain */]: {
    multicall: ["0x291f3Ee5c2bd0a749ed8508ecDf2d1754a32bE73"]
  },
  ["19546" /* ZytronLineaSepoliaTestnet */]: {
    multicall: ["0x7e31A57750CeaD3F6c380d2aeEe3d6aE48c931b9"]
  },
  ["50097" /* ZytronB2Testnet */]: {
    multicall: ["0x103002767d102ACe6174Eb00f7a54830B9917797"]
  },
  ["167000" /* Taiko */]: {
    multicall: ["0xE1515C54DAA99D9CD8097Be046A009539aa2a2B9"]
  },
  ["2717465680371000" /* SagaMainnet */]: {
    multicall: ["0xA8712E98aeDF7d4D7AA140c50D4E33F3a4712B68"]
  },
  ["8333" /* B3Mainnet */]: {
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
    throw Error(`Invalid V0 'chainId' parameter '${chainId}'.`);
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
      `zkBingo V0 Invalid 'chainId' parameter '${chainId}', name: ${name}`
    );
  }
};
var zkBingo = (chainId, name) => {
  var _a, _b;
  if (!chainId) {
    throw Error(`Invalid V1 'chainId' parameter '${chainId}'.`);
  }
  if (typeof chainId === "number") {
    chainId = `${chainId}`;
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    let address = (_b = (_a = zkBingoContractsV1) == null ? void 0 : _a[chainId]) == null ? void 0 : _b[_repo];
    if (chainId === "19546" /* ZytronLineaSepoliaTestnet */) {
      address = {
        date: "2024-08-01T07:49:19.451Z",
        chainId: 19546,
        deployer: "0x44Cb6dA95D121F812AD047747129C34C1F9a37f6",
        ZypherGameToken: "0x71a56BD2E4391bc6f6012F843DE6d7e82E3bc64f",
        ZkBingoCard: "0x3e409DF35a8D54a420ec9592dDA288735153b81a",
        ZkBingoLobby: "0x4C3A8897f5755c1EE4B67d36F1961E3C516C5b8a",
        ZkBingoFee: "0xD0AFCaDAebFB4FFbaDC0CeE761689B7bC8d681cb",
        ZkBingoPoints: "0x98454527B93eEd4F5252774Ea2166b126eD2C847"
      };
    }
    let returnAddress = AddressZero;
    if (name === "lobby" /* Lobby */) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === "card" /* Card */) {
      returnAddress = address.ZkBingoCard;
    } else if (name === "points" /* Points */) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === "ZypherGameToken" /* ZypherGameToken */) {
      returnAddress = chainId === "9901" /* ZytronLineaMain */ ? "0xeC928B58691493Bc28Ed8D5866c145918A8aAce2" : address.ZypherGameToken ? address.ZypherGameToken : address.ZkBingoToken;
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
var TG_BOT_URL = isLocalhost() ? "http://192.168.0.11:4000" : "https://bingo-api.zypher.game";
var targetDate = new Date(2024, 9, 1);
var TaskTelegramBot = "https://t.me/zBingoBot";
var TaskJoinTelegramGroup = "https://t.me/zyphernetwork";
var TaskFollowZypher = "https://twitter.com/Zypher_Network";
var TaskReweet1 = "https://x.com/Zypher_Network/status/1830911872473932208";
var GlobalVar = {
  dispatch: (arg) => null
};

// src/constant/chains_definitions/chains_definitions.ts
import { defineChain } from "viem";
var ChainDefinitions = (chainId) => defineChain({
  id: Number(chainId),
  name: ChainNetworkName[chainId],
  network: ChainName[chainId],
  nativeCurrency: {
    name: Currency[chainId],
    symbol: Currency[chainId],
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ChainRpcUrls[chainId]
    },
    public: {
      http: ChainRpcUrls[chainId]
    }
  },
  blockExplorers: {
    default: { name: "Nodereal", url: BlockExplorerUrls[chainId][0] },
    nodereal: { name: "Nodereal", url: BlockExplorerUrls[chainId][0] }
  },
  contracts: {
    multicall3: {
      address: CurrencyContract[chainId].multicall[0],
      blockCreated: 0
    }
  },
  testnet: isTestnet[chainId]
});

// src/constant/chains.ts
var AllChainInfo = Object.fromEntries(
  Object.values(ChainId).map((v) => [v, ChainDefinitions(v)])
);

// src/hooks/useNavItem.type.ts
var INavLinkType = /* @__PURE__ */ ((INavLinkType2) => {
  INavLinkType2["Games"] = "Games";
  INavLinkType2["Activities"] = "Activities";
  INavLinkType2["Language"] = "Language";
  INavLinkType2["Links"] = "Links";
  return INavLinkType2;
})(INavLinkType || {});

// src/hooks/useTonWalletProofMounted.tsx
import {
  useTonConnectUI,
  useTonWallet
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";
var useTonWalletProofMounted = () => {
  const [ui] = useTonConnectUI();
  const [proof, _proof] = useState(null);
  const wallet = useTonWallet();
  useEffect(() => {
    console.log("ui", ui);
    ui.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: "ZypherGameBingo" }
    });
  }, []);
  useEffect(() => {
    var _a, _b;
    if (((_b = (_a = wallet == null ? void 0 : wallet.connectItems) == null ? void 0 : _a.tonProof) == null ? void 0 : _b.name) === "ton_proof" && "proof" in wallet.connectItems.tonProof) {
      _proof(wallet.connectItems.tonProof);
    } else {
      _proof(null);
    }
    ui.onStatusChange((wallet2) => {
      var _a2;
      if (((_a2 = wallet2 == null ? void 0 : wallet2.connectItems) == null ? void 0 : _a2.tonProof) && "proof" in wallet2.connectItems.tonProof) {
        _proof(wallet2.connectItems.tonProof);
      }
    });
  }, [wallet == null ? void 0 : wallet.account.address]);
  return proof;
};

// src/hooks/useIsTelegram.ts
import { atom, useRecoilValue } from "recoil";
var isTelegramState = atom({
  key: "isTelegramState",
  default: !!window.IS_TELEGRAM
});
var useIsTelegram = () => {
  return useRecoilValue(isTelegramState);
};

// src/hooks/useGetTgName.ts
import { useCallback as useCallback2 } from "react";
import { atom as atom3, useRecoilValue as useRecoilValue3, useSetRecoilState as useSetRecoilState2 } from "recoil";

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
var httpClient = axios.create({
  timeout: 1e5
});
var httpGet = async (...params) => {
  return httpClient.get(...params).then((res) => {
    if (res.status !== 200)
      return {
        code: res.status,
        msg: typeof res.data === "string" ? res.data : res.statusText,
        data: null
      };
    return {
      code: 0,
      data: res.data,
      msg: "success"
    };
  }).catch((err) => {
    if (err && err.response && err.response.data && typeof err.response.data === "string") {
      return Promise.resolve({
        code: err.response.status,
        msg: err.response.data,
        data: null
      });
    }
    return Promise.resolve({
      code: 500,
      msg: String(err).replace(/AxiosError:/, ""),
      data: null
    });
  });
};
var httpGetOnceCache = {};
var httpGetOnce = async (url) => {
  if (url in httpGetOnceCache)
    return httpGetOnceCache[url];
  httpGetOnceCache[url] = httpGet(url).catch((err) => {
    delete httpGetOnceCache[url];
    return err;
  });
  return httpGetOnceCache[url];
};
var httpPost = async (...params) => {
  return httpClient.post(...params).then((res) => {
    if (res.status !== 200) {
      return {
        code: res.status,
        msg: typeof res.data === "string" ? res.data : res.statusText,
        data: null
      };
    }
    return { code: 0, data: res.data, msg: "success" };
  }).catch((err) => {
    if (err && err.response && err.response.data && typeof err.response.data === "string") {
      return Promise.resolve({
        code: err.response.status,
        msg: err.response.data,
        data: null
      });
    }
    return Promise.resolve({
      code: 500,
      msg: String(err).replace(/AxiosError:/, ""),
      data: null
    });
  });
};

// src/gas0/hooks/useWalletHandler.ts
import { useWalletClient } from "wagmi";

// src/gas0/hooks/useGas0Balance.ts
import { useEffect as useEffect2, useRef, useState as useState2 } from "react";

// src/hooks/useActiveWeb3React.ts
import { useMemo } from "react";
import { useAccount, usePublicClient } from "wagmi";

// src/rainbowkit/src/hooks/useChainId.ts
import { useNetwork } from "wagmi";
function useChainId() {
  var _a;
  const { chain: activeChain } = useNetwork();
  return (_a = activeChain == null ? void 0 : activeChain.id) != null ? _a : null;
}

// src/hooks/useActiveWeb3React.ts
function useActiveWeb3React(env, chainList) {
  const chainId = useChainId();
  const { address } = useAccount();
  const provider = usePublicClient();
  const IS_TELEGRAM = useIsTelegram();
  return useMemo(() => {
    return {
      chainId: IS_TELEGRAM ? "2717465680371000" /* SagaMainnet */ : chainId && !supportedChainIds(env, chainList).includes(`${chainId}`) ? void 0 : `${chainId}`,
      account: chainId && !supportedChainIds(env, chainList).includes(`${chainId}`) ? void 0 : address,
      provider
    };
  }, [chainId, address, provider]);
}

// src/gas0/constants/Gas0Constant.ts
var Gas0Constants = {
  ["19546" /* ZytronLineaSepoliaTestnet */]: {
    PermitProxy: "0x416e71A44d3A0cFD91DCbbE5B6CcB90752572B87",
    api: "https://rpc-zytron-testnet-linea.zypher.game/api",
    isGameFree: true
  },
  ["9901" /* ZytronLineaMain */]: {
    api: "https://zytron-linea-mainnet-0gas.zypher.game/api",
    PermitProxy: "0x6e0839df4fb45d76fe355d69fd430adef95e119a",
    isGameFree: true
  }
};

// src/utils/BigNumberJs.ts
import BigNumberJs from "bignumber.js";
var BM = new BigNumberJs(1e6);
var FORMAT = {
  decimalSeparator: ".",
  groupSeparator: ",",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: " ",
  fractionGroupSize: 0,
  suffix: "",
  prefixes: {
    "-": "",
    "+": ""
  },
  abbreviations: {
    K: "K",
    M: "M",
    B: "B",
    T: "T"
  }
};
var BigNumberJs_default = BigNumberJs;

// src/gas0/hooks/useGas0Balance.ts
import { zeroAddress } from "viem";
var useGas0Balance = () => {
  const [loading, setLoading] = useState2(false);
  const { account, chainId } = useActiveWeb3React();
  const [balance, _balance] = useState2("0");
  const [config, _config] = useState2({
    deployer_address: zeroAddress,
    function_call_tip: "",
    function_multicall_tip: "",
    wallet_bytecode: "0x"
  });
  const key = useRef("");
  useEffect2(() => {
    if (!account) {
      key.current = "";
      _balance("0");
      return;
    }
    const chainConf = Gas0Constants[chainId];
    if (!chainConf) {
      key.current = "";
      _balance("0");
      return;
    }
    const keyString = [account, chainId].join("-");
    if (key.current === keyString)
      return;
    key.current = keyString;
    setLoading(true);
    httpGetOnce(`${chainConf.api}/balanceof/${account}`).then(
      ({ data: res }) => {
        console.log({ res });
        if (res.code !== 0) {
          _balance("0");
          key.current = "";
          return;
        }
        console.log({ res });
        const gas0Balance = res.data.amount;
        console.log({ gas0Balance });
        if (new BigNumberJs_default(gas0Balance).gt(0)) {
          httpGetOnce(`${chainConf.api}/config`).then(({ data: configRes }) => {
            console.log({ configRes });
            setLoading(false);
            if (configRes.code !== 0) {
              _balance("0");
              key.current = "";
              return;
            }
            _balance(gas0Balance);
            console.log({ configRes });
            _config({
              deployer_address: configRes.data.deployer_address,
              function_call_tip: configRes.data.function_call_tip,
              function_multicall_tip: configRes.data.function_multicall_tip,
              wallet_bytecode: configRes.data.wallet_bytecode
            });
          });
        } else {
          setLoading(false);
        }
      }
    );
  }, [account, chainId]);
  return { balance, config, loading };
};

// src/gas0/hooks/useWalletHandler.ts
import { useCallback, useEffect as useEffect3, useRef as useRef2, useState as useState3 } from "react";

// src/gas0/utils/wagmiWalletHandler.ts
import {
  getContract,
  getPublicClient
} from "wagmi/actions";
import {
  createWalletClient,
  custom,
  hexToSignature,
  publicActions,
  toHex,
  hexToBytes as hexToBytes2,
  bytesToHex as bytesToHex2
} from "viem";

// src/gas0/abis/Wallet.ts
var WalletAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address payable",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "functionCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address"
          },
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct Wallet.MessageItem[]",
        name: "items",
        type: "tuple[]"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "functionMulticall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [],
    name: "nonce",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];

// src/gas0/utils/getAddressAA.ts
import {
  hexToBytes,
  bytesToHex,
  encodeDeployData,
  getCreate2Address
} from "viem";
var address2salt = (addr) => {
  const arr = hexToBytes(addr);
  const bytes = new Uint8Array(32);
  const len = arr.length;
  arr.forEach((v, i) => {
    bytes[32 - len + i] = v;
  });
  return bytesToHex(bytes);
};
var getAddressAA = (owner, walletBytecode, deployer) => {
  console.log({ owner, walletBytecode, deployer });
  const salt = address2salt(owner);
  const bytecode = encodeDeployData({
    abi: WalletAbi,
    args: [owner],
    bytecode: walletBytecode
  });
  return getCreate2Address({ bytecode, from: deployer, salt });
};

// src/gas0/constants/typedData.ts
var ZytronSignTypedData = (chainId) => {
  return {
    domain: {
      name: "Zytron",
      chainId
    },
    types: {
      Message: [
        { name: "tip", type: "string" },
        { name: "nonce", type: "uint256" },
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" }
      ]
    },
    primaryType: "Message"
  };
};
var ZytronPermitTypedData = (name, chainId, verifyingContract) => {
  return {
    domain: { name, version: "1", chainId, verifyingContract },
    types: {
      Permit: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
        { name: "value", type: "uint256" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" }
      ]
    },
    primaryType: "Permit"
  };
};
var ZytronMulticallTypedData = (chainId) => {
  return {
    domain: {
      name: "Zytron",
      chainId
    },
    types: {
      Message: [
        { name: "tip", type: "string" },
        { name: "items", type: "MessageItem[]" },
        { name: "nonce", type: "uint256" }
      ],
      MessageItem: [
        { name: "from", type: "address" },
        { name: "to", type: "address" },
        { name: "value", type: "uint256" },
        { name: "data", type: "bytes" }
      ]
    },
    primaryType: "Message"
  };
};

// src/gas0/utils/getIsCode.tsx
var getIsCode = async (publicClient, address) => {
  if (address) {
    const code = await publicClient.getBytecode({
      address
    });
    console.log({ address, code });
    if (code) {
      return true;
    }
  }
  return false;
};

// src/gas0/utils/wagmiWalletHandler.ts
var WagmiWalletHandler = class {
  constructor(walletClient, gas0Balance, configApi) {
    console.log({ gas0Balance, configApi });
    this.chainId = walletClient.chain.id;
    this.chain = walletClient.chain;
    this.walletClient = walletClient;
    this.publicClient = getPublicClient({ chainId: this.chainId });
    this.account = this.walletClient.account;
    this.address = {
      GP: zkBingo(this.chainId, "ZypherGameToken" /* ZypherGameToken */)
    };
    const conf = Gas0Constants[this.chainId];
    if (conf) {
      const deployer = configApi.deployer_address;
      const aaWallet = getAddressAA(
        this.account.address,
        configApi.wallet_bytecode,
        deployer
      );
      console.log({ aaWallet });
      console.log({ gas0Balance, s: new BigNumberJs_default(gas0Balance).gt(0) });
      this.aa = {
        isFree: new BigNumberJs_default(gas0Balance).gt(0),
        address: aaWallet,
        contract: getContract({
          abi: WalletAbi,
          address: aaWallet,
          walletClient
        }),
        config: conf,
        configFromApi: configApi
      };
      const aa = this.aa;
      console.log({ aa });
      const transport = custom({
        request: async ({ method, params }) => {
          console.log("custom request", method, params);
          if (method !== "eth_sendTransaction") {
            const res = await this.publicClient.request({ method, params });
            console.log("res", res);
            return res;
          }
          console.log(1);
          const owner = this.walletClient.account.address;
          console.log(1, method, { owner });
          const isCreate = await getIsCode(this.publicClient, aaWallet);
          console.log(1, { isCreate });
          if (!isCreate) {
            const hash = await gas0WalletCreateAndApprove(
              owner,
              aa.config.api,
              aa.isFree
            );
            console.log(1);
            if (!hash)
              return;
            console.log(1, hash);
            await this.publicClient.waitForTransactionReceipt({
              hash,
              confirmations: 1
            });
          }
          console.log(1);
          const nonce = await this.aaNonce();
          const arg = params[0];
          const value = arg.value || 0;
          const sign = await this.walletClient.signTypedData({
            ...ZytronSignTypedData(this.chainId),
            message: {
              from: aa.address,
              to: arg.to,
              value: BigInt(value),
              data: arg.data,
              nonce,
              tip: aa.configFromApi.function_call_tip
            }
          });
          if (typeof sign === "string") {
            const { v, r, s } = hexToSignature(sign);
            console.log({ v, r, s, aa: aa.isFree });
            if (aa.isFree) {
              console.log(1);
              const { data: res } = await httpPost(
                `${aa.config.api}/functioncall`,
                {
                  wallet: aa.address,
                  to: arg.to,
                  data: arg.data,
                  value: toHex(BigInt(value)),
                  v: Number(v),
                  r,
                  s,
                  owner
                }
              );
              if (res.code !== 0) {
                console.log("res", res);
                throw new Error(`functioncall error: ${res.msg}`);
              }
              console.log(1);
              return res.data.tx_hash;
            } else {
              console.log(1);
              const aaContract = getContract({
                abi: WalletAbi,
                address: aa.address,
                walletClient
              });
              console.log(1);
              return aaContract.write.functionCall([
                aa.address,
                arg.to,
                BigInt(value),
                arg.data,
                Number(v),
                r,
                s
              ]);
            }
          }
        }
      });
      this.aaWalletClient = createWalletClient({
        account: this.account,
        chain: this.chain,
        transport
      }).extend(publicActions);
    }
  }
  async aaNonce() {
    var _a;
    try {
      const nonce = await ((_a = this.aa) == null ? void 0 : _a.contract.read.nonce());
      console.log("asfsdf:", { nonce });
      return nonce || BigInt(0);
    } catch (err) {
      if (err && err.message && err.message.match(
        /^The contract function "nonce" returned no data \("0x"\)/
      ))
        return BigInt(0);
      console.log(String(err));
      throw err;
    }
  }
  getAAWalletClient() {
    var _a;
    return (_a = this.aaWalletClient) != null ? _a : this.walletClient;
  }
  getWalletClient() {
    return this.walletClient;
  }
};
var gas0WalletCreateAndApprove = async (owner, api, isFree) => {
  if (!isFree) {
    return;
  }
  const { data } = await httpPost(`${api}/create`, {
    owner
  });
  if (data.code !== 0)
    throw new Error(`setController error: ${data.msg}`);
  return data.data.tx_hash;
};

// src/gas0/hooks/useWalletHandler.ts
import { zeroAddress as zeroAddress2 } from "viem";
import { atom as atom2, useRecoilValue as useRecoilValue2, useSetRecoilState } from "recoil";
var aaWalletState = atom2({
  key: "aaWalletState",
  default: {
    getContainer: void 0,
    walletClient: void 0,
    aa: void 0,
    aa_mm_address: void 0,
    account: void 0,
    mockAcc: (address, proof) => null
  }
});
var useAaWallet = () => {
  return useRecoilValue2(aaWalletState);
};
var useSetAaWallet = () => {
  return useSetRecoilState(aaWalletState);
};
var useWalletHandler = () => {
  const { data: walletClient } = useWalletClient();
  const { walletClient: _walletClient } = useAaWallet();
  const { getWalletClient } = useGetWalletClient();
  useEffect3(() => {
    getWalletClient();
  }, [getWalletClient, !!walletClient]);
  return { getWalletClient };
};
var useGetWalletClient = () => {
  const { data: walletClient } = useWalletClient();
  const { loading, balance: gas0Balance, config } = useGas0Balance();
  const { account, chainId } = useActiveWeb3React();
  const [isSet, setIsSet] = useState3(false);
  const key = useRef2("");
  const setAaWallet = useSetAaWallet();
  const { walletClient: _walletClient, aaWalletClient } = useAaWallet();
  const getWalletClient = useCallback(() => {
    try {
      if (isSet) {
        return;
      }
      console.log({ loading, chainId, account });
      if (loading || !chainId || !account || !walletClient) {
        console.log({ loading, chainId, account });
        return;
      }
      const keyString = [
        account,
        chainId,
        gas0Balance,
        !!_walletClient,
        !!aaWalletClient
      ].join("-");
      console.log({ gas0Balance, config });
      if (Gas0Constants[chainId]) {
        if (key.current === keyString && _walletClient && aaWalletClient) {
          return;
        }
        setIsSet(true);
        key.current = keyString;
        if (new BigNumberJs_default(gas0Balance).gt(0) && config.deployer_address !== zeroAddress2) {
          console.log(1111);
          console.log(33333);
          const WH = new WagmiWalletHandler(walletClient, gas0Balance, config);
          setAaWallet((pre) => ({
            ...pre,
            wallet: WH,
            aa: WH.aa,
            account: WH.account.address,
            aa_mm_address: WH.aa ? WH.aa.address : WH.account.address,
            walletClient: WH.getWalletClient(),
            aaWalletClient: WH.getAAWalletClient()
          }));
          setIsSet(false);
          return;
        }
      }
      setIsSet(true);
      console.log(4444);
      console.log({ account });
      setAaWallet((pre) => ({
        ...pre,
        wallet: void 0,
        aa: void 0,
        account,
        aa_mm_address: account,
        walletClient,
        aaWalletClient: walletClient
      }));
      setIsSet(false);
      return;
    } catch (err) {
      console.log("getWalletClient err", err);
    }
  }, [key.current, account, chainId, walletClient, gas0Balance]);
  return { getWalletClient };
};
var useCreate = () => {
  const { account: owner, wallet, aa_mm_address } = useAaWallet();
  const create = useCallback(async () => {
    console.log(222222);
    if (wallet && aa_mm_address && wallet.aa && owner) {
      console.log(11111);
      const isCreate = await getIsCode(wallet.publicClient, aa_mm_address);
      console.log(1, { isCreate });
      if (!isCreate) {
        const hash = await gas0WalletCreateAndApprove(
          owner,
          wallet.aa.config.api,
          wallet.aa.isFree
        );
        console.log(1);
        if (!hash)
          return;
        console.log(1, hash);
        await wallet.publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1
        });
      }
    }
  }, [owner, aa_mm_address]);
  return create;
};

// src/hooks/useGetTgName.ts
var tgNameListState = atom3({
  key: "tgNameListState",
  default: {}
});
var useGetTgName = () => {
  const tgNameList = useRecoilValue3(tgNameListState);
  const setTgNameList = useSetRecoilState2(tgNameListState);
  const { wallet } = useAaWallet();
  const setTgName = useCallback2(
    async (address) => {
      const filterList = address.filter((v) => !tgNameList[v]);
      if (filterList && filterList.length) {
        const { data } = await httpGet(
          TG_BOT_URL + `/user/ger_user_name?list=${JSON.stringify(filterList)}`
        );
        if (Array.isArray(data) && data.length && data.every((item) => Array.isArray(item) && item.length === 2)) {
          const ltgNameList = Object.fromEntries(data);
          setTgNameList((pre) => ({ ...pre, ...ltgNameList }));
        }
      }
    },
    [wallet, JSON.stringify(tgNameList)]
  );
  return {
    setTgName,
    tgNameList
  };
};

// src/hooks/useGetOwnAddress.ts
import { useCallback as useCallback3 } from "react";
import { atom as atom4, useRecoilValue as useRecoilValue4, useSetRecoilState as useSetRecoilState3 } from "recoil";
import { createPublicClient as createPublicClient2, http as http2 } from "viem";

// src/contract/multicall.ts
import { Multicall } from "ethereum-multicall";

// src/connectors/contractV2.ts
import { AddressZero as AddressZero2 } from "@ethersproject/constants";
import { ethers as ethers2, providers, utils as utils2 } from "ethers";
import {
  getContract as viemGetContract
} from "viem";

// src/rainbow/rainbow.ts
import { createPublicClient, fallback, http } from "viem";
import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { particleWallet } from "@particle-network/rainbowkit-ext";
import { ParticleNetwork } from "@particle-network/auth";

// src/rainbowkit/src/wallets/connectorsForWallets.ts
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

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

// src/rainbowkit/src/wallets/walletConnectors/bitgetWallet/bitgetWallet.ts
import { InjectedConnector } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector({
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

// src/rainbowkit/src/wallets/walletConnectors/okxWallet/okxWallet.ts
import { InjectedConnector as InjectedConnector2 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector2({
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

// src/rainbowkit/src/wallets/walletConnectors/tokenPocketWallet/tokenPocketWallet.ts
import { InjectedConnector as InjectedConnector3 } from "wagmi/connectors/injected";
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
      }) : new InjectedConnector3({ chains });
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

// src/rainbow/utils/tgChain.ts
import { zeroAddress as zeroAddress3, createWalletClient as createWalletClient2, custom as custom2, publicActions as publicActions2 } from "viem";
import { MockConnector } from "wagmi/connectors/mock";
import { ethers } from "ethers";

// src/rainbow/telegramWallet.tsx
import { Signer, utils } from "ethers";
var { resolveProperties } = utils;
var TelegramWallet = class extends Signer {
  constructor(address, provider, api, WebAppData) {
    super();
    this.provider = provider;
    this.address = address;
    this.api = api;
    this.WebAppData = WebAppData;
  }
  getAddress() {
    return Promise.resolve(this.address);
  }
  async signMessage(message) {
    const res = await httpPost(`${this.api}/wallet/use`, {
      WebAppData: this.WebAppData,
      method: "signMessage",
      params: window.dataToSign,
      isArrayify: window.isArrayify
    });
    if (res.code)
      throw new Error(res.msg);
    return Promise.resolve(res.data);
  }
  signTransaction(transaction) {
    try {
      return resolveProperties(transaction).then(async (tx) => {
        const res = await httpPost(`${this.api}/wallet/use`, {
          WebAppData: this.WebAppData,
          method: "signTransaction",
          params: tx
        });
        if (res.code)
          throw new Error(res.msg);
        return Promise.resolve(res.data);
      });
    } catch (err) {
      console.log("signTransaction", err);
      throw err;
    }
  }
  connect(provider) {
    this.provider = provider;
    return this;
  }
  setAddress(address) {
    this.address = address;
  }
  async sendTransaction(transaction) {
    console.log("addd---------1");
    this._checkProvider("sendTransaction");
    console.log("addd---------3", transaction);
    const tx = await this.populateTransaction(transaction);
    console.log("addd--------5");
    const signedTx = await this.signTransaction(tx);
    console.log("addd--------91");
    return this.provider.sendTransaction(signedTx);
  }
};

// src/utils/sleep.ts
function timeoutPromise(timeoutMs = 1e4) {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Operation timed out")), timeoutMs);
  });
}
function sleep(seconds) {
  const now = +new Date();
  let t;
  return new Promise((resolve, reject) => {
    t = setInterval(() => {
      if (now + seconds * 1e3 < +new Date()) {
        clearInterval(t);
        resolve(true);
      }
    }, 10);
  });
}

// src/rainbow/utils/tgChain.ts
var tgChain = ({
  WebAppData,
  publicClient,
  chains,
  setAaWallet
}) => {
  const provider = new ethers.providers.JsonRpcProvider(
    ChainRpcUrls["2717465680371000" /* SagaMainnet */][0]
  );
  const acc = new TelegramWallet(
    localStorage.getItem("TelegramUserIdEvmAddressKey") || zeroAddress3,
    provider,
    TG_BOT_URL,
    WebAppData
  );
  const account = acc.address;
  const pub = publicClient({ chainId: "2717465680371000" /* SagaMainnet */ });
  const walletClient = createWalletClient2({
    account,
    chain: AllChainInfo["2717465680371000" /* SagaMainnet */],
    transport: custom2({
      async request({ method, params }) {
        const useLocal = ["eth_sendTransaction", "personal_sign"].includes(
          method
        );
        if (!useLocal) {
          const res = await pub.request({ method, params });
          return res;
        }
        if (method === "eth_sendTransaction") {
          const fmt = { ...params[0] };
          fmt.gasLimit = fmt.gas;
          delete fmt.gas;
          const txr = await acc.sendTransaction(fmt);
          return txr.hash;
        }
        if (method === "personal_sign") {
          const txr = await acc.signMessage(params[0]);
          console.log({ txr });
          return txr;
        }
      }
    })
  }).extend(publicActions2);
  const mock = new MockConnector({ chains, options: { walletClient } });
  setAaWallet((pre) => ({
    ...pre,
    mockAcc: async (address, proof) => {
      acc.setAddress(address);
      walletClient.account.address = address;
      mock.emit("change", { account: address });
      await sleep(0.2);
    }
  }));
  return [mock];
};

// src/rainbow/rainbow.ts
var getSupportedChainIdList = (env, chainIdList) => {
  const list = (chainIdList != null ? chainIdList : supportedChainIds(env)).map(
    (v) => AllChainInfo[v]
  );
  return window.IS_TELEGRAM ? [...list, AllChainInfo["2717465680371000" /* SagaMainnet */]] : list;
};
new ParticleNetwork({
  appId: "a2ecac32-b520-477a-abf6-4fa8cdfcc046",
  clientKey: "clITVBUqxtJzy2ymp8z4SQOUFWIc5qPUUHPks8ap",
  projectId: "763e083a-deb5-4fe9-8b7a-2a9c56659199"
});
var getConfigureChains = ({
  env,
  chainIdList
}) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    getSupportedChainIdList(env, chainIdList),
    [publicProvider()]
  );
  return { chains, publicClient, webSocketPublicClient };
};
var projectId = "bc467c124a7a7a8ce06a41ef40b1b842";
var getConnectors = ({
  env,
  publicClient,
  chainIdList,
  WebAppData,
  setAaWallet
}) => {
  const { chains } = getConfigureChains({ env, chainIdList });
  if (window.IS_TELEGRAM) {
    return tgChain({
      WebAppData,
      publicClient,
      chains,
      setAaWallet
    });
  }
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
var getWagmiConfig = ({
  env,
  setAaWallet,
  chainIdList,
  WebAppData
}) => {
  const { publicClient, webSocketPublicClient } = getConfigureChains({
    env,
    chainIdList
  });
  const connectors = getConnectors({
    env,
    publicClient,
    chainIdList,
    WebAppData,
    setAaWallet
  });
  console.log({ connectors });
  return createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    webSocketPublicClient
  });
};
var viemClients = (env) => {
  const { chains } = getConfigureChains({ env });
  return chains.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.id]: createPublicClient({
        chain: cur,
        transport: fallback(
          ChainRpcUrls[`${cur.id}`].map(
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
            batchSize: `${cur.id}` === "1442" /* POLYGON_ZKEVM */ ? 128 : 1024 * 200
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

// src/connectors/contractV2.ts
var Contract = ethers2.Contract;
var getAddress = utils2.getAddress;
var getContract2 = ({
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

// src/utils/getChainId.ts
var getChainId = async () => {
  const provider = await getProvider();
  const network = await provider.getNetwork();
  const isError = !Object.values(ChainId).includes(
    `${network.chainId}`
  );
  if (isError) {
    throw new Error("Network not supported");
  }
  return network.chainId;
};

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

// src/contract/multicall.ts
var MulticallContract = async (chainIdParams) => {
  try {
    const chainId = `${chainIdParams != null ? chainIdParams : await getChainId()}`;
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

// src/hooks/useGetOwnAddress.ts
var ownerListState = atom4({
  key: "ownerListState",
  default: {}
});
var useGetOwnAddress = () => {
  const { chainId } = useActiveWeb3React();
  const ownerList = useRecoilValue4(ownerListState);
  const setAddressOwnerList = useSetRecoilState3(ownerListState);
  const setOwnerAddress = useCallback3(
    async (address) => {
      try {
        const publicClient = createPublicClient2({
          chain: AllChainInfo[chainId],
          transport: http2(sample(ChainRpcUrls[chainId]), { timeout: 4e3 })
        });
        if (publicClient) {
          const filterList = address.filter((v) => !ownerList[v]);
          if (filterList && filterList.length) {
            const isCodeList = [];
            for (const _address of filterList) {
              try {
                const isCode = await getIsCode(publicClient, _address);
                isCodeList.push([_address, isCode]);
              } catch (error) {
              }
            }
            const hasCode = isCodeList.filter((v) => v[1]);
            if (hasCode && hasCode.length) {
              const hasCodeAddress = hasCode.map((v) => v[0]);
              const multicall = await multicall_default(chainId);
              console.log({ multicall });
              if (multicall) {
                const params = hasCodeAddress.map((__address, index) => ({
                  reference: "owner" + __address.toLowerCase() + chainId,
                  contractAddress: __address,
                  abi: WalletAbi,
                  calls: [
                    {
                      methodName: "owner",
                      reference: "owner"
                    }
                  ]
                }));
                console.log({ params });
                const { results } = await multicall.call(params);
                console.log({ results });
                if (results) {
                  const map = Object.fromEntries(
                    Object.values(results).map((v) => [
                      v["originalContractCallContext"].contractAddress.toLowerCase(),
                      v["callsReturnContext"][0]["returnValues"][0]
                    ])
                  );
                  console.log({ results, map });
                  setAddressOwnerList((pre) => ({
                    ...pre,
                    ...map
                  }));
                }
              }
            }
          }
        }
      } catch (error) {
        console.log("setOwnerAddress: ", { error });
      }
    },
    [JSON.stringify(ownerList), chainId]
  );
  console.log({ ownerList });
  return {
    setOwnerAddress,
    ownerList
  };
};

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
import {
  useWalletClient as useWalletClient2,
  useSwitchNetwork as useSwitchNetwork2,
  useDisconnect as useDisconnect6,
  useAccount as useAccount14,
  usePublicClient as usePublicClient4,
  useContractReads
} from "wagmi";

// src/gas0/utils/aaApproveAndFcErc20.ts
import { hexToSignature as hexToSignature3, encodeFunctionData, getContract as getContract4 } from "viem";

// src/gas0/abis/PermitProxy.ts
var PermitProxyAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_deployer",
        type: "address"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "contract ERC20Permit",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "transferTokenToProxyContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "walletCode",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// src/gas0/abis/ERC20Permit.ts
var ERC20PermitAbi = [
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
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
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
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
        name: "to",
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
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/gas0/utils/encodeFunctionMulticall.ts
import { hexToSignature as hexToSignature2 } from "viem";
var encodeFunctionMulticall = async (wallet, items) => {
  if (!wallet.aa)
    throw new Error("aa empty!");
  const nonce = await wallet.aaNonce();
  const calls = await wallet.walletClient.signTypedData({
    ...ZytronMulticallTypedData(wallet.chainId),
    message: {
      tip: wallet.aa.configFromApi.function_multicall_tip,
      items,
      nonce
    }
  });
  const { v, r, s } = hexToSignature2(calls);
  if (wallet.aa.isFree) {
    const res = await httpPost(`${wallet.aa.config.api}/functionmulticall`, {
      list: items.map((v2) => ({
        wallet: v2.from,
        to: v2.to,
        data: v2.data,
        value: String(v2.value)
      })),
      v: Number(v),
      r,
      s,
      owner: wallet.walletClient.account.address
    });
    if (res.code !== 0)
      throw new Error(`functionmulticall err: ${res.msg}`);
    const data = res.data.data ? res.data.data : res.data;
    console.log("res", res);
    return data.tx_hash;
  }
  return wallet.aa.contract.write.functionMulticall([items, Number(v), r, s]);
};

// src/gas0/utils/aaApproveAndFcErc20.ts
var aaApproveAndFcErc20 = async ({
  erc20Address,
  wallet,
  tokenAmount,
  permitForAddress,
  otherFc
}) => {
  const owner = wallet.account.address;
  const chainId = wallet.chainId;
  const walletClient = wallet.getWalletClient();
  const aa = wallet.aa;
  if (!aa) {
    throw Error(`${owner} has no aa wallet`);
  }
  const GP = getContract4({
    abi: ERC20PermitAbi,
    address: wallet.address.GP,
    publicClient: wallet.publicClient
  });
  const nonce = await GP.read.nonces([owner]);
  const deadline = BigInt(Math.floor(Date.now() / 1e3) + 10 * 60);
  const gpName = await GP.read.name();
  const from = aa.address;
  const Permit = await walletClient.signTypedData({
    ...ZytronPermitTypedData(gpName, chainId, erc20Address),
    message: {
      owner,
      spender: aa.config.PermitProxy,
      value: BigInt(tokenAmount),
      nonce,
      deadline
    }
  });
  const { v, r, s } = hexToSignature3(Permit);
  const functionName = "transferTokenToProxyContract";
  const Transfer2aa = encodeFunctionData({
    abi: PermitProxyAbi,
    args: [
      erc20Address,
      owner,
      aa.address,
      BigInt(tokenAmount),
      deadline,
      Number(v),
      r,
      s
    ],
    functionName
  });
  const Approve2game = encodeFunctionData({
    abi: ERC20PermitAbi,
    args: [permitForAddress, BigInt(tokenAmount)],
    functionName: "approve"
  });
  console.log({ otherFc });
  const tx = await encodeFunctionMulticall(wallet, [
    { from, to: aa.config.PermitProxy, data: Transfer2aa, value: BigInt(0) },
    { from, to: wallet.address.GP, data: Approve2game, value: BigInt(0) },
    ...otherFc
  ]);
  return tx;
};

// src/constant/tvlConstant.ts
var TVL_API = "https://tvl-backend-api.zypher.game";
var ITvlHero = /* @__PURE__ */ ((ITvlHero2) => {
  ITvlHero2["Agil"] = "Agil";
  ITvlHero2["Yueling"] = "Yueling";
  ITvlHero2["Celus"] = "Celus";
  ITvlHero2["Ivan"] = "Ivan";
  ITvlHero2["Liana"] = "Liana";
  return ITvlHero2;
})(ITvlHero || {});
var TVLChainId = ((TVLChainId2) => {
  TVLChainId2[TVLChainId2["B2"] = "223" /* B2 */] = "B2";
  TVLChainId2[TVLChainId2["B2Testnet"] = "1123" /* B2Testnet */] = "B2Testnet";
  TVLChainId2[TVLChainId2["LineaMainnet"] = "59144" /* LineaMainnet */] = "LineaMainnet";
  TVLChainId2[TVLChainId2["LineaSepolia"] = "59141" /* LineaSepolia */] = "LineaSepolia";
  return TVLChainId2;
})(TVLChainId || {});
var TVLStakingSupportedChainId = !isPro() ? [TVLChainId.LineaSepolia] : [];
var defaultActiveChainId = TVLStakingSupportedChainId[0];
var L3ChainId = {
  [TVLChainId.B2]: "50097" /* ZytronB2Testnet */,
  [TVLChainId.B2Testnet]: "50097" /* ZytronB2Testnet */,
  [TVLChainId.LineaMainnet]: "19546" /* ZytronLineaSepoliaTestnet */,
  [TVLChainId.LineaSepolia]: "19546" /* ZytronLineaSepoliaTestnet */
};
var activeTokenList = {
  [TVLChainId.LineaSepolia]: {
    Staking: "0x9F175b446F194c9A6aca09e998EF3327158d6eb7",
    ZypherGameToken: "0x91D416d939baA3Aa822DD1B776fC5e9610b952C2",
    CRHero: "0x90a5B2a7Eb91562b1e3189dcf14f62B2529bEC7e",
    Soulbound: "0xf3ca479d43885C714537a58063604D314ecabe0E"
  },
  [TVLChainId.B2Testnet]: {
    Staking: "0x3A10Aa6D3d177AF22433CF1f1B6Ee1f7B7DbD303",
    ZypherGameToken: "0x48C459e81aAD8B98e27002D25f191682C9a9fFBb",
    CRHero: "0x5f441d16bA9A5e3a824f4c287eDA8019F97418f6",
    Soulbound: "0x77DB62EAB363e6DEF480e4C63210f162438eeD77"
  }
};
var tvlTokenAddress = {
  [TVLChainId.LineaSepolia]: {
    WETH: "0xAeb65CCDe3b88CA9095D7Cc1d8ACa82ae865AcA6",
    wstETH: "0xd9c4d0Bf3881510d9d7a883c94Bd856c4d314370",
    ezETH: "0x79A67D40f3e7396FC122268DC0136896cC7D7271",
    STONE: "0xf8b7E9A37857B01Cb9AD74e6fCaD149f44490601"
  },
  [TVLChainId.B2Testnet]: {
    WBTC: "0x9Cae525AdE710904FE81daF47fD26789608fe057",
    stBTC: "0x4AC1Ba5885929aFDdbf035bA03013836db27012C"
  }
};
var tvlTokens = Object.fromEntries(
  TVLStakingSupportedChainId.map((chainId) => [
    chainId,
    Object.fromEntries(
      Object.keys(tvlTokenAddress[chainId]).map((currency) => [
        currency,
        {
          address: tvlTokenAddress[chainId][currency],
          symbol: currency,
          logoPath: getCryptoImg(
            "token",
            currency,
            currency === "BTC" || currency === "WBTC" || currency === "STONE" ? ".svg" : ".png"
          ),
          index: 2
        }
      ])
    )
  ])
);
var LinkPre = {
  L: {
    key: 1,
    label: "L",
    chainId: isPro() ? TVLChainId.LineaMainnet : TVLChainId.LineaSepolia
  },
  B: {
    key: 2,
    label: "B",
    chainId: isPro() ? TVLChainId.B2 : TVLChainId.B2Testnet
  }
};
var getLinkPre = (chainId) => {
  return Object.values(LinkPre).filter((v) => v.chainId === chainId)[0];
};
var minStakingValue = {
  [TVLChainId.B2]: "0.0005",
  [TVLChainId.B2Testnet]: "0.0005",
  [TVLChainId.LineaMainnet]: "0.01",
  [TVLChainId.LineaSepolia]: "0.01"
};
var CODELENGTH = 6;

// src/hooks/useTelegramUser.ts
import { useEffect as useEffect5, useMemo as useMemo2 } from "react";
import {
  atom as atom5,
  useRecoilState,
  useRecoilValue as useRecoilValue5,
  useSetRecoilState as useSetRecoilState4
} from "recoil";

// src/hooks/useEffectValue.tsx
import { useEffect as useEffect4, useRef as useRef3, useState as useState4 } from "react";
function useEffectValue(init, handler, deps) {
  const [state, _state] = useState4(init);
  const ref = useRef3(1);
  useEffect4(() => {
    ref.current++;
    const id = ref.current;
    handler().then((res) => {
      if (ref.current !== id)
        return;
      _state(res);
    });
  }, deps);
  return state;
}

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

// src/utils/tool.tsx
import BigNumber from "bignumber.js";
import { utils as utils3 } from "ethers";
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
      return Number(0).toFixed();
    }
    if (value === 0 || value === "0") {
      return Number(0).toFixed();
    }
    const isNegative = Number(value) < 0;
    const absValue = Math.abs(Number(value));
    const isInteger = Number.isInteger(absValue);
    const v = formatDecimal(
      Math.abs(Number(value)),
      isInteger ? 0 : n > 0 ? n : 0
    );
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
  let _preLen = preLen;
  let _endLen = endLen;
  if (!address) {
    return "";
  }
  if (address.length !== 42) {
    _preLen = 3;
    _endLen = 3;
  }
  const firstCharacters = address.substring(0, _preLen);
  const lastCharacters = address.substring(
    address.length - _endLen,
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
  return `${utils3.commify(
    (amount / base3).toFixed(precision)
  )}${unit}`;
}
function formatSymbol(symbol) {
  return symbol ? symbol === "WTT" ? symbol.replace(/W/, "") : symbol.replace(/TT-/, "") : "";
}

// src/hooks/useTelegramUser.ts
var RefreshState = atom5({
  key: "RefreshState",
  default: 0
});
var TelegramUserInfoState = atom5({
  key: "TelegramUserInfoState",
  default: null,
  effects_UNSTABLE: [localStorageEffect("TelegramUserInfoState")]
});
var WebAppDataState = atom5({
  key: "WebAppDataState",
  default: void 0,
  effects_UNSTABLE: [localStorageEffect("WebAppDataState")]
});
var getFaucet = async (WebAppData) => {
  try {
    const resaaa = httpPost(`${TG_BOT_URL}/wallet/get`, {
      WebAppData
    });
    const address = (await resaaa).data;
    if (address && address.startsWith("0x")) {
      const faucetURL = "https://mainnet-simple-faucet.zypher.game";
      await fetch(faucetURL, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ address })
      });
    }
  } catch (e) {
    console.log("getFaucet Error", e);
  }
};
var useTelegramUser = () => {
  const { mockAcc } = useAaWallet();
  const IS_TELEGRAM = useIsTelegram();
  const [WebAppData, setWebAppData] = useRecoilState(WebAppDataState);
  const _user = useSetRecoilState4(TelegramUserInfoState);
  const refresh = useRecoilValue5(RefreshState);
  const account = useMemo2(() => {
    return localStorage.getItem("TelegramUserIdEvmAddressKey");
  }, []);
  const user = useEffectValue(
    null,
    async () => {
      console.log({ refresh, WebApp: WebAppData });
      if (!IS_TELEGRAM) {
        return null;
      }
      let _user2 = void 0;
      if (WebAppData && WebAppData.user && WebAppData.user !== "") {
        console.log(22222, { WebAppData: WebAppData.user });
        const { data } = await httpPost(
          `${TG_BOT_URL}/user/get`,
          {
            WebAppData
          }
        );
        getFaucet(WebAppData);
        _user2 = data;
      }
      if (account && !_user2) {
        console.log(33333, { account });
        const { data } = await httpPost(
          `${TG_BOT_URL}/user/get/by/evm`,
          {
            evm: account
          }
        );
        console.log("userevm evm: ", { data });
        _user2 = data;
      }
      console.log("user: ", { _user: _user2 });
      return _user2 ? {
        ..._user2,
        starStr: formatMoney(new BigNumberJs_default(_user2.star).toFormat(), 8)
      } : void 0;
    },
    [WebAppData == null ? void 0 : WebAppData.user, refresh]
  );
  useEffect5(() => {
    if (user) {
      localStorage.setItem("TelegramUserIdEvmAddressKey", user.evmWallet);
      mockAcc(user.evmWallet);
      _user(user);
    } else {
      _user(null);
    }
  }, [JSON.stringify(user)]);
  useEffect5(() => {
    var _a, _b, _c, _d, _e, _f;
    console.log({ IS_TELEGRAM });
    if (IS_TELEGRAM) {
      try {
        let _WebAppData = {
          auth_date: "",
          hash: "",
          query_id: "",
          user: ""
        };
        const params = new URLSearchParams((_b = (_a = window.Telegram) == null ? void 0 : _a.WebApp) == null ? void 0 : _b.initData);
        _WebAppData.query_id = (_c = params.get("query_id")) != null ? _c : "";
        _WebAppData.user = (_d = params.get("user")) != null ? _d : "";
        _WebAppData.hash = (_e = params.get("hash")) != null ? _e : "";
        _WebAppData.auth_date = (_f = params.get("auth_date")) != null ? _f : "";
        console.log({ _WebAppData });
        if (_WebAppData.user !== "") {
          setWebAppData(_WebAppData);
          window.WebAppData = _WebAppData;
        }
      } catch (err) {
        console.error("WebAppData", err);
      }
    }
  }, [IS_TELEGRAM]);
  return WebAppData;
};
var useWebAppData = () => {
  return useRecoilValue5(WebAppDataState);
};
var useTelegramAccountInit = (userInfo, _userInfo, setIsModalOpen) => {
  const WebAppData = useWebAppData();
  return useEffectValue(
    null,
    async () => {
      console.log(1111111);
      if (!(userInfo == null ? void 0 : userInfo.star))
        return null;
      if (userInfo.star !== "0")
        return null;
      const res = await httpPost(
        `${TG_BOT_URL}/user/init-star`,
        { WebAppData }
      );
      if (res.code)
        return null;
      _userInfo({
        ...res.data,
        starStr: formatMoney(new BigNumberJs_default(res.data.star).toFixed(), 8)
      });
      setIsModalOpen(true);
      return res.data;
    },
    [userInfo == null ? void 0 : userInfo.star]
  );
};

// src/hooks/useNavItem.tsx
import React8, { useMemo as useMemo3 } from "react";

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
import React7, { memo as memo6, useCallback as useCallback6 } from "react";

// src/hooks/useCustomTranslation.ts
import { useTranslation as useBaseTranslation } from "react-i18next";
var useCustomTranslation = (namespaces) => {
  const { t, i18n: i18n3 } = useBaseTranslation(namespaces);
  return { t, i18n: i18n3 };
};

// src/hooks/useCurrentLanguage.ts
import i18n from "i18next";
import { useEffect as useEffect6, useState as useState5 } from "react";
var useCurrentLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState5(i18n.language);
  const { t } = useCustomTranslation([LngNs.common]);
  useEffect6(() => {
    setCurrentLanguage(i18n.language);
  }, [t("language")]);
  return currentLanguage;
};

// src/components/SideBar/component/Language.tsx
import classnames2 from "classnames";

// src/components/PixelBtn/ActivePixelButton.tsx
import React2, { memo as memo2, useCallback as useCallback4, useRef as useRef4, useState as useState6 } from "react";
import styled from "styled-components";

// src/components/PixelBtn/PixelFlatBtn.tsx
import React, { memo } from "react";
import { motion } from "framer-motion";
var PixelFlatBtn = memo((props) => {
  const { onClick, children, className, style, hidePixel, ..._props } = props;
  if (hidePixel) {
    return /* @__PURE__ */ React.createElement("div", {
      className,
      onClick
    }, children);
  }
  if (onClick) {
    return /* @__PURE__ */ React.createElement(motion.div, {
      ..._props,
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
  }
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

// src/components/PixelBtn/ActivePixelButton.tsx
var PixelStyled = styled(PixelFlatBtn_default)`
  height: ${({ height }) => height};
  min-height: ${({ height }) => height};
  max-width: ${({ width }) => width};
  width: ${({ width }) => width};
  opacity: ${({ disable }) => disable ? 0.8 : 1};
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
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      top: calc(${({ pixel_height }) => pixel_height}px * 2);
      left: 0;
    }

    > .pixel_flat_btn_top_1 {
      top: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
    }
    > .pixel_flat_btn_top_2 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      top: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
    }

    > .pixel_flat_btn_bottom_2 {
      bottom: 0;
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 4);
      left: calc(${({ pixel_height }) => pixel_height}px * 2);
    }
    > .pixel_flat_btn_bottom_1 {
      width: calc(100% - ${({ pixel_height }) => pixel_height}px * 2);
      bottom: ${({ pixel_height }) => pixel_height}px;
      left: ${({ pixel_height }) => pixel_height}px;
    }
  }
  > .pixel_flat_inner {
    width: 100%;
    height: 100%;
  }
`;
var ActivePixelCard = memo2((props) => {
  const { onClick, hidePixel } = props;
  const lastClickTimeRef = useRef4(Date.now());
  const clickHandle = useCallback4(() => {
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
  return hidePixel ? /* @__PURE__ */ React2.createElement(PixelFlatBtn_default, {
    ...props,
    onClick: clickHandle
  }) : /* @__PURE__ */ React2.createElement(PixelStyled, {
    ...props,
    onClick: clickHandle
  });
});
var ActivePixelCardStyled = styled(ActivePixelCard)`
  cursor: pointer;
`;
var ActivePixelButton = memo2((props) => {
  return /* @__PURE__ */ React2.createElement(ActivePixelCardStyled, {
    ...props
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
        transition: all 0.3s ease;
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
    }
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ borderBottomColor }) => borderBottomColor != null ? borderBottomColor : "#0f33b2"};
    }
    > .pixel_flat_btn_bottom_1 {
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderBottomColor }) => borderBottomColor != null ? borderBottomColor : "#0f33b2"};
    }
  }
`;
var ActivePixelColorCard = memo2((props) => {
  const {
    className,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    height
  } = props;
  return /* @__PURE__ */ React2.createElement(PixelColorStyled, {
    ...props,
    className,
    pixel_height,
    backgroundColor,
    width,
    height,
    borderColor
  });
});
var cardTheme = {
  yellow: {
    normal: {
      borderBottomColor: "#E1820C",
      borderTopColor: "#FFE299",
      backgroundColor: "#FEBE1E"
    },
    hover: {
      borderBottomColor: "#DEA534",
      borderTopColor: "#FFEFB8",
      backgroundColor: "#FFDA58"
    },
    click: {
      borderBottomColor: "#A4720E",
      borderTopColor: "#FDD64C",
      backgroundColor: "#F0BE0C"
    }
  },
  brown: {
    normal: {
      backgroundColor: "#61341F",
      borderBottomColor: "#30170B",
      borderTopColor: "#7F5441"
    },
    hover: {
      backgroundColor: "#805440",
      borderBottomColor: "#61341F",
      borderTopColor: "#A17560"
    },
    click: {
      borderBottomColor: "#2C180F",
      borderTopColor: "#533628",
      backgroundColor: "#412315"
    }
  },
  brightBlue: {
    normal: {
      backgroundColor: "#1649FF",
      borderBottomColor: "#0F33B2",
      borderTopColor: "#3360FF"
    },
    hover: {
      backgroundColor: "#406AFF",
      borderBottomColor: "#183BB7",
      borderTopColor: "#5C80FF"
    },
    click: {
      borderBottomColor: "#0E267D",
      borderTopColor: "#0E43FF",
      backgroundColor: "#022FD0"
    }
  },
  pureBrightBlue: {
    normal: {
      borderBottomColor: "#0E43FF",
      borderTopColor: "#0E43FF",
      backgroundColor: "#0E43FF"
    },
    hover: {
      borderBottomColor: "#0E43FF",
      borderTopColor: "#0E43FF",
      backgroundColor: "#0E43FF"
    },
    click: {
      borderBottomColor: "#0E43FF",
      borderTopColor: "#0E43FF",
      backgroundColor: "#0E43FF"
    }
  }
};
var ActivePixelButtonColorStyled = styled(PixelStyled)`
  cursor: pointer;
  > .pixel_flat_btn_bg {
    > div {
      background-color: ${({ themeType }) => cardTheme[themeType].normal.backgroundColor};
    }
    > .pixel_flat_btn_inner {
      &:before,
      &:after {
        content: "";
        position: absolute;
        width: ${({ pixel_height }) => pixel_height}px;
        height: ${({ pixel_height }) => pixel_height}px;
        transition: all 0.3s ease;
      }
      &:before {
        top: 0;
        left: 0;
        background-color: ${({ themeType }) => cardTheme[themeType].normal.borderTopColor};
      }
      &:after {
        bottom: 0;
        right: 0;
        background-color: ${({ themeType }) => cardTheme[themeType].normal.borderBottomColor};
      }
    }
    > .pixel_flat_btn_top_1 {
      background-color: ${({ themeType }) => cardTheme[themeType].normal.borderTopColor};
    }
    > .pixel_flat_btn_top_2 {
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ themeType }) => cardTheme[themeType].normal.borderTopColor};
    }
    > .pixel_flat_btn_bottom_2 {
      background-color: ${({ themeType }) => cardTheme[themeType].normal.borderBottomColor};
    }
    > .pixel_flat_btn_bottom_1 {
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ themeType }) => cardTheme[themeType].normal.borderBottomColor};
    }
  }
  &.disable {
    opacity: 0.8;
    cursor: not-allowed;
  }
  &.normal {
    &:hover {
      > .pixel_flat_btn_bg {
        > div {
          background-color: ${({ themeType }) => cardTheme[themeType].hover.backgroundColor};
        }
        > .pixel_flat_btn_inner {
          &:before,
          &:after {
            content: "";
          }
          &:before {
            background-color: ${({ themeType }) => cardTheme[themeType].hover.borderTopColor};
          }
          &:after {
            background-color: ${({ themeType }) => cardTheme[themeType].hover.borderBottomColor};
          }
        }
        > .pixel_flat_btn_top_1 {
          background-color: ${({ themeType }) => cardTheme[themeType].hover.borderTopColor};
        }
        > .pixel_flat_btn_top_2 {
          border-left: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].hover.borderTopColor};
        }
        > .pixel_flat_btn_bottom_2 {
          background-color: ${({ themeType }) => cardTheme[themeType].hover.borderBottomColor};
        }
        > .pixel_flat_btn_bottom_1 {
          border-right: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].hover.borderBottomColor};
        }
      }
    }
    &.click {
      > .pixel_flat_btn_bg {
        > div {
          background-color: ${({ themeType }) => cardTheme[themeType].click.backgroundColor};
        }
        > .pixel_flat_btn_inner {
          &:before,
          &:after {
            content: "";
          }
          &:before {
            background-color: ${({ themeType }) => cardTheme[themeType].click.borderTopColor};
          }
          &:after {
            background-color: ${({ themeType }) => cardTheme[themeType].click.borderBottomColor};
          }
        }
        > .pixel_flat_btn_top_1 {
          background-color: ${({ themeType }) => cardTheme[themeType].click.borderTopColor};
        }
        > .pixel_flat_btn_top_2 {
          border-left: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].click.borderTopColor};
        }
        > .pixel_flat_btn_bottom_2 {
          background-color: ${({ themeType }) => cardTheme[themeType].click.borderBottomColor};
        }
        > .pixel_flat_btn_bottom_1 {
          border-right: ${({ pixel_height }) => pixel_height}px solid
            ${({ themeType }) => cardTheme[themeType].click.borderBottomColor};
        }
      }
    }
  }
`;
var ActivePixelButtonColor = memo2((props) => {
  const { onClick, className, disable } = props;
  const [isActive, setIsActive] = useState6(false);
  const clickHandle = useCallback4(() => {
    if (onClick) {
      setIsActive(true);
      setTimeout(() => {
        setIsActive(false);
      }, 1e3);
      onClick();
    }
  }, [onClick]);
  return /* @__PURE__ */ React2.createElement(ActivePixelButtonColorStyled, {
    className: `${className != null ? className : ""} ${disable ? "disable" : "normal"} ${isActive ? "click" : ""}`,
    onClick: clickHandle,
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
      height: calc(
        ${({ pixel_height }) => pixel_height + "px"} +
          ${({ borderSize }) => borderSize != null ? borderSize : 1}px
      );
    }
    > .pixel_flat_btn_inner {
      height: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      top: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      left: 0;
      @media screen and (max-width: 830px) {
        height: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        top: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_inner,
    > .pixel_flat_btn_top_1,
    > .pixel_flat_btn_top_2,
    > .pixel_flat_btn_bottom_2,
    > .pixel_flat_btn_bottom_1 {
      border: ${({ borderSize }) => borderSize != null ? borderSize : 1}px solid
        ${({ borderColor }) => borderColor != null ? borderColor : "#3a4254"};
      transition: all 0.3s ease;
    }
    > .pixel_flat_btn_top_1 {
      border-bottom: none !important;
      z-index: 3;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
      left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      @media screen and (max-width: 830px) {
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
      @media screen and (max-width: 830px) {
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
      @media screen and (max-width: 830px) {
        width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 4);
        left: calc(${({ pixel_height }) => pixel_height + "px"} * 2);
      }
    }
    > .pixel_flat_btn_bottom_1 {
      border-top: none !important;
      width: calc(100% - ${({ pixel_height }) => pixel_height + "px"} * 2);
      bottom: ${({ pixel_height }) => pixel_height + "px"};
      left: ${({ pixel_height }) => pixel_height + "px"};
      @media screen and (max-width: 830px) {
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
var PixelBorderCard = memo2((props) => {
  const { className, onClick, hidePixel } = props;
  const lastClickTimeRef = useRef4(Date.now());
  const clickHandle = useCallback4(() => {
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
  return hidePixel ? /* @__PURE__ */ React2.createElement(PixelFlatBtn_default, {
    ...props,
    onClick: clickHandle
  }) : /* @__PURE__ */ React2.createElement(PixelBorderStyled, {
    ...props,
    className: `${className} pixelBorderCard`
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
var PixelCube2 = memo2((props) => {
  const {
    className,
    borderColor,
    backgroundColor,
    pixel_height,
    width,
    height,
    borderTopColor,
    borderBottomColor
  } = props;
  return /* @__PURE__ */ React2.createElement(PixelCube2Styled, {
    ...props,
    className,
    pixel_height,
    backgroundColor,
    width,
    height,
    borderColor,
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
        transition: all 0.3s ease;
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
var PixelCube3 = memo2((props) => {
  const { size } = props;
  return /* @__PURE__ */ React2.createElement(PixelCube3Styled, {
    ...props,
    size: size != null ? size : 3
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
        border-left: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
        border-right: ${({ pixel_height }) => pixel_height}px solid
          ${({ borderColor }) => borderColor};
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
      border-left: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
      border-right: ${({ pixel_height }) => pixel_height}px solid
        ${({ borderColor }) => borderColor};
    }
    > .pixel_flat_btn_top_1:before {
      top: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
    > .pixel_flat_btn_bottom_2:after {
      bottom: calc(${({ pixel_height }) => pixel_height}px * 3);
    }
  }
`;
var PixelCube5 = memo2((props) => {
  const { size } = props;
  return /* @__PURE__ */ React2.createElement(PixelCube5Styled, {
    ...props,
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
        border: ${({ borderSize }) => borderSize != null ? borderSize : 1}px solid
          ${({ showHover, borderColor }) => showHover === true ? "#1649FF" : borderColor};
      }
    }
  }
`;
var PixelBorderCardButton = memo2((props) => {
  return /* @__PURE__ */ React2.createElement(PixelBorderCardStyled, {
    ...props
  });
});

// src/components/SvgComponent/SvgComponent.tsx
import React3, { memo as memo3, useEffect as useEffect7, useState as useState7 } from "react";
var SvgComponent = memo3(({ src: src6, className, ...rest }) => {
  return src6.endsWith(".svg") ? /* @__PURE__ */ React3.createElement(Svg, {
    src: src6,
    className,
    ...rest
  }) : /* @__PURE__ */ React3.createElement("img", {
    decoding: "async",
    loading: "lazy",
    src: src6,
    className
  });
});
var Svg = memo3(({ src: src6, className, ...rest }) => {
  const [svgContent, setSvgContent] = useState7(null);
  useEffect7(() => {
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
          const Component = () => /* @__PURE__ */ React3.createElement("span", {
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
  return svgContent || /* @__PURE__ */ React3.createElement(React3.Fragment, null);
});
var SvgComponent_default = SvgComponent;

// src/components/Header/rainbow_account/IsPixelWidget.tsx
import React5, { memo as memo5 } from "react";

// src/hooks/useWindowSize.ts
import { useCallback as useCallback5, useContext, useEffect as useEffect9, useState as useState8 } from "react";

// src/provider/IsMobileProvider.tsx
import React4, { createContext, memo as memo4, useEffect as useEffect8 } from "react";
import { atom as atom6, useRecoilState as useRecoilState2 } from "recoil";
var isW768State = atom6({
  key: "isW768State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isW768State")]
});
var isWMdState = atom6({
  key: "isWMdState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isWMdState")]
});
var isW1100State = atom6({
  key: "isW1100State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isW1100State")]
});
var isW1220State = atom6({
  key: "isW1220State",
  default: false,
  effects_UNSTABLE: [localStorageEffect("isW1220State")]
});
var IsW768Context = createContext(void 0);
var IsW950Context = createContext(void 0);
var IsW1100Context = createContext(void 0);
var IsW1220Context = createContext(void 0);
var IsW768Provider = memo4(({ children }) => {
  const [isMobile2, setIsMobile] = useRecoilState2(isW768State);
  const size = useWindowSize();
  useEffect8(() => {
    const nowIsMobile = size.width < 830;
    if (isMobile2 !== nowIsMobile) {
      setIsMobile(nowIsMobile);
    }
  }, [size.width, isMobile2]);
  return /* @__PURE__ */ React4.createElement(IsW768Context.Provider, {
    value: isMobile2
  }, children);
});
var IsMdProvider = ({ children }) => {
  const [isWMd, setIsWMd] = useRecoilState2(isWMdState);
  const size = useWindowSize();
  useEffect8(() => {
    const nowIsMdMobile = size.width < 950;
    if (isWMd !== nowIsMdMobile) {
      setIsWMd(nowIsMdMobile);
    }
  }, [size.width, isWMd]);
  return /* @__PURE__ */ React4.createElement(IsW950Context.Provider, {
    value: isWMd
  }, children);
};
var IsW1100Provider = ({ children }) => {
  const [isW1100, setIsW1100] = useRecoilState2(isW1100State);
  const size = useWindowSize();
  useEffect8(() => {
    const nowIsW1100Mobile = size.width < 1100;
    if (isW1100 !== nowIsW1100Mobile) {
      setIsW1100(nowIsW1100Mobile);
    }
  }, [size.width, isW1100]);
  return /* @__PURE__ */ React4.createElement(IsW1100Context.Provider, {
    value: isW1100
  }, children);
};
var IsW1220Provider = ({ children }) => {
  const [isW1220, setIsW1220] = useRecoilState2(isW1220State);
  const size = useWindowSize();
  useEffect8(() => {
    const nowIsW1220Mobile = size.width < 1220;
    if (isW1220 !== nowIsW1220Mobile) {
      setIsW1220(nowIsW1220Mobile);
    }
  }, [size.width, isW1220]);
  return /* @__PURE__ */ React4.createElement(IsW1220Context.Provider, {
    value: isW1220
  }, children);
};

// src/hooks/useWindowSize.ts
import { useRecoilState as useRecoilState3 } from "recoil";
function useWindowSize() {
  const [size, setSize] = useState8({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  const onResize = useCallback5(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);
  useEffect9(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return size;
}
var useIsW768 = () => {
  const [isW768] = useRecoilState3(isW768State);
  if (isW768 === void 0) {
    return false;
  }
  return isW768;
};
var useIsW1100 = () => {
  try {
    const IsW1100 = useContext(IsW1100Context);
    if (IsW1100 === void 0) {
      return false;
    }
    return IsW1100;
  } catch (e) {
    return false;
  }
};
var useIsW1220 = () => {
  try {
    const isW1220 = useContext(IsW1220Context);
    if (isW1220 === void 0) {
      return false;
    }
    return isW1220;
  } catch (e) {
    return false;
  }
};
var useIsMd = () => {
  try {
    const isMd = useContext(IsW950Context);
    if (isMd === void 0) {
      return false;
    }
    return isMd;
  } catch (e) {
    return false;
  }
};

// src/components/Header/rainbow_account/IsPixelWidget.tsx
var IsPixelWidget = memo5(
  ({
    className,
    children,
    onClick,
    backgroundColor,
    borderColor,
    pixel_height,
    ...props
  }) => {
    const isW768 = useIsW768();
    return /* @__PURE__ */ React5.createElement(PixelBorderCardButton, {
      className: `pixel_border ${className != null ? className : ""}`,
      pixel_height: pixel_height != null ? pixel_height : isW768 ? 3 : 5,
      backgroundColor: backgroundColor != null ? backgroundColor : "#1d263b",
      borderColor: borderColor != null ? borderColor : "#3a4254",
      onClick,
      ...props
    }, children);
  }
);
var IsPixelWidget_default = IsPixelWidget;

// src/components/icons/index.tsx
import React6 from "react";
import classnames from "classnames";
var Icon = (props) => {
  return /* @__PURE__ */ React6.createElement(SvgComponent_default, {
    className: classnames("icon", props.className),
    src: preStaticUrl + `/img/icon/${props.name}.svg`,
    alt: ""
  });
};
var icons_default = Icon;

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
var Language = memo6(({ type }) => {
  const isW768 = useIsW768();
  const lang = useCurrentLanguage();
  const { t } = useCustomTranslation([LngNs.common]);
  const changeLanguageHandle = useCallback6((item) => {
    changeLanguage(item.keyValue);
    storage_default.set("language", item.keyValue);
  }, []);
  return /* @__PURE__ */ React7.createElement("div", {
    className: classnames2(
      type === "pixel" ? "language_pixel" : type === "top" ? "language_top" : type === "list" ? "language_list" : "",
      "language"
    )
  }, /* @__PURE__ */ React7.createElement("div", {
    className: type === "list" ? "" : classnames2(
      "horListItem",
      "languageItem",
      type === "pixel" ? "languagePixelTop" : ""
    )
  }, type === "pixel" ? /* @__PURE__ */ React7.createElement("div", {
    className: "pixel_logo_wrap"
  }, /* @__PURE__ */ React7.createElement(IsPixelWidget_default, {
    className: "pixel_logo"
  }, /* @__PURE__ */ React7.createElement("img", {
    decoding: "async",
    loading: "lazy",
    src: preStaticUrl + `/img/layout/${lang}.png`,
    className: "pixel_img_lang"
  })), /* @__PURE__ */ React7.createElement("div", {
    className: "address_wrap_pop_lang_wrap"
  }, /* @__PURE__ */ React7.createElement(PixelBorderCard, {
    className: "address_wrap_pop_lang",
    pixel_height: 4,
    backgroundColor: "#1D263B",
    borderColor: "#3A4254"
  }, languageList.map((v) => /* @__PURE__ */ React7.createElement(PopItem, {
    color: "#1D263B",
    classNames: "address_wrap_pop_item",
    key: v.label,
    onClick: () => changeLanguageHandle(v),
    iconName: v.img,
    label: v.label,
    on: v.keyValue === lang
  }))))) : /* @__PURE__ */ React7.createElement("div", {
    className: "lang"
  }, /* @__PURE__ */ React7.createElement("p", {
    className: "lang_title"
  }, /* @__PURE__ */ React7.createElement(icons_default, {
    name: "language"
  }), isW768 ? "Language" : t("language")), /* @__PURE__ */ React7.createElement("div", {
    className: "lang_list"
  }, languageList.map((v) => /* @__PURE__ */ React7.createElement(PopItem, {
    color: "transparent",
    onColor: "#3A4254",
    classNames: "address_list_item",
    key: v.label,
    onClick: () => changeLanguageHandle(v),
    iconName: v.img,
    label: v.label,
    on: v.keyValue === lang
  }))))));
}, isEqual);
var PopItem = memo6(
  ({
    iconName,
    label,
    onClick,
    on,
    classNames,
    color,
    onColor
  }) => {
    return /* @__PURE__ */ React7.createElement(PixelCube2, {
      className: `${classNames} ${on ? "on" : ""}`,
      onClick,
      pixel_height: 3,
      backgroundColor: on && onColor ? onColor : color,
      borderColor: on && onColor ? onColor : color,
      width: "100%",
      height: "36px"
    }, /* @__PURE__ */ React7.createElement(SvgComponent_default, {
      src: iconName
    }), /* @__PURE__ */ React7.createElement("p", null, label));
  }
);
var Language_default = Language;

// src/utils/i18n.ts
var _lng = language_default.split("-").join("_");
var lng = languageList.map((v) => v.keyValue).filter((v) => v === _lng).length ? _lng : "en_US";
var LngNs = {
  common: "common",
  defense: "defense",
  points: "points",
  sideBar: "siderBar",
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

// src/hooks/useNavItem.tsx
var zAceLink = isPro() ? "https://acequest.io/zAce/" : "https://testnet.acequest.io/zAce/";
var crLink = "https://testnet.cryptorumble.io";
var LinkList = [
  window.location.origin + "/bingo/",
  window.location.origin + "/2048/",
  zAceLink,
  crLink,
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
var gameStatus = {
  Live: {
    btn_label: "Live",
    btn_background_color: "#C5631D"
  },
  Testing: {
    btn_label: "Testing",
    btn_background_color: "#AF2D6A"
  }
};
var useNavItem = () => {
  const { t } = useCustomTranslation([LngNs.sideBar]);
  const { chainId } = useActiveWeb3React();
  return useMemo3(() => {
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
        ...gameStatus.Live
      },
      {
        label: t("z2048"),
        keyValue: "10",
        icon: "z2048.png",
        link: LinkList[1],
        disabled: false,
        type: "Games" /* Games */,
        ...gameStatus.Live
      },
      {
        label: t("zAce"),
        keyValue: "6",
        icon: "zACE.png",
        link: LinkList[2],
        disabled: false,
        type: "Games" /* Games */,
        content: (className) => /* @__PURE__ */ React8.createElement("div", {
          className
        }, /* @__PURE__ */ React8.createElement("p", null, "Acequect Studio"), /* @__PURE__ */ React8.createElement("img", {
          decoding: "async",
          loading: "lazy",
          src: preStaticUrl + "/img/games/star.svg"
        })),
        ...gameStatus.Live
      },
      {
        label: t("CryptoRumble"),
        keyValue: "12",
        icon: "Candy.png",
        link: LinkList[3],
        disabled: false,
        type: "Games" /* Games */,
        ...gameStatus.Testing
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

// src/constant/gamesList.ts
var Games = (chainId) => {
  return [
    {
      keyValue: "21",
      dapps: [
        {
          label: "CryptoRumble",
          icon: "Candy.png",
          link: LinkList[3]
        },
        {
          label: "zBingo",
          icon: "zBingo.png",
          link: `${LinkList[0]}${chainId ? chainId + "/" : ""}`
        }
      ]
    },
    {
      keyValue: "22",
      dapps: [
        {
          label: "zAce",
          icon: "zAce.png",
          link: LinkList[2]
        },
        {
          label: "z2048",
          icon: "z2048.png",
          link: LinkList[1]
        }
      ]
    },
    {
      keyValue: "23",
      dapps: [
        {
          label: "TCG",
          icon: "TCG.png"
        },
        {
          label: "zMahjong",
          icon: "zMahjong.png"
        },
        {
          label: "Murder Mystery",
          icon: "Murder.png"
        }
      ]
    },
    {
      keyValue: "24",
      dapps: [
        {
          label: "Anome",
          icon: "Anome.png",
          twitter: "https://twitter.com/Anome_Official",
          link: "https://b2.anome.xyz/"
        },
        {
          label: "Gabby World",
          icon: "Gabby World.png",
          twitter: "https://twitter.com/gabby_world_",
          link: "https://tabi.gabby.world/"
        }
      ]
    },
    {
      keyValue: "25",
      dapps: [
        {
          label: "PawX",
          icon: "PawX.png",
          twitter: "https://twitter.com/PawXcats",
          link: "https://www.pawx.me/"
        },
        {
          label: "Castle Of Blackwater",
          icon: "Blackwater.png",
          link: "https://castleofblackwater.com/"
        }
      ]
    },
    {
      keyValue: "26",
      dapps: [
        {
          label: "Cross The Ages",
          icon: "CrossAges.png",
          twitter: "https://twitter.com/CrossTheAges ",
          link: "https://linktr.ee/crosstheages "
        },
        {
          label: "Wildcard",
          icon: "Wildcard.png",
          twitter: "https://twitter.com/PlayWildcard"
        },
        {
          label: "BitcoinLoot",
          icon: "BitcoinLoot.png",
          twitter: "https://twitter.com/btc_loot",
          link: "https://www.bitcoinloot.co/home/"
        }
      ]
    },
    {
      keyValue: "27",
      dapps: [
        {
          label: "Degen Verse",
          icon: "Degen Verse.png",
          twitter: "https://twitter.com/degen_game",
          link: "https://degengame.cc/#/home"
        },
        {
          label: "Yuliverse",
          icon: "Yuliverse.png",
          twitter: "https://twitter.com/TheYuliverse",
          link: "https://www.yuliverse.com/"
        },
        {
          label: "Forge Heros",
          icon: "Forge Heros.png",
          twitter: "https://twitter.com/ForgeHeroesGame",
          link: "https://x.com/ForgeHeroesGame"
        }
      ]
    },
    {
      keyValue: "28",
      dapps: [
        {
          label: "Splinterlands",
          icon: "Splinterlands.png",
          twitter: "https://twitter.com/Splinterlands"
        },
        {
          label: "Core Engine",
          icon: "Core Engine.png",
          link: "https://www.creoengine.com/"
        },
        {
          label: "Crystal Fun",
          icon: "Crystal Fun.png",
          twitter: "https://x.com/playCrystalFun",
          link: "https://outer.gg/"
        }
      ]
    },
    {
      keyValue: "29",
      dapps: [
        {
          label: "Cellula",
          icon: "Cellula.png",
          link: "https://factory.cellula.life/welcome"
        },
        {
          label: "Metaline X",
          icon: "Metaline X.png",
          twitter: "https://twitter.com/Metaline001",
          link: "https://app.metaline.games/"
        },
        {
          label: "Trumen World",
          icon: "Trumen World.png",
          twitter: "https://twitter.com/trumen_worl",
          link: "https://www.trumen.world/"
        }
      ]
    }
  ];
};

// src/utils/cn.ts
import cn from "classnames";
var cn_default = cn;

// src/components/List/ListWithMotion/ListWithMotion.tsx
import { AnimatePresence, motion as motion2 } from "framer-motion";
import React9, { memo as memo7 } from "react";
var containerVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};
var itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};
var ListWithMotion = (props) => {
  const { parentClassName, itemClassName, data, renderItem } = props;
  return /* @__PURE__ */ React9.createElement(AnimatePresence, null, /* @__PURE__ */ React9.createElement(motion2.ul, {
    className: parentClassName,
    variants: containerVariants,
    initial: "hidden",
    animate: "visible"
  }, data.map((item, index) => /* @__PURE__ */ React9.createElement(motion2.li, {
    key: `${index}`,
    className: itemClassName,
    variants: itemVariants
  }, renderItem(item)))));
};
var ListWithMotion_default = memo7(ListWithMotion);

// src/hooks/useGetActiveCall.ts
import { useCallback as useCallback7 } from "react";
var useGetHero = () => {
  const getHero = useCallback7(
    async ({ address, linkType }) => {
      try {
        const res = await request(
          `${TVL_API}/api/user-role/${address.toLowerCase()}`,
          {
            method: "GET",
            params: {
              linkType
            },
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (res.data && res.data["message"]) {
          return res.data["message"];
        } else {
          return void 0;
        }
      } catch (e) {
        return void 0;
      }
    },
    []
  );
  return { getHero };
};
var useGetUserInfo = () => {
  const getUserInfo = useCallback7(
    async ({ account, chainId }) => {
      try {
        const linkType = getLinkPre(chainId);
        const info_res = await request(`${TVL_API}/api/info/${account}`, {
          method: "GET",
          params: {
            linkType: linkType.key
          },
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (info_res.data) {
          const infoObj = form_info(info_res.data, chainId);
          return infoObj;
        }
      } catch (e) {
        console.log("useGetInfo", { e });
        return form_info_init();
      }
    },
    []
  );
  return { getUserInfo };
};
var form_info = (data, chainId) => {
  const linkType = getLinkPre(chainId);
  return {
    invitationCode: `${linkType.label}${data.curInviteCode}`,
    signedStr: "0000",
    avatar: data.headImg,
    id: `${data.id}`,
    nickname: data.nickname,
    isTwitterPost: data.isTwitterPost,
    twitter: {
      avatar: data.twitterImg,
      nickname: data.twitterName,
      followerCount: `${data.twitterFollower}`,
      isLoading: false
    },
    discord: {
      avatar: data.discordImg,
      nickname: data.discordName,
      followerCount: "",
      isLoading: false
    }
  };
};
var form_info_init = () => {
  return {
    invitationCode: "",
    signedStr: "",
    avatar: "",
    id: "",
    nickname: "",
    twitter: {
      avatar: "",
      nickname: "",
      followerCount: "",
      isLoading: false
    },
    discord: {
      avatar: "",
      nickname: "",
      followerCount: "",
      isLoading: false
    }
  };
};

// src/components/ConnectWallet/state/connectWalletState.ts
import { atom as atom7 } from "recoil";
var connectorState = atom7({
  key: "connectorState",
  default: {
    chainId: null,
    networkError: null
  }
});
var walletModalOpenState = atom7({
  key: "walletModalOpenState",
  default: false
});
var ChainSelector = atom7({
  key: "ChainSelector",
  default: false
});
var refreshBalanceState = atom7({
  key: "refreshBalance",
  default: "0"
});
var refreshAvatarState = atom7({
  key: "refreshAvatar",
  default: "0"
});
var pointsDialogState = atom7({
  key: "pointsDialog",
  default: false,
  effects_UNSTABLE: [localStorageEffect("pointsDialog")]
});
var pointsAnimState = atom7({
  key: "pointsAnim",
  default: false
});
var pointsAnimNumState = atom7({
  key: "pointsAnimNum",
  default: 0
});
var pointsWarnState = atom7({
  key: "pointsWarn",
  default: 0
});
var hidePointsWarnState = atom7({
  key: "hidePointsWarn",
  default: false,
  effects_UNSTABLE: [localStorageEffect("hidePointsWarn")]
});
var pointsRuleDialogState = atom7({
  key: "pointsRuleDialog",
  default: false
});
var accountInfoDialogState = atom7({
  key: "accountInfoDialog",
  default: false
});
var showBigState = atom7({
  key: "showBigState",
  default: false
});
var showMiddleState = atom7({
  key: "showMiddleState",
  default: false
});
var linkToBetaDialogState = atom7({
  key: "linkToBetaDialog",
  default: false
});
var linkToBetaDialogChainIdState = atom7({
  key: "linkToBetaDialogChainIdState",
  default: void 0
});
var nativeBalanceState = atom7({
  key: "nativeBalance",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("nativeBalance")]
});
var pointsBalanceState = atom7({
  key: "pointsBalance",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("pointsBalance")]
});

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
import classnames4 from "classnames";
import React17, { memo as memo13, useCallback as useCallback11, useEffect as useEffect12, useState as useState12 } from "react";
import { useRecoilState as useRecoilState6, useRecoilValue as useRecoilValue9 } from "recoil";

// src/components/CurrencyLogo/index.tsx
import React10, { useState as useState10 } from "react";
var Logo = ({ src: src6, alt, ...rest }) => {
  const [bad, setBad] = useState10(false);
  if (src6 && !bad) {
    return /* @__PURE__ */ React10.createElement("img", {
      decoding: "async",
      loading: "lazy",
      ...rest,
      alt,
      src: src6,
      onError: () => {
        setBad(true);
      }
    });
  }
  return /* @__PURE__ */ React10.createElement("div", {
    ...rest
  }, /* @__PURE__ */ React10.createElement(icons_default, {
    name: "help"
  }));
};
var CurrencyLogo_default = Logo;

// src/hooks/usePoint.ts
import BigNumberjs2 from "bignumber.js";

// src/hooks/useAccountInvitation.ts
import { atom as atom8, useRecoilValue as useRecoilValue6, useSetRecoilState as useSetRecoilState5 } from "recoil";
import { useCallback as useCallback8 } from "react";
var invitationAddressState = atom8({
  key: "invitationAddressState",
  default: void 0,
  effects_UNSTABLE: [localStorageEffect("invitationAddressState")]
});
var useAccountInvitation = (env) => {
  const { chainId, account } = useActiveWeb3React();
  const invitationAddres = useRecoilValue6(
    invitationAddressState
  );
  const setInvitationAddressState = useSetRecoilState5(invitationAddressState);
  const postAccountUpdate = useCallback8(
    async ({ tx }) => {
    },
    [chainId, account, invitationAddres]
  );
  return {
    postAccountUpdate
  };
};

// src/hooks/usePoint.ts
import { useCallback as useCallback10, useEffect as useEffect11, useState as useState11 } from "react";
import { useRecoilState as useRecoilState4, useRecoilValue as useRecoilValue7, useSetRecoilState as useSetRecoilState6 } from "recoil";

// src/hooks/usePublicNodeWaitForTransaction.ts
import { useCallback as useCallback9 } from "react";
import { waitForTransaction } from "wagmi/actions";
function usePublicNodeWaitForTransaction(env) {
  const { chainId } = useActiveWeb3React(env);
  const waitForTransaction_ = useCallback9(
    async (opts) => {
      if (!chainId) {
        return void 0;
      }
      const viemClients2 = viemClients(env);
      if (viemClients2[`${chainId}`]) {
        return viemClients2[`${chainId}`].waitForTransactionReceipt(opts);
      }
      return waitForTransaction({ ...opts, chainId: Number(chainId) });
    },
    [chainId]
  );
  return {
    waitForTransaction: waitForTransaction_
  };
}

// src/contract/bingoPoints.ts
import abi from "@zypher-game/bingo-periphery-v1/abi/ZkBingoPoints.json";
var ZkBingoPointsContract = (chainId, env, address, signer) => {
  return getContract2({
    env,
    abi,
    address: address != null ? address : zkBingo(chainId, "points" /* Points */),
    signer,
    chainId
  });
};
var bingoPoints_default = ZkBingoPointsContract;

// src/hooks/usePoint.ts
import { ethers as ethers3 } from "ethers";
var ChainPointPrice = {
  ["59144" /* LineaMainnet */]: 1 / 2e6,
  ["59141" /* LineaSepolia */]: 1 / 2e6,
  ["204" /* OPBNB */]: 1 / 25e4,
  ["5611" /* OPBNBTEST */]: 1 / 25e4,
  ["19546" /* ZytronLineaSepoliaTestnet */]: 1 / 2e6,
  ["9901" /* ZytronLineaMain */]: 1 / 2e6
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
      var _a;
      const chainPrice = (_a = ChainPointPrice[chainId]) != null ? _a : "0";
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
  const [isLoading, setIsLoading] = useState11(false);
  const pointsDialogOpen = useRecoilValue7(pointsDialogState);
  const setPointsDialogOpen = useSetRecoilState6(pointsDialogState);
  const setPointsAnimNumState = useSetRecoilState6(pointsAnimNumState);
  const [refreshBalance, setRefreshBalanceState] = useRecoilState4(refreshBalanceState);
  const { waitForTransaction: waitForTransaction2 } = usePublicNodeWaitForTransaction(env);
  const hidePointsWarn = useRecoilValue7(hidePointsWarnState);
  const [pointsWarn, setPointsWarn] = useRecoilState4(pointsWarnState);
  const [choseIndex, setChoseIndex] = useState11();
  const { walletClient } = useAaWallet();
  useEffect11(() => {
    setIsLoading(false);
  }, [pointsDialogOpen]);
  const swapPointHandle = useCallback10(
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
                  setErrorToast("PointsContract is not ready");
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
                  value: ethers3.utils.parseEther(v.price)
                }
              );
              const hash = typeof res === "string" ? res : res.hash;
              const nativeSwapTx = await waitForTransaction2({ confirmations: 1, hash });
              if (nativeSwapTx && nativeSwapTx.status === txStatus) {
                setPointsAnimNumState(1);
                setSuccessToast({
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
            setErrorToast(e);
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
import { useMemo as useMemo5 } from "react";
import { useRecoilValue as useRecoilValue8 } from "recoil";
var useNativeBalanceStr = () => {
  const nativeBalance = useRecoilValue8(nativeBalanceState);
  return useMemo5(() => {
    return formatMoney(nativeBalance, 4);
  }, [nativeBalance]);
};
var usePointsBalanceStr = () => {
  const pointsBalance = useRecoilValue8(pointsBalanceState);
  return useMemo5(() => {
    return formatMoney(pointsBalance, 0);
  }, [pointsBalance]);
};

// src/components/ConnectWallet/components/PointsDialog/PointsWarn.tsx
import React11, { memo as memo8 } from "react";
import { useRecoilState as useRecoilState5 } from "recoil";
var PoinsWarn = memo8(({ handleNext }) => {
  const { t } = useCustomTranslation([LngNs.points]);
  const [hidePointsWarn, setHidePointsWarn] = useRecoilState5(hidePointsWarnState);
  return /* @__PURE__ */ React11.createElement("div", {
    className: "points_dialog_dialogContainer"
  }, /* @__PURE__ */ React11.createElement("p", null, t("poinsWarnText01")), /* @__PURE__ */ React11.createElement("p", null, /* @__PURE__ */ React11.createElement("em", null), /* @__PURE__ */ React11.createElement("i", null, t("poinsWarnText02")), /* @__PURE__ */ React11.createElement("br", null), /* @__PURE__ */ React11.createElement("em", null), /* @__PURE__ */ React11.createElement("i", null, t("poinsWarnText03"))), /* @__PURE__ */ React11.createElement("p", null, t("poinsWarnText04")), /* @__PURE__ */ React11.createElement("p", {
    className: "points_dialog_flex",
    onClick: () => setHidePointsWarn(!hidePointsWarn)
  }, /* @__PURE__ */ React11.createElement(icons_default, {
    name: hidePointsWarn ? "checked" : "check"
  }), t("poinsWarnText05")), /* @__PURE__ */ React11.createElement(ActivePixelButtonColor, {
    themeType: "brightBlue",
    onClick: handleNext,
    width: "100%",
    height: "52px",
    pixel_height: 4,
    className: "points_dialog_btn"
  }, /* @__PURE__ */ React11.createElement("p", null, t("Ok"))));
}, isEqual);
var PointsWarn_default = PoinsWarn;

// src/components/icons/PointsIcon/PointsIcon.tsx
import React12 from "react";
import { memo as memo9 } from "react";
import styled2 from "styled-components";
var PointsImg = styled2.img`
  display: inline-block;
  width: ${({ isMobile: isMobile2 }) => isMobile2 ? "20px" : "30px"};
  margin-left: ${({ mr, isMobile: isMobile2 }) => mr ? "0" : isMobile2 ? "4px" : "10px"};
  margin-right: ${({ mr, isMobile: isMobile2 }) => mr ? isMobile2 ? "4px" : "10px" : "0"};
`;
var PointsIcon = memo9(
  ({ isMobile: isMobile2, classname, mr }) => {
    return /* @__PURE__ */ React12.createElement(PointsImg, {
      isMobile: isMobile2,
      src: preStaticUrl + `/img/home/data_points.svg`,
      alt: "",
      className: classname
    });
  },
  isEqual
);

// src/components/Modal/Modal.tsx
import React13 from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
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
  return /* @__PURE__ */ React13.createElement(DialogOverlay, {
    isOpen: open,
    onDismiss: onCancel,
    className: classnames3("customDialog", "bottom", wrapClassName),
    "aria-label": "Modal"
  }, /* @__PURE__ */ React13.createElement(DialogContent, {
    style: { width }
  }, children));
};
var Modal_default = Modal;

// src/components/PixelTable/PixelTable.tsx
import React14, { memo as memo10 } from "react";
var PixelTableBorder = memo10(
  ({
    header_children,
    body_children,
    pixel_height,
    classNameHeader,
    backgroundColor,
    headerBackgroundColor,
    borderColor,
    width,
    className
  }) => {
    return /* @__PURE__ */ React14.createElement(PixelBorderCard, {
      className: `tvlPixelTable ${className != null ? className : ""}`,
      pixel_height,
      backgroundColor: `${backgroundColor != null ? backgroundColor : "#0d1120"}`,
      borderColor: `${borderColor != null ? borderColor : "#3A4254"}`,
      width
    }, /* @__PURE__ */ React14.createElement(ActivePixelCard, {
      className: `tvlPixelTable_header ${classNameHeader != null ? classNameHeader : ""}`,
      pixel_height,
      backgroundColor: `${headerBackgroundColor != null ? headerBackgroundColor : "#293457"}`
    }, header_children), body_children);
  }
);
var PixelTable = memo10(
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
    return /* @__PURE__ */ React14.createElement(PixelBorderCard, {
      className: `tvlPixelTable ${className != null ? className : ""}`,
      pixel_height,
      backgroundColor: `${backgroundColor != null ? backgroundColor : "#0d1120"}`,
      borderColor: `${borderColor != null ? borderColor : "#3A4254"}`,
      width
    }, /* @__PURE__ */ React14.createElement(ActivePixelCard, {
      className: `tvlPixelTable_header ${classNameHeader != null ? classNameHeader : ""}`,
      pixel_height,
      backgroundColor: `${headerBackgroundColor != null ? headerBackgroundColor : "#293457"}`
    }, header_children), body_children);
  }
);
var IsTablePixelWidget = memo10(
  ({
    width,
    height,
    className,
    backgroundColor,
    header_children,
    body_children,
    pixel_height
  }) => {
    const isW768 = useIsW768();
    return isW768 ? /* @__PURE__ */ React14.createElement("div", {
      className
    }, header_children, body_children) : /* @__PURE__ */ React14.createElement(PixelTable, {
      width,
      height,
      className,
      backgroundColor,
      header_children,
      body_children,
      pixel_height
    });
  }
);

// src/components/LoadingSvg/LoadingButton.tsx
import React15, { memo as memo11 } from "react";
var LoadingButton = memo11(
  ({
    className,
    hideMl,
    isLoading
  }) => {
    if (isLoading) {
      return /* @__PURE__ */ React15.createElement(SvgComponent_default, {
        className: `${className != null ? className : ""} ${hideMl ? "hideMl" : ""} animation_rotate LoadingButton`,
        src: preStaticUrl + "/img/icon/pixel_loading.svg"
      });
    }
    return /* @__PURE__ */ React15.createElement(React15.Fragment, null);
  }
);
var LoadingButton_default = LoadingButton;

// src/components/DialogClose/DialogClose.tsx
import React16, { memo as memo12 } from "react";
var DialogClose = memo12(({ onClick, ...props }) => {
  return /* @__PURE__ */ React16.createElement("div", {
    className: "dialog_close",
    onClick,
    ...props
  }, /* @__PURE__ */ React16.createElement(SvgComponent_default, {
    src: preStaticUrl + "/img/icon/pixel_close.svg"
  }));
});
var DialogClose_default = DialogClose;

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
var PointsDialog = memo13(
  ({ env, dispatch, setSuccessToast, setErrorToast }) => {
    const { t } = useCustomTranslation([LngNs.points]);
    const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState6(pointsDialogState);
    const pointsWarn = useRecoilValue9(pointsWarnState);
    const { chainId } = useActiveWeb3React();
    const pointsBalanceStr = usePointsBalanceStr();
    const isMobile2 = useIsW768();
    const [pointsList, setPointsList] = useState12([]);
    const { isLoading, swapPointHandle } = useSwapPoint({
      env,
      dispatch,
      setSuccessToast,
      setErrorToast
    });
    useEffect12(() => {
      if (chainId) {
        setTimeout(() => {
          const list = pointsListDefault(chainId);
          if (list) {
            setPointsList(list);
          }
        }, 800);
      }
    }, [chainId]);
    const handleCancel = useCallback11(() => {
      setPointsDialogOpen(false);
    }, []);
    return /* @__PURE__ */ React17.createElement(Modal_default, {
      open: pointsDialogOpen,
      onCancel: () => setPointsDialogOpen(false),
      footer: null,
      wrapClassName: classnames4("customDialog", "bottom", "dialog"),
      width: isMobile2 ? "100%" : 604,
      destroyOnClose: true,
      closable: false,
      centered: isMobile2 ? false : true,
      transitionName: isMobile2 ? "ant-slide-down" : void 0
    }, /* @__PURE__ */ React17.createElement(PixelTable, {
      classNameHeader: "modalTitleInner",
      backgroundColor: "#1D263B",
      header_children: /* @__PURE__ */ React17.createElement("p", {
        className: "modalTitleInnerTitle"
      }, t("Recharge Points")),
      body_children: /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("div", {
        className: "modalMain"
      }, pointsWarn === 1 ? /* @__PURE__ */ React17.createElement(PointsWarn_default, {
        isLoading,
        handleNext: swapPointHandle
      }) : isLoading ? /* @__PURE__ */ React17.createElement(IsLoading, null) : /* @__PURE__ */ React17.createElement(React17.Fragment, null, /* @__PURE__ */ React17.createElement("div", {
        className: "balanceTitle"
      }, /* @__PURE__ */ React17.createElement("p", null, t("Balance"), ": ", /* @__PURE__ */ React17.createElement("strong", null, pointsBalanceStr)), /* @__PURE__ */ React17.createElement(PointsIcon, {
        isMobile: isMobile2,
        classname: "pointsIcon"
      })), /* @__PURE__ */ React17.createElement(PointsTable, {
        pointsList,
        chainId,
        onClick: swapPointHandle
      })))),
      pixel_height: 10
    }), /* @__PURE__ */ React17.createElement(DialogClose_default, {
      onClick: handleCancel
    }));
  },
  isEqual
);
var IsLoading = memo13(() => {
  const { t } = useCustomTranslation([LngNs.points]);
  return /* @__PURE__ */ React17.createElement("div", {
    className: "loading"
  }, /* @__PURE__ */ React17.createElement(LoadingButton_default, {
    isLoading: true,
    className: "loading_size4"
  }), /* @__PURE__ */ React17.createElement("p", null, t("IsLoadingText1")));
}, isEqual);
var PointsTable = memo13(
  ({ pointsList, chainId, onClick }) => {
    return /* @__PURE__ */ React17.createElement("div", {
      className: "table"
    }, pointsList.map((v, index) => /* @__PURE__ */ React17.createElement(PixelBorderCardButton, {
      pixel_height: 4,
      backgroundColor: "#343C4F",
      borderColor: "#484F60",
      key: v.index,
      onClick: () => onClick(index)
    }, /* @__PURE__ */ React17.createElement("div", {
      className: classnames4("points", `points_${v.index}`)
    }, /* @__PURE__ */ React17.createElement("h3", null, v.pointAmountStr), /* @__PURE__ */ React17.createElement("img", {
      decoding: "async",
      loading: "lazy",
      className: "points_img",
      src: preStaticUrl + `/img/points/points_${v.index}.png`,
      alt: "points"
    }), /* @__PURE__ */ React17.createElement(ActivePixelCard, {
      backgroundColor: "#1649FF",
      className: "bottom",
      pixel_height: 4
    }, /* @__PURE__ */ React17.createElement("p", null, v.priceStr), /* @__PURE__ */ React17.createElement(CurrencyLogo_default, {
      className: "img",
      src: CurrencyLogo[chainId || 97]
    })), v.discount && /* @__PURE__ */ React17.createElement("div", {
      className: "discount"
    }, /* @__PURE__ */ React17.createElement("img", {
      decoding: "async",
      loading: "lazy",
      className: "discount_img",
      src: preStaticUrl + `/img/points/discord.svg`,
      alt: "points"
    }), /* @__PURE__ */ React17.createElement("p", null, v.discount, "% ", /* @__PURE__ */ React17.createElement("br", null), "OFF"))))));
  },
  isEqual
);
var PointsDialog_default = PointsDialog;

// src/components/SideBar/SideBar.tsx
import classnames6 from "classnames";
import React23, { memo as memo19, useMemo as useMemo7 } from "react";

// src/components/SideBar/component/CommunityLink.tsx
import React18, { memo as memo14 } from "react";
var CommunityLink = memo14(({ className }) => {
  return /* @__PURE__ */ React18.createElement("div", {
    className
  }, /* @__PURE__ */ React18.createElement("a", {
    href: "https://twitter.com/Zypher_network",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React18.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/twitter.svg"
  })), /* @__PURE__ */ React18.createElement("a", {
    href: "https://discord.com/invite/MKJZhS4p2T",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React18.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/discord.svg"
  })), /* @__PURE__ */ React18.createElement("a", {
    href: "https://zyphergames.substack.com",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React18.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/medium.svg"
  })), /* @__PURE__ */ React18.createElement("a", {
    href: "https://github.com/zypher-game",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React18.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/github.svg"
  })), /* @__PURE__ */ React18.createElement("a", {
    href: "https://zyphergames.notion.site/Zypher-Games-101-58f3fc6362dc473db187dcec0b63e74e",
    target: "_blank",
    rel: "noreferrer"
  }, /* @__PURE__ */ React18.createElement(SvgComponent_default, {
    className: "community_svg",
    src: preStaticUrl + "/img/layout/gitbook.svg"
  })));
}, isEqual);
var CommunityLink_default = CommunityLink;

// src/components/SideBar/component/SideBarGamesList.tsx
import React20, { memo as memo16 } from "react";

// src/components/SideBar/component/LinkItemA.tsx
import classnames5 from "classnames";
import React19, { memo as memo15, useCallback as useCallback12 } from "react";
import { useSetRecoilState as useSetRecoilState7 } from "recoil";

// src/components/Header/state.ts
import { atom as atom9 } from "recoil";
var pathnameState = atom9({
  key: "pathnameState",
  default: [""]
});
var sideCollapseState = atom9({
  key: "sideCollapseState",
  default: true
});

// src/components/SideBar/component/LinkItemA.tsx
var useLink = (link, isMobile2, useNavigate) => {
  const setSideCollapse = useSetRecoilState7(sideCollapseState);
  const navigate = useNavigate();
  const linkClickHandle = useCallback12(
    (event) => {
      if (link.disabled) {
        return;
      }
      event.preventDefault();
      if (isMobile2) {
        setSideCollapse(true);
      }
      setTimeout(() => {
        try {
          const _link = link.link;
          if (_link) {
            window.open(_link, "_blank");
          }
        } catch (e) {
          window.location.href = "/#" + link.link;
        }
      }, 200);
    },
    [navigate, isMobile2]
  );
  return {
    linkClickHandle
  };
};
var LinkItem1 = memo15(
  ({
    className,
    className_on,
    isMobile: isMobile2,
    className_disable,
    className_imageContainer,
    useNavigate,
    ...link
  }) => {
    const { linkClickHandle } = useLink(link, isMobile2, useNavigate);
    return /* @__PURE__ */ React19.createElement("div", {
      onClick: linkClickHandle,
      className: classnames5(
        className,
        link.disabled ? className_disable : ""
      )
    }, /* @__PURE__ */ React19.createElement("div", {
      className: className_imageContainer
    }, /* @__PURE__ */ React19.createElement("img", {
      decoding: "async",
      loading: "lazy",
      src: preStaticUrl + `/img/games/games/${link.icon}`
    })), /* @__PURE__ */ React19.createElement("p", null, link.label));
  },
  isEqual
);
var LinkItemA_default = LinkItem1;

// src/components/SideBar/component/SideBarGamesList.tsx
var SideBarGamesList = memo16(
  ({
    className_on,
    className_list,
    className_listItemDisable,
    className_listItem,
    className_imageContainer,
    useNavigate,
    list
  }) => {
    return /* @__PURE__ */ React20.createElement("div", {
      className: "gamelist"
    }, /* @__PURE__ */ React20.createElement(ActivePixelCard, {
      className: "pixel_side_games",
      pixel_height: 3,
      backgroundColor: "#343C4F"
    }, list.map((v) => /* @__PURE__ */ React20.createElement(LinkItemA_default, {
      useNavigate,
      isMobile: true,
      className_on,
      className_disable: className_listItemDisable,
      key: v.keyValue,
      className: className_listItem,
      className_imageContainer,
      ...v
    }))));
  },
  isEqual
);
var SideBarGamesList_default = SideBarGamesList;

// src/components/SideBar/component/SideBarTitle.tsx
import React21, { memo as memo17 } from "react";
var SideBarTitle = memo17(
  ({ className, logo_url_name, logo_title }) => {
    const { t } = useCustomTranslation([LngNs.sideBar]);
    return /* @__PURE__ */ React21.createElement("div", {
      className
    }, /* @__PURE__ */ React21.createElement("img", {
      decoding: "async",
      loading: "lazy",
      src: preStaticUrl + `/img/icon/${logo_url_name}.svg`,
      title: t(logo_title)
    }), /* @__PURE__ */ React21.createElement("p", null, t(logo_title)));
  },
  isEqual
);
var SideBarTitleLink = memo17(
  ({ logo_url_name, link, className, logo_title }) => {
    const { t } = useCustomTranslation([LngNs.sideBar]);
    return /* @__PURE__ */ React21.createElement("a", {
      href: link,
      className
    }, /* @__PURE__ */ React21.createElement("div", {
      className: "side_title_line"
    }), /* @__PURE__ */ React21.createElement("p", null, t(logo_title)), logo_url_name ? /* @__PURE__ */ React21.createElement("img", {
      decoding: "async",
      loading: "lazy",
      src: logo_url_name,
      title: t(logo_title)
    }) : null);
  },
  isEqual
);

// src/components/SideBar/SideBar.tsx
import { useSetRecoilState as useSetRecoilState8 } from "recoil";

// src/components/Header/Navigation/Navigation.tsx
import React22, {
  memo as memo18,
  useCallback as useCallback13,
  useEffect as useEffect13,
  useMemo as useMemo6,
  useRef as useRef5,
  useState as useState13
} from "react";
var NavKey = [
  ["", "airdrop", "airdropLoading"],
  ["games"],
  ["zeroGas"]
];
var NavList = [
  {
    link: `/${NavKey[0][0]}`,
    linkList: NavKey[0],
    label: "Airdrop",
    classNames: "airdrop",
    isTarget: false,
    showIfGames: false,
    isLink: true
  },
  {
    link: `/${NavKey[1][0]}`,
    linkList: NavKey[1],
    label: "Games",
    classNames: "games",
    isTarget: false,
    showIfGames: true,
    isLink: true
  },
  {
    link: `/${NavKey[2][0]}`,
    linkList: NavKey[2],
    label: "Zero Gas",
    classNames: "zero_gas",
    isTarget: false,
    showIfGames: false,
    isLink: true
  },
  {
    link: "https://zypher.network/",
    linkList: [],
    label: "Zypher Network",
    icon: preStaticUrl + "/img/icon/pixel_link.svg",
    classNames: "network",
    isTarget: true,
    showIfGames: true,
    isLink: false
  }
];
var Navigation = memo18(
  ({ pathname, Link }) => {
    const [chooseIndex, setChooseIndex] = useState13(
      null
    );
    const [activeIndex, setActiveIndex] = useState13(
      null
    );
    const linksRefs = useRef5([]);
    const { width } = useWindowSize();
    const { isW768, isW1670, isWBig } = useMemo6(() => {
      return {
        isW768: width <= 768,
        isW1540: width <= 1540 && width > 768,
        isW1670: width < 1670 && width > 1540,
        isWBig: width >= 1670
      };
    }, [width]);
    const init = useCallback13(async () => {
      if (!isW768 && linksRefs.current.length) {
        const index = NavKey.findIndex((key) => key.includes(pathname));
        if (index > -1) {
          setChooseIndex(index);
          setActiveIndex(index);
        }
      }
    }, [pathname, isW768, linksRefs.current]);
    useEffect13(() => {
      init();
    }, [init]);
    const init2 = useCallback13(async () => {
      if (!isW768 && linksRefs.current.length) {
        linksRefs.current.forEach(async (linkRef, index) => {
          if ((linkRef == null ? void 0 : linkRef.className) === "nav_on") {
            const w = hasFontWeight600(linkRef);
            if (!w) {
              await sleep(0.2);
            }
            if (w) {
              setActiveIndex(index);
            }
          }
          if (chooseIndex !== null) {
            const handleMouseEnter = () => {
              setActiveIndex(index);
            };
            const handleMouseLeave = () => {
              setActiveIndex(chooseIndex);
            };
            if (linkRef) {
              linkRef.addEventListener("mouseenter", handleMouseEnter);
              linkRef.addEventListener("mouseleave", handleMouseLeave);
              return () => {
                linkRef.removeEventListener("mouseenter", handleMouseEnter);
                linkRef.removeEventListener("mouseleave", handleMouseLeave);
              };
            }
          }
        });
      }
    }, [chooseIndex, pathname]);
    useEffect13(() => {
      init2();
    }, [chooseIndex, pathname, linksRefs.current]);
    const updateLinePosition = useCallback13(async () => {
      if (activeIndex !== null && activeIndex !== void 0 && linksRefs.current[activeIndex]) {
        const line = document.querySelector(".pixel_line");
        const link = linksRefs.current[activeIndex];
        if (link) {
          const linkWidth = link.offsetWidth;
          if (linkWidth) {
            const leftPosition = link.offsetLeft + (linkWidth - 36) / 2;
            line.style.width = "36px";
            line.style.left = `${leftPosition}px`;
            if (chooseIndex !== activeIndex) {
              line.style.opacity = "0.8";
            }
          } else {
            await sleep(0.7);
            updateLinePosition();
          }
        }
      }
    }, [chooseIndex, activeIndex, pathname, linksRefs]);
    useEffect13(() => {
      updateLinePosition();
    }, [chooseIndex, activeIndex, pathname]);
    useEffect13(() => {
      (async () => {
        await sleep(0.3);
        updateLinePosition();
      })();
    }, [isW768, isW1670, isWBig]);
    return /* @__PURE__ */ React22.createElement("div", {
      className: "nav"
    }, NavList.filter((v) => window.isGames ? v.showIfGames : true).map(
      (v, index) => /* @__PURE__ */ React22.createElement(LinkComp, {
        Link,
        item: v,
        key: v.label,
        className: `nav_${v.classNames} `,
        setLinksRefs: (ref) => {
          linksRefs.current[index] = ref;
        }
      }, v.label, v.icon ? /* @__PURE__ */ React22.createElement("img", {
        decoding: "async",
        loading: "lazy",
        src: v.icon,
        alt: "pixel_link",
        className: "nav_img"
      }) : null)
    ), /* @__PURE__ */ React22.createElement("div", {
      className: "pixel_line"
    }));
  }
);
var LinkComp = memo18(
  ({ item, children, setLinksRefs, className, Link }) => {
    const ref = useRef5(null);
    useEffect13(() => {
      if (ref.current) {
        setLinksRefs(ref.current);
      }
    }, [ref]);
    if (item.isLink) {
      return /* @__PURE__ */ React22.createElement(Link, {
        to: item.link,
        className,
        ref
      }, children);
    }
    return /* @__PURE__ */ React22.createElement("a", {
      href: item.link,
      ref,
      target: item.isTarget ? "_blank" : void 0,
      rel: item.isTarget ? "noreferrer" : void 0,
      className
    }, children);
  }
);
function hasFontWeight600(element2) {
  if (!element2) {
    return false;
  }
  const computedStyle = window.getComputedStyle(element2);
  const fontWeight = computedStyle.getPropertyValue("font-weight");
  return fontWeight === "600";
}
var Navigation_default = Navigation;

// src/components/SideBar/SideBar.tsx
var ZypherLogo = memo19(({ isMobile: isMobile2 }) => {
  return /* @__PURE__ */ React23.createElement("a", {
    href: "/",
    className: "zypher_logo"
  }, isMobile2 ? /* @__PURE__ */ React23.createElement("img", {
    fetchPriority: "high",
    decoding: "async",
    loading: "lazy",
    src: preStaticUrl + "/img/layout/logo-min.svg"
  }) : /* @__PURE__ */ React23.createElement("img", {
    fetchPriority: "high",
    decoding: "async",
    loading: "lazy",
    src: preStaticUrl + "/img/tvl/logo.svg"
  }), /* @__PURE__ */ React23.createElement("img", {
    decoding: "async",
    loading: "lazy",
    src: preStaticUrl + "/img/layout/ai.svg"
  }));
});
var SideBar = (props) => {
  const { useNavigate, pathname } = props;
  const { chainId } = useActiveWeb3React();
  const setSideCollapse = useSetRecoilState8(sideCollapseState);
  const {
    sideBarGamesLinkList
  } = useMemo7(() => {
    return {
      sideBarGamesLinkList: Games(chainId).map((v) => v.dapps.map((vv) => vv)).flat().map((v) => {
        var _a;
        return {
          label: v.label,
          keyValue: v.label,
          icon: v.icon,
          disabled: false,
          type: "Games" /* Games */,
          link: (_a = v.link) != null ? _a : v.twitter
        };
      })
    };
  }, [chainId]);
  return /* @__PURE__ */ React23.createElement("div", {
    className: classnames6(`${props.className}`, "sidebarWrap")
  }, /* @__PURE__ */ React23.createElement("div", {
    className: "side_close",
    onClick: () => setSideCollapse(true)
  }, /* @__PURE__ */ React23.createElement(icons_default, {
    name: "close"
  })), /* @__PURE__ */ React23.createElement("div", {
    className: "sidebar"
  }, NavList.filter((v) => window.isGames ? v.showIfGames : true).map(
    (v) => {
      var _a;
      return /* @__PURE__ */ React23.createElement(SideBarTitleLink, {
        key: v.label,
        logo_title: v.label,
        className: `sideBarTitle sideBarTitleLink ${((_a = v.linkList) != null ? _a : []).includes(pathname) ? "on" : ""}`,
        link: v.link,
        logo_url_name: v.icon
      });
    }
  ), /* @__PURE__ */ React23.createElement(SideBarTitle, {
    logo_title: "Games",
    logo_url_name: "pixel_games",
    className: "sideBarTitle mt40"
  }), /* @__PURE__ */ React23.createElement(SideBarGamesList_default, {
    className_on: "item_on",
    className_list: "gamelist",
    className_listItem: "verListItem",
    className_listItemDisable: "verListItemDisable",
    list: sideBarGamesLinkList,
    useNavigate,
    className_imageContainer: "imageContainerWaves"
  }), /* @__PURE__ */ React23.createElement(Language_default, {
    type: "list"
  })), /* @__PURE__ */ React23.createElement("div", {
    className: "sideBar_Bottom"
  }, /* @__PURE__ */ React23.createElement(SideBarTitle, {
    logo_title: "Links",
    logo_url_name: "pixel_link02",
    className: "sideBarTitle"
  }), /* @__PURE__ */ React23.createElement(CommunityLink_default, {
    className: "communityLink"
  })));
};
var SideBar_default = SideBar;

// src/components/DivWrap/DivWrap.tsx
import React24, { memo as memo20 } from "react";
var DivWrap = memo20(
  ({
    className,
    showDiv,
    children
  }) => {
    return showDiv ? /* @__PURE__ */ React24.createElement("div", {
      className
    }, " ", children) : /* @__PURE__ */ React24.createElement(React24.Fragment, null, children);
  },
  isEqual
);
var DivWrap_default = DivWrap;

// src/components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog.tsx
import { WarningOutlined } from "@ant-design/icons";
import classnames8 from "classnames";
import React26, { memo as memo22, useCallback as useCallback15, useEffect as useEffect14, useMemo as useMemo8 } from "react";
import { useRecoilState as useRecoilState7 } from "recoil";
import styled3 from "styled-components";

// src/components/ConnectWallet/components/DialogComponents/DialogTitle.tsx
import classnames7 from "classnames";
import React25, { memo as memo21, useCallback as useCallback14 } from "react";
var DialogTitle = memo21(
  ({ label, setDialogOpen, children, classNames }) => {
    const closeHandle = useCallback14(() => {
      setDialogOpen(false);
    }, [setDialogOpen]);
    return /* @__PURE__ */ React25.createElement("div", {
      className: classnames7("dialog_title_modalTitleInner", classNames)
    }, /* @__PURE__ */ React25.createElement("p", {
      className: "dialog_title_title"
    }, label), children ? children : null, /* @__PURE__ */ React25.createElement("span", {
      onClick: closeHandle
    }, /* @__PURE__ */ React25.createElement(icons_default, {
      name: "close"
    })));
  }
);
var DialogTitle_default = DialogTitle;

// src/components/ConnectWallet/components/linkToBetaDialog/localPathUrl.ts
var getChainNameText = (chainId) => {
  let text = "Beta";
  if (chainId === "91715" /* ComboTestnet */) {
    text = "Combo";
  } else if (chainId === "169" /* MantaPacificMainnet */ || chainId === "3441005" /* MantaPacificTestnet */) {
    text = "Manta";
  } else if (chainId === "5000" /* Mantle */ || chainId === "5001" /* MantleTestnet */) {
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
var Text = styled3.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  padding-top: 30px;
`;
var LinkToBetaDialog = memo22(() => {
  const { t } = useCustomTranslation([LngNs.common]);
  const [linkToBetaDialogOpen, setLinkToBetaDialogOpen] = useRecoilState7(
    linkToBetaDialogState
  );
  const [linkToBetaDialogChainId, setLinkToBetaDialogChainId] = useRecoilState7(
    linkToBetaDialogChainIdState
  );
  const isMobile2 = useIsW768();
  const ToUrlName = useMemo8(() => {
    if (linkToBetaDialogChainId) {
      if (linkToBetaDialogChainId === "9980" /* Combo */) {
        return ["https://app.zypher.game/2048/"];
      }
      return getChainNameText(linkToBetaDialogChainId);
    }
    return "";
  }, [linkToBetaDialogChainId]);
  const handleButtonClick = useCallback15(() => {
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
  useEffect14(() => {
    if (!linkToBetaDialogOpen) {
      setLinkToBetaDialogChainId(void 0);
    }
  }, [linkToBetaDialogOpen]);
  return /* @__PURE__ */ React26.createElement(Modal_default, {
    open: linkToBetaDialogOpen,
    onCancel: () => setLinkToBetaDialogOpen(false),
    footer: null,
    wrapClassName: classnames8("customDialog"),
    destroyOnClose: true,
    closable: false,
    width: isMobile2 ? "100%" : 360,
    centered: isMobile2 ? false : true
  }, /* @__PURE__ */ React26.createElement(DialogTitle_default, {
    label: t("Switch Networks"),
    setDialogOpen: setLinkToBetaDialogOpen,
    classNames: isMobile2 ? "modalTitleInner" : ""
  }), /* @__PURE__ */ React26.createElement(Content, null, /* @__PURE__ */ React26.createElement(WarningOutlined, {
    style: { color: "#1649FF", fontSize: "50px" }
  }), /* @__PURE__ */ React26.createElement(Text, null, linkToBetaDialogChainId === "9980" /* Combo */ ? "Combo is currently only deployed in 2048." : t("linkToBeta", {
    chainName: linkToBetaDialogChainId ? ChainName[linkToBetaDialogChainId] : "",
    toUrlName: ToUrlName[1]
  }))), /* @__PURE__ */ React26.createElement("div", {
    style: { padding: "0 20px 30px" }
  }, /* @__PURE__ */ React26.createElement(DialogButton, {
    onClick: handleButtonClick
  }, linkToBetaDialogChainId === "9980" /* Combo */ ? "Go to Play 2048" : t("GotoVersion", {
    toUrlName: ToUrlName[0]
  }))));
}, isEqual);
var LinkToBetaDialog_default = LinkToBetaDialog;

// src/components/Header/header.tsx
import classnames11 from "classnames";
import React93, { useEffect as useEffect34, useMemo as useMemo18 } from "react";
import { useRecoilState as useRecoilState13, useRecoilValue as useRecoilValue13, useSetRecoilState as useSetRecoilState16 } from "recoil";

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
import React92, { memo as memo33 } from "react";

// src/components/Header/rainbow_account/rainbow_account.tsx
import React38, { memo as memo31, useCallback as useCallback24 } from "react";
import { useSetRecoilState as useSetRecoilState13 } from "recoil";

// src/components/ConnectWallet/components/Balance/Balance.tsx
import { SyncOutlined } from "@ant-design/icons";
import React29, { memo as memo25, useCallback as useCallback17, useEffect as useEffect16, useState as useState14 } from "react";
import { useRecoilValue as useRecoilValue10, useSetRecoilState as useSetRecoilState10 } from "recoil";
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
  return getContract2({ env, abi: erc20Abi_default, address, signer, chainId });
};
var erc20Abi = erc20Abi_default;
var erc20_default = erc20Contract;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
import { LoadingOutlined } from "@ant-design/icons";
import React28, { memo as memo24, useCallback as useCallback16, useEffect as useEffect15 } from "react";

// src/components/ConnectWallet/components/PointsDialog/GetPointsSuccess.tsx
import React27, { memo as memo23 } from "react";
import { useRecoilState as useRecoilState8 } from "recoil";
var GetPointsSuccess = memo23(() => {
  const [show] = useRecoilState8(pointsAnimState);
  if (show) {
    return /* @__PURE__ */ React27.createElement("div", {
      className: "getpointpoints"
    }, new Array(3).fill("").map((c, index) => /* @__PURE__ */ React27.createElement(PointsItem, {
      key: index
    })));
  }
  return null;
}, isEqual);
var PointsItem = () => {
  return /* @__PURE__ */ React27.createElement("div", {
    className: "getpointcoin"
  }, /* @__PURE__ */ React27.createElement("div", {
    className: "getpointcoin_front"
  }, /* @__PURE__ */ React27.createElement("img", {
    decoding: "async",
    loading: "lazy",
    src: preStaticUrl + "/img/layout/Star.png",
    alt: "star"
  })), /* @__PURE__ */ React27.createElement("div", {
    className: "getpointcoin_middle"
  }), /* @__PURE__ */ React27.createElement("div", {
    className: "getpointcoin_back"
  }, /* @__PURE__ */ React27.createElement("img", {
    decoding: "async",
    loading: "lazy",
    src: preStaticUrl + "/img/layout/Star.png",
    alt: "star"
  })));
};
var GetPointsSuccess_default = GetPointsSuccess;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
import { useRecoilState as useRecoilState9, useSetRecoilState as useSetRecoilState9 } from "recoil";
var BalanceItem = memo24(
  ({
    className,
    loading,
    balanceStr,
    logo,
    preChild,
    onClick,
    CountUpNumber,
    balance
  }) => {
    const onClickHandle = useCallback16(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return /* @__PURE__ */ React28.createElement(IsPixelWidget_default, {
      className: `balance_item_balance balance_item_balance_pixel
        ${className != null ? className : ""}`,
      onClick: onClickHandle
    }, preChild, loading ? /* @__PURE__ */ React28.createElement(LoadingOutlined, null) : /* @__PURE__ */ React28.createElement(React28.Fragment, null, CountUpNumber && (balance || balance === 0) ? /* @__PURE__ */ React28.createElement(CountUpNumber, {
      value: balance,
      decimals: 0,
      duration: 1.5,
      showDiv: false
    }) : balanceStr, logo));
  },
  isEqual
);
var BalanceCountUpItem = memo24(
  ({
    className,
    loading,
    balance,
    logo,
    preChild,
    onClick,
    CountUpNumber,
    balanceStr
  }) => {
    const setPointsAnimState = useSetRecoilState9(pointsAnimState);
    const [mount, setMount] = useRecoilState9(pointsAnimNumState);
    const onClickHandle = useCallback16(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    useEffect15(() => {
      if (mount === 1) {
        setPointsAnimState(true);
        setTimeout(() => {
          setPointsAnimState(false);
          setMount(0);
        }, 3e3);
      }
    }, [mount]);
    return /* @__PURE__ */ React28.createElement(IsPixelWidget_default, {
      className: `balance_item_balance_point balance_item_balance  balance_item_balance_pixel
        ${className != null ? className : ""}`,
      onClick: onClickHandle
    }, preChild, loading ? /* @__PURE__ */ React28.createElement(LoadingOutlined, null) : /* @__PURE__ */ React28.createElement(React28.Fragment, null, CountUpNumber && (balance || balance === 0) ? /* @__PURE__ */ React28.createElement(CountUpNumber, {
      value: balance,
      decimals: 0,
      duration: 1.5,
      showDiv: false
    }) : balanceStr, logo), /* @__PURE__ */ React28.createElement(GetPointsSuccess_default, null));
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
var Balance = memo25((props) => {
  const { showPointsModal, env, CountUpNumber, isMiddleWidth } = props;
  const { chainId, account, provider } = useActiveWeb3React();
  const [loading, setLoading] = useState14(false);
  const setNativeBalance = useSetRecoilState10(nativeBalanceState);
  const setPointsBalance = useSetRecoilState10(pointsBalanceState);
  const refreshBalance = useRecoilValue10(refreshBalanceState);
  const { walletClient } = useAaWallet();
  const fetchErc20Balance = useCallback17(async () => {
    console.log(1);
    if (!chainId || !account || !provider || !walletClient) {
      console.log("xxxxx", { chainId, account, provider, walletClient });
      return;
    }
    try {
      const pointsAddress = zkBingo(chainId, "ZypherGameToken" /* ZypherGameToken */);
      if (!pointsAddress) {
        console.log("1adf");
        setPointsBalance(0);
      } else {
        const pointsContract = erc20_default(
          chainId,
          env,
          pointsAddress,
          walletClient
        );
        const balance = await pointsContract.read.balanceOf([account]);
        console.log({ balance, pointsAddress, account });
        setPointsBalance(
          new BigNumberJs_default(balance.toString()).dividedBy(divisorBigNumber).toNumber()
        );
      }
    } catch (e) {
      setPointsBalance(0);
    }
  }, [chainId, account, provider, walletClient]);
  const fetchBalanceOf = useCallback17(async () => {
    if (!chainId || !account || !walletClient) {
      return;
    }
    setLoading(true);
    const balance = await provider.getBalance({ address: account });
    setNativeBalance(
      new BigNumberJs_default(balance.toString()).dividedBy(divisorBigNumber).toNumber()
    );
    await fetchErc20Balance();
    setLoading(false);
  }, [chainId, account, provider, walletClient, fetchErc20Balance]);
  useEffect16(() => {
    if (account && chainId && walletClient) {
      fetchBalanceOf();
    }
  }, [account, chainId, refreshBalance, walletClient]);
  const pointsBalance = useRecoilValue10(pointsBalanceState);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  return /* @__PURE__ */ React29.createElement(React29.Fragment, null, isMiddleWidth ? null : /* @__PURE__ */ React29.createElement(IsPixelWidget_default, {
    className: "refresh_balance  refresh_balance_pixel",
    onClick: fetchBalanceOf
  }, /* @__PURE__ */ React29.createElement(SyncOutlined, null)), DPSupportChainId.includes(chainId) ? /* @__PURE__ */ React29.createElement(BalanceCountUpItem, {
    onClick: showPointsModal,
    logo: /* @__PURE__ */ React29.createElement(PointsIcon, {
      isMobile: isMiddleWidth
    }),
    balance: pointsBalance,
    loading,
    className: props.className,
    CountUpNumber,
    preChild: /* @__PURE__ */ React29.createElement(AddIcon, {
      name: "pixel_add",
      isMobile: isMiddleWidth
    }),
    balanceStr: pointsBalanceStr
  }) : null, !isMiddleWidth && /* @__PURE__ */ React29.createElement(balanceItem_default, {
    logo: /* @__PURE__ */ React29.createElement(CurrencyLogo_default, {
      className: "balance_item_img",
      src: CurrencyLogo[chainId || 97]
    }),
    balanceStr: nativeBalanceStr,
    loading,
    className: props.className
  }));
}, isEqual);
var Balance_default = Balance;

// src/components/ConnectWallet/components/ChainSelector/ChainSelectorWidget.tsx
import React30, { memo as memo26, useCallback as useCallback18 } from "react";
import styled5 from "styled-components";
import { useRecoilState as useRecoilState10 } from "recoil";
var StatusI = styled5.i`
  box-sizing: content-box;
  display: inline-block;
  width: 6px;
  height: 6px;
  background-color: #47ff1a;
  margin-left: ${({ isMobile: isMobile2 }) => isMobile2 ? "4px" : "10px"};
  border-radius: 50%;
  position: relative;
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: -3px;
    left: -3px;
    border: 3px solid rgba(71, 255, 26, 0.29);
    box-sizing: content-box;
    border-radius: 50%;
  }
`;
var ChainSelectorWidget = memo26(({ className, direction_type }) => {
  const { chainId } = useActiveWeb3React();
  const isMobile2 = useIsW768();
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState10(
    accountInfoDialogState
  );
  const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState10(pointsDialogState);
  const [sideCollapse, setSideCollapse] = useRecoilState10(sideCollapseState);
  const { openChainModal } = useChainModal();
  const openChainModalHandle = useCallback18(() => {
    if (accountInfoDialogOpen) {
      setAccountInfoDialogOpen(false);
    }
    if (pointsDialogOpen) {
      setPointsDialogOpen(false);
    }
    if (!sideCollapse) {
      setSideCollapse(true);
    }
    if (openChainModal) {
      openChainModal();
    }
  }, [openChainModal]);
  return chainId ? /* @__PURE__ */ React30.createElement(IsPixelWidget_default, {
    onClick: openChainModalHandle,
    ...direction_type === "userPop" ? {
      backgroundColor: "#343C4F",
      borderColor: "#484F60",
      pixel_height: 3
    } : {},
    className: className != null ? className : ""
  }, /* @__PURE__ */ React30.createElement("div", {
    className: "ChainSelectorWidgetWrapper"
  }, /* @__PURE__ */ React30.createElement("div", {
    className: "img"
  }, /* @__PURE__ */ React30.createElement("img", {
    decoding: "async",
    loading: "lazy",
    className: `ChainImage_${chainId}`,
    src: ChainImage[chainId],
    alt: ChainName[chainId]
  }), /* @__PURE__ */ React30.createElement("p", null, ChainName[chainId])), /* @__PURE__ */ React30.createElement(StatusI, {
    isMobile: isMobile2
  }))) : null;
}, isEqual);
var ChainSelectorWidget_default = ChainSelectorWidget;

// src/components/ConnectWallet/components/PointsDialog/PointsRuleDialog.tsx
import { DialogContent as DialogContent2, DialogOverlay as DialogOverlay2 } from "@reach/dialog";
import React31, { useCallback as useCallback19 } from "react";
import { useRecoilValue as useRecoilValue11, useSetRecoilState as useSetRecoilState11 } from "recoil";
import { Trans } from "react-i18next";
var PointsRuleDialog = () => {
  const { t } = useCustomTranslation([LngNs.points]);
  const isModalOpen = useRecoilValue11(pointsRuleDialogState);
  const setIsModalOpen = useSetRecoilState11(pointsRuleDialogState);
  const handleCancel = useCallback19(() => {
    setIsModalOpen(false);
  }, []);
  return /* @__PURE__ */ React31.createElement(React31.Fragment, null, /* @__PURE__ */ React31.createElement(DialogOverlay2, {
    isOpen: isModalOpen,
    onDismiss: handleCancel,
    className: "points_dialog_zindex"
  }, /* @__PURE__ */ React31.createElement(DialogContent2, {
    className: "points_dialog_dialogContent"
  }, /* @__PURE__ */ React31.createElement(PixelTable, {
    backgroundColor: "#1D263B",
    header_children: /* @__PURE__ */ React31.createElement("p", {
      className: "modalTitleInnerTitle"
    }, t("Rules")),
    body_children: /* @__PURE__ */ React31.createElement(React31.Fragment, null, /* @__PURE__ */ React31.createElement("div", {
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
    }, /* @__PURE__ */ React31.createElement(ActivePixelButtonColor, {
      themeType: "brightBlue",
      onClick: handleCancel,
      width: "340px",
      height: "52px",
      pixel_height: 4
    }, t("Ok")))),
    pixel_height: 10
  }), /* @__PURE__ */ React31.createElement(DialogClose_default, {
    onClick: handleCancel
  }))));
};
var PointsRuleDialog_default = PointsRuleDialog;

// src/components/Header/rainbow_account/AccountInfo/AccountInfo.tsx
import React37, { memo as memo30, useCallback as useCallback23 } from "react";

// src/components/PlayerAvatar/index.tsx
import cx from "classnames";
import React33, { memo as memo27, useMemo as useMemo9 } from "react";
import styled7 from "styled-components";

// src/components/Avatar/Avatar.tsx
import React32 from "react";
import styled6 from "styled-components";
var IsPixelWidgetStyled = styled6(IsPixelWidget_default)`
  width: ${({ size }) => size}px !important;
  height: ${({ size }) => size}px !important;
  border-radius: ${({ hidePixel }) => !hidePixel ? "0" : "50%"};
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  &.pixel_flat_btn {
    img {
      width: 75%;
      height: 75%;
    }
  }
`;
var Avatar = ({
  src: src6,
  altText,
  style = {},
  size = 64,
  backgroundColor,
  hidePixel
}) => {
  return /* @__PURE__ */ React32.createElement(IsPixelWidgetStyled, {
    hidePixel,
    size,
    style,
    backgroundColor
  }, /* @__PURE__ */ React32.createElement("img", {
    decoding: "async",
    loading: "lazy",
    src: src6,
    alt: altText
  }));
};
var Avatar_default = Avatar;

// src/hooks/useAvatar.ts
import { useCallback as useCallback20, useEffect as useEffect17, useState as useState15 } from "react";
import { useRecoilValue as useRecoilValue12 } from "recoil";

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
    preStaticUrl + "/img/tvl/hero/Agil_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Celus_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Ivan_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Liana_Avatar.png",
    preStaticUrl + "/img/tvl/hero/Yueling_Avatar.png"
  ][seed % 6];
  const selectedBackground = [
    "#7ADBB2",
    "#FFD584",
    "#9269EB",
    "#EB6676",
    "#FFD584",
    "#62A1FF",
    "#E78C65",
    "#FF603E",
    "#99E675",
    "#65DAD3",
    "#62A1FF",
    "#E78C65",
    "#FF603E",
    "#99E675",
    "#65DAD3"
  ][seed % 15];
  if (!account) {
    return {
      selectedAvatar: preStaticUrl + "/img/default_avatar.png",
      selectedBackground: "#EFEFEF"
    };
  }
  return { selectedAvatar, selectedBackground };
};

// src/hooks/useAvatar.ts
var useAvatar = (account, hideAvatars) => {
  const [avatars2, setAvatars] = useState15({
    selectedAvatar: "",
    selectedBackground: ""
  });
  const refreshAvatar = useRecoilValue12(refreshAvatarState);
  const IS_TELEGRAM = useIsTelegram();
  const [_account, _setAccount] = useState15(account);
  const ownerList = useRecoilValue12(ownerListState);
  console.log({ ownerList, account, _account });
  const getAccount = useCallback20(async () => {
    var _a;
    try {
      if (account) {
        _setAccount((_a = ownerList[account.toLowerCase()]) != null ? _a : account);
      }
    } catch (err) {
      console.log("error _account", err);
    }
  }, [JSON.stringify(ownerList), account]);
  useEffect17(() => {
    getAccount();
  }, [getAccount]);
  useEffect17(() => {
    if (_account && !hideAvatars) {
      getData();
    } else {
      const { selectedAvatar, selectedBackground } = generateAvatar_default(_account);
      setAvatars({ selectedAvatar, selectedBackground });
    }
  }, [_account, refreshAvatar]);
  const getData = useCallback20(() => {
    const img = new Image();
    let src6 = "";
    let selectedBackground = "#fff";
    if (IS_TELEGRAM) {
      src6 = `https://zypher-static.s3.amazonaws.com/telegram/${_account == null ? void 0 : _account.toLowerCase()}`;
    } else {
      selectedBackground = "#1A1B1F";
      src6 = `https://tvl-avatar.s3.us-west-2.amazonaws.com/${_account == null ? void 0 : _account.toLowerCase()}.png`;
    }
    img.src = src6;
    img.onload = () => {
      setAvatars({
        selectedAvatar: `${src6}?9999999${refreshAvatar}`,
        selectedBackground
      });
    };
    img.onerror = () => {
      const { selectedAvatar, selectedBackground: selectedBackground2 } = generateAvatar_default(_account);
      setAvatars({ selectedAvatar, selectedBackground: selectedBackground2 });
    };
  }, [_account, refreshAvatar]);
  return {
    avatars: avatars2 || {},
    aa_mm_address: _account
  };
};

// src/components/PlayerAvatar/index.tsx
var PlayerAvatar = memo27(
  ({
    account,
    showAccount = false,
    size = 60,
    border = false,
    AvatarBorder = React33.Fragment,
    AccountTextFrComp = React33.Fragment,
    className,
    preLen,
    endLen,
    otherStr,
    hideAvatars,
    onClick,
    onMouseOver,
    hidePixel,
    name
  }) => {
    const { t } = useCustomTranslation([LngNs.zBingo]);
    const { avatars: avatars2, aa_mm_address } = useAvatar(account, hideAvatars);
    const avatarText = useMemo9(() => {
      const nameText = name != null ? name : aa_mm_address;
      if (nameText) {
        return `${getShortenAddress(nameText, preLen, endLen)}${otherStr ? ` ${otherStr}` : ""}`;
      }
      return t("waiting");
    }, [aa_mm_address, otherStr, name]);
    return /* @__PURE__ */ React33.createElement("div", {
      className: cx(className, "player_playerAvatar"),
      onClick,
      onMouseOver
    }, hideAvatars ? null : aa_mm_address ? avatars2 ? /* @__PURE__ */ React33.createElement(AvatarBorder, null, /* @__PURE__ */ React33.createElement(Avatar_default, {
      hidePixel,
      size,
      src: avatars2.selectedAvatar,
      backgroundColor: avatars2.selectedBackground
    })) : null : /* @__PURE__ */ React33.createElement("div", {
      className: "player_avatar",
      style: {
        width: `${size}px`,
        height: `${size}px`,
        overflow: "hidden",
        background: "rgba(138, 138, 138, 1)"
      }
    }, /* @__PURE__ */ React33.createElement(Avatar_default, {
      hidePixel,
      size,
      src: preStaticUrl + `/img/pixel_default_avatar.png`
    })), showAccount && /* @__PURE__ */ React33.createElement("p", {
      className: (className == null ? void 0 : className.includes("account")) ? "player_avatar_account" : ""
    }, avatarText, /* @__PURE__ */ React33.createElement(AccountTextFrComp, null)));
  }
);
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
  const {
    avatars: { selectedAvatar, selectedBackground }
  } = useAvatar(account, false);
  return /* @__PURE__ */ React33.createElement(OuterCircle, {
    size,
    isGreen,
    isGrey,
    winner
  }, /* @__PURE__ */ React33.createElement("div", {
    className: "center-circle"
  }, /* @__PURE__ */ React33.createElement("div", {
    className: "inner-circle"
  }, account ? /* @__PURE__ */ React33.createElement("img", {
    decoding: "async",
    loading: "lazy",
    width: "100%",
    src: selectedAvatar,
    style: { background: selectedBackground }
  }) : /* @__PURE__ */ React33.createElement("img", {
    decoding: "async",
    loading: "lazy",
    width: "100%",
    src: preStaticUrl + `/img/default_avatar.png`
  }))));
};
var PlayerAvatar_default = PlayerAvatar;

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import classnames10 from "classnames";
import React36, { memo as memo29, useCallback as useCallback22, useEffect as useEffect18, useState as useState16 } from "react";
import { useRecoilState as useRecoilState12 } from "recoil";

// src/hooks/useActiveWallet.ts
import { useMemo as useMemo11 } from "react";

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
import React34, { createContext as createContext2, useContext as useContext2, useMemo as useMemo10 } from "react";
var RainbowKitChainContext = createContext2({
  chains: []
});
function RainbowKitChainProvider({
  chains,
  children,
  initialChain
}) {
  return /* @__PURE__ */ React34.createElement(RainbowKitChainContext.Provider, {
    value: useMemo10(
      () => ({
        chains,
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
  return useMemo10(() => {
    const rainbowkitChainsById = {};
    rainbowkitChains.forEach((rkChain) => {
      rainbowkitChainsById[rkChain.id] = rkChain;
    });
    return rainbowkitChainsById;
  }, [rainbowkitChains]);
};

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
  ).sort((a, b) => a.index - b.index);
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

// src/hooks/useActiveWallet.ts
var useActiveWallet = () => {
  const wallets = useWalletConnectors();
  return useMemo11(() => {
    if (wallets) {
      const wall = wallets.filter((v) => v.ready && v.recent);
      return wall == null ? void 0 : wall[0];
    }
    return void 0;
  }, [wallets]);
};

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
import classnames9 from "classnames";
import React35, { memo as memo28, useCallback as useCallback21, useMemo as useMemo12 } from "react";
import { useDisconnect } from "wagmi";
import { useRecoilState as useRecoilState11 } from "recoil";
var MUserInfo = memo28(
  ({ account, chainId, copy, cancel, type }) => {
    const { disconnect } = useDisconnect();
    const [, setAccountInfoDialogOpen] = useRecoilState11(accountInfoDialogState);
    const { t } = useCustomTranslation([LngNs.common]);
    const nativeBalanceStr = useNativeBalanceStr();
    const pointsBalanceStr = usePointsBalanceStr();
    const isMobile2 = useIsW768();
    const list = useMemo12(() => {
      return [
        {
          balanceStr: pointsBalanceStr,
          logo: /* @__PURE__ */ React35.createElement(PointsIcon, {
            isMobile: isMobile2
          }),
          symbol: "Gold Points"
        },
        {
          balanceStr: nativeBalanceStr,
          logo: /* @__PURE__ */ React35.createElement(CurrencyLogo_default, {
            className: "m_user_img",
            src: CurrencyLogo[chainId]
          }),
          symbol: Currency[chainId]
        }
      ];
    }, []);
    const openHandle = useCallback21(() => {
      var _a;
      window.open(
        `${(_a = BlockExplorerUrls[chainId]) != null ? _a : [0]}/address/${account}`,
        "_blank"
      );
    }, [account, chainId]);
    const cancelHandle = useCallback21(() => {
      setAccountInfoDialogOpen(false);
      disconnect();
    }, [disconnect]);
    return /* @__PURE__ */ React35.createElement("div", {
      className: "m_user_m_content"
    }, /* @__PURE__ */ React35.createElement(ChainSelectorWidget_default, {
      direction_type: "userPop",
      type: "pixel",
      className: classnames9("m_user_chain")
    }), /* @__PURE__ */ React35.createElement(PixelBorderCard, {
      pixel_height: 3,
      backgroundColor: "#343C4F",
      borderColor: "#484F60",
      className: "m_user_border"
    }, /* @__PURE__ */ React35.createElement("p", {
      className: "m_user_tit"
    }, t("Your Wallet")), /* @__PURE__ */ React35.createElement("div", {
      className: "m_user_userInfoInner"
    }, /* @__PURE__ */ React35.createElement(PlayerAvatar_default, {
      className: "m_user_account",
      account,
      size: 24,
      showAccount: true
    }), /* @__PURE__ */ React35.createElement("span", {
      onClick: () => copy(account)
    }, /* @__PURE__ */ React35.createElement(icons_default, {
      name: "copy"
    }))), /* @__PURE__ */ React35.createElement("div", {
      className: "m_user_balance"
    }, list.map((v) => /* @__PURE__ */ React35.createElement("div", {
      key: v.symbol,
      className: "m_user_item"
    }, /* @__PURE__ */ React35.createElement("div", {
      className: "m_user_fl"
    }, v.logo, /* @__PURE__ */ React35.createElement("p", null, v.symbol)), /* @__PURE__ */ React35.createElement("p", null, v.balanceStr))))), /* @__PURE__ */ React35.createElement(PixelBorderCard, {
      pixel_height: 3,
      backgroundColor: "#343C4F",
      borderColor: "#484F60",
      className: "m_user_border"
    }, /* @__PURE__ */ React35.createElement("div", {
      className: "m_user_fun"
    }, /* @__PURE__ */ React35.createElement(FunItem, {
      iconName: "pixel_blockchain",
      label: "Blockchain Explorer",
      onClick: openHandle
    }), /* @__PURE__ */ React35.createElement(FunItem, {
      iconName: "pixel_disconnect",
      label: "Disconnect",
      onClick: cancelHandle
    }))));
  },
  isEqual
);
var FunItem = memo28(
  ({
    iconName,
    label,
    onClick
  }) => {
    return /* @__PURE__ */ React35.createElement("div", {
      className: "m_user_info_FunItem",
      onClick
    }, /* @__PURE__ */ React35.createElement(icons_default, {
      name: iconName
    }), /* @__PURE__ */ React35.createElement("p", null, label));
  }
);
var MUserInfo_default = MUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import { useDisconnect as useDisconnect2 } from "wagmi";
var AccountInfoDialog = memo29(({ copy }) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState12(
    accountInfoDialogState
  );
  const { account, chainId } = useActiveWeb3React();
  const isMobile2 = useIsW1100();
  const { disconnect } = useDisconnect2();
  const wallet = useActiveWallet();
  const cancel = useCallback22(() => {
    setAccountInfoDialogOpen(false);
    disconnect();
  }, [disconnect]);
  useEffect18(() => {
    if (accountInfoDialogOpen && isMobile2) {
      setAccountInfoDialogOpen(false);
    }
  }, [isMobile2]);
  return account && chainId ? /* @__PURE__ */ React36.createElement(React36.Fragment, null, /* @__PURE__ */ React36.createElement(Modal_default, {
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
  }, /* @__PURE__ */ React36.createElement(DialogTitle_default, {
    label: t("Your Wallet"),
    setDialogOpen: setAccountInfoDialogOpen,
    classNames: isMobile2 ? "modalTitleInner" : ""
  }), /* @__PURE__ */ React36.createElement("div", {
    className: "account_info_dialog_modalMain"
  }, /* @__PURE__ */ React36.createElement(MUserInfo_default, {
    copy,
    account,
    chainId,
    cancel
  })))) : null;
});
var AddressBigWrapPop = memo29(({ copy }) => {
  const [index, setIndex] = useState16();
  const { account, chainId } = useActiveWeb3React();
  const { disconnect } = useDisconnect2();
  const [, setAccountInfoDialogOpen] = useRecoilState12(accountInfoDialogState);
  useEffect18(() => {
    if (index || index === 0) {
      setTimeout(() => {
        setIndex(void 0);
      }, 2e3);
    }
  }, [index]);
  const copyAddressHandle = useCallback22(() => {
    copy(account);
    setIndex(0);
  }, [account]);
  const openHandle = useCallback22(() => {
    var _a;
    window.open(
      `${(_a = BlockExplorerUrls[chainId]) != null ? _a : [0]}/address/${account}`,
      "_blank"
    );
    setIndex(1);
  }, [account, chainId]);
  const cancelHandle = useCallback22(() => {
    setAccountInfoDialogOpen(false);
    disconnect();
    setIndex(2);
  }, [disconnect]);
  return /* @__PURE__ */ React36.createElement("div", {
    className: "address_wrap_big_pop_wrap"
  }, /* @__PURE__ */ React36.createElement(PixelBorderCard, {
    className: "address_wrap_big_pop",
    pixel_height: 4,
    backgroundColor: "#1D263B",
    borderColor: "#3A4254"
  }, /* @__PURE__ */ React36.createElement(AddressWrapPopItem, {
    iconName: "pixel_copy",
    label: "Copy address",
    onClick: copyAddressHandle,
    on: index === 0
  }), /* @__PURE__ */ React36.createElement(AddressWrapPopItem, {
    iconName: "pixel_blockchain",
    label: "Explorer",
    onClick: openHandle,
    on: index === 1
  }), /* @__PURE__ */ React36.createElement(AddressWrapPopItem, {
    iconName: "pixel_disconnect",
    label: "Disconnect",
    onClick: cancelHandle,
    on: index === 2
  })));
});
var AddressMiddleWrapPop = memo29(({ copy }) => {
  const [index, setIndex] = useState16();
  const { account, chainId } = useActiveWeb3React();
  const nativeBalanceStr = useNativeBalanceStr();
  const { disconnect } = useDisconnect2();
  const [, setAccountInfoDialogOpen] = useRecoilState12(accountInfoDialogState);
  useEffect18(() => {
    if (index || index === 0) {
      setTimeout(() => {
        setIndex(void 0);
      }, 2e3);
    }
  }, [index]);
  const copyAddressHandle = useCallback22(() => {
    copy(account);
    setIndex(0);
  }, [account]);
  const openHandle = useCallback22(() => {
    var _a;
    window.open(
      `${(_a = BlockExplorerUrls[chainId]) != null ? _a : [0]}/address/${account}`,
      "_blank"
    );
    setIndex(1);
  }, [account, chainId]);
  const cancelHandle = useCallback22(() => {
    setAccountInfoDialogOpen(false);
    disconnect();
    setIndex(2);
  }, [disconnect]);
  return /* @__PURE__ */ React36.createElement("div", {
    className: "address_wrap_big_pop_wrap"
  }, /* @__PURE__ */ React36.createElement(PixelBorderCard, {
    className: "address_wrap_middle_pop",
    pixel_height: 4,
    backgroundColor: "#1D263B",
    borderColor: "#3A4254"
  }, /* @__PURE__ */ React36.createElement("div", {
    className: "middle_account"
  }, /* @__PURE__ */ React36.createElement(PlayerAvatar_default, {
    border: true,
    className: "account",
    account,
    size: 62,
    showAccount: false
  }), /* @__PURE__ */ React36.createElement("div", {
    className: "middle_address",
    onClick: copyAddressHandle
  }, /* @__PURE__ */ React36.createElement("p", null, getShortenAddress(account)), /* @__PURE__ */ React36.createElement(icons_default, {
    name: "pixel_copy"
  }))), /* @__PURE__ */ React36.createElement(ChainSelectorWidget_default, {
    direction_type: "userPop",
    className: "middle_selector"
  }), /* @__PURE__ */ React36.createElement("div", {
    className: "middle_balance"
  }, /* @__PURE__ */ React36.createElement(BalanceItem2, {
    currency: Currency[chainId],
    balanceStr: nativeBalanceStr,
    logo: /* @__PURE__ */ React36.createElement(CurrencyLogo_default, {
      className: "balance_item_img",
      src: CurrencyLogo[chainId]
    })
  })), /* @__PURE__ */ React36.createElement(Language_default, {
    type: "list"
  }), /* @__PURE__ */ React36.createElement(AddressWrapPopItem, {
    iconName: "pixel_blockchain",
    label: "Blockchain Explorer",
    onClick: openHandle,
    on: index === 1
  }), /* @__PURE__ */ React36.createElement(AddressWrapPopItem, {
    iconName: "pixel_disconnect",
    label: "Disconnect",
    onClick: cancelHandle,
    on: index === 2
  })));
});
var AddressWrapPopItem = memo29(
  ({
    iconName,
    label,
    onClick,
    on
  }) => {
    return /* @__PURE__ */ React36.createElement(PixelCube2, {
      className: `address_wrap_pop_item ${on ? "on" : ""}`,
      onClick,
      pixel_height: 3,
      backgroundColor: "#1D263B",
      borderColor: "#1D263B",
      width: "100%",
      height: "36px"
    }, /* @__PURE__ */ React36.createElement(icons_default, {
      name: iconName
    }), /* @__PURE__ */ React36.createElement("p", null, label));
  }
);
var BalanceItem2 = memo29(
  ({
    logo,
    balanceStr,
    currency
  }) => {
    return /* @__PURE__ */ React36.createElement("div", {
      className: "middle_balance_item"
    }, /* @__PURE__ */ React36.createElement("div", {
      className: "fl"
    }, logo, /* @__PURE__ */ React36.createElement("p", null, currency)), /* @__PURE__ */ React36.createElement("p", {
      className: "frText"
    }, balanceStr));
  }
);
var AccountInfoDialog_default = AccountInfoDialog;

// src/components/Header/rainbow_account/AccountInfo/AccountInfo.tsx
import { useSetRecoilState as useSetRecoilState12 } from "recoil";
var AccountInfo = memo30(
  ({ isW768, isMiddleWidth, copy, env, supportedChainList }) => {
    const { chainId, account } = useActiveWeb3React(env, supportedChainList);
    const setAccountInfoDialogState = useSetRecoilState12(accountInfoDialogState);
    const accountClick = useCallback23(() => {
      if (isW768) {
        setAccountInfoDialogState(true);
      }
    }, [isW768, setAccountInfoDialogState]);
    return /* @__PURE__ */ React37.createElement(React37.Fragment, null, /* @__PURE__ */ React37.createElement(IsPixelWidget_default, {
      className: "address_wrap"
    }, /* @__PURE__ */ React37.createElement(PlayerAvatar_default, {
      onClick: accountClick,
      className: "account",
      account,
      size: isW768 ? 30 : 40,
      showAccount: isMiddleWidth ? false : true
    }), !isMiddleWidth && !isW768 ? /* @__PURE__ */ React37.createElement(AddressBigWrapPop, {
      copy
    }) : null, isMiddleWidth && !isW768 ? /* @__PURE__ */ React37.createElement(AddressMiddleWrapPop, {
      copy
    }) : null), isW768 ? /* @__PURE__ */ React37.createElement(AccountInfoDialog_default, {
      copy
    }) : null);
  }
);
var AccountInfo_default = AccountInfo;

// src/components/Header/rainbow_account/rainbow_account.tsx
var Account2 = memo31(
  ({
    isMiddleWidth,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    CountUpNumber,
    supportedChainList
  }) => {
    const isW768 = useIsW768();
    const setPointsDialogState = useSetRecoilState13(pointsDialogState);
    const showPointsModal = useCallback24(() => {
      setPointsDialogState(true);
    }, [setPointsDialogState]);
    return /* @__PURE__ */ React38.createElement(React38.Fragment, null, /* @__PURE__ */ React38.createElement(Balance_default, {
      isMiddleWidth,
      CountUpNumber,
      env,
      showPointsModal
    }), /* @__PURE__ */ React38.createElement(AccountInfo_default, {
      isMiddleWidth,
      isW768,
      copy,
      env
    }), !isMiddleWidth && /* @__PURE__ */ React38.createElement(ChainSelectorWidget_default, null), /* @__PURE__ */ React38.createElement(PointsDialog_default, {
      env,
      dispatch,
      setSuccessToast,
      setErrorToast
    }), /* @__PURE__ */ React38.createElement(PointsRuleDialog_default, null));
  },
  isEqual
);
var rainbow_account_default = Account2;

// src/components/Header/rainbow_account/WrongNetwork.tsx
import React88, { memo as memo32 } from "react";
import { useSetRecoilState as useSetRecoilState15 } from "recoil";

// src/rainbowkit/src/components/RainbowKitProvider/ModalContext.tsx
import React87, {
  createContext as createContext11,
  useCallback as useCallback34,
  useContext as useContext16,
  useMemo as useMemo17,
  useRef as useRef11,
  useState as useState26
} from "react";
import { useAccount as useAccount11, useNetwork as useNetwork6 } from "wagmi";

// src/rainbowkit/src/hooks/useConnectionStatus.ts
import { useAccount as useAccount3 } from "wagmi";

// src/rainbowkit/src/components/RainbowKitProvider/AuthenticationContext.tsx
import React39, {
  createContext as createContext3,
  useContext as useContext3,
  useEffect as useEffect19,
  useMemo as useMemo13,
  useRef as useRef7
} from "react";
import { useAccount as useAccount2 } from "wagmi";
function createAuthenticationAdapter(adapter) {
  return adapter;
}
var AuthenticationContext = createContext3(
  null
);
function RainbowKitAuthenticationProvider({
  adapter,
  children,
  enabled = true,
  status
}) {
  useAccount2({
    onDisconnect: () => {
      adapter.signOut();
    }
  });
  const { isDisconnected } = useAccount2();
  const onceRef = useRef7(false);
  useEffect19(() => {
    if (onceRef.current)
      return;
    onceRef.current = true;
    if (isDisconnected && status === "authenticated") {
      adapter.signOut();
    }
  }, [status, adapter, isDisconnected]);
  return /* @__PURE__ */ React39.createElement(AuthenticationContext.Provider, {
    value: useMemo13(
      () => enabled ? { adapter, status } : null,
      [enabled, adapter, status]
    )
  }, children);
}
function useAuthenticationAdapter() {
  var _a;
  const { adapter } = (_a = useContext3(AuthenticationContext)) != null ? _a : {};
  if (!adapter) {
    throw new Error("No authentication adapter found");
  }
  return adapter;
}
function useAuthenticationStatus() {
  var _a;
  const contextValue = useContext3(AuthenticationContext);
  return (_a = contextValue == null ? void 0 : contextValue.status) != null ? _a : null;
}

// src/rainbowkit/src/hooks/useConnectionStatus.ts
function useConnectionStatus() {
  const authenticationStatus = useAuthenticationStatus();
  const { address, isConnected } = useAccount3();
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

// src/rainbowkit/src/components/AccountModal/AccountModal.tsx
import React67 from "react";
import { useAccount as useAccount10, useBalance, useDisconnect as useDisconnect4 } from "wagmi";

// src/rainbowkit/src/hooks/useMainnetEnsAvatar.ts
import { useEnsAvatar } from "wagmi";

// src/rainbowkit/src/hooks/useMainnet.ts
import { usePublicClient as usePublicClient2 } from "wagmi";
import { mainnet } from "wagmi/chains";
function useMainnet() {
  const chainId = mainnet.id;
  const provider = usePublicClient2();
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

// src/rainbowkit/src/components/Dialog/Dialog.tsx
import React54, { useCallback as useCallback29, useEffect as useEffect27, useState as useState20 } from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

// src/rainbowkit/src/components/Box/Box.ts
import clsx2 from "clsx";
import * as React40 from "react";

// src/rainbowkit/src/css/atoms.ts
import clsx from "clsx";

// src/rainbowkit/src/css/reset.css.ts
var base = "reset_base__1jjvb170";
var element = { a: "reset_a__1jjvb17a", blockquote: "reset_quote__1jjvb172", button: "reset_button__1jjvb179", input: "reset_input__1jjvb178 reset_field__1jjvb175 reset_appearance__1jjvb174", mark: "reset_mark__1jjvb176", ol: "reset_list__1jjvb171", q: "reset_quote__1jjvb172", select: "reset_select__1jjvb177 reset_field__1jjvb175 reset_appearance__1jjvb174", table: "reset_table__1jjvb173", textarea: "reset_field__1jjvb175 reset_appearance__1jjvb174", ul: "reset_list__1jjvb171" };

// src/rainbowkit/src/css/sprinkles.css.ts
import { createMapValueFn as _51c72 } from "@vanilla-extract/sprinkles/createUtils";
import { createNormalizeValueFn as _a49f6 } from "@vanilla-extract/sprinkles/createUtils";
import { createSprinkles as _ad221 } from "@vanilla-extract/sprinkles/createRuntimeSprinkles";
var largeScreenMinWidth = 768;
var mapResponsiveValue = _51c72({ conditions: { defaultCondition: "smallScreen", conditionNames: ["smallScreen", "largeScreen"], responsiveArray: void 0 } });
var normalizeResponsiveValue = _a49f6({ conditions: { defaultCondition: "smallScreen", conditionNames: ["smallScreen", "largeScreen"], responsiveArray: void 0 } });
var sprinkles = _ad221({ conditions: { defaultCondition: "base", conditionNames: ["base", "hover", "active"], responsiveArray: void 0 }, styles: { background: { values: { accentColor: { conditions: { base: "sprinkles_background_accentColor_base__dmay209h", hover: "sprinkles_background_accentColor_hover__dmay209i", active: "sprinkles_background_accentColor_active__dmay209j" }, defaultClass: "sprinkles_background_accentColor_base__dmay209h" }, accentColorForeground: { conditions: { base: "sprinkles_background_accentColorForeground_base__dmay209k", hover: "sprinkles_background_accentColorForeground_hover__dmay209l", active: "sprinkles_background_accentColorForeground_active__dmay209m" }, defaultClass: "sprinkles_background_accentColorForeground_base__dmay209k" }, actionButtonBorder: { conditions: { base: "sprinkles_background_actionButtonBorder_base__dmay209n", hover: "sprinkles_background_actionButtonBorder_hover__dmay209o", active: "sprinkles_background_actionButtonBorder_active__dmay209p" }, defaultClass: "sprinkles_background_actionButtonBorder_base__dmay209n" }, actionButtonBorderMobile: { conditions: { base: "sprinkles_background_actionButtonBorderMobile_base__dmay209q", hover: "sprinkles_background_actionButtonBorderMobile_hover__dmay209r", active: "sprinkles_background_actionButtonBorderMobile_active__dmay209s" }, defaultClass: "sprinkles_background_actionButtonBorderMobile_base__dmay209q" }, actionButtonSecondaryBackground: { conditions: { base: "sprinkles_background_actionButtonSecondaryBackground_base__dmay209t", hover: "sprinkles_background_actionButtonSecondaryBackground_hover__dmay209u", active: "sprinkles_background_actionButtonSecondaryBackground_active__dmay209v" }, defaultClass: "sprinkles_background_actionButtonSecondaryBackground_base__dmay209t" }, closeButton: { conditions: { base: "sprinkles_background_closeButton_base__dmay209w", hover: "sprinkles_background_closeButton_hover__dmay209x", active: "sprinkles_background_closeButton_active__dmay209y" }, defaultClass: "sprinkles_background_closeButton_base__dmay209w" }, closeButtonBackground: { conditions: { base: "sprinkles_background_closeButtonBackground_base__dmay209z", hover: "sprinkles_background_closeButtonBackground_hover__dmay20a0", active: "sprinkles_background_closeButtonBackground_active__dmay20a1" }, defaultClass: "sprinkles_background_closeButtonBackground_base__dmay209z" }, connectButtonBackground: { conditions: { base: "sprinkles_background_connectButtonBackground_base__dmay20a2", hover: "sprinkles_background_connectButtonBackground_hover__dmay20a3", active: "sprinkles_background_connectButtonBackground_active__dmay20a4" }, defaultClass: "sprinkles_background_connectButtonBackground_base__dmay20a2" }, connectButtonBackgroundError: { conditions: { base: "sprinkles_background_connectButtonBackgroundError_base__dmay20a5", hover: "sprinkles_background_connectButtonBackgroundError_hover__dmay20a6", active: "sprinkles_background_connectButtonBackgroundError_active__dmay20a7" }, defaultClass: "sprinkles_background_connectButtonBackgroundError_base__dmay20a5" }, connectButtonInnerBackground: { conditions: { base: "sprinkles_background_connectButtonInnerBackground_base__dmay20a8", hover: "sprinkles_background_connectButtonInnerBackground_hover__dmay20a9", active: "sprinkles_background_connectButtonInnerBackground_active__dmay20aa" }, defaultClass: "sprinkles_background_connectButtonInnerBackground_base__dmay20a8" }, connectButtonText: { conditions: { base: "sprinkles_background_connectButtonText_base__dmay20ab", hover: "sprinkles_background_connectButtonText_hover__dmay20ac", active: "sprinkles_background_connectButtonText_active__dmay20ad" }, defaultClass: "sprinkles_background_connectButtonText_base__dmay20ab" }, connectButtonTextError: { conditions: { base: "sprinkles_background_connectButtonTextError_base__dmay20ae", hover: "sprinkles_background_connectButtonTextError_hover__dmay20af", active: "sprinkles_background_connectButtonTextError_active__dmay20ag" }, defaultClass: "sprinkles_background_connectButtonTextError_base__dmay20ae" }, connectionIndicator: { conditions: { base: "sprinkles_background_connectionIndicator_base__dmay20ah", hover: "sprinkles_background_connectionIndicator_hover__dmay20ai", active: "sprinkles_background_connectionIndicator_active__dmay20aj" }, defaultClass: "sprinkles_background_connectionIndicator_base__dmay20ah" }, connectionIndicatorBorder: { conditions: { base: "sprinkles_background_connectionIndicatorBorder_base__dmay20ak", hover: "sprinkles_background_connectionIndicatorBorder_hover__dmay20al", active: "sprinkles_background_connectionIndicatorBorder_active__dmay20am" }, defaultClass: "sprinkles_background_connectionIndicatorBorder_base__dmay20ak" }, downloadBottomCardBackground: { conditions: { base: "sprinkles_background_downloadBottomCardBackground_base__dmay20an", hover: "sprinkles_background_downloadBottomCardBackground_hover__dmay20ao", active: "sprinkles_background_downloadBottomCardBackground_active__dmay20ap" }, defaultClass: "sprinkles_background_downloadBottomCardBackground_base__dmay20an" }, downloadTopCardBackground: { conditions: { base: "sprinkles_background_downloadTopCardBackground_base__dmay20aq", hover: "sprinkles_background_downloadTopCardBackground_hover__dmay20ar", active: "sprinkles_background_downloadTopCardBackground_active__dmay20as" }, defaultClass: "sprinkles_background_downloadTopCardBackground_base__dmay20aq" }, error: { conditions: { base: "sprinkles_background_error_base__dmay20at", hover: "sprinkles_background_error_hover__dmay20au", active: "sprinkles_background_error_active__dmay20av" }, defaultClass: "sprinkles_background_error_base__dmay20at" }, generalBorder: { conditions: { base: "sprinkles_background_generalBorder_base__dmay20aw", hover: "sprinkles_background_generalBorder_hover__dmay20ax", active: "sprinkles_background_generalBorder_active__dmay20ay" }, defaultClass: "sprinkles_background_generalBorder_base__dmay20aw" }, generalBorderDim: { conditions: { base: "sprinkles_background_generalBorderDim_base__dmay20az", hover: "sprinkles_background_generalBorderDim_hover__dmay20b0", active: "sprinkles_background_generalBorderDim_active__dmay20b1" }, defaultClass: "sprinkles_background_generalBorderDim_base__dmay20az" }, menuItemBackground: { conditions: { base: "sprinkles_background_menuItemBackground_base__dmay20b2", hover: "sprinkles_background_menuItemBackground_hover__dmay20b3", active: "sprinkles_background_menuItemBackground_active__dmay20b4" }, defaultClass: "sprinkles_background_menuItemBackground_base__dmay20b2" }, modalBackdrop: { conditions: { base: "sprinkles_background_modalBackdrop_base__dmay20b5", hover: "sprinkles_background_modalBackdrop_hover__dmay20b6", active: "sprinkles_background_modalBackdrop_active__dmay20b7" }, defaultClass: "sprinkles_background_modalBackdrop_base__dmay20b5" }, modalBackground: { conditions: { base: "sprinkles_background_modalBackground_base__dmay20b8", hover: "sprinkles_background_modalBackground_hover__dmay20b9", active: "sprinkles_background_modalBackground_active__dmay20ba" }, defaultClass: "sprinkles_background_modalBackground_base__dmay20b8" }, modalBorder: { conditions: { base: "sprinkles_background_modalBorder_base__dmay20bb", hover: "sprinkles_background_modalBorder_hover__dmay20bc", active: "sprinkles_background_modalBorder_active__dmay20bd" }, defaultClass: "sprinkles_background_modalBorder_base__dmay20bb" }, modalText: { conditions: { base: "sprinkles_background_modalText_base__dmay20be", hover: "sprinkles_background_modalText_hover__dmay20bf", active: "sprinkles_background_modalText_active__dmay20bg" }, defaultClass: "sprinkles_background_modalText_base__dmay20be" }, modalTextDim: { conditions: { base: "sprinkles_background_modalTextDim_base__dmay20bh", hover: "sprinkles_background_modalTextDim_hover__dmay20bi", active: "sprinkles_background_modalTextDim_active__dmay20bj" }, defaultClass: "sprinkles_background_modalTextDim_base__dmay20bh" }, modalTextSecondary: { conditions: { base: "sprinkles_background_modalTextSecondary_base__dmay20bk", hover: "sprinkles_background_modalTextSecondary_hover__dmay20bl", active: "sprinkles_background_modalTextSecondary_active__dmay20bm" }, defaultClass: "sprinkles_background_modalTextSecondary_base__dmay20bk" }, profileAction: { conditions: { base: "sprinkles_background_profileAction_base__dmay20bn", hover: "sprinkles_background_profileAction_hover__dmay20bo", active: "sprinkles_background_profileAction_active__dmay20bp" }, defaultClass: "sprinkles_background_profileAction_base__dmay20bn" }, profileActionHover: { conditions: { base: "sprinkles_background_profileActionHover_base__dmay20bq", hover: "sprinkles_background_profileActionHover_hover__dmay20br", active: "sprinkles_background_profileActionHover_active__dmay20bs" }, defaultClass: "sprinkles_background_profileActionHover_base__dmay20bq" }, profileForeground: { conditions: { base: "sprinkles_background_profileForeground_base__dmay20bt", hover: "sprinkles_background_profileForeground_hover__dmay20bu", active: "sprinkles_background_profileForeground_active__dmay20bv" }, defaultClass: "sprinkles_background_profileForeground_base__dmay20bt" }, selectedOptionBorder: { conditions: { base: "sprinkles_background_selectedOptionBorder_base__dmay20bw", hover: "sprinkles_background_selectedOptionBorder_hover__dmay20bx", active: "sprinkles_background_selectedOptionBorder_active__dmay20by" }, defaultClass: "sprinkles_background_selectedOptionBorder_base__dmay20bw" }, standby: { conditions: { base: "sprinkles_background_standby_base__dmay20bz", hover: "sprinkles_background_standby_hover__dmay20c0", active: "sprinkles_background_standby_active__dmay20c1" }, defaultClass: "sprinkles_background_standby_base__dmay20bz" }, standbyBorder: { conditions: { base: "sprinkles_background_standbyBorder_base__dmay20c2", hover: "sprinkles_background_standbyBorder_hover__dmay20c3", active: "sprinkles_background_standbyBorder_active__dmay20c4" }, defaultClass: "sprinkles_background_standbyBorder_base__dmay20c2" } } }, borderColor: { values: { accentColor: { conditions: { base: "sprinkles_borderColor_accentColor_base__dmay20c5", hover: "sprinkles_borderColor_accentColor_hover__dmay20c6", active: "sprinkles_borderColor_accentColor_active__dmay20c7" }, defaultClass: "sprinkles_borderColor_accentColor_base__dmay20c5" }, accentColorForeground: { conditions: { base: "sprinkles_borderColor_accentColorForeground_base__dmay20c8", hover: "sprinkles_borderColor_accentColorForeground_hover__dmay20c9", active: "sprinkles_borderColor_accentColorForeground_active__dmay20ca" }, defaultClass: "sprinkles_borderColor_accentColorForeground_base__dmay20c8" }, actionButtonBorder: { conditions: { base: "sprinkles_borderColor_actionButtonBorder_base__dmay20cb", hover: "sprinkles_borderColor_actionButtonBorder_hover__dmay20cc", active: "sprinkles_borderColor_actionButtonBorder_active__dmay20cd" }, defaultClass: "sprinkles_borderColor_actionButtonBorder_base__dmay20cb" }, actionButtonBorderMobile: { conditions: { base: "sprinkles_borderColor_actionButtonBorderMobile_base__dmay20ce", hover: "sprinkles_borderColor_actionButtonBorderMobile_hover__dmay20cf", active: "sprinkles_borderColor_actionButtonBorderMobile_active__dmay20cg" }, defaultClass: "sprinkles_borderColor_actionButtonBorderMobile_base__dmay20ce" }, actionButtonSecondaryBackground: { conditions: { base: "sprinkles_borderColor_actionButtonSecondaryBackground_base__dmay20ch", hover: "sprinkles_borderColor_actionButtonSecondaryBackground_hover__dmay20ci", active: "sprinkles_borderColor_actionButtonSecondaryBackground_active__dmay20cj" }, defaultClass: "sprinkles_borderColor_actionButtonSecondaryBackground_base__dmay20ch" }, closeButton: { conditions: { base: "sprinkles_borderColor_closeButton_base__dmay20ck", hover: "sprinkles_borderColor_closeButton_hover__dmay20cl", active: "sprinkles_borderColor_closeButton_active__dmay20cm" }, defaultClass: "sprinkles_borderColor_closeButton_base__dmay20ck" }, closeButtonBackground: { conditions: { base: "sprinkles_borderColor_closeButtonBackground_base__dmay20cn", hover: "sprinkles_borderColor_closeButtonBackground_hover__dmay20co", active: "sprinkles_borderColor_closeButtonBackground_active__dmay20cp" }, defaultClass: "sprinkles_borderColor_closeButtonBackground_base__dmay20cn" }, connectButtonBackground: { conditions: { base: "sprinkles_borderColor_connectButtonBackground_base__dmay20cq", hover: "sprinkles_borderColor_connectButtonBackground_hover__dmay20cr", active: "sprinkles_borderColor_connectButtonBackground_active__dmay20cs" }, defaultClass: "sprinkles_borderColor_connectButtonBackground_base__dmay20cq" }, connectButtonBackgroundError: { conditions: { base: "sprinkles_borderColor_connectButtonBackgroundError_base__dmay20ct", hover: "sprinkles_borderColor_connectButtonBackgroundError_hover__dmay20cu", active: "sprinkles_borderColor_connectButtonBackgroundError_active__dmay20cv" }, defaultClass: "sprinkles_borderColor_connectButtonBackgroundError_base__dmay20ct" }, connectButtonInnerBackground: { conditions: { base: "sprinkles_borderColor_connectButtonInnerBackground_base__dmay20cw", hover: "sprinkles_borderColor_connectButtonInnerBackground_hover__dmay20cx", active: "sprinkles_borderColor_connectButtonInnerBackground_active__dmay20cy" }, defaultClass: "sprinkles_borderColor_connectButtonInnerBackground_base__dmay20cw" }, connectButtonText: { conditions: { base: "sprinkles_borderColor_connectButtonText_base__dmay20cz", hover: "sprinkles_borderColor_connectButtonText_hover__dmay20d0", active: "sprinkles_borderColor_connectButtonText_active__dmay20d1" }, defaultClass: "sprinkles_borderColor_connectButtonText_base__dmay20cz" }, connectButtonTextError: { conditions: { base: "sprinkles_borderColor_connectButtonTextError_base__dmay20d2", hover: "sprinkles_borderColor_connectButtonTextError_hover__dmay20d3", active: "sprinkles_borderColor_connectButtonTextError_active__dmay20d4" }, defaultClass: "sprinkles_borderColor_connectButtonTextError_base__dmay20d2" }, connectionIndicator: { conditions: { base: "sprinkles_borderColor_connectionIndicator_base__dmay20d5", hover: "sprinkles_borderColor_connectionIndicator_hover__dmay20d6", active: "sprinkles_borderColor_connectionIndicator_active__dmay20d7" }, defaultClass: "sprinkles_borderColor_connectionIndicator_base__dmay20d5" }, connectionIndicatorBorder: { conditions: { base: "sprinkles_borderColor_connectionIndicatorBorder_base__dmay20d8", hover: "sprinkles_borderColor_connectionIndicatorBorder_hover__dmay20d9", active: "sprinkles_borderColor_connectionIndicatorBorder_active__dmay20da" }, defaultClass: "sprinkles_borderColor_connectionIndicatorBorder_base__dmay20d8" }, downloadBottomCardBackground: { conditions: { base: "sprinkles_borderColor_downloadBottomCardBackground_base__dmay20db", hover: "sprinkles_borderColor_downloadBottomCardBackground_hover__dmay20dc", active: "sprinkles_borderColor_downloadBottomCardBackground_active__dmay20dd" }, defaultClass: "sprinkles_borderColor_downloadBottomCardBackground_base__dmay20db" }, downloadTopCardBackground: { conditions: { base: "sprinkles_borderColor_downloadTopCardBackground_base__dmay20de", hover: "sprinkles_borderColor_downloadTopCardBackground_hover__dmay20df", active: "sprinkles_borderColor_downloadTopCardBackground_active__dmay20dg" }, defaultClass: "sprinkles_borderColor_downloadTopCardBackground_base__dmay20de" }, error: { conditions: { base: "sprinkles_borderColor_error_base__dmay20dh", hover: "sprinkles_borderColor_error_hover__dmay20di", active: "sprinkles_borderColor_error_active__dmay20dj" }, defaultClass: "sprinkles_borderColor_error_base__dmay20dh" }, generalBorder: { conditions: { base: "sprinkles_borderColor_generalBorder_base__dmay20dk", hover: "sprinkles_borderColor_generalBorder_hover__dmay20dl", active: "sprinkles_borderColor_generalBorder_active__dmay20dm" }, defaultClass: "sprinkles_borderColor_generalBorder_base__dmay20dk" }, generalBorderDim: { conditions: { base: "sprinkles_borderColor_generalBorderDim_base__dmay20dn", hover: "sprinkles_borderColor_generalBorderDim_hover__dmay20do", active: "sprinkles_borderColor_generalBorderDim_active__dmay20dp" }, defaultClass: "sprinkles_borderColor_generalBorderDim_base__dmay20dn" }, menuItemBackground: { conditions: { base: "sprinkles_borderColor_menuItemBackground_base__dmay20dq", hover: "sprinkles_borderColor_menuItemBackground_hover__dmay20dr", active: "sprinkles_borderColor_menuItemBackground_active__dmay20ds" }, defaultClass: "sprinkles_borderColor_menuItemBackground_base__dmay20dq" }, modalBackdrop: { conditions: { base: "sprinkles_borderColor_modalBackdrop_base__dmay20dt", hover: "sprinkles_borderColor_modalBackdrop_hover__dmay20du", active: "sprinkles_borderColor_modalBackdrop_active__dmay20dv" }, defaultClass: "sprinkles_borderColor_modalBackdrop_base__dmay20dt" }, modalBackground: { conditions: { base: "sprinkles_borderColor_modalBackground_base__dmay20dw", hover: "sprinkles_borderColor_modalBackground_hover__dmay20dx", active: "sprinkles_borderColor_modalBackground_active__dmay20dy" }, defaultClass: "sprinkles_borderColor_modalBackground_base__dmay20dw" }, modalBorder: { conditions: { base: "sprinkles_borderColor_modalBorder_base__dmay20dz", hover: "sprinkles_borderColor_modalBorder_hover__dmay20e0", active: "sprinkles_borderColor_modalBorder_active__dmay20e1" }, defaultClass: "sprinkles_borderColor_modalBorder_base__dmay20dz" }, modalText: { conditions: { base: "sprinkles_borderColor_modalText_base__dmay20e2", hover: "sprinkles_borderColor_modalText_hover__dmay20e3", active: "sprinkles_borderColor_modalText_active__dmay20e4" }, defaultClass: "sprinkles_borderColor_modalText_base__dmay20e2" }, modalTextDim: { conditions: { base: "sprinkles_borderColor_modalTextDim_base__dmay20e5", hover: "sprinkles_borderColor_modalTextDim_hover__dmay20e6", active: "sprinkles_borderColor_modalTextDim_active__dmay20e7" }, defaultClass: "sprinkles_borderColor_modalTextDim_base__dmay20e5" }, modalTextSecondary: { conditions: { base: "sprinkles_borderColor_modalTextSecondary_base__dmay20e8", hover: "sprinkles_borderColor_modalTextSecondary_hover__dmay20e9", active: "sprinkles_borderColor_modalTextSecondary_active__dmay20ea" }, defaultClass: "sprinkles_borderColor_modalTextSecondary_base__dmay20e8" }, profileAction: { conditions: { base: "sprinkles_borderColor_profileAction_base__dmay20eb", hover: "sprinkles_borderColor_profileAction_hover__dmay20ec", active: "sprinkles_borderColor_profileAction_active__dmay20ed" }, defaultClass: "sprinkles_borderColor_profileAction_base__dmay20eb" }, profileActionHover: { conditions: { base: "sprinkles_borderColor_profileActionHover_base__dmay20ee", hover: "sprinkles_borderColor_profileActionHover_hover__dmay20ef", active: "sprinkles_borderColor_profileActionHover_active__dmay20eg" }, defaultClass: "sprinkles_borderColor_profileActionHover_base__dmay20ee" }, profileForeground: { conditions: { base: "sprinkles_borderColor_profileForeground_base__dmay20eh", hover: "sprinkles_borderColor_profileForeground_hover__dmay20ei", active: "sprinkles_borderColor_profileForeground_active__dmay20ej" }, defaultClass: "sprinkles_borderColor_profileForeground_base__dmay20eh" }, selectedOptionBorder: { conditions: { base: "sprinkles_borderColor_selectedOptionBorder_base__dmay20ek", hover: "sprinkles_borderColor_selectedOptionBorder_hover__dmay20el", active: "sprinkles_borderColor_selectedOptionBorder_active__dmay20em" }, defaultClass: "sprinkles_borderColor_selectedOptionBorder_base__dmay20ek" }, standby: { conditions: { base: "sprinkles_borderColor_standby_base__dmay20en", hover: "sprinkles_borderColor_standby_hover__dmay20eo", active: "sprinkles_borderColor_standby_active__dmay20ep" }, defaultClass: "sprinkles_borderColor_standby_base__dmay20en" }, standbyBorder: { conditions: { base: "sprinkles_borderColor_standbyBorder_base__dmay20eq", hover: "sprinkles_borderColor_standbyBorder_hover__dmay20er", active: "sprinkles_borderColor_standbyBorder_active__dmay20es" }, defaultClass: "sprinkles_borderColor_standbyBorder_base__dmay20eq" } } }, boxShadow: { values: { connectButton: { conditions: { base: "sprinkles_boxShadow_connectButton_base__dmay20et", hover: "sprinkles_boxShadow_connectButton_hover__dmay20eu", active: "sprinkles_boxShadow_connectButton_active__dmay20ev" }, defaultClass: "sprinkles_boxShadow_connectButton_base__dmay20et" }, dialog: { conditions: { base: "sprinkles_boxShadow_dialog_base__dmay20ew", hover: "sprinkles_boxShadow_dialog_hover__dmay20ex", active: "sprinkles_boxShadow_dialog_active__dmay20ey" }, defaultClass: "sprinkles_boxShadow_dialog_base__dmay20ew" }, profileDetailsAction: { conditions: { base: "sprinkles_boxShadow_profileDetailsAction_base__dmay20ez", hover: "sprinkles_boxShadow_profileDetailsAction_hover__dmay20f0", active: "sprinkles_boxShadow_profileDetailsAction_active__dmay20f1" }, defaultClass: "sprinkles_boxShadow_profileDetailsAction_base__dmay20ez" }, selectedOption: { conditions: { base: "sprinkles_boxShadow_selectedOption_base__dmay20f2", hover: "sprinkles_boxShadow_selectedOption_hover__dmay20f3", active: "sprinkles_boxShadow_selectedOption_active__dmay20f4" }, defaultClass: "sprinkles_boxShadow_selectedOption_base__dmay20f2" }, selectedWallet: { conditions: { base: "sprinkles_boxShadow_selectedWallet_base__dmay20f5", hover: "sprinkles_boxShadow_selectedWallet_hover__dmay20f6", active: "sprinkles_boxShadow_selectedWallet_active__dmay20f7" }, defaultClass: "sprinkles_boxShadow_selectedWallet_base__dmay20f5" }, walletLogo: { conditions: { base: "sprinkles_boxShadow_walletLogo_base__dmay20f8", hover: "sprinkles_boxShadow_walletLogo_hover__dmay20f9", active: "sprinkles_boxShadow_walletLogo_active__dmay20fa" }, defaultClass: "sprinkles_boxShadow_walletLogo_base__dmay20f8" } } }, color: { values: { accentColor: { conditions: { base: "sprinkles_color_accentColor_base__dmay20fb", hover: "sprinkles_color_accentColor_hover__dmay20fc", active: "sprinkles_color_accentColor_active__dmay20fd" }, defaultClass: "sprinkles_color_accentColor_base__dmay20fb" }, accentColorForeground: { conditions: { base: "sprinkles_color_accentColorForeground_base__dmay20fe", hover: "sprinkles_color_accentColorForeground_hover__dmay20ff", active: "sprinkles_color_accentColorForeground_active__dmay20fg" }, defaultClass: "sprinkles_color_accentColorForeground_base__dmay20fe" }, actionButtonBorder: { conditions: { base: "sprinkles_color_actionButtonBorder_base__dmay20fh", hover: "sprinkles_color_actionButtonBorder_hover__dmay20fi", active: "sprinkles_color_actionButtonBorder_active__dmay20fj" }, defaultClass: "sprinkles_color_actionButtonBorder_base__dmay20fh" }, actionButtonBorderMobile: { conditions: { base: "sprinkles_color_actionButtonBorderMobile_base__dmay20fk", hover: "sprinkles_color_actionButtonBorderMobile_hover__dmay20fl", active: "sprinkles_color_actionButtonBorderMobile_active__dmay20fm" }, defaultClass: "sprinkles_color_actionButtonBorderMobile_base__dmay20fk" }, actionButtonSecondaryBackground: { conditions: { base: "sprinkles_color_actionButtonSecondaryBackground_base__dmay20fn", hover: "sprinkles_color_actionButtonSecondaryBackground_hover__dmay20fo", active: "sprinkles_color_actionButtonSecondaryBackground_active__dmay20fp" }, defaultClass: "sprinkles_color_actionButtonSecondaryBackground_base__dmay20fn" }, closeButton: { conditions: { base: "sprinkles_color_closeButton_base__dmay20fq", hover: "sprinkles_color_closeButton_hover__dmay20fr", active: "sprinkles_color_closeButton_active__dmay20fs" }, defaultClass: "sprinkles_color_closeButton_base__dmay20fq" }, closeButtonBackground: { conditions: { base: "sprinkles_color_closeButtonBackground_base__dmay20ft", hover: "sprinkles_color_closeButtonBackground_hover__dmay20fu", active: "sprinkles_color_closeButtonBackground_active__dmay20fv" }, defaultClass: "sprinkles_color_closeButtonBackground_base__dmay20ft" }, connectButtonBackground: { conditions: { base: "sprinkles_color_connectButtonBackground_base__dmay20fw", hover: "sprinkles_color_connectButtonBackground_hover__dmay20fx", active: "sprinkles_color_connectButtonBackground_active__dmay20fy" }, defaultClass: "sprinkles_color_connectButtonBackground_base__dmay20fw" }, connectButtonBackgroundError: { conditions: { base: "sprinkles_color_connectButtonBackgroundError_base__dmay20fz", hover: "sprinkles_color_connectButtonBackgroundError_hover__dmay20g0", active: "sprinkles_color_connectButtonBackgroundError_active__dmay20g1" }, defaultClass: "sprinkles_color_connectButtonBackgroundError_base__dmay20fz" }, connectButtonInnerBackground: { conditions: { base: "sprinkles_color_connectButtonInnerBackground_base__dmay20g2", hover: "sprinkles_color_connectButtonInnerBackground_hover__dmay20g3", active: "sprinkles_color_connectButtonInnerBackground_active__dmay20g4" }, defaultClass: "sprinkles_color_connectButtonInnerBackground_base__dmay20g2" }, connectButtonText: { conditions: { base: "sprinkles_color_connectButtonText_base__dmay20g5", hover: "sprinkles_color_connectButtonText_hover__dmay20g6", active: "sprinkles_color_connectButtonText_active__dmay20g7" }, defaultClass: "sprinkles_color_connectButtonText_base__dmay20g5" }, connectButtonTextError: { conditions: { base: "sprinkles_color_connectButtonTextError_base__dmay20g8", hover: "sprinkles_color_connectButtonTextError_hover__dmay20g9", active: "sprinkles_color_connectButtonTextError_active__dmay20ga" }, defaultClass: "sprinkles_color_connectButtonTextError_base__dmay20g8" }, connectionIndicator: { conditions: { base: "sprinkles_color_connectionIndicator_base__dmay20gb", hover: "sprinkles_color_connectionIndicator_hover__dmay20gc", active: "sprinkles_color_connectionIndicator_active__dmay20gd" }, defaultClass: "sprinkles_color_connectionIndicator_base__dmay20gb" }, connectionIndicatorBorder: { conditions: { base: "sprinkles_color_connectionIndicatorBorder_base__dmay20ge", hover: "sprinkles_color_connectionIndicatorBorder_hover__dmay20gf", active: "sprinkles_color_connectionIndicatorBorder_active__dmay20gg" }, defaultClass: "sprinkles_color_connectionIndicatorBorder_base__dmay20ge" }, downloadBottomCardBackground: { conditions: { base: "sprinkles_color_downloadBottomCardBackground_base__dmay20gh", hover: "sprinkles_color_downloadBottomCardBackground_hover__dmay20gi", active: "sprinkles_color_downloadBottomCardBackground_active__dmay20gj" }, defaultClass: "sprinkles_color_downloadBottomCardBackground_base__dmay20gh" }, downloadTopCardBackground: { conditions: { base: "sprinkles_color_downloadTopCardBackground_base__dmay20gk", hover: "sprinkles_color_downloadTopCardBackground_hover__dmay20gl", active: "sprinkles_color_downloadTopCardBackground_active__dmay20gm" }, defaultClass: "sprinkles_color_downloadTopCardBackground_base__dmay20gk" }, error: { conditions: { base: "sprinkles_color_error_base__dmay20gn", hover: "sprinkles_color_error_hover__dmay20go", active: "sprinkles_color_error_active__dmay20gp" }, defaultClass: "sprinkles_color_error_base__dmay20gn" }, generalBorder: { conditions: { base: "sprinkles_color_generalBorder_base__dmay20gq", hover: "sprinkles_color_generalBorder_hover__dmay20gr", active: "sprinkles_color_generalBorder_active__dmay20gs" }, defaultClass: "sprinkles_color_generalBorder_base__dmay20gq" }, generalBorderDim: { conditions: { base: "sprinkles_color_generalBorderDim_base__dmay20gt", hover: "sprinkles_color_generalBorderDim_hover__dmay20gu", active: "sprinkles_color_generalBorderDim_active__dmay20gv" }, defaultClass: "sprinkles_color_generalBorderDim_base__dmay20gt" }, menuItemBackground: { conditions: { base: "sprinkles_color_menuItemBackground_base__dmay20gw", hover: "sprinkles_color_menuItemBackground_hover__dmay20gx", active: "sprinkles_color_menuItemBackground_active__dmay20gy" }, defaultClass: "sprinkles_color_menuItemBackground_base__dmay20gw" }, modalBackdrop: { conditions: { base: "sprinkles_color_modalBackdrop_base__dmay20gz", hover: "sprinkles_color_modalBackdrop_hover__dmay20h0", active: "sprinkles_color_modalBackdrop_active__dmay20h1" }, defaultClass: "sprinkles_color_modalBackdrop_base__dmay20gz" }, modalBackground: { conditions: { base: "sprinkles_color_modalBackground_base__dmay20h2", hover: "sprinkles_color_modalBackground_hover__dmay20h3", active: "sprinkles_color_modalBackground_active__dmay20h4" }, defaultClass: "sprinkles_color_modalBackground_base__dmay20h2" }, modalBorder: { conditions: { base: "sprinkles_color_modalBorder_base__dmay20h5", hover: "sprinkles_color_modalBorder_hover__dmay20h6", active: "sprinkles_color_modalBorder_active__dmay20h7" }, defaultClass: "sprinkles_color_modalBorder_base__dmay20h5" }, modalText: { conditions: { base: "sprinkles_color_modalText_base__dmay20h8", hover: "sprinkles_color_modalText_hover__dmay20h9", active: "sprinkles_color_modalText_active__dmay20ha" }, defaultClass: "sprinkles_color_modalText_base__dmay20h8" }, modalTextDim: { conditions: { base: "sprinkles_color_modalTextDim_base__dmay20hb", hover: "sprinkles_color_modalTextDim_hover__dmay20hc", active: "sprinkles_color_modalTextDim_active__dmay20hd" }, defaultClass: "sprinkles_color_modalTextDim_base__dmay20hb" }, modalTextSecondary: { conditions: { base: "sprinkles_color_modalTextSecondary_base__dmay20he", hover: "sprinkles_color_modalTextSecondary_hover__dmay20hf", active: "sprinkles_color_modalTextSecondary_active__dmay20hg" }, defaultClass: "sprinkles_color_modalTextSecondary_base__dmay20he" }, profileAction: { conditions: { base: "sprinkles_color_profileAction_base__dmay20hh", hover: "sprinkles_color_profileAction_hover__dmay20hi", active: "sprinkles_color_profileAction_active__dmay20hj" }, defaultClass: "sprinkles_color_profileAction_base__dmay20hh" }, profileActionHover: { conditions: { base: "sprinkles_color_profileActionHover_base__dmay20hk", hover: "sprinkles_color_profileActionHover_hover__dmay20hl", active: "sprinkles_color_profileActionHover_active__dmay20hm" }, defaultClass: "sprinkles_color_profileActionHover_base__dmay20hk" }, profileForeground: { conditions: { base: "sprinkles_color_profileForeground_base__dmay20hn", hover: "sprinkles_color_profileForeground_hover__dmay20ho", active: "sprinkles_color_profileForeground_active__dmay20hp" }, defaultClass: "sprinkles_color_profileForeground_base__dmay20hn" }, selectedOptionBorder: { conditions: { base: "sprinkles_color_selectedOptionBorder_base__dmay20hq", hover: "sprinkles_color_selectedOptionBorder_hover__dmay20hr", active: "sprinkles_color_selectedOptionBorder_active__dmay20hs" }, defaultClass: "sprinkles_color_selectedOptionBorder_base__dmay20hq" }, standby: { conditions: { base: "sprinkles_color_standby_base__dmay20ht", hover: "sprinkles_color_standby_hover__dmay20hu", active: "sprinkles_color_standby_active__dmay20hv" }, defaultClass: "sprinkles_color_standby_base__dmay20ht" }, standbyBorder: { conditions: { base: "sprinkles_color_standbyBorder_base__dmay20hw", hover: "sprinkles_color_standbyBorder_hover__dmay20hx", active: "sprinkles_color_standbyBorder_active__dmay20hy" }, defaultClass: "sprinkles_color_standbyBorder_base__dmay20hw" } } } } }, { conditions: { defaultCondition: "smallScreen", conditionNames: ["smallScreen", "largeScreen"], responsiveArray: void 0 }, styles: { alignItems: { values: { "flex-start": { conditions: { smallScreen: "sprinkles_alignItems_flex-start_smallScreen__dmay200", largeScreen: "sprinkles_alignItems_flex-start_largeScreen__dmay201" }, defaultClass: "sprinkles_alignItems_flex-start_smallScreen__dmay200" }, "flex-end": { conditions: { smallScreen: "sprinkles_alignItems_flex-end_smallScreen__dmay202", largeScreen: "sprinkles_alignItems_flex-end_largeScreen__dmay203" }, defaultClass: "sprinkles_alignItems_flex-end_smallScreen__dmay202" }, center: { conditions: { smallScreen: "sprinkles_alignItems_center_smallScreen__dmay204", largeScreen: "sprinkles_alignItems_center_largeScreen__dmay205" }, defaultClass: "sprinkles_alignItems_center_smallScreen__dmay204" } } }, display: { values: { none: { conditions: { smallScreen: "sprinkles_display_none_smallScreen__dmay206", largeScreen: "sprinkles_display_none_largeScreen__dmay207" }, defaultClass: "sprinkles_display_none_smallScreen__dmay206" }, block: { conditions: { smallScreen: "sprinkles_display_block_smallScreen__dmay208", largeScreen: "sprinkles_display_block_largeScreen__dmay209" }, defaultClass: "sprinkles_display_block_smallScreen__dmay208" }, flex: { conditions: { smallScreen: "sprinkles_display_flex_smallScreen__dmay20a", largeScreen: "sprinkles_display_flex_largeScreen__dmay20b" }, defaultClass: "sprinkles_display_flex_smallScreen__dmay20a" }, inline: { conditions: { smallScreen: "sprinkles_display_inline_smallScreen__dmay20c", largeScreen: "sprinkles_display_inline_largeScreen__dmay20d" }, defaultClass: "sprinkles_display_inline_smallScreen__dmay20c" } } } } }, { conditions: void 0, styles: { margin: { mappings: ["marginTop", "marginBottom", "marginLeft", "marginRight"] }, marginX: { mappings: ["marginLeft", "marginRight"] }, marginY: { mappings: ["marginTop", "marginBottom"] }, padding: { mappings: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"] }, paddingX: { mappings: ["paddingLeft", "paddingRight"] }, paddingY: { mappings: ["paddingTop", "paddingBottom"] }, alignSelf: { values: { "flex-start": { defaultClass: "sprinkles_alignSelf_flex-start__dmay20e" }, "flex-end": { defaultClass: "sprinkles_alignSelf_flex-end__dmay20f" }, center: { defaultClass: "sprinkles_alignSelf_center__dmay20g" } } }, backgroundSize: { values: { cover: { defaultClass: "sprinkles_backgroundSize_cover__dmay20h" } } }, borderRadius: { values: { "1": { defaultClass: "sprinkles_borderRadius_1__dmay20i" }, "6": { defaultClass: "sprinkles_borderRadius_6__dmay20j" }, "10": { defaultClass: "sprinkles_borderRadius_10__dmay20k" }, "13": { defaultClass: "sprinkles_borderRadius_13__dmay20l" }, actionButton: { defaultClass: "sprinkles_borderRadius_actionButton__dmay20m" }, connectButton: { defaultClass: "sprinkles_borderRadius_connectButton__dmay20n" }, menuButton: { defaultClass: "sprinkles_borderRadius_menuButton__dmay20o" }, modal: { defaultClass: "sprinkles_borderRadius_modal__dmay20p" }, modalMobile: { defaultClass: "sprinkles_borderRadius_modalMobile__dmay20q" }, "25%": { defaultClass: "sprinkles_borderRadius_25%__dmay20r" }, full: { defaultClass: "sprinkles_borderRadius_full__dmay20s" } } }, borderStyle: { values: { solid: { defaultClass: "sprinkles_borderStyle_solid__dmay20t" } } }, borderWidth: { values: { "0": { defaultClass: "sprinkles_borderWidth_0__dmay20u" }, "1": { defaultClass: "sprinkles_borderWidth_1__dmay20v" }, "2": { defaultClass: "sprinkles_borderWidth_2__dmay20w" }, "3": { defaultClass: "sprinkles_borderWidth_3__dmay20x" }, "4": { defaultClass: "sprinkles_borderWidth_4__dmay20y" } } }, cursor: { values: { pointer: { defaultClass: "sprinkles_cursor_pointer__dmay20z" } } }, flexDirection: { values: { row: { defaultClass: "sprinkles_flexDirection_row__dmay2010" }, column: { defaultClass: "sprinkles_flexDirection_column__dmay2011" } } }, fontFamily: { values: { body: { defaultClass: "sprinkles_fontFamily_body__dmay2012" } } }, fontSize: { values: { "12": { defaultClass: "sprinkles_fontSize_12__dmay2013" }, "13": { defaultClass: "sprinkles_fontSize_13__dmay2014" }, "14": { defaultClass: "sprinkles_fontSize_14__dmay2015" }, "16": { defaultClass: "sprinkles_fontSize_16__dmay2016" }, "18": { defaultClass: "sprinkles_fontSize_18__dmay2017" }, "20": { defaultClass: "sprinkles_fontSize_20__dmay2018" }, "23": { defaultClass: "sprinkles_fontSize_23__dmay2019" } } }, fontWeight: { values: { regular: { defaultClass: "sprinkles_fontWeight_regular__dmay201a" }, medium: { defaultClass: "sprinkles_fontWeight_medium__dmay201b" }, semibold: { defaultClass: "sprinkles_fontWeight_semibold__dmay201c" }, bold: { defaultClass: "sprinkles_fontWeight_bold__dmay201d" }, heavy: { defaultClass: "sprinkles_fontWeight_heavy__dmay201e" } } }, gap: { values: { "0": { defaultClass: "sprinkles_gap_0__dmay201f" }, "1": { defaultClass: "sprinkles_gap_1__dmay201g" }, "2": { defaultClass: "sprinkles_gap_2__dmay201h" }, "3": { defaultClass: "sprinkles_gap_3__dmay201i" }, "4": { defaultClass: "sprinkles_gap_4__dmay201j" }, "5": { defaultClass: "sprinkles_gap_5__dmay201k" }, "6": { defaultClass: "sprinkles_gap_6__dmay201l" }, "8": { defaultClass: "sprinkles_gap_8__dmay201m" }, "10": { defaultClass: "sprinkles_gap_10__dmay201n" }, "12": { defaultClass: "sprinkles_gap_12__dmay201o" }, "14": { defaultClass: "sprinkles_gap_14__dmay201p" }, "16": { defaultClass: "sprinkles_gap_16__dmay201q" }, "18": { defaultClass: "sprinkles_gap_18__dmay201r" }, "20": { defaultClass: "sprinkles_gap_20__dmay201s" }, "24": { defaultClass: "sprinkles_gap_24__dmay201t" }, "28": { defaultClass: "sprinkles_gap_28__dmay201u" }, "32": { defaultClass: "sprinkles_gap_32__dmay201v" }, "36": { defaultClass: "sprinkles_gap_36__dmay201w" }, "44": { defaultClass: "sprinkles_gap_44__dmay201x" }, "64": { defaultClass: "sprinkles_gap_64__dmay201y" }, "-1": { defaultClass: "sprinkles_gap_-1__dmay201z" } } }, height: { values: { "1": { defaultClass: "sprinkles_height_1__dmay2020" }, "2": { defaultClass: "sprinkles_height_2__dmay2021" }, "4": { defaultClass: "sprinkles_height_4__dmay2022" }, "8": { defaultClass: "sprinkles_height_8__dmay2023" }, "9": { defaultClass: "sprinkles_height_9__dmay2024" }, "12": { defaultClass: "sprinkles_height_12__dmay2025" }, "20": { defaultClass: "sprinkles_height_20__dmay2026" }, "24": { defaultClass: "sprinkles_height_24__dmay2027" }, "28": { defaultClass: "sprinkles_height_28__dmay2028" }, "30": { defaultClass: "sprinkles_height_30__dmay2029" }, "32": { defaultClass: "sprinkles_height_32__dmay202a" }, "34": { defaultClass: "sprinkles_height_34__dmay202b" }, "36": { defaultClass: "sprinkles_height_36__dmay202c" }, "40": { defaultClass: "sprinkles_height_40__dmay202d" }, "44": { defaultClass: "sprinkles_height_44__dmay202e" }, "48": { defaultClass: "sprinkles_height_48__dmay202f" }, "54": { defaultClass: "sprinkles_height_54__dmay202g" }, "60": { defaultClass: "sprinkles_height_60__dmay202h" }, "200": { defaultClass: "sprinkles_height_200__dmay202i" }, full: { defaultClass: "sprinkles_height_full__dmay202j" }, max: { defaultClass: "sprinkles_height_max__dmay202k" } } }, justifyContent: { values: { "flex-start": { defaultClass: "sprinkles_justifyContent_flex-start__dmay202l" }, "flex-end": { defaultClass: "sprinkles_justifyContent_flex-end__dmay202m" }, center: { defaultClass: "sprinkles_justifyContent_center__dmay202n" }, "space-between": { defaultClass: "sprinkles_justifyContent_space-between__dmay202o" }, "space-around": { defaultClass: "sprinkles_justifyContent_space-around__dmay202p" } } }, textAlign: { values: { left: { defaultClass: "sprinkles_textAlign_left__dmay202q" }, center: { defaultClass: "sprinkles_textAlign_center__dmay202r" }, inherit: { defaultClass: "sprinkles_textAlign_inherit__dmay202s" } } }, marginBottom: { values: { "0": { defaultClass: "sprinkles_marginBottom_0__dmay202t" }, "1": { defaultClass: "sprinkles_marginBottom_1__dmay202u" }, "2": { defaultClass: "sprinkles_marginBottom_2__dmay202v" }, "3": { defaultClass: "sprinkles_marginBottom_3__dmay202w" }, "4": { defaultClass: "sprinkles_marginBottom_4__dmay202x" }, "5": { defaultClass: "sprinkles_marginBottom_5__dmay202y" }, "6": { defaultClass: "sprinkles_marginBottom_6__dmay202z" }, "8": { defaultClass: "sprinkles_marginBottom_8__dmay2030" }, "10": { defaultClass: "sprinkles_marginBottom_10__dmay2031" }, "12": { defaultClass: "sprinkles_marginBottom_12__dmay2032" }, "14": { defaultClass: "sprinkles_marginBottom_14__dmay2033" }, "16": { defaultClass: "sprinkles_marginBottom_16__dmay2034" }, "18": { defaultClass: "sprinkles_marginBottom_18__dmay2035" }, "20": { defaultClass: "sprinkles_marginBottom_20__dmay2036" }, "24": { defaultClass: "sprinkles_marginBottom_24__dmay2037" }, "28": { defaultClass: "sprinkles_marginBottom_28__dmay2038" }, "32": { defaultClass: "sprinkles_marginBottom_32__dmay2039" }, "36": { defaultClass: "sprinkles_marginBottom_36__dmay203a" }, "44": { defaultClass: "sprinkles_marginBottom_44__dmay203b" }, "64": { defaultClass: "sprinkles_marginBottom_64__dmay203c" }, "-1": { defaultClass: "sprinkles_marginBottom_-1__dmay203d" } } }, marginLeft: { values: { "0": { defaultClass: "sprinkles_marginLeft_0__dmay203e" }, "1": { defaultClass: "sprinkles_marginLeft_1__dmay203f" }, "2": { defaultClass: "sprinkles_marginLeft_2__dmay203g" }, "3": { defaultClass: "sprinkles_marginLeft_3__dmay203h" }, "4": { defaultClass: "sprinkles_marginLeft_4__dmay203i" }, "5": { defaultClass: "sprinkles_marginLeft_5__dmay203j" }, "6": { defaultClass: "sprinkles_marginLeft_6__dmay203k" }, "8": { defaultClass: "sprinkles_marginLeft_8__dmay203l" }, "10": { defaultClass: "sprinkles_marginLeft_10__dmay203m" }, "12": { defaultClass: "sprinkles_marginLeft_12__dmay203n" }, "14": { defaultClass: "sprinkles_marginLeft_14__dmay203o" }, "16": { defaultClass: "sprinkles_marginLeft_16__dmay203p" }, "18": { defaultClass: "sprinkles_marginLeft_18__dmay203q" }, "20": { defaultClass: "sprinkles_marginLeft_20__dmay203r" }, "24": { defaultClass: "sprinkles_marginLeft_24__dmay203s" }, "28": { defaultClass: "sprinkles_marginLeft_28__dmay203t" }, "32": { defaultClass: "sprinkles_marginLeft_32__dmay203u" }, "36": { defaultClass: "sprinkles_marginLeft_36__dmay203v" }, "44": { defaultClass: "sprinkles_marginLeft_44__dmay203w" }, "64": { defaultClass: "sprinkles_marginLeft_64__dmay203x" }, "-1": { defaultClass: "sprinkles_marginLeft_-1__dmay203y" } } }, marginRight: { values: { "0": { defaultClass: "sprinkles_marginRight_0__dmay203z" }, "1": { defaultClass: "sprinkles_marginRight_1__dmay2040" }, "2": { defaultClass: "sprinkles_marginRight_2__dmay2041" }, "3": { defaultClass: "sprinkles_marginRight_3__dmay2042" }, "4": { defaultClass: "sprinkles_marginRight_4__dmay2043" }, "5": { defaultClass: "sprinkles_marginRight_5__dmay2044" }, "6": { defaultClass: "sprinkles_marginRight_6__dmay2045" }, "8": { defaultClass: "sprinkles_marginRight_8__dmay2046" }, "10": { defaultClass: "sprinkles_marginRight_10__dmay2047" }, "12": { defaultClass: "sprinkles_marginRight_12__dmay2048" }, "14": { defaultClass: "sprinkles_marginRight_14__dmay2049" }, "16": { defaultClass: "sprinkles_marginRight_16__dmay204a" }, "18": { defaultClass: "sprinkles_marginRight_18__dmay204b" }, "20": { defaultClass: "sprinkles_marginRight_20__dmay204c" }, "24": { defaultClass: "sprinkles_marginRight_24__dmay204d" }, "28": { defaultClass: "sprinkles_marginRight_28__dmay204e" }, "32": { defaultClass: "sprinkles_marginRight_32__dmay204f" }, "36": { defaultClass: "sprinkles_marginRight_36__dmay204g" }, "44": { defaultClass: "sprinkles_marginRight_44__dmay204h" }, "64": { defaultClass: "sprinkles_marginRight_64__dmay204i" }, "-1": { defaultClass: "sprinkles_marginRight_-1__dmay204j" } } }, marginTop: { values: { "0": { defaultClass: "sprinkles_marginTop_0__dmay204k" }, "1": { defaultClass: "sprinkles_marginTop_1__dmay204l" }, "2": { defaultClass: "sprinkles_marginTop_2__dmay204m" }, "3": { defaultClass: "sprinkles_marginTop_3__dmay204n" }, "4": { defaultClass: "sprinkles_marginTop_4__dmay204o" }, "5": { defaultClass: "sprinkles_marginTop_5__dmay204p" }, "6": { defaultClass: "sprinkles_marginTop_6__dmay204q" }, "8": { defaultClass: "sprinkles_marginTop_8__dmay204r" }, "10": { defaultClass: "sprinkles_marginTop_10__dmay204s" }, "12": { defaultClass: "sprinkles_marginTop_12__dmay204t" }, "14": { defaultClass: "sprinkles_marginTop_14__dmay204u" }, "16": { defaultClass: "sprinkles_marginTop_16__dmay204v" }, "18": { defaultClass: "sprinkles_marginTop_18__dmay204w" }, "20": { defaultClass: "sprinkles_marginTop_20__dmay204x" }, "24": { defaultClass: "sprinkles_marginTop_24__dmay204y" }, "28": { defaultClass: "sprinkles_marginTop_28__dmay204z" }, "32": { defaultClass: "sprinkles_marginTop_32__dmay2050" }, "36": { defaultClass: "sprinkles_marginTop_36__dmay2051" }, "44": { defaultClass: "sprinkles_marginTop_44__dmay2052" }, "64": { defaultClass: "sprinkles_marginTop_64__dmay2053" }, "-1": { defaultClass: "sprinkles_marginTop_-1__dmay2054" } } }, maxWidth: { values: { "1": { defaultClass: "sprinkles_maxWidth_1__dmay2055" }, "2": { defaultClass: "sprinkles_maxWidth_2__dmay2056" }, "4": { defaultClass: "sprinkles_maxWidth_4__dmay2057" }, "8": { defaultClass: "sprinkles_maxWidth_8__dmay2058" }, "9": { defaultClass: "sprinkles_maxWidth_9__dmay2059" }, "12": { defaultClass: "sprinkles_maxWidth_12__dmay205a" }, "20": { defaultClass: "sprinkles_maxWidth_20__dmay205b" }, "24": { defaultClass: "sprinkles_maxWidth_24__dmay205c" }, "28": { defaultClass: "sprinkles_maxWidth_28__dmay205d" }, "30": { defaultClass: "sprinkles_maxWidth_30__dmay205e" }, "32": { defaultClass: "sprinkles_maxWidth_32__dmay205f" }, "34": { defaultClass: "sprinkles_maxWidth_34__dmay205g" }, "36": { defaultClass: "sprinkles_maxWidth_36__dmay205h" }, "40": { defaultClass: "sprinkles_maxWidth_40__dmay205i" }, "44": { defaultClass: "sprinkles_maxWidth_44__dmay205j" }, "48": { defaultClass: "sprinkles_maxWidth_48__dmay205k" }, "54": { defaultClass: "sprinkles_maxWidth_54__dmay205l" }, "60": { defaultClass: "sprinkles_maxWidth_60__dmay205m" }, "200": { defaultClass: "sprinkles_maxWidth_200__dmay205n" }, full: { defaultClass: "sprinkles_maxWidth_full__dmay205o" }, max: { defaultClass: "sprinkles_maxWidth_max__dmay205p" } } }, minWidth: { values: { "1": { defaultClass: "sprinkles_minWidth_1__dmay205q" }, "2": { defaultClass: "sprinkles_minWidth_2__dmay205r" }, "4": { defaultClass: "sprinkles_minWidth_4__dmay205s" }, "8": { defaultClass: "sprinkles_minWidth_8__dmay205t" }, "9": { defaultClass: "sprinkles_minWidth_9__dmay205u" }, "12": { defaultClass: "sprinkles_minWidth_12__dmay205v" }, "20": { defaultClass: "sprinkles_minWidth_20__dmay205w" }, "24": { defaultClass: "sprinkles_minWidth_24__dmay205x" }, "28": { defaultClass: "sprinkles_minWidth_28__dmay205y" }, "30": { defaultClass: "sprinkles_minWidth_30__dmay205z" }, "32": { defaultClass: "sprinkles_minWidth_32__dmay2060" }, "34": { defaultClass: "sprinkles_minWidth_34__dmay2061" }, "36": { defaultClass: "sprinkles_minWidth_36__dmay2062" }, "40": { defaultClass: "sprinkles_minWidth_40__dmay2063" }, "44": { defaultClass: "sprinkles_minWidth_44__dmay2064" }, "48": { defaultClass: "sprinkles_minWidth_48__dmay2065" }, "54": { defaultClass: "sprinkles_minWidth_54__dmay2066" }, "60": { defaultClass: "sprinkles_minWidth_60__dmay2067" }, "200": { defaultClass: "sprinkles_minWidth_200__dmay2068" }, full: { defaultClass: "sprinkles_minWidth_full__dmay2069" }, max: { defaultClass: "sprinkles_minWidth_max__dmay206a" } } }, overflow: { values: { hidden: { defaultClass: "sprinkles_overflow_hidden__dmay206b" } } }, paddingBottom: { values: { "0": { defaultClass: "sprinkles_paddingBottom_0__dmay206c" }, "1": { defaultClass: "sprinkles_paddingBottom_1__dmay206d" }, "2": { defaultClass: "sprinkles_paddingBottom_2__dmay206e" }, "3": { defaultClass: "sprinkles_paddingBottom_3__dmay206f" }, "4": { defaultClass: "sprinkles_paddingBottom_4__dmay206g" }, "5": { defaultClass: "sprinkles_paddingBottom_5__dmay206h" }, "6": { defaultClass: "sprinkles_paddingBottom_6__dmay206i" }, "8": { defaultClass: "sprinkles_paddingBottom_8__dmay206j" }, "10": { defaultClass: "sprinkles_paddingBottom_10__dmay206k" }, "12": { defaultClass: "sprinkles_paddingBottom_12__dmay206l" }, "14": { defaultClass: "sprinkles_paddingBottom_14__dmay206m" }, "16": { defaultClass: "sprinkles_paddingBottom_16__dmay206n" }, "18": { defaultClass: "sprinkles_paddingBottom_18__dmay206o" }, "20": { defaultClass: "sprinkles_paddingBottom_20__dmay206p" }, "24": { defaultClass: "sprinkles_paddingBottom_24__dmay206q" }, "28": { defaultClass: "sprinkles_paddingBottom_28__dmay206r" }, "32": { defaultClass: "sprinkles_paddingBottom_32__dmay206s" }, "36": { defaultClass: "sprinkles_paddingBottom_36__dmay206t" }, "44": { defaultClass: "sprinkles_paddingBottom_44__dmay206u" }, "64": { defaultClass: "sprinkles_paddingBottom_64__dmay206v" }, "-1": { defaultClass: "sprinkles_paddingBottom_-1__dmay206w" } } }, paddingLeft: { values: { "0": { defaultClass: "sprinkles_paddingLeft_0__dmay206x" }, "1": { defaultClass: "sprinkles_paddingLeft_1__dmay206y" }, "2": { defaultClass: "sprinkles_paddingLeft_2__dmay206z" }, "3": { defaultClass: "sprinkles_paddingLeft_3__dmay2070" }, "4": { defaultClass: "sprinkles_paddingLeft_4__dmay2071" }, "5": { defaultClass: "sprinkles_paddingLeft_5__dmay2072" }, "6": { defaultClass: "sprinkles_paddingLeft_6__dmay2073" }, "8": { defaultClass: "sprinkles_paddingLeft_8__dmay2074" }, "10": { defaultClass: "sprinkles_paddingLeft_10__dmay2075" }, "12": { defaultClass: "sprinkles_paddingLeft_12__dmay2076" }, "14": { defaultClass: "sprinkles_paddingLeft_14__dmay2077" }, "16": { defaultClass: "sprinkles_paddingLeft_16__dmay2078" }, "18": { defaultClass: "sprinkles_paddingLeft_18__dmay2079" }, "20": { defaultClass: "sprinkles_paddingLeft_20__dmay207a" }, "24": { defaultClass: "sprinkles_paddingLeft_24__dmay207b" }, "28": { defaultClass: "sprinkles_paddingLeft_28__dmay207c" }, "32": { defaultClass: "sprinkles_paddingLeft_32__dmay207d" }, "36": { defaultClass: "sprinkles_paddingLeft_36__dmay207e" }, "44": { defaultClass: "sprinkles_paddingLeft_44__dmay207f" }, "64": { defaultClass: "sprinkles_paddingLeft_64__dmay207g" }, "-1": { defaultClass: "sprinkles_paddingLeft_-1__dmay207h" } } }, paddingRight: { values: { "0": { defaultClass: "sprinkles_paddingRight_0__dmay207i" }, "1": { defaultClass: "sprinkles_paddingRight_1__dmay207j" }, "2": { defaultClass: "sprinkles_paddingRight_2__dmay207k" }, "3": { defaultClass: "sprinkles_paddingRight_3__dmay207l" }, "4": { defaultClass: "sprinkles_paddingRight_4__dmay207m" }, "5": { defaultClass: "sprinkles_paddingRight_5__dmay207n" }, "6": { defaultClass: "sprinkles_paddingRight_6__dmay207o" }, "8": { defaultClass: "sprinkles_paddingRight_8__dmay207p" }, "10": { defaultClass: "sprinkles_paddingRight_10__dmay207q" }, "12": { defaultClass: "sprinkles_paddingRight_12__dmay207r" }, "14": { defaultClass: "sprinkles_paddingRight_14__dmay207s" }, "16": { defaultClass: "sprinkles_paddingRight_16__dmay207t" }, "18": { defaultClass: "sprinkles_paddingRight_18__dmay207u" }, "20": { defaultClass: "sprinkles_paddingRight_20__dmay207v" }, "24": { defaultClass: "sprinkles_paddingRight_24__dmay207w" }, "28": { defaultClass: "sprinkles_paddingRight_28__dmay207x" }, "32": { defaultClass: "sprinkles_paddingRight_32__dmay207y" }, "36": { defaultClass: "sprinkles_paddingRight_36__dmay207z" }, "44": { defaultClass: "sprinkles_paddingRight_44__dmay2080" }, "64": { defaultClass: "sprinkles_paddingRight_64__dmay2081" }, "-1": { defaultClass: "sprinkles_paddingRight_-1__dmay2082" } } }, paddingTop: { values: { "0": { defaultClass: "sprinkles_paddingTop_0__dmay2083" }, "1": { defaultClass: "sprinkles_paddingTop_1__dmay2084" }, "2": { defaultClass: "sprinkles_paddingTop_2__dmay2085" }, "3": { defaultClass: "sprinkles_paddingTop_3__dmay2086" }, "4": { defaultClass: "sprinkles_paddingTop_4__dmay2087" }, "5": { defaultClass: "sprinkles_paddingTop_5__dmay2088" }, "6": { defaultClass: "sprinkles_paddingTop_6__dmay2089" }, "8": { defaultClass: "sprinkles_paddingTop_8__dmay208a" }, "10": { defaultClass: "sprinkles_paddingTop_10__dmay208b" }, "12": { defaultClass: "sprinkles_paddingTop_12__dmay208c" }, "14": { defaultClass: "sprinkles_paddingTop_14__dmay208d" }, "16": { defaultClass: "sprinkles_paddingTop_16__dmay208e" }, "18": { defaultClass: "sprinkles_paddingTop_18__dmay208f" }, "20": { defaultClass: "sprinkles_paddingTop_20__dmay208g" }, "24": { defaultClass: "sprinkles_paddingTop_24__dmay208h" }, "28": { defaultClass: "sprinkles_paddingTop_28__dmay208i" }, "32": { defaultClass: "sprinkles_paddingTop_32__dmay208j" }, "36": { defaultClass: "sprinkles_paddingTop_36__dmay208k" }, "44": { defaultClass: "sprinkles_paddingTop_44__dmay208l" }, "64": { defaultClass: "sprinkles_paddingTop_64__dmay208m" }, "-1": { defaultClass: "sprinkles_paddingTop_-1__dmay208n" } } }, position: { values: { absolute: { defaultClass: "sprinkles_position_absolute__dmay208o" }, fixed: { defaultClass: "sprinkles_position_fixed__dmay208p" }, relative: { defaultClass: "sprinkles_position_relative__dmay208q" } } }, right: { values: { "0": { defaultClass: "sprinkles_right_0__dmay208r" } } }, transition: { values: { "default": { defaultClass: "sprinkles_transition_default__dmay208s" }, transform: { defaultClass: "sprinkles_transition_transform__dmay208t" } } }, userSelect: { values: { none: { defaultClass: "sprinkles_userSelect_none__dmay208u" } } }, width: { values: { "1": { defaultClass: "sprinkles_width_1__dmay208v" }, "2": { defaultClass: "sprinkles_width_2__dmay208w" }, "4": { defaultClass: "sprinkles_width_4__dmay208x" }, "8": { defaultClass: "sprinkles_width_8__dmay208y" }, "9": { defaultClass: "sprinkles_width_9__dmay208z" }, "12": { defaultClass: "sprinkles_width_12__dmay2090" }, "20": { defaultClass: "sprinkles_width_20__dmay2091" }, "24": { defaultClass: "sprinkles_width_24__dmay2092" }, "28": { defaultClass: "sprinkles_width_28__dmay2093" }, "30": { defaultClass: "sprinkles_width_30__dmay2094" }, "32": { defaultClass: "sprinkles_width_32__dmay2095" }, "34": { defaultClass: "sprinkles_width_34__dmay2096" }, "36": { defaultClass: "sprinkles_width_36__dmay2097" }, "40": { defaultClass: "sprinkles_width_40__dmay2098" }, "44": { defaultClass: "sprinkles_width_44__dmay2099" }, "48": { defaultClass: "sprinkles_width_48__dmay209a" }, "54": { defaultClass: "sprinkles_width_54__dmay209b" }, "60": { defaultClass: "sprinkles_width_60__dmay209c" }, "200": { defaultClass: "sprinkles_width_200__dmay209d" }, full: { defaultClass: "sprinkles_width_full__dmay209e" }, max: { defaultClass: "sprinkles_width_max__dmay209f" } } }, backdropFilter: { values: { modalOverlay: { defaultClass: "sprinkles_backdropFilter_modalOverlay__dmay209g" } } } } });
var themeVars = { colors: { accentColor: "var(--rk-colors-accentColor)", accentColorForeground: "var(--rk-colors-accentColorForeground)", actionButtonBorder: "var(--rk-colors-actionButtonBorder)", actionButtonBorderMobile: "var(--rk-colors-actionButtonBorderMobile)", actionButtonSecondaryBackground: "var(--rk-colors-actionButtonSecondaryBackground)", closeButton: "var(--rk-colors-closeButton)", closeButtonBackground: "var(--rk-colors-closeButtonBackground)", connectButtonBackground: "var(--rk-colors-connectButtonBackground)", connectButtonBackgroundError: "var(--rk-colors-connectButtonBackgroundError)", connectButtonInnerBackground: "var(--rk-colors-connectButtonInnerBackground)", connectButtonText: "var(--rk-colors-connectButtonText)", connectButtonTextError: "var(--rk-colors-connectButtonTextError)", connectionIndicator: "var(--rk-colors-connectionIndicator)", connectionIndicatorBorder: "var(--rk-colors-connectionIndicatorBorder)", downloadBottomCardBackground: "var(--rk-colors-downloadBottomCardBackground)", downloadTopCardBackground: "var(--rk-colors-downloadTopCardBackground)", error: "var(--rk-colors-error)", generalBorder: "var(--rk-colors-generalBorder)", generalBorderDim: "var(--rk-colors-generalBorderDim)", menuItemBackground: "var(--rk-colors-menuItemBackground)", modalBackdrop: "var(--rk-colors-modalBackdrop)", modalBackground: "var(--rk-colors-modalBackground)", modalBorder: "var(--rk-colors-modalBorder)", modalText: "var(--rk-colors-modalText)", modalTextDim: "var(--rk-colors-modalTextDim)", modalTextSecondary: "var(--rk-colors-modalTextSecondary)", profileAction: "var(--rk-colors-profileAction)", profileActionHover: "var(--rk-colors-profileActionHover)", profileForeground: "var(--rk-colors-profileForeground)", selectedOptionBorder: "var(--rk-colors-selectedOptionBorder)", standby: "var(--rk-colors-standby)", standbyBorder: "var(--rk-colors-standbyBorder)" }, fonts: { body: "var(--rk-fonts-body)" }, radii: { actionButton: "var(--rk-radii-actionButton)", connectButton: "var(--rk-radii-connectButton)", menuButton: "var(--rk-radii-menuButton)", modal: "var(--rk-radii-modal)", modalMobile: "var(--rk-radii-modalMobile)" }, shadows: { connectButton: "var(--rk-shadows-connectButton)", dialog: "var(--rk-shadows-dialog)", profileDetailsAction: "var(--rk-shadows-profileDetailsAction)", selectedOption: "var(--rk-shadows-selectedOption)", selectedWallet: "var(--rk-shadows-selectedWallet)", walletLogo: "var(--rk-shadows-walletLogo)" }, blurs: { modalOverlay: "var(--rk-blurs-modalOverlay)" } };

// src/rainbowkit/src/css/atoms.ts
var atoms = ({ reset, ...rest }) => {
  if (!reset)
    return sprinkles(rest);
  const elementReset = element[reset];
  const sprinklesClasses = sprinkles(rest);
  return clsx(base, elementReset, sprinklesClasses);
};

// src/rainbowkit/src/components/Box/Box.ts
var Box = React40.forwardRef(
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
    return React40.createElement(as, {
      className: clsx2(atomicClasses, className),
      ...nativeProps,
      "data-testid": testId ? `rk-${testId.replace(/^rk-/, "")}` : void 0,
      ref
    });
  }
);
Box.displayName = "Box";

// src/rainbowkit/src/components/RainbowKitProvider/RainbowKitProvider.tsx
import React52, { createContext as createContext10, useContext as useContext5 } from "react";
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

// src/rainbowkit/src/hooks/useWindowSize.ts
import { useEffect as useEffect20, useState as useState17 } from "react";
var useWindowSize2 = () => {
  const [windowSize, setWindowSize] = useState17({
    height: void 0,
    width: void 0
  });
  useEffect20(() => {
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

// src/rainbowkit/src/transactions/TransactionStoreContext.tsx
import React41, { createContext as createContext4, useContext as useContext4, useEffect as useEffect21, useState as useState18 } from "react";
import { useAccount as useAccount4, usePublicClient as usePublicClient3 } from "wagmi";

// src/rainbowkit/src/transactions/transactionStore.ts
var storageKey2 = "rk-transactions";
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
    typeof localStorage !== "undefined" ? localStorage.getItem(storageKey2) : null
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
    localStorage.setItem(storageKey2, JSON.stringify(data));
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
var TransactionStoreContext = createContext4(null);
function TransactionStoreProvider({ children }) {
  const provider = usePublicClient3();
  const { address } = useAccount4();
  const chainId = useChainId();
  const [store] = useState18(() => storeSingleton != null ? storeSingleton : storeSingleton = createTransactionStore({ provider }));
  useEffect21(() => {
    store.setProvider(provider);
  }, [store, provider]);
  useEffect21(() => {
    if (address && chainId) {
      store.waitForPendingTransactions(address, chainId);
    }
  }, [store, address, chainId]);
  return /* @__PURE__ */ React41.createElement(TransactionStoreContext.Provider, {
    value: store
  }, children);
}
function useTransactionStore() {
  const store = useContext4(TransactionStoreContext);
  if (!store) {
    throw new Error("Transaction hooks must be used within RainbowKitProvider");
  }
  return store;
}

// src/rainbowkit/src/components/RainbowKitProvider/AppContext.ts
import { createContext as createContext5 } from "react";
var defaultAppInfo = {
  appName: void 0,
  disclaimer: void 0,
  learnMoreUrl: "https://learn.rainbow.me/understanding-web3?utm_source=rainbowkit&utm_campaign=learnmore"
};
var AppContext = createContext5(defaultAppInfo);

// src/rainbowkit/src/components/RainbowKitProvider/AvatarContext.ts
import { createContext as createContext6 } from "react";

// src/rainbowkit/src/components/Avatar/EmojiAvatar.tsx
import React44, { useEffect as useEffect22, useMemo as useMemo15, useState as useState19 } from "react";

// src/rainbowkit/src/components/Icons/Spinner.tsx
import React43, { useMemo as useMemo14 } from "react";

// src/rainbowkit/src/components/Icons/Icons.css.ts
var SpinnerIconClassName = "Icons_SpinnerIconClassName__j63hpy2";
var SpinnerIconPathClassName = "Icons_SpinnerIconPathClassName__j63hpy3";

// src/rainbowkit/src/components/Icons/Spinner.tsx
var useRandomId = (prefix) => useMemo14(
  () => `${prefix}_${Math.round(Math.random() * 1e9)}`,
  [prefix]
);
var SpinnerIcon = ({
  height = 21,
  width = 21
}) => {
  const id = useRandomId("spinner");
  return /* @__PURE__ */ React43.createElement("svg", {
    className: SpinnerIconClassName,
    fill: "none",
    height,
    viewBox: "0 0 21 21",
    width,
    xmlns: "http://www.w3.org/2000/svg"
  }, /* @__PURE__ */ React43.createElement("clipPath", {
    id
  }, /* @__PURE__ */ React43.createElement("path", {
    d: "M10.5 3C6.35786 3 3 6.35786 3 10.5C3 14.6421 6.35786 18 10.5 18C11.3284 18 12 18.6716 12 19.5C12 20.3284 11.3284 21 10.5 21C4.70101 21 0 16.299 0 10.5C0 4.70101 4.70101 0 10.5 0C16.299 0 21 4.70101 21 10.5C21 11.3284 20.3284 12 19.5 12C18.6716 12 18 11.3284 18 10.5C18 6.35786 14.6421 3 10.5 3Z"
  })), /* @__PURE__ */ React43.createElement("foreignObject", {
    clipPath: `url(#${id})`,
    height: "21",
    width: "21",
    x: "0",
    y: "0"
  }, /* @__PURE__ */ React43.createElement("div", {
    className: SpinnerIconPathClassName
  })));
};

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
  const [loaded, setLoaded] = useState19(false);
  useEffect22(() => {
    if (ensImage) {
      const img = new Image();
      img.src = ensImage;
      img.onload = () => setLoaded(true);
    }
  }, [ensImage]);
  const { color: backgroundColor, emoji } = useMemo15(
    () => emojiAvatarForAddress(address),
    [address]
  );
  return ensImage ? loaded ? /* @__PURE__ */ React44.createElement(Box, {
    backgroundSize: "cover",
    borderRadius: "full",
    position: "absolute",
    style: {
      backgroundImage: `url(${ensImage})`,
      backgroundPosition: "center",
      height: size,
      width: size
    }
  }) : /* @__PURE__ */ React44.createElement(Box, {
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
  }, /* @__PURE__ */ React44.createElement(SpinnerIcon, null)) : /* @__PURE__ */ React44.createElement(Box, {
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
var AvatarContext = createContext6(defaultAvatar);

// src/rainbowkit/src/components/RainbowKitProvider/CoolModeContext.ts
import { createContext as createContext7 } from "react";
var CoolModeContext = createContext7(false);

// src/rainbowkit/src/components/RainbowKitProvider/ModalSizeContext.ts
import { createContext as createContext8 } from "react";
var ModalSizeOptions = {
  COMPACT: "compact",
  WIDE: "wide"
};
var ModalSizeContext = createContext8(
  ModalSizeOptions.WIDE
);

// src/rainbowkit/src/components/RainbowKitProvider/ShowRecentTransactionsContext.ts
import { createContext as createContext9 } from "react";
var ShowRecentTransactionsContext = createContext9(false);

// src/rainbowkit/src/components/RainbowKitProvider/useFingerprint.ts
import { useCallback as useCallback25, useEffect as useEffect23 } from "react";
var storageKey3 = "rk-version";
function setRainbowKitVersion({ version }) {
  localStorage.setItem(storageKey3, version);
}
function useFingerprint() {
  const fingerprint = useCallback25(() => {
    setRainbowKitVersion({ version: "__buildVersion" });
  }, []);
  useEffect23(() => {
    fingerprint();
  }, [fingerprint]);
}

// src/rainbowkit/src/components/RainbowKitProvider/usePreloadImages.ts
import { useCallback as useCallback27, useEffect as useEffect25 } from "react";

// src/rainbowkit/src/components/AsyncImage/useAsyncImage.ts
import { useEffect as useEffect24, useReducer } from "react";
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
  useEffect24(() => {
    if (typeof url === "function" && !cachedUrl) {
      loadAsyncImage(url).then(forceUpdate);
    }
  }, [url, cachedUrl, forceUpdate]);
  return typeof url === "function" ? cachedUrl : url;
}

// src/rainbowkit/src/components/Icons/Assets.tsx
import React47 from "react";

// src/rainbowkit/src/components/AsyncImage/AsyncImage.tsx
import React46, { useReducer as useReducer2 } from "react";
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
  return /* @__PURE__ */ React46.createElement(Box, {
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
  }, /* @__PURE__ */ React46.createElement(Box, {
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
  }), borderColor ? /* @__PURE__ */ React46.createElement(Box, {
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
var AssetsIcon = () => /* @__PURE__ */ React47.createElement(AsyncImage, {
  background: "#d0d5de",
  borderRadius: "10",
  height: "48",
  src,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Login.tsx
import React48 from "react";
var src2 = async () => (await import("./login-L4DFYQAF.js")).default;
var preloadLoginIcon = () => loadImages(src2);
var LoginIcon = () => /* @__PURE__ */ React48.createElement(AsyncImage, {
  background: "#d0d5de",
  borderRadius: "10",
  height: "48",
  src: src2,
  width: "48"
});

// src/rainbowkit/src/components/SignIn/SignIn.tsx
import React51, { useCallback as useCallback26, useRef as useRef8 } from "react";
import { UserRejectedRequestError } from "viem";
import { useAccount as useAccount5, useDisconnect as useDisconnect3, useNetwork as useNetwork2, useSignMessage } from "wagmi";

// src/rainbowkit/src/css/touchableStyles.css.ts
var active = { shrink: "touchableStyles_active_shrink__wsvdkn6", shrinkSm: "touchableStyles_active_shrinkSm__wsvdkn7" };
var base2 = "touchableStyles_base__wsvdkn3 sprinkles_position_relative__dmay208q";
var hover = { grow: "touchableStyles_hover_grow__wsvdkn4", growLg: "touchableStyles_hover_growLg__wsvdkn5" };

// src/rainbowkit/src/css/touchableStyles.ts
function touchableStyles({ active: active2, hover: hover2 }) {
  return [base2, hover2 && hover[hover2], active[active2]];
}

// src/rainbowkit/src/components/Button/ActionButton.tsx
import React50 from "react";

// src/rainbowkit/src/components/Text/Text.tsx
import React49 from "react";
var Text2 = React49.forwardRef(
  ({
    as = "div",
    children,
    className,
    color,
    display,
    font = "body",
    id,
    size = "16",
    style,
    tabIndex,
    textAlign = "inherit",
    weight = "regular"
  }, ref) => {
    return /* @__PURE__ */ React49.createElement(Box, {
      as,
      className,
      color,
      display,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      id,
      ref,
      style,
      tabIndex,
      textAlign
    }, children);
  }
);
Text2.displayName = "Text";

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
  const background = !disabled ? isPrimary ? "#1649FF" : isNotLarge ? "#3360FF" : void 0 : "#1D263B";
  const { fontSize, height, paddingX, paddingY } = sizeVariants[size];
  return /* @__PURE__ */ React50.createElement(PixelCube2, {
    pixel_height: 2,
    borderColor: background,
    backgroundColor: background,
    height: height ? height + "px" : void 0
  }, /* @__PURE__ */ React50.createElement(Box, {
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
  }, /* @__PURE__ */ React50.createElement(Text2, {
    color: !disabled ? isPrimary ? "accentColorForeground" : "accentColor" : "modalTextSecondary",
    size: fontSize,
    weight: "bold"
  }, label)));
}

// src/rainbowkit/src/components/SignIn/SignIn.tsx
var signInIcon = async () => (await import("./sign-IOXJRZQV.js")).default;
function SignIn({ onClose }) {
  const [{ status, ...state }, setState] = React51.useState({ status: "idle" });
  const authAdapter = useAuthenticationAdapter();
  const getNonce = useCallback26(async () => {
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
  const onceRef = useRef8(false);
  React51.useEffect(() => {
    if (onceRef.current)
      return;
    onceRef.current = true;
    getNonce();
  }, [getNonce]);
  const mobile = isMobile();
  const { address } = useAccount5();
  const { chain: activeChain } = useNetwork2();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect3();
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
  return /* @__PURE__ */ React51.createElement(Box, {
    position: "relative"
  }, /* @__PURE__ */ React51.createElement(Box, {
    display: "flex",
    paddingRight: "16",
    paddingTop: "16",
    position: "absolute",
    right: "0"
  }, /* @__PURE__ */ React51.createElement(DialogClose_default, {
    onClick: onClose
  })), /* @__PURE__ */ React51.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "32" : "24",
    padding: "24",
    paddingX: "18",
    style: { paddingTop: mobile ? "60px" : "36px" }
  }, /* @__PURE__ */ React51.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "6" : "4",
    style: { maxWidth: mobile ? 320 : 280 }
  }, /* @__PURE__ */ React51.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "32" : "16"
  }, /* @__PURE__ */ React51.createElement(AsyncImage, {
    height: 40,
    src: signInIcon,
    width: 40
  }), /* @__PURE__ */ React51.createElement(Text2, {
    color: "modalText",
    size: mobile ? "20" : "18",
    textAlign: "center",
    weight: "heavy"
  }, "Verify your account")), /* @__PURE__ */ React51.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "16" : "12"
  }, /* @__PURE__ */ React51.createElement(Text2, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    textAlign: "center"
  }, "To finish connecting, you must sign a message in your wallet to verify that you are the owner of this account."), status === "idle" && state.errorMessage ? /* @__PURE__ */ React51.createElement(Text2, {
    color: "error",
    size: mobile ? "16" : "14",
    textAlign: "center",
    weight: "bold"
  }, state.errorMessage) : null)), /* @__PURE__ */ React51.createElement(Box, {
    alignItems: !mobile ? "center" : void 0,
    display: "flex",
    flexDirection: "column",
    gap: "8",
    width: "full"
  }, /* @__PURE__ */ React51.createElement(ActionButton, {
    disabled: !state.nonce || status === "signing" || status === "verifying",
    label: !state.nonce ? "Preparing message..." : status === "signing" ? "Waiting for signature..." : status === "verifying" ? "Verifying signature..." : "Send message",
    onClick: signIn,
    size: mobile ? "large" : "medium",
    testId: "auth-message-button"
  }), mobile ? /* @__PURE__ */ React51.createElement(ActionButton, {
    label: "Cancel",
    onClick: cancel,
    size: "large",
    type: "secondary"
  }) : /* @__PURE__ */ React51.createElement(Box, {
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
  }, /* @__PURE__ */ React51.createElement(Text2, {
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
  const preloadImages = useCallback27(() => {
    loadImages(...walletConnectors.map((wallet) => wallet.iconUrl), ...rainbowKitChains.map((chain) => chain.iconUrl).filter(isNotNullish));
    if (!isMobile()) {
      preloadAssetsIcon();
      preloadLoginIcon();
    }
    if (isUnauthenticated) {
      loadImages(signInIcon);
    }
  }, [walletConnectors, rainbowKitChains, isUnauthenticated]);
  useEffect25(() => {
    preloadImages();
  }, [preloadImages]);
}

// src/rainbowkit/src/components/RainbowKitProvider/walletConnectDeepLink.ts
var storageKey4 = "WALLETCONNECT_DEEPLINK_CHOICE";
function setWalletConnectDeepLink({
  mobileUri,
  name
}) {
  localStorage.setItem(
    storageKey4,
    JSON.stringify({
      href: mobileUri.split("?")[0],
      name
    })
  );
}
function clearWalletConnectDeepLink() {
  localStorage.removeItem(storageKey4);
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
  const id = useContext5(ThemeIdContext);
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
  return /* @__PURE__ */ React52.createElement(RainbowKitChainProvider, {
    chains,
    initialChain
  }, /* @__PURE__ */ React52.createElement(CoolModeContext.Provider, {
    value: coolMode
  }, /* @__PURE__ */ React52.createElement(ModalSizeContext.Provider, {
    value: isSmallScreen ? ModalSizeOptions.COMPACT : modalSize
  }, /* @__PURE__ */ React52.createElement(ShowRecentTransactionsContext.Provider, {
    value: showRecentTransactions
  }, /* @__PURE__ */ React52.createElement(TransactionStoreProvider, null, /* @__PURE__ */ React52.createElement(AvatarContext.Provider, {
    value: avatarContext
  }, /* @__PURE__ */ React52.createElement(AppContext.Provider, {
    value: appContext
  }, /* @__PURE__ */ React52.createElement(ThemeIdContext.Provider, {
    value: id
  }, /* @__PURE__ */ React52.createElement(ModalProvider, null, theme ? /* @__PURE__ */ React52.createElement("div", {
    ...createThemeRootProps(id)
  }, /* @__PURE__ */ React52.createElement("style", {
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
var content = "Dialog_content__1dq44ga5 sprinkles_display_flex_smallScreen__dmay20a sprinkles_flexDirection_column__dmay2011 sprinkles_position_relative__dmay208q";
var overlay = "Dialog_overlay__1dq44ga3 sprinkles_backdropFilter_modalOverlay__dmay209g sprinkles_background_modalBackdrop_base__dmay20b5 sprinkles_display_flex_smallScreen__dmay20a sprinkles_justifyContent_center__dmay202n sprinkles_position_fixed__dmay208p";

// src/rainbowkit/src/components/Dialog/FocusTrap.tsx
import React53, { useCallback as useCallback28, useEffect as useEffect26, useRef as useRef9 } from "react";
var moveFocusWithin = (element2, position) => {
  const focusableElements = element2.querySelectorAll(
    "button:not(:disabled), a[href]"
  );
  if (focusableElements.length === 0)
    return;
  focusableElements[position === "end" ? focusableElements.length - 1 : 0].focus();
};
function FocusTrap(props) {
  const contentRef = useRef9(null);
  useEffect26(() => {
    const previouslyActiveElement = document.activeElement;
    return () => {
      var _a;
      (_a = previouslyActiveElement.focus) == null ? void 0 : _a.call(previouslyActiveElement);
    };
  }, []);
  useEffect26(() => {
    if (contentRef.current) {
      const elementToFocus = contentRef.current.querySelector("[data-auto-focus]");
      if (elementToFocus) {
        elementToFocus.focus();
      } else {
        contentRef.current.focus();
      }
    }
  }, [contentRef]);
  return /* @__PURE__ */ React53.createElement(React53.Fragment, null, /* @__PURE__ */ React53.createElement("div", {
    onFocus: useCallback28(
      () => contentRef.current && moveFocusWithin(contentRef.current, "end"),
      []
    ),
    tabIndex: 0
  }), /* @__PURE__ */ React53.createElement("div", {
    ref: contentRef,
    style: { outline: "none" },
    tabIndex: -1,
    ...props
  }), /* @__PURE__ */ React53.createElement("div", {
    onFocus: useCallback28(
      () => contentRef.current && moveFocusWithin(contentRef.current, "start"),
      []
    ),
    tabIndex: 0
  }));
}

// src/rainbowkit/src/components/Dialog/Dialog.tsx
var stopPropagation = (event) => event.stopPropagation();
function Dialog({ children, onClose, open, titleId }) {
  useEffect27(() => {
    const handleEscape = (event) => open && event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);
  const [bodyScrollable, setBodyScrollable] = useState20(true);
  useEffect27(() => {
    setBodyScrollable(getComputedStyle(window.document.body).overflow !== "hidden");
  }, []);
  const handleBackdropClick = useCallback29(() => onClose(), [onClose]);
  const themeRootProps = useThemeRootProps();
  const mobile = isMobile();
  return /* @__PURE__ */ React54.createElement(React54.Fragment, null, open ? createPortal(
    /* @__PURE__ */ React54.createElement(RemoveScroll, {
      enabled: bodyScrollable
    }, /* @__PURE__ */ React54.createElement(Box, {
      ...themeRootProps
    }, /* @__PURE__ */ React54.createElement(Box, {
      ...themeRootProps,
      alignItems: mobile ? "flex-end" : "center",
      "aria-labelledby": titleId,
      "aria-modal": true,
      className: overlay,
      onClick: handleBackdropClick,
      position: "fixed",
      role: "dialog"
    }, /* @__PURE__ */ React54.createElement(FocusTrap, {
      className: content,
      onClick: stopPropagation,
      role: "document"
    }, children)))),
    document.body
  ) : null);
}

// src/rainbowkit/src/components/Dialog/DialogContent.tsx
import React55, { useContext as useContext6 } from "react";

// src/rainbowkit/src/components/Dialog/DialogContent.css.ts
var bottomSheetOverrides = "DialogContent_bottomSheetOverrides__1h0hnyy7";
var dialogContent = "DialogContent_dialogContent__1h0hnyy1 sprinkles_display_flex_smallScreen__dmay20a sprinkles_flexDirection_column__dmay2011 sprinkles_overflow_hidden__dmay206b sprinkles_position_relative__dmay208q";
var dialogContentCompactMode = "DialogContent_dialogContentCompactMode__1h0hnyy4 DialogContent_dialogContent__1h0hnyy1 sprinkles_display_flex_smallScreen__dmay20a sprinkles_flexDirection_column__dmay2011 sprinkles_overflow_hidden__dmay206b sprinkles_position_relative__dmay208q";
var dialogContentMobile = "DialogContent_dialogContentMobile__1h0hnyy6 sprinkles_borderRadius_modalMobile__dmay20q";
var dialogContentWideDesktop = "DialogContent_dialogContentWideDesktop__1h0hnyy3 DialogContent_dialogContent__1h0hnyy1 sprinkles_display_flex_smallScreen__dmay20a sprinkles_flexDirection_column__dmay2011 sprinkles_overflow_hidden__dmay206b sprinkles_position_relative__dmay208q";
var dialogContentWideMobile = "DialogContent_dialogContentWideMobile__1h0hnyy2 DialogContent_dialogContent__1h0hnyy1 sprinkles_display_flex_smallScreen__dmay20a sprinkles_flexDirection_column__dmay2011 sprinkles_overflow_hidden__dmay206b sprinkles_position_relative__dmay208q";

// src/rainbowkit/src/components/Dialog/DialogContent.tsx
function DialogContent3({
  bottomSheetOnMobile = false,
  children,
  marginTop,
  padding = "16",
  wide = false
}) {
  const mobile = isMobile();
  const modalSize = useContext6(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  return /* @__PURE__ */ React55.createElement(Box, {
    marginTop
  }, /* @__PURE__ */ React55.createElement(PixelBorderCard, {
    className: [
      wide ? mobile ? dialogContentWideMobile : compactModeEnabled ? dialogContentCompactMode : dialogContentWideDesktop : dialogContent,
      mobile ? dialogContentMobile : null,
      mobile && bottomSheetOnMobile ? bottomSheetOverrides : null
    ].join(" "),
    pixel_height: 10,
    backgroundColor: "#1D263B"
  }, /* @__PURE__ */ React55.createElement(Box, {
    padding,
    width: "full"
  }, children)));
}

// src/rainbowkit/src/components/ProfileDetails/ProfileDetails.tsx
import React66, { useCallback as useCallback31, useContext as useContext9, useEffect as useEffect29, useState as useState22 } from "react";

// src/rainbowkit/src/components/Avatar/Avatar.tsx
import React56, { useContext as useContext7 } from "react";
function Avatar2({ address, imageUrl, loading, size }) {
  const AvatarComponent3 = useContext7(AvatarContext);
  return /* @__PURE__ */ React56.createElement(Box, {
    "aria-hidden": true,
    borderRadius: "full",
    overflow: "hidden",
    position: "relative",
    style: {
      height: `${size}px`,
      width: `${size}px`
    },
    userSelect: "none"
  }, /* @__PURE__ */ React56.createElement(Box, {
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
  }, /* @__PURE__ */ React56.createElement(AvatarComponent3, {
    address,
    ensImage: imageUrl,
    size
  })), typeof loading === "boolean" && /* @__PURE__ */ React56.createElement(Box, {
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
  }, /* @__PURE__ */ React56.createElement(SpinnerIcon, {
    height: "100%",
    width: "100%"
  })));
}

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
import React57 from "react";
var CopiedIcon = () => /* @__PURE__ */ React57.createElement("svg", {
  fill: "none",
  height: "13",
  viewBox: "0 0 13 13",
  width: "13",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React57.createElement("path", {
  d: "M4.94568 12.2646C5.41052 12.2646 5.77283 12.0869 6.01892 11.7109L12.39 1.96973C12.5677 1.69629 12.6429 1.44336 12.6429 1.2041C12.6429 0.561523 12.1644 0.0966797 11.5082 0.0966797C11.057 0.0966797 10.7767 0.260742 10.5033 0.691406L4.9115 9.50977L2.07458 5.98926C1.82166 5.68848 1.54822 5.55176 1.16541 5.55176C0.502319 5.55176 0.0238037 6.02344 0.0238037 6.66602C0.0238037 6.95312 0.112671 7.20605 0.358765 7.48633L3.88611 11.7588C4.18005 12.1074 4.50818 12.2646 4.94568 12.2646Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Icons/Copy.tsx
import React58 from "react";
var CopyIcon = () => /* @__PURE__ */ React58.createElement("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 17 16",
  width: "17",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React58.createElement("path", {
  d: "M3.04236 12.3027H4.18396V13.3008C4.18396 14.8525 5.03845 15.7002 6.59705 15.7002H13.6244C15.183 15.7002 16.0375 14.8525 16.0375 13.3008V6.24609C16.0375 4.69434 15.183 3.84668 13.6244 3.84668H12.4828V2.8418C12.4828 1.29688 11.6283 0.442383 10.0697 0.442383H3.04236C1.48376 0.442383 0.629272 1.29004 0.629272 2.8418V9.90332C0.629272 11.4551 1.48376 12.3027 3.04236 12.3027ZM3.23376 10.5391C2.68689 10.5391 2.39294 10.2656 2.39294 9.68457V3.06055C2.39294 2.47949 2.68689 2.21289 3.23376 2.21289H9.8783C10.4252 2.21289 10.7191 2.47949 10.7191 3.06055V3.84668H6.59705C5.03845 3.84668 4.18396 4.69434 4.18396 6.24609V10.5391H3.23376ZM6.78845 13.9365C6.24158 13.9365 5.94763 13.6699 5.94763 13.0889V6.45801C5.94763 5.87695 6.24158 5.61035 6.78845 5.61035H13.433C13.9799 5.61035 14.2738 5.87695 14.2738 6.45801V13.0889C14.2738 13.6699 13.9799 13.9365 13.433 13.9365H6.78845Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Icons/Disconnect.tsx
import React59 from "react";
var DisconnectIcon = () => /* @__PURE__ */ React59.createElement("svg", {
  fill: "none",
  height: "16",
  viewBox: "0 0 18 16",
  width: "18",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React59.createElement("path", {
  d: "M2.67834 15.5908H9.99963C11.5514 15.5908 12.399 14.7432 12.399 13.1777V10.2656H10.6354V12.9863C10.6354 13.5332 10.3688 13.8271 9.78772 13.8271H2.89026C2.3092 13.8271 2.0426 13.5332 2.0426 12.9863V3.15625C2.0426 2.60254 2.3092 2.30859 2.89026 2.30859H9.78772C10.3688 2.30859 10.6354 2.60254 10.6354 3.15625V5.89746H12.399V2.95801C12.399 1.39941 11.5514 0.544922 9.99963 0.544922H2.67834C1.12659 0.544922 0.278931 1.39941 0.278931 2.95801V13.1777C0.278931 14.7432 1.12659 15.5908 2.67834 15.5908ZM7.43616 8.85059H14.0875L15.0924 8.78906L14.566 9.14453L13.6842 9.96484C13.5406 10.1016 13.4586 10.2861 13.4586 10.4844C13.4586 10.8398 13.7321 11.168 14.1217 11.168C14.3199 11.168 14.4635 11.0928 14.6002 10.9561L16.7809 8.68652C16.986 8.48145 17.0543 8.27637 17.0543 8.06445C17.0543 7.85254 16.986 7.64746 16.7809 7.43555L14.6002 5.17285C14.4635 5.03613 14.3199 4.9541 14.1217 4.9541C13.7321 4.9541 13.4586 5.27539 13.4586 5.6377C13.4586 5.83594 13.5406 6.02734 13.6842 6.15723L14.566 6.98438L15.0924 7.33984L14.0875 7.27148H7.43616C7.01917 7.27148 6.65686 7.62012 6.65686 8.06445C6.65686 8.50195 7.01917 8.85059 7.43616 8.85059Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Txs/TxList.tsx
import React64, { useContext as useContext8 } from "react";
import { useNetwork as useNetwork4 } from "wagmi";

// src/rainbowkit/src/transactions/useClearRecentTransactions.ts
import { useCallback as useCallback30 } from "react";
import { useAccount as useAccount7 } from "wagmi";
function useClearRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount7();
  const chainId = useChainId();
  return useCallback30(() => {
    if (!address || !chainId) {
      throw new Error("No address or chain ID found");
    }
    store.clearTransactions(address, chainId);
  }, [store, address, chainId]);
}

// src/rainbowkit/src/transactions/useRecentTransactions.ts
import { useEffect as useEffect28, useState as useState21 } from "react";
import { useAccount as useAccount8 } from "wagmi";
function useRecentTransactions() {
  const store = useTransactionStore();
  const { address } = useAccount8();
  const chainId = useChainId();
  const [transactions, setTransactions] = useState21(
    () => store && address && chainId ? store.getTransactions(address, chainId) : []
  );
  useEffect28(() => {
    if (store && address && chainId) {
      setTransactions(store.getTransactions(address, chainId));
      return store.onChange(() => {
        setTransactions(store.getTransactions(address, chainId));
      });
    }
  }, [store, address, chainId]);
  return transactions;
}

// src/rainbowkit/src/utils/chainToExplorerUrl.ts
var chainToExplorerUrl = (chain) => {
  var _a, _b;
  return (_b = (_a = chain == null ? void 0 : chain.blockExplorers) == null ? void 0 : _a.default) == null ? void 0 : _b.url;
};

// src/rainbowkit/src/components/Icons/ExternalLink.tsx
import React60 from "react";
var ExternalLinkIcon = () => /* @__PURE__ */ React60.createElement("svg", {
  fill: "none",
  height: "19",
  viewBox: "0 0 20 19",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React60.createElement("path", {
  d: "M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM12.7158 12.1416C13.2432 12.1416 13.5684 11.7549 13.5684 11.1836V7.19336C13.5684 6.44629 13.1377 6.05957 12.417 6.05957H8.40918C7.8291 6.05957 7.45117 6.38477 7.45117 6.91211C7.45117 7.43945 7.8291 7.77344 8.40918 7.77344H9.69238L10.7207 7.63281L9.53418 8.67871L6.73047 11.4912C6.53711 11.6758 6.41406 11.9395 6.41406 12.2031C6.41406 12.7832 6.85352 13.1699 7.39844 13.1699C7.68848 13.1699 7.92578 13.0732 8.1543 12.8623L10.9316 10.0762L11.9775 8.89844L11.8545 9.98828V11.1836C11.8545 11.7725 12.1885 12.1416 12.7158 12.1416Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Txs/TxItem.tsx
import React63 from "react";
import { useNetwork as useNetwork3 } from "wagmi";

// src/rainbowkit/src/components/Icons/Cancel.tsx
import React61 from "react";
var CancelIcon = () => /* @__PURE__ */ React61.createElement("svg", {
  fill: "none",
  height: "19",
  viewBox: "0 0 20 19",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React61.createElement("path", {
  d: "M10 18.9443C15.0977 18.9443 19.2812 14.752 19.2812 9.6543C19.2812 4.56543 15.0889 0.373047 10 0.373047C4.90234 0.373047 0.71875 4.56543 0.71875 9.6543C0.71875 14.752 4.91113 18.9443 10 18.9443ZM10 16.6328C6.1416 16.6328 3.03906 13.5215 3.03906 9.6543C3.03906 5.7959 6.13281 2.68457 10 2.68457C13.8584 2.68457 16.9697 5.7959 16.9697 9.6543C16.9785 13.5215 13.8672 16.6328 10 16.6328ZM7.29297 13.3018C7.58301 13.3018 7.81152 13.2139 7.99609 13.0205L10 11.0166L12.0127 13.0205C12.1973 13.2051 12.4258 13.3018 12.707 13.3018C13.2432 13.3018 13.6562 12.8887 13.6562 12.3525C13.6562 12.0977 13.5508 11.8691 13.3662 11.6934L11.3535 9.67188L13.375 7.6416C13.5596 7.44824 13.6562 7.22852 13.6562 6.98242C13.6562 6.44629 13.2432 6.0332 12.7158 6.0332C12.4346 6.0332 12.2148 6.12109 12.0215 6.31445L10 8.32715L7.9873 6.32324C7.80273 6.12988 7.58301 6.04199 7.29297 6.04199C6.76562 6.04199 6.35254 6.45508 6.35254 6.99121C6.35254 7.2373 6.44922 7.46582 6.63379 7.6416L8.65527 9.67188L6.63379 11.6934C6.44922 11.8691 6.35254 12.1064 6.35254 12.3525C6.35254 12.8887 6.76562 13.3018 7.29297 13.3018Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/Icons/Success.tsx
import React62 from "react";
var SuccessIcon = () => /* @__PURE__ */ React62.createElement("svg", {
  fill: "none",
  height: "20",
  viewBox: "0 0 20 20",
  width: "20",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React62.createElement("path", {
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
  return /* @__PURE__ */ React63.createElement(React63.Fragment, null, /* @__PURE__ */ React63.createElement(Box, {
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
  }, /* @__PURE__ */ React63.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: mobile ? "16" : "14"
  }, /* @__PURE__ */ React63.createElement(Box, {
    color
  }, /* @__PURE__ */ React63.createElement(Icon2, null)), /* @__PURE__ */ React63.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "3" : "1"
  }, /* @__PURE__ */ React63.createElement(Box, null, /* @__PURE__ */ React63.createElement(Text2, {
    color: "modalText",
    font: "body",
    size: mobile ? "16" : "14",
    weight: "bold"
  }, tx == null ? void 0 : tx.description)), /* @__PURE__ */ React63.createElement(Box, null, /* @__PURE__ */ React63.createElement(Text2, {
    color: tx.status === "pending" ? "modalTextSecondary" : color,
    font: "body",
    size: "14",
    weight: mobile ? "medium" : "regular"
  }, confirmationStatus)))), explorerLink && /* @__PURE__ */ React63.createElement(Box, {
    alignItems: "center",
    color: "modalTextDim",
    display: "flex"
  }, /* @__PURE__ */ React63.createElement(ExternalLinkIcon, null))));
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
  const { appName } = useContext8(AppContext);
  return /* @__PURE__ */ React64.createElement(React64.Fragment, null, /* @__PURE__ */ React64.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "10",
    paddingBottom: "2",
    paddingTop: "16",
    paddingX: mobile ? "8" : "18"
  }, hasTransactions && /* @__PURE__ */ React64.createElement(Box, {
    paddingBottom: mobile ? "4" : "0",
    paddingTop: "8",
    paddingX: mobile ? "12" : "6"
  }, /* @__PURE__ */ React64.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, /* @__PURE__ */ React64.createElement(Text2, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, "Recent Transactions"), /* @__PURE__ */ React64.createElement(Box, {
    style: {
      marginBottom: -6,
      marginLeft: -10,
      marginRight: -10,
      marginTop: -6
    }
  }, /* @__PURE__ */ React64.createElement(Box, {
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
  }, /* @__PURE__ */ React64.createElement(Text2, {
    color: "modalTextSecondary",
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, "Clear All"))))), /* @__PURE__ */ React64.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, hasTransactions ? visibleTxs.map((tx) => /* @__PURE__ */ React64.createElement(TxItem, {
    key: tx.hash,
    tx
  })) : /* @__PURE__ */ React64.createElement(React64.Fragment, null, /* @__PURE__ */ React64.createElement(Box, {
    padding: mobile ? "12" : "8"
  }, /* @__PURE__ */ React64.createElement(Text2, {
    color: "modalTextDim",
    size: mobile ? "16" : "14",
    weight: mobile ? "medium" : "bold"
  }, appName != null ? appName : "Your", " transactions will appear here...")), mobile && /* @__PURE__ */ React64.createElement(Box, {
    background: "generalBorderDim",
    height: "1",
    marginX: "12",
    marginY: "8"
  })))), explorerLink && /* @__PURE__ */ React64.createElement(Box, {
    paddingBottom: "18",
    paddingX: mobile ? "8" : "18"
  }, /* @__PURE__ */ React64.createElement(Box, {
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
  }, /* @__PURE__ */ React64.createElement(Text2, {
    color: "modalText",
    font: "body",
    size: mobile ? "16" : "14",
    weight: mobile ? "semibold" : "bold"
  }, "View more on Explorer"), /* @__PURE__ */ React64.createElement(ExternalLinkIcon, null))));
}

// src/rainbowkit/src/components/ProfileDetails/ProfileDetailsAction.tsx
import React65 from "react";
function ProfileDetailsAction({
  action,
  icon,
  label,
  testId,
  url
}) {
  const mobile = isMobile();
  return /* @__PURE__ */ React65.createElement(Box, {
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
  }, /* @__PURE__ */ React65.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1",
    justifyContent: "center",
    paddingTop: "2",
    width: "full"
  }, /* @__PURE__ */ React65.createElement(Box, {
    color: "modalText",
    height: "max"
  }, icon), /* @__PURE__ */ React65.createElement(Box, null, /* @__PURE__ */ React65.createElement(Text2, {
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
  const showRecentTransactions = useContext9(ShowRecentTransactionsContext);
  const [copiedAddress, setCopiedAddress] = useState22(false);
  const copyAddressAction = useCallback31(() => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopiedAddress(true);
    }
  }, [address]);
  useEffect29(() => {
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
  return /* @__PURE__ */ React66.createElement(React66.Fragment, null, /* @__PURE__ */ React66.createElement(Box, {
    display: "flex",
    flexDirection: "column"
  }, /* @__PURE__ */ React66.createElement(Box, {
    background: "profileForeground",
    padding: "16"
  }, /* @__PURE__ */ React66.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "16" : "12",
    justifyContent: "center",
    margin: "8",
    style: { textAlign: "center" }
  }, /* @__PURE__ */ React66.createElement(Box, {
    style: {
      position: "absolute",
      right: 16,
      top: 16,
      willChange: "transform"
    }
  }, /* @__PURE__ */ React66.createElement(DialogClose_default, {
    onClick: onClose
  })), /* @__PURE__ */ React66.createElement(Box, {
    marginTop: mobile ? "24" : "0"
  }, /* @__PURE__ */ React66.createElement(Avatar2, {
    address,
    imageUrl: ensAvatar,
    size: mobile ? 82 : 74
  })), /* @__PURE__ */ React66.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: mobile ? "4" : "0",
    textAlign: "center"
  }, /* @__PURE__ */ React66.createElement(Box, {
    textAlign: "center"
  }, /* @__PURE__ */ React66.createElement(Text2, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: mobile ? "20" : "18",
    weight: "heavy"
  }, accountName)), balanceData && /* @__PURE__ */ React66.createElement(Box, {
    textAlign: "center"
  }, /* @__PURE__ */ React66.createElement(Text2, {
    as: "h1",
    color: "modalTextSecondary",
    id: titleId,
    size: mobile ? "16" : "14",
    weight: "semibold"
  }, displayBalance, " ", balanceData.symbol)))), /* @__PURE__ */ React66.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    gap: "8",
    margin: "2",
    marginTop: "16"
  }, /* @__PURE__ */ React66.createElement(ProfileDetailsAction, {
    action: copyAddressAction,
    icon: copiedAddress ? /* @__PURE__ */ React66.createElement(CopiedIcon, null) : /* @__PURE__ */ React66.createElement(CopyIcon, null),
    label: copiedAddress ? "Copied!" : "Copy Address"
  }), /* @__PURE__ */ React66.createElement(ProfileDetailsAction, {
    action: onDisconnect,
    icon: /* @__PURE__ */ React66.createElement(DisconnectIcon, null),
    label: "Disconnect",
    testId: "disconnect-button"
  }))), showRecentTransactions && /* @__PURE__ */ React66.createElement(React66.Fragment, null, /* @__PURE__ */ React66.createElement(Box, {
    background: "generalBorder",
    height: "1",
    marginTop: "-1"
  }), /* @__PURE__ */ React66.createElement(Box, null, /* @__PURE__ */ React66.createElement(TxList, {
    address
  })))));
}

// src/rainbowkit/src/components/AccountModal/AccountModal.tsx
function AccountModal({ onClose, open }) {
  const { address } = useAccount10();
  const { data: balanceData } = useBalance({ address });
  const ensName = useMainnetEnsName(address);
  const ensAvatar = useMainnetEnsAvatar(ensName);
  const { disconnect } = useDisconnect4();
  const titleId = "rk_account_modal_title";
  if (!address) {
    return null;
  }
  return /* @__PURE__ */ React67.createElement(React67.Fragment, null, address && /* @__PURE__ */ React67.createElement(Dialog, {
    onClose,
    open,
    titleId
  }, /* @__PURE__ */ React67.createElement(DialogContent3, {
    bottomSheetOnMobile: true,
    padding: "0"
  }, /* @__PURE__ */ React67.createElement(ProfileDetails, {
    address,
    balanceData,
    ensAvatar,
    ensName,
    onClose,
    onDisconnect: disconnect
  }))));
}

// src/rainbowkit/src/components/ChainModal/ChainModal.tsx
import React70, { Fragment, useCallback as useCallback32, useContext as useContext10 } from "react";
import { useDisconnect as useDisconnect5, useNetwork as useNetwork5, useSwitchNetwork } from "wagmi";

// src/rainbowkit/src/components/Icons/DisconnectSq.tsx
import React68 from "react";
var DisconnectSqIcon = ({ size }) => /* @__PURE__ */ React68.createElement("svg", {
  fill: "none",
  height: size,
  viewBox: "0 0 28 28",
  width: size,
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React68.createElement("path", {
  d: "M6.742 22.195h8.367c1.774 0 2.743-.968 2.743-2.758V16.11h-2.016v3.11c0 .625-.305.96-.969.96H6.984c-.664 0-.968-.335-.968-.96V7.984c0-.632.304-.968.968-.968h7.883c.664 0 .969.336.969.968v3.133h2.016v-3.36c0-1.78-.97-2.757-2.743-2.757H6.742C4.97 5 4 5.977 4 7.758v11.68c0 1.789.969 2.757 2.742 2.757Zm5.438-7.703h7.601l1.149-.07-.602.406-1.008.938a.816.816 0 0 0-.258.593c0 .407.313.782.758.782.227 0 .39-.086.547-.243l2.492-2.593c.235-.235.313-.47.313-.711 0-.242-.078-.477-.313-.719l-2.492-2.586c-.156-.156-.32-.25-.547-.25-.445 0-.758.367-.758.781 0 .227.094.446.258.594l1.008.945.602.407-1.149-.079H12.18a.904.904 0 0 0 0 1.805Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/MenuButton/MenuButton.tsx
import React69 from "react";

// src/rainbowkit/src/components/MenuButton/MenuButton.css.ts
var unsetBackgroundOnHover = "MenuButton_unsetBackgroundOnHover__1cd9qhx0";

// src/rainbowkit/src/components/MenuButton/MenuButton.tsx
var MenuButton = React69.forwardRef(
  ({
    children,
    currentlySelected = false,
    onClick,
    testId,
    disabled,
    ...urlProps
  }, ref) => {
    const mobile = isMobile();
    return /* @__PURE__ */ React69.createElement(Box, {
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
    }, /* @__PURE__ */ React69.createElement(PixelCube3, {
      pixel_height: 3,
      backgroundColor: `${currentlySelected ? "#343C4F" : "#1D263B"}`,
      borderColor: `${currentlySelected ? "#1649FF" : "#3A4254"}`,
      showHover: true,
      width: "100%"
    }, /* @__PURE__ */ React69.createElement(Box, {
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
  const isW768 = useIsW768();
  const { chain: activeChain } = useNetwork5();
  const { chains, pendingChainId, reset, switchNetwork } = useSwitchNetwork({
    onSettled: () => {
      reset();
      onClose();
    }
  });
  const { disconnect } = useDisconnect5();
  const titleId = "rk_chain_modal_title";
  const mobile = isMobile();
  const unsupportedChain = (_a = activeChain == null ? void 0 : activeChain.unsupported) != null ? _a : false;
  const chainIconSize = "24";
  const { appName } = useContext10(AppContext);
  const rainbowkitChains = useRainbowKitChains();
  const chainClickHandle = useCallback32(
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
  return /* @__PURE__ */ React70.createElement(Dialog, {
    onClose,
    open,
    titleId
  }, /* @__PURE__ */ React70.createElement(DialogContent3, {
    padding: "0",
    bottomSheetOnMobile: true
  }, /* @__PURE__ */ React70.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: isW768 ? "0" : "14",
    marginBottom: "14"
  }, /* @__PURE__ */ React70.createElement(ActivePixelCard, {
    pixel_height: 10,
    className: `tvlPixelTable_header`,
    backgroundColor: "#293457",
    height: "64px",
    hidePixel: isW768
  }, /* @__PURE__ */ React70.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, mobile && /* @__PURE__ */ React70.createElement(Box, {
    width: "30"
  }), /* @__PURE__ */ React70.createElement(Text2, {
    as: "h3",
    color: "modalText",
    weight: "bold",
    id: titleId,
    style: isW768 ? {
      lineHeight: "55px",
      textAlign: "left",
      width: "100%"
    } : void 0
  }, "Switch Networks"))), unsupportedChain && /* @__PURE__ */ React70.createElement(Box, {
    marginLeft: "20",
    marginRight: "20",
    textAlign: mobile ? "center" : "left"
  }, /* @__PURE__ */ React70.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Wrong network detected, switch or disconnect to continue.")), /* @__PURE__ */ React70.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    padding: "2",
    style: { maxHeight: mobile ? "80vh" : "70vh", overflowY: "scroll" }
  }, switchNetwork ? rainbowkitChains.map(({ iconBackground, id, name }, idx) => {
    var _a2;
    const chain = chains.find((c) => c.id === id);
    const isCurrentChain = chain ? chain.id === (activeChain == null ? void 0 : activeChain.id) : false;
    const switching = chain ? !isCurrentChain && chain.id === pendingChainId : false;
    if (!chain) {
      return null;
    }
    return /* @__PURE__ */ React70.createElement(Fragment, {
      key: chain.id
    }, /* @__PURE__ */ React70.createElement(MenuButton, {
      disabled: false,
      currentlySelected: isCurrentChain,
      onClick: () => chainClickHandle({
        isCurrentChain,
        chain
      }),
      testId: `chain-option-${chain.id}`
    }, /* @__PURE__ */ React70.createElement(Box, {
      fontFamily: "body",
      fontSize: "16"
    }, /* @__PURE__ */ React70.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    }, /* @__PURE__ */ React70.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "4",
      height: chainIconSize
    }, /* @__PURE__ */ React70.createElement(Box, {
      height: "full",
      marginRight: "8"
    }, /* @__PURE__ */ React70.createElement(AsyncImage, {
      alt: name != null ? name : chain.name,
      background: iconBackground,
      borderRadius: "full",
      height: chainIconSize,
      src: ChainImage[chain.id],
      width: chainIconSize
    })), /* @__PURE__ */ React70.createElement("div", null, (_a2 = chain.name) != null ? _a2 : name)), isCurrentChain && /* @__PURE__ */ React70.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      marginRight: "6"
    }, /* @__PURE__ */ React70.createElement(Text2, {
      color: "accentColorForeground",
      size: "14",
      weight: "medium"
    }, "Connected"), /* @__PURE__ */ React70.createElement(Box, {
      background: "connectionIndicator",
      borderColor: "connectionIndicatorBorder",
      borderRadius: "full",
      borderStyle: "solid",
      borderWidth: "3",
      height: "12",
      marginLeft: "8",
      width: "12"
    })), switching && /* @__PURE__ */ React70.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      marginRight: "6"
    }, /* @__PURE__ */ React70.createElement(Text2, {
      color: "modalText",
      size: "14",
      weight: "medium"
    }, "Confirm in Wallet"), /* @__PURE__ */ React70.createElement(Box, {
      background: "standby",
      borderRadius: "full",
      height: "12",
      marginLeft: "8",
      width: "12",
      borderColor: "standbyBorder",
      borderStyle: "solid",
      borderWidth: "3"
    }))))), mobile && idx < rainbowkitChains.length - 1 && /* @__PURE__ */ React70.createElement(Box, {
      background: "generalBorderDim",
      height: "1",
      marginX: "8"
    }));
  }) : /* @__PURE__ */ React70.createElement(Box, {
    background: "generalBorder",
    borderRadius: "menuButton",
    paddingX: "18",
    paddingY: "12"
  }, /* @__PURE__ */ React70.createElement(Text2, {
    color: "modalText",
    size: "14",
    weight: "medium"
  }, "Your wallet does not support switching networks from", " ", appName != null ? appName : "this app", ". Try switching networks from within your wallet instead.")), unsupportedChain && /* @__PURE__ */ React70.createElement(React70.Fragment, null, /* @__PURE__ */ React70.createElement(Box, {
    background: "generalBorderDim",
    height: "1",
    marginX: "8"
  }), /* @__PURE__ */ React70.createElement(MenuButton, {
    onClick: () => disconnect(),
    testId: "chain-option-disconnect"
  }, /* @__PURE__ */ React70.createElement(Box, {
    color: "error",
    fontFamily: "body",
    fontSize: "16"
  }, /* @__PURE__ */ React70.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }, /* @__PURE__ */ React70.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "4",
    height: chainIconSize
  }, /* @__PURE__ */ React70.createElement(Box, {
    alignItems: "center",
    color: "error",
    height: chainIconSize,
    justifyContent: "center",
    marginRight: "8"
  }, /* @__PURE__ */ React70.createElement(DisconnectSqIcon, {
    size: Number(chainIconSize)
  })), /* @__PURE__ */ React70.createElement("div", null, "Disconnect")))))))), /* @__PURE__ */ React70.createElement(DialogClose_default, {
    onClick: onClose
  })));
}

// src/rainbowkit/src/components/ConnectModal/ConnectModal.tsx
import React86 from "react";

// src/rainbowkit/src/components/ConnectOptions/ConnectOptions.tsx
import React85 from "react";

// src/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx
import React83, { Fragment as Fragment2, useContext as useContext14, useEffect as useEffect32, useState as useState24 } from "react";

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

// src/rainbowkit/src/components/ConnectModal/ConnectModalIntro.tsx
import React73, { useContext as useContext11 } from "react";

// src/rainbowkit/src/components/Disclaimer/DisclaimerLink.tsx
import React71 from "react";
var DisclaimerLink = ({
  children,
  href
}) => {
  return /* @__PURE__ */ React71.createElement(Box, {
    as: "a",
    color: "accentColor",
    href,
    rel: "noreferrer",
    target: "_blank"
  }, children);
};

// src/rainbowkit/src/components/Disclaimer/DisclaimerText.tsx
import React72 from "react";
var DisclaimerText = ({ children }) => {
  return /* @__PURE__ */ React72.createElement(Text2, {
    color: "modalTextSecondary",
    size: "12",
    weight: "medium"
  }, children);
};

// src/rainbowkit/src/components/ConnectModal/ConnectModalIntro.tsx
function ConnectModalIntro({
  compactModeEnabled = false,
  getWallet
}) {
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext11(AppContext);
  return /* @__PURE__ */ React73.createElement(React73.Fragment, null, /* @__PURE__ */ React73.createElement(Box, {
    alignItems: "center",
    color: "accentColor",
    display: "flex",
    flexDirection: "column",
    height: "full",
    justifyContent: "space-around"
  }, /* @__PURE__ */ React73.createElement(Box, {
    marginBottom: "10"
  }, !compactModeEnabled && /* @__PURE__ */ React73.createElement(Text2, {
    color: "modalText",
    size: "18",
    weight: "heavy"
  }, "What is a Wallet?")), /* @__PURE__ */ React73.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "32",
    justifyContent: "center",
    marginY: "20",
    style: { maxWidth: 312 }
  }, /* @__PURE__ */ React73.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16"
  }, /* @__PURE__ */ React73.createElement(Box, {
    borderRadius: "6",
    height: "48",
    minWidth: "48",
    width: "48"
  }, /* @__PURE__ */ React73.createElement(AssetsIcon, null)), /* @__PURE__ */ React73.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, /* @__PURE__ */ React73.createElement(Text2, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "A Home for your Digital Assets"), /* @__PURE__ */ React73.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Wallets are used to send, receive, store, and display digital assets like Ethereum and NFTs."))), /* @__PURE__ */ React73.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "16"
  }, /* @__PURE__ */ React73.createElement(Box, {
    borderRadius: "6",
    height: "48",
    minWidth: "48",
    width: "48"
  }, /* @__PURE__ */ React73.createElement(LoginIcon, null)), /* @__PURE__ */ React73.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4"
  }, /* @__PURE__ */ React73.createElement(Text2, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "A New Way to Log In"), /* @__PURE__ */ React73.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "Instead of creating new accounts and passwords on every website, just connect your wallet.")))), /* @__PURE__ */ React73.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    margin: "10"
  }, /* @__PURE__ */ React73.createElement(ActionButton, {
    label: "Get a Wallet",
    onClick: getWallet
  }), /* @__PURE__ */ React73.createElement(Box, {
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
  }, /* @__PURE__ */ React73.createElement(Text2, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))), Disclaimer && !compactModeEnabled && /* @__PURE__ */ React73.createElement(Box, {
    marginBottom: "8",
    marginTop: "12",
    textAlign: "center"
  }, /* @__PURE__ */ React73.createElement(Disclaimer, {
    Link: DisclaimerLink,
    Text: DisclaimerText
  }))));
}

// src/rainbowkit/src/components/Icons/Back.tsx
import React74 from "react";
var BackIcon = () => /* @__PURE__ */ React74.createElement("svg", {
  fill: "none",
  height: "17",
  viewBox: "0 0 11 17",
  width: "11",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React74.createElement("path", {
  d: "M0.99707 8.6543C0.99707 9.08496 1.15527 9.44531 1.51562 9.79688L8.16016 16.3096C8.43262 16.5732 8.74902 16.7051 9.13574 16.7051C9.90918 16.7051 10.5508 16.0811 10.5508 15.3076C10.5508 14.9121 10.3838 14.5605 10.0938 14.2705L4.30176 8.64551L10.0938 3.0293C10.3838 2.74805 10.5508 2.3877 10.5508 2.00098C10.5508 1.23633 9.90918 0.603516 9.13574 0.603516C8.74902 0.603516 8.43262 0.735352 8.16016 0.999023L1.51562 7.51172C1.15527 7.85449 1.00586 8.21484 0.99707 8.6543Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/InfoButton/InfoButton.tsx
import React76 from "react";

// src/rainbowkit/src/components/Icons/Info.tsx
import React75 from "react";
var InfoIcon = () => /* @__PURE__ */ React75.createElement("svg", {
  fill: "none",
  height: "12",
  viewBox: "0 0 8 12",
  width: "8",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React75.createElement("path", {
  d: "M3.64258 7.99609C4.19336 7.99609 4.5625 7.73828 4.68555 7.24609C4.69141 7.21094 4.70312 7.16406 4.70898 7.13477C4.80859 6.60742 5.05469 6.35547 6.04492 5.76367C7.14648 5.10156 7.67969 4.3457 7.67969 3.24414C7.67969 1.39844 6.17383 0.255859 3.95898 0.255859C2.32422 0.255859 1.05859 0.894531 0.548828 1.86719C0.396484 2.14844 0.320312 2.44727 0.320312 2.74023C0.314453 3.37305 0.742188 3.79492 1.42188 3.79492C1.91406 3.79492 2.33594 3.54883 2.53516 3.11523C2.78711 2.47656 3.23242 2.21289 3.83594 2.21289C4.55664 2.21289 5.10742 2.65234 5.10742 3.29102C5.10742 3.9707 4.7793 4.29883 3.81836 4.87891C3.02148 5.36523 2.50586 5.92773 2.50586 6.76562V6.90039C2.50586 7.55664 2.96289 7.99609 3.64258 7.99609ZM3.67188 11.4473C4.42773 11.4473 5.04297 10.8672 5.04297 10.1406C5.04297 9.41406 4.42773 8.83984 3.67188 8.83984C2.91602 8.83984 2.30664 9.41406 2.30664 10.1406C2.30664 10.8672 2.91602 11.4473 3.67188 11.4473Z",
  fill: "currentColor"
}));

// src/rainbowkit/src/components/InfoButton/InfoButton.tsx
var InfoButton = ({
  "aria-label": ariaLabel = "Info",
  onClick
}) => {
  const mobile = isMobile();
  return /* @__PURE__ */ React76.createElement(Box, {
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
  }, /* @__PURE__ */ React76.createElement(InfoIcon, null));
};

// src/rainbowkit/src/components/ModalSelection/ModalSelection.tsx
import React77, { useState as useState23 } from "react";

// src/rainbowkit/src/components/RainbowKitProvider/useCoolMode.ts
import { useContext as useContext12, useEffect as useEffect30, useRef as useRef10 } from "react";
var useCoolMode = (imageUrl) => {
  const ref = useRef10(null);
  const coolModeEnabled = useContext12(CoolModeContext);
  const resolvedImageUrl = useAsyncImage(imageUrl);
  useEffect30(() => {
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
    [
      "overflow:hidden",
      "position:fixed",
      "height:100%",
      "top:0",
      "left:0",
      "right:0",
      "bottom:0",
      "pointer-events:none",
      "z-index:2147483647"
    ].join(";")
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
    particle.innerHTML = ` <img decoding="async" loading="lazy" src="${imageUrl}" width="${size}" height="${size}" style="border-radius: 25%">`;
    particle.setAttribute(
      "style",
      [
        "position:absolute",
        "will-change:transform",
        `top:${top}px`,
        `left:${left}px`,
        `transform:rotate(${spinVal}deg)`
      ].join(";")
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
        [
          "position:absolute",
          "will-change:transform",
          `top:${p.top}px`,
          `left:${p.left}px`,
          `transform:rotate(${p.spinVal}deg)`
        ].join(";")
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
var transparentBorder = "ModalSelection_transparentBorder__kkue9x0";

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
  const [isMouseOver, setIsMouseOver] = useState23(false);
  return /* @__PURE__ */ React77.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    onMouseEnter: () => setIsMouseOver(true),
    onMouseLeave: () => setIsMouseOver(false),
    ref: coolModeRef
  }, /* @__PURE__ */ React77.createElement(ActivePixelCard, {
    pixel_height: 4,
    ...currentlySelected ? {
      backgroundColor: "#1649FF"
    } : {
      backgroundColor: "#3A4254"
    }
  }, /* @__PURE__ */ React77.createElement(Box, {
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
  }, /* @__PURE__ */ React77.createElement(Box, {
    color: currentlySelected ? "accentColorForeground" : "modalText",
    disabled: !ready,
    fontFamily: "body",
    fontSize: "16",
    fontWeight: "bold",
    transition: "default"
  }, /* @__PURE__ */ React77.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "12",
    width: "max"
  }, /* @__PURE__ */ React77.createElement(AsyncImage, {
    background: iconBackground,
    ...isMouseOver ? {} : { borderColor: "actionButtonBorder" },
    borderRadius: "6",
    height: "28",
    src: iconUrl,
    width: "28"
  }), /* @__PURE__ */ React77.createElement(Box, null, /* @__PURE__ */ React77.createElement(Box, {
    style: { marginTop: recent ? -2 : void 0 }
  }, name), recent && /* @__PURE__ */ React77.createElement(Text2, {
    color: currentlySelected ? "accentColorForeground" : "accentColor",
    size: "12",
    style: { lineHeight: 1, marginTop: -1 },
    weight: "medium"
  }, "Recent")))))));
};
ModalSelection.displayName = "ModalSelection";

// src/rainbowkit/src/components/ConnectOptions/ConnectDetails.tsx
import React82, { useContext as useContext13, useEffect as useEffect31 } from "react";

// src/rainbowkit/src/components/Icons/Create.tsx
import React78 from "react";
var src3 = async () => (await import("./create-FJBUAUYV.js")).default;
var preloadCreateIcon = () => loadImages(src3);
var CreateIcon = () => /* @__PURE__ */ React78.createElement(AsyncImage, {
  background: "#e3a5e8",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src3,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Refresh.tsx
import React79 from "react";
var src4 = async () => (await import("./refresh-IPTTFCYG.js")).default;
var preloadRefreshIcon = () => loadImages(src4);
var RefreshIcon = () => /* @__PURE__ */ React79.createElement(AsyncImage, {
  background: "#515a70",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src4,
  width: "48"
});

// src/rainbowkit/src/components/Icons/Scan.tsx
import React80 from "react";
var src5 = async () => (await import("./scan-WU4WMXIE.js")).default;
var preloadScanIcon = () => loadImages(src5);
var ScanIcon = () => /* @__PURE__ */ React80.createElement(AsyncImage, {
  background: "#515a70",
  borderColor: "generalBorder",
  borderRadius: "10",
  height: "48",
  src: src5,
  width: "48"
});

// src/rainbowkit/src/components/QRCode/QRCode.tsx
import QRCodeUtil from "qrcode";
import React81, { useMemo as useMemo16 } from "react";

// src/rainbowkit/src/components/ConnectOptions/DesktopOptions.css.ts
var QRCodeBackgroundClassName = "DesktopOptions_QRCodeBackgroundClassName__vrwex40";
var ScrollClassName = "DesktopOptions_ScrollClassName__vrwex42 sprinkles_paddingLeft_18__dmay2079 sprinkles_paddingRight_18__dmay207u";
var sidebar = "DesktopOptions_sidebar__vrwex43";
var sidebarCompactMode = "DesktopOptions_sidebarCompactMode__vrwex44";

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
  const dots = useMemo16(() => {
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
          /* @__PURE__ */ React81.createElement("rect", {
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
                /* @__PURE__ */ React81.createElement("circle", {
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
  return /* @__PURE__ */ React81.createElement(Box, {
    borderColor: "generalBorder",
    borderRadius: "menuButton",
    borderStyle: "solid",
    borderWidth: "1",
    className: QRCodeBackgroundClassName,
    padding,
    width: "max"
  }, /* @__PURE__ */ React81.createElement(Box, {
    style: {
      height: size,
      userSelect: "none",
      width: size
    },
    userSelect: "none"
  }, /* @__PURE__ */ React81.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    style: {
      height: 0,
      top: logoPosition,
      width: size
    },
    width: "full"
  }, /* @__PURE__ */ React81.createElement(AsyncImage, {
    background: logoBackground,
    borderColor: { custom: "rgba(0, 0, 0, 0.06)" },
    borderRadius: "13",
    height: logoSize,
    src: logoUrl,
    width: logoSize
  })), /* @__PURE__ */ React81.createElement("svg", {
    height: size,
    style: { all: "revert" },
    width: size
  }, /* @__PURE__ */ React81.createElement("defs", null, /* @__PURE__ */ React81.createElement("clipPath", {
    id: "clip-wrapper"
  }, /* @__PURE__ */ React81.createElement("rect", {
    height: logoWrapperSize,
    width: logoWrapperSize
  })), /* @__PURE__ */ React81.createElement("clipPath", {
    id: "clip-logo"
  }, /* @__PURE__ */ React81.createElement("rect", {
    height: logoSize,
    width: logoSize
  }))), /* @__PURE__ */ React81.createElement("rect", {
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
  return /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    marginTop: "18",
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
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
    return /* @__PURE__ */ React82.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "16",
      justifyContent: "space-between",
      key: wallet.id,
      width: "full"
    }, /* @__PURE__ */ React82.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16"
    }, /* @__PURE__ */ React82.createElement(AsyncImage, {
      background: iconBackground,
      borderColor: "actionButtonBorder",
      borderRadius: "10",
      height: "48",
      src: iconUrl,
      width: "48"
    }), /* @__PURE__ */ React82.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "2"
    }, /* @__PURE__ */ React82.createElement(Text2, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, name), /* @__PURE__ */ React82.createElement(Text2, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, hasMobileAndExtension ? "Mobile Wallet and Extension" : hasMobileCompanionApp ? "Mobile Wallet" : hasExtension ? "Browser Extension" : null))), /* @__PURE__ */ React82.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React82.createElement(ActionButton, {
      label: "GET",
      onClick: () => getWalletDownload(id),
      type: "secondary"
    })));
  })), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "column",
    gap: "8",
    justifyContent: "space-between",
    marginBottom: "4",
    paddingY: "8",
    style: { maxWidth: 275, textAlign: "center" }
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, "Not what you\u2019re looking for?"), /* @__PURE__ */ React82.createElement(Text2, {
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
  useEffect31(() => {
    preloadBrowserIcon();
  }, []);
  return /* @__PURE__ */ React82.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, hasQrCode ? /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    height: "full",
    justifyContent: "center"
  }, /* @__PURE__ */ React82.createElement(QRCode, {
    logoBackground: iconBackground,
    logoSize: compactModeEnabled ? 60 : 72,
    logoUrl: iconUrl,
    size: compactModeEnabled ? 318 : smallWindow ? Math.max(280, Math.min(windowWidth - 308, 382)) : 382,
    uri: qrCodeUri
  })) : /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    style: { flexGrow: 1 }
  }, /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8"
  }, /* @__PURE__ */ React82.createElement(Box, {
    borderRadius: "10",
    height: LOGO_SIZE,
    overflow: "hidden"
  }, /* @__PURE__ */ React82.createElement(AsyncImage, {
    height: LOGO_SIZE,
    src: iconUrl,
    width: LOGO_SIZE
  })), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "4",
    paddingX: "32",
    style: { textAlign: "center" }
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalText",
    size: "18",
    weight: "bold"
  }, ready ? `Opening ${name}...` : hasExtension ? `${name} is not installed` : `${name} is not available`), !ready && hasExtension ? /* @__PURE__ */ React82.createElement(Box, {
    paddingTop: "20"
  }, /* @__PURE__ */ React82.createElement(ActionButton, {
    href: wallet.extensionDownloadUrl,
    label: "INSTALL",
    type: "secondary"
  })) : null, ready && !hasQrCode && /* @__PURE__ */ React82.createElement(React82.Fragment, null, /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    textAlign: "center",
    weight: "medium"
  }, "Confirm connection in the extension")), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    color: "modalText",
    display: "flex",
    flexDirection: "row",
    height: "32",
    marginTop: "8"
  }, connectionError ? /* @__PURE__ */ React82.createElement(ActionButton, {
    label: "RETRY",
    onClick: getDesktopDeepLink ? async () => {
      const uri = await getDesktopDeepLink();
      window.open(uri, safari ? "_blank" : "_self");
    } : () => {
      reconnect(wallet);
    }
  }) : /* @__PURE__ */ React82.createElement(Box, {
    color: "modalTextSecondary"
  }, /* @__PURE__ */ React82.createElement(SpinnerIcon, null))))))), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "row",
    gap: "8",
    height: "28",
    justifyContent: "space-between",
    marginTop: "12"
  }, ready && secondaryAction && /* @__PURE__ */ React82.createElement(React82.Fragment, null, /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, secondaryAction.description), /* @__PURE__ */ React82.createElement(ActionButton, {
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
  return /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    borderRadius: "13",
    display: "flex",
    justifyContent: "center",
    overflow: "hidden",
    paddingX: isCompact ? "18" : "44",
    position: "relative",
    style: { flex: 1, isolation: "isolate" },
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
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
  }), isBrowserCard && /* @__PURE__ */ React82.createElement(Box, {
    background: "downloadTopCardBackground",
    height: "full",
    position: "absolute",
    style: {
      zIndex: 0
    },
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
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
  }, /* @__PURE__ */ React82.createElement(Box, {
    style: {
      filter: "blur(100px)",
      marginLeft: -27,
      marginTop: -20,
      opacity: 0.6,
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React82.createElement(AsyncImage, {
    borderRadius: "full",
    height: "200",
    src: iconUrl,
    width: "200"
  })), /* @__PURE__ */ React82.createElement(Box, {
    style: {
      filter: "blur(100px)",
      marginRight: 0,
      marginTop: 105,
      opacity: 0.6,
      overflow: "auto",
      transform: "translate3d(0, 0, 0)"
    }
  }, /* @__PURE__ */ React82.createElement(AsyncImage, {
    borderRadius: "full",
    height: "200",
    src: iconUrl,
    width: "200"
  })))), !isBrowserCard && gradientRgbas && /* @__PURE__ */ React82.createElement(Box, {
    background: "downloadBottomCardBackground",
    style: {
      bottom: "0",
      left: "0",
      position: "absolute",
      right: "0",
      top: "0"
    }
  }, /* @__PURE__ */ React82.createElement(Box, {
    position: "absolute",
    style: {
      background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[0]} 0%, ${gradientRgbas[1]} 25%, rgba(0,0,0,0) 100%)`,
      height: 564,
      left: -215,
      top: -197,
      transform: "translate3d(0, 0, 0)",
      width: 564
    }
  }), /* @__PURE__ */ React82.createElement(Box, {
    position: "absolute",
    style: {
      background: `radial-gradient(50% 50% at 50% 50%, ${gradientRgbas[2]} 0%, rgba(0, 0, 0, 0) 100%)`,
      height: 564,
      left: -1,
      top: -76,
      transform: "translate3d(0, 0, 0)",
      width: 564
    }
  })), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "row",
    gap: "24",
    height: "max",
    justifyContent: "center",
    style: { zIndex: 1 }
  }, /* @__PURE__ */ React82.createElement(Box, null, /* @__PURE__ */ React82.createElement(AsyncImage, {
    height: "60",
    src: iconUrl,
    width: "60",
    ...iconBackground ? {
      background: iconBackground,
      borderColor: "generalBorder",
      borderRadius: "10"
    } : null
  })), /* @__PURE__ */ React82.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "4",
    style: { flex: 1 },
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalText",
    size: "14",
    weight: "bold"
  }, title), /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, description), /* @__PURE__ */ React82.createElement(Box, {
    marginTop: "14",
    width: "max"
  }, /* @__PURE__ */ React82.createElement(ActionButton, {
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
  const modalSize = useContext13(ModalSizeContext);
  const isCompact = modalSize === "compact";
  const { extension, extensionDownloadUrl, mobileDownloadUrl } = wallet;
  useEffect31(() => {
    preloadCreateIcon();
    preloadScanIcon();
    preloadRefreshIcon();
  }, []);
  return /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    height: "full",
    marginBottom: "8",
    marginTop: "4",
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8",
    height: "full",
    justifyContent: "center",
    width: "full"
  }, extensionDownloadUrl && /* @__PURE__ */ React82.createElement(DownloadOptionsBox, {
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
  }), mobileDownloadUrl && /* @__PURE__ */ React82.createElement(DownloadOptionsBox, {
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
  useEffect31(() => {
    preloadCreateIcon();
    preloadScanIcon();
  }, []);
  return /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "24",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
    style: { maxWidth: 220, textAlign: "center" }
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "semibold"
  }, "Scan with your phone to download on iOS or Android")), /* @__PURE__ */ React82.createElement(Box, {
    height: "full"
  }, (downloadUrls == null ? void 0 : downloadUrls.qrCode) ? /* @__PURE__ */ React82.createElement(QRCode, {
    logoSize: 0,
    size: 268,
    uri: downloadUrls.qrCode
  }) : null), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    borderRadius: "10",
    display: "flex",
    flexDirection: "row",
    gap: "8",
    height: "34",
    justifyContent: "space-between",
    marginBottom: "12",
    paddingY: "8"
  }, /* @__PURE__ */ React82.createElement(ActionButton, {
    label: "Continue",
    onClick: () => changeWalletStep(
      (qrCode == null ? void 0 : qrCode.instructions) ? "INSTRUCTIONS_MOBILE" /* InstructionsMobile */ : "CONNECT" /* Connect */
    )
  })));
}
var stepIcons = {
  create: () => /* @__PURE__ */ React82.createElement(CreateIcon, null),
  install: (wallet) => /* @__PURE__ */ React82.createElement(AsyncImage, {
    background: wallet.iconBackground,
    borderColor: "generalBorder",
    borderRadius: "10",
    height: "48",
    src: wallet.iconUrl,
    width: "48"
  }),
  refresh: () => /* @__PURE__ */ React82.createElement(RefreshIcon, null),
  scan: () => /* @__PURE__ */ React82.createElement(ScanIcon, null)
};
function InstructionMobileDetail({
  connectWallet,
  wallet
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    justifyContent: "center",
    paddingY: "32",
    style: { maxWidth: 320 }
  }, (_b = (_a = wallet == null ? void 0 : wallet.qrCode) == null ? void 0 : _a.instructions) == null ? void 0 : _b.steps.map((d, idx) => {
    var _a2;
    return /* @__PURE__ */ React82.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16",
      key: idx
    }, /* @__PURE__ */ React82.createElement(Box, {
      borderRadius: "10",
      height: "48",
      minWidth: "48",
      overflow: "hidden",
      position: "relative",
      width: "48"
    }, (_a2 = stepIcons[d.step]) == null ? void 0 : _a2.call(stepIcons, wallet)), /* @__PURE__ */ React82.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React82.createElement(Text2, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, d.title), /* @__PURE__ */ React82.createElement(Text2, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, d.description)));
  })), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    marginBottom: "16"
  }, /* @__PURE__ */ React82.createElement(ActionButton, {
    label: "Connect",
    onClick: () => connectWallet(wallet)
  }), /* @__PURE__ */ React82.createElement(Box, {
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
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))));
}
function InstructionExtensionDetail({
  wallet
}) {
  var _a, _b, _c, _d;
  return /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "full",
    width: "full"
  }, /* @__PURE__ */ React82.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    gap: "28",
    height: "full",
    justifyContent: "center",
    paddingY: "32",
    style: { maxWidth: 320 }
  }, (_b = (_a = wallet == null ? void 0 : wallet.extension) == null ? void 0 : _a.instructions) == null ? void 0 : _b.steps.map((d, idx) => {
    var _a2;
    return /* @__PURE__ */ React82.createElement(Box, {
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
      gap: "16",
      key: idx
    }, /* @__PURE__ */ React82.createElement(Box, {
      borderRadius: "10",
      height: "48",
      minWidth: "48",
      overflow: "hidden",
      position: "relative",
      width: "48"
    }, (_a2 = stepIcons[d.step]) == null ? void 0 : _a2.call(stepIcons, wallet)), /* @__PURE__ */ React82.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, /* @__PURE__ */ React82.createElement(Text2, {
      color: "modalText",
      size: "14",
      weight: "bold"
    }, d.title), /* @__PURE__ */ React82.createElement(Text2, {
      color: "modalTextSecondary",
      size: "14",
      weight: "medium"
    }, d.description)));
  })), /* @__PURE__ */ React82.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12",
    justifyContent: "center",
    marginBottom: "16"
  }, /* @__PURE__ */ React82.createElement(ActionButton, {
    label: "Refresh",
    onClick: window.location.reload.bind(window.location)
  }), /* @__PURE__ */ React82.createElement(Box, {
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
  }, /* @__PURE__ */ React82.createElement(Text2, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More"))));
}

// src/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx
function DesktopOptions({ onClose }) {
  const titleId = "rk_connect_title";
  const safari = isSafari();
  const [selectedOptionId, setSelectedOptionId] = useState24();
  const [selectedWallet, setSelectedWallet] = useState24();
  const [qrCodeUri, setQrCodeUri] = useState24();
  const hasQrCode = !!(selectedWallet == null ? void 0 : selectedWallet.qrCode) && qrCodeUri;
  const [connectionError, setConnectionError] = useState24(false);
  const modalSize = useContext14(ModalSizeContext);
  const compactModeEnabled = modalSize === ModalSizeOptions.COMPACT;
  const { disclaimer: Disclaimer } = useContext14(AppContext);
  const wallets = useWalletConnectors().filter((wallet) => wallet.ready || !!wallet.extensionDownloadUrl).sort((a, b) => a.groupIndex - b.groupIndex);
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
  const [initialWalletStep, setInitialWalletStep] = useState24(
    "NONE" /* None */
  );
  const [walletStep, setWalletStep] = useState24("NONE" /* None */);
  let walletContent = null;
  let headerLabel = null;
  let headerBackButtonLink = null;
  let headerBackButtonCallback;
  useEffect32(() => {
    setConnectionError(false);
  }, [walletStep, selectedWallet]);
  const hasExtension = !!(selectedWallet == null ? void 0 : selectedWallet.extensionDownloadUrl);
  const hasExtensionAndMobile = !!(hasExtension && (selectedWallet == null ? void 0 : selectedWallet.mobileDownloadUrl));
  switch (walletStep) {
    case "NONE" /* None */:
      walletContent = /* @__PURE__ */ React83.createElement(ConnectModalIntro, {
        getWallet: () => changeWalletStep("GET" /* Get */)
      });
      break;
    case "LEARN_COMPACT" /* LearnCompact */:
      walletContent = /* @__PURE__ */ React83.createElement(ConnectModalIntro, {
        compactModeEnabled,
        getWallet: () => changeWalletStep("GET" /* Get */)
      });
      headerLabel = "What is a Wallet?";
      headerBackButtonLink = "NONE" /* None */;
      break;
    case "GET" /* Get */:
      walletContent = /* @__PURE__ */ React83.createElement(GetDetail, {
        getWalletDownload
      });
      headerLabel = "Get a Wallet";
      headerBackButtonLink = compactModeEnabled ? "LEARN_COMPACT" /* LearnCompact */ : "NONE" /* None */;
      break;
    case "CONNECT" /* Connect */:
      walletContent = selectedWallet && /* @__PURE__ */ React83.createElement(ConnectDetail, {
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
      walletContent = selectedWallet && /* @__PURE__ */ React83.createElement(DownloadOptionsDetail, {
        changeWalletStep,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile && "CONNECT" /* Connect */ ? initialWalletStep : null;
      break;
    case "DOWNLOAD" /* Download */:
      walletContent = selectedWallet && /* @__PURE__ */ React83.createElement(DownloadDetail, {
        changeWalletStep,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Install ${selectedWallet.name}`;
      headerBackButtonLink = hasExtensionAndMobile ? "DOWNLOAD_OPTIONS" /* DownloadOptions */ : initialWalletStep;
      break;
    case "INSTRUCTIONS_MOBILE" /* InstructionsMobile */:
      walletContent = selectedWallet && /* @__PURE__ */ React83.createElement(InstructionMobileDetail, {
        connectWallet: selectWallet,
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get started with ${compactModeEnabled ? selectedWallet.shortName || selectedWallet.name : selectedWallet.name}`;
      headerBackButtonLink = "DOWNLOAD" /* Download */;
      break;
    case "INSTRUCTIONS_EXTENSION" /* InstructionsExtension */:
      walletContent = selectedWallet && /* @__PURE__ */ React83.createElement(InstructionExtensionDetail, {
        wallet: selectedWallet
      });
      headerLabel = selectedWallet && `Get started with ${compactModeEnabled ? selectedWallet.shortName || selectedWallet.name : selectedWallet.name}`;
      headerBackButtonLink = "DOWNLOAD_OPTIONS" /* DownloadOptions */;
      break;
    default:
      break;
  }
  return /* @__PURE__ */ React83.createElement(Box, {
    display: "flex",
    flexDirection: "row",
    style: { maxHeight: compactModeEnabled ? 468 : 504 }
  }, (compactModeEnabled ? walletStep === "NONE" /* None */ : true) && /* @__PURE__ */ React83.createElement(Box, {
    className: compactModeEnabled ? sidebarCompactMode : sidebar,
    display: "flex",
    flexDirection: "column",
    marginTop: "16"
  }, /* @__PURE__ */ React83.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, compactModeEnabled && Disclaimer && /* @__PURE__ */ React83.createElement(Box, {
    marginLeft: "16",
    width: "28"
  }, /* @__PURE__ */ React83.createElement(InfoButton, {
    onClick: () => changeWalletStep("LEARN_COMPACT" /* LearnCompact */)
  })), compactModeEnabled && !Disclaimer && /* @__PURE__ */ React83.createElement(Box, {
    marginLeft: "16",
    width: "28"
  }), /* @__PURE__ */ React83.createElement(Box, {
    marginLeft: compactModeEnabled ? "0" : "6",
    paddingBottom: "8",
    paddingTop: "2",
    paddingX: "18"
  }, /* @__PURE__ */ React83.createElement(Text2, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: "18",
    weight: "heavy"
  }, "Connect a Wallet")), compactModeEnabled && /* @__PURE__ */ React83.createElement(Box, {
    marginRight: "16"
  }, /* @__PURE__ */ React83.createElement(DialogClose_default, {
    onClick: onClose
  }))), /* @__PURE__ */ React83.createElement(Box, {
    className: ScrollClassName,
    paddingBottom: "18"
  }, Object.entries(groupedWallets).map(
    ([groupName, wallets2], index) => wallets2.length > 0 && /* @__PURE__ */ React83.createElement(Fragment2, {
      key: index
    }, groupName ? /* @__PURE__ */ React83.createElement(Box, {
      marginBottom: "8",
      marginTop: "16",
      marginX: "6"
    }, /* @__PURE__ */ React83.createElement(Text2, {
      color: "modalTextSecondary",
      size: "14",
      weight: "bold"
    }, groupName)) : null, /* @__PURE__ */ React83.createElement(Box, {
      display: "flex",
      flexDirection: "column",
      gap: "4"
    }, wallets2.map((wallet) => {
      return /* @__PURE__ */ React83.createElement(ModalSelection, {
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
  )), compactModeEnabled && /* @__PURE__ */ React83.createElement(React83.Fragment, null, /* @__PURE__ */ React83.createElement(Box, {
    background: "generalBorder",
    height: "1",
    marginTop: "-1"
  }), Disclaimer ? /* @__PURE__ */ React83.createElement(Box, {
    paddingX: "24",
    paddingY: "16",
    textAlign: "center"
  }, /* @__PURE__ */ React83.createElement(Disclaimer, {
    Link: DisclaimerLink,
    Text: DisclaimerText
  })) : /* @__PURE__ */ React83.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    paddingX: "24",
    paddingY: "16"
  }, /* @__PURE__ */ React83.createElement(Box, {
    paddingY: "4"
  }, /* @__PURE__ */ React83.createElement(Text2, {
    color: "modalTextSecondary",
    size: "14",
    weight: "medium"
  }, "New to Ethereum wallets?")), /* @__PURE__ */ React83.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: "4",
    justifyContent: "center"
  }, /* @__PURE__ */ React83.createElement(Box, {
    className: touchableStyles({
      active: "shrink",
      hover: "grow"
    }),
    cursor: "pointer",
    onClick: () => changeWalletStep("LEARN_COMPACT" /* LearnCompact */),
    paddingY: "4",
    style: { willChange: "transform" },
    transition: "default"
  }, /* @__PURE__ */ React83.createElement(Text2, {
    color: "accentColor",
    size: "14",
    weight: "bold"
  }, "Learn More")))))), (compactModeEnabled ? walletStep !== "NONE" /* None */ : true) && /* @__PURE__ */ React83.createElement(React83.Fragment, null, !compactModeEnabled && /* @__PURE__ */ React83.createElement(Box, {
    background: "generalBorder",
    minWidth: "1",
    width: "1"
  }), /* @__PURE__ */ React83.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    margin: "16",
    style: { flexGrow: 1 }
  }, /* @__PURE__ */ React83.createElement(Box, {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12"
  }, /* @__PURE__ */ React83.createElement(Box, {
    width: "28"
  }, headerBackButtonLink && /* @__PURE__ */ React83.createElement(Box, {
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
  }, /* @__PURE__ */ React83.createElement(BackIcon, null))), /* @__PURE__ */ React83.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    style: { flexGrow: 1 }
  }, headerLabel && /* @__PURE__ */ React83.createElement(Text2, {
    color: "modalText",
    size: "18",
    textAlign: "center",
    weight: "heavy"
  }, headerLabel)), /* @__PURE__ */ React83.createElement(DialogClose_default, {
    onClick: onClose
  })), /* @__PURE__ */ React83.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    style: { minHeight: compactModeEnabled ? 396 : 432 }
  }, /* @__PURE__ */ React83.createElement(Box, {
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
import React84, { useCallback as useCallback33, useContext as useContext15, useState as useState25 } from "react";

// src/rainbowkit/src/components/ConnectOptions/MobileOptions.css.ts
var scroll = "MobileOptions_scroll__1656yi90";

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
  return /* @__PURE__ */ React84.createElement(Box, {
    as: "button",
    color: ready ? "modalText" : "modalTextSecondary",
    disabled: !ready,
    fontFamily: "body",
    key: id,
    onClick: useCallback33(async () => {
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
  }, /* @__PURE__ */ React84.createElement(Box, {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, /* @__PURE__ */ React84.createElement(Box, {
    paddingBottom: "8",
    paddingTop: "10"
  }, /* @__PURE__ */ React84.createElement(AsyncImage, {
    background: iconBackground,
    borderRadius: "13",
    boxShadow: "walletLogo",
    height: "60",
    src: iconUrl,
    width: "60"
  })), /* @__PURE__ */ React84.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    textAlign: "center"
  }, /* @__PURE__ */ React84.createElement(Text2, {
    as: "h2",
    color: wallet.ready ? "modalText" : "modalTextSecondary",
    size: "13",
    weight: "medium"
  }, /* @__PURE__ */ React84.createElement(Box, {
    as: "span",
    position: "relative"
  }, shortName != null ? shortName : name, !wallet.ready && " (unsupported)")), wallet.recent && /* @__PURE__ */ React84.createElement(Text2, {
    color: "accentColor",
    size: "12",
    weight: "medium"
  }, "Recent"))));
}
function MobileOptions({ onClose }) {
  var _a;
  const titleId = "rk_connect_title";
  const wallets = useWalletConnectors();
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext15(AppContext);
  let headerLabel = null;
  let walletContent = null;
  let headerBackgroundContrast = false;
  let headerBackButtonLink = null;
  const [walletStep, setWalletStep] = useState25(
    "CONNECT" /* Connect */
  );
  const ios = isIOS();
  switch (walletStep) {
    case "CONNECT" /* Connect */: {
      headerLabel = "Connect a Wallet";
      headerBackgroundContrast = true;
      walletContent = /* @__PURE__ */ React84.createElement(Box, null, /* @__PURE__ */ React84.createElement(Box, {
        background: "profileForeground",
        className: scroll,
        display: "flex",
        paddingBottom: "20",
        paddingTop: "6"
      }, /* @__PURE__ */ React84.createElement(Box, {
        display: "flex",
        style: { margin: "0 auto" }
      }, wallets.filter((wallet) => wallet.ready).map((wallet) => {
        return /* @__PURE__ */ React84.createElement(Box, {
          key: wallet.id,
          paddingX: "20"
        }, /* @__PURE__ */ React84.createElement(Box, {
          width: "60"
        }, /* @__PURE__ */ React84.createElement(WalletButton, {
          onClose,
          wallet
        })));
      }))), /* @__PURE__ */ React84.createElement(Box, {
        background: "generalBorder",
        height: "1",
        marginBottom: "32",
        marginTop: "-1"
      }), /* @__PURE__ */ React84.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "32",
        paddingX: "32",
        style: { textAlign: "center" }
      }, /* @__PURE__ */ React84.createElement(Box, {
        display: "flex",
        flexDirection: "column",
        gap: "8",
        textAlign: "center"
      }, /* @__PURE__ */ React84.createElement(Text2, {
        color: "modalText",
        size: "16",
        weight: "bold"
      }, "What is a Wallet?"), /* @__PURE__ */ React84.createElement(Text2, {
        color: "modalTextSecondary",
        size: "16"
      }, "A wallet is used to send, receive, store, and display digital assets. It\u2019s also a new way to log in, without needing to create new accounts and passwords on\xA0every\xA0website."))), /* @__PURE__ */ React84.createElement(Box, {
        paddingTop: "32",
        paddingX: "20"
      }, /* @__PURE__ */ React84.createElement(Box, {
        display: "flex",
        gap: "14",
        justifyContent: "center"
      }, /* @__PURE__ */ React84.createElement(ActionButton, {
        label: "Get a Wallet",
        onClick: () => setWalletStep("GET" /* Get */),
        size: "large",
        type: "secondary"
      }), /* @__PURE__ */ React84.createElement(ActionButton, {
        href: learnMoreUrl,
        label: "Learn More",
        size: "large",
        type: "secondary"
      }))), Disclaimer && /* @__PURE__ */ React84.createElement(Box, {
        marginTop: "28",
        marginX: "32",
        textAlign: "center"
      }, /* @__PURE__ */ React84.createElement(Disclaimer, {
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
      walletContent = /* @__PURE__ */ React84.createElement(Box, null, /* @__PURE__ */ React84.createElement(Box, {
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
        return /* @__PURE__ */ React84.createElement(Box, {
          display: "flex",
          gap: "16",
          key: wallet.id,
          paddingX: "20",
          width: "full"
        }, /* @__PURE__ */ React84.createElement(Box, {
          style: { minHeight: 48, minWidth: 48 }
        }, /* @__PURE__ */ React84.createElement(AsyncImage, {
          background: iconBackground,
          borderColor: "generalBorder",
          borderRadius: "10",
          height: "48",
          src: iconUrl,
          width: "48"
        })), /* @__PURE__ */ React84.createElement(Box, {
          display: "flex",
          flexDirection: "column",
          width: "full"
        }, /* @__PURE__ */ React84.createElement(Box, {
          alignItems: "center",
          display: "flex",
          height: "48"
        }, /* @__PURE__ */ React84.createElement(Box, {
          width: "full"
        }, /* @__PURE__ */ React84.createElement(Text2, {
          color: "modalText",
          size: "18",
          weight: "bold"
        }, name)), /* @__PURE__ */ React84.createElement(ActionButton, {
          href: (ios ? downloadUrls == null ? void 0 : downloadUrls.ios : downloadUrls == null ? void 0 : downloadUrls.android) || (downloadUrls == null ? void 0 : downloadUrls.mobile),
          label: "GET",
          size: "small",
          type: "secondary"
        })), index < mobileWallets.length - 1 && /* @__PURE__ */ React84.createElement(Box, {
          background: "generalBorderDim",
          height: "1",
          marginY: "10",
          width: "full"
        })));
      })), /* @__PURE__ */ React84.createElement(Box, {
        style: { marginBottom: "42px" }
      }), /* @__PURE__ */ React84.createElement(Box, {
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        gap: "36",
        paddingX: "36",
        style: { textAlign: "center" }
      }, /* @__PURE__ */ React84.createElement(Box, {
        display: "flex",
        flexDirection: "column",
        gap: "12",
        textAlign: "center"
      }, /* @__PURE__ */ React84.createElement(Text2, {
        color: "modalText",
        size: "16",
        weight: "bold"
      }, "Not what you\u2019re looking for?"), /* @__PURE__ */ React84.createElement(Text2, {
        color: "modalTextSecondary",
        size: "16"
      }, "Select a wallet on the main screen to get started with a different wallet provider."))));
      break;
    }
  }
  return /* @__PURE__ */ React84.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "36"
  }, /* @__PURE__ */ React84.createElement(Box, {
    background: headerBackgroundContrast ? "profileForeground" : "modalBackground",
    display: "flex",
    flexDirection: "column",
    paddingBottom: "4",
    paddingTop: "14"
  }, /* @__PURE__ */ React84.createElement(Box, {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "6",
    paddingX: "20",
    position: "relative"
  }, headerBackButtonLink && /* @__PURE__ */ React84.createElement(Box, {
    display: "flex",
    position: "absolute",
    style: {
      left: 0,
      marginBottom: -20,
      marginTop: -20
    }
  }, /* @__PURE__ */ React84.createElement(Box, {
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
  }, /* @__PURE__ */ React84.createElement(BackIcon, null))), /* @__PURE__ */ React84.createElement(Box, {
    marginTop: "4",
    textAlign: "center",
    width: "full"
  }, /* @__PURE__ */ React84.createElement(Text2, {
    as: "h1",
    color: "modalText",
    id: titleId,
    size: "20",
    weight: "bold"
  }, headerLabel)), /* @__PURE__ */ React84.createElement(Box, {
    alignItems: "center",
    display: "flex",
    height: "32",
    paddingRight: "14",
    position: "absolute",
    right: "0"
  }, /* @__PURE__ */ React84.createElement(Box, {
    style: { marginBottom: -20, marginTop: -20 }
  }, /* @__PURE__ */ React84.createElement(DialogClose_default, {
    onClick: onClose,
    style: { top: "6px" }
  }))))), /* @__PURE__ */ React84.createElement(Box, {
    display: "flex",
    flexDirection: "column"
  }, walletContent));
}

// src/rainbowkit/src/components/ConnectOptions/ConnectOptions.tsx
function ConnectOptions({ onClose }) {
  return isMobile() ? /* @__PURE__ */ React85.createElement(MobileOptions, {
    onClose
  }) : /* @__PURE__ */ React85.createElement(DesktopOptions, {
    onClose
  });
}

// src/rainbowkit/src/components/ConnectModal/ConnectModal.tsx
function ConnectModal({ onClose, open }) {
  const titleId = "rk_connect_title";
  const connectionStatus = useConnectionStatus();
  if (connectionStatus === "disconnected") {
    return /* @__PURE__ */ React86.createElement(Dialog, {
      onClose,
      open,
      titleId
    }, /* @__PURE__ */ React86.createElement(DialogContent3, {
      bottomSheetOnMobile: true,
      padding: "0",
      wide: true
    }, /* @__PURE__ */ React86.createElement(ConnectOptions, {
      onClose
    })));
  }
  if (connectionStatus === "unauthenticated") {
    return /* @__PURE__ */ React86.createElement(Dialog, {
      onClose,
      open,
      titleId
    }, /* @__PURE__ */ React86.createElement(DialogContent3, {
      bottomSheetOnMobile: true,
      padding: "0"
    }, /* @__PURE__ */ React86.createElement(SignIn, {
      onClose
    })));
  }
  return null;
}

// src/rainbowkit/src/components/RainbowKitProvider/ModalContext.tsx
import { useSetRecoilState as useSetRecoilState14 } from "recoil";
function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState26(false);
  const setWalletDialogOpen = useSetRecoilState14(walletModalOpenState);
  return {
    closeModal: useCallback34(() => {
      setWalletDialogOpen(false);
      setModalOpen(false);
    }, []),
    isModalOpen,
    openModal: useCallback34(() => setModalOpen(true), [])
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
  const fn = useRef11();
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
  useAccount11({
    onConnect: () => closeModals({ keepConnectModalOpen: isUnauthenticated }),
    onDisconnect: () => closeModals()
  });
  return /* @__PURE__ */ React87.createElement(ModalContext.Provider, {
    value: useMemo17(
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
  }, children, /* @__PURE__ */ React87.createElement(ConnectModal, {
    onClose: closeConnectModal,
    open: connectModalOpen
  }), /* @__PURE__ */ React87.createElement(AccountModal, {
    onClose: closeAccountModal,
    open: accountModalOpen
  }), /* @__PURE__ */ React87.createElement(ChainModal, {
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

// src/components/Header/rainbow_account/WrongNetwork.tsx
var WrongNetwork = memo32(() => {
  const { t } = useCustomTranslation([LngNs.common]);
  const { openChainModal } = useChainModal();
  const setAccountInfoDialogOpen = useSetRecoilState15(accountInfoDialogState);
  return /* @__PURE__ */ React88.createElement(IsPixelWidget_default, {
    onClick: () => {
      if (openChainModal) {
        openChainModal();
        setAccountInfoDialogOpen(false);
      }
    },
    className: "connect_connect"
  }, /* @__PURE__ */ React88.createElement("p", null, t("Wrong network")));
}, isEqual);
var WrongNetwork_default = WrongNetwork;

// src/rainbowkit/src/components/ConnectButton/ConnectButton.tsx
import React91 from "react";

// src/rainbowkit/src/components/Icons/Dropdown.tsx
import React89 from "react";
var DropdownIcon = () => /* @__PURE__ */ React89.createElement("svg", {
  fill: "none",
  height: "7",
  width: "14",
  xmlns: "http://www.w3.org/2000/svg"
}, /* @__PURE__ */ React89.createElement("path", {
  d: "M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: "2.5",
  xmlns: "http://www.w3.org/2000/svg"
}));

// src/rainbowkit/src/components/ConnectButton/ConnectButtonRenderer.tsx
import React90, { useContext as useContext17 } from "react";
import { useAccount as useAccount12, useBalance as useBalance2, useNetwork as useNetwork7 } from "wagmi";

// src/rainbowkit/src/hooks/useIsMounted.ts
import { useEffect as useEffect33, useReducer as useReducer3 } from "react";
var useIsMounted = () => {
  const [mounted, setMounted] = useReducer3(() => true, false);
  useEffect33(setMounted, [setMounted]);
  return mounted;
};

// src/rainbowkit/src/components/ConnectButton/ConnectButtonRenderer.tsx
var noop = () => {
};
function ConnectButtonRenderer({
  children
}) {
  var _a, _b, _c, _d;
  const mounted = useIsMounted();
  const { address } = useAccount12();
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
  return /* @__PURE__ */ React90.createElement(React90.Fragment, null, children({
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
  return /* @__PURE__ */ React91.createElement(ConnectButtonRenderer, null, ({ account, chain, mounted, openAccountModal, openChainModal, openConnectModal }) => {
    var _a, _b, _c;
    const ready = mounted && connectionStatus !== "loading";
    const unsupportedChain = (_a = chain == null ? void 0 : chain.unsupported) != null ? _a : false;
    return /* @__PURE__ */ React91.createElement(Box, {
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
    }, ready && account && connectionStatus === "connected" ? /* @__PURE__ */ React91.createElement(React91.Fragment, null, chain && (chains.length > 1 || unsupportedChain) && /* @__PURE__ */ React91.createElement(Box, {
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
    }, unsupportedChain ? /* @__PURE__ */ React91.createElement(Box, {
      alignItems: "center",
      display: "flex",
      height: "24",
      paddingX: "4"
    }, "Wrong network") : /* @__PURE__ */ React91.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6"
    }, chain.hasIcon ? /* @__PURE__ */ React91.createElement(Box, {
      display: mapResponsiveValue(chainStatus, (value) => value === "full" || value === "icon" ? "block" : "none"),
      height: "24",
      width: "24"
    }, /* @__PURE__ */ React91.createElement(AsyncImage, {
      alt: (_b = chain.name) != null ? _b : "Chain icon",
      background: chain.iconBackground,
      borderRadius: "full",
      height: "24",
      src: chain.iconUrl,
      width: "24"
    })) : null, /* @__PURE__ */ React91.createElement(Box, {
      display: mapResponsiveValue(chainStatus, (value) => {
        if (value === "icon" && !chain.iconUrl) {
          return "block";
        }
        return value === "full" || value === "name" ? "block" : "none";
      })
    }, (_c = chain.name) != null ? _c : chain.id)), /* @__PURE__ */ React91.createElement(DropdownIcon, null)), !unsupportedChain && /* @__PURE__ */ React91.createElement(Box, {
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
    }, account.displayBalance && /* @__PURE__ */ React91.createElement(Box, {
      display: mapResponsiveValue(showBalance, (value) => value ? "block" : "none"),
      padding: "8",
      paddingLeft: "12"
    }, account.displayBalance), /* @__PURE__ */ React91.createElement(Box, {
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
    }, /* @__PURE__ */ React91.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6",
      height: "24"
    }, /* @__PURE__ */ React91.createElement(Box, {
      display: mapResponsiveValue(accountStatus, (value) => value === "full" || value === "avatar" ? "block" : "none")
    }, /* @__PURE__ */ React91.createElement(Avatar2, {
      address: account.address,
      imageUrl: account.ensAvatar,
      loading: account.hasPendingTransactions,
      size: 24
    })), /* @__PURE__ */ React91.createElement(Box, {
      alignItems: "center",
      display: "flex",
      gap: "6"
    }, /* @__PURE__ */ React91.createElement(Box, {
      display: mapResponsiveValue(accountStatus, (value) => value === "full" || value === "address" ? "block" : "none")
    }, account.displayName), /* @__PURE__ */ React91.createElement(DropdownIcon, null)))))) : /* @__PURE__ */ React91.createElement(Box, {
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

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
var RainbowConnectWallet = memo33((props) => {
  const { t } = useCustomTranslation([LngNs.common]);
  const {
    isBigWidth,
    isMiddleWidth,
    className,
    env,
    copy,
    dispatch,
    setSuccessToast,
    setErrorToast,
    CountUpNumber,
    supportedChainList,
    type
  } = props;
  return /* @__PURE__ */ React92.createElement("div", {
    className: `connect_pixel_connectWallet
        ${className != null ? className : ""}`
  }, /* @__PURE__ */ React92.createElement(ConnectButton.Custom, null, ({ chain, openConnectModal, mounted }) => {
    return /* @__PURE__ */ React92.createElement(React92.Fragment, null, !mounted || !chain ? /* @__PURE__ */ React92.createElement(IsPixelWidget_default, {
      onClick: openConnectModal,
      className: "connect_connect"
    }, /* @__PURE__ */ React92.createElement("p", null, t("Connect Wallet"))) : chain && (chain.unsupported || !supportedChainIds(env, supportedChainList).includes(
      `${chain.id}`
    )) ? /* @__PURE__ */ React92.createElement(WrongNetwork_default, null) : /* @__PURE__ */ React92.createElement(rainbow_account_default, {
      copy,
      env,
      dispatch,
      setSuccessToast,
      setErrorToast,
      CountUpNumber,
      isMiddleWidth,
      supportedChainList
    }));
  }), isBigWidth ? /* @__PURE__ */ React92.createElement(Language_default, {
    type: type === "pixel" ? type : "top"
  }) : null);
}, isEqual);
var rainbow_connectWallet_default = RainbowConnectWallet;

// src/components/Header/header.tsx
var Header = (props) => {
  const setSideCollapse = useSetRecoilState16(sideCollapseState);
  const collapsed = useRecoilValue13(sideCollapseState);
  const {
    hideMenu = false,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy,
    useLocation,
    CountUpNumber,
    supportedChainList,
    pathname,
    Link
  } = props;
  const { width } = useWindowSize();
  const [showBig, setShowBig] = useRecoilState13(showBigState);
  const [showMiddle, setShowMiddle] = useRecoilState13(showMiddleState);
  const { isW830, isW1190, isW1340, isW1540, isW1670, isWBig } = useMemo18(() => {
    return {
      isW830: width <= 830,
      isW1190: width <= 1190,
      isW1340: width <= 1340,
      isW1540: width <= 1540,
      isW1670: width < 1670,
      isWBig: width >= 1340
    };
  }, [width]);
  useEffect34(() => {
    if (showBig) {
      setShowBig(false);
    }
    if (showMiddle) {
      setShowMiddle(false);
    }
  }, [width]);
  useEffect34(() => {
    if (isW830 && collapsed === void 0) {
      setSideCollapse(true);
    }
  }, [isW830]);
  const isBingo = useMemo18(() => {
    return pathname === "bingo";
  }, [pathname]);
  return /* @__PURE__ */ React93.createElement("header", {
    className: classnames11(
      "header_header",
      isW830 ? "header_header_830" : "",
      isW1190 ? "header_header_1190" : "",
      isW1340 ? "header_header_1340" : "",
      isW1540 ? "header_header_1540" : "",
      isW1670 ? "header_header_1670" : "",
      props.className
    ),
    style: { position: "sticky", top: 0, zIndex: 99, width: "100%" }
  }, isBingo ? null : /* @__PURE__ */ React93.createElement("div", {
    className: "header_left"
  }, /* @__PURE__ */ React93.createElement(ZypherLogo, {
    isMobile: isW830
  })), !isW830 && !isBingo && /* @__PURE__ */ React93.createElement(Navigation_default, {
    pathname,
    Link
  }), /* @__PURE__ */ React93.createElement("div", {
    className: "header_right"
  }, /* @__PURE__ */ React93.createElement(rainbow_connectWallet_default, {
    type: "pixel",
    isBigWidth: isWBig,
    isMiddleWidth: isW1340,
    useLocation,
    copy,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    CountUpNumber,
    supportedChainList
  }), isW830 && !hideMenu ? /* @__PURE__ */ React93.createElement(IsPixelWidget_default, {
    className: "header_btn_pixel"
  }, /* @__PURE__ */ React93.createElement("div", {
    className: "header_btn",
    onClick: () => setSideCollapse(!collapsed)
  }, /* @__PURE__ */ React93.createElement(icons_default, {
    className: "header_icon",
    name: "menu"
  }))) : null), /* @__PURE__ */ React93.createElement(LinkToBetaDialog_default, null));
};
var header_default = Header;

// src/provider/RainbowKitWithThemeProvider.tsx
import React94, { useMemo as useMemo19 } from "react";
import { WagmiConfig } from "wagmi";

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

// src/provider/RainbowKitWithThemeProvider.tsx
var RainbowKitWithThemeProvider = ({
  children,
  env,
  chainIdList
}) => {
  const WebAppData = useTelegramUser();
  const setAaWallet = useSetAaWallet();
  const { wagmiConfig, chains, computedTheme } = useMemo19(() => {
    if (env) {
      const wagmiConfig2 = getWagmiConfig({
        env,
        chainIdList,
        WebAppData,
        setAaWallet
      });
      const { chains: chains2 } = getConfigureChains({ env });
      return {
        wagmiConfig: wagmiConfig2,
        chains: chains2,
        computedTheme: darkTheme({
          accentColor: "#fff",
          borderRadius: "large",
          fontStack: "Pixel"
        })
      };
    }
    return {};
  }, [WebAppData]);
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

// src/provider/TonConnectUIProvider.tsx
import {
  THEME,
  TonConnectUIProvider as TonConnectUIProviderWidget
} from "@tonconnect/ui-react";
import React95 from "react";
import { memo as memo34 } from "react";
var TonConnectUIProvider = memo34(({ children }) => {
  return /* @__PURE__ */ React95.createElement(TonConnectUIProviderWidget, {
    uiPreferences: {
      theme: THEME.DARK,
      colorsSet: { [THEME.DARK]: { background: { primary: "#070823" } } }
    },
    walletsListConfiguration: {
      includeWallets: [
        {
          appName: "bitgetTonWallet",
          name: "Bitget Wallet",
          imageUrl: "https://raw.githubusercontent.com/bitkeepwallet/download/main/logo/png/bitget_wallet_logo_0_gas_fee.png",
          aboutUrl: "https://web3.bitget.com",
          deepLink: "bitkeep://",
          bridgeUrl: "https://bridge.tonapi.io/bridge",
          jsBridgeKey: "bitgetTonWallet",
          platforms: ["ios", "android", "chrome"],
          universalLink: "https://bkcode.vip/ton-connect"
        },
        {
          appName: "okxTonWallet",
          name: "OKX Wallet",
          imageUrl: "https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png",
          aboutUrl: "https://www.okx.com/web3",
          universalLink: "https://www.ouxyi.link/ul/uYJPB0",
          jsBridgeKey: "okxTonWallet",
          bridgeUrl: "https://www.okx.com/tonbridge/discover/rpc/bridge",
          platforms: ["chrome", "safari", "firefox", "ios", "android"]
        }
      ]
    },
    manifestUrl: "https://static-dev.zypher.game/json/bingo/tonconnect-manifest.json"
  }, children);
});
var TonConnectUIProvider_default = TonConnectUIProvider;

// src/hooks/useInitRainbowFn.ts
import { useEffect as useEffect35 } from "react";
var useInitRainbowFn = () => {
  const { setFn, closeChainModal } = useChainModal();
  useEffect35(() => {
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
import { useSetRecoilState as useSetRecoilState17 } from "recoil";
import { useEffect as useEffect36 } from "react";
import { ethers as ethers4 } from "ethers";
var useGetInvitationAddress = () => {
  const setInvitationAddressState = useSetRecoilState17(invitationAddressState);
  useEffect36(() => {
    const urlObj = new URL(window.location.href);
    const shareParam = urlObj.searchParams.get("share");
    const chain_id = urlObj.searchParams.get("chain_id");
    if (shareParam == null ? void 0 : shareParam.startsWith("0x")) {
      const isValidAddress = ethers4.utils.isAddress(shareParam);
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
import { useCallback as useCallback35, useEffect as useEffect37, useState as useState27 } from "react";
import BigNumberjs3 from "bignumber.js";
import { ethers as ethers5 } from "ethers";

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

// src/hooks/useRecentGamesFromGraph.ts
var useRecentGamesFromGraph = ({
  env
}) => {
  const [list, setList] = useState27();
  const [hasError, setHasError] = useState27(false);
  const fetchGameInfos = useCallback35(async () => {
    var _a, _b;
    try {
      const value_pre = await batchRequestFromGraph({ env });
      const value = value_pre.filter((v) => !!v);
      if (value && value.length) {
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
      console.log("fetchGameInfos error: ", e);
      setHasError(true);
    }
  }, []);
  useEffect37(() => {
    fetchGameInfos();
  }, []);
  return {
    list,
    hasError
  };
};
var graphqlApiUrl = {
  ["59144" /* LineaMainnet */]: "https://linea-mainnet-graph.zypher.game/subgraphs/name/linea/bingo",
  ["59141" /* LineaSepolia */]: "https://linea-sepolia-graph.zypher.game/subgraphs/name/linea/bingo",
  ["204" /* OPBNB */]: "https://opbnb-mainnet-graph.zypher.game/subgraphs/name/opbnb/bingo",
  ["5611" /* OPBNBTEST */]: "https://opbnb-testnet-graph.zypher.game/subgraphs/name/opbnb/bingo",
  ["19546" /* ZytronLineaSepoliaTestnet */]: "https://linea-sepolia-graph.zypher.game/subgraphs/name/linea/bingo",
  ["9901" /* ZytronLineaMain */]: " https://zytron-linea-mainnet-graph.zypher.game/subgraphs/name/zytron/bingo"
};
var chainIdPre = {
  ["56" /* Bsc */]: "BNB",
  ["97" /* BscTestnet */]: "BT",
  ["42161" /* Arbitrum */]: "AO",
  ["421613" /* ArbitrumGoerli */]: "AGT",
  ["421611" /* ArbitrumRinkeby */]: "ARBR",
  ["59141" /* LineaSepolia */]: "LS",
  ["59144" /* LineaMainnet */]: "LM",
  ["80001" /* POLYGON_MUMBAI */]: "PM",
  ["1442" /* POLYGON_ZKEVM */]: "PZT",
  ["204" /* OPBNB */]: "OB",
  ["534351" /* ScrollSepoliaTestnet */]: "SST",
  ["534353" /* ScrollAlphaTestnet */]: "SAT",
  ["5611" /* OPBNBTEST */]: "OBT",
  ["169" /* MantaPacificMainnet */]: "MPM",
  ["3441005" /* MantaPacificTestnet */]: "MPT",
  ["91715" /* ComboTestnet */]: "CbT",
  ["5000" /* Mantle */]: "MTM",
  ["5001" /* MantleTestnet */]: "MTT",
  ["9980" /* Combo */]: "Cb",
  ["11155111" /* Sepolia */]: "Sp",
  ["223" /* B2 */]: "B2",
  ["1123" /* B2Testnet */]: "B2T",
  ["19546" /* ZytronLineaSepoliaTestnet */]: "",
  ["9901" /* ZytronLineaMain */]: "",
  ["50097" /* ZytronB2Testnet */]: "",
  ["167000" /* Taiko */]: "TK",
  ["2717465680371000" /* SagaMainnet */]: ""
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
    let inputPerPlayer = joinAmount ? new BigNumberjs3(ethers5.utils.formatEther(joinAmount)).dividedBy(new BigNumberjs3(pCount)).toNumber() : "-";
    let win = "-";
    let multiplier = "-";
    let cardNumbers;
    let selectedNumbers;
    if (status === "end" /* End */ && recentGames.size) {
      winnerOrPlayers = winner;
      const poolWin = new BigNumberjs3(ethers5.utils.formatEther(winAmount));
      win = formatMoney(poolWin.toNumber());
      multiplier = formatMoney(
        poolWin.dividedBy(new BigNumberjs3(inputPerPlayer)).toNumber()
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
  try {
    const requests = supportedChainIds(env).map(
      async (chainIdLocal) => {
        var _a;
        const api = graphqlApiUrl[chainIdLocal];
        if (!api) {
          return void 0;
        }
        const result = await request(api, {
          method: "POST",
          data: JSON.stringify({
            query: `query MyQuery {
          gameInfos(orderBy: startedAt, orderDirection: desc, first: 20) {
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
            const endFilter = result.data.data.gameInfos.filter((v) => getStatus(v.status) === "end" /* End */).map((v) => ({
              winCardId: v.winCardId,
              cardAddr: v.cardAddr
            }));
            const winCardIdList = endFilter.map((v) => v.winCardId);
            const cardAddrList = endFilter.map((v) => v.cardAddr);
            const recentGames = (_a = await getRecentGameById({
              chainId: chainIdLocal,
              lobbyAddrList,
              gameIdList,
              cardAddrList,
              winCardIdList
            })) != null ? _a : /* @__PURE__ */ new Map();
            const rres = formatDataFromGraph({
              chainId: chainIdLocal,
              data: result.data.data.gameInfos,
              recentGames
            });
            return rres;
          }
        }
        return void 0;
      }
    );
    return Promise.all(requests);
  } catch (e) {
    console.log("batchRequestFromGraph", e);
    return [void 0];
  }
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

// src/hooks/useInterval.ts
import { useEffect as useEffect38, useRef as useRef12 } from "react";
function useInterval(callback, delay, leading = true) {
  const savedCallback = useRef12();
  useEffect38(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect38(() => {
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

// src/index.ts
import { changeLanguage as changeLanguage2 } from "i18next";

// src/utils/addressIsEqual.ts
var addressIsEqual = (pre, next) => {
  return `${pre}`.toLowerCase() === `${next}`.toLowerCase();
};

// src/utils/getSign.ts
import * as ethers6 from "ethers";
async function getWeb3Sign(dataToSign, account, isArrayify = true, walletClient) {
  if (!account) {
    return false;
  }
  if (window.IS_TELEGRAM) {
    window.isArrayify = isArrayify;
    window.dataToSign = dataToSign;
    return await (walletClient == null ? void 0 : walletClient.signMessage({
      message: dataToSign,
      account
    }));
  } else {
    const provider = await getProvider();
    const signer = provider.getSigner(account);
    const data = isArrayify ? ethers6.utils.arrayify(dataToSign) : dataToSign;
    return await signer.signMessage(data);
  }
}

// src/contract/abi/erc721.json
var erc721_default = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string"
      },
      {
        internalType: "string",
        name: "symbol_",
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
        name: "approved",
        type: "address"
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "ApprovalForAll",
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
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
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
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
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
        name: "operator",
        type: "address"
      }
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address"
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool"
      }
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "tokenURI",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/contract/erc721.ts
var erc721Contract = (chainId, env, address, signer) => {
  if (!address) {
    throw new Error("No addrerss");
  }
  return getContract2({ env, abi: erc721_default, address, signer, chainId });
};
var erc721Abi = erc721_default;
var erc721_default2 = erc721Contract;

// src/utils/time.ts
var getLocalTime = (timestamp) => {
  const date = new Date(Number(`${timestamp}`) * 1e3);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

// src/components/PixelTab/PixelTab.tsx
import React96, { memo as memo35 } from "react";
var PixelTab = memo35(
  ({
    tabList,
    height,
    pixel_height,
    classNames,
    themeType,
    hidePixel
  }) => {
    return /* @__PURE__ */ React96.createElement("ul", {
      className: classNames
    }, tabList.map((v, index) => /* @__PURE__ */ React96.createElement(PixelTabLiItem, {
      themeType,
      hidePixel,
      onClick: v.onClick,
      key: v.label,
      on: v.on,
      label: v.label,
      logo: v.logo,
      height,
      pixel_height
    })));
  }
);
var PixelTabLiItem = memo35(
  ({
    onClick,
    on,
    label,
    height,
    pixel_height,
    hidePixel,
    logo,
    themeType
  }) => {
    if (on) {
      return /* @__PURE__ */ React96.createElement("li", null, /* @__PURE__ */ React96.createElement(ActivePixelButtonColor, {
        hidePixel,
        themeType: themeType != null ? themeType : "brightBlue",
        height,
        pixel_height,
        className: "active_tvl_tab_on"
      }, logo ? /* @__PURE__ */ React96.createElement(SvgComponent_default, {
        src: logo
      }) : null, label ? /* @__PURE__ */ React96.createElement("p", null, label) : null));
    }
    return /* @__PURE__ */ React96.createElement("li", null, /* @__PURE__ */ React96.createElement(ActivePixelButton, {
      hidePixel,
      height,
      pixel_height,
      backgroundColor: "#1D263B",
      className: "active_tvl_tab",
      onClick
    }, logo ? /* @__PURE__ */ React96.createElement(SvgComponent_default, {
      src: logo
    }) : null, label ? /* @__PURE__ */ React96.createElement("p", null, label) : null));
  }
);
var PixelTab_default = PixelTab;

// src/components/PixelTab/PixelTabBorder.tsx
import React97, { memo as memo36 } from "react";
var PixelTabBorder = memo36(
  ({
    className,
    tabList,
    height,
    pixel_height
  }) => {
    return /* @__PURE__ */ React97.createElement(PixelCube2, {
      className: `ActiveTVLStaking_tab ${className != null ? className : ""}`,
      pixel_height,
      height,
      backgroundColor: "#1D263B",
      borderColor: "#1649FF"
    }, tabList.map((v, index) => /* @__PURE__ */ React97.createElement("div", {
      className: `ActiveTVLStaking_tab_li ${v.on ? "on" : ""}`,
      key: v.label,
      onClick: v.onClick
    }, /* @__PURE__ */ React97.createElement("p", null, v.label))));
  }
);
var PixelTabBorder_default = PixelTabBorder;

// src/rainbowkit/src/__private__/index.ts
var __private__ = {
  DesktopOptions,
  dialogContent,
  dialogContentMobile,
  MobileOptions
};

// src/components/Modal/ModalWithMotion/ModalWithMotion.tsx
import React98 from "react";
import { DialogContent as DialogContent4, DialogOverlay as DialogOverlay3 } from "@reach/dialog";
import { motion as motion3 } from "framer-motion";
var ModalWithMotion = ({
  isOpen,
  onDismiss,
  overlayClassName,
  children,
  contentClassName
}) => {
  return /* @__PURE__ */ React98.createElement(DialogOverlay3, {
    className: overlayClassName,
    isOpen,
    onDismiss
  }, /* @__PURE__ */ React98.createElement(motion3.div, {
    variants: dialogVariants,
    initial: "hidden",
    animate: isOpen ? "visible" : "hidden",
    exit: "hidden"
  }, /* @__PURE__ */ React98.createElement(DialogContent4, {
    className: contentClassName
  }, children)));
};
var ModalWithMotion_default = ModalWithMotion;

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
import { useCallback as useCallback36 } from "react";
import { useAccount as useAccount13 } from "wagmi";
function useAddRecentTransaction() {
  const store = useTransactionStore();
  const { address } = useAccount13();
  const chainId = useChainId();
  return useCallback36(
    (transaction) => {
      if (!address || !chainId) {
        throw new Error("No address or chain ID found");
      }
      store.addTransaction(address, chainId, transaction);
    },
    [store, address, chainId]
  );
}

// src/rainbowkit/src/wallets/walletConnectors/braveWallet/braveWallet.ts
import { InjectedConnector as InjectedConnector4 } from "wagmi/connectors/injected";
var braveWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "brave",
    name: "Brave Wallet",
    iconUrl: async () => (await import("./braveWallet-PC2UIXX3.js")).default,
    iconBackground: "#fff",
    installed: typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isBraveWallet) === true,
    downloadUrls: {},
    createConnector: () => ({
      connector: new InjectedConnector4({
        chains,
        options
      })
    })
  };
};

// src/rainbowkit/src/wallets/walletConnectors/coinbaseWallet/coinbaseWallet.ts
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
var coinbaseWallet = ({
  appName,
  chains,
  ...options
}) => {
  var _a;
  const isCoinbaseWalletInjected = typeof window !== "undefined" && ((_a = window.ethereum) == null ? void 0 : _a.isCoinbaseWallet) === true;
  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    shortName: "Coinbase",
    iconUrl: async () => (await import("./coinbaseWallet-EW5PK4HX.js")).default,
    iconAccent: "#2c5ff6",
    iconBackground: "#2c5ff6",
    installed: isCoinbaseWalletInjected || void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      mobile: "https://coinbase.com/wallet/downloads",
      qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250",
      chrome: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
      browserExtension: "https://coinbase.com/wallet"
    },
    createConnector: () => {
      const ios = isIOS();
      const connector = new CoinbaseWalletConnector({
        chains,
        options: {
          appName,
          headlessMode: true,
          ...options
        }
      });
      const getUri = async () => (await connector.getProvider()).qrUrl;
      return {
        connector,
        ...ios ? {} : {
          qrCode: {
            getUri,
            instructions: {
              learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-mobile",
              steps: [
                {
                  description: "We recommend putting Coinbase Wallet on your home screen for quicker access.",
                  step: "install",
                  title: "Open the Coinbase Wallet app"
                },
                {
                  description: "You can easily backup your wallet using the cloud backup feature.",
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
          },
          extension: {
            instructions: {
              learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-extension",
              steps: [
                {
                  description: "We recommend pinning Coinbase Wallet to your taskbar for quicker access to your wallet.",
                  step: "install",
                  title: "Install the Coinbase Wallet extension"
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
        }
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/injectedWallet/injectedWallet.ts
import { InjectedConnector as InjectedConnector5 } from "wagmi/connectors/injected";
var injectedWallet = ({
  chains,
  ...options
}) => ({
  id: "injected",
  name: "Browser Wallet",
  iconUrl: async () => (await import("./injectedWallet-NXTS4V5P.js")).default,
  iconBackground: "#fff",
  hidden: ({ wallets }) => wallets.some(
    (wallet) => wallet.installed && wallet.name === wallet.connector.name && (wallet.connector instanceof InjectedConnector5 || wallet.id === "coinbase")
  ),
  createConnector: () => ({
    connector: new InjectedConnector5({
      chains,
      options
    })
  })
});

// src/rainbowkit/src/wallets/getInjectedConnector.ts
import { InjectedConnector as InjectedConnector6 } from "wagmi/connectors/injected";
function getExplicitInjectedProvider(flag) {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return;
  const providers2 = window.ethereum.providers;
  return providers2 ? providers2.find((provider) => provider[flag]) : window.ethereum[flag] ? window.ethereum : void 0;
}
function hasInjectedProvider(flag) {
  return Boolean(getExplicitInjectedProvider(flag));
}
function getInjectedProvider(flag) {
  if (typeof window === "undefined" || typeof window.ethereum === "undefined")
    return;
  const providers2 = window.ethereum.providers;
  const provider = getExplicitInjectedProvider(flag);
  if (provider)
    return provider;
  else if (typeof providers2 !== "undefined" && providers2.length > 0)
    return providers2[0];
  else
    return window.ethereum;
}
function getInjectedConnector({
  chains,
  flag,
  options
}) {
  return new InjectedConnector6({
    chains,
    options: {
      getProvider: () => getInjectedProvider(flag),
      ...options
    }
  });
}

// src/rainbowkit/src/wallets/walletConnectors/rainbowWallet/rainbowWallet.ts
var rainbowWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isRainbowInjected = hasInjectedProvider("isRainbow");
  const shouldUseWalletConnect = !isRainbowInjected;
  return {
    id: "rainbow",
    name: "Rainbow",
    iconUrl: async () => (await import("./rainbowWallet-CJFNM7HO.js")).default,
    iconBackground: "#0c2f78",
    installed: !shouldUseWalletConnect ? isRainbowInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=me.rainbow&referrer=utm_source%3Drainbowkit&utm_source=rainbowkit",
      ios: "https://apps.apple.com/app/apple-store/id1457119021?pt=119997837&ct=rainbowkit&mt=8",
      mobile: "https://rainbow.download?utm_source=rainbowkit",
      qrCode: "https://rainbow.download?utm_source=rainbowkit&utm_medium=qrcode",
      browserExtension: "https://rainbow.me/extension?utm_source=rainbowkit"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : getInjectedConnector({ flag: "isRainbow", chains, options });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : isIOS() ? `rainbow://wc?uri=${encodeURIComponent(uri)}&connector=rainbowkit` : `https://rnbwapp.com/wc?uri=${encodeURIComponent(uri)}&connector=rainbowkit`;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://learn.rainbow.me/connect-to-a-website-or-app?utm_source=rainbowkit&utm_medium=connector&utm_campaign=learnmore",
            steps: [
              {
                description: "We recommend putting Rainbow on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Rainbow app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
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

// src/rainbowkit/src/wallets/walletConnectors/safeWallet/safeWallet.ts
import { SafeConnector } from "wagmi/connectors/safe";
var safeWallet = ({
  chains,
  ...options
}) => ({
  id: "safe",
  name: "Safe",
  iconAccent: "#12ff80",
  iconBackground: "#fff",
  iconUrl: async () => (await import("./safeWallet-YZ677NBZ.js")).default,
  installed: !(typeof window === "undefined") && (window == null ? void 0 : window.parent) !== window,
  downloadUrls: {},
  createConnector: () => ({
    connector: new SafeConnector({ chains, options })
  })
});

// src/rainbowkit/src/wallets/getDefaultWallets.ts
var getDefaultWallets = ({
  appName,
  chains,
  projectId: projectId2
}) => {
  const wallets = [
    {
      groupName: "Popular",
      wallets: [
        injectedWallet({ chains }),
        safeWallet({ chains }),
        rainbowWallet({ chains, projectId: projectId2 }),
        coinbaseWallet({ appName, chains }),
        metaMaskWallet({ chains, projectId: projectId2 }),
        walletConnectWallet({ chains, projectId: projectId2 }),
        braveWallet({ chains })
      ]
    }
  ];
  return {
    connectors: connectorsForWallets(wallets),
    wallets
  };
};

// src/rainbowkit/src/wallets/walletConnectors/argentWallet/argentWallet.ts
var argentWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "argent",
  name: "Argent",
  iconUrl: async () => (await import("./argentWallet-WH6AD64I.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.argent.contractwalletclient",
    ios: "https://apps.apple.com/us/app/argent/id1358741926",
    mobile: "https://argent.xyz/download-argent",
    qrCode: "https://argent.link/app"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId: projectId2,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return isAndroid() ? uri : `argent://app/wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: "https://argent.xyz/learn/what-is-a-crypto-wallet/",
          steps: [
            {
              description: "Put Argent on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Argent app"
            },
            {
              description: "Create a wallet and username, or import an existing wallet.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the Scan QR button"
            }
          ]
        }
      }
    };
  }
});

// src/rainbowkit/src/wallets/walletConnectors/bifrostWallet/bifrostWallet.ts
import { InjectedConnector as InjectedConnector7 } from "wagmi/connectors/injected";
var bifrostWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isBifrostInjected = typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isBifrost;
  const shouldUseWalletConnect = !isBifrostInjected;
  return {
    id: "bifrostWallet",
    name: "Bifrost Wallet",
    iconUrl: async () => (await import("./bifrostWallet-EQOLLB2D.js")).default,
    iconBackground: "#fff",
    installed: !shouldUseWalletConnect ? isBifrostInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.bifrostwallet.app",
      ios: "https://apps.apple.com/us/app/bifrost-wallet/id1577198351",
      qrCode: "https://bifrostwallet.com/#download-app"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId: projectId2,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector7({
        chains,
        options
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? uri : `https://app.bifrostwallet.com/wc?uri=${encodeURIComponent(uri)}`;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://support.bifrostwallet.com/en/articles/6886814-how-to-use-walletconnect",
            steps: [
              {
                description: "We recommend putting Bifrost Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the Bifrost Wallet app"
              },
              {
                description: "Create or import a wallet using your recovery phrase.",
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
import { InjectedConnector as InjectedConnector8 } from "wagmi/connectors/injected";
var bitKeepWallet = ({
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
    name: "BitGet",
    iconUrl: async () => (await import("./bitgetWallet-AKNBIHGR.js")).default,
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
      }) : new InjectedConnector8({
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

// src/rainbowkit/src/wallets/walletConnectors/bitskiWallet/bitskiWallet.ts
import { InjectedConnector as InjectedConnector9 } from "wagmi/connectors/injected";
var bitskiWallet = ({ chains, ...options }) => {
  var _a;
  return {
    id: "bitski",
    name: "Bitski",
    installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (window.ethereum.isBitski === true || !!((_a = window.ethereum.providers) == null ? void 0 : _a.find((p) => p.isBitski === true))),
    iconUrl: async () => (await import("./bitskiWallet-V5U5XYOV.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/bitski/feejiigddaafeojfddjjlmfkabimkell",
      browserExtension: "https://bitski.com"
    },
    createConnector: () => ({
      connector: new InjectedConnector9({
        chains,
        options
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://bitski.zendesk.com/hc/articles/12803972818836-How-to-install-the-Bitski-browser-extension",
          steps: [
            {
              description: "We recommend pinning Bitski to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the Bitski extension"
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
    })
  };
};

// src/rainbowkit/src/wallets/walletConnectors/coin98Wallet/coin98Wallet.ts
import { InjectedConnector as InjectedConnector10 } from "wagmi/connectors/injected";
function getCoin98WalletInjectedProvider() {
  var _a;
  const isCoin98Wallet = (ethereum) => {
    const coin98Wallet2 = !!ethereum.isCoin98;
    return coin98Wallet2;
  };
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if (window["coin98Wallet"]) {
    return window["coin98Wallet"];
  }
  if (isCoin98Wallet(window.ethereum)) {
    return window.ethereum;
  }
  if ((_a = window.ethereum) == null ? void 0 : _a.providers) {
    return window.ethereum.providers.find(isCoin98Wallet);
  }
}
var coin98Wallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isCoin98WalletInjected = Boolean(getCoin98WalletInjectedProvider());
  const shouldUseWalletConnect = !isCoin98WalletInjected;
  return {
    id: "coin98",
    name: "Coin98 Wallet",
    iconUrl: async () => (await import("./coin98Wallet-WJEGGO7X.js")).default,
    installed: !shouldUseWalletConnect ? isCoin98WalletInjected : void 0,
    iconAccent: "#CDA349",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=coin98.crypto.finance.media",
      ios: "https://apps.apple.com/vn/app/coin98-super-app/id1561969966",
      mobile: "https://coin98.com/wallet",
      qrCode: "https://coin98.com/wallet",
      chrome: "https://chrome.google.com/webstore/detail/coin98-wallet/aeachknmefphepccionboohckonoeemg",
      browserExtension: "https://coin98.com/wallet"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector10({
        chains,
        options: {
          name: "Coin98 Wallet",
          getProvider: getCoin98WalletInjectedProvider,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return uri;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://coin98.com/wallet",
            steps: [
              {
                description: "We recommend putting Coin98 Wallet on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Coin98 Wallet app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the WalletConnect button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://coin98.com/wallet",
            steps: [
              {
                description: "Click at the top right of your browser and pin Coin98 Wallet for easy access.",
                step: "install",
                title: "Install the Coin98 Wallet extension"
              },
              {
                description: "Create a new wallet or import an existing one.",
                step: "create",
                title: "Create or Import a wallet"
              },
              {
                description: "Once you set up Coin98 Wallet, click below to refresh the browser and load up the extension.",
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

// src/rainbowkit/src/wallets/walletConnectors/coreWallet/coreWallet.ts
import { InjectedConnector as InjectedConnector11 } from "wagmi/connectors/injected";
function getCoreWalletInjectedProvider() {
  var _a, _b;
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if ((_a = window["evmproviders"]) == null ? void 0 : _a["core"]) {
    return (_b = window["evmproviders"]) == null ? void 0 : _b["core"];
  }
  if (window.avalanche) {
    return window.avalanche;
  }
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isAvalanche === true) {
    return window.ethereum;
  }
}
var coreWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isCoreInjected = Boolean(getCoreWalletInjectedProvider());
  const shouldUseWalletConnect = !isCoreInjected;
  return {
    id: "core",
    name: "Core",
    iconUrl: async () => (await import("./coreWallet-DAHXIFJ4.js")).default,
    iconBackground: "#1A1A1C",
    installed: !shouldUseWalletConnect ? isCoreInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.avaxwallet",
      ios: "https://apps.apple.com/us/app/core-wallet/id6443685999",
      mobile: "https://core.app/?downloadCoreMobile=1",
      qrCode: "https://core.app/?downloadCoreMobile=1",
      chrome: "https://chrome.google.com/webstore/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb",
      browserExtension: "https://extension.core.app/"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector11({
        chains,
        options: {
          getProvider: getCoreWalletInjectedProvider,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return uri;
      };
      return {
        connector,
        mobile: { getUri: shouldUseWalletConnect ? getUri : void 0 },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://support.avax.network/en/articles/6115608-core-mobile-how-to-add-the-core-mobile-to-my-phone",
            steps: [
              {
                description: "We recommend putting Core on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Core app"
              },
              {
                description: "You can easily backup your wallet using our backup feature on your phone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "After you scan, a connection prompt will appear for you to connect your wallet.",
                step: "scan",
                title: "Tap the WalletConnect button"
              }
            ]
          }
        } : void 0,
        extension: {
          instructions: {
            learnMoreUrl: "https://extension.core.app/",
            steps: [
              {
                description: "We recommend pinning Core to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Core extension"
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

// src/rainbowkit/src/wallets/walletConnectors/dawnWallet/dawnWallet.ts
import { InjectedConnector as InjectedConnector12 } from "wagmi/connectors/injected";
var dawnWallet = ({
  chains,
  ...options
}) => ({
  id: "dawn",
  name: "Dawn",
  iconUrl: async () => (await import("./dawnWallet-4QFCQO4U.js")).default,
  iconBackground: "#000000",
  installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isDawn,
  hidden: () => !isIOS(),
  downloadUrls: {
    ios: "https://apps.apple.com/us/app/dawn-ethereum-wallet/id1673143782",
    mobile: "https://dawnwallet.xyz"
  },
  createConnector: () => ({
    connector: new InjectedConnector12({
      chains,
      options
    })
  })
});

// src/rainbowkit/src/wallets/walletConnectors/enkryptWallet/enkryptWallet.ts
import { InjectedConnector as InjectedConnector13 } from "wagmi/connectors/injected";
var enkryptWallet = ({
  chains,
  ...options
}) => {
  var _a, _b;
  const isEnkryptInjected = typeof window !== "undefined" && typeof window.enkrypt !== "undefined" && ((_b = (_a = window == null ? void 0 : window.enkrypt) == null ? void 0 : _a.providers) == null ? void 0 : _b.ethereum);
  return {
    id: "enkrypt",
    name: "Enkrypt Wallet",
    installed: isEnkryptInjected ? true : void 0,
    iconUrl: async () => (await import("./enkryptWallet-RROWU7OP.js")).default,
    iconBackground: "#FFFFFF",
    downloadUrls: {
      qrCode: "https://www.enkrypt.com",
      chrome: "https://chrome.google.com/webstore/detail/enkrypt-ethereum-polkadot/kkpllkodjeloidieedojogacfhpaihoh",
      browserExtension: "https://www.enkrypt.com/",
      edge: "https://microsoftedge.microsoft.com/addons/detail/enkrypt-ethereum-polkad/gfenajajnjjmmdojhdjmnngomkhlnfjl",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/enkrypt/",
      opera: "https://addons.opera.com/en/extensions/details/enkrypt/",
      safari: "https://apps.apple.com/app/enkrypt-web3-wallet/id1640164309"
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector13({
          chains,
          options: {
            getProvider: () => {
              var _a2, _b2;
              return isEnkryptInjected ? (_b2 = (_a2 = window == null ? void 0 : window.enkrypt) == null ? void 0 : _a2.providers) == null ? void 0 : _b2.ethereum : void 0;
            },
            ...options
          }
        }),
        extension: {
          instructions: {
            learnMoreUrl: "https://blog.enkrypt.com/what-is-a-web3-wallet/",
            steps: [
              {
                description: "We recommend pinning Enkrypt Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Enkrypt Wallet extension"
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

// src/rainbowkit/src/wallets/walletConnectors/foxWallet/foxWallet.ts
import { InjectedConnector as InjectedConnector14 } from "wagmi/connectors/injected";
var foxWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isFoxInjected = typeof window !== "undefined" && typeof window.foxwallet !== "undefined";
  const shouldUseWalletConnect = !isFoxInjected;
  return {
    id: "foxwallet",
    name: "FoxWallet",
    iconUrl: async () => (await import("./foxWallet-TOIJWXSL.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.foxwallet.play",
      ios: "https://apps.apple.com/app/foxwallet-crypto-web3/id1590983231",
      qrCode: "https://foxwallet.com/download"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector14({
        chains,
        options: {
          getProvider: () => window.foxwallet.ethereum,
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
            return `foxwallet://wc?uri=${encodeURIComponent(uri)}`;
          } : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
          instructions: {
            learnMoreUrl: "https://foxwallet.com",
            steps: [
              {
                description: "We recommend putting FoxWallet on your home screen for quicker access.",
                step: "install",
                title: "Open the FoxWallet app"
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

// src/rainbowkit/src/wallets/walletConnectors/frameWallet/frameWallet.ts
import { InjectedConnector as InjectedConnector15 } from "wagmi/connectors/injected";
var frameWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "frame",
    name: "Frame",
    installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && (window.ethereum.isFrame === true || !!((_a = window.ethereum.providers) == null ? void 0 : _a.find((p) => p.isFrame === true))),
    iconUrl: async () => (await import("./frameWallet-VAVAPJWD.js")).default,
    iconBackground: "#121C20",
    downloadUrls: {
      browserExtension: "https://frame.sh/"
    },
    createConnector: () => ({
      connector: new InjectedConnector15({
        chains,
        options
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://docs.frame.sh/docs/Getting%20Started/Installation/",
          steps: [
            {
              description: "We recommend pinning Frame to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install Frame & the companion extension"
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
    })
  };
};

// src/rainbowkit/src/wallets/walletConnectors/frontierWallet/frontierWallet.ts
import { InjectedConnector as InjectedConnector16 } from "wagmi/connectors/injected";
var frontierWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  var _a, _b, _c, _d;
  const isFrontierInjected = typeof window !== "undefined" && typeof window.frontier !== "undefined" && ((_b = (_a = window == null ? void 0 : window.frontier) == null ? void 0 : _a.ethereum) == null ? void 0 : _b.isFrontier);
  return {
    id: "frontier",
    name: "Frontier Wallet",
    installed: typeof window !== "undefined" && typeof window.frontier !== "undefined" && ((_d = (_c = window == null ? void 0 : window.frontier) == null ? void 0 : _c.ethereum) == null ? void 0 : _d.isFrontier) ? true : void 0,
    iconUrl: async () => (await import("./frontierWallet-QBWBW5NC.js")).default,
    iconBackground: "#CC703C",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.frontierwallet",
      ios: "https://apps.apple.com/us/app/frontier-crypto-defi-wallet/id1482380988",
      qrCode: "https://www.frontier.xyz/download",
      chrome: "https://chrome.google.com/webstore/detail/frontier-wallet/kppfdiipphfccemcignhifpjkapfbihd",
      browserExtension: "https://www.frontier.xyz/download"
    },
    createConnector: () => {
      const shouldUseWalletConnect = !isFrontierInjected;
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        chains,
        projectId: projectId2,
        options: walletConnectOptions,
        version: walletConnectVersion
      }) : new InjectedConnector16({ chains });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isAndroid() ? `frontier://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector: new InjectedConnector16({
          chains,
          options: {
            getProvider: () => {
              const getFront = (frontier) => (frontier == null ? void 0 : frontier.ethereum) ? frontier == null ? void 0 : frontier.ethereum : void 0;
              if (typeof window === "undefined")
                return;
              return getFront(window.frontier);
            },
            ...options
          }
        }),
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://help.frontier.xyz/en/",
            steps: [
              {
                description: "We recommend putting Frontier Wallet on your home screen for quicker access.",
                step: "install",
                title: "Open the Frontier Wallet app"
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
            learnMoreUrl: "https://help.frontier.xyz/en/articles/6967236-setting-up-frontier-on-your-device",
            steps: [
              {
                description: "We recommend pinning Frontier Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Frontier Wallet extension"
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

// src/rainbowkit/src/wallets/walletConnectors/imTokenWallet/imTokenWallet.ts
var imTokenWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "imToken",
  name: "imToken",
  iconUrl: async () => (await import("./imTokenWallet-ZGOSWYBP.js")).default,
  iconBackground: "#098de6",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=im.token.app",
    ios: "https://itunes.apple.com/us/app/imtoken2/id1384798940",
    mobile: "https://token.im/download",
    qrCode: "https://token.im/download"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId: projectId2,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `imtokenv2://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: typeof window !== "undefined" && window.navigator.language.includes("zh") ? "https://support.token.im/hc/zh-cn/categories/360000925393" : "https://support.token.im/hc/en-us/categories/360000925393",
          steps: [
            {
              description: "Put imToken app on your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the imToken app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap Scanner Icon in top right corner"
            }
          ]
        }
      }
    };
  }
});

// src/rainbowkit/src/wallets/walletConnectors/ledgerWallet/ledgerWallet.ts
var ledgerWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "ledger",
  iconBackground: "#000",
  name: "Ledger Live",
  iconUrl: async () => (await import("./ledgerWallet-USAR2UNS.js")).default,
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=com.ledger.live",
    ios: "https://apps.apple.com/us/app/ledger-live-web3-wallet/id1361671700",
    mobile: "https://www.ledger.com/ledger-live",
    qrCode: "https://ledger.com/ledger-live"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId: projectId2,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return isAndroid() ? uri : `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      desktop: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `ledgerlive://wc?uri=${encodeURIComponent(uri)}`;
        }
      }
    };
  }
});

// src/rainbowkit/src/wallets/walletConnectors/mewWallet/mewWallet.ts
import { InjectedConnector as InjectedConnector17 } from "wagmi/connectors/injected";
var mewWallet = ({
  chains,
  ...options
}) => {
  var _a;
  const isMewWalletInjected = typeof window !== "undefined" && Boolean(
    (_a = window.ethereum) == null ? void 0 : _a.isMEWwallet
  );
  return {
    id: "mew",
    name: "MEW wallet",
    iconUrl: async () => (await import("./mewWallet-KJE22VAW.js")).default,
    iconBackground: "#fff",
    installed: isMewWalletInjected,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.myetherwallet.mewwallet&referrer=utm_source%3Drainbow",
      ios: "https://apps.apple.com/app/apple-store/id1464614025?pt=118781877&mt=8&ct=rainbow",
      mobile: "https://mewwallet.com",
      qrCode: "https://mewwallet.com"
    },
    createConnector: () => {
      return {
        connector: new InjectedConnector17({
          chains,
          options
        })
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/omniWallet/omniWallet.ts
var omniWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "omni",
  name: "Omni",
  iconUrl: async () => (await import("./omniWallet-7L7SYDCR.js")).default,
  iconBackground: "#000",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=fi.steakwallet.app",
    ios: "https://itunes.apple.com/us/app/id1569375204",
    mobile: "https://omniwallet.app.link",
    qrCode: "https://omniwallet.app.link"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId: projectId2,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return isAndroid() ? uri : `omni://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: "https://omni.app/support",
          steps: [
            {
              description: "Add Omni to your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Omni app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap the QR icon and scan"
            }
          ]
        }
      }
    };
  }
});

// src/rainbowkit/src/wallets/walletConnectors/oneKeyWallet/oneKeyWallet.ts
import { InjectedConnector as InjectedConnector18 } from "wagmi/connectors/injected";
var oneKeyWallet = ({ chains }) => {
  var _a;
  const provider = typeof window !== "undefined" && ((_a = window["$onekey"]) == null ? void 0 : _a.ethereum);
  const isOnekeyInjected = Boolean(provider);
  return {
    createConnector: () => {
      const connector = new InjectedConnector18({
        chains,
        options: {
          getProvider: () => provider
        }
      });
      return {
        connector,
        extension: {
          instructions: {
            learnMoreUrl: "https://help.onekey.so/hc/en-us/categories/360000170236",
            steps: [
              {
                description: "We recommend pinning OneKey Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the OneKey Wallet extension"
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
    },
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=so.onekey.app.wallet",
      browserExtension: "https://www.onekey.so/download/",
      chrome: "https://chrome.google.com/webstore/detail/onekey/jnmbobjmhlngoefaiojfljckilhhlhcj",
      edge: "https://microsoftedge.microsoft.com/addons/detail/onekey/obffkkagpmohennipjokmpllocnlndac",
      ios: "https://apps.apple.com/us/app/onekey-open-source-wallet/id1609559473",
      mobile: "https://www.onekey.so/download/",
      qrCode: "https://www.onekey.so/download/"
    },
    iconAccent: "#00B812",
    iconBackground: "#fff",
    iconUrl: async () => (await import("./oneKeyWallet-HURFK5TG.js")).default,
    id: "onekey",
    installed: isOnekeyInjected,
    name: "OneKey"
  };
};

// src/rainbowkit/src/wallets/walletConnectors/phantomWallet/phantomWallet.ts
import { InjectedConnector as InjectedConnector19 } from "wagmi/connectors/injected";
var phantomWallet = ({
  chains,
  ...options
}) => {
  var _a;
  return {
    id: "phantom",
    name: "Phantom",
    iconUrl: async () => (await import("./phantomWallet-WL7QJSIK.js")).default,
    iconBackground: "#9A8AEE",
    installed: typeof window !== "undefined" && !!((_a = window.phantom) == null ? void 0 : _a.ethereum) || void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=app.phantom",
      ios: "https://apps.apple.com/app/phantom-solana-wallet/1598432977",
      mobile: "https://phantom.app/download",
      qrCode: "https://phantom.app/download",
      chrome: "https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa",
      firefox: "https://addons.mozilla.org/firefox/addon/phantom-app/",
      browserExtension: "https://phantom.app/download"
    },
    createConnector: () => {
      const getProvider2 = () => {
        var _a2;
        return typeof window !== "undefined" ? (_a2 = window.phantom) == null ? void 0 : _a2.ethereum : void 0;
      };
      const connector = new InjectedConnector19({
        chains,
        options: { getProvider: getProvider2, ...options }
      });
      return {
        connector,
        extension: {
          instructions: {
            steps: [
              {
                description: "We recommend pinning Phantom to your taskbar for easier access to your wallet.",
                step: "install",
                title: "Install the Phantom extension"
              },
              {
                description: "Be sure to back up your wallet using a secure method. Never share your secret recovery phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser"
              }
            ],
            learnMoreUrl: "https://help.phantom.app"
          }
        }
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/rabbyWallet/rabbyWallet.ts
import { InjectedConnector as InjectedConnector20 } from "wagmi/connectors/injected";
var rabbyWallet = ({
  chains,
  ...options
}) => ({
  id: "rabby",
  name: "Rabby Wallet",
  iconUrl: async () => (await import("./rabbyWallet-7RZJC3BQ.js")).default,
  iconBackground: "#8697FF",
  installed: typeof window !== "undefined" && typeof window.ethereum !== "undefined" && window.ethereum.isRabby === true,
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/rabby-wallet/acmacodkjbdgmoleebolmdjonilkdbch",
    browserExtension: "https://rabby.io"
  },
  createConnector: () => ({
    connector: new InjectedConnector20({
      chains,
      options
    }),
    extension: {
      instructions: {
        learnMoreUrl: "https://rabby.io/",
        steps: [
          {
            description: "We recommend pinning Rabby to your taskbar for quicker access to your wallet.",
            step: "install",
            title: "Install the Rabby extension"
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
  })
});

// src/rainbowkit/src/wallets/walletConnectors/safeheronWallet/safeheronWallet.ts
import { InjectedConnector as InjectedConnector21 } from "wagmi/connectors/injected";
var safeheronWallet = ({
  chains,
  ...options
}) => ({
  id: "safeheron",
  name: "Safeheron",
  installed: typeof window !== "undefined" && typeof window.safeheron !== "undefined" && window.safeheron.isSafeheron === true,
  iconUrl: async () => (await import("./safeheronWallet-VWXLGQAX.js")).default,
  iconBackground: "#fff",
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/safeheron/aiaghdjafpiofpainifbgfgjfpclngoh",
    browserExtension: "https://www.safeheron.com/"
  },
  createConnector: () => ({
    connector: new InjectedConnector21({
      chains,
      options: {
        getProvider: () => typeof window !== "undefined" ? window.safeheron : void 0,
        ...options
      }
    }),
    extension: {
      instructions: {
        learnMoreUrl: "https://www.safeheron.com/",
        steps: [
          {
            description: "We recommend pinning Safeheron to your taskbar for quicker access to your wallet.",
            step: "install",
            title: "Install the Core extension"
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
  })
});

// src/rainbowkit/src/wallets/walletConnectors/tahoWallet/tahoWallet.ts
import { InjectedConnector as InjectedConnector22 } from "wagmi/connectors/injected";
var tahoWallet = ({
  chains,
  ...options
}) => ({
  id: "taho",
  name: "Taho",
  iconBackground: "#d08d57",
  iconUrl: async () => (await import("./tahoWallet-KDD4N2K7.js")).default,
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd",
    browserExtension: "https://taho.xyz"
  },
  installed: typeof window !== "undefined" && typeof window.tally !== "undefined" && window["tally"] ? true : void 0,
  createConnector: () => {
    return {
      connector: new InjectedConnector22({
        chains,
        options: {
          getProvider: () => {
            const getTaho = (tally) => (tally == null ? void 0 : tally.isTally) ? tally : void 0;
            if (typeof window === "undefined")
              return;
            return getTaho(window.tally);
          },
          ...options
        }
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://tahowallet.notion.site/Taho-Knowledge-Base-4d95ed5439c64d6db3d3d27abf1fdae5",
          steps: [
            {
              description: "We recommend pinning Taho to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the Taho extension"
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
});

// src/rainbowkit/src/wallets/walletConnectors/talismanWallet/talismanWallet.ts
import { InjectedConnector as InjectedConnector23 } from "wagmi/connectors/injected";
var talismanWallet = ({
  chains,
  ...options
}) => ({
  id: "talisman",
  name: "Talisman",
  iconUrl: async () => (await import("./talismanWallet-YOZUSBVG.js")).default,
  iconBackground: "#fff",
  installed: typeof window !== "undefined" && typeof window.talismanEth !== "undefined" && window.talismanEth.isTalisman === true,
  downloadUrls: {
    chrome: "https://chrome.google.com/webstore/detail/talisman-polkadot-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld",
    firefox: "https://addons.mozilla.org/en-US/firefox/addon/talisman-wallet-extension/",
    browserExtension: "https://talisman.xyz/download"
  },
  createConnector: () => ({
    connector: new InjectedConnector23({
      chains,
      options: {
        getProvider: () => {
          if (typeof window === "undefined")
            return;
          return window.talismanEth;
        },
        ...options
      }
    }),
    extension: {
      instructions: {
        learnMoreUrl: "https://talisman.xyz/",
        steps: [
          {
            description: "We recommend pinning Talisman to your taskbar for quicker access to your wallet.",
            step: "install",
            title: "Install the Talisman extension"
          },
          {
            description: "Be sure to back up your wallet using a secure method. Never share your recovery phrase with anyone.",
            step: "create",
            title: "Create or Import an Ethereum Wallet"
          },
          {
            description: "Once you set up your wallet, click below to refresh the browser and load up the extension.",
            step: "refresh",
            title: "Refresh your browser"
          }
        ]
      }
    }
  })
});

// src/rainbowkit/src/wallets/walletConnectors/trustWallet/trustWallet.ts
import { InjectedConnector as InjectedConnector24 } from "wagmi/connectors/injected";
function getTrustWalletInjectedProvider() {
  var _a;
  const isTrustWallet = (ethereum) => {
    const trustWallet2 = !!ethereum.isTrust;
    return trustWallet2;
  };
  const injectedProviderExist = typeof window !== "undefined" && typeof window.ethereum !== "undefined";
  if (!injectedProviderExist) {
    return;
  }
  if (window["trustwallet"]) {
    return window["trustwallet"];
  }
  if (isTrustWallet(window.ethereum)) {
    return window.ethereum;
  }
  if ((_a = window.ethereum) == null ? void 0 : _a.providers) {
    return window.ethereum.providers.find(isTrustWallet);
  }
}
var trustWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isTrustWalletInjected = Boolean(getTrustWalletInjectedProvider());
  const shouldUseWalletConnect = !isTrustWalletInjected;
  return {
    id: "trust",
    name: "Trust Wallet",
    iconUrl: async () => (await import("./trustWallet-6VTFD43D.js")).default,
    installed: isTrustWalletInjected || void 0,
    iconAccent: "#3375BB",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
      mobile: "https://trustwallet.com/download",
      qrCode: "https://trustwallet.com/download",
      chrome: "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      browserExtension: "https://trustwallet.com/browser-extension"
    },
    createConnector: () => {
      const getUriMobile = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return `trust://wc?uri=${encodeURIComponent(uri)}`;
      };
      const getUriQR = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return uri;
      };
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector24({
        chains,
        options: {
          getProvider: getTrustWalletInjectedProvider,
          ...options
        }
      });
      const mobileConnector = {
        getUri: shouldUseWalletConnect ? getUriMobile : void 0
      };
      let qrConnector = void 0;
      if (shouldUseWalletConnect) {
        qrConnector = {
          getUri: getUriQR,
          instructions: {
            learnMoreUrl: "https://trustwallet.com/",
            steps: [
              {
                description: "Put Trust Wallet on your home screen for faster access to your wallet.",
                step: "install",
                title: "Open the Trust Wallet app"
              },
              {
                description: "Create a new wallet or import an existing one.",
                step: "create",
                title: "Create or Import a Wallet"
              },
              {
                description: "Choose New Connection, then scan the QR code and confirm the prompt to connect.",
                step: "scan",
                title: "Tap WalletConnect in Settings"
              }
            ]
          }
        };
      }
      const extensionConnector = {
        instructions: {
          learnMoreUrl: "https://trustwallet.com/browser-extension",
          steps: [
            {
              description: "Click at the top right of your browser and pin Trust Wallet for easy access.",
              step: "install",
              title: "Install the Trust Wallet extension"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a wallet"
            },
            {
              description: "Once you set up Trust Wallet, click below to refresh the browser and load up the extension.",
              step: "refresh",
              title: "Refresh your browser"
            }
          ]
        }
      };
      return {
        connector,
        mobile: mobileConnector,
        qrCode: qrConnector,
        extension: extensionConnector
      };
    }
  };
};

// src/rainbowkit/src/wallets/walletConnectors/uniswapWallet/uniswapWallet.ts
var uniswapWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2"
}) => ({
  id: "uniswap",
  name: "Uniswap Wallet",
  iconUrl: async () => (await import("./uniswapWallet-LQIXTZCK.js")).default,
  iconBackground: "#FFD8EA",
  downloadUrls: {
    ios: "https://apps.apple.com/app/apple-store/id6443944476",
    mobile: "https://wallet.uniswap.org/",
    qrCode: "https://wallet.uniswap.org/"
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      projectId: projectId2,
      chains,
      version: walletConnectVersion,
      options: walletConnectOptions
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(
            connector,
            walletConnectVersion
          );
          return `uniswap://wc?uri=${encodeURIComponent(uri)}`;
        }
      },
      qrCode: {
        getUri: async () => getWalletConnectUri(connector, walletConnectVersion),
        instructions: {
          learnMoreUrl: "https://wallet.uniswap.org/",
          steps: [
            {
              description: "Add Uniswap Wallet to your home screen for faster access to your wallet.",
              step: "install",
              title: "Open the Uniswap app"
            },
            {
              description: "Create a new wallet or import an existing one.",
              step: "create",
              title: "Create or Import a Wallet"
            },
            {
              description: "Tap the QR icon on your homescreen, scan the code and confirm the prompt to connect.",
              step: "scan",
              title: "Tap the QR icon and scan"
            }
          ]
        }
      }
    };
  }
});

// src/rainbowkit/src/wallets/walletConnectors/xdefiWallet/xdefiWallet.ts
import { InjectedConnector as InjectedConnector25 } from "wagmi/connectors/injected";
var xdefiWallet = ({
  chains,
  ...options
}) => {
  const isInstalled = typeof window !== "undefined" && typeof (window == null ? void 0 : window.xfi) !== "undefined";
  return {
    id: "xdefi",
    name: "XDEFI Wallet",
    installed: isInstalled,
    iconUrl: async () => (await import("./xdefiWallet-CEFL7JWP.js")).default,
    iconBackground: "#fff",
    downloadUrls: {
      chrome: "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf",
      browserExtension: "https://xdefi.io"
    },
    createConnector: () => ({
      connector: new InjectedConnector25({
        chains,
        options: {
          getProvider: () => {
            var _a;
            return isInstalled ? (_a = window.xfi) == null ? void 0 : _a.ethereum : void 0;
          },
          ...options
        }
      }),
      extension: {
        instructions: {
          learnMoreUrl: "https://xdefi.io/support-categories/xdefi-wallet/",
          steps: [
            {
              description: "We recommend pinning XDEFI Wallet to your taskbar for quicker access to your wallet.",
              step: "install",
              title: "Install the XDEFI Wallet extension"
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
    })
  };
};

// src/rainbowkit/src/wallets/walletConnectors/zerionWallet/zerionWallet.ts
import { InjectedConnector as InjectedConnector26 } from "wagmi/connectors/injected";
var zerionWallet = ({
  chains,
  projectId: projectId2,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}) => {
  const isZerionInjected = typeof window !== "undefined" && (typeof window.ethereum !== "undefined" && window.ethereum.isZerion || typeof window.zerionWallet !== "undefined");
  const shouldUseWalletConnect = !isZerionInjected;
  return {
    id: "zerion",
    name: "Zerion",
    iconUrl: async () => (await import("./zerionWallet-KDATVI33.js")).default,
    iconAccent: "#2962ef",
    iconBackground: "#2962ef",
    installed: !shouldUseWalletConnect ? isZerionInjected : void 0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=io.zerion.android",
      ios: "https://apps.apple.com/app/apple-store/id1456732565",
      mobile: "https://link.zerion.io/pt3gdRP0njb",
      qrCode: "https://link.zerion.io/pt3gdRP0njb",
      chrome: "https://chrome.google.com/webstore/detail/klghhnkeealcohjjanjjdaeeggmfmlpl",
      browserExtension: "https://zerion.io/extension"
    },
    createConnector: () => {
      const connector = shouldUseWalletConnect ? getWalletConnectConnector({
        projectId: projectId2,
        chains,
        version: walletConnectVersion,
        options: walletConnectOptions
      }) : new InjectedConnector26({
        chains,
        options: {
          getProvider: () => typeof window !== "undefined" ? window.zerionWallet || window.ethereum : void 0,
          ...options
        }
      });
      const getUri = async () => {
        const uri = await getWalletConnectUri(connector, walletConnectVersion);
        return isIOS() ? `zerion://wc?uri=${encodeURIComponent(uri)}` : uri;
      };
      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUri : void 0
        },
        qrCode: shouldUseWalletConnect ? {
          getUri,
          instructions: {
            learnMoreUrl: "https://zerion.io/blog/announcing-the-zerion-smart-wallet/",
            steps: [
              {
                description: "We recommend putting Zerion on your home screen for quicker access.",
                step: "install",
                title: "Open the Zerion app"
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
            learnMoreUrl: "https://help.zerion.io/en/",
            steps: [
              {
                description: "We recommend pinning Zerion to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the Zerion extension"
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
export {
  ActivePixelButton,
  ActivePixelButtonColor,
  ActivePixelCard,
  ActivePixelColorCard,
  AllChainInfo,
  AnimatePresence2 as AnimatePresence,
  BM,
  Balance_default as Balance,
  BigNumberJs_default as BigNumberJs,
  BlockExplorerUrls,
  CODELENGTH,
  ChainId,
  ChainImage,
  ChainName,
  ChainNetworkName,
  ChainRpcUrls,
  ChainSelector,
  ChainSelectorWidget_default as ChainSelectorWidget,
  CommunityLink_default as CommunityLink,
  ConnectButton,
  Currency,
  CurrencyContract,
  CurrencyLogo,
  CurrencyLogo_default as CurrencyLogoComp,
  DPSupportChainId,
  DialogClose_default as DialogClose,
  DivWrap_default as DivWrap,
  FORMAT,
  Games,
  Gas0Constants,
  GlobalVar,
  header_default as Header,
  IContractName,
  IGameName,
  IGameStatus,
  INavLinkType,
  ITvlHero,
  IsMdProvider,
  IsPixelWidget_default as IsPixelWidget,
  IsTablePixelWidget,
  IsW1100Provider,
  IsW1220Provider,
  IsW768Provider,
  L3ChainId,
  LinkList,
  LinkPre,
  LinkToBetaDialog_default as LinkToBetaDialog,
  ListWithMotion_default as ListWithMotion,
  LngNs,
  LoadingButton_default as LoadingButton,
  ModalWithMotion_default as ModalWithMotion,
  multicall_default as MulticallContract,
  NavKey,
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
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  RainbowKitWithThemeProvider_default as RainbowKitWithThemeProvider,
  RecoilRoot,
  RefreshState,
  SideBar_default as SideBar,
  SvgComponent_default as SvgComponent,
  TG_BOT_URL,
  TVLChainId,
  TVLStakingSupportedChainId,
  TVL_API,
  TaskFollowZypher,
  TaskJoinTelegramGroup,
  TaskReweet1,
  TaskTelegramBot,
  TelegramUserInfoState,
  TonConnectUIProvider_default as TonConnectUIProvider,
  bingoPoints_default as ZkBingoPointsContract,
  __private__,
  aaApproveAndFcErc20,
  accountInfoDialogState,
  activeTokenList,
  addressIsEqual,
  animate,
  appInfo,
  argentWallet,
  atom10 as atom,
  bifrostWallet,
  bingoBetaSupportedChainId,
  bingoSupportedChainId,
  bingoV1SupportedChainId,
  bitKeepWallet,
  bitgetWallet,
  bitskiWallet,
  blankLinkList,
  bnPow10,
  braveWallet,
  chainIdPre,
  changeLanguage2 as changeLanguage,
  cn_default as cn,
  coin98Wallet,
  coinbaseWallet,
  connectorState,
  connectorsForWallets,
  convertToLargeNumberRepresentation,
  coreWallet,
  crLink,
  createAuthenticationAdapter,
  cssObjectFromTheme,
  cssStringFromTheme,
  darkTheme,
  dawnWallet,
  defaultActiveChainId,
  dialogVariants,
  divisor6xBigNumber,
  divisorBigNumber,
  eX,
  enkryptWallet,
  erc20Abi,
  erc20_default as erc20Contract,
  erc721Abi,
  erc721_default2 as erc721Contract,
  filterInput,
  formatCurrency,
  formatDataFromGraph,
  formatMoney,
  formatSymbol,
  foxWallet,
  frameWallet,
  frontierWallet,
  getChainId,
  getContract2 as getContract,
  getContractFromRpc,
  getCryptoImg,
  getDefaultWallets,
  getFormattedTime,
  getFormattedTimeMobile,
  getIsCode,
  getLinkPre,
  getLocalTime,
  getProvider,
  getRecentGameById,
  getShortenAddress,
  getShortenAddress2,
  getStatus,
  getUTCSeconds,
  getWalletConnectConnector,
  getWeb3Sign,
  graphqlApiUrl,
  hidePointsWarnState,
  httpGet,
  httpPost,
  imTokenWallet,
  injectedWallet,
  isPro,
  isTestnet,
  isTimeout,
  languageList,
  ledgerWallet,
  lightTheme,
  linkToBetaDialogChainIdState,
  linkToBetaDialogState,
  localStorageEffect,
  measureText,
  metaMaskWallet,
  mewWallet,
  midnightTheme,
  minStakingValue,
  motion4 as motion,
  nativeBalanceState,
  okxWallet,
  omniWallet,
  oneKeyWallet,
  ownerListState,
  pathnameState,
  phantomWallet,
  pointsBalanceState,
  pointsDialogState,
  pointsRuleDialogState,
  pointsWarnState,
  pow10,
  preStaticUrl,
  rabbyWallet,
  rainbowWallet,
  refreshAvatarState,
  refreshBalanceState,
  request,
  safeWallet,
  safeheronWallet,
  selector,
  sideCollapseState,
  sleep,
  splitArrByLen,
  supportedChainIds,
  tahoWallet,
  talismanWallet,
  targetDate,
  tgNameListState,
  timeoutPromise,
  timestampToDateStr,
  toUserFriendlyAddress,
  tokenPocketWallet,
  trustWallet,
  tvlTokenAddress,
  tvlTokens,
  txStatus,
  uniswapWallet,
  useAaWallet,
  useAccount14 as useAccount,
  useAccountInvitation,
  useAccountModal,
  useActiveWeb3React,
  useAddRecentTransaction,
  useAsyncImage,
  useAvatar,
  useChainId,
  useChainModal,
  useConnectModal,
  useConnectionStatus,
  useContractReads,
  useCreate,
  useCurrentLanguage,
  useCustomTranslation,
  useDisconnect6 as useDisconnect,
  useGetHero,
  useGetInvitationAddress,
  useGetOwnAddress,
  useGetTgName,
  useGetUserInfo,
  useGetWalletClient,
  useInitRainbowFn,
  useInterval,
  useIsMd,
  useIsTelegram,
  useIsW1100,
  useIsW1220,
  useIsW768,
  useMotionValue,
  useNativeBalanceStr,
  useNavItem,
  usePointsBalanceStr,
  usePublicClient4 as usePublicClient,
  usePublicNodeWaitForTransaction,
  useRecentGamesFromGraph,
  useRecoilState14 as useRecoilState,
  useRecoilValue14 as useRecoilValue,
  useResetRecoilState,
  useSetAaWallet,
  useSetRecoilState18 as useSetRecoilState,
  useSpring,
  useSwapPoint,
  useSwitchNetwork2 as useSwitchNetwork,
  useTelegramAccountInit,
  useTelegramUser,
  useTonAddress,
  useTonConnectUI2 as useTonConnectUI,
  useTonWallet2 as useTonWallet,
  useTonWalletProofMounted,
  useTransform,
  useWalletClient2 as useWalletClient,
  useWalletConnectors,
  useWalletHandler,
  useWebAppData,
  useWindowSize,
  walletConnectWallet,
  walletModalOpenState,
  xdefiWallet,
  zAceLink,
  zerionWallet,
  zkBingo,
  zkBingoV0
};
