import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type TodolistPropsType = {
    todolistId: string
    filter: FilterValuesType
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskId: string) => void
    changeTodolistFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        todolistId,
        filter,
        title,
        tasks,
        removeTask,
        changeTodolistFilter,
        addTask,
        changeTaskStatus,
        removeTodolist,
        changeTodolistTitle,
        changeTaskTitle,
        ...restProps
    } = props

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case 'active':
                return tasks.filter(t => !t.isDone)
            case 'completed':
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }

    const filteredTasks = getFilteredTasks(tasks, filter)

    const mappedTasks: JSX.Element[] = filteredTasks.map(task => {
        const removeTaskHandler = () => removeTask(todolistId, task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, task.id, e.currentTarget.checked)
        const taskStyle = task.isDone ? 'done' : 'task'
        return (
            <li key={task.id} className={taskStyle}>
                <Checkbox checked={task.isDone} onChange={onChangeHandler}/>
                <EditableSpan oldTitle={task.title}
                              onClick={(newTitle) => changeTaskTitleHandler(task.id, newTitle)}/>
                <button onClick={removeTaskHandler}>x</button>
                <IconButton onClick={removeTaskHandler} color="primary">
                    <DeleteForeverIcon/>
                </IconButton>
            </li>
        )
    })

    const tasksForRender: JSX.Element = tasks.length ?
        <ul>{mappedTasks}</ul> :
        <p>Your todolist is empty!</p>

    const changeFilterHandler = (filter: FilterValuesType) => () => changeTodolistFilter(todolistId, filter)
    const removeTodolistHandler = () => removeTodolist(todolistId)
    const addTaskHandler = (taskTitle: string) => addTask(todolistId, taskTitle)
    const changeTodolistTitleHandler = (newTitle: string) => changeTodolistTitle(todolistId, newTitle)
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => changeTaskTitle(todolistId, taskId, newTitle)

    return (
        <div className="todolist">
            <h2>
                <EditableSpan oldTitle={title} onClick={changeTodolistTitleHandler}/>
                {/*{title}*/}
                <IconButton onClick={removeTodolistHandler} color="primary">
                    <DeleteForeverIcon/>
                </IconButton>
            </h2>
            <AddItemForm addItem={addTaskHandler}/>
            {tasksForRender}
            <div className="buttons">
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} color="secondary"
                        onClick={changeFilterHandler('all')} size="small">All</Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} color="primary"
                        onClick={changeFilterHandler('active')} size="small">Active</Button>
                <Button variant={filter === 'completed' ? 'contained' : 'outlined'} color="success"
                        onClick={changeFilterHandler('completed')} size="small">Completed</Button>
            </div>
        </div>
    );
};

