/**
 * External dependencies.
 */
 import React from 'react';

/**
 * Internal dependencies.
 */
import InputTextWidthState from './input-text/input-text-with-state'
import { 
  toPropName,
} from '../../utils';

const SettingsInput = ( {
  namespace = '',
  type = 'text', 
  prop = 'name', 
  propName = '',
  initialValue = '',
  updateOnChange = false,
  onChange,
} ) => {
  const title = propName || toPropName( prop );

  return (
    <div className={ `${ namespace }-settings-input ${ namespace }-flex` }>
      { type === 'text' && (
        <>
          <span>{ title }</span>
          <InputTextWidthState 
            namespace={ namespace }
            extraClass={ `${ namespace }-input-setting` }
            ariaLabel={ title }
            initialValue={ initialValue }
            updateOnChange={ updateOnChange }
            onChange={ val => onChange( prop, val ) }
          />
        </>
      ) }
    </div>
  );
};

export default SettingsInput;