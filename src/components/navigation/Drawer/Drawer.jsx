import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

// Core
import { Box, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { AddOutlined, CalendarToday, Close, FolderOutlined, Security } from '@material-ui/icons';

// Routing
import { ADMIN_PATH } from '../../../routes/paths';

// Styles
import { useDrawerStyles } from './Drawer.style';

const Drawer = ({ isOpen, handleClose}) => {
  const classes = useDrawerStyles();
  const history = useHistory();

  return (
    <MuiDrawer anchor="right" open={isOpen} onClose={handleClose} classes={{ paper: classes.drawerPaper }}>
        <IconButton onClick={handleClose} className={classes.closeButton}>
            <Close />
        </IconButton>

        <Box p={2} mt={6} display="flex" flexDirection="column" justifyContent="space-between" height="100%" minWidth={300}>
            <List>
                <ListItem button className={classes.listItem}>
                    <ListItemIcon color="inherit">
                        <AddOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Nieuw Dossier" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <ListItemIcon>
                        <FolderOutlined />
                    </ListItemIcon>
                    <ListItemText primary="Cliëntenoverzicht" />
                </ListItem>
                <ListItem button className={classes.listItem}>
                    <ListItemIcon>
                        <CalendarToday />
                    </ListItemIcon>
                    <ListItemText primary="Dossieroverzicht" />
                </ListItem>
            </List>
            <List>
                <ListItem button className={classes.listItem} onClick={() => history.push(ADMIN_PATH)}>
                    <ListItemIcon>
                        <Security />
                    </ListItemIcon>
                    <ListItemText primary="Admin panel" />
                </ListItem>
            </List>
        </Box>
    </MuiDrawer>
  )
};

Drawer.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
};

export default Drawer;
