import { makeStyles } from '@material-ui/core/styles';

export const useTopbarStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        color: theme.palette.common.white,
    },

    subbar: {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[2],
    },
}));