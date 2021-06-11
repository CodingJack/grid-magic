/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import GridSettingsBtns from './grid-settings-menu/grid-settings-btns';

import {
  AdminContext,
} from '../../context';

import {
  string,
  funcRequired,
  stringRequired,
} from '../../utils/prop-types';

const {
  useContext,
} = React;

const GridSettingsMenu = () => {
  const context = useContext( AdminContext );
  const {
    namespace = '',
    settingsPage = 'settings',
    updateAdmin,
  } = context;
  
  return (
    <>
      <GridSettingsBtns 
        namespace={ namespace } 
        selected={ settingsPage } 
        callback={ settingsPage => updateAdmin( { settingsPage } ) }
      />
    </>
  );
};

GridSettingsMenu.propTypes = {
  // required 
  namespace: stringRequired,
  updateAdmin: funcRequired,
  
  // wildcards
  settingsPage: string,
};

export default GridSettingsMenu;