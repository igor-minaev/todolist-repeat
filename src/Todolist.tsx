import {Button} from "./Button"
import type {FilterValues} from "./App";
import {type ChangeEvent, KeyboardEvent, useState} from "react";
import {CreateItemForm} from "./CreateItemForm";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    title: string
    id: string
    filter: FilterValues
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const Todolist = ({
                             title,
                             id,
                             filter,
                             tasks,
                             deleteTask,
                             changeTodolistFilter,
                             createTask,
                             changeTaskStatus,
                             deleteTodolist
                         }: Props) => {

    const mappedTasks = tasks.length === 0
        ? <p>Your tasks list is empty!</p>
        : <ul>
            {tasks.map(task => {
                const deleteTaskHandler = () => deleteTask(id, task.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(id, task.id, e.currentTarget.checked)
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                        <span className={task.isDone ? 'taskDone' : 'task'}>{task.title}</span>
                        <Button name='x' onClick={deleteTaskHandler}/>
                    </li>
                )
            })}
        </ul>

    const filterAllHandler = () => changeTodolistFilter(id, "all")
    const filterActiveHandler = () => changeTodolistFilter(id, "active")
    const filterCompletedHandler = () => changeTodolistFilter(id, "completed")
    const deleteTodolistHandler = () => deleteTodolist(id)
    const createTaskHandler = (title: string) => createTask(id, title)

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={}/>
                <Button name='x' onClick={deleteTodolistHandler}/>
            </h3>
            <CreateItemForm createItem={createTaskHandler}/>
            {mappedTasks}
            <div className='buttonsWrapper'>
                <Button className={filter === 'all' ? 'activeButton' : 'button'} name='All' onClick={filterAllHandler}/>
                <Button className={filter === 'active' ? 'activeButton' : 'button'} name='Active' onClick={filterActiveHandler}/>
                <Button className={filter === 'completed' ? 'activeButton' : 'button'} name='Completed' onClick={filterCompletedHandler}/>
            </div>
        </div>
    );
};
