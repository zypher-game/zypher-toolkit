export declare const tgNameListState: import("recoil").RecoilState<Record<string, string>>;
export declare const useGetTgName: () => {
    setTgName: (address: string[]) => Promise<void>;
    tgNameList: Record<string, string>;
};
