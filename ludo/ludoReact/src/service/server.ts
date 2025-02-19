import { IPromise, request } from '../utils/request'

export interface IGeIPResponse {
    ip: string
}
export function getIP(): IPromise<IGeIPResponse> {
    return request(`https://api64.ipify.org/?format=json`, {
        method: 'GET'
    })
}
