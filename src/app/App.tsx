import styles from './App.module.css'
import {type TaskType} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem";
import {ThemeProvider} from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline'
import {useAppSelector} from "@/common/hooks/useAppSelector";
import {selectThemeMode} from "./app-selectors";
import {getTheme} from "@/common/theme/theme";
import {Header} from "@/common/components/Header/Header";
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
            <div className={styles.app}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}

export default App
