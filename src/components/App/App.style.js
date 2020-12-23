import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: theme.palette.grey[50],
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down('sm')]: {
            height: '100%',
            width: '100%',
        },
    },
}));