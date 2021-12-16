/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
 import InputTextWithState from '../../components/inputs/input-text/input-text-with-state';

const RangeControl = ( {
  namespace = '', 
  type= '', 
  value,
  callback,
  extraClass = '',
} ) => {
  let className = `${ namespace }-range-control`;
  className = ! extraClass ? className : `${ className } { extraClass }`;

  return (
    <span className={ className }>
      <label htmlFor={ `${ namespace }-range-control-${ type }` }>{ type.toUpperCase() }</label>
      <InputTextWithState
        namespace={ namespace }
        initialValue={ value.toString() }
        value={ value.toString() }
        ariaLabel={ type.toUpperCase() }
        extraClass={ `${ namespace }-pad-right-10` }
        updateOnChange={ true }
        onChange={ val => {
          callback( type, val );
        } }
      />
      <input 
        id={ `${ namespace }-range-control-${ type }` }
        type="range"
        min="0"
        max="12"
        value={ parseInt( value, 10 ) }
        onChange={ e => {
          callback( type, e.target.value );
        } }
      />
    </span>
  );
}

export default RangeControl;