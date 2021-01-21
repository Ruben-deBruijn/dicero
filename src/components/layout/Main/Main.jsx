import React from 'react';
import PropTypes from 'prop-types';

// Core 
import { Box } from '@material-ui/core';

const Main = ({ children, transparent }) => (

    <Box maxWidth={1280} m={2} mb={9} maxHeight="calc(100% - 112px)" p={transparent ? 1 : 3} overflow="auto" bgcolor={transparent ? 'transparent' : '#fff'} borderRadius={4}>
      {children}
    </Box>
);

Main.propTypes = {
    children: PropTypes.any,
    transparent: PropTypes.bool,
};

export default Main;
