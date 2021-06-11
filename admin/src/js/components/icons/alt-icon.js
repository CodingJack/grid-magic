/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Coffee from './alt-icons/coffee';
import BugFixes from './alt-icons/bug-fixes';
import Changes from './alt-icons/changes';
import WPLogo from './alt-icons/wp-logo';
import Dashboard from './alt-icons/dashboard';
import Layout from './alt-icons/layout';
import EditGrid from './alt-icons/edit-grid';
import Source from './alt-icons/source';

import {
  camelCase,
} from '../../utils';

import {
  object,
  stringRequired,
} from '../../utils/prop-types';

const defValue = 'Coffee';

/*
 * @desc handle custom SVG components
 * @since 4.0.0
*/
const AltIcons = {
  Coffee,
  BugFixes,
  Changes,
  Layout,
  EditGrid,
  Source,
  Dashboard,
  Wplogo: WPLogo,
};

const AltIcon = ( { name = '', style = {} } ) => {
  const title = camelCase( name, true );
  const Component = AltIcons[ title ] ? AltIcons[ title ] : AltIcons[ defValue ];
  
  return <Component style={ style } />;
};

AltIcon.propTypes = {
  name: stringRequired,
  style: object,
};

export default AltIcon;