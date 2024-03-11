import React from 'react';

type PropsType = {
    name: string
    onClick: () => void
}

export const Button: React.FC<PropsType> = (props) => {
    const {name, onClick, ...restProps} = props

    const onClickHandler = () => onClick()

    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};

