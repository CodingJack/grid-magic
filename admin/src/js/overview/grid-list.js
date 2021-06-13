/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import GridListItems from './grid-list/grid-list-items';
import GridListLegend from './grid-list/grid-list-legend';
import GridListHeader from './grid-list/grid-list-header';
import breakpoints from '../data/breakpoints';
import ErrorBoundary from '../error';

import {
  GridListContext,
} from '../context';

import { 
  withAdminContext,
} from '../context/with-context';

import {
  getCookie,
  setCookie,
  findMatches,
} from '../utils';

const { 
  Component,
} = React;

const {
  tablet,
} = breakpoints;

let cookiePrefix;

/*
 * @desc takes the grid list and remixes it based on the selected filters
 * @since 0.1.0
*/
class GridList extends Component {
  constructor() {
    super( ...arguments );
    
    const { adminContext = {} } = this.props;
    const {
      namespace = '', 
      gridAction, 
      updateData,
    } = adminContext;
    
    cookiePrefix = namespace.replace( '-', '_' );
    const search = getCookie( `${ cookiePrefix }_grid_search`, '' );
 
    this.state = {
      namespace,
      gridAction,
      updateData,
      grids: [],
      gridList: {},
      gridLength: 0,
      empty: false,
      emptySearch: false,
      clearSearch: false,
      searchText: search,
      initialValue: search,
      bulkDeleteActive: false,
      bulkDeleteSelected: false,
      bulkDeleteItems: [],
      updateState: this.updateState,
      searchGrids: this.searchGrids,
      createNewGrid: this.createNewGrid,
      toggleBulkDelete: this.toggleBulkDelete,
      bulkDeleteSelect: this.bulkDeleteSelect,
      bulkDeleteSelectAll: this.bulkDeleteSelectAll,
      setMax: this.setMax,
    };
  }
  
  updateState = ( data = {}, callback ) => {
    this.setState( { ...data }, callback );
  };
  
  toggleBulkDelete = bulkDeleteActive => {
    this.setState( {
      bulkDeleteActive, 
      bulkDeleteSelected: false, 
      bulkDeleteItems: [],
    } );
  };
  
  setMax = newMax => {
    const { adminContext = {} } = this.props;
    const { checkPagination } = adminContext;
    
    let max = parseInt( newMax, 10 );
    if( isNaN( max ) ) {
      max = -1;
    }
    
    checkPagination( { max }, () => {
      window.dispatchEvent( new Event( 'resize' ) ); // account for LazyLoad bug
      setCookie( `${ cookiePrefix }_max_grids`, max.toString() );
    } );
  };
  
  afterSearchUpdate = searchText => {
    // account for LazyLoad bug
    window.dispatchEvent( new Event( 'resize' ) );
    setCookie( `${ cookiePrefix }_grid_search`, searchText );
  };
  
  searchGrids = ( val = '', callback ) => {
    const searchText = typeof val === 'string' ? val : '';
    const obj = { searchText };
    
    if( callback ) {
      obj.clearSearch = true;
    }
    this.setState( obj, () => {
      if( ! callback ) {
        const { gridLength = 0 } = this.state;
        this.afterSearchUpdate( gridLength ? searchText : '' );
      } else {
        callback();
      }
    } );
  };
  
  createNewGrid = () => {
    this.searchGrids( '', () => {
      const { adminContext = {} } = this.props;
      const { gridAction } = adminContext;
      gridAction( {
        action: 'create_grid',
        callback: this.newGridCallback,
      } );
    } );
  };

  newGridCallback = () => {
    if( ! this.unmounted ) {
      console.log('fucker');
      this.setState( { clearSearch: false }, () => {
        this.afterSearchUpdate( '' );
      } );
    }
  };
  
  bulkDeleteSelectAll = checked => {
    this.setState( prevState => {
      const { grids = [] } = prevState;
      return { 
        bulkDeleteSelected: checked,
        bulkDeleteItems: checked ? grids.slice() : [],
      };
    } );
  };
  
  bulkDeleteSelect = ( checked, id = '' ) => {
    this.setState( prevState => {
      const { 
        grids = [],
        bulkDeleteItems: prevItems = [],
      } = prevState;
      
      const bulkDeleteItems = prevItems.slice();
      const index = bulkDeleteItems.indexOf( id );
      
      if( index === -1 ) {
        bulkDeleteItems.push( id );
      } else {
        bulkDeleteItems.splice( index, 1 );
      }

      return { 
        bulkDeleteItems,
        bulkDeleteSelected: bulkDeleteItems.length === grids.length,
      };
    } );
  };
  
  static getDerivedStateFromProps( props, state ) { 
    const { adminContext = {} } = props;
    const { 
      max = 25, 
      curPagination = 0, 
      pagination = false,
      masterData = {}, 
    } = adminContext;
    
    const { gridList: allGrids = {} } = masterData;
    const gridList = { ...allGrids };
    let grids = Object.keys( gridList );
    
    let toDelete;
    grids.forEach( key => {
      const { draft } = gridList[ key ];
      if( draft ) {
        toDelete = key;
        delete gridList[ key ];
      }
    } );
    if( toDelete ) {
      grids.splice( grids.indexOf( toDelete ), 1 );
    }
    
    if( ! grids.length ) {
      return {
        empty: true,
        grids: [],
        gridList: {},
        gridLength: 0,
      };
    }
    const { searchText = '' } = state;
    
    // are they searching ?
    if( searchText ) {
      const search = String( searchText ).toLowerCase();
      const allNames = grids.map( grid => gridList[ grid ].name.toLowerCase() );
      const allAliases = grids.map( grid => gridList[ grid ].alias.toLowerCase() );
      const nameMatches = findMatches( allNames, search );
      const aliasMatches = findMatches( allAliases, search );
      
      const newGrids = grids.filter( ( grid, index ) => {
        const namesFound = nameMatches.indexOf ( index );
        const aliasesFound = aliasMatches.indexOf ( index );
        return namesFound !== -1 || aliasesFound !== -1;
      } );
      
      grids.forEach( grid => {
        if( newGrids.indexOf( grid ) === -1 ) {
          delete gridList[ grid ];
        }
      } );
      grids = newGrids.slice();
      
      if( ! grids.length ) {
        return {
          empty: false, 
          emptySearch: true,
          gridList: {},
          grids: [],
          gridLength: 0,
        };
      }
    }
    let theMax = parseInt( max, 10 );
    if( isNaN( theMax ) ) {
      theMax = -1;
    }
    
    // did they choose a different max?
    if( theMax !== -1 ) {
      if( pagination ) {
        const pageMax = curPagination * max;
        grids = grids.filter( ( grid, index ) => {
          return index >= pageMax && index < pageMax + max;
        } );
      }
      /*
      while( grids.length > theMax ) {
        delete gridList[ grids[ grids.length - 1 ] ];
        grids.pop();
      }
      */
    }
    if( ! grids.length ) {
      return {
        grids,
        gridLength: 0,
        gridList: {},
        empty: false, 
        emptySearch: true,
      };
    }
    return {
      grids, 
      gridList, 
      empty: false, 
      emptySearch: false,
      gridLength: grids.length,
    };
  }
  
  checkBulkDelete = () => {
    if( ! this.unmounted && window.innerWidth < tablet ) {
      this.toggleBulkDelete( false );
    }
  };
  
  onResize = () => {
    clearTimeout( this.debounce );
    this.debounce = setTimeout( this.checkBulkDelete, 100);
  };
  
  componentDidMount() {
    window.addEventListener( 'resize', this.onResize );
  }
  
  componentWillUnmount() {
    this.unmounted = true;
    clearTimeout( this.debounce );
    window.removeEventListener( 'resize', this.onResize );
  }

  render() {
    const { adminContext = {} } = this.props;
    const { 
      max = 25,
      newGrids = [],
      masterData = {},      
      sortIds = false,
      sortNames = false,
      sortFavs = false,
      sortModified = false,
      pagination = false,
      curPagination = 0,
      gridLength: gridTotal,
    } = adminContext;
    
    const { gridList = {} } = masterData;
    
    const {
      empty,
      namespace,
      emptySearch,
      gridLength = 0,
    } = this.state;
    
    return (
      <ErrorBoundary>
        <GridListContext.Provider value={ this.state }>
          <div className={ `${ namespace }-grid-list-wrap` }>
            { ! empty && (
              <>
                <GridListHeader 
                  gridLength={ gridLength } 
                  gridTotal={ gridTotal }
                  max={ max } 
                />
                <GridListLegend 
                  sortIds={ sortIds } 
                  sortNames={ sortNames }
                  sortFavs={ sortFavs }
                  sortModified={ sortModified }
                />
              </>
            ) }
            { ! emptySearch && (
              <GridListItems 
                gridList={ { ...gridList } } 
                newGrids={ newGrids } 
                gridLength={ gridTotal }
                curPagination={ curPagination }
                pagination={ pagination }
                max={ max } 
              />
            ) }
          </div>
        </GridListContext.Provider>
      </ErrorBoundary>
    );
  }
}

export default withAdminContext( GridList );
  