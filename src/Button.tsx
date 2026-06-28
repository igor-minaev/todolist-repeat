import type {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({children}: Props) => {
    return <button>{children}</button>
}