import { makeStyles, fade } from '@material-ui/core/styles';

export const useDrawerStyles = makeStyles(theme => ({
    drawerPaper: {
        backgroundColor: fade(theme.palette.primary.main, 0.9),
        color: theme.palette.common.white,
    },

    listItem: {
        color: theme.palette.common.white,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },

    closeButton: {
        color: 'inherit',
        position: 'absolute',
        padding: theme.spacing(2),
        top: 0,
        left: 0,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}));