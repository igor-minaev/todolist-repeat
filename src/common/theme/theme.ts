import {createTheme} from "@mui/material";
import {ThemeMode} from "@/app/app-reducer";
import {lime, purple} from "@mui/material/colors";

export const getTheme = (themeMode: ThemeMode) => createTheme({
    palette: {
        mode: themeMode,
        primary: lime,
        secondary: purple,
    },
})