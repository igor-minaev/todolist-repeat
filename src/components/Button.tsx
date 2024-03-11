import React from 'react';

type PropsType = {
    name: string
    onClick: () => void
    className?: string
}

export const Button: React.FC<PropsType> = (props) => {
    const {name, onClick,className, ...restProps} = props

    const onClickHandler = () => onClick()

    return (
        <button className={className} onClick={onClickHandler}>{name}</button>
    );
};

