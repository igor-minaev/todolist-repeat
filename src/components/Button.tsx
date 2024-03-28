import React from 'react';

type ButtonType = {
    name: string
    onClick: () => void
    className?: string
}

export const Button: React.FC<ButtonType> = props => {
    const {name, onClick, className, ...restProps} = props
    const onClickHandler = () => onClick()
    return (
        <button className={className} onClick={onClickHandler}>{name}</button>
    );
};

