import { Chain } from "wagmi";
import { ChainId } from "./constant";
import { ChainDefinitions } from "./chains_definitions/chains_definitions";

export const AllChainInfo: Record<ChainId, Chain> = Object.fromEntries(
  Object.values(ChainId).map((v) => [v, ChainDefinitions(v)])
) as unknown as Record<ChainId, Chain>;
