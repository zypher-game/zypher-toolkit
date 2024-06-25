import * as config from "../constant/constant";

const setupNetwork = async (
  env: string,
  chainId: config.ChainId
): Promise<boolean> => {
  const provider = window.ethereum;
  if (provider) {
    try {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${parseInt(chainId, 10).toString(16)}` }],
        });
      } catch (error) {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${parseInt(chainId, 10).toString(16)}`,
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
