import React from 'react';

type ButtonType = {
    name: string
    onClick: () => void
}

export const Button: React.FC<ButtonType> = props => {
    const {name, onClick} = props
    const onClickHandler = () => onClick()
    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};

