export declare const ownerListState: import("recoil").RecoilState<Record<string, string>>;
export declare const useGetOwnAddress: () => {
    setOwnerAddress: (address: string[]) => Promise<void>;
    ownerList: Record<string, string>;
};
