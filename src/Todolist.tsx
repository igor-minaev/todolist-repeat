import {FilterType, PriorityType, TaskType} from "./types/types.ts";
import {ChangeEvent} from "react";

type TodolistTitle = {
    title: string
    tasks: TaskType[]
    deleteTask: (taskId: string) => void
    changeTaskFilter: (filter: FilterType) => void
    changePriorityFilter: (priority: PriorityType) => void
}

export const Todolist = ({title, tasks, deleteTask, changeTaskFilter, changePriorityFilter}: TodolistTitle) => {

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

    const changePriorityFilterHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        changePriorityFilter(e.currentTarget.value as PriorityType)
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <div>
                <label htmlFor="priority">Priority</label>
                <select onChange={changePriorityFilterHandler} name="priority" id="priority">
                    <option value="All">All</option>
                    <option value="Low">Low</option>
                    <option value="Middle">Middle</option>
                    <option value="High">High</option>
                </select>
            </div>
            {mappedTasks}
            <div>
                <button onClick={() => changeTaskFilter("All")}>All</button>
                <button onClick={() => changeTaskFilter("Active")}>Active</button>
                <button onClick={() => changeTaskFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
};
