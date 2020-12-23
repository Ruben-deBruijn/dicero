import { makeStyles } from '@material-ui/core/styles';

export const useTopbarStyles = makeStyles(theme => ({
    subbar: {
        backgroundColor: theme.palette.common.white,
        boxShadow: theme.shadows[2],
    },
}));