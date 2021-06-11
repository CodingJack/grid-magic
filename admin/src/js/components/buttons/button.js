/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../icons/icon';
import ErrorMessage from '../../error/error-message';
import CheckBox from '../inputs/checkbox';

import {
  trueFalse,
} from '../../utils'; 

import {
  bool,
  string,
  func,
  number,
  oneOfType,
} from '../../utils/prop-types';

/*
 * @desc a button with options
 * @since 4.0.0
*/
const Button = ( { 
  id = '',
  text = '',
  icon = '',
  label = '',
  color = '', 
  textColor = '',
  namespace = '', 
  extraClass = '', 
  role = 'button',
  disabled = false,
  collapsable = false,
  large = false,
  round = false,
  style,
  onClick,
  onChange,
  checked,
} ) => {
  if( ! text && ! icon ) {
    return (
      <ErrorMessage 
        namespace={ namespace } 
        message="A Button Component requires text or an icon" 
      />
    );
  }
  let clas = ! large ? '' : `${ namespace }-btn-large`;
  if( icon && ! text ) {
    const space = ! clas ? '' : ' '; 
    clas = `${ clas }${ space }${ namespace }-btn-icon-only`;
  } else if( ! icon && text ) {
    const space = ! clas ? '' : ' '; 
    clas = `${ clas }${ space }${ namespace }-btn-text-only`;
  }
  if( round ) {
    const space = ! clas ? '' : ' '; 
    clas = `${ clas }${ space }${ namespace }-btn-round`;
  }
  if( onChange ) {
    const space = ! clas ? '' : ' '; 
    clas = `${ clas }${ space }${ namespace }-btn-with-checkbox`;
  }
  if( extraClass ) {
    const space = ! clas ? '' : ' '; 
    clas = `${ clas }${ space }${ extraClass }`;
  }
  if( collapsable ) {
    const space = ! clas ? '' : ' '; 
    clas = `${ clas }${ space }${ namespace }-btn-collapsable`;
  }
  const isChecked = trueFalse( checked ) ? true : false;
  const colorClass = color ? `${ namespace }-${ color } ` : '';
  const textStyle = ! textColor ? null : { color: textColor };
  
  return (
    <button 
      className={ `${ namespace }-btn ${ colorClass }${ clas }` } 
      role={ role }
      onClick={ onClick }
      disabled={ disabled }
      tabIndex="0"
    >
      { icon && <Icon name={ icon } style={ style } /> }
      { text && <span style={ textStyle }>{ text }</span> }
      { onChange && (
        <CheckBox 
          id={ id } 
          namespace={ namespace }
          label={ label }
          checked={ isChecked }
          onChange={ onChange }
        /> 
      ) }
    </button>
  );
};

Button.propTypes = {
  namespace: string,
  id: string,
  icon: string,
  label: string,
  large: bool,
  disabled: bool,
  collapsable: bool,
  checked: oneOfType( [ string, bool, number ] ),
  round: bool,
  text: string,
  color: string,
  extraClass: string,
  onClick: func,
  onChange: func,
};

export default Button;