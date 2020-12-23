import React from 'react';
import PropTypes from 'prop-types';

// Core 
import { Box } from '@material-ui/core';

const Main = ({ children }) => (

    <Box width="100%" height="calc(100vh - 112px)" p={2}>
      {children}
    </Box>
);

Main.propTypes = {
    children: PropTypes.any,
};

export default Main;
