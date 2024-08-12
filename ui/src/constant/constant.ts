import { TonProofItemReplySuccess } from "@tonconnect/ui-react";
import { AddressZero } from "@ethersproject/constants";
import zkBingoContracts from "@zypher-game/bingo-periphery/contracts.json";
import zkBingoContractsV1 from "@zypher-game/bingo-periphery-v1/contracts.json";
import contract from "@zypher-game/events/contracts.json";
import BigNumberjs from "bignumber.js";
import { Address } from "wagmi";

export const appInfo = {
  appName: "Zypher Game",
};
export const divisor6xBigNumber = new BigNumberjs("10").exponentiatedBy(6);
export const divisorBigNumber = new BigNumberjs("10").exponentiatedBy(18);
export const txStatus = "success"; // '1'

export const isPro = (): boolean => {
  if (
    window.location.host.startsWith("app") ||
    window.location.host.startsWith("zypher")
  ) {
    return true;
  }
  return false;
};

export const isLocalhost = (): boolean => {
  if (window.location.host.startsWith("192.168")) {
    return true;
  }
  return false;
};

export const preStaticUrl = isPro()
  ? "https://static.zypher.game"
  : "https://static-dev.zypher.game";
export enum ChainId {
  Bsc = "56",
  BscTestnet = "97",
  Arbitrum = "42161",
  ArbitrumRinkeby = "421611",
  ArbitrumGoerli = "421613",
  LineaSepolia = "59141",
  LineaMainnet = "59144",
  POLYGON_MUMBAI = "80001",

  //develop
  POLYGON_ZKEVM = "1442",
  ScrollAlphaTestnet = "534353",
  OPBNBTEST = "5611",
  OPBNB = "204",
  ScrollSepoliaTestnet = "534351",
  MantaPacificMainnet = "169",
  MantaPacificTestnet = "3441005",
  Combo = "9980",
  ComboTestnet = "91715",
  Mantle = "5000",
  MantleTestnet = "5001",

  Sepolia = "11155111",
  B2 = "223",
  B2Testnet = "1123",

  ZytronLineaSepoliaTestnet = "19546",
  ZytronB2Testnet = "50097",

  Taiko = "167000",

  SagaMainnet = "2717465680371000",
}
const TGChainId = window.IS_TELEGRAM ? [ChainId.SagaMainnet] : undefined;
export const DPSupportChainId = !isPro()
  ? [
      ChainId.LineaMainnet,
      ChainId.LineaSepolia,
      ChainId.OPBNBTEST,
      ChainId.OPBNB,
      ChainId.ZytronLineaSepoliaTestnet,
    ]
  : [ChainId.LineaMainnet, ChainId.OPBNB];

// export const defaultChainId = ChainId.OPBNB;

export const bingoV1SupportedChainId = !isPro()
  ? [
      ChainId.LineaMainnet,
      ChainId.LineaSepolia,
      ChainId.OPBNB,
      ChainId.OPBNBTEST,
      ChainId.ZytronLineaSepoliaTestnet,
    ]
  : [ChainId.LineaMainnet, ChainId.OPBNB];
export const bingoBetaSupportedChainId = TGChainId
  ? TGChainId
  : !isPro()
  ? [
      // ChainId.Arbitrum,
      // ChainId.ArbitrumGoerli,
      // ChainId.ScrollSepoliaTestnet,
      // ChainId.MantleTestnet,
      // ChainId.Mantle,
      // ChainId.Combo,
      // ChainId.ComboTestnet,
      // ChainId.MantaPacificTestnet,
      // ChainId.MantaPacificMainnet,
      ChainId.SagaMainnet,
    ]
  : [
      ChainId.Arbitrum,
      ChainId.Mantle,
      ChainId.MantaPacificMainnet,
      ChainId.Combo,
    ];
export const bingoSupportedChainId = TGChainId || [
  ...bingoV1SupportedChainId,
  ...bingoBetaSupportedChainId,
];
export const supportedChainIds = (
  env?: string,
  chainList?: ChainId[]
): Array<ChainId> => {
  return TGChainId
    ? TGChainId
    : chainList
    ? chainList
    : !isPro() || env === "develop"
    ? [
        ChainId.LineaMainnet,
        ChainId.LineaSepolia,
        ChainId.B2,
        ChainId.B2Testnet,
        ChainId.Taiko,
        ChainId.OPBNB,
        ChainId.OPBNBTEST,
        ChainId.Arbitrum,
        ChainId.ArbitrumGoerli,
        ChainId.MantaPacificMainnet,
        ChainId.MantaPacificTestnet,
        ChainId.Mantle,
        ChainId.MantleTestnet,
        ChainId.ComboTestnet,
        ChainId.Combo,
        ChainId.Sepolia,
        ChainId.ZytronLineaSepoliaTestnet,
        ChainId.ZytronB2Testnet,
        ChainId.SagaMainnet,
      ]
    : [
        ChainId.LineaMainnet,
        ChainId.OPBNB,
        ChainId.Taiko,
        ChainId.Arbitrum,
        ChainId.Mantle,
        ChainId.Combo,
        ChainId.MantaPacificMainnet,
        ChainId.B2,
      ];
};
export const ChainRpcUrls: Record<ChainId, string[]> = {
  [ChainId.LineaSepolia]: ["https://rpc.sepolia.linea.build"],
  [ChainId.LineaMainnet]: ["https://rpc.linea.build"],
  [ChainId.Arbitrum]: ["https://arb1.arbitrum.io/rpc"],
  [ChainId.OPBNBTEST]: ["https://opbnb-testnet-rpc.bnbchain.org/"],
  [ChainId.OPBNB]: [
    "https://opbnb-mainnet-rpc.bnbchain.org",
    "https://opbnb-mainnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3",
  ],
  [ChainId.ScrollSepoliaTestnet]: ["https://sepolia-rpc.scroll.io/"],
  [ChainId.ScrollAlphaTestnet]: ["https://scroll-alpha-public.unifra.io"],
  [ChainId.MantaPacificMainnet]: ["https://pacific-rpc.manta.network/http"],

  [ChainId.Bsc]: [
    "https://bsc-dataseed1.binance.org",
    "https://bsc-mainnet.nodereal.io/v1/a986025b4eae4b82b9c2d577c730d09a",
  ],
  [ChainId.BscTestnet]: [
    "https://endpoints.omniatech.io/v1/bsc/testnet/public",
    "https://bsc-testnet.publicnode.com",
    "https://bsc-testnet.nodereal.io/v1/9459391f32694c11b182c8d4d9cee750",
  ],
  [ChainId.ArbitrumRinkeby]: ["https://rinkeby.arbitrum.io/rpc"],
  [ChainId.ArbitrumGoerli]: [
    "https://endpoints.omniatech.io/v1/arbitrum/goerli/public",
    "https://goerli-rollup.arbitrum.io/rpc",
  ],
  [ChainId.POLYGON_MUMBAI]: [
    "https://polygon-mumbai-bor.publicnode.com",
    "https://matic-mumbai.chainstacklabs.com",
    "https://rpc-mumbai.maticvigil.com",
    "https://matic-testnet-archive-rpc.bwarelabs.com",
  ],
  [ChainId.POLYGON_ZKEVM]: ["https://rpc.public.zkevm-test.net"],
  [ChainId.MantaPacificTestnet]: [
    "https://manta-testnet.calderachain.xyz/http",
  ],
  [ChainId.Combo]: [
    "https://combo-mainnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1",
    "https://combo-mainnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3",
    "https://combo-mainnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac",
  ],
  [ChainId.ComboTestnet]: [
    "https://combo-testnet.nodereal.io/v1/0caf221faccb46e59c65e618779914e3",
    "https://combo-testnet.nodereal.io/v1/e36b7be476d84006acd740b7cebdcdac",
    "https://combo-testnet.nodereal.io/v1/a8d873f8ca3f481e825920241e610cc1",
    // "https://test-rpc.combonetwork.io",
  ],
  [ChainId.Mantle]: ["https://mantle.publicnode.com"],
  [ChainId.MantleTestnet]: ["https://rpc.testnet.mantle.xyz"],
  [ChainId.Sepolia]: [
    "https://endpoints.omniatech.io/v1/eth/sepolia/public",
    "https://ethereum-sepolia-rpc.publicnode.com",
  ],
  [ChainId.B2]: ["https://rpc.bsquared.network"],
  [ChainId.B2Testnet]: ["https://b2-testnet.alt.technology"],
  [ChainId.ZytronLineaSepoliaTestnet]: [
    "https://linea-testnet-zytron.zypher.game",
  ],
  [ChainId.ZytronB2Testnet]: ["https://b2-testnet-zytron.zypher.game"],
  [ChainId.Taiko]: ["https://rpc.hekla.taiko.xyz"],
  [ChainId.SagaMainnet]: [
    "https://zypher-2717465680371000-1.jsonrpc.sagarpc.io",
  ],
};

export const BlockExplorerUrls: Record<ChainId, string[]> = {
  [ChainId.Bsc]: ["https://bscscan.com"],
  [ChainId.BscTestnet]: ["https://testnet.bscscan.com"],
  [ChainId.Arbitrum]: ["https://arbiscan.io"],
  [ChainId.ArbitrumRinkeby]: ["https://testnet.arbiscan.io"],
  [ChainId.POLYGON_MUMBAI]: ["https://mumbai.polygonscan.com"],
  [ChainId.LineaMainnet]: ["https://lineascan.build"],
  [ChainId.LineaSepolia]: ["https://sepolia.lineascan.build"],
  [ChainId.ArbitrumGoerli]: ["https://goerli.arbiscan.io/"],
  [ChainId.POLYGON_ZKEVM]: ["https://testnet-zkevm.polygonscan.com"],
  [ChainId.OPBNBTEST]: ["https://opbnb-testnet.bscscan.com"],
  [ChainId.OPBNB]: ["https://opbnbscan.com/"],
  [ChainId.ScrollSepoliaTestnet]: ["https://sepolia-blockscout.scroll.io"],
  [ChainId.ScrollAlphaTestnet]: ["https://alpha-blockscout.scroll.io"],
  [ChainId.MantaPacificMainnet]: ["https://pacific-explorer.manta.network"],
  [ChainId.MantaPacificTestnet]: ["https://manta-testnet.calderaexplorer.xyz"],
  [ChainId.ComboTestnet]: ["https://combotrace-testnet.nodereal.io/"],
  [ChainId.Mantle]: ["https://explorer.mantle.xyz"],
  [ChainId.MantleTestnet]: ["https://explorer.testnet.mantle.xyz"],
  [ChainId.Combo]: ["https://combotrace.nodereal.io"],
  [ChainId.Sepolia]: ["https://sepolia.etherscan.io"],
  [ChainId.B2]: ["https://explorer.bsquared.network"],
  [ChainId.B2Testnet]: ["https://testnet-explorer.bsquared.network"],
  [ChainId.ZytronLineaSepoliaTestnet]: [
    "https://linea-testnet-zytron-blockscout.zypher.game",
  ],
  [ChainId.ZytronB2Testnet]: [
    "https://b2-testnet-zytron-blockscout.zypher.game",
  ],
  [ChainId.Taiko]: ["https://hekla.taikoscan.network"],
  [ChainId.SagaMainnet]: ["https://zypher-2717465680371000-1.sagaexplorer.io"],
};

export const ChainName: Record<ChainId, string> = {
  [ChainId.Bsc]: "BSC Mainnet",
  [ChainId.BscTestnet]: "BSC Testnet",
  [ChainId.Arbitrum]: "Arbitrum One",
  [ChainId.ArbitrumGoerli]: "Arbitrum Goerli Testnet",
  [ChainId.ArbitrumRinkeby]: "Arbitrum Rinkeby",
  [ChainId.LineaSepolia]: "Linea Sepolia",
  [ChainId.LineaMainnet]: "Linea Mainnet",
  [ChainId.POLYGON_MUMBAI]: "Polygon Mumbai",
  [ChainId.POLYGON_ZKEVM]: "Polygon zkEVM Testnet",
  [ChainId.OPBNBTEST]: "opBNB testnet",
  [ChainId.OPBNB]: "opBNB Mainnet",
  [ChainId.ScrollAlphaTestnet]: "Scroll Alpha Testnet",
  [ChainId.ScrollSepoliaTestnet]: "Scroll Sepolia Testnet",
  [ChainId.MantaPacificMainnet]: "Manta Pacific",
  [ChainId.MantaPacificTestnet]: "Manta Pacific Testnet",
  [ChainId.ComboTestnet]: "Combo Testnet",
  [ChainId.Mantle]: "Mantle",
  [ChainId.MantleTestnet]: "Mantle Testnet",
  [ChainId.Combo]: "Combo",
  [ChainId.Sepolia]: "Sepolia",
  [ChainId.B2]: "B²",
  [ChainId.B2Testnet]: "B² Testnet",
  [ChainId.ZytronLineaSepoliaTestnet]: "Zytron Linea(Sepolia) Testnet",
  [ChainId.ZytronB2Testnet]: "Zytron B² Testnet",
  [ChainId.Taiko]: "Taiko Mainnet",
  [ChainId.SagaMainnet]: "Saga Zypher",
};
export const ChainNetworkName: Record<ChainId, string> = {
  [ChainId.Bsc]: "bsc",
  [ChainId.BscTestnet]: "bsc-testnet",
  [ChainId.Arbitrum]: "arbitrum",
  [ChainId.ArbitrumRinkeby]: "arbitrum-rinkeby",
  [ChainId.LineaSepolia]: "Linea Sepolia",
  [ChainId.LineaMainnet]: "linea",
  [ChainId.POLYGON_MUMBAI]: "maticmum",
  [ChainId.ArbitrumGoerli]: "arbitrum-goerli",
  [ChainId.POLYGON_ZKEVM]: "polygon_zkEVM_testnet",
  [ChainId.ScrollAlphaTestnet]: "Scroll Alpha Testnet",
  [ChainId.OPBNBTEST]: "opBNB testnet",
  [ChainId.OPBNB]: "opBNB Mainnet",
  [ChainId.ScrollSepoliaTestnet]: "Scroll Sepolia Testnet",
  [ChainId.MantaPacificMainnet]: "Manta Pacific",
  [ChainId.MantaPacificTestnet]: "Manta Pacific",
  [ChainId.Combo]: "Combo",
  [ChainId.ComboTestnet]: "Combo Testnet",
  [ChainId.Mantle]: "Mantle",
  [ChainId.MantleTestnet]: "Mantle Testnet",
  [ChainId.Sepolia]: "Sepolia",
  [ChainId.B2]: "B² Mainnet",
  [ChainId.B2Testnet]: "B² Testnet",
  [ChainId.ZytronLineaSepoliaTestnet]: "Zytron Linea(Sepolia) Testnet",
  [ChainId.ZytronB2Testnet]: "Zytron B² Testnet",
  [ChainId.Taiko]: "Taiko Mainnet",
  [ChainId.SagaMainnet]: "Saga Zypher",
};

export const isTestnet: Record<ChainId, boolean> = {
  [ChainId.Bsc]: false,
  [ChainId.BscTestnet]: true,
  [ChainId.Arbitrum]: false,
  [ChainId.ArbitrumRinkeby]: true,
  [ChainId.LineaSepolia]: true,
  [ChainId.LineaMainnet]: false,
  [ChainId.POLYGON_MUMBAI]: true,
  [ChainId.POLYGON_ZKEVM]: true,
  [ChainId.OPBNB]: false,
  [ChainId.OPBNBTEST]: true,
  [ChainId.ArbitrumGoerli]: true,
  [ChainId.ScrollSepoliaTestnet]: true,
  [ChainId.ScrollAlphaTestnet]: true,
  [ChainId.MantaPacificMainnet]: false,
  [ChainId.MantaPacificTestnet]: true,
  [ChainId.Combo]: false,
  [ChainId.ComboTestnet]: true,
  [ChainId.Mantle]: false,
  [ChainId.MantleTestnet]: true,
  [ChainId.Sepolia]: true,
  [ChainId.B2]: false,
  [ChainId.B2Testnet]: true,
  [ChainId.ZytronLineaSepoliaTestnet]: true,
  [ChainId.ZytronB2Testnet]: true,
  [ChainId.Taiko]: false,
  [ChainId.SagaMainnet]: true,
};

export const Currency: Record<ChainId, string> = {
  [ChainId.Bsc]: "BNB",
  [ChainId.BscTestnet]: "BNB",
  [ChainId.Arbitrum]: "ETH",
  [ChainId.ArbitrumRinkeby]: "ETH",
  [ChainId.LineaSepolia]: "ETH",
  [ChainId.LineaMainnet]: "ETH",
  [ChainId.POLYGON_MUMBAI]: "ETH",
  [ChainId.ArbitrumGoerli]: "ETH",
  [ChainId.POLYGON_ZKEVM]: "ETH",
  [ChainId.OPBNBTEST]: "BNB",
  [ChainId.OPBNB]: "BNB",
  [ChainId.ScrollAlphaTestnet]: "ETH",
  [ChainId.ScrollSepoliaTestnet]: "ETH",
  [ChainId.MantaPacificMainnet]: "ETH",
  [ChainId.MantaPacificTestnet]: "ETH",
  [ChainId.Combo]: "BNB",
  [ChainId.ComboTestnet]: "BNB",
  [ChainId.Mantle]: "MNT",
  [ChainId.MantleTestnet]: "MNT",
  [ChainId.Sepolia]: "ETH",
  [ChainId.B2]: "BTC",
  [ChainId.B2Testnet]: "BTC",
  [ChainId.ZytronLineaSepoliaTestnet]: "ETH",
  [ChainId.ZytronB2Testnet]: "BTC",
  [ChainId.Taiko]: "ETH",
  [ChainId.SagaMainnet]: "zyp",
};
export const getCryptoImg = (fileName: string, key: any, type = ".svg") => {
  return preStaticUrl + "/crypto/" + fileName + "/" + key + type;
};
export const ChainImage: Record<ChainId, string> = Object.fromEntries(
  (Object.values(ChainId) as ChainId[]).map((v) => [
    v,
    getCryptoImg("chain", v),
  ])
) as Record<ChainId, string>;
export const CurrencyLogo: Record<ChainId, string> = Object.fromEntries(
  (Object.values(ChainId) as ChainId[]).map((v) => [
    v,
    getCryptoImg("token", Currency[v]),
  ])
) as Record<ChainId, string>;

interface IExternalMarketContract {
  multicall: Address[];
}
// 支持的链
const MulticallV3 = "0xca11bde05977b3631167028862be2a173976ca11";

export const CurrencyContract: Record<ChainId, IExternalMarketContract> = {
  [ChainId.Bsc]: {
    multicall: [MulticallV3],
  },
  [ChainId.BscTestnet]: {
    multicall: [MulticallV3],
  },
  [ChainId.Arbitrum]: {
    multicall: [MulticallV3],
  },
  [ChainId.ArbitrumRinkeby]: {
    multicall: [MulticallV3],
  },
  [ChainId.LineaSepolia]: {
    multicall: [MulticallV3],
  },
  [ChainId.LineaMainnet]: {
    multicall: [MulticallV3],
  },
  [ChainId.POLYGON_MUMBAI]: {
    multicall: [MulticallV3],
  },
  [ChainId.ArbitrumGoerli]: {
    multicall: [MulticallV3],
  },
  [ChainId.POLYGON_ZKEVM]: {
    multicall: [MulticallV3],
  },
  [ChainId.OPBNBTEST]: {
    multicall: [MulticallV3],
    //['0x6A70ED893D85cf6D4059e1CF3e63a48e4D204D32', MulticallV3, '0x48d7ac38530697aDB91061B6D141C8c763edE565'] // '' //MulticallV3
  },
  [ChainId.OPBNB]: {
    multicall: [MulticallV3],
  },
  [ChainId.ScrollSepoliaTestnet]: {
    multicall: [MulticallV3],
  },
  [ChainId.ScrollAlphaTestnet]: {
    multicall: [MulticallV3],
  },
  [ChainId.MantaPacificMainnet]: {
    multicall: [MulticallV3],
  },
  [ChainId.MantaPacificTestnet]: {
    multicall: ["0xd4E91b4401EDb2BD95791462F4ccAaae4026540D"],
  },
  [ChainId.Combo]: {
    multicall: ["0x67c369D697C7A3B5BAE1cA9AEF0bA32F6d4d815a"],
  },
  [ChainId.ComboTestnet]: {
    multicall: ["0x4961661f732e995133fDAa7881481BB10e424f78"],
  },
  [ChainId.Mantle]: {
    multicall: [MulticallV3],
  },
  [ChainId.MantleTestnet]: {
    multicall: ["0xcA11bde05977b3631167028862bE2a173976CA11"],
  },
  [ChainId.Sepolia]: {
    multicall: [MulticallV3],
  },
  [ChainId.B2]: { multicall: ["0x58d644e9B8cfBb07fb7913Bb373b7eCAAEbdF202"] },
  [ChainId.B2Testnet]: {
    multicall: ["0x58d644e9B8cfBb07fb7913Bb373b7eCAAEbdF202"],
  },
  [ChainId.ZytronLineaSepoliaTestnet]: {
    multicall: ["0x7e31A57750CeaD3F6c380d2aeEe3d6aE48c931b9"],
  },
  [ChainId.ZytronB2Testnet]: {
    multicall: ["0x103002767d102ACe6174Eb00f7a54830B9917797"],
  },
  [ChainId.Taiko]: {
    multicall: ["0xE1515C54DAA99D9CD8097Be046A009539aa2a2B9"],
  },
  [ChainId.SagaMainnet]: {
    multicall: ["0xA8712E98aeDF7d4D7AA140c50D4E33F3a4712B68"],
  },
};

export enum IContractName {
  Lobby = "lobby",
  Card = "card",
  Points = "points",
  ZypherGameToken = "ZypherGameToken",
  Reward = "reward",
  Fee = "ZkBingoFee",
  Monster = "Monster",
  Z2048SBT = "Z2048SBT",
  ZkGame2048 = "ZkGame2048",
  ZkGame2048API = "ZkGame2048API",
}
export const zkBingoV0 = (
  chainId: ChainId | undefined,
  name: IContractName
): Address => {
  if (!chainId) {
    throw Error(`Invalid V0 'chainId' parameter '${chainId}'.`);
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    // @ts-ignore
    const address = zkBingoContracts?.[chainId]?.[_repo];
    let returnAddress = AddressZero;
    if (name === IContractName.Lobby) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === IContractName.Card) {
      returnAddress = address.ZkBingoCard;
    } else if (name === IContractName.Points) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === IContractName.ZypherGameToken) {
      returnAddress = address.ZypherGameToken ?? address.ZkBingoToken;
    } else if (name === IContractName.Reward) {
      returnAddress = address.Reward;
    } else if (name === IContractName.Fee) {
      returnAddress = address.ZkBingoFee;
    }
    return (returnAddress ? returnAddress : AddressZero) as Address;
  } catch (e) {
    throw Error(
      `zkBingo V0 Invalid 'chainId' parameter '${chainId}', name: ${name}`
    );
  }
};
export const zkBingo = (
  chainId: ChainId | undefined,
  name: IContractName
): Address => {
  if (!chainId) {
    throw Error(`Invalid V1 'chainId' parameter '${chainId}'.`);
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    // @ts-ignore
    const address = zkBingoContractsV1?.[chainId]?.[_repo];
    let returnAddress = AddressZero;
    if (name === IContractName.Lobby) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === IContractName.Card) {
      returnAddress = address.ZkBingoCard;
    } else if (name === IContractName.Points) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === IContractName.ZypherGameToken) {
      returnAddress =
        chainId === ChainId.ZytronLineaSepoliaTestnet
          ? "0xE84aE76d852b9f522EE0871F0B16317CDc3F122D"
          : address.ZypherGameToken
          ? address.ZypherGameToken
          : address.ZkBingoToken;
    } else if (name === IContractName.Reward) {
      returnAddress = address.Reward;
    } else if (name === IContractName.Fee) {
      returnAddress = address.ZkBingoFee;
    } else if (name === IContractName.Monster) {
      returnAddress = contract[5611].contracts.MonsterSlayer202310.address;
    }
    return (returnAddress ? returnAddress : AddressZero) as Address;
  } catch (e) {
    throw Error(
      `zkBingo V1 Invalid 'chainId' parameter '${chainId}', name: ${name}`
    );
  }
};

export const defaultRankChainId = ChainId.ArbitrumGoerli;
export const TG_BOT_URL = isLocalhost()
  ? "http://192.168.0.20:4000"
  : "https://bingo-api.zypher.game";
// "https://bingo-api.zypher.game";
export const TaskTelegramBot = "https://t.me/zBingoBot";
export const TaskJoinTelegramGroup = "https://t.me/zyphernetwork"; // location.protocol === 'http:' ? 'https://t.me/tt3434' :
export const TaskFollowZypher = "https://twitter.com/Zypher_Network";
export const TaskReweet1 =
  "https://twitter.com/Zypher_Network/status/1819215629041254588";

type IGlobalVar = {
  IS_TELEGRAM: boolean;
  dispatch: (arg: any) => any;
  getContainer?: HTMLElement;
  mockAcc?: any;
};

export const GlobalVar: IGlobalVar = {
  IS_TELEGRAM: !!window.IS_TELEGRAM,
  dispatch: (arg: any) => null as any,
  getContainer: undefined,
  mockAcc: (address: Address, proof?: TonProofItemReplySuccess) => null as any,
};
