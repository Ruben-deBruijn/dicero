import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Icons
import { AddOutlined, CalendarToday, FolderOutlined, Security, Menu, List, Hearing } from '@material-ui/icons';

// Core
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import Drawer from '../Drawer/Drawer';

// Routing
import { OVERVIEW_PATH } from '../../../routes/paths';

// Styles
import { useTopbarStyles } from './Topbar.style';

// Assets
import dicero_logo from '../../../assets/dicero_2.png';

const Topbar = () => {
    const classes = useTopbarStyles();
    const history= useHistory();
    const location = useLocation();

    const [drawer, setDrawer] = useState(false);
    const [subbarTitle, setSubbarTitle] = useState({ label: '', icon: null });

    useEffect(() => {
        setDrawer(false);
    }, [location])

    useEffect(() => {
        switch (location.pathname) {
            case '/overview':
                setSubbarTitle({ label: 'Overzicht', icon: <List color="primary" fontSize="small" /> })
                break;
            case '/admin':
                setSubbarTitle({ label: 'Adminstratie', icon: <Security color="primary" fontSize="small" /> })
                 break;
            case '/client-list':
                setSubbarTitle({ label: 'Cliëntenoverzicht', icon: <FolderOutlined color="primary" fontSize="small" /> })
                break;
            case '/dossier-list':
                setSubbarTitle({ label: 'Dossieroverzicht', icon: <CalendarToday color="primary" fontSize="small" /> })
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

            <Drawer
                isOpen={drawer}
                handleClose={() => setDrawer(false)}
            />
        </Fragment>
    );
};

export default Topbar;
