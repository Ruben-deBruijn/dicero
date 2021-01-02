import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// Icons
import { AddOutlined, CalendarToday, Close, FolderOutlined, ListOutlined, Security } from '@material-ui/icons';

// Core
import { 
    Box, 
    Button, 
    Dialog, 
    DialogContent, 
    Drawer as MuiDrawer, 
    IconButton, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText 
} from '@material-ui/core';
import { TextField } from '../../fields';

// Routing
import { ADMIN_PATH, CLIENT_LIST_PATH, DOSSIER_LIST_PATH, OVERVIEW_PATH } from '../../../routes/paths';

// Styles
import { useDrawerStyles } from './Drawer.style';


const Drawer = ({ isOpen, handleClose}) => {
  const classes = useDrawerStyles();
  const history = useHistory();
  const { control, handleSubmit} = useForm();
  const { enqueueSnackbar } = useSnackbar();

  const [openDialog, setDialogOpen] = useState(false);

  const onAdminClick = () => {
      if (!localStorage.getItem('user') && !localStorage.getItem('password')) {
          setDialogOpen(true)
      } else {
        history.push(ADMIN_PATH);
      }
  }

  const handleFormSubmit = async values => {
    if (values.user === 'admin' && values.password === '1234') {
        localStorage.setItem('user', values.user);
        localStorage.setItem('password', values.password);
        history.push(ADMIN_PATH);
        setDialogOpen(false);
    } else {
        enqueueSnackbar(`Gebruikersgegevens zijn verkeerd of u heeft geen toegang`, { variant: 'error' });
    }
  };

  return (
    <Fragment>
        <MuiDrawer anchor="right" open={isOpen} onClose={handleClose} classes={{ paper: classes.drawerPaper }}>
            <IconButton onClick={handleClose} className={classes.closeButton}>
                <Close />
            </IconButton>

            <Box pt={2} mt={6} display="flex" flexDirection="column" justifyContent="space-between" height="100%" minWidth={300}>
                <List>
                    <ListItem button className={classes.listItem} onClick={() => history.push(OVERVIEW_PATH)}>
                        <ListItemIcon color="inherit">
                            <ListOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Overzicht" />
                    </ListItem>
                    <ListItem button className={classes.listItem}>
                        <ListItemIcon color="inherit">
                            <AddOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Nieuw Dossier" />
                    </ListItem>
                    <ListItem button className={classes.listItem} onClick={() => history.push(CLIENT_LIST_PATH)}>
                        <ListItemIcon>
                            <FolderOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Cliëntenoverzicht" />
                    </ListItem>
                    <ListItem button className={classes.listItem} onClick={() => history.push(DOSSIER_LIST_PATH)}>
                        <ListItemIcon>
                            <CalendarToday />
                        </ListItemIcon>
                        <ListItemText primary="Dossieroverzicht" />
                    </ListItem>
                </List>
                {history.location.pathname !== '/admin' && (
                    <List disablePadding>
                        <ListItem button className={classes.listItem} onClick={onAdminClick}>
                            <ListItemIcon>
                                <Security />
                            </ListItemIcon>
                            <ListItemText primary="Admin panel" />
                        </ListItem>
                    </List>
                )}
            </Box>
        </MuiDrawer>

        <Dialog open={openDialog}>
            <DialogContent>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Controller
                    control={control}
                    as={TextField} 
                    label="Gebruiker"
                    name="user"
                    fullWidth
                />

                <Controller
                    control={control}
                    as={TextField} 
                    label="Wachtwoord"
                    name="password"
                    fullWidth
                />
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" color="secondary" type="submit">
                        Bevestigen
                    </Button>
                    <Button variant="outlined" color="primary" onClick={() => setDialogOpen(false)}>
                        Sluiten
                    </Button>
                </Box>
                </form>
            </DialogContent>
        </Dialog>
    </Fragment>
  )
};

Drawer.propTypes = {
    isOpen: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
};

export default Drawer;
