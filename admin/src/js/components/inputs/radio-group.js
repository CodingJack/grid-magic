/**
 * External dependencies.
 */
 import React from 'react';
 
/**
* Internal dependencies.
*/
import CheckBox from './checkbox';
import {
   func,
   bool,
   array,
   string,
   stringRequired,
 } from '../../utils/prop-types';
 
const RadioGroup = ( {
  namespace = '',
  prop = '',
  path = '',
  items = [],
  value = '',
  extraClass = '',
  spaceEvenly = false,
  onChange,
} ) => {
  const onSelect = ( checked, val ) => {
    if( checked ) {
      onChange( prop, val, path );
    }
  };
  const spaceBetween = ! spaceEvenly ? ` ${ namespace }-flex-start` : ` ${ namespace }-flex-space-between`;
  const clas = ! extraClass ? '' : ` ${ extraClass }`;
  return (
    <div className={ `${ namespace }-radio-group ${ namespace }-flex${ spaceBetween }${ clas }` }>
    { 
      items.map( ( itm, index ) => {
        const {
          label = '',
          slug = '',
        } = itm;
        const id = `${ namespace }-${ prop }-${ label }-${ index }`;

        return (
          <CheckBox 
            key={ id }
            id={ id }
            namespace={ namespace } 
            label={ label }
            group={ path } 
            radio={ true } 
            value={ value }
            checked={ slug === value } 
            onChange={ checked => onSelect( checked, slug ) } 
          />
        );
      } )
    }
    </div>
  );
}

RadioGroup.propTypes = {
  prop: stringRequired,
  value: stringRequired,
  path: string,
  namespace: string,
  extraClass: string,
  items: array,
  spaceEvenly: bool,
  onChange: func,
};

export default RadioGroup;