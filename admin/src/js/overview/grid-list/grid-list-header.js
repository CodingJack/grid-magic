/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Select from '../../components/selects/select';
import InputTextWithState from '../../components/inputs/input-text/input-text-with-state';
import Button from '../../components/buttons/button';
import __ from '../../utils/translate';

import {
  numberRequired,
} from '../../utils/prop-types';

import {
  GridListContext,
} from '../../context';

const {
  useContext,
} = React;

const selectList = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: 'All', value: -1 },
];


/*
 * @desc the grid list header with its sorting options
 * @since 4.0.0
*/
const GridListHeader = ( {
  gridLength = 0, 
  gridTotal = 0, 
  max = 25,
} ) => {
  const context = useContext( GridListContext );
  
  const {
    namespace = '', 
    initialValue = '', 
    focusInput = false,
    clearSearch = false,
    bulkDeleteItems = [],
    bulkDeleteActive,
    toggleBulkDelete,
    updateState,
    searchGrids,
    gridAction,
    setMax, 
  } = context;
  
  const disabled = bulkDeleteActive && ! bulkDeleteItems.length;
  let onDelete;
  
  if( ! bulkDeleteActive ) {
    onDelete = () => toggleBulkDelete( true );
  } else if( bulkDeleteItems.length ) {
    onDelete = () => {
      gridAction( { 
        action: 'bulk_delete', 
        data: [ ...bulkDeleteItems ], 
        callback: () => updateState( { 
          bulkDeleteItems: [], 
          bulkDeleteActive: false,
        } ),
      } )
    };
  }
  
  return (
    <div className={ `${ namespace }-grid-list-header ${ namespace }-flex-solid` }>
      <h3>{ __( 'overview.grid_list.title', 'All Grid Magics' ) }</h3>
      <div className={ `${ namespace }-flex-solid` }>
        <InputTextWithState 
          placeholder="Search Listed Grids"
          ariaLabel="Search Listed Grids"
          namespace={ namespace }
          focusInput={ focusInput }
          clearSearch={ clearSearch }
          initialValue={ initialValue }
          onChange={ value => searchGrids( value ) }
        />
        { gridTotal > 5 && (
          <Select
            namespace={ namespace }
            list={ selectList }
            value={ max }
            ariaLabel="Grid View Total"
            onChange={ setMax }
            extraClass={ `${ namespace }-pad-left-10` }
          />
        ) }
        { gridLength > 1 && (
          <>
            <Button 
              color="red" 
              icon="trash" 
              disabled={ disabled }
              namespace={ namespace }
              onClick={ onDelete } 
              extraClass={ `${ namespace }-bulk-delete ${ namespace }-pad-left-10` }
            />
            { bulkDeleteActive && (
              <Button 
                color="purple" 
                icon="close" 
                namespace={ namespace }
                onClick={ () => toggleBulkDelete() } 
                extraClass={ `${ namespace }-bulk-delete ${ namespace }-pad-left-10` }
              />
            ) }
          </>
        ) }
      </div>
    </div>
  );
};

GridListHeader.propTypes = {
  gridLength: numberRequired,
  gridTotal: numberRequired,
  max: numberRequired,
};

export default GridListHeader;