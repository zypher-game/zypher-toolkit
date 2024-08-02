import { Chain } from "wagmi";
import { ChainId, supportedChainIds } from "./constant";
import { ChainDefinitions } from "./chains_definitions/chains_definitions";

export const AllChainInfo: Record<ChainId, Chain> = Object.fromEntries(
  supportedChainIds().map((v) => [v, ChainDefinitions(v)])
) as unknown as Record<ChainId, Chain>;
