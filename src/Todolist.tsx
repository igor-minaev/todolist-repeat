import {Button} from "./Button"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(task => {
                return (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <Button name='x'/>
                    </li>
                )
            })}
        </ul>
        : <p>Your tasks list is empty!</p>


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <Button name='+'/>
            </div>
            {mappedTasks}
            <div>
                <Button name='All'/>
                <Button name='Active'/>
                <Button name='Completed'/>
            </div>
        </div>
    );
};
