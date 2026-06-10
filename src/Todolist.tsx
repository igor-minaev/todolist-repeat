import {Button} from "./Button"
import type {FilterValuesType} from "./App";

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
}

export const Todolist = ({title, tasks, deleteTask, changeFilter}: TodolistPropsType) => {


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

    const filterAllHandler = () => changeFilter("all")
    const filterActiveHandler = () => changeFilter("active")
    const filterCompletedHandler = () => changeFilter("completed")


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button name='+'/>
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
