import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({children, onClick, ...restProps}: ButtonPropsType) => {
    return (
        <button onClick={onClick} {...restProps}>{children}</button>
    );
};

