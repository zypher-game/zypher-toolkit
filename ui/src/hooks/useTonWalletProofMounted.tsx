import {
  TonProofItemReplySuccess,
  useTonConnectUI,
  useTonWallet,
} from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

export const useTonWalletProofMounted = () => {
  const [ui] = useTonConnectUI();
  const [proof, _proof] = useState<TonProofItemReplySuccess | null>(null);
  const wallet = useTonWallet();
  useEffect(() => {
    if (
      wallet?.connectItems?.tonProof?.name === "ton_proof" &&
      "proof" in wallet.connectItems.tonProof
    ) {
      _proof(wallet.connectItems.tonProof);
    } else {
      _proof(null);
    }
    ui.onStatusChange((wallet) => {
      if (
        wallet?.connectItems?.tonProof &&
        "proof" in wallet.connectItems.tonProof
      ) {
        _proof(wallet.connectItems.tonProof);
      }
    });
  }, [wallet?.account.address]);
  return proof;
};
