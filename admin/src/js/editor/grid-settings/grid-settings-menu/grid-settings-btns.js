/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Tab from '../../../components/buttons/tab';

import {
  editorSections,
} from '../../../data/menus';

import {
  funcRequired,
  stringRequired,
} from '../../../utils/prop-types';

const GridSettingsBtns = ( { namespace = '', selected = 'settings', callback } ) => {
  return (
    <div 
      className={ `${ namespace }-menu ${ namespace }-menu-settings ${ namespace }-flex-solid` }
       { ...{ 'role': 'tablist' } }
    >
    {
      editorSections.map( ( btn, i ) => {
        const { icon, section } = btn;
        const color = section !== selected ? 'light-gray' : 'purple';
        
        return (
          <Tab 
            key={ `${ namespace }-menu-tab-${ section }-${ i } }` }
            namespace={ namespace }
            icon={ icon }
            color={ color }
            section={ section }
            selected={ section === selected }
            onClick={ section => callback( section ) }
          />
        );
      } )
    }
    </div>
  );
};

GridSettingsBtns.propTypes = {
  // required 
  namespace: stringRequired,
  callback: funcRequired,
  selected: stringRequired,
};

export default GridSettingsBtns;