import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Icons
import { FolderOutlined, Menu } from '@material-ui/icons';

// Core
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import Drawer from '../Drawer/Drawer';

// Routing
import { OVERVIEW_PATH } from '../../../routes/paths';

// Styles
import { useTopbarStyles } from './Topbar.style';

// Assets
import dicero_logo from '../../../assets/dicero.svg';

const Topbar = () => {
    const classes = useTopbarStyles();
    const history= useHistory();

    const [drawer, setDrawer] = useState(false);

    return (
        <Fragment>
            <Box display="flex" flexDirection="column">
                <AppBar color="primary" position="static">
                    <Toolbar 
                        className={classes.toolbar}
                        disableGutters 
                    >
                        <img src={dicero_logo} height="auto" width={120} className={classes.logo} alt="logo" onClick={() => history.push(OVERVIEW_PATH)} />
                        <IconButton color="inherit" onClick={() => setDrawer(true)}>
                            <Menu />
                        </IconButton>
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
