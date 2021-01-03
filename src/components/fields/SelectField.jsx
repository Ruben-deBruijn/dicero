import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Core
import { 
    MenuItem,
    Select as MuiSelectField,
} from '@material-ui/core';

// Styles
import { useFieldStyles } from './field.style';

const SelectField = props => {
    const {
        disabled,
        onChange,
        errors,
        label,
        value,
        required,
        items,
        ...rest
      } = props;

    const classes = useFieldStyles();
    // const errorText = errors && errors[id];

    return (
        <MuiSelectField
            style={{ marginBottom: 16 }}
            {...rest}
            placeholder={label}
            value={value ||  ''}
            required={required}
            disabled={disabled}
            onChange={onChange || ((event) => onChange(event.target.value))}
            // error={!!errorText}
            variant="outlined" 
            color="primary"
            displayEmpty
        >
            <MenuItem value="" disabled>
                Selecteer een {label.toLowerCase()}
            </MenuItem>
            {items.map(item => (
                <MenuItem key={item.id || item} value={item.id || item}>
                    {`${item.first_name} ${item.last_name}` ||  item}
                </MenuItem>
            ))}
        </MuiSelectField>
    )
};

SelectField.propTypes = {
    disabled: PropTypes.bool,
    // errors: PropTypes.object,
    label: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    items: PropTypes.oneOfType([
        PropTypes.array.isRequired,
        PropTypes.object.isRequired,
    ])
};

export default SelectField;