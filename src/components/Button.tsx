import React from 'react';

type PropsType = {
    name: string
    callBack: () => void
}

export const Button: React.FC<PropsType> = (props) => {
    const {name, callBack, ...restProps} = props
    const onClickHandler = () => callBack()
    return (
        <button onClick={onClickHandler}>{name}</button>
    );
};

