import React from 'react';
import PropTypes from 'prop-types';

// Core 
import { Box } from '@material-ui/core';

const Main = ({ children }) => (

    <Box maxWidth={1280} m={2} mb={9} height="calc(100% - 112px)" p={3} overflow="auto" bgcolor="#fff" borderRadius={4}>
      {children}
    </Box>
);

Main.propTypes = {
    children: PropTypes.any,
};

export default Main;
