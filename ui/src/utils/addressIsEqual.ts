import { Address } from "wagmi";

export const addressIsEqual = (
  pre: Address | string | any,
  next: Address | string | any
) => {
  return `${pre}`.toLowerCase() === `${next}`.toLowerCase();
};
