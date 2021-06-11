/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Button from './button';

import {
  bool,
  string,
  funcRequired,
  stringRequired,
} from '../../utils/prop-types';

/*
 * @desc a tab button for the admin main menu
 * @todo convert the menu-admin-tab className to an option
 * @since 4.0.0
*/
const Tab = ( {
  namespace = '',
  text = '',
  icon = '',
  section = 'overview',
  selected = false,
  onClick: callback,
} ) => {
  const color = ! selected ? 'white' : 'purple';
  const onClick = () => {
    if( ! selected ) {
      callback( section );
    }
  }
  
  let clas = `${ namespace }-menu-tab`;
  clas = ! selected ? clas : `${ clas } ${ clas }-selected`;
  
  return (
    <Button 
      role="tab"
      namespace={ namespace }
      text={ text }
      icon={ icon }
      color={ color }
      extraClass={ clas }
      onClick={ onClick }
    />
  );
};

Tab.propTypes = {
  namespace: stringRequired,
  onClick: funcRequired,
  section: stringRequired,
  icon: string,
  selected: bool,
};

export default Tab;