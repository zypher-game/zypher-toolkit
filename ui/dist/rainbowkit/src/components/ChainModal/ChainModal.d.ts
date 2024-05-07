import React from "react";
export interface ChainModalProps {
    fn: any;
    open: boolean;
    onClose: () => void;
}
export declare function ChainModal({ onClose, open, fn }: ChainModalProps): React.JSX.Element | null;
