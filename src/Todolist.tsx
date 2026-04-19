import {FilterValue, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    filter: FilterValue
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValue) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = ({
                             title,
                             filter,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus
                         }: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState(false)

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                    const removeTaskHandler = () => removeTask(t.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                            <span className={t.isDone ? 'taskDone' : 'task'}>{t.title}</span>
                            <Button onClick={removeTaskHandler}>x</Button>
                        </li>
                    )
                }
            )
            }
        </ul>
        : <p>Your tasklist is empty!</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setNewTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    const disabledButton = newTaskTitle.length < 5 || newTaskTitle.length > 20
    const validationShortMessage = newTaskTitle.length < 5 && <p>Title should be more then 5 chars</p>
    const validationLongMessage = newTaskTitle.length > 20 && <p>Title should be less then 20 chars</p>
    const errorMessage = error && <p className='errorMessage'>Title is required!</p>

    const changeAllFilterHandler = () => changeFilter('all')
    const changeActiveFilterHandler = () => changeFilter('active')
    const changeCompletedFilterHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={error ? 'error' : ''} onChange={onChangeHandler} onKeyDown={onKeyDownHandler} value={newTaskTitle}/>
                <Button disabled={disabledButton} onClick={addTaskHandler}>+</Button>
                {!error && validationShortMessage}
                {!error && validationLongMessage}
                {errorMessage}
            </div>
            {
                mappedTasks
            }
            <div>
                <Button className={`button ${filter === "all" ? 'active' : ''}`} onClick={changeAllFilterHandler}>All</Button>
                <Button className={`button ${filter === "active" ? 'active' : ''}`} onClick={changeActiveFilterHandler}>Active</Button>
                <Button className={`button ${filter === "completed" ? 'active' : ''}`} onClick={changeCompletedFilterHandler}>Completed</Button>
            </div>
        </div>
    )
        ;
};

