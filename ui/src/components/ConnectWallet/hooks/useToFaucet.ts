import { useCallback } from "react";

export const useToFaucet = () => {
  return useCallback(() => {
    window.open("https://docs.polyhedra.network/expchain/faucet");
  }, []);
};
