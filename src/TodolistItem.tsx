import Button from '@mui/material/Button';
import type {Todolist} from "./app/App";
import {CreateItemForm} from "./CreateItemForm";
import Box from '@mui/material/Box';
import {containerSx} from "./Todolist.styles";
import {createTaskAC} from "@/model/tasks-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTodolistFilterAC} from "@/model/todolists-reducer";
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectTasks} from "@/model/tasks-selectors";
import {TodolistTitle} from "@/TodolistTitle";
import {Tasks} from "@/Tasks";
import {FilterButtons} from "@/FilterButtons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const createTaskHandler = (title: string) => dispatch(createTaskAC({todolistId: todolist.id, title}))

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm createItem={createTaskHandler}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    )
        ;
};
