import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>

// @ts-ignore
export const Button = ({children, onClick, ...restProps}: ButtonPropsType) => {
    return (
        <button onClick={onClick}>{children}</button>
    );
};

