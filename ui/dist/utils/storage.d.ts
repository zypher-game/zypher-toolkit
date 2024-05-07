declare const _default: Storage;
export default _default;
declare function Storage(prefix: any, expire: any): void;
declare class Storage {
    constructor(prefix: any, expire: any);
    prefix: any;
    driver: globalThis.Storage | undefined;
    expire: any;
    _key(key: any): any;
    keys(): string[];
    remove(key: any): void;
    clear(): void;
    set(key: any, value: any, expire: any): void;
    get(key: any): any;
}
