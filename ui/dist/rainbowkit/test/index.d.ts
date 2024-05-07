import type { MockProviderOptions } from '@wagmi/core/connectors/mock';
import { ReactElement } from 'react';
import type { Chain } from 'wagmi';
import type { RainbowKitProviderProps } from '../src/components/RainbowKitProvider/RainbowKitProvider';
export declare function renderWithProviders(component: ReactElement, options?: {
    chains?: Chain[];
    mock?: boolean;
    mockOptions?: MockProviderOptions;
    props?: Omit<RainbowKitProviderProps, 'children'>;
}): any;
