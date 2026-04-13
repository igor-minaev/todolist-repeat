import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = {
    name: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({name, onClick, disabled}: ButtonPropsType) => {
    return (
        <button disabled={disabled} onClick={onClick}>{name}</button>
    );
};

