/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Button from '../../../../components/buttons/button';

import {
  GridListContext,
} from '../../../../context';

import {
  string,
} from '../../../../utils/prop-types';

const {
  useContext,
} = React;

const buttons = [
  {
    icon: 'settings',
    color: 'purple',
    text: 'Edit Grid',
    slug: 'edit_grid',
  },
  {
    icon: 'copy',
    color: 'aqua',
    text: 'Duplicate',
    slug: 'duplicate_grid',
  },
  {
    icon: 'trash',
    color: 'red',
    text: 'Delete',
    slug: 'delete_grid',
  },
];

/*
 * @desc the action buttons for the grids in the overview's grid list
 * @since 4.0.0
*/
const GridListBtns = ( { id = '' } ) => {
  const context = useContext( GridListContext );
  const {
    namespace = '', 
    bulkDeleteActive,
    bulkDeleteItems,
    bulkDeleteSelect,
    gridAction,
  } = context;
  
  return (
    buttons.map( ( btn, i ) => {
      const {
        icon, 
        color, 
        text, 
        slug,
      } = btn;
      
      let clas = `${ namespace }-grid-list-btn`;
      clas = `${ clas } ${ clas }-${ slug.replace( '_grid', '' ) }`;
      clas = `${ namespace }-flex-solid ${ namespace }-flex-center ${ clas }`
      clas = text ? clas : `${ clas } ${ namespace }-hide-smartphone`;
      
      const disabled = bulkDeleteActive && slug !== 'delete_grid';
      const checked = bulkDeleteItems.indexOf( id ) !== -1;
      const key = `${ namespace }-grid-list-btn-${ slug }-${ i }`;
      
      return (
        <Button
          namespace={ namespace }
          key={ key }
          id={ key }
          text={ text }
          icon={ ! bulkDeleteActive || slug !== 'delete_grid' ? icon : null }
          color={ ! bulkDeleteActive ? color : slug !== 'delete_grid' ? color : ! checked ? 'purple' : 'red' }
          extraClass={ clas }
          disabled={ disabled }
          checked={ checked }
          onChange={ ! bulkDeleteActive || slug !== 'delete_grid' ? null : bulkDeleteSelect } 
          onClick={ ! bulkDeleteActive ? () => gridAction( { action: slug, gridId: id } ) : null } 
        />
      );
    } )
  );
};

GridListBtns.propTypes = {
  id: string,
};

export default GridListBtns;