import {FilterType, TaskType} from "../types/task.ts";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}
export const Todolist = ({title, tasks, deleteTask, changeFilter, addTask}: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => (
                <Task key={t.id} {...t} deleteTask={deleteTask}/>
            ))}
        </ul>
        : <p>You don't create any task</p>

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === 'Enter' && addTaskHandler()
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
                <Button onClick={addTaskHandler}>+</Button>
            </div>
            {mappedTasks}
            <div>
                <Button onClick={() => changeFilter('all')}>All</Button>
                <Button onClick={() => changeFilter('active')}> Active </Button>
                <Button onClick={() => changeFilter('completed')}>Completed</Button>
            </div>
        </div>
    );
};

