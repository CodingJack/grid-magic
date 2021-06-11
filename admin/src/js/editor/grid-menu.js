/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import DropDown from '../components/selects/drop-down';

import {
  EditorContext,
} from '../context';

const {
  useContext,
} = React;

const itmHeight = 38;

const GridMenu = () => {
  const context = useContext( EditorContext );
  const {
    namespace = '',
    curGridName = '',
    curGridId = '',
    list = [],
    gridAction,
  } = context;

  return (
    <DropDown
      namespace={ namespace }
      id={ `${ namespace }-grid-menu` }
      list={ list }
      selected={ curGridId }
      label={ curGridName }
      itmHeight={ itmHeight }
      selectedIcon="grid"
      ariaLabel="Select Grid"
      onChange={ gridId => gridAction( { gridId, action: 'edit_grid' } ) }
    />
  );
};

export default GridMenu;