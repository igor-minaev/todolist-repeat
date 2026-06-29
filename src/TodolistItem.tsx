import type {FilterValues, Task} from "@/App";
import {Button} from "@/Button";
import {CreateItemForm} from "@/CreateItemForm";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    id: string
    title: string
    filter: FilterValues
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
};
export const TodolistItem = ({
                                 id,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                                 deleteTodolist
                             }: Props) => {

    const mappedTasks = tasks.length
        ? <ul>
            {
                tasks.map(task => {
                    const deleteTaskHandler = () => deleteTask(id, task.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, task.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <span>{task.title}</span>
                            <Button onClick={deleteTaskHandler}>x</Button>
                        </li>
                    )
                })
            }
        </ul>
        : <p>You don't have any task</p>


    const createTaskHandler = (title: string) => createTask(id, title)


    const deleteTodolistHandler = () => deleteTodolist(id)


    return (
        <div>
            <h3>
                {title}
                <Button onClick={deleteTodolistHandler}>x</Button>
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {mappedTasks}
            <div>
                <Button style={{background: filter === 'all' ? 'pink' : ''}} onClick={() => changeFilter(id, 'all')}>All</Button>
                <Button style={{background: filter === 'active' ? 'pink' : ''}} onClick={() => changeFilter(id, 'active')}> Active </Button>
                <Button style={{background: filter === 'completed' ? 'pink' : ''}} onClick={() => changeFilter(id, 'completed')}>Completed</Button>
            </div>
        </div>
    );
};
