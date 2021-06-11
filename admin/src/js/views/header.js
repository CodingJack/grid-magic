/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Button from '../components/buttons/button';
import AltIcon from '../components/icons/alt-icon';

import { 
  capitalize,
} from '../utils';

import {
  stringRequired,
} from '../utils/prop-types';

/*
 * @desc the admin's main header
 * @since 4.0.0
*/
const Header = ( { namespace = '', page = 'overview' } ) => {
  const { imgPath = '', adminUrl = '' } = essentialGridV4Data;
  
  return (
    <h2 className={ `${ namespace }-header` }>
      <a className={ `${ namespace }-wplogo ${ namespace }-flex-solid` } href={ adminUrl }>
        <AltIcon name="wplogo" />
      </a>
      <img 
        className={ `${ namespace }-logo ${ namespace }-pad-right-20` } 
        src={ `${ imgPath }logo.png` } 
        alt="logo" 
        width="207" 
        height="34" 
      />
      <span>{ capitalize( page ) }</span>
      <Button 
        namespace={ namespace }
        color="red"
        icon="help"
        text="Help Center"
        extraClass={ `${ namespace }-hide-smartphone` }
        onClick={ () => window.open( 'https://www.themepunch.com/support-center/essential-grid/#documentation' ) }
      />
      <a 
        className={ `${ namespace }-github ${ namespace }-hover ${ namespace }-hide-tablet` } 
        style={ { backgroundImage: `url(${ imgPath }github.png)` } }
        href="https://github.com/themepunch/essential-grid-v4" 
        target="_blank" 
        rel="noreferrer"
      ></a>
    </h2>
  );
};

Header.propTypes = {
  namespace: stringRequired,
  page: stringRequired,
};

export default Header;