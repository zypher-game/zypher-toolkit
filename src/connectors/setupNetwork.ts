import * as config from "../constant/constant";

const setupNetwork = async (
  env: string,
  chainId = config.defaultChainId
): Promise<boolean> => {
  const provider = window.ethereum;
  const isSupported = config.supportedChainIds(env).includes(chainId);
  if (!isSupported) {
    // throw new Error(`Unsupported network: ${chainId}`)
    chainId = config.defaultChainId;
  }
  if (provider) {
    try {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        });
      } catch (error) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: `${config.ChainName[chainId]}`,
              nativeCurrency: {
                name: `${config.Currency[chainId]}`,
                symbol: `${config.Currency[chainId]}`,
                decimals: 18,
              },
              rpcUrls: config.ChainRpcUrls[chainId],
              blockExplorerUrls: config.BlockExplorerUrls[chainId],
            },
          ],
        });
      }

      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      `Can't setup the ${config.ChainName[chainId]} on metamask because window.ethereum is undefined`
    );
    return false;
  }
};

export default setupNetwork;
