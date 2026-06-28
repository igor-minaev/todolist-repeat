import type {Task} from "@/App";

type Props = {
    title: string
    tasks: Task[]
};
export const TodolistItem = ({title, tasks}: Props) => {

    const mappedTasks = tasks.length
        ? <ul>
            {
                tasks.map(task => (
                    <li key={task.id}>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button>x</button>
                    </li>
                ))
            }
        </ul>
        : <p>You don't have any task</p>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {mappedTasks}
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
