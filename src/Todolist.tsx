import {FilterType, TaskType} from "./App.tsx";
import {JSX} from "react";
import {Button} from "./Button.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter}: TodolistPropsType) => {

    const mappedTasks: JSX.Element = tasks.length
        ? <ul>
            {tasks.map(t => {
                const removeTaskHandler = () => removeTask(t.id)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <Button name='x' onClick={removeTaskHandler}/>
                    </li>
                )
            })}
        </ul>
        : <p>Your todolist is empty!</p>
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name="+"/>
            </div>
            {mappedTasks}
            <Button name="All" onClick={() => changeFilter("All")}/>
            <Button name="Active" onClick={() => changeFilter("Active")}/>
            <Button name="Completed" onClick={() => changeFilter("Completed")}/>
        </div>
    );
};

