import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    title: string
    changeItemTitle: (title: string) => void
}

export const EditableSpan: React.FC<PropsType> = ({title, changeItemTitle}) => {
    const [newTitle, setNewTitle] = useState(title)
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
        edit && changeItemTitle(newTitle)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value)
    return (
        edit
            ? <input value={newTitle} onChange={onChangeHandler} autoFocus onBlur={editHandler}/>
            : <span onDoubleClick={editHandler}>{title}</span>
    );
};

