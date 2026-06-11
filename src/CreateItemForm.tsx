import {Button} from "./Button";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: Props) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const createTaskHandler = () => {
        const trimmedTaskTitle = taskTitle.trim()
        if (trimmedTaskTitle) {
            createItem(trimmedTaskTitle)
            setTaskTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && createTaskHandler()
    }
    const errorClassName = error ? 'error' : ''

    return (
        <div>
            <input className={errorClassName} type="text" value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <Button name='+' onClick={createTaskHandler}/>
            {error && <p className='errorMessage'>Title is required!</p>}
        </div>
    );
};

