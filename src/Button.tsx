import type {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string
}

export const Button = ({name, onClick}: ButtonPropsType) => {
    return (
        <button onClick={onClick}>{name}</button>
    );
};

