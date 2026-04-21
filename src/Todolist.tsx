import {FilterType, TaskType} from "./App.tsx";
import {Button} from "./components/Button.tsx";
import {ChangeEvent, useState} from "react";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeTodolistFilter,
                             addTask,
                             changeTaskStatus
                         }: TodolistPropsType) => {

    const [newTitleText, setNewTitleText] = useState('')

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)
                const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                        <span>{t.title}</span>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your taskslist is empty!</p>

    const changeFilterToAllHandler = () => changeTodolistFilter('all')
    const changeFilterToActiveHandler = () => changeTodolistFilter('active')
    const changeFilterToCompletedHandler = () => changeTodolistFilter('completed')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleText(e.currentTarget.value)
    }

    const addTaskHandler = () => {
        addTask(newTitleText)
        setNewTitleText('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input onChange={onChangeHandler} value={newTitleText}/>
                <Button name='+' onClick={addTaskHandler}/>
            </div>
            {mappedTasks}
            <div>
                <Button name='All' onClick={changeFilterToAllHandler}/>
                <Button name='Active' onClick={changeFilterToActiveHandler}/>
                <Button name='Completed' onClick={changeFilterToCompletedHandler}/>
            </div>
        </div>
    );
};

