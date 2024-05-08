import React from 'react';

type PropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button: React.FC<PropsType> = (props) => {
    const {name, callBack, className, ...restProps} = props
    const onClickHandler = () => callBack()
    return (
        <button className={className} onClick={onClickHandler}>{name}</button>
    );
};

