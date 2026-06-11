import {styled} from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
    background?: string
}

export const NavButton = styled(Button)<Props>(({background}) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    boxShadow: '0 0 0 2px #054B62, 2px 2px 0 0 #054B62',
    borderRadius: '5px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 20px',
    color: '#ffffff',
    background: background || '#81d1c1',
}))

// export const NavButton = styled(Button)({
//     minWidth: '110px',
//     fontWeight: 'bold',
//     boxShadow: '0 0 0 2px #054B62, 2px 2px 0 0 #054B62',
//     borderRadius: '5px',
//     textTransform: 'capitalize',
//     margin: '0 10px',
//     padding: '8px 20px',
//     color: '#ffffff',
//     background: '#81d1c1',
// })