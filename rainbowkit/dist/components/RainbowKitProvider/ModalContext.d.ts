import { ReactNode } from "react";
interface ModalProviderProps {
    children: ReactNode;
}
export declare function ModalProvider({ children }: ModalProviderProps): any;
export declare function useModalState(): {
    accountModalOpen: any;
    chainModalOpen: any;
    connectModalOpen: any;
};
export declare function useAccountModal(): {
    accountModalOpen: any;
    openAccountModal: any;
};
export declare function useChainModal(): {
    chainModalOpen: any;
    openChainModal: any;
    closeChainModal: any;
    setFn: any;
};
export declare function useConnectModal(): {
    connectModalOpen: any;
    openConnectModal: any;
};
export {};
