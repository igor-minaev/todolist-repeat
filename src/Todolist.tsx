import {FilterType, PriorityFilterType, TaskType} from "./types/types.ts";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistTitle = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTaskFilter: (filter: FilterType) => void
    changePriorityFilter: (priority: PriorityFilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, status: boolean) => void
}

export const Todolist = ({
                             title,
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
                return (
                    <li key={t.id}>
                        <input onChange={changeTaskStatusHandler} type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
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
        setTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    const disableButton = taskTitle.length < 3 || taskTitle.length > 15
    const titleLengthValidation = taskTitle.length > 3 && taskTitle.length <= 15

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <button disabled={disableButton} onClick={addTaskHandler}>+</button>
            </div>
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
                <button onClick={() => changeTaskFilter("All")}>All</button>
                <button onClick={() => changeTaskFilter("Active")}>Active</button>
                <button onClick={() => changeTaskFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
};
