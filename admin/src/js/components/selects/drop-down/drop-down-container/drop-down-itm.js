/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  funcRequired,
  stringRequired,
} from '../../../../utils/prop-types';

const DropDownItm = ( {
  namespace = '',
  label = '',
  value = '',
  selected = false, 
  onClick: callback,
} ) => {
  let clas = `${ namespace }-dropdown-itm`;
  clas = value !== selected ? clas : `${ clas } ${ clas }-selected`;
  clas = `${ clas } ${ namespace }-flex-solid`;
  
  const onKeyPress = e => {
    if( e.isComposing || e.keyCode !== 13 ) {
      return;
    }
    callback( value );
  };

  return (
    <li 
      role="option"
      className={ clas }
      onClick={ () => callback( value ) }
      onKeyPress={ onKeyPress }
      aria-selected={ value === selected }
    >{ label }</li>
  );
};

DropDownItm.propTypes = {
  // required
  namespace: stringRequired,
  label: stringRequired,
  value: stringRequired,
  onClick: funcRequired,
  selected: stringRequired,
};

export default DropDownItm;