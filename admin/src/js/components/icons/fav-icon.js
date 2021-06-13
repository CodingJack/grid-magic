/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from './icon';

import {
  bool,
  string,
  funcRequired,
  stringRequired,
} from '../../utils/prop-types';

/*
 * @desc a "save favorite" icon button
 * @since 0.1.0
*/
const FavIcon = ( { 
  onClick,
  gridId = '',
  namespace = '',
  extraClass = '', 
  color = 'purple', 
  selected = false,
  action = 'toggle_favorite',
} ) => {
  const clas = extraClass ? ` ${ extraClass }` : '';
  const iconName = ! selected ? 'blank_star' : 'star';

  const iconClick = e => {
    e.stopPropagation();
    e.preventDefault();
    onClick( { action, gridId, data: ! selected } );
  };
  
  return (
    <a href="#" onClick={ iconClick } className={ `${ namespace }-icon-btn ${ namespace }-fav-icon${ clas }` }>
      <Icon name={ iconName } color={ color } />
    </a>
  );
};

FavIcon.propTypes = {
  namespace: stringRequired,
  onClick: funcRequired,
  gridId: string,
  color: string,
  action: string,
  extraClass: string,
  selected: bool,
};

export default FavIcon;