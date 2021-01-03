import React from 'react';
import PropTypes from 'prop-types';

// Core 
import { Box } from '@material-ui/core';

const Main = ({ children }) => (

    <Box maxWidth={1280} margin="auto" width="100%" height="calc(100% - 112px)" p={2} overflow="auto">
      {children}
    </Box>
);

Main.propTypes = {
    children: PropTypes.any,
};

export default Main;
