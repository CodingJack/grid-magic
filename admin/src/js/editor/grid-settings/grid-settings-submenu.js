/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Button from '../../components/buttons/button';
import colors from '../../data/colors';

import {
  EditorContext,
} from '../../context';

import {
  editorMenu,
} from '../../data/menus';

import {
  capitalize,
} from '../../utils';

const {
  useContext,
} = React;

const GridSettingsSubMenu = ( { settingsPage } ) => {
  const context = useContext( EditorContext );
  const {
    namespace = '',
    subMenu = 0,
    updateSubMenu,
  } = context;

  const {
    [ settingsPage ]:theMenu,
  } = editorMenu;

  return Object.keys( theMenu ).map( ( slug, index ) => {
    const menu = theMenu[ slug ];
    const color = subMenu !== index ? 'black' : 'purple';
    const fill = colors[ color ];
    const { icon } = menu;

    return (
      <Button 
        key={ `${ namespace }-${ slug }-{ index }` }
        extraClass={ `${ namespace }-btn-subtext` }
        namespace={ namespace }
        icon={ icon } 
        color="transparent"
        style={ { fill } }
        text={ capitalize( slug ) }
        textColor={ fill }
        onClick={ () => updateSubMenu( index, slug ) }
      />
    );
  } );
};

export default GridSettingsSubMenu;