import { zeroAddress, createWalletClient, custom, publicActions } from "viem";
import { Address, Chain } from "wagmi";
import { MockConnector } from "wagmi/connectors/mock";
import { ChainId, ChainRpcUrls, TG_BOT_URL } from "../../constant/constant";
import { ethers } from "ethers";
import { TelegramWallet } from "../telegramWallet";
import sleep from "../../utils/sleep";
import { IWebAppData } from "../../hooks/useTelegramUser";
import { AllChainInfo } from "../../constant/chains";
import { SetterOrUpdater } from "recoil";
import { IAAWallet } from "../../gas0/hooks/useWalletHandler";
export const tgChain = ({
  WebAppData,
  publicClient,
  chains,
  setAaWallet,
}: {
  WebAppData?: IWebAppData;
  publicClient: any;
  chains: Chain[];
  setAaWallet: SetterOrUpdater<IAAWallet>;
}) => {
  const provider = new ethers.providers.JsonRpcProvider(
    ChainRpcUrls[ChainId.SagaMainnet][0]
  );
  const acc = new TelegramWallet(
    (localStorage.getItem("TelegramUserIdEvmAddressKey") as Address) ||
      zeroAddress,
    provider,
    TG_BOT_URL,
    WebAppData
  );
  const account = acc.address as Address;
  const pub = publicClient({ chainId: ChainId.SagaMainnet });
  const walletClient = createWalletClient({
    account,
    chain: AllChainInfo[ChainId.SagaMainnet],
    transport: custom({
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
          return txr;
        }
      },
    }),
  }).extend(publicActions);
  const mock = new MockConnector({ chains, options: { walletClient } });
  setAaWallet((pre) => ({
    ...pre,
    mockAcc: async (address: Address, proof: any) => {
      acc.setAddress(address);
      walletClient.account.address = address;
      mock.emit("change", { account: address });
      await sleep(0.2);
      // mockBus.emit("addressChange", address);
    },
  }));
  return [mock] as any;
};
