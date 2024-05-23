import { IPixelProps } from "../PixelBtn/ActivePixelButton";
import "./PixelTable.styl";
import React from "react";
interface IProps extends IPixelProps {
    header_children: React.ReactNode;
    body_children: React.ReactNode;
    classNameHeader?: string;
    headerBackgroundColor?: string;
}
export declare const PixelTableBorder: React.MemoExoticComponent<({ header_children, body_children, pixel_height, classNameHeader, backgroundColor, headerBackgroundColor, borderColor, width, }: IProps) => React.JSX.Element>;
export declare const PixelTable: React.MemoExoticComponent<({ header_children, body_children, pixel_height, className, classNameHeader, backgroundColor, headerBackgroundColor, borderColor, width, }: IProps) => React.JSX.Element>;
export declare const IsTablePixelWidget: React.MemoExoticComponent<({ width, height, className, backgroundColor, header_children, body_children, pixel_height, }: {
    width: string;
    height: string;
    className: string;
    backgroundColor: string;
    header_children: React.ReactNode;
    body_children: React.ReactNode;
    pixel_height: number;
}) => React.JSX.Element>;
export {};
