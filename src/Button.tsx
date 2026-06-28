import type {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({children, onClick, ...restProps}: Props) => {
    return <button onClick={onClick} {...restProps}>{children}</button>
}