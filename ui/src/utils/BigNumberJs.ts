import BigNumberJs from "bignumber.js";
export const BM = new BigNumberJs(1000000);
export const FORMAT = {
  decimalSeparator: ".",
  groupSeparator: ",",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: " ",
  fractionGroupSize: 0,
  suffix: "",
  prefixes: {
    "-": "",
    "+": "",
  },
  abbreviations: {
    K: "K",
    M: "M",
    B: "B",
    T: "T",
  },
};
export default BigNumberJs;
