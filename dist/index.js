"use client";
// src/index.ts
import {
  useSetRecoilState as useSetRecoilState12,
  atom as atom6,
  selector,
  RecoilRoot,
  useRecoilState as useRecoilState8,
  useRecoilValue as useRecoilValue9,
  useResetRecoilState
} from "recoil";
import { useWalletClient as useWalletClient2 } from "wagmi";

// src/components/SideBar/index.tsx
import classnames2 from "classnames";
import cx from "classnames";
import { memo as memo7, useMemo as useMemo4 } from "react";

// src/hooks/useNavItem.tsx
import { useEffect as useEffect3, useMemo } from "react";
import { useSetRecoilState } from "recoil";

// src/utils/i18n.ts
import i18n from "i18next";
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
}

// src/components/SideBar/component/Language.tsx
import { memo, useCallback, useState } from "react";

// src/hooks/useCustomTranslation.ts
import { useTranslation as useBaseTranslation } from "react-i18next";
var useCustomTranslation = (namespaces) => {
  const { t, i18n: i18n2 } = useBaseTranslation(namespaces);
  return { t, i18n: i18n2 };
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
var preStaticUrl = "https://static.zypher.game";
var ChainId = /* @__PURE__ */ ((ChainId6) => {
  ChainId6[ChainId6["Mainnet"] = 56] = "Mainnet";
  ChainId6[ChainId6["Testnet"] = 97] = "Testnet";
  ChainId6[ChainId6["Arbitrum"] = 42161] = "Arbitrum";
  ChainId6[ChainId6["ArbitrumRinkeby"] = 421611] = "ArbitrumRinkeby";
  ChainId6[ChainId6["LineaTestnet"] = 59140] = "LineaTestnet";
  ChainId6[ChainId6["LineaMainnet"] = 59144] = "LineaMainnet";
  ChainId6[ChainId6["POLYGON_MUMBAI"] = 80001] = "POLYGON_MUMBAI";
  ChainId6[ChainId6["POLYGON_ZKEVM"] = 1442] = "POLYGON_ZKEVM";
  ChainId6[ChainId6["ArbitrumGoerli"] = 421613] = "ArbitrumGoerli";
  ChainId6[ChainId6["ScrollAlphaTestnet"] = 534353] = "ScrollAlphaTestnet";
  ChainId6[ChainId6["OPBNBTEST"] = 5611] = "OPBNBTEST";
  ChainId6[ChainId6["OPBNB"] = 204] = "OPBNB";
  ChainId6[ChainId6["ScrollSepoliaTestnet"] = 534351] = "ScrollSepoliaTestnet";
  ChainId6[ChainId6["MantaPacificMainnet"] = 169] = "MantaPacificMainnet";
  ChainId6[ChainId6["MantaPacificTestnet"] = 3441005] = "MantaPacificTestnet";
  ChainId6[ChainId6["ComboTestnet"] = 91715] = "ComboTestnet";
  ChainId6[ChainId6["Mantle"] = 5e3] = "Mantle";
  ChainId6[ChainId6["MantleTestnet"] = 5001] = "MantleTestnet";
  return ChainId6;
})(ChainId || {});
var defaultChainId = 204 /* OPBNB */;
var supportedChainIds = (env) => {
  return env === "develop" ? [
    59144 /* LineaMainnet */,
    59140 /* LineaTestnet */,
    204 /* OPBNB */,
    5611 /* OPBNBTEST */,
    42161 /* Arbitrum */,
    169 /* MantaPacificMainnet */
  ] : [
    59144 /* LineaMainnet */,
    204 /* OPBNB */,
    42161 /* Arbitrum */,
    169 /* MantaPacificMainnet */
  ];
};
var ChainRpcUrls = {
  [59140 /* LineaTestnet */]: [
    "https://rpc.goerli.linea.build",
    "https://eth-goerli.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"
  ],
  [59144 /* LineaMainnet */]: ["https://rpc.linea.build"],
  [42161 /* Arbitrum */]: ["https://arb1.arbitrum.io/rpc"],
  [5611 /* OPBNBTEST */]: [
    "https://opbnb-testnet-rpc.bnbchain.org/",
    "https://opbnb-testnet.nodereal.io/v1/64a9df0874fb4a93b9d0a3849de012d3"
  ],
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
  [91715 /* ComboTestnet */]: [
    "https://combo-testnet.nodereal.io"
  ],
  [5e3 /* Mantle */]: ["https://mantle.publicnode.com"],
  [5001 /* MantleTestnet */]: ["https://rpc.testnet.mantle.xyz"]
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
  [5001 /* MantleTestnet */]: ["https://explorer.testnet.mantle.xyz"]
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
  [169 /* MantaPacificMainnet */]: "Manta Pacific Mainnet",
  [3441005 /* MantaPacificTestnet */]: "Manta Pacific Testnet",
  [91715 /* ComboTestnet */]: "Combo Testnet",
  [5e3 /* Mantle */]: "Mantle",
  [5001 /* MantleTestnet */]: "Mantle Testnet"
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
  [169 /* MantaPacificMainnet */]: "Manta Pacific Mainnet",
  [3441005 /* MantaPacificTestnet */]: "Manta Pacific Testnet",
  [91715 /* ComboTestnet */]: "Combo Testnet",
  [5e3 /* Mantle */]: "Mantle",
  [5001 /* MantleTestnet */]: "Mantle Testnet"
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
  [91715 /* ComboTestnet */]: true,
  [5e3 /* Mantle */]: false,
  [5001 /* MantleTestnet */]: true
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
  [91715 /* ComboTestnet */]: preStaticUrl + "/img/combo.svg",
  [5e3 /* Mantle */]: preStaticUrl + "/img/MNT.webp",
  [5001 /* MantleTestnet */]: preStaticUrl + "/img/MNT.webp"
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
  [91715 /* ComboTestnet */]: "BNB",
  [5e3 /* Mantle */]: "MNT",
  [5001 /* MantleTestnet */]: "MNT"
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
  [91715 /* ComboTestnet */]: preStaticUrl + "/img/bnb.svg",
  [5e3 /* Mantle */]: preStaticUrl + "/img/MNT.webp",
  [5001 /* MantleTestnet */]: preStaticUrl + "/img/MNT.webp"
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
    multicall: [MulticallV3]
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
    multicall: [MulticallV3]
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
  [91715 /* ComboTestnet */]: {
    multicall: ["0x7cE161f1BF228929626A1D41ffa468E16605AE6f"]
  },
  [5e3 /* Mantle */]: {
    multicall: [MulticallV3]
  },
  [5001 /* MantleTestnet */]: {
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
  return IContractName2;
})(IContractName || {});
var zkBingoV0 = (chainId, name) => {
  if (!chainId) {
    throw Error(`Invalid V1 'chainId' parameter '${chainId}'.`);
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    const address = zkBingoContracts?.[chainId]?.[_repo];
    let returnAddress = AddressZero;
    if (name === "lobby" /* Lobby */) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === "card" /* Card */) {
      returnAddress = address.ZkBingoCard;
    } else if (name === "points" /* Points */) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === "ZypherGameToken" /* ZypherGameToken */) {
      returnAddress = address.ZypherGameToken ?? address.ZkBingoToken;
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
  if (!chainId) {
    throw Error(`Invalid V1 'chainId' parameter '${chainId}'.`);
  }
  try {
    const _repo = isTestnet[chainId] ? "develop" : "release";
    const address = zkBingoContractsV1?.[chainId]?.[_repo];
    let returnAddress = AddressZero;
    if (name === "lobby" /* Lobby */) {
      returnAddress = address.ZkBingoLobby;
    } else if (name === "card" /* Card */) {
      returnAddress = address.ZkBingoCard;
    } else if (name === "points" /* Points */) {
      returnAddress = address.ZkBingoPoints;
    } else if (name === "ZypherGameToken" /* ZypherGameToken */) {
      returnAddress = address.ZypherGameToken ?? address.ZkBingoToken;
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

// src/components/SideBar/component/Language.tsx
var languageList = [
  {
    label: "English",
    keyValue: "en_US"
  },
  {
    label: "\u4E2D\u6587\u7E41\u9AD4",
    keyValue: "zh_TW"
  }
];
var Language = memo(
  ({ className, className_item, className_itemtip, className_on }) => {
    const [show, setShow] = useState(false);
    const { t } = useCustomTranslation([LngNs.common]);
    const handle = useCallback(() => {
      setShow(!show);
    }, [show]);
    const changeLanguageHandle = useCallback((item) => {
      changeLanguage(item.keyValue);
      setShow(false);
      storage_default.set("language", item.keyValue);
    }, []);
    return <div className={className}>
      <div className={className_item} onClick={handle}>
        <p>{t("language")}</p>
        <img src={preStaticUrl + `/img/layout/${show ? "arrow-up" : "arrow-down"}.svg`} />
      </div>
      {show ? <ul className={className_itemtip}>{languageList.map((v) => <li key={v.label} className={className_on} onClick={() => changeLanguageHandle(v)}>{v.label}</li>)}</ul> : null}
    </div>;
  },
  isEqual
);
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
  profile: "profile"
};
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: "en_US",
  backend: {
    loadPath: "https://static.zypher.game/i18n/{{lng}}/{{ns}}.json"
  },
  lng,
  ns: Object.values(LngNs),
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

// src/hooks/useWindowSize.ts
import { useCallback as useCallback2, useContext, useEffect as useEffect2, useState as useState2 } from "react";

// src/provider/IsMobileProvider.tsx
import { createContext, useEffect } from "react";
import { atom, useRecoilState } from "recoil";

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

// src/provider/IsMobileProvider.tsx
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
var IsMobileContext = createContext(void 0);
var IsMdContext = createContext(void 0);
var IsMobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useRecoilState(isMobileState);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMobile = size.width < 768;
    if (isMobile !== nowIsMobile) {
      setIsMobile(nowIsMobile);
    }
  }, [size.width, isMobile]);
  return <IsMobileContext.Provider value={isMobile}>{children}</IsMobileContext.Provider>;
};
var IsMdProvider = ({ children }) => {
  const [isWMd, setIsWMd] = useRecoilState(isWMdState);
  const size = useWindowSize();
  useEffect(() => {
    const nowIsMdMobile = size.width < 950;
    if (isWMd !== nowIsMdMobile) {
      setIsWMd(nowIsMdMobile);
    }
  }, [size.width, isWMd]);
  return <IsMdContext.Provider value={isWMd}>{children}</IsMdContext.Provider>;
};

// src/hooks/useWindowSize.ts
import { useRecoilState as useRecoilState2 } from "recoil";
function useWindowSize() {
  const [size, setSize] = useState2({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });
  const onResize = useCallback2(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);
  useEffect2(() => {
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
var useIsMd = () => {
  const isMd = useContext(IsMdContext);
  if (isMd === void 0) {
    return false;
  }
  return isMd;
};

// src/components/SideBar/state.ts
import { atom as atom2 } from "recoil";
var siderCollapseState = atom2({
  key: "siderCollapseState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")]
});
var defaultSelectedKey = atom2({
  key: "defaultSelectedKeys",
  default: "",
  effects_UNSTABLE: [localStorageEffect("defaultSelectedKeys")]
});

// src/hooks/useNavItem.tsx
var INavLinkType = /* @__PURE__ */ ((INavLinkType2) => {
  INavLinkType2["Games"] = "Games";
  INavLinkType2["Activities"] = "Activities";
  INavLinkType2["Language"] = "Language";
  INavLinkType2["Links"] = "Links";
  return INavLinkType2;
})(INavLinkType || {});
var LinkList = [
  "/#/zBingo",
  "https://app.zypher.game/2048/",
  "https://test-poker.zypher.game/",
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
  useEffect3(() => {
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
      default:
        setDefaultSelectedKey("1");
    }
  }, [location, isMobile]);
};
var useNavItem = () => {
  const { t } = useCustomTranslation([LngNs.siderBar]);
  return useMemo(() => {
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
        link: "/zBingo",
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
      },
      {
        label: t("Defense"),
        keyValue: "9",
        icon: "defense.svg",
        link: "/defense",
        disabled: false,
        type: "Activities" /* Activities */
      },
      {
        label: t("Ranking"),
        keyValue: "8",
        icon: "ranking.svg",
        link: "/ranking",
        disabled: false,
        type: "Activities" /* Activities */
      }
    ];
  }, [t]);
};

// src/components/SideBar/component/CommunityLink.tsx
import { memo as memo2 } from "react";
var CommunityLink = memo2(({ className }) => {
  return <div className={className}>
    <a href="https://twitter.com/Zypher_Games" target="_blank" rel="noreferrer"><img src={preStaticUrl + "/img/layout/twitter.svg"} /></a>
    <a href="https://discord.com/invite/MKJZhS4p2T" target="_blank" rel="noreferrer"><img src={preStaticUrl + "/img/layout/discord.svg"} /></a>
    <a href="http://medium.com/@ZypherGames" target="_blank" rel="noreferrer"><img src={preStaticUrl + "/img/layout/medium.svg"} /></a>
    <a href="https://github.com/zypher-game" target="_blank" rel="noreferrer"><img src={preStaticUrl + "/img/layout/github.svg"} /></a>
    <a href="https://interesting-crop-c73.notion.site/ZypherGames-Basecamp-58f3fc6362dc473db187dcec0b63e74e" target="_blank" rel="noreferrer"><img src={preStaticUrl + "/img/layout/gitbook.svg"} /></a>
  </div>;
}, isEqual);
var CommunityLink_default = CommunityLink;

// src/components/SideBar/component/LinkItemA.tsx
import classnames from "classnames";
import { memo as memo3, useCallback as useCallback3, useMemo as useMemo2 } from "react";
import { useRecoilValue, useSetRecoilState as useSetRecoilState2 } from "recoil";
var useLink = (link, isMobile) => {
  const selectedKey = useRecoilValue(defaultSelectedKey);
  const setDefaultSelectedKey = useSetRecoilState2(defaultSelectedKey);
  const setSiderCollapse = useSetRecoilState2(siderCollapseState);
  const isOn = useMemo2(() => {
    if (selectedKey === link.keyValue) {
      return true;
    }
    return false;
  }, [selectedKey]);
  const linkClickHandle = useCallback3(
    (event) => {
      if (link.disabled) {
        return;
      }
      event.preventDefault();
      setDefaultSelectedKey(link.keyValue);
      if (isMobile) {
        setSiderCollapse(true);
      }
      setTimeout(() => {
        window.location.href = "/#" + link.link;
      }, 200);
    },
    [isMobile]
  );
  return {
    isOn,
    linkClickHandle
  };
};
var LinkItem1 = memo3(
  ({
    className,
    className_on,
    isMobile,
    className_disable,
    ...link
  }) => {
    const { isOn, linkClickHandle } = useLink(link, isMobile);
    return <div onClick={linkClickHandle} className={classnames(
      className,
      link.disabled ? className_disable : "",
      isOn ? className_on : ""
    )}>
      <img src={preStaticUrl + `/img/layout/${link.icon}`} />
      <p>{link.label}</p>
    </div>;
  },
  isEqual
);
var LinkItemA_default = LinkItem1;

// src/components/SideBar/component/SideBarActivitiesList.tsx
import { memo as memo4, useMemo as useMemo3 } from "react";
var SideBarActivitiesList = memo4(
  ({
    className_on,
    className_list,
    className_listItemHorDisable,
    className_listItemHor,
    className_listItemVerDisable,
    className_listItemVer,
    list,
    isMobile
  }) => {
    const { listItemDisable, listItem } = useMemo3(() => {
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
    return <div className={className_list}>{list.map((v) => <LinkItemA_default className_on={className_on} className_disable={listItemDisable} isMobile={isMobile} key={v.keyValue} className={listItem} {...v} />)}</div>;
  },
  isEqual
);
var SideBarActivitiesList_default = SideBarActivitiesList;

// src/components/SideBar/component/SideBarGamesList.tsx
import { memo as memo5 } from "react";
var SideBarGamesList = memo5(
  ({
    className_on,
    className_list,
    className_listItemDisable,
    className_listItem,
    list,
    isMobile
  }) => {
    return <div className={className_list}>{list.map((v) => <LinkItemA_default isMobile={isMobile} className_on={className_on} className_disable={className_listItemDisable} key={v.keyValue} className={className_listItem} {...v} />)}</div>;
  },
  isEqual
);
var SideBarGamesList_default = SideBarGamesList;

// src/components/SideBar/component/SideBarTitle.tsx
import { memo as memo6 } from "react";
var SideBarTitle = memo6(
  ({ className, logo_url_name, logo_title }) => {
    const { t } = useCustomTranslation([LngNs.siderBar]);
    return <div className={className}>
      <img src={preStaticUrl + `/img/layout/${logo_url_name}.svg`} title={t(logo_title)} />
      <p>{t(logo_title)}</p>
    </div>;
  },
  isEqual
);
var SideBarTitle_default = SideBarTitle;

// src/components/SideBar/index.tsx
var MobileLogo = memo7(({ isMobile }) => {
  return <div>
    <img src={preStaticUrl + "/img/layout/logo-min.svg"} />
    <img src={preStaticUrl + "/img/layout/ai.svg"} />
  </div>;
});
var SideBar = (props) => {
  const { isMobile } = props;
  const items = useNavItem();
  usePathname();
  const {
    sideBarGamesLinkList,
    sideBarActivitiesLinkList
  } = useMemo4(() => {
    return {
      sideBarGamesLinkList: items.filter((v) => v.type === "Games" /* Games */),
      sideBarActivitiesLinkList: items.filter(
        (v) => !isMobile ? v.type === "Activities" /* Activities */ && v.keyValue !== "1" : v.type === "Activities" /* Activities */
      )
    };
  }, [items, isMobile]);
  return <div className={classnames2(`${props.className}`, "sidebarWrap")}>
    {isMobile ? null : <a href="https://zypher.game/" target="_black" className={cx("logo")}>
      <img src={preStaticUrl + "/img/layout/logo.svg"} />
      <img src={preStaticUrl + "/img/layout/ai.svg"} />
    </a>}
    <div className="sidebar">
      {isMobile ? null : <>
        <LinkItemA_default className_on="item_on" className_disable="horListItmeDisable" className="horListItme" isMobile={isMobile} {...items[0]} />
        <div className="line" />
      </>}
      <SideBarTitle_default logo_title="Games" logo_url_name="games" className="sideBarTitle" />
      <SideBarGamesList_default className_on="item_on" className_list="gamelist" className_listItem="verListItme" className_listItemDisable="verListItmeDisable" list={sideBarGamesLinkList} isMobile={isMobile} />
      <div className="line" />
      <SideBarTitle_default logo_title="Activities" logo_url_name="activities" className="sideBarTitle" />
      <SideBarActivitiesList_default isMobile={isMobile} className_on="item_on" className_list="activitiesList" className_listItemHorDisable="horListItmeDisable" className_listItemHor="horListItme" className_listItemVerDisable="verListItmeDisable" className_listItemVer="verListItme" list={sideBarActivitiesLinkList} />
      <div className="line" />
      <SideBarTitle_default logo_title="Language" logo_url_name="language" className="sideBarTitle" />
      <Language_default className="language" className_item={classnames2("horListItme", "languageItme")} className_itemtip="languageItmeTip" className_on="languageItmeOn" />
      <div className="line" />
      <SideBarTitle_default logo_title="Links" logo_url_name="links" className="sideBarTitle" />
      <CommunityLink_default className="communityLink" />
    </div>
  </div>;
};
var SideBar_default = SideBar;

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

// src/components/ConnectWallet/hooks/connectWalletHooks.ts
import { useMemo as useMemo5 } from "react";
import { useRecoilValue as useRecoilValue2 } from "recoil";

// src/utils/tool.tsx
import BigNumber from "bignumber.js";
import { utils } from "ethers";
BigNumber.config({ EXPONENTIAL_AT: 1e9 });
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
    if (value === 0) {
      return Number("0").toFixed(n);
    }
    const isNegative = value < 0;
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
  const lastCharacters = address.substring(address.length - endLen, address.length);
  return `${firstCharacters}...${lastCharacters}`;
}

// src/components/ConnectWallet/hooks/connectWalletHooks.ts
var useNativeBalanceStr = () => {
  const nativeBalance = useRecoilValue2(nativeBalanceState);
  return useMemo5(() => {
    return formatMoney(nativeBalance, 2);
  }, [nativeBalance]);
};
var usePointsBalanceStr = () => {
  const pointsBalance = useRecoilValue2(pointsBalanceState);
  return useMemo5(() => {
    return formatMoney(pointsBalance, 0);
  }, [pointsBalance]);
};

// src/components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog.tsx
import { WarningOutlined } from "@ant-design/icons";
import classnames6 from "classnames";
import { memo as memo9, useCallback as useCallback5, useEffect as useEffect4, useMemo as useMemo6 } from "react";
import { useRecoilState as useRecoilState3 } from "recoil";
import styled from "styled-components";

// src/components/ConnectWallet/components/DialogComponents/DialogTitle.tsx
import classnames4 from "classnames";
import { memo as memo8, useCallback as useCallback4 } from "react";

// src/components/icons/index.tsx
import classnames3 from "classnames";
var Icon = (props) => {
  return <img className={classnames3("icon", props.className)} src={preStaticUrl + `/img/icon/${props.name}.svg`} alt="" />;
};
var Icons_default = Icon;

// src/components/ConnectWallet/components/DialogComponents/DialogTitle.tsx
var DialogTitle = memo8(
  ({ label, setDialogOpen, children, classNames }) => {
    const closeHandle = useCallback4(() => {
      setDialogOpen(false);
    }, [setDialogOpen]);
    return <div className={classnames4("dialog_title_modalTitleInner", classNames)}>
      <p className="dialog_title_title">{label}</p>
      {children ? children : null}
      <span onClick={closeHandle}><Icons_default name="close" /></span>
    </div>;
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

// src/components/Modal/Modal.tsx
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";
import classnames5 from "classnames";
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
  return <DialogOverlay isOpen={open} onDismiss={onCancel} className={classnames5("customDialog", "bottom", wrapClassName)} aria-label="Modal"><DialogContent style={{ width }}>{children}</DialogContent></DialogOverlay>;
};
var Modal_default = Modal;

// src/components/ConnectWallet/components/linkToBetaDialog/LinkToBetaDialog.tsx
var Content = styled.div`
  text-align: center;
  padding: 50px;
`;
var DialogButton = styled.div`
  border-radius: 12px;
  background: #6673ff;
  height: 48px;
  border: 0px;

  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
`;
var Text = styled.div`
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 14px;
  padding-top: 30px;
`;
var LinkToBetaDialog = memo9(() => {
  const [linkToBetaDialogOpen, setLinkToBetaDialogOpen] = useRecoilState3(
    linkToBetaDialogState
  );
  const [linkToBetaDialogChainId, setLinkToBetaDialogChainId] = useRecoilState3(
    linkToBetaDialogChainIdState
  );
  const isMobile = useIsMobile();
  const ToUrlName = useMemo6(() => {
    if (linkToBetaDialogChainId) {
      return getChainNameText(linkToBetaDialogChainId);
    }
    return "";
  }, [linkToBetaDialogChainId]);
  const handleButtonClick = useCallback5(() => {
    window.open(`https://${ToUrlName[0]}.zypher.game/`, "_blank");
  }, [ToUrlName]);
  useEffect4(() => {
    if (!linkToBetaDialogOpen) {
      setLinkToBetaDialogChainId(void 0);
    }
  }, [linkToBetaDialogOpen]);
  return <Modal_default open={linkToBetaDialogOpen} onCancel={() => setLinkToBetaDialogOpen(false)} footer={null} wrapClassName={classnames6("customDialog")} destroyOnClose={true} closable={false} width={isMobile ? "100%" : 360} centered={isMobile ? false : true}>
    <DialogTitle_default label="Switch Networks" setDialogOpen={setLinkToBetaDialogOpen} classNames={isMobile ? "modalTitleInner" : ""} />
    <Content>
      <WarningOutlined style={{ color: "#6673FF", fontSize: "50px" }} />
      <Text>
        {linkToBetaDialogChainId ? ChainName[linkToBetaDialogChainId] : ""}
        {" is currently only deployed in "}
        {ToUrlName[1]}
        {"."}
      </Text>
    </Content>
    <div style={{ padding: "0 20px 30px" }}><DialogButton onClick={handleButtonClick}>
      {"Go to "}
      {ToUrlName[0]}
      {" Version"}
    </DialogButton></div>
  </Modal_default>;
}, isEqual);
var LinkToBetaDialog_default = LinkToBetaDialog;

// src/components/Header/header.tsx
import classnames12 from "classnames";
import { useRecoilValue as useRecoilValue8, useSetRecoilState as useSetRecoilState11 } from "recoil";

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
import { ConnectButton } from "@zypher-game/rainbowkit";
import classnames11 from "classnames";
import { memo as memo21, useMemo as useMemo10 } from "react";

// src/components/Header/rainbow_account/rainbow_account.tsx
import { memo as memo19, useCallback as useCallback13 } from "react";
import { useSetRecoilState as useSetRecoilState9 } from "recoil";
import styled6 from "styled-components";

// src/hooks/useActiveWeb3React.ts
import { useChainId } from "@zypher-game/rainbowkit";
import { useMemo as useMemo7 } from "react";
import { useAccount, usePublicClient } from "wagmi";
function useActiveWeb3React() {
  const chainId = useChainId();
  const { address } = useAccount();
  const provider = usePublicClient();
  return useMemo7(() => {
    return {
      chainId: chainId === 42161 /* Arbitrum */ || chainId === 169 /* MantaPacificMainnet */ ? void 0 : chainId,
      account: chainId === 42161 /* Arbitrum */ || chainId === 169 /* MantaPacificMainnet */ ? void 0 : address,
      provider
    };
  }, [chainId, address, provider]);
}

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
import classnames8 from "classnames";
import { memo as memo14, useCallback as useCallback6 } from "react";
import { useRecoilState as useRecoilState4 } from "recoil";
import { useDisconnect } from "wagmi";

// src/hooks/useActiveWallet.ts
import { useWalletConnectors } from "@zypher-game/rainbowkit";
import { useMemo as useMemo8 } from "react";
var useActiveWallet = () => {
  const wallets = useWalletConnectors();
  return useMemo8(() => {
    if (wallets) {
      const wall = wallets.filter((v) => v.ready && v.recent);
      return wall?.[0];
    }
    return void 0;
  }, [wallets]);
};

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
import classnames7 from "classnames";
import { memo as memo13, useMemo as useMemo9 } from "react";

// src/components/CurrencyLogo/index.tsx
import { useState as useState3 } from "react";
var Logo = ({ src, alt, ...rest }) => {
  const [bad, setBad] = useState3(false);
  if (src && !bad) {
    return <img {...rest} alt={alt} src={src} onError={() => {
      setBad(true);
    }} />;
  }
  return <div {...rest}><Icons_default name="help" /></div>;
};
var CurrencyLogo_default = Logo;

// src/components/PlayerAvatar/index.tsx
import cx2 from "classnames";
import React12 from "react";
import styled2 from "styled-components";

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
  const seed = hashToSeed(account?.toLowerCase());
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
var Avatar = ({ src, altText, style, size = 64 }) => {
  return <div style={{
    width: size,
    height: size,
    borderRadius: "50%",
    overflow: "hidden",
    ...style
  }}><img src={src} alt={altText} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>;
};
var Avatar_default = Avatar;

// src/components/PlayerAvatar/index.tsx
var PlayerAvatar = ({
  account,
  showAccount = false,
  size = 60,
  border = false,
  AvatarBorder = React12.Fragment,
  AccountTextFrComp = React12.Fragment,
  className,
  preLen,
  endLen,
  otherStr
}) => {
  const { selectedAvatar, selectedBackground } = generateAvatar_default(account);
  return <div className={cx2(className, "player_playerAvatar")}>
    {account ? <AvatarBorder><Avatar_default size={size} src={selectedAvatar} style={border ? {
      background: selectedBackground,
      border: "2px solid #62380C"
    } : { background: selectedBackground }} /></AvatarBorder> : <div className="player_avatar" style={{
      width: `${size}px`,
      height: `${size}px`,
      overflow: "hidden",
      background: "rgba(138, 138, 138, 1)"
    }}><Avatar_default size={size} src={preStaticUrl + `/img/default_avatar.png`} /></div>}
    {showAccount && <p className={className?.includes("account") ? "player_avatar_account" : ""}>
      {account ? `${getShortenAddress(account, preLen, endLen)}${otherStr ? ` ${otherStr}` : ""}` : "waiting"}
      <AccountTextFrComp />
    </p>}
  </div>;
};
var OuterCircle = styled2.div`
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
var PlayerAvatar_default = PlayerAvatar;

// src/components/icons/PointsIcon/PointsIcon.tsx
import { memo as memo10 } from "react";
import styled3 from "styled-components";
var PointsImg = styled3.img`
  display: inline-block;
  width: ${({ isMobile }) => isMobile ? "20px" : "30px"};
  margin-left: ${({ isMobile }) => isMobile ? "4px" : "10px"};
`;
var PointsIcon = memo10(
  ({ isMobile, classname }) => {
    return <PointsImg isMobile={isMobile} src={preStaticUrl + `/img/home/data_points.svg`} alt="" className={classname} />;
  },
  isEqual
);

// src/components/ConnectWallet/components/ChainSelector/ChainSelectorWidget.tsx
import { useChainModal as useChainModal2 } from "@zypher-game/rainbowkit";
import { memo as memo11 } from "react";
import styled4 from "styled-components";

// src/hooks/useInitRainbowFn.ts
import { useChainModal } from "@zypher-game/rainbowkit";
import { useEffect as useEffect5 } from "react";
import { useSetRecoilState as useSetRecoilState3 } from "recoil";
var useInitRainbowFn = () => {
  const { setFn, closeChainModal } = useChainModal();
  const setLinkToBetaDialogState = useSetRecoilState3(linkToBetaDialogState);
  const setLinkToBetaDialogChainIdState = useSetRecoilState3(
    linkToBetaDialogChainIdState
  );
  useEffect5(() => {
    if (setFn && closeChainModal) {
      setFn((_c) => {
        if (_c === 42161 /* Arbitrum */ || _c === 169 /* MantaPacificMainnet */) {
          setLinkToBetaDialogState(true);
          setLinkToBetaDialogChainIdState(_c);
          closeChainModal();
          return false;
        }
        return true;
      });
    }
    return () => {
      setFn(void 0);
    };
  }, [setFn, closeChainModal]);
};

// src/components/ConnectWallet/components/ChainSelector/ChainSelectorWidget.tsx
var StatusI = styled4.i`
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
var Wrapper = styled4.div`
  color: #fff;
  font-size: 16px;
  padding: 5px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  i {
    padding: 0;
    margin: 0;
    margin-right: 10px;
  }
  img {
    height: 24px;
  }
  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    p {
      white-space: nowrap;
    }
  }
`;
var ChainSelectorWidget = memo11(({ className }) => {
  const { chainId } = useActiveWeb3React();
  const isMobile = useIsMobile();
  const { openChainModal } = useChainModal2();
  useInitRainbowFn();
  return chainId ? <Wrapper className={className} onClick={openChainModal} style={{ cursor: "pointer" }}>
    <div className="img">
      <img src={ChainImage[chainId]} alt={ChainName[chainId]} />
      <p>{ChainName[chainId]}</p>
    </div>
    <StatusI isMobile={isMobile} />
  </Wrapper> : null;
}, isEqual);
var ChainSelectorWidget_default = ChainSelectorWidget;

// src/components/ConnectWallet/components/AccountInfoDialog/components/PcUserInfo.tsx
import { useAsyncImage } from "@zypher-game/rainbowkit";
import { memo as memo12 } from "react";
var PcUserInfo = memo12(
  ({
    connectName,
    connectIcon,
    account,
    chainId,
    cancel,
    copy
  }) => {
    const src = useAsyncImage(connectIcon);
    return <div className="pc_user_pc_content">
      <div className="pc_user_box">
        <div className="pc_user_tit">{`Connected with ${connectName}`}</div>
        <div className="pc_user_info">
          {connectIcon && <img src={src} alt={connectName} />}
          <div className="pc_user_text">{getShortenAddress(account)}</div>
          <span onClick={() => copy(account)}><Icons_default name="copy" /></span>
          {BlockExplorerUrls[chainId] && <a href={`${BlockExplorerUrls[chainId] ?? [0]}/address/${account}`} target="_blank" rel="noreferrer"><Icons_default name="link" /></a>}
        </div>
      </div>
      <DisconnectBtn cancel={cancel} />
    </div>;
  },
  isEqual
);
var DisconnectBtn = memo12(({ cancel }) => {
  return <p className="pc_user_disconnect_btn" onClick={cancel}>Disconnect</p>;
}, isEqual);
var PcUserInfo_default = PcUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/components/MUserInfo.tsx
var MUserInfo = memo13(({ account, chainId, cancel }) => {
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  const isMobile = useIsMobile();
  const list = useMemo9(() => {
    return [
      {
        balanceStr: pointsBalanceStr,
        logo: <PointsIcon isMobile={isMobile} />,
        symbol: "Gold Points"
      },
      {
        balanceStr: nativeBalanceStr,
        logo: <CurrencyLogo_default className="m_user_img" src={CurrencyLogo[chainId]} />,
        symbol: Currency[chainId]
      }
    ];
  }, []);
  return <div className="m_user_m_content">
    <ChainSelectorWidget_default className={classnames7("m_user_border", "m_user_chain")} />
    <div className="m_user_border">
      <p className="m_user_tit">Your Wallet</p>
      <div className="m_user_userInfoInner">
        <PlayerAvatar_default className="m_user_account" account={account} size={24} showAccount={true} />
        <DisconnectBtn cancel={cancel} />
      </div>
      <div className="m_user_balance">{list.map((v) => <div key={v.symbol} className="m_user_item">
        <div className="m_user_fl">
          {v.logo}
          <p>{v.symbol}</p>
        </div>
        <p>{v.balanceStr}</p>
      </div>)}</div>
    </div>
  </div>;
}, isEqual);
var MUserInfo_default = MUserInfo;

// src/components/ConnectWallet/components/AccountInfoDialog/AccountInfoDialog.tsx
var AccountInfoDialog = memo14(({ copy }) => {
  const [accountInfoDialogOpen, setAccountInfoDialogOpen] = useRecoilState4(
    accountInfoDialogState
  );
  const { account, chainId } = useActiveWeb3React();
  const isMobile = useIsMobile();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const cancel = useCallback6(() => {
    disconnect();
    setAccountInfoDialogOpen(false);
  }, [disconnect]);
  return account && chainId ? <><Modal_default open={accountInfoDialogOpen} onCancel={() => setAccountInfoDialogOpen(false)} footer={null} wrapClassName={classnames8(
    "customDialog",
    "bottom",
    "account_info_dialog_dialog"
  )} destroyOnClose={true} closable={false} width={isMobile ? "100%" : 440} centered={isMobile ? false : true} transitionName={isMobile ? "ant-slide-down" : void 0}>
    <DialogTitle_default label="Your Wallet" setDialogOpen={setAccountInfoDialogOpen} classNames={isMobile ? "modalTitleInner" : ""} />
    <div className="account_info_dialog_modalMain">{isMobile ? <MUserInfo_default copy={copy} account={account} chainId={chainId} cancel={cancel} /> : <PcUserInfo_default copy={copy} account={account} chainId={chainId} cancel={cancel} connectName={wallet?.name} connectIcon={wallet?.iconUrl} />}</div>
  </Modal_default></> : null;
});
var AccountInfoDialog_default = AccountInfoDialog;

// src/components/ConnectWallet/components/Balance/Balance.tsx
import { SyncOutlined } from "@ant-design/icons";
import BigNumberjs2 from "bignumber.js";
import { memo as memo16, useCallback as useCallback8, useEffect as useEffect6, useState as useState4 } from "react";
import { useRecoilValue as useRecoilValue3, useSetRecoilState as useSetRecoilState4 } from "recoil";
import styled5 from "styled-components";

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

// src/connectors/contractV2.ts
import { AddressZero as AddressZero2 } from "@ethersproject/constants";
import { ethers, utils as utils2 } from "ethers";
import {
  getContract as viemGetContract
} from "viem";

// src/rainbow/rainbow.ts
import {
  bitgetWallet,
  metaMaskWallet,
  okxWallet,
  tokenPocketWallet,
  walletConnectWallet,
  connectorsForWallets
} from "@zypher-game/rainbowkit";
import { createPublicClient, fallback, http } from "viem";
import { configureChains, createConfig } from "wagmi";
import * as chainList from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
var WagmiChainList = Object.values(chainList);
var getSupportedChainIdList = (env) => {
  return supportedChainIds(env).map((chainId) => {
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
          url: sample(BlockExplorerUrls[chainId]) ?? ""
        }
      },
      testnet: isTestnet[chainId]
    };
  });
};
var getConfigureChains = (env) => {
  const { chains, publicClient, webSocketPublicClient } = configureChains(
    getSupportedChainIdList(env),
    [publicProvider()]
  );
  return { chains, publicClient, webSocketPublicClient };
};
var projectId = "bc467c124a7a7a8ce06a41ef40b1b842";
var getConnectors = (env) => {
  const { chains } = getConfigureChains(env);
  return connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet({ projectId, chains }),
        walletConnectWallet({ projectId, chains })
      ]
    },
    {
      groupName: "More",
      wallets: [
        bitgetWallet({ projectId, chains }),
        okxWallet({ projectId, chains }),
        tokenPocketWallet({ projectId, chains })
      ]
    }
  ]);
};
var getWagmiConfig = (env) => {
  const connectors = getConnectors(env);
  const { publicClient, webSocketPublicClient } = getConfigureChains(env);
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

// src/connectors/contractV2.ts
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
    publicClient: publicClient ?? getViemClients({ env, chainId: chainId ?? defaultChainId }),
    walletClient: signer
  });
  return {
    ...c,
    account: signer?.account,
    chain: signer?.chain
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

// src/contract/erc20.ts
var erc20Contract = (chainId, env, address, signer) => {
  if (!address) {
    throw new Error("No addrerss");
  }
  return getContract({ env, abi: erc20Abi_default, address, signer, chainId });
};
var erc20_default = erc20Contract;

// src/components/ConnectWallet/components/Balance/balanceItem.tsx
import { LoadingOutlined } from "@ant-design/icons";
import classnames9 from "classnames";
import { memo as memo15, useCallback as useCallback7 } from "react";
var BalanceItem = memo15(
  ({ className, loading, balanceStr, logo, preChild, onClick }) => {
    const onClickHandle = useCallback7(() => {
      if (onClick) {
        onClick();
      }
    }, [onClick]);
    return <div className={classnames9(`${className}`, "balance_item_balance")} onClick={onClickHandle}>
      {preChild}
      {loading ? <LoadingOutlined /> : <>
        {balanceStr}
        {logo}
      </>}
    </div>;
  },
  isEqual
);
var BalanceItem_default = BalanceItem;

// src/components/ConnectWallet/components/Balance/Balance.tsx
var Refresh = styled5.div`
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  &:hover {
    span {
      opacity: 1;
    }
  }
  span {
    opacity: 0.7;
    transition: opacity 0.3s;
    svg {
      width: ${({ isMobile }) => isMobile ? "16px" : "24px"};
      height: ${({ isMobile }) => isMobile ? "16px" : "24px"};
    }
  }
`;
var AddIcon = styled5(Icons_default)`
  margin-right: ${({ isMobile }) => isMobile ? "4px" : "10px"};
  width: ${({ isMobile }) => isMobile ? "20px" : "24px"};
`;
var Balance = memo16((props) => {
  const { showPointsModal, isMobile, env } = props;
  const { chainId, account, provider } = useActiveWeb3React();
  const [loading, setLoading] = useState4(false);
  const setNativeBalance = useSetRecoilState4(nativeBalanceState);
  const setPointsBalance = useSetRecoilState4(pointsBalanceState);
  const refreshBalance = useRecoilValue3(refreshBalanceState);
  const fetchBalanceOf = useCallback8(async () => {
    if (!chainId || !account) {
      return;
    }
    setLoading(true);
    const balance = await provider.getBalance({ address: account });
    setNativeBalance(
      new BigNumberjs2(balance.toString()).dividedBy(divisorBigNumber).toNumber()
    );
    await fetchErc20Balance();
    setLoading(false);
  }, [chainId, account, provider]);
  const fetchErc20Balance = useCallback8(async () => {
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
          new BigNumberjs2(balance.toString()).dividedBy(divisorBigNumber).toNumber()
        );
      }
    } catch (e) {
      setPointsBalance(0);
    }
  }, [chainId, account, provider]);
  useEffect6(() => {
    if (account && chainId) {
      fetchBalanceOf();
    }
  }, [account, chainId, refreshBalance]);
  const nativeBalanceStr = useNativeBalanceStr();
  const pointsBalanceStr = usePointsBalanceStr();
  return <>
    <Refresh onClick={fetchBalanceOf} isMobile={isMobile}><SyncOutlined /></Refresh>
    <BalanceItem_default onClick={showPointsModal} logo={<PointsIcon isMobile={isMobile} />} balanceStr={pointsBalanceStr} loading={loading} className={props.className} preChild={<AddIcon name="add" isMobile={isMobile} />} />
    {!isMobile && <BalanceItem_default logo={<CurrencyLogo_default className="balance_item_img" src={CurrencyLogo[chainId || 97]} />} balanceStr={nativeBalanceStr} loading={loading} className={props.className} />}
  </>;
}, isEqual);
var Balance_default = Balance;

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
import classnames10 from "classnames";
import { memo as memo18, useEffect as useEffect7, useState as useState6 } from "react";
import { useRecoilState as useRecoilState7, useRecoilValue as useRecoilValue6 } from "recoil";

// src/hooks/usePoint.ts
import BigNumberjs3 from "bignumber.js";

// src/hooks/useAccountInvitation.ts
import { atom as atom4, useRecoilValue as useRecoilValue4, useSetRecoilState as useSetRecoilState5 } from "recoil";
import { useCallback as useCallback9 } from "react";

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
  const invitationAddres = useRecoilValue4(
    invitationAddressState
  );
  const setInvitationAddressState = useSetRecoilState5(invitationAddressState);
  const postAccountUpdate = useCallback9(
    async ({ tx }) => {
      try {
        if (tx.status === txStatus) {
          const params = {
            user_addr: account,
            chain_id: `${chainId}`,
            tx_hash: tx.transactionHash
          };
          if (invitationAddres && invitationAddres.address !== "" && invitationAddres.address.toLowerCase() !== params.user_addr.toLowerCase()) {
            params.sharer_addr = invitationAddres?.address;
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
import { useCallback as useCallback11, useState as useState5 } from "react";
import { useRecoilState as useRecoilState5, useRecoilValue as useRecoilValue5, useSetRecoilState as useSetRecoilState6 } from "recoil";

// src/hooks/usePublicNodeWaitForTransaction.ts
import { useCallback as useCallback10 } from "react";
import { waitForTransaction } from "wagmi/actions";

// src/hooks/useActiveChainId.ts
import { useNetwork } from "wagmi";
var useActiveChainId = (env) => {
  const { chain } = useNetwork();
  const chainId = chain?.id ?? void 0;
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
  const waitForTransaction_ = useCallback10(
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
var ZkBingoPointsContract = (chainId, env, address, signer) => {
  return getContract({
    env,
    abi,
    address: address ?? zkBingo(chainId, "points" /* Points */),
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
      ["10000"],
      ["30000"],
      ["50000"],
      ["60000"],
      ["80000"],
      ["100000 ", "2"],
      ["300000", "5"],
      ["500000", "10"]
    ].map((v, index) => {
      const chainPrice = ChainPointPrice[chainId];
      const price = v[1] ? new BigNumberjs3(chainPrice).times(v[0]).times((100 - Number(v[1])) * 0.01).toFixed(8) : new BigNumberjs3(chainPrice).times(v[0]).toFixed(8);
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
  const setPointsDialogOpen = useSetRecoilState6(pointsDialogState);
  const [refreshBalance, setRefreshBalanceState] = useRecoilState5(refreshBalanceState);
  const { waitForTransaction: waitForTransaction2 } = usePublicNodeWaitForTransaction(env);
  const hidePointsWarn = useRecoilValue5(hidePointsWarnState);
  const [pointsWarn, setPointsWarn] = useRecoilState5(pointsWarnState);
  const [choseIndex, setChoseIndex] = useState5();
  const { data: walletClient } = useWalletClient();
  const swapPointHandle = useCallback11(
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
                postAccountUpdate({ tx: nativeSwapTx });
                setRefreshBalanceState(refreshBalance + 1);
                setSuccessToast(dispatch, {
                  title: "",
                  message: "Recharge successful"
                });
                setPointsDialogOpen(false);
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

// src/components/ConnectWallet/components/PointsDialog/PoinsWarn.tsx
import { memo as memo17 } from "react";
import { useRecoilState as useRecoilState6 } from "recoil";
var PoinsWarn = memo17(({ handleNext }) => {
  const { t } = useCustomTranslation([LngNs.points]);
  const [hidePointsWarn, setHidePointsWarn] = useRecoilState6(hidePointsWarnState);
  return <div className="points_dialog_dialogContainer">
    <p>{t("poinsWarnText01")}</p>
    <p>
      <em />
      <i>{t("poinsWarnText02")}</i>
      <br />
      <em />
      <i>{t("poinsWarnText03")}</i>
    </p>
    <p>{t("poinsWarnText04")}</p>
    <p className="points_dialog_flex" onClick={() => setHidePointsWarn(!hidePointsWarn)}>
      <Icons_default name={hidePointsWarn ? "checked" : "check"} />
      {t("poinsWarnText05")}
    </p>
    <button className="points_dialog_btn" onClick={handleNext}>{t("Ok")}</button>
  </div>;
}, isEqual);
var PoinsWarn_default = PoinsWarn;

// src/components/ConnectWallet/components/PointsDialog/PointsDialog.tsx
var PointsDialog = memo18(
  ({ env, dispatch, setSuccessToast, setErrorToast }) => {
    const [pointsDialogOpen, setPointsDialogOpen] = useRecoilState7(pointsDialogState);
    const pointsWarn = useRecoilValue6(pointsWarnState);
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
    useEffect7(() => {
      if (chainId) {
        setTimeout(() => {
          const list = pointsListDefault(chainId);
          if (list) {
            setPointsList(list);
          }
        }, 800);
      }
    }, [chainId]);
    return <Modal_default open={pointsDialogOpen} onCancel={() => setPointsDialogOpen(false)} footer={null} wrapClassName={classnames10("customDialog", "bottom", "dialog")} width={isMobile ? "100%" : 604} destroyOnClose={true} closable={false} centered={isMobile ? false : true} transitionName={isMobile ? "ant-slide-down" : void 0}>
      <DialogTitle_default label="Recharge Points" setDialogOpen={setPointsDialogOpen} classNames="modalTitleInner" />
      <div className="modalMain">{pointsWarn === 1 ? <PoinsWarn_default isLoading={isLoading} handleNext={swapPointHandle} /> : isLoading ? <IsLoading /> : <>
        <div className="balanceTitle">
          <p>
            {"Balance: "}
            <strong>{pointsBalanceStr}</strong>
          </p>
          <PointsIcon isMobile={isMobile} classname="pointsIcon" />
        </div>
        <PointsTable pointsList={pointsList} chainId={chainId} onClick={swapPointHandle} />
      </>}</div>
    </Modal_default>;
  },
  isEqual
);
var IsLoading = memo18(() => {
  const { t } = useCustomTranslation([LngNs.points]);
  return <div className="loading">
    <Icons_default name="loading02" />
    <p>{t("IsLoadingText1")}</p>
  </div>;
}, isEqual);
var PointsTable = memo18(
  ({ pointsList, chainId, onClick }) => {
    return <div className="table">{pointsList.map((v, index) => <div className={classnames10("points", `points_${v.index}`)} key={v.index} onClick={() => onClick(index)}>
      <h3>{v.pointAmountStr}</h3>
      <img className="points_img" src={preStaticUrl + `/img/points/points_${v.index}.png`} alt="points" />
      <div className="bottom">
        <p>{v.priceStr}</p>
        <CurrencyLogo_default className="img" src={CurrencyLogo[chainId || 97]} />
      </div>
      {v.discount && <div className="discount">
        <img className="discount_img" src={preStaticUrl + `/img/points/discord.svg`} alt="points" />
        <p>
          {v.discount}
          {"% "}
          <br />
          {"OFF"}
        </p>
      </div>}
    </div>)}</div>;
  },
  isEqual
);
var PointsDialog_default = PointsDialog;

// src/components/ConnectWallet/components/PointsDialog/PointsRuleDialog.tsx
import { CloseOutlined } from "@ant-design/icons";
import { DialogContent as DialogContent2, DialogOverlay as DialogOverlay2 } from "@reach/dialog";
import { useCallback as useCallback12 } from "react";
import { useRecoilValue as useRecoilValue7, useSetRecoilState as useSetRecoilState8 } from "recoil";
var PointsRuleDialog = () => {
  const { t } = useCustomTranslation([LngNs.common, LngNs.points]);
  const isModalOpen = useRecoilValue7(pointsRuleDialogState);
  const setIsModalOpen = useSetRecoilState8(pointsRuleDialogState);
  const handleCancel = useCallback12(() => {
    setIsModalOpen(false);
  }, []);
  return <><DialogOverlay2 isOpen={isModalOpen} onDismiss={handleCancel} className="points_dialog_zindex"><DialogContent2 className="points_dialog_dialogContent">
    <div className="points_dialog_dialogHeader">
      <h3>{t("Rules")}</h3>
      <div className="points_dialog_cursor" onClick={handleCancel}><CloseOutlined /></div>
    </div>
    <div className="points_dialog_dialogContainer">
      <h4>{t("PointsRuleText01")}</h4>
      <p>{t("PointsRuleText02")}</p>
      <p>
        <em />
        <i>{t("PointsRuleText03")}</i>
        <br />
        <em />
        <i>{t("PointsRuleText04")}</i>
        <br />
        <em />
        <i>{t("PointsRuleText04")}</i>
        <br />
        <em />
        {" "}
        <i>{t("PointsRuleText06")}</i>
      </p>
      <p>{t("PointsRuleText07", {
        Link: <a href="https://medium.com/@ZypherGames/upcoming-announcement-44e69204adb1" target="_blank" rel="noreferrer">{t("PointsRuleText08")}</a>
      })}</p>
      <h4>{t("PointsRuleText09")}</h4>
      <p>{(t("PointsRuleText10"), {
        Discord: <a href="https://discord.com/invite/MKJZhS4p2T" target="_blank" className="points_dialog_fontWhite" rel="noreferrer">Discord</a>
      })}</p>
    </div>
    <div className="points_dialog_btnWrap"><button className="points_dialog_btn" onClick={handleCancel}>{t("Ok")}</button></div>
  </DialogContent2></DialogOverlay2></>;
};
var PointsRuleDialog_default = PointsRuleDialog;

// src/components/Header/rainbow_account/rainbow_account.tsx
var AddressWrap = styled6.div`
  display: flex;
  gap: 10px;
  align-items: center;
  .account {
    display: flex;
    flex-direction: row-reverse;
    gap: 9px;
    p {
      padding-left: 14px;
    }
  }
`;
var Account = memo19(
  ({
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy
  }) => {
    const isMobile = useIsMobile();
    const setPointsDialogState = useSetRecoilState9(pointsDialogState);
    const showPointsModal = useCallback13(() => {
      setPointsDialogState(true);
    }, [setPointsDialogState]);
    const setAccountInfoDialogState = useSetRecoilState9(accountInfoDialogState);
    const showLogoutModal = useCallback13(() => {
      setAccountInfoDialogState(true);
    }, [setAccountInfoDialogState]);
    const { account } = useActiveWeb3React();
    return <>
      <Balance_default env={env} isMobile={isMobile} showPointsModal={showPointsModal} />
      <AddressWrap onClick={showLogoutModal}><PlayerAvatar_default className="account" account={account} size={isMobile ? 26 : 36} showAccount={isMobile ? false : true} /></AddressWrap>
      {!isMobile && <ChainSelectorWidget_default />}
      <AccountInfoDialog_default copy={copy} />
      <PointsDialog_default env={env} dispatch={dispatch} setSuccessToast={setSuccessToast} setErrorToast={setErrorToast} />
      <PointsRuleDialog_default />
    </>;
  },
  isEqual
);
var Rainbow_account_default = Account;

// src/components/Header/rainbow_account/WrongNetwork.tsx
import { useChainModal as useChainModal3 } from "@zypher-game/rainbowkit";
import { memo as memo20 } from "react";
import { useSetRecoilState as useSetRecoilState10 } from "recoil";
var WrongNetwork = memo20(() => {
  const { openChainModal } = useChainModal3();
  const setAccountInfoDialogOpen = useSetRecoilState10(accountInfoDialogState);
  useInitRainbowFn();
  return <div onClick={() => {
    if (openChainModal) {
      openChainModal();
      setAccountInfoDialogOpen(false);
    }
  }} className="connect_connect"><p>Wrong network</p></div>;
}, isEqual);
var WrongNetwork_default = WrongNetwork;

// src/components/Header/rainbow_account/rainbow_connectWallet.tsx
var RainbowConnectWallet = memo21((props) => {
  const { className, env, copy, dispatch, setSuccessToast, setErrorToast } = props;
  const isPathLocation = useMemo10(() => {
    const arr = window.location.hostname.split("/");
    return arr[1] === "play" || arr[1] === "zBingo" || arr[1] === "monster";
  }, []);
  return <div className={classnames11(
    "connect_connectWallet",
    isPathLocation ? "connect_bgWallet" : "",
    className
  )}><ConnectButton.Custom>{({ chain, openConnectModal, mounted }) => {
    return <>{!mounted || !chain ? <div onClick={openConnectModal} className="connect_connect"><p>Connect Wallet</p></div> : chain && (chain.unsupported || chain.id === 42161 /* Arbitrum */ || chain.id === 169 /* MantaPacificMainnet */) ? <WrongNetwork_default /> : <Rainbow_account_default copy={copy} env={env} dispatch={dispatch} setSuccessToast={setSuccessToast} setErrorToast={setErrorToast} />}</>;
  }}</ConnectButton.Custom></div>;
}, isEqual);
var Rainbow_connectWallet_default = RainbowConnectWallet;

// src/components/Header/state.ts
import { atom as atom5 } from "recoil";
var siderCollapseState2 = atom5({
  key: "siderCollapseState",
  default: false,
  effects_UNSTABLE: [localStorageEffect("siderCollapseState")]
});
var defaultSelectedKey2 = atom5({
  key: "defaultSelectedKeys",
  default: "",
  effects_UNSTABLE: [localStorageEffect("defaultSelectedKeys")]
});

// src/components/Header/header.tsx
var Header = (props) => {
  const isMobile = useIsMobile();
  const setSiderCollapse = useSetRecoilState11(siderCollapseState2);
  const collapsed = useRecoilValue8(siderCollapseState2);
  const {
    hideMenu = false,
    env,
    dispatch,
    setSuccessToast,
    setErrorToast,
    copy
  } = props;
  return <header className={classnames12("header_header", props.className)} style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
    {isMobile && <div className="header_left"><MobileLogo isMobile={isMobile} /></div>}
    <div className="header_right">
      <Rainbow_connectWallet_default copy={copy} isMobile={isMobile} env={env} dispatch={dispatch} setSuccessToast={setSuccessToast} setErrorToast={setErrorToast} />
      {isMobile && !hideMenu ? <>{collapsed ? <div className="header_btn" onClick={() => setSiderCollapse(false)}><Icons_default className={classnames12("header_icon")} name="menu" /></div> : <div className="header_btn" onClick={() => setSiderCollapse(true)}><Icons_default className={classnames12("header_icon", "header_close")} name="close" /></div>}</> : null}
    </div>
    <LinkToBetaDialog_default />
  </header>;
};
var header_default = Header;

// src/provider/RainbowKitWithThemeProvider.tsx
import { darkTheme, RainbowKitProvider } from "@zypher-game/rainbowkit";
import { useMemo as useMemo11 } from "react";
import { WagmiConfig } from "wagmi";
var RainbowKitWithThemeProvider = ({ children, env }) => {
  const { wagmiConfig, chains, computedTheme } = useMemo11(() => {
    if (env) {
      const wagmiConfig2 = getWagmiConfig(env);
      const { chains: chains2 } = getConfigureChains(env);
      return {
        wagmiConfig: wagmiConfig2,
        chains: chains2,
        computedTheme: darkTheme({
          accentColor: "#6673FF",
          borderRadius: "large",
          fontStack: "system"
        })
      };
    }
    return {};
  }, []);
  if (!wagmiConfig || !chains || !computedTheme) {
    return null;
  }
  return <WagmiConfig config={wagmiConfig}><RainbowKitProvider chains={chains} appInfo={appInfo} theme={computedTheme}>{children}</RainbowKitProvider></WagmiConfig>;
};
var RainbowKitWithThemeProvider_default = RainbowKitWithThemeProvider;

// src/index.ts
import { changeLanguage as changeLanguage2 } from "i18next";

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

// src/index.ts
import { useConnectModal, useChainModal as useChainModal4 } from "@zypher-game/rainbowkit";
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
  Currency,
  CurrencyContract,
  CurrencyLogo,
  header_default as Header,
  IContractName,
  INavLinkType,
  IsMdContext,
  IsMdProvider,
  IsMobileContext,
  IsMobileProvider,
  LinkList,
  LinkToBetaDialog_default as LinkToBetaDialog,
  LngNs,
  AccountInfoDialog_default as LogoutDialog,
  PlayerAvatar_default as PlayerAvatar,
  PointsDialog_default as PointsDialog,
  PointsRuleDialog_default as PointsRuleDialog,
  RainbowKitWithThemeProvider_default as RainbowKitWithThemeProvider,
  RecoilRoot,
  SideBar_default as SideBar,
  bingoPoints_default as ZkBingoPointsContract,
  accountInfoDialogState,
  appInfo,
  atom6 as atom,
  blankLinkList,
  changeLanguage2 as changeLanguage,
  connectorState,
  defaultChainId,
  divisor6xBigNumber,
  divisorBigNumber,
  erc20_default as erc20Contract,
  getContract,
  getContractFromRpc,
  getProvider,
  hidePointsWarnState,
  isTestnet,
  linkToBetaDialogChainIdState,
  linkToBetaDialogState,
  localStorageEffect,
  nativeBalanceState,
  pointsBalanceState,
  pointsDialogState,
  pointsRuleDialogState,
  pointsWarnState,
  preStaticUrl,
  refreshBalanceState,
  selector,
  supportedChainIds,
  txStatus,
  useAccountInvitation,
  useActiveChainId,
  useActiveWallet,
  useActiveWeb3React,
  useChainModal4 as useChainModal,
  useConnectModal,
  useCustomTranslation,
  useInitRainbowFn,
  useIsMd,
  useIsMobile,
  useNativeBalanceStr,
  useNavItem,
  usePathname,
  usePointsBalanceStr,
  usePublicNodeWaitForTransaction,
  useRecoilState8 as useRecoilState,
  useRecoilValue9 as useRecoilValue,
  useResetRecoilState,
  useSetRecoilState12 as useSetRecoilState,
  useSwapPoint,
  useWalletClient2 as useWalletClient,
  useWindowSize,
  walletModalOpenState,
  zkBingo,
  zkBingoV0
};
