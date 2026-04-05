import {TaskType} from "./types/types.ts";

type TodolistTitle = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title}: TodolistTitle) => {
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
            <ul></ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
