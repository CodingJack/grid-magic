/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import RangeControl from '../../components/inputs/range-control';

const ColsRowsControls = ( { 
  namespace = '',
  columns = 4,
  rows = 3,
  callback,
} ) => {
  return (
    <div className={ `${ namespace }-grid-preview-cols-rows` }>
      <RangeControl 
        namespace={ namespace }
        type="columns" 
        value={ columns } 
        callback={ callback } 
      />
      <RangeControl 
        namespace={ namespace }
        type="rows" 
        value={ rows } 
        callback={ callback } 
      />
    </div>
  );
};

export default ColsRowsControls;