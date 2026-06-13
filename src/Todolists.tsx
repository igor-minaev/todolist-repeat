import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodolistItem} from "@/Todolist";
import {selectTodolists} from "@/model/todolists-selectors";
import {useAppSelector} from "@/common/hooks/useAppSelector";

export const Todolists = () => {

    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.length === 0
                ? <p>Create new todolist!</p>
                : todolists.map(todolist => {
                    return (
                        <Grid key={todolist.id}>
                            <Paper elevation={5} sx={{p: '15px'}}>
                                <TodolistItem
                                    todolist={todolist}/>
                            </Paper>
                        </Grid>
                    )
                })}
        </>
    )
}