import {Button} from "./Button"
import type {FilterValuesType} from "./App";
import {type ChangeEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeFilter: (filter: FilterValuesType) => void
    createTask: (title: string) => void
}

export const Todolist = ({title, tasks, deleteTask, changeFilter, createTask}: TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState('')


    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(task.id)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button name='x' onClick={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your tasks list is empty!</p>
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const filterAllHandler = () => changeFilter("all")
    const filterActiveHandler = () => changeFilter("active")
    const filterCompletedHandler = () => changeFilter("completed")


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text" value={taskTitle} onChange={onChangeHandler}/>
                <Button name='+' onClick={createTaskHandler}/>
            </div>
            {mappedTasks}
            <div>
                <Button name='All' onClick={filterAllHandler}/>
                <Button name='Active' onClick={filterActiveHandler}/>
                <Button name='Completed' onClick={filterCompletedHandler}/>
            </div>
        </div>
    );
};
