import {FilterValue, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValue) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}
export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus}: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                    const removeTaskHandler = () => removeTask(t.id)
                    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                            <span>{t.title}</span>
                            <Button onClick={removeTaskHandler}>x</Button>
                        </li>
                    )
                }
            )
            }
        </ul>
        : <p>Your tasklist is empty!</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const changeAllFilterHandler = () => changeFilter('all')
    const changeActiveFilterHandler = () => changeFilter('active')
    const changeCompletedFilterHandler = () => changeFilter('completed')

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={newTaskTitle}/>
                <Button onClick={addTaskHandler}>+</Button>
            </div>
            {
                mappedTasks
            }
            <div>
                <Button onClick={changeAllFilterHandler}>All</Button>
                <Button onClick={changeActiveFilterHandler}>Active</Button>
                <Button onClick={changeCompletedFilterHandler}>Completed</Button>
            </div>
        </div>
    )
        ;
};

