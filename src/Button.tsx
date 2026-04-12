import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = {
    name: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({name,onClick}: ButtonPropsType) => {
    return (
        <button onClick={onClick}>{name}</button>
    );
};

