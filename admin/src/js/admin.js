/**
 * External dependencies.
 */
import React from 'react';
import axios from 'axios';
import extend from 'lodash.merge';
import qs from 'qs';

/**
 * Internal dependencies.
 */
import ErrorBoundary from './error';
import Display from './views/display';
import Queries from './queries';
import __ from './utils/translate';

import {
  AppContext,
  AdminContext,
} from './context';

import {
  toSlug,
  cloneObj,
  isObject,
  isFunction,
  trueFalse,
  getCookie,
  setCookie,
  getTimeStamp,
  sortObject,
} from './utils';

import {
  string,
  exact,
  shape,
  object,
  array,
  oneOfType,
  stringRequired,
  boolRequired,
} from './utils/prop-types';

const { 
  Component,
} = React;

const topLevelPages = [
  'overview',
  'editor',
  'globals',
];

const messagePath = 'overview.notices.';

/*
 * @desc the main admin class that handles all the views and REST calls
 * @since 0.1.0
*/
class Admin extends Component {
  constructor() {
    super( ...arguments );
    
    const { namespace = '' } = this.context;
    const { data: masterData = {} } = this.props;
    const cookiePrefix = namespace.replace( '-', '_' );
    
    // uncomment to clear cookies
    /*
    setCookie( `${ cookiePrefix }_max_grids`, 25 );
    setCookie( `${ cookiePrefix }_sort_favs`, false );
    setCookie( `${ cookiePrefix }_sort_ids`, false );
    setCookie( `${ cookiePrefix }_sort_names`, false );
    setCookie( `${ cookiePrefix }_sort_modified`, false );
    */
    
    const sortFavs = trueFalse(
      getCookie( `${ cookiePrefix }_sort_favs`, false )
    );
    
    const sortIds = trueFalse(
      getCookie( `${ cookiePrefix }_sort_ids`, false )
    );
    const sortNames = sortIds ? false : trueFalse(
      getCookie( `${ cookiePrefix }_sort_names`, false )
    );
    const sortModified = sortNames || sortIds ? false : trueFalse(
      getCookie( `${ cookiePrefix }_sort_modified`, false )
    );
    const max = parseInt( 
      getCookie( `${ cookiePrefix }_max_grids`, 25 ), 
    10 );
    
    const { gridId = '', section = 'settings' } = gridMagicData;
    const page = gridId ? 'editor' : 'overview';
    const { gridList: allGrids } = masterData;
    
    let gridList;
    if( isObject( allGrids ) ) {
      gridList = allGrids;
    } else {
      gridList = {};
      masterData.gridList = gridList;
    }
    
    let grids = Object.keys( gridList );
    grids.forEach( key => {
      const { draft } = gridList[ key ];
      if( trueFalse( draft ) ) {
        delete gridList[ key ];
      }
    } );

    grids = Object.keys( gridList );
    if( sortFavs ) {
      gridList = sortObject( 'favorite', 'boolean', grids, gridList );
      grids = Object.keys( gridList );
    }

    if( sortIds ) {
      gridList = sortObject( 'id', 'number', grids, gridList, false, 'gmagic-' );
    } else if( sortNames ) {
      gridList = sortObject( 'name', 'string', grids, gridList );
    } else if( sortModified ) {
      gridList = sortObject( 'lastModified', 'number', grids, gridList );
    }
    
    masterData.gridList = gridList;
    
    const gridLength = Object.keys( gridList ).length;
    const pagination = gridLength > max && max !== -1;
    
    /*
     * @desc the AdminContext Provider = the state
     *       PUBLIC class methods are the ones we push into the state here so child 
             components that adopt the context can call them
     * @since 0.1.0
    */
    this.state = { 
      max,
      page,
      gridId,
      gridLength,
      pagination,
      namespace,
      sortIds,
      sortFavs,
      sortNames,
      sortModified,
      draftId: '',
      newGrids: [],
      saving: false,
      restError: false,
      restInRoute: false,
      curPagination: 0,
      settingsPage: section,
      softUpdateMessage: '',
      softUpdateSuccess: false,
      showSoftUpdateNotice: false,
      getContent: this.getContent,
      softUpdate: this.softUpdate,
      changePage: this.changePage,
      updateData: this.updateData,
      gridAction: this.gridAction,
      updateAdmin: this.updateAdmin,
      checkPagination: this.checkPagination,
      getCategories: this.getCategories,
      getPages: this.getPages,
      masterData: {...masterData },
    };
  }
  
  /*
   * @class-property - PRIVATE
   * @desc make sure drafts aren't posted 
   * @param object data - incoming data to remove the draft from
   * @param string draftId - the draft to remove
   * @since 0.1.0
  */
  pluckDrafts( data = {}, draftId = '' ) {
    const newData = cloneObj( data );
    const { gridList = {} } = newData;
    
    delete gridList[ draftId ];
    return newData;
  }
  
  /*
   * @class-property - PRIVATE
   * @desc user prompt if REST calls are still in route
   * @param object e - window beforeunload event object
   * @since 0.1.0
  */
  onUnload = e => {
    e.preventDefault();
    const message = 'Are you sure you want to exit?';
    e.returnValue = message;
    return message;
  };
  
  /*
   * @class-property - PRIVATE
   * @desc NON-blocking async/await REST call
   * @param object data - incoming data to update
   * @param string route - optional custom route
   * @since 0.1.0
  */
  async softPostData( incomingData = {}, route = 'opt', callback, draftId = '' ) {
    const data = route === 'opt' && draftId ? this.pluckDrafts( incomingData, draftId ) : incomingData;
    const { endpoint = '' } = gridMagicData;
    let res;
    
    window.addEventListener( 'beforeunload', this.onUnload );
    try {
      res = await axios.post(
        `${ endpoint }${ route }/`, 
        qs.stringify( { data } ) 
      );
    } catch(e) {
      res = null;
    }
    let restError;
    let softUpdateSuccess;
    let softUpdateMessage;
    let showSoftUpdateNotice;
    
    if( res ) {
      const { data: response } = res;
      if( Array.isArray( response ) && response.length === 2 ) {
        softUpdateSuccess = trueFalse( response[0] );
        softUpdateMessage = String( response[1] );
        showSoftUpdateNotice = true;
      } else {
        restError = response === 'success' ? false : response;
      }
    } else {
      restError = true;
    }
    window.removeEventListener( 'beforeunload', this.onUnload );

    this.setState( {
      restError, 
      softUpdateSuccess, 
      softUpdateMessage,
      showSoftUpdateNotice,
      restInRoute: false,
    }, callback );
  }
  
  /*
   * @class-property - PRIVATE
   * @desc BLOCKING REST call for things where we want the user to wait, such as a purchase code registration action
   * @param object data - new master data object to send to the server
   * @since 0.1.0
  */
  async hardPostData( incomingData = {}, route = 'opt', draftId = '' ) {
    const data = route === 'opt' && draftId ? this.pluckDrafts( incomingData, draftId ) : incomingData;
    const { endpoint = '' } = gridMagicData;
    const newData = { ...data };
    let res;
    
    window.addEventListener( 'beforeunload', this.onUnload );
    try {
      res = await axios.post(
        `${ endpoint }${ route }/`, 
        qs.stringify( { data } ) 
      );
    } catch( e ) {
      res = {};
      console.log( e );
    }
    window.removeEventListener( 'beforeunload', this.onUnload );
    
    const { data: response } = res;
    const restError = response === 'success' ? false : response;
    
    this.setState( {
      restError,
      saving: false,
      masterData: newData,
      restInRoute: false,
    } );
  }
  
  /*
   * @class-property - PRIVATE
   * @desc get bulk content on-demand from a php file or from the TP servers such as the changelog, etc.
   * @param string route - required route name
   * @param function callback - callback to fire once content is retrieved
   * @since 0.1.0
  */
  async loadContent( route, callback ) {
    const { endpoint = '' } = gridMagicData;
    let res;
    
    window.addEventListener( 'beforeunload', this.onUnload );
    try {
      res = await axios.get( `${ endpoint }${ route }/` );
    } catch( e ) {
      res = {};
      console.log( e );
    }
    window.removeEventListener( 'beforeunload', this.onUnload );
    
    const { data: response = '' } = res;
    try {
      callback( response );
    } catch( e ) {
      console.log( e );
    }
  }

   /*
   * @class-property - PUBLIC
   * @desc - fecthes categories and tags together asynchrounously and silently 
   * @param function callback - callback to fire once content is retrieved
   * @since 0.1.0
   * @todo - lift this data up
  */
  getCategories = callback => {
    if( ! callback ) {
      return;
    }
    this.setState( { restInRoute: true }, () => {
      const { catTags = '' } = Queries;
      window.addEventListener( 'beforeunload', this.onUnload );
      fetch( '/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: catTags
        }),
      })
      .then( res => res.json() )
      .then( res => {
        const { data = {} } = res;
        const { categories = {}, tags = {} } = data;
        const { nodes:catNodes = [] } = categories;
        const { nodes:tagNodes = [] } = tags;
        this.setState( { restInRoute: false }, () => {
          try {
            callback( catNodes, tagNodes );
          } catch( e ) {
            console.log( e );
          } finally {
            window.removeEventListener( 'beforeunload', this.onUnload );
          }
        } );
      });
    });
  };
  
  /*
   * @class-property - PUBLIC
   * @desc - fecthes psges asynchrounously and silently 
   * @param function callback - callback to fire once content is retrieved
   * @since 0.1.0
   * @todo - lift this data up?
  */
  getPages = callback => {
    if( ! callback ) {
      return;
    }
    this.setState( { restInRoute: true }, () => {
      const { pages = '' } = Queries;
      window.addEventListener( 'beforeunload', this.onUnload );
      fetch( '/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: pages
        }),
      })
      .then( res => res.json() )
      .then( res => {
        const { data = {} } = res;
        const { pages = {} } = data;
        const { nodes = [] } = pages;
        this.setState( { restInRoute: false }, () => {
          try {
            callback( nodes );
          } catch( e ) {
            console.log( e );
          } finally {
            window.removeEventListener( 'beforeunload', this.onUnload );
          }
        } );
      });
    });
  };
  
  /*
   * @class-property - PUBLIC
   * @desc set the state here from a child component
   * @param object newData - incoming data to update
   * @since 0.1.0
  */
  updateAdmin = ( newData = {}, callback ) => {
    this.setState( { ...newData }, callback );
  };
  
  /*
   * @class-property - PUBLIC
   * @desc check if we should go into overview list pagination mode
   * @param object params - just max for now
   * @param func callback - used to set a cookie afterward (for now)
   * @since 0.1.0
  */
  checkPagination = ( { max = 25 }, callback ) => {
    this.setState( prevState => {
      const { masterData = {} } = prevState;
      const { gridList = {}, curPagination: prevPagination = 0 } = masterData;
      const gridLength = Object.keys( gridList ).length;
      const pagination = gridLength > max && max !== -1;
      const curPagination = pagination ? 0 : prevPagination;

      return {
        max, 
        gridLength,
        pagination,
        curPagination,
      };
    }, callback );
  };
  
  /*
   * @class-property - PUBLIC
   * @desc spread data and to the server with a NON-blocking REST call
   * @param object newData - incoming data to update
   * @param string route - optional custom route
   * @since 0.1.0
  */
  softUpdate = ( newData = {}, route = 'opt', callback, draftId = '', internal ) => {
    if( ! internal ) {
      this.setState( { restInRoute: true }, () => {
        this.softPostData( { ...newData }, route, callback, draftId );
      } );
    } else {
      this.softPostData( { ...newData }, route, callback, draftId );
    }
  };
  
  /*
   * @class-property - PUBLIC
   * @desc get bulk content on-demand from a php file or from the TP servers such as the changelog, etc.
   * @param string route - route name that descripts the REST action
   * @param function callback - callback to fire once content is retrieved
   * @since 0.1.0
  */
  getContent = ( route = 'opt', callback ) => {
    if( ! callback ) {
      return;
    }
    this.setState( { restInRoute: true }, () => {
      this.loadContent( route, callback );
    } );
  };
  
  /*
   * @class-property - PUBLIC
   * @desc REST call for things where we want the user to wait, such as a purchase code registration action
   * @param object incomingData - new master data object to send to the server
   * @param string message - message to show the user while they wait
   * @since 0.1.0
  */
  updateData = ( incomingData = {}, message = '', hardUpdate = false ) => {
    let saving = message;
    if( ! saving ) {
      saving = __( `${ messagePath }saving_data` );
    }
    
    const newData = { ...incomingData };
    let data;
    let draft;
    
    this.setState( prevState => {
      const { masterData = {}, draftId = '' } = prevState;
      const clonedData = cloneObj( masterData );
      data = extend( clonedData, newData );
      draft = draftId;
      
      if( ! hardUpdate ) {
        return { masterData: data, restInRoute: true };
      }
      return { saving, restInRoute: true };
    }, () => {
      if( ! hardUpdate ) {
        this.softPostData( { ...data }, 'opt', null, draft );
      } else {
        this.hardPostData( { ...data }, 'opt', draft );
      }
    } );
  };
  
  /*
   * @class-property - PRIVATE
   * @desc create a new Grid
   * @param function callback - possible callback, must be null otherwise
   * @since 0.1.0
  */
  newGrid( callback ) {
    let data;
    let draftId;
    
    this.setState( prevState => {
      const { draftId: curDraftId = '' } = prevState;
      const newGrid = this.createNewGrid( prevState, false, curDraftId );
      const { 
        newId = '', 
        clonedData: masterData, 
        gridLength = 0,
      } = newGrid;
      
      draftId = curDraftId;
      data = { ...masterData };

      return { 
        masterData, 
        gridLength,
        draftId: '', 
        newGrids: [ newId ], 
        restInRoute: true,
      };
    }, () => {
      if( callback && isFunction( callback ) ) {
        callback();
      }
      this.softPostData( { ...data }, 'opt', null, draftId );
    } );
  }
  
  /*
   * @class-property - PUBLIC
   * @desc actions for the grids listed in the overview page
   * @param action string - the action to handle
   * @param gridId string - the Grid's ID
   * @param data * - the Grid's ID
   * @since 0.1.0
  */
  gridAction = ( { action, gridId = '', data, callback } ) => {
    // no default for the switch.  
    // the action name must match something
    // possible incoming data to handle depending on the action
    switch( action ) {
      case 'edit_grid':
        this.changePage( 'editor', { gridId } );
        break;
      case 'create_grid':
        this.newGrid( callback );
        break;
      case 'delete_grid':
        this.deleteGrid( gridId );
        break;
      case 'duplicate_grid':
        this.duplicateGrid( gridId );
        break;
      case 'toggle_favorite':
        this.updateFavorite( gridId, data );
        break;
      case 'sort_favorites':
        this.sortGrids( 'favorite', 'sortFavs', 'sort_favs', 'boolean' );
        break;
      case 'sort_ids':
        this.sortGrids( 'id', 'sortIds', 'sort_ids', 'number' );
        break;
      case 'sort_names':
        this.sortGrids( 'name', 'sortNames', 'sort_names', 'string' );
        break;
      case 'sort_modified':
        this.sortGrids( 'lastModified', 'sortModified', 'sort_modified', 'number' );
        break;
      case 'bulk_delete':
        this.deleteBulkGrids( [ ...data ], callback );
        break;
      case 'change_pagination':
        this.setState( { curPagination: data }, callback );
    }
  };
  
  /*
   * @class-property - PRIVATE
   * @desc bulk delete the grids
   * @param grids array - the grids to bulk delete
   * @since 0.1.0
  */
  deleteBulkGrids( grids = [], callback ) {
    if( window.confirm( __( `${ messagePath }sure_you_want_to_delete_these_grids` ) ) ) {
      this.setState( prevState => {
        const { masterData = {}, draftId = '' } = prevState;
        const clonedData = cloneObj( masterData );
        const { gridList = {} } = clonedData;
        
        Object.keys( gridList ).forEach( key => {
          if( grids.indexOf( key ) !== -1 ) {
            delete gridList[ key ];
          }
        } );
        this.softUpdate( clonedData, 'opt', null, draftId, true );
        return { 
          draftId: '',
          masterData: clonedData, 
          gridLength: Object.keys( gridList ).length,
        };
      }, callback );
    }
  }
  
  /*
   * @class-property - PRIVATE
   * @desc switches between the main 3 pages, currently: 'overview', 'editor' and 'globals'
   * @param prevState object - grabbed from the setState function and then used here to create a new Grid
   * @param draft boolean - whether the new grid is a draft or not
   * @since 0.1.0
  */
  createNewGrid( prevState = {}, draft, draftId = '' ) {
    const { masterData = {} } = prevState;
    const clonedData = cloneObj( masterData );
    const { gridList = {} } = clonedData;
    
    const gridKeys = Object.keys( gridList );
    const hasDraft = gridKeys.indexOf( draftId ) !== -1;
    let newId = gridKeys.length;
  
    while( gridKeys.indexOf( `gmagic-${ newId.toString() }` ) !== -1 ) {
      newId++;
    }
    if( hasDraft && newId === 2 ) {
      newId = 1;
    }
    const gridIndex = newId ? newId : 1;
    newId = Math.max( gridIndex, 1 ).toString();
    
    let realId = newId;
    let name = `Grid: ${ newId }`;
    
    if( ! draft ) {
      let slugId = `gmagic-${ newId }`;
      let i = 1;
      
      while( gridKeys.indexOf( slugId ) !== -1 ) {
        name = `${ name }-${ i }`;
        newId = `${ newId }${ i }`;
        slugId = `gmagic-${ newId }`;
        i++;
      }
    } else {
      name = `${ name } (draft)`;
      newId = 'draft';
      realId = 'draft';
    }
    const alias = toSlug( name.replace( ':', '' ) );

    const newGrid = {
      name,
      alias,
      favorite: false,
      settings: 'Even, 4:3, Custom, Boxed',
      lastModified: getTimeStamp(),
    };
    if( draft ) {
      newGrid.draft = true;
    }
    newId = `gmagic-${ realId }`;
    const newList = { [ newId ]: { ...newGrid } };
    
    Object.keys( gridList ).forEach( key => {
      newList[ key ] = { ...gridList[ key ] };
    } );
    clonedData.gridList = newList;
    
    return { 
      newId,
      clonedData, 
      gridLength: Object.keys( newList ).length,
    };
  }
  
  /*
   * @class-property - PUBLIC
   * @desc switches between the main 3 pages, currently: 'overview', 'editor' and 'globals'
   * @param string page - the new page to change to
   * @since 0.1.0
  */
  changePage = ( newPage = '', params = {} ) => {
    const page = String( newPage );
    let args = isObject( params ) ? { ...params } : {};
    
    if( topLevelPages.indexOf( page ) !== -1 ) {
      this.setState( prevState => {
        if( page === 'editor' ) {
          const { masterData = {} } = prevState;
          const { gridList = {} } = masterData;
          const gridKeys = Object.keys( gridList );
          
          if( gridKeys.length ) {
            const { gridId } = args;
            if( gridId ) {
              args = { ...args, newGrids: [ gridId ] };
            }
          } else {
            // if no grids exist we'll create a draft
            const newGrid = this.createNewGrid( prevState, true );
            const { clonedData, newId = '' } = newGrid;
            
            const newData = { masterData: { ...clonedData } };
            const { newGrids = [] } = prevState;
            
            newGrids.push( newId );
            args = { ...args, ...newData, draftId: newId, newGrids: newGrids.slice() };
          }
        }
        return { ...args, page };
      }, () => {
        if( page !== 'editor' ) {
          const params = new URLSearchParams( location.search );
          params.delete( 'edit_grid' );
          params.delete( 'grid_id' );
          window.history.replaceState( {}, '', `${ location.pathname }?${ params }` );
        }
      } );
    } else {
      console.log( __( `${ messagePath }admin_page_does_not_exist` ) );
    }
  };
  
  /*
   * @class-property - PRIVATE
   * @desc duplicates a grid from the overview page on user-action
   * @param string gridId - the ID of the Grid to duplicate
   * @since 0.1.0
  */
  duplicateGrid( gridId = '' ) {
    this.setState( prevState => {
      const {
        masterData = {}, 
        draftId = '', 
        pagination = false,
        curPagination = 0,
        max = 25,
      } = prevState;

      const clonedData = cloneObj( masterData );
      const { gridList = {} } = clonedData;
      const gridKeys = Object.keys( gridList );
      
      const gridLength = gridKeys.length;
      const curIndex = gridKeys.indexOf( gridId ) + 1;
      const grid = gridList[ gridId ];
      
      if( ! grid ) {
        console.log( __( `${ messagePath }unable_to_duplicate_grid` ) );
      }
      const clonedGrid = cloneObj( grid );
      let newId = gridLength;
      
      while( gridKeys.indexOf( `gmagic-${ newId.toString() }` ) !== -1 ) {
        newId++;
      }
      const { name, alias } = clonedGrid;
      const ids = parseInt( gridId.replace( 'gmagic-', '' ), 10 );
      
      let newName = `${ name }-${ ids }`;
      let newAlias = `${ alias }-${ ids }`;
      
      gridKeys.forEach( key => {
        const itm = gridList[ key ];
        const { name, alias } = itm;
        let i = 1;
        let j = 1;
        
        while( newName === name ) {
          newName = `${ newName }-${ i }`;
          i++;
        }
        while( newAlias === alias ) {
          newAlias = `${ newAlias }-${ j }`;
          j++;
        }
      } );
      
      clonedGrid.name = newName;
      clonedGrid.alias = newAlias;
      newId = `gmagic-${ newId }`;
      
      const realMax = max !== -1 ? max : gridLength;
      const pageIndex = curPagination * realMax;
      const pageMax = pageIndex + realMax - 1;
      const placeBefore = pagination && curIndex > pageIndex + realMax - 2;
      const newList = {};
      let placed;

      Object.keys( gridList ).forEach( ( key, index ) => {
        if( ! placeBefore ) {
          if( curIndex === index ) {
            placed = true;
            newList[ newId ] = clonedGrid;
          }
        } else {
          if( index === pageMax ) {
            placed = true;
            newList[ newId ] = clonedGrid;
          }
        }
        newList[ key ] = { ...gridList[ key ] };
      } );
      
      // fallback just in case
      if( ! placed ) {
        newList[ newId ] = clonedGrid;
      }
      clonedData.gridList = { ...newList };
      
      this.softUpdate( clonedData, 'opt', null, draftId, true );
      return { 
        draftId: '', 
        masterData: clonedData, 
        newGrids: [ newId ], 
        gridLength: Object.keys( newList ).length,
      };
    } );
  }
  
  /*
   * @class-property - PRIVATE
   * @desc deletes a grid from the overview page on user-action
   * @param string gridId - the ID of the Grid to delete
   * @since 0.1.0
  */
  deleteGrid( gridId = '' ) {
    if( window.confirm( __( `${ messagePath }sure_you_want_to_delete_grid` ) ) ) {
      this.setState( prevState => {
        const { masterData = {}, draftId = '' } = prevState;
        const clonedData = cloneObj( masterData );
        
        const { gridList = {} } = clonedData;
        const grid = gridList[ gridId ];
        
        if( ! grid ) {
          console.log( __( `${ messagePath }unable_to_delete_grid` ) );
        }
        delete gridList[ gridId ];
        this.softUpdate( clonedData, 'opt', null, draftId, true );

        return { 
          draftId: '', 
          masterData: clonedData, 
          gridLength: Object.keys( gridList ).length,
        };
      } );
    }
  }
  
  /*
   * @class-property - PRIVATE
   * @desc sorts grids depending on user action
   * @since 0.1.0
  */
  sortGrids( prop = '', propSelected = '', cookieSlug = '', type = 'boolean' ) {
    let isSorted;
    let namespace;
    
    this.setState( prevState => {
      const { 
        masterData = {}, 
        [ propSelected ]: selected,
        namespace:ns = '',
      } = prevState;
      
      namespace = ns;
      const clonedData = cloneObj( masterData );
      const { gridList = {} } = clonedData;
      const grids = Object.keys( gridList );
      let obj = {};
      
      if( prop === 'id' ) {
        obj = {
          sortNames: false,
          sortModified: false,
        };
      } else if( prop === 'name' ) {
        obj = {
          sortIds: false,
          sortModified: false,
        };
      } else if( prop === 'lastModified' ) {
        obj = {
          sortIds: false,
          sortNames: false,
        };
      }
      
      isSorted = ! selected;
      clonedData.gridList = sortObject(
        prop, 
        type, 
        grids, 
        gridList, 
        selected, 
        prop === 'id' ? 'gmagic-' : '', // replace string when sorting by ID
      );
      
      return { 
        masterData: clonedData, 
        [ propSelected ]: isSorted,
        ...obj,
      };
    }, () => {
      setCookie( `${ namespace.replace( '-', '_' ) }_${ cookieSlug }`, isSorted );
    } );
  }
  
  /*
   * @class-property - PRIVATE
   * @desc toggles Grid favorites from the grid-list on the overview page 
   * @param string gridId - the ID of the Grid to delete
   * @param boolean selected - whether the favorite is selected or not
   * @since 0.1.0
  */
  updateFavorite( gridId = '', selected ) {
    this.setState( prevState => {
      const { masterData = {}, draftId = '' } = prevState;
      const clonedData = cloneObj( masterData );
      
      const { gridList = {} } = clonedData;
      const grid = gridList[ gridId ];
      
      if( ! grid ) {
        console.log( __( `${ messagePath }unable_to_save_favorite` ) );
        return;
      }
      const clonedGrid = cloneObj( grid );
      clonedGrid.favorite = selected;
      gridList[ gridId ] = clonedGrid;
      
      this.softUpdate( clonedData, 'opt', null, draftId, true );
      return { masterData: clonedData };
    } );
  }
  
  /*
   * @class-property - PRIVATE
   * @desc the rendered view. Here we pass the current class state down to any component that adopts the AdminContext
   *       then the ErrorBoundary catches errors that bubble up so we can show custom messages
   *       then the Display component is basically the admin's main wrapper, i.e. header, menu, body content
   * @since 0.1.0
  */
  render() {
    return (
      <AdminContext.Provider value={ this.state }>
        <ErrorBoundary>
          <Display />
        </ErrorBoundary>
      </AdminContext.Provider>
    );
  }
}

Admin.contextType = AppContext;
Admin.propTypes = {
  // required 
  data: shape( {
    plugin: exact( {
      availableVersion: stringRequired,
      purchaseCodeRegistered: oneOfType( [ stringRequired, boolRequired ] ),
      purchaseCode: string, // wildcard
    } ).isRequired,
    gridList: oneOfType( [ object, array ] ),
  } ).isRequired,
};

export default Admin;