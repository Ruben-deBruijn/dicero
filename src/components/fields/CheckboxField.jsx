import React from 'react';
import PropTypes from 'prop-types';

// Core
import { FormControlLabel, Checkbox } from '@material-ui/core';


const CheckboxField = props => {
  const {
    checked,
    onChange,
    onChanged,
    value,
    ...rest
  } = props;

  return (
    <FormControlLabel
      control={(
        <Checkbox
          {...rest}
          size="small"
          color="primary"
          type="checkbox"
          value={!!value || ''}
          checked={!!value}
          onChange={(_, val) => {
            if (onChanged) onChanged(val);
            return onChange(val);
          }}
        />
      )}
    />
  );
};

CheckboxField.propTypes = {
  checked: PropTypes.bool,
  onChanged: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.bool,
};

export default CheckboxField;
