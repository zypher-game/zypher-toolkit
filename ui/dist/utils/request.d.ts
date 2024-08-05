import { AxiosRequestConfig, AxiosResponse } from "axios";
export declare function request(reqUrl: string, options?: AxiosRequestConfig): Promise<AxiosResponse>;
export type IPromise<T> = Promise<AxiosResponse<T>>;
interface HTTP_Response_Data<T = any> {
    code: number;
    msg: string;
    data: T;
}
export declare const httpClient: import("axios").AxiosInstance;
export declare const httpGet: <T = any>(url: string, config?: AxiosRequestConfig | undefined) => Promise<HTTP_Response_Data<T>>;
export declare const httpPost: <T = any>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<HTTP_Response_Data<T>>;
export {};
