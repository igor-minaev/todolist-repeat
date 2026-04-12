import {TaskType} from "./App.tsx";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
}

export const Todolist = ({title, tasks}: TodolistPropsType) => {
    return (
        <div>
            <h3>Title</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                Tasks
            </ul>
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
        </div>
    );
};

