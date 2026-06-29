import {type ChangeEvent, useState} from "react";


type Props = {
    oldTitle: string
    changeTitle: (title: string) => void
};
export const EditableSpan = ({oldTitle, changeTitle}: Props) => {
    const [title, setTitle] = useState(oldTitle)
    const [edit, setEdit] = useState(false)

    const editOn = () => {
        setEdit(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const editOff = () => {
        changeTitle(title)
        setEdit(false)
    }

    return (
        <>
            {
                edit
                    ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={editOff}/>
                    : <span onDoubleClick={editOn}>{oldTitle}</span>
            }
        </>
    );
};