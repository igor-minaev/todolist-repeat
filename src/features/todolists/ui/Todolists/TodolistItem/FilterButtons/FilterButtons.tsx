import {containerSx} from "@/common/styles/container.styles";
import Box from "@mui/material/Box";

import Button from "@mui/material/Button";
import type {FilterValues, Todolist} from "@/app/App";
import {useAppDispatch} from "@/common/hooks/useAppDispatch";
import {changeTodolistFilterAC} from "@/features/todolists/model/todolists-reducer";

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
    const {id, filter} = todolist

    const dispatch = useAppDispatch()

    const changeFilterHandler = (filter: FilterValues) => dispatch(changeTodolistFilterAC({id, filter}))

    return (
        <Box sx={containerSx}>
            <Button size='small' color="secondary" variant={filter === 'all' ? 'contained' : "outlined"} onClick={() => changeFilterHandler('all')}>All</Button>
            <Button size='small' color="primary" variant={filter === 'active' ? 'contained' : "outlined"} onClick={() => changeFilterHandler('active')}>Active</Button>
            <Button size='small' color="success" variant={filter === 'completed' ? 'contained' : "outlined"} onClick={() => changeFilterHandler('completed')}>Completed</Button>
        </Box>
    )
}