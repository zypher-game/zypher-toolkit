import React, { ReactNode } from 'react';
export type DisclaimerComponent = React.FunctionComponent<{
    Text: React.FunctionComponent<{
        children: ReactNode;
    }>;
    Link: React.FunctionComponent<{
        children: ReactNode;
        href: string;
    }>;
}>;
export declare const defaultAppInfo: {
    appName: undefined;
    disclaimer: undefined;
    learnMoreUrl: string;
};
export declare const AppContext: any;
