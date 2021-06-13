/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import ErrorMessage from '../../error/error-message';

import {
  bool,
  func,
  shape,
  number,
  string,
  arrayOf,
  oneOfType,
  funcRequired,
  stringRequired,
} from '../../utils/prop-types';

/*
 * @desc generic select element
 * @since 0.1.0
*/
const Select = ( {
  namespace = '',
  value = '',
  ariaLabel = '',
  extraClass = '',
  list = [],
  onChange,
  onFocus,
  onBlur,
} ) => {
  if( ! list.length ) {
    return (
      <ErrorMessage 
        namespace={ namespace } 
        message="Select Component list is empty" 
      />
    );
  }
  const dataAttrs = ariaLabel ? { 'aria-labelledby': ariaLabel } : {};
  const clas = extraClass ? ` ${ extraClass }` : '';
  
  return (
    <select 
      className={ `${ namespace }-select${ clas }` } 
      value={ value } 
      onChange={ e => onChange( e.target.value ) } 
      onFocus={ onFocus }
      onBlur={ onBlur }
      { ...dataAttrs }
    >
    {
      list.map( ( obj, i ) => {
        const {
          label = '',
          value: itmVal = '',
          disabled,
        } = obj;
        
        return (
          <option 
            key={ `${ namespace}-option-${ String( itmVal ) }-${ i } }` } 
            value={ itmVal } 
            disabled={ disabled }
          >{ label }</option>
        );
      } )
    }
    </select>
  );
};


Select.propTypes = {
  // required
  namespace: stringRequired,
  ariaLabel: stringRequired,
  onChange: funcRequired,
  list: arrayOf(
    shape( {
      label: string,
      value: oneOfType( [ string, number ] ),
      disabled: bool,
    } )
  ).isRequired,
  
  // wildcards
  extraClass: string,
  onFocus: func,
  onBlur: func,
};

export default Select;