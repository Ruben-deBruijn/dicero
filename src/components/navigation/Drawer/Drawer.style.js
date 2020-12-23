import { makeStyles } from '@material-ui/core/styles';

export const useDrawerStyles = makeStyles(theme => ({
    drawerPaper: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },

    listItem: {
        color: theme.palette.common.white,
        borderBottom: `2px solid ${theme.palette.secondary.main}`,
        paddingLeft: 0,
    },

    closeButton: {
        color: 'inherit',
        position: 'absolute',
        padding: theme.spacing(2),
        top: 0,
        left: 0,
    },
}));