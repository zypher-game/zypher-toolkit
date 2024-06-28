type IListWithMotionProps<T> = {
    parentClassName?: string;
    itemClassName?: string;
    data: T[];
    keyProp?: keyof T;
    renderItem: (item: T) => JSX.Element;
};
declare const _default: <T>(props: IListWithMotionProps<T>) => JSX.Element;
export default _default;
