import {TaskType} from "../types/task.ts";
import {Button} from "./Button.tsx";
import {Task} from "./Task.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}
export const Todolist = ({title, tasks}: TodolistPropsType) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => (
                <Task key={t.id} {...t}/>
            ))}
        </ul>
        : <p>You don't create any task</p>
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button>+</Button>
            </div>
            {mappedTasks}
            <div>
                <Button>All</Button>
                <Button>Active</Button>
                <Button>Completed</Button>
            </div>
        </div>
    );
};

