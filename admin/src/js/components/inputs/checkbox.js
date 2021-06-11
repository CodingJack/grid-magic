/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  func,
  bool,
  string,
} from '../../utils/prop-types';

const CheckBox = ( {
  namespace = '', 
  id = '', 
  label = '', 
  extraClass = '',
  group = '',
  radio = false,
  checked = false,
  onChange,
} ) => {
  let className = `${ namespace }-checkbox`;
  className = ! extraClass ? className : `${ className } { extraClass }`;
  
  const name = ! radio ? null : group;
  const type = ! radio ? 'checkbox' : 'radio';

  return (
    <span className={ className }>
      <label htmlFor={ `${ namespace }-checkbox-${ id }` }>{ label }</label>
      <input 
        id={ `${ namespace }-checkbox-${ id }` }
        type={ type }
        name={ name }
        checked={ checked }
        onChange={ () => onChange( ! checked, id ) }
      />
    </span>
  );
}

CheckBox.propTypes = {
  id: string,
  label: string,
  namespace: string,
  extraClass: string,
  checked: bool,
  onChange: func,
};

export default CheckBox;