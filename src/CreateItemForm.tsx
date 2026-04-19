import {Button} from "./components/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type CreateItemFormPropsType = {
    addItem: (title: string) => void
}

export const CreateItemForm = ({addItem}: CreateItemFormPropsType) => {

    const [newItemTitle, setNewItemTitle] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewItemTitle(e.currentTarget.value)
    }

    const addTItemHandler = () => {
        const trimmedTitle = newItemTitle.trim()
        if (trimmedTitle) {
            addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setNewItemTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTItemHandler()
    }

    const disabledButton = newItemTitle.length < 5 || newItemTitle.length > 20
    const validationShortMessage = newItemTitle.length < 5 && <p>Title should be more then 5 chars</p>
    const validationLongMessage = newItemTitle.length > 20 && <p>Title should be less then 20 chars</p>
    const errorMessage = error && <p className='errorMessage'>Title is required!</p>
    return (
        <div>
            <input className={error ? 'error' : ''} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={newItemTitle}/>
            <Button disabled={disabledButton} onClick={addTItemHandler}>+</Button>
            {!error && validationShortMessage}
            {!error && validationLongMessage}
            {errorMessage}
        </div>
    );
};

