import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>

// @ts-ignore
export const Button = ({children, onClick, disabled, ...restProps}: ButtonPropsType) => {
    return (
        <button onClick={onClick} disabled={disabled}>{children}</button>
    );
};

