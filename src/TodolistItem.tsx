import type {Task} from "@/App";
import {Button} from "@/Button";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
};
export const TodolistItem = ({title, tasks, deleteTask}: Props) => {

    const mappedTasks = tasks.length
        ? <ul>
            {
                tasks.map(task => {
                    const deleteTaskHandler = () => deleteTask(task.id)
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button onClick={deleteTaskHandler}>x</Button>
                        </li>
                    )
                })
            }
        </ul>
        : <p>You don't have any task</p>

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
