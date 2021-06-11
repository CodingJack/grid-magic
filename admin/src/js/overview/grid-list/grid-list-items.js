/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import GridListItem from './grid-list-items/grid-list-item';
import Button from '../../components/buttons/button';

import {
  GridListContext,
} from '../../context';
 
import {
  toSlug,
  isObject,
} from '../../utils';

import {
  array,
  object,
  number,
  bool,
  elementType,
} from '../../utils/prop-types';


const {
  Component,
} = React;

class GridListItems extends Component {
  constructor( props ) {
    super( props );
  }
  
  /*
  componentDidMount() {
    // omit visual list, will be tied into pagination
  }
  */
  
  onUpdateNameAlias = ( id = '', prop = '', value = '' ) => {
    if( ! value ) {
      return false;
    }
    let newValue = String( value ).trim();
    if( prop === 'alias' ) {
      newValue = toSlug( newValue );
      if( ! newValue ) {
        return false;
      }
    }
    const { gridList = {} } = this.props;
    const allValues = Object.keys( gridList ).map( key => gridList[ key ][ prop ] );
    if( allValues.indexOf( newValue ) !== -1 ) {
      return false;
    }
    
    const { updateData } = this.context;
    updateData( {
      gridList: { [ id ]: { [ prop ]: value } },
    } );
    return true;
  };
  
  render() {
    const {
      namespace = '', 
      grids = [], 
      gridList = {},
      gridAction,
      createNewGrid,
      bulkDeleteActive,
    } = this.context;
    
    const { 
      newGrids = [], 
      gridLength = 0,
      pagination = false,
      curPagination = 0,
      max = 25,
      checkBox,
    } = this.props;
    
    const numPages = Math.ceil( gridLength / max );
    const pages = max !== -1 ? Array( numPages ).fill(0) : [0];
    
    const { imgPath = '' } = essentialGridV4Data;
    const gridCellClass = `${ namespace }-grid-list-cell`;
    const bg = { backgroundImage: `url("${ imgPath }gridlistbg.png")` };
    
    return (
      <div className={ `${ namespace }-grid-list-container` }>
        {
          grids.map( ( id, i ) => {
            const gridItm = gridList[ id ];
            if( ! isObject( gridItm ) ) {
              return null;
            }
            const { alias = String( Math.random() * 10000 ) } = gridItm;
            return (
              <GridListItem
                key={ `${ gridCellClass }-${ alias }-${ i }` } 
                id={ id }
                namespace={ namespace } 
                gridItm={ gridItm }
                gridAction={ gridAction }
                checkBox={ checkBox }
                callback={ this.onUpdateNameAlias }
                isNew={ newGrids.indexOf( id ) !== -1 }
              />
            )
          } )
        }
        <div className={ `${ namespace }-grid-list-container-bg` } style={ bg }>
          <div className={ `${ namespace }-flex ${ namespace }-flex-center` }>
            <Button 
              namespace={ namespace }
              text="Create Empty Grid"
              icon="grid"
              color="purple"
              large={ true }
              disabled={ bulkDeleteActive }
              extraClass={ `${ namespace }-pad-right-10` }
              onClick={ createNewGrid }
            />
            <Button 
              namespace={ namespace }
              text="Create Grid from Template"
              icon="duplicate"
              color="red"
              large={ true }
              disabled={ bulkDeleteActive }
              extraClass={ `${ namespace }-pad-left-10` }
              onClick={ () => {} }
            />
          </div>
        </div>
        { pagination && (
          <div className={ `${ namespace }-grid-list-pagination` }>
          {
            pages.map( ( page, index ) => { 
              return (
                <Button 
                  key={ `${ namespace }-grid-list-pagination-${ index }` }
                  text={ ( index + 1 ).toString() }
                  disabled={ curPagination === index }
                  namespace={ namespace }
                  onClick={ () => gridAction( { action: 'change_pagination', data: index } ) } 
                  extraClass={ `${ namespace }-grid-list-pagination-btn` }
                />
              );
            } )
          }
          </div>
        ) }
      </div>
    );
  }
}

GridListItems.contextType = GridListContext;

GridListItems.propTypes = {
  newGrids: array,
  gridList: object,
  pagination: bool,
  max: number,
  checkBox: elementType,
};

export default GridListItems;