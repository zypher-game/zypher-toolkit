import { ReactNode } from 'react';
export type AuthenticationStatus = 'loading' | 'unauthenticated' | 'authenticated';
export interface AuthenticationAdapter<Message> {
    getNonce: () => Promise<string>;
    createMessage: (args: {
        nonce: string;
        address: string;
        chainId: number;
    }) => Message;
    getMessageBody: (args: {
        message: Message;
    }) => string;
    verify: (args: {
        message: Message;
        signature: string;
    }) => Promise<boolean>;
    signOut: () => Promise<void>;
}
export interface AuthenticationConfig<Message> {
    adapter: AuthenticationAdapter<Message>;
    status: AuthenticationStatus;
}
export declare function createAuthenticationAdapter<Message>(adapter: AuthenticationAdapter<Message>): AuthenticationAdapter<Message>;
interface RainbowKitAuthenticationProviderProps<Message> extends AuthenticationConfig<Message> {
    enabled?: boolean;
    children: ReactNode;
}
export declare function RainbowKitAuthenticationProvider<Message = unknown>({ adapter, children, enabled, status, }: RainbowKitAuthenticationProviderProps<Message>): any;
export declare function useAuthenticationAdapter(): any;
export declare function useAuthenticationStatus(): any;
export {};
