import { AxiosRequestConfig, AxiosResponse } from 'axios';
export declare function request(reqUrl: string, options?: AxiosRequestConfig): Promise<AxiosResponse>;
export type IPromise<T> = Promise<AxiosResponse<T>>;
