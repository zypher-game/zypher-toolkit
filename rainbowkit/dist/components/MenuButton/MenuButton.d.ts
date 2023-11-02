import React from 'react';
declare type Props = {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLElement> | undefined;
    currentlySelected?: boolean;
    testId?: string;
    disabled?: boolean;
};
export declare const MenuButton: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export {};
