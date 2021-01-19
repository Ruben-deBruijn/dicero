import { makeStyles } from '@material-ui/core/styles';

export const useAppStyles = makeStyles(theme => ({
    wrapper: {
        backgroundColor: theme.palette.grey[50],
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
    },

    desktopPlaceholder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 'inherit',
    },

    innerPlaceholder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));