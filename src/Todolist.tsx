import {FilterType, PriorityFilterType, TaskType} from "./types/types.ts";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistTitle = {
    title: string
    filter: FilterType
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTaskFilter: (filter: FilterType) => void
    changePriorityFilter: (priority: PriorityFilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
}

export const Todolist = ({
                             title,
                             filter,
                             tasks,
                             deleteTask,
                             changeTaskFilter,
                             changePriorityFilter,
                             addTask,
                             changeTaskStatus
                         }: TodolistTitle) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)


    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const deleteTaskHandler = () => deleteTask(t.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                const taskClassName = t.isDone ? 'task-done' : 'task'
                return (
                    <li key={t.id}>
                        <input onChange={changeTaskStatusHandler} type="checkbox" checked={t.isDone}/>
                        <span className={taskClassName}>{t.title}</span>
                        <span>-<b>Priority:</b> {t.priority}-</span>
                        <button onClick={deleteTaskHandler}>x</button>
                    </li>
                )
            })}
        </ul>
        : <p>Your todolist is empty</p>

    const changePriorityFilterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        changePriorityFilter(e.currentTarget.value as PriorityFilterType)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    const disableButton = taskTitle.length < 3 || taskTitle.length > 15
    const titleLengthValidation = taskTitle.length > 3 && taskTitle.length <= 15

    const errorClassName = error ? 'error' : ''
    const errorMessage = error && <p style={{color: 'red'}}>Title is empty!</p>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input className={errorClassName} value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button disabled={disableButton} onClick={addTaskHandler}>+</button>
            </div>
            {errorMessage}
            {titleLengthValidation && <p>Title length should be less then 16 chars</p>}
            <div>
                <label htmlFor="priority">Priority</label>
                <select onChange={changePriorityFilterHandler} name="priority" id="priority">
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                </select>
            </div>
            {mappedTasks}
            <div>
                <button className={filter === 'All' ? 'active' : ''} onClick={() => changeTaskFilter("All")}>All</button>
                <button className={filter === 'Active' ? 'active' : ''} onClick={() => changeTaskFilter("Active")}>Active</button>
                <button className={filter === 'Completed' ? 'active' : ''} onClick={() => changeTaskFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
};
