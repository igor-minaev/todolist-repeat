import type {FilterValues, Task} from "@/App";
import {Button} from "@/Button";
import {CreateItemForm} from "@/CreateItemForm";
import {EditableSpan} from "@/EditableSpan";
import {type ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    id: string
    title: string
    filter: FilterValues
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
};
export const TodolistItem = ({
                                 id,
                                 title,
                                 tasks,
                                 deleteTask,
                                 changeTodolistFilter,
                                 createTask,
                                 changeTaskStatus,
                                 filter,
                                 deleteTodolist,
                                 changeTaskTitle,
                                 changeTodolistTitle
                             }: Props) => {

    const mappedTasks = tasks.length
        ? <ul>
            {
                tasks.map(task => {
                    const deleteTaskHandler = () => deleteTask(id, task.id)
                    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatus(id, task.id, e.currentTarget.checked)
                    }
                    const changeTaskTitleHandler = (title: string) => changeTaskTitle(id, task.id, title)
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                            <EditableSpan oldTitle={task.title} changeTitle={changeTaskTitleHandler}/>
                            <Button onClick={deleteTaskHandler}>x</Button>
                        </li>
                    )
                })
            }
        </ul>
        : <p>You don't have any task</p>


    const createTaskHandler = (title: string) => createTask(id, title)

    const deleteTodolistHandler = () => deleteTodolist(id)

    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(id, title)

    return (
        <div>
            <h3>
                <EditableSpan oldTitle={title} changeTitle={changeTodolistTitleHandler}/>
                <Button onClick={deleteTodolistHandler}>x</Button>
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {mappedTasks}
            <div>
                <Button style={{background: filter === 'all' ? 'pink' : ''}} onClick={() => changeTodolistFilter(id, 'all')}>All</Button>
                <Button style={{background: filter === 'active' ? 'pink' : ''}} onClick={() => changeTodolistFilter(id, 'active')}> Active </Button>
                <Button style={{background: filter === 'completed' ? 'pink' : ''}} onClick={() => changeTodolistFilter(id, 'completed')}>Completed</Button>
            </div>
        </div>
    );
};
