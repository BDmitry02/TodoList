export type VoidFunc<T, R = undefined> = R extends undefined
    ? (v: T) => void
    : (v: T, r: R) => void;

export type SetStateFunc<T> = React.Dispatch<React.SetStateAction<T>>;
