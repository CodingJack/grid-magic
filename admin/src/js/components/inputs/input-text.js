/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  bool,
  string,
  funcRequired,
  stringRequired,
} from '../../utils/prop-types';

/*
 * @desc input text element with options
 * @since 4.0.0
*/
const InputText = ( {
  onChange,
  namespace = '',
  value = '',
  ariaLabel = '',
  extraClass = '',
  placeholder = '',
  readonly = false,
} ) => {
  const dataAttrs = ariaLabel ? { 'aria-labelledby': ariaLabel } : {};
  const clas = extraClass ? ` ${ extraClass }` : '';
  
  return (
    <input 
      type="text" 
      className={ `${ namespace }-input-text${ clas }` } 
      value={ value } 
      readOnly={ readonly }
      placeholder={ placeholder }
      onChange={ onChange }
      tabIndex="0"
      { ...dataAttrs }
    />
  );
};

InputText.propTypes = {
  onChange: funcRequired,
  namespace: stringRequired,
  value: stringRequired,
  ariaLabel: stringRequired,
  extraClass: string,
  placeholder: string,
  readonly: bool,
};

export default InputText;