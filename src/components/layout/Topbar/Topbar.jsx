import React from 'react';

// Core
import { AppBar, Box, IconButton, Toolbar, Typography } from '@material-ui/core';
import { FolderOutlined, Menu, Person } from '@material-ui/icons';

// Styles
import { useTopbarStyles } from './Topbar.style';

// Assets
import dicero_logo from '../../../assets/dicero.svg';

const Topbar = () => {
    const classes = useTopbarStyles();

    return (
        <Box display="flex" flexDirection="column">
            <AppBar color="primary" position="static">
                <Toolbar 
                component={Box} 
                disableGutters 
                display="flex" 
                justifyContent="space-between"
                >
                    <img src={dicero_logo} height="auto" width={120} className="App-logo" alt="logo" />
                    <div>
                        <IconButton color="secondary">
                            <Person />
                        </IconButton>
                        <IconButton color="secondary">
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
    );
};

export default Topbar;
