import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = {
    name: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({name, ...restProps}: ButtonPropsType) => {
    return (
        <button {...restProps}>{name}</button>
    );
};

