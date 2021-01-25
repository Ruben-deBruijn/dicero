import React, { Fragment, useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Icons
import { AddOutlined, Security, Menu, List, Hearing, People, Assignment } from '@material-ui/icons';

// Core
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import { UserContext } from '../../../providers/User.provider';
import Drawer from '../Drawer/Drawer';

// Routing
import { OVERVIEW_PATH } from '../../../routes/paths';

// Styles
import { useTopbarStyles } from './Topbar.style';

const Topbar = () => {
    const classes = useTopbarStyles();
    const history= useHistory();
    const location = useLocation();
    const { userState } = useContext(UserContext);

    const [drawer, setDrawer] = useState(false);
    const [subbarTitle, setSubbarTitle] = useState({ label: '', icon: null });

    useEffect(() => {
        setDrawer(false);
    }, [location])

    useEffect(() => {
        switch (location.pathname) {
            case '/overview':
                setSubbarTitle({ label: 'Algemeen overzicht', icon: <List color="primary" fontSize="small" /> })
                break;
            case '/admin':
                setSubbarTitle({ label: 'Adminstratie', icon: <Security color="primary" fontSize="small" /> })
                 break;
            case '/client-list':
                setSubbarTitle({ label: 'Cliëntenoverzicht', icon: <People color="primary" fontSize="small" /> })
                break;
            case '/dossier-list':
                setSubbarTitle({ label: 'Dossieroverzicht', icon: <Assignment color="primary" fontSize="small" /> })
                break;
            case '/create-dossier':
                setSubbarTitle({ label: 'Nieuw dossier', icon: <AddOutlined color="primary" fontSize="small" /> })
                break;
            default:
                break;
        }
    }, [location.pathname]);

    return (
        <Fragment>
            <Box display="flex" flexDirection="column">
                <AppBar color="primary" position="static">
                    <Toolbar 
                        className={classes.toolbar}
                        disableGutters 
                    >
                        <Box display="flex" alignItems="center">
                            <IconButton color="inherit" onClick={() => history.push(OVERVIEW_PATH)}>
                                <Hearing style={{ marginRight: 4 }} />
                                <Typography variant="h5">
                                    Dicero
                                </Typography>
                            </IconButton>
                        </Box>
                        <IconButton color="inherit" onClick={() => setDrawer(true)}>
                            <Menu />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Toolbar className={classes.subbar} >
                    {subbarTitle.icon}
                    <Typography color="primary" style={{ marginLeft: 8}}>
                        {subbarTitle.label}
                    </Typography>
                </Toolbar>
            </Box>

            {userState && ( 
                <Drawer
                    isOpen={drawer}
                    handleClose={() => setDrawer(false)}
                />
            )}
        </Fragment>
    );
};

export default Topbar;
