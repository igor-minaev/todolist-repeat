import {FilterType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterType
    tasks: TaskType[]
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    changeTodolistFilter: (payload: { todolistId: string, filter: FilterType }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = ({
                             id,
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeTodolistFilter,
                             addTask,
                             changeTaskStatus,
                             removeTodolist
                         }: TodolistPropsType) => {

    const [newTitleText, setNewTitleText] = useState('')
    const [error, setError] = useState(false)

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask({todolistId: id, taskId: t.id})
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({
                    todolistId: id,
                    taskId: t.id,
                    isDone: e.currentTarget.checked
                })
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={t.isDone ? 'taskDone' : 'task'}>{t.title}</span>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your taskslist is empty!</p>

    const changeFilterToAllHandler = () => changeTodolistFilter({todolistId: id, filter: 'all'})
    const changeFilterToActiveHandler = () => changeTodolistFilter({todolistId: id, filter: 'active'})
    const changeFilterToCompletedHandler = () => changeTodolistFilter({todolistId: id, filter: 'completed'})

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTitleText(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = newTitleText.trim()
        if (trimmedTitle) {
            addTask({todolistId: id, title: trimmedTitle})
        } else {
            setError(true)
        }
        setNewTitleText('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addTaskHandler()
    }

    const removeTodolistHandler = () => removeTodolist(id)

    const disableButtonValidation = newTitleText.length < 5 || newTitleText.length > 20

    const minLengthTitleValidation = newTitleText.length < 5 && <p>Title should be more then 5 chars</p>
    const maxLengthTitleValidation = newTitleText.length > 20 && <p>Title should be less then 20 chars</p>
    const errorMessage = error && <p className='errorMessage'>Title is required!</p>


    return (
        <div>
            <h3>
                {title}
                <Button name='x' onClick={removeTodolistHandler}/>
            </h3>
            <div>
                <input className={error ? 'error' : ''} onChange={onChangeHandler} value={newTitleText} onKeyDown={onKeyDownHandler}/>
                <Button name='+' onClick={addTaskHandler} disabled={disableButtonValidation}/>
                {!error && minLengthTitleValidation}
                {!error && maxLengthTitleValidation}
                {errorMessage}
            </div>
            {mappedTasks}
            <div>
                <Button className={filter === 'all' ? `button active` : 'button'} name='All' onClick={changeFilterToAllHandler}/>
                <Button className={filter === 'active' ? `button active` : 'button'} name='Active' onClick={changeFilterToActiveHandler}/>
                <Button className={filter === 'completed' ? `button active` : 'button'} name='Completed' onClick={changeFilterToCompletedHandler}/>
            </div>
        </div>
    );
};

