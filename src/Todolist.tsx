import {TaskType} from "./App.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
}
export const Todolist = ({title, tasks, removeTask}: TodolistPropsType) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                    const removeTaskHandler = () => removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTaskHandler}>x</button>
                        </li>
                    )
                }
            )
            }
        </ul>
        : <p>Your tasklist is empty!</p>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {
                mappedTasks
            }
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
        ;
};

