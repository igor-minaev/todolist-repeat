import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = {
    name: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({name, onClick, disabled, className}: ButtonPropsType) => {
    return (
        <button className={className} disabled={disabled} onClick={onClick}>{name}</button>
    );
};

