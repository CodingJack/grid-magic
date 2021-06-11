/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import DropDownHeader from './drop-down/drop-down-header';
import DropDownContainer from './drop-down/drop-down-container';
import Wrapper from '../hoc/wrapper';
import Loader from '../loaders/loader';
import ErrorMessage from '../../error/error-message';

import {
  string,
  object,
  arrayRequired,
  funcRequired,
  stringRequired,
} from '../../utils/prop-types';

const {
  useState,
} = React;

const DropDown = ( {
  namespace = '',
  selected = '',
  label = '',
  id = '',
  list = [],
  maxItems = 5,
  itmHeight = 30,
  prefix,
  style,
  ariaLabel,
  selectedIcon,
  extraClass,
  onChange,
} ) => {
  if( ! list.length ) {
    return (
      <ErrorMessage 
        namespace={ namespace } 
        message="DropDown list is empty" 
      />
    );
  }
  const [
    isOpen,
    setOpen,
  ] = useState( false );
  
  const onKeyPress = e => {
    if( e.isComposing || e.keyCode !== 13 ) {
      return;
    }
    setOpen( ! isOpen );
  };
  
  const onSelect = value => {
    onChange( value );
    setOpen( false );
  };
  
  let clas = `${ namespace }-dropdown`;
  clas = ! extraClass ? clas : `${ clas } ${ extraClass }`;
  
  const args = ariaLabel ? { 'aria-label': ariaLabel } : {};
  const styleHeight = { height: `${ containerHeight }px` };
  
  const containerHeight = list.length * itmHeight;
  const maxHeight = Math.min( maxItems, list.length ) * itmHeight;
  
  return (
    <div 
      id={ id }
      className={ clas } 
      { ...args }
    >
      <DropDownHeader 
        namespace={ namespace } 
        prefix={ prefix }
        text={ label } 
        style={ style }
        icon={ selectedIcon }
        isOpen={ isOpen }
        onClick={ () => setOpen( ! isOpen ) }
        onKeyPress={ onKeyPress } 
      />
      { isOpen && (
        <Wrapper
          wrapIt={ containerHeight > maxHeight }
          wrapper={ children => (
            <Loader 
              resolve={ () => import( '../hoc/scrollable' ) }
              containerHeight={ maxHeight }
            >{ children }</Loader>
          ) }
        >
          <DropDownContainer
            namespace={ namespace }
            list={ list }
            selected={ selected }
            ariaLabel="Select a Grid"
            onClick={ onSelect }
            setOpen={ setOpen }
            parentId = { id }
            style={ styleHeight }
          />
        </Wrapper>
      ) }
    </div>
  );
};

DropDown.propTypes = {
  // required
  namespace: stringRequired,
  label: stringRequired,
  list: arrayRequired,
  onChange: funcRequired,
  
  // wildcards
  prefix: string,
  ariaLabel: string,
  selectedIcon: string,
  extraClass: string,
  style: object,
};

export default DropDown;