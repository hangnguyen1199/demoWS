import { Switch } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

function SwitchButton(props) {
    const { checked,disabled  } = props;
    const [value, setValue] = useState(false);
    useEffect(() => {
        setValue(checked);
    }, [checked]);
    const handleChange = (e) => {
        setValue(e.target.checked);
        props.onChange(e.target.checked);
    };
    return (
        <div className="switch-button">
            <Switch
                disabled={disabled}
                checked={value}
                onChange={handleChange}
                name="checkedA"
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    );
}
SwitchButton.defaultProps = {
    checked: false,
    disabled :false
};
export default SwitchButton;
