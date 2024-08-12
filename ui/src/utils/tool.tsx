import BigNumber from "bignumber.js";
import { utils } from "ethers";

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const eX = (value: any, x: any): BigNumber => {
  return new BigNumber(`${value}e${x}`);
};

export function pow10(
  num: number | string | BigNumber | undefined,
  decimals = 18
): BigNumber {
  if (!num) {
    return new BigNumber(0);
  }
  return new BigNumber(num).dividedBy(new BigNumber(10).pow(decimals));
}

export function bnPow10(
  num: number | string | BigNumber | undefined,
  decimals = 18
): BigNumber {
  if (!num) {
    return new BigNumber(0);
  }
  return new BigNumber(num).multipliedBy(new BigNumber(10).pow(decimals));
}

export const formatDecimal = (number: number, decimal = 2): string => {
  if (number === undefined) {
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

export const formatMoney = (value: number | string, n = 2): string => {
  try {
    // eslint-disable-next-line no-restricted-globals
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
    // eslint-disable-next-line prefer-template
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

export function getShortenAddress(
  address: string | null | undefined,
  preLen = 6,
  endLen = 4
): string {
  if (!address) {
    return "";
  }
  if (address.length < 42) {
    return address;
  }
  const firstCharacters = address.substring(0, preLen);
  const lastCharacters = address.substring(
    address.length - endLen,
    address.length
  );
  return `${firstCharacters}...${lastCharacters}`;
}

export function getShortenAddress2(address: string): string {
  const firstCharacters = address.substring(0, 10);
  const lastCharacters = address.substring(address.length - 10, address.length);
  return `${firstCharacters}****${lastCharacters}`;
}

export function filterInput(val: string): string {
  const v = val
    .replace("-", "")
    .replace(/^\.+|[^\d.]/g, "")
    .replace(/^0\d+\./g, "0.")
    .replace(/\.{6,}/, "")
    .replace(/^0(\d)/, "$1")
    .replace(/^(\-)*(\d+)\.(\d{0,6}).*$/, "$1$2.$3");
  return Number(v) >= 0 ? v : "";
}

export const convertToLargeNumberRepresentation = (
  value: BigNumber
): string => {
  if (!value) {
    return "0";
  } else if (+value >= 1e5) {
    return `${eX(value.toString(), -6)}M`;
  } else if (+value >= 1e2) {
    return `${eX(value.toString(), -3)}K`;
  } else {
    return value.toString();
  }
};

let tCanvas: HTMLCanvasElement;
export function measureText(text: string, font: string): number {
  const canvas = tCanvas || (tCanvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  if (context) {
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  return 0;
}

export const splitArrByLen = (arr: any[], len: number): any[][] => {
  const t = [];

  let index = 0;
  while (index < arr.length) {
    t.push(arr.slice(index, (index += len)));
  }

  return t;
};

const Units = [
  ["B", 1e9],
  ["M", 1e6],
  ["K", 1e3],
];
export function formatCurrency(amount: number, precision = 2): string {
  const [unit, base] = Units.find(
    ([, min]) => Number(amount) >= Number(min)
  ) ?? ["", 1];
  return `${utils.commify(
    (amount / (base as number)).toFixed(precision)
  )}${unit}`;
}

export function formatSymbol(symbol: undefined | string): string {
  return symbol
    ? symbol === "WTT"
      ? symbol.replace(/W/, "")
      : symbol.replace(/TT-/, "")
    : "";
}
