import {TaskType} from "./types/types.ts";

type TodolistTitle = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
}

export const Todolist = ({title, tasks, deleteTask}: TodolistTitle) => {

    const mappedTasks = tasks.length
        ? <ul>
            {tasks.map(t => {
                const deleteTaskHandler = () => deleteTask(t.id)
                return (
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <span>-<b>Priority:</b> {t.priority}-</span>
                        <button onClick={deleteTaskHandler}>x</button>
                    </li>
                )
            })}
        </ul>
        : <p>Your todolist is empty</p>
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority">
                    <option value="All"></option>
                    <option value="Low"></option>
                    <option value="Middle"></option>
                    <option value="High"></option>
                </select>
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
