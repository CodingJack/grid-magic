/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import GridSettingsMenu from './grid-settings/grid-settings-menu';

import {
  AdminContext,
} from '../context';

const {
  useContext,
} = React;

const GridSettings = () => {
  const context = useContext( AdminContext );
  const {
    namespace = '',
    settingsPage = 'naming',
    updateAdmin,
  } = context;

  return (
    <>
      <GridSettingsMenu 
        namespace={ namespace } 
        selected={ settingsPage} 
        updateAdmin={ updateAdmin }
      />
    </>
  );
};

export default GridSettings;