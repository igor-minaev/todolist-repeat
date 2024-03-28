import React from 'react';
import {Task} from './Task';
import {Button} from './Button';
import {FilterType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

type TodolistType = {
    id: string
    filter: FilterType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist: React.FC<TodolistType> = props => {
    const {
        id,
        filter,
        title,
        tasks,
        removeTask,
        changeTodolistFilter,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle,
        ...restProps
    } = props


    const getFilteredTasks = (tasks: TaskType[], filter: FilterType): TaskType[] => {
        switch (filter) {
            case 'Active':
                return tasks.filter(t => !t.isDone)
            case 'Completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks

        }
    }
    const tasksForTodolist = getFilteredTasks(tasks, filter)
    const removeTaskHandler = (taskId: string) => removeTask(id, taskId)
    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => changeTaskStatus(id, taskId, isDone)
    const changeTaskTitleHandler = (taskId: string, title: string) => changeTaskTitle(id, taskId, title)
    const mappedTasks: JSX.Element[] = tasksForTodolist.map(task => {
        return <Task key={task.id} {...task} removeTask={removeTaskHandler} changeTaskStatus={changeTaskStatusHandler}
                     changeTaskTitle={changeTaskTitleHandler}/>
    })
    const tasksForRender: JSX.Element = tasks.length
        ? <ul className="list">{mappedTasks}</ul>
        : <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterType) => changeTodolistFilter(id, filter)

    const removeTodolistHandler = () => removeTodolist(id)
    const addTaskHandler = (title: string) => addTask(id, title)
    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(id, title)
    return (
        <div className="todolist">
            <h2>
                <EditableSpan oldTitle={title} onClick={changeTodolistTitleHandler}/>
                <Button name="x" onClick={removeTodolistHandler}/>
            </h2>
            <AddItemForm addItem={addTaskHandler}/>
            {tasksForRender}
            <div>
                <Button className={filter === 'All' ? 'active' : ''} name="All"
                        onClick={() => changeFilterHandler('All')}/>
                <Button className={filter === 'Active' ? 'active' : ''} name="Active"
                        onClick={() => changeFilterHandler('Active')}/>
                <Button className={filter === 'Completed' ? 'active' : ''} name="Completed"
                        onClick={() => changeFilterHandler('Completed')}/>
            </div>
        </div>
    );
};

