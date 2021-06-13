/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../icons/icon';

import {
  bool,
  string,
  stringRequired,
} from '../../utils/prop-types';

/*
 * @desc text with an icon in front of it
 * @since 0.1.0
*/
const IconTitle = ( {
  namespace = '',
  text = '', 
  icon = 'star', 
  color = 'red',
  bold = false, 
  uppercase = false,
} ) => {
  const margin = `${ namespace }-pad-left-5`;
  let clas = bold ? `${ margin } ${ namespace }-bold` : margin;
  clas = uppercase ? `${ clas } ${ namespace }-uppercase` : clas;
  
  return (
    <p className={ `${ namespace }-flex-solid ${ namespace }-pad-top-25` }>
      <Icon name={ icon } color={ color } indent={ true } />
      <span className={ clas }>{ text }</span>
    </p>
  );
};

IconTitle.propTypes = {
  namespace: stringRequired,
  text: stringRequired,
  icon: stringRequired,
  color: string,
  bold: bool,
  uppercase: bool,
};

export default IconTitle;