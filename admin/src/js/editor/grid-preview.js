/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import GridPreviewItems from './grid-preview/grid-preview-items';

import {
  EditorContext,
} from '../context';

const {
  useContext,
} = React;

// convert to cookie
const lastBreakpoint = 'desktop';

const GridPreview = () => {
  const context = useContext( EditorContext );
  const {
    namespace = '',
    curGrid = {},
  } = context;

  const {
    layout = {},
  } = curGrid;

  const {
    [ lastBreakpoint ]:breakpoint = {},
  } = layout;

  const {
    columns = 4,
    rows = 3,
  } = breakpoint;

  return (
    <GridPreviewItems 
      namespace={ namespace }
      curGrid={ curGrid } 
      columns={ columns } 
      rows={ rows } 
      breakpoint={ lastBreakpoint }
    />
  );
};

export default GridPreview;