import {FilterValue, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Task} from "./Task.tsx";

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValue
    tasks: TaskType[]
    removeTask: (payload: { todolistId: string, taskId: string }) => void
    changeFilter: (payload: { todolistId: string, filter: FilterValue }) => void
    addTask: (payload: { todolistId: string, title: string }) => void
    changeTaskStatus: (payload: { todolistId: string, taskId: string, isDone: boolean }) => void
}
export const Todolist = ({
                             id,
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
                    const removeTaskHandler = () => removeTask({todolistId: id, taskId: t.id})
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus({
                        todolistId: id,
                        taskId: t.id,
                        isDone: e.currentTarget.checked
                    })
                    return (
                        <Task key={t.id} {...t} removeTaskHandler={removeTaskHandler} onChangeTaskStatusHandler={onChangeTaskStatusHandler}/>
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
            addTask({todolistId: id, title: trimmedTitle})
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

    const changeAllFilterHandler = () => changeFilter({todolistId: id, filter: "all"})
    const changeActiveFilterHandler = () => changeFilter({todolistId: id, filter: "active"})
    const changeCompletedFilterHandler = () => changeFilter({todolistId: id, filter: "completed"})

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

