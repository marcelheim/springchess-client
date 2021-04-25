import { createMuiTheme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';

const springChessDark = createMuiTheme({
    palette: {
        primary: {
            main: blueGrey[900],
        },
        secondary: {
            main: red[400],
        },
        background: {
            default: '#000a12',
        },
        type: 'dark',
    },
});

export default springChessDark;
