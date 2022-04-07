import React from 'react';

export default function RadioButton(props) {
    const onChangeCategory = () => props.onChange();
    const { active } = props;
    
    return (
        <div onClick={() => onChangeCategory()} style={{fontSize:18}}>
         
        </div>
    );
}
