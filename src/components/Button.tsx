import {ButtonHTMLAttributes} from "react";

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
    name: string
}
export const Button = ({name, ...rest}: ButtonPropsType) => {
    return (
        <button {...rest}>{name}</button>
    );
};

