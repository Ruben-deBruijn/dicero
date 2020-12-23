import React, { Fragment, useState } from 'react';

// Core
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import { FolderOutlined, Menu, Person } from '@material-ui/icons';

// Styles
import { useTopbarStyles } from './Topbar.style';

// Assets
import dicero_logo from '../../../assets/dicero.svg';
import Drawer from '../Drawer/Drawer';

const Topbar = () => {
    const classes = useTopbarStyles();
    const [drawer, setDrawer] = useState(false);

    return (
        <Fragment>
            <Box display="flex" flexDirection="column">
                <AppBar color="primary" position="static">
                    <Toolbar 
                        className={classes.toolbar}
                        disableGutters 
                    >
                        <img src={dicero_logo} height="auto" width={120} className="App-logo" alt="logo" />
                        <div>
                            <IconButton color="inherit">
                                <Person />
                            </IconButton>
                            <IconButton color="inherit" onClick={() => setDrawer(true)}>
                                <Menu />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                <Toolbar className={classes.subbar} >
                    <FolderOutlined color="primary" style={{ marginRight: 8}} />
                    <Typography color="primary">
                        Overzicht
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
