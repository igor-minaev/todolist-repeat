import {EditableSpan} from "@/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import type {Todolist} from "@/app/App";

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title} = todolist
    const dispatch = useAppDispatch()

    const deleteTodolistHandler = () => dispatch(deleteTodolistAC({id}))
    const changeTodolistTitleHandler = (title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }
    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton color="secondary" onClick={deleteTodolistHandler}>
                <DeleteForeverIcon/>
            </IconButton>
        </h3>
    )
}