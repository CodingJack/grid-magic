/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../../components/icons/icon';
import FavIcon from '../../components/icons/fav-icon';
import Button from '../../components/buttons/button';

import {
  GridListContext,
} from '../../context';

import {
  bool,
} from '../../utils/prop-types';

const {
  useContext,
} = React;

/*
 * @desc the legend that describes the overview's grid list
 * @since 4.0.0
*/
const GridListLegend = ( {
  sortIds = false,
  sortNames = false,
  sortFavs = false, 
  sortModified = false,
} ) => {
  const context = useContext( GridListContext );
  
  const {
    namespace = '', 
    bulkDeleteActive,
    bulkDeleteSelected,
    bulkDeleteSelectAll,
    gridAction,
  } = context;
  
  const onSort = ( e, action = '' ) => {
    e.preventDefault();
    e.stopPropagation();
    gridAction( { action } );
  };
  
  const gridCellClass = `${ namespace }-grid-list-cell`;
  const bulkDeleteSlug = `${ namespace }-bulk-delete-select-all`;
  const bulkDeleteClass = ! bulkDeleteActive ? `${ bulkDeleteSlug }` : `${ bulkDeleteSlug } ${ bulkDeleteSlug }-visible`;
  
  return (
    <div className={ `${ namespace }-grid-list-row ${ namespace }-grid-list-legend` }>
      <span className={ `${ namespace }-grid-list-fav ${ namespace }-grid-list-cell-box` }>
        <FavIcon 
          namespace={ namespace } 
          selected={ sortFavs }
          action="sort_favorites"
          onClick={ gridAction }
        />
      </span>
      <a 
        className={ `${ gridCellClass }-box ${ gridCellClass }-id` }
        href="#"
        onClick={ e => onSort( e, 'sort_ids' ) }
      >
        <span>ID</span>
        <Icon name={ ! sortIds ? 'arrow_up' : 'arrow_down' } color="black" />
      </a>
      <a 
        className={ `${ gridCellClass }-short ${ gridCellClass }-collapse-short` } 
        href="#"
        onClick={ e => onSort( e, 'sort_names' ) }
      >
        <span>Name</span>
        <Icon name={ ! sortNames ? 'arrow_up' : 'arrow_down' } color="black" />
      </a>
      <span className={ `${ gridCellClass }-mid ${ gridCellClass }-collapse-short ${ namespace }-hide-tablet` }>Alias/Shortcode</span>
      <span className={ `${ gridCellClass }-long ${ gridCellClass }-collapse-long` }>
        <span className={ `${ namespace }-flex ${ namespace }-bulk-delete-container` }>
          <span>Actions</span>
          <span className={ bulkDeleteClass }>
          { bulkDeleteActive && (
            <Button
              text="Select All"
              id={ `${ namespace }-grid-list-bulk-delete` }
              color={ ! bulkDeleteSelected ? 'purple' : 'red' }
              namespace={ namespace }
              checked={ bulkDeleteSelected }
              onChange={ bulkDeleteSelectAll }
              extraClass={ `${ namespace }-flex-solid ${ namespace }-flex-center ${ namespace }-grid-list-btn ${ namespace }-grid-list-btn-delete` }
            />
          ) }
          </span>
        </span>
      </span>
      <span className={ `${ gridCellClass }-short ${ namespace }-hide-notebook` }>Settings</span>
      <a 
        className={ `${ gridCellClass }-mid ${ namespace }-hide-notebook` }
        href="#"
        onClick={ e => onSort( e, 'sort_modified' ) }
      >
        <span>Modified</span>
        <Icon name={ ! sortModified ? 'arrow_up' : 'arrow_down' } color="black" />
      </a>
    </div>
  );
};

GridListLegend.propTypes = {
  sortFavs: bool,
  sortNames: bool,
  sortIds: bool,
  sortModified: bool,
};


export default GridListLegend;