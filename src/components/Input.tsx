import {InputHTMLAttributes} from "react";

type InputPropsType = InputHTMLAttributes<HTMLInputElement>
export const Input = ({...rest}: InputPropsType) => {
    return (
        <input {...rest}/>
    );
};
