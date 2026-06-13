import './App.css'
import {type TaskType} from "@/TodolistItem";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectThemeMode} from "./app-selectors";
import {getTheme} from "@/common/theme/theme";
import {Header} from "@/Heder";
import {Main} from "@/app/Main";


export type FilterValues = 'all' | 'active' | 'completed'
export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksState = Record<string, TaskType[]>


function App() {

    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header/>
            <Main/>
        </ThemeProvider>
    )
}

export default App
