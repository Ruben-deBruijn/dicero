import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Box, Typography } from '@material-ui/core';

const ListPair = ({ primary, secondary, dense }) => (
    <Box 
        display="flex" 
        justifyContent="space-between" 
        width="100%"
        alignItems="center"
        py={dense ? 0.5 : 1}
     >
        <Typography variant="body2" color="primary">
            {primary}
        </Typography>
        <Typography variant="body2">
            {secondary}
        </Typography>
    </Box>
);

ListPair.propTypes = {
    primary: PropTypes.string,
    secondary: PropTypes.string,
    dense: PropTypes.bool,
};

export default ListPair;