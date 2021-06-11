/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../../icons/icon';
import ErrorMessage from '../../../error/error-message';

import {
  bool,
  func,
  string,
  object,
  stringRequired,
} from '../../../utils/prop-types';

const DropDownHeader = ( {
  namespace = '', 
  prefix = '', 
  text = '', 
  style, 
  icon, 
  isOpen, 
  onClick,
  onKeyPress,
} ) => {
  if( ! text && ! icon ) {
    return (
      <ErrorMessage 
        namespace={ namespace } 
        message="DropDownHeader component requires text and an icon" 
      />
    );
  }
  const clas = `${ namespace }-dropdown`;
  const arrow = ! isOpen ? 'arrow_down' : 'arrow_up';
  const args = { 'aria-label': 'Grid List' };
  
  return (
    <div 
      role="button"
      className={ `${ clas }-header ${ namespace }-flex-solid` }
      style={ style }
      onClick={ onClick }
      onKeyPress={ onKeyPress }
      tabIndex="0"
      { ...args }
    >
      <span className={ `${ namespace }-flex-solid` }>
        { icon && <Icon name={ icon } color="black" /> }
        { prefix && <span className={ `${ clas }-prefix` }>{ prefix }</span> }
        { text && text }
      </span>
      <Icon name={ arrow } />
    </div>
  );
};

DropDownHeader.propTypes = {
  // required 
  namespace: stringRequired,

  // wildcards
  style: object,
  icon: string,
  isOpen: bool,
  text: string,
  prefix: string,
  onClick: func,
  onKeyPress: func,
};

export default DropDownHeader;