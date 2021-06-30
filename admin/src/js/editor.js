require( '../scss/editor.scss' );

/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import ErrorBoundary from './error';
import GridMenu from './editor/grid-menu';
import GridSettings from './editor/grid-settings';
import GridSettingsSubMenu from './editor/grid-settings/grid-settings-submenu';
import options from './editor/grid-settings/grid-settings-options/options';

import {
  EditorContext,
} from './context';

import { 
  withAdminContext,
} from './context/with-context';

import { 
  cloneObj,
  getCookie,
  setCookie,
  dynamicObject,
} from './utils';

const {
  Component,
} = React;

/*
 * @desc the main entry point for the editor
 * @since 0.1.0
*/
class Editor extends Component {
  constructor() {
    super( ...arguments );
    
    const { 
      adminContext,
    } = this.props;
    
    const {
      namespace = '',
      gridId = '',
      gridAction,
      updateData,
    } = adminContext;
    
    const cookiePrefix = namespace.replace( '-', '_' );
    const subMenu = parseInt(
      getCookie( `${ cookiePrefix }_submenu`, 0 ),
      10,
    );
    const optionKeys = Object.keys( options );
    const curKey = optionKeys[ subMenu ] || optionKeys[0];
    const curOptions = options[ curKey ];

    this.state = {
      namespace,
      gridAction,
      updateData,
      subMenu,
      list: [],
      options: curOptions,
      curGridName: '',
      curGridId: gridId,
      curGrid: {},
      error: false,
      menuSlug: 'naming',
      updateSubMenu: this.updateSubMenu,
    };
  }

  onChange = ( prop = '', val = '', path = '', def = '' ) => {
    let masterData;

    this.setState( prevState => {
      const { adminContext } = this.props;
      const { masterData:prevData = {} } = adminContext;

      const { curGridId = '', curGrid:prevGrid = {} } = prevState;
      masterData = cloneObj( prevData );

      dynamicObject( prevGrid, path, prop, val, def );
      const { gridList = {} } = masterData;
      
      gridList[ curGridId ] = cloneObj( prevGrid );
      masterData.gridList = { ...gridList };
    }, () => {
      const { adminContext } = this.props;
      const { updateData } = adminContext;

      updateData( masterData );
    } );
  };

  updateSubMenu = ( subMenu, menuSlug ) => {
    this.setState( { 
      subMenu, 
      menuSlug, 
      options: options[ menuSlug ],
    }, () => {
      const { adminContext } = this.props;
      const { namespace = '' } = adminContext;
      const cookiePrefix = namespace.replace( '-', '_' );
      setCookie( `${ cookiePrefix }_submenu`, subMenu.toString() );
    } );
  };
  
  static getDerivedStateFromProps( props ) {
    const { adminContext } = props;
    const { masterData = {}, gridId = '' } = adminContext;
    const { gridList = {} } = masterData;
    const grids = Object.keys( gridList );
    let toDelete;
    
    if( grids.length > 1 ) {
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
    }
    if( ! grids.length ) {
      return { error: true };
    }
    
    let curGridId = gridId;
    let curGridName = '';
    if( ! curGridId ) {
      curGridId = grids[0];
    }
    
    const list = grids.map( key => {
      const { name = '' } = gridList[ key ];
      const label = name;
      if( key === curGridId ) {
        curGridName = label;
      }
      return { label, value: key };
    } );
    
    if( ! gridList[ curGridId ] ) {
      const key = grids[0];
      const itm = list[0];
      const { label } = itm;
      curGridId = key;
      curGridName = label;
    }
    
    return {
      list,
      curGridId,
      curGridName,
      error: false,
      curGrid: gridList[ curGridId ],
    };
  }

  updateUrlParam( id ) {
    const params = new URLSearchParams( location.search );
    params.set( 'edit_grid', '1' );
    params.set( 'grid_id', id );
    window.history.replaceState( {}, '', `${ location.pathname }?${params}` );
  }
  
  componentDidUpdate( prevProps, prevState ) {
    const { curGridId = '', error } = this.state;
    const { curGridId: prevGridId = '' } = prevState;
    
    if( curGridId !== prevGridId ) {
      this.updateUrlParam( curGridId );
    }
    if( error ) {
      const { adminContext } = this.props;
      const { changePage } = adminContext;
      changePage( 'overview' );
    }
  }
  
  componentDidMount() {
    const { curGridId = '' } = this.state;
    const { adminContext } = this.props;
    const { updateAdmin } = adminContext;
    this.updateUrlParam( curGridId );
    updateAdmin( { newGrids: [ curGridId ] } );
  }

  render() {
    const { adminContext } = this.props;
    const { namespace = '', settingsPage = 'settings' } = adminContext;
    const { error, options:Options, curGrid:values } = this.state;
    
    if( error ) {
      return null;
    }
    return (
      <EditorContext.Provider value={ this.state }>
        <ErrorBoundary>
          <div className={ `${ namespace }-editor` }>
            <div className={ `${ namespace }-panel-left` }>
              <GridMenu />
              <GridSettings />
              <div className={ `${ namespace }-grid-settings ${ namespace }-flex ${ namespace }-flex-space-between` }>
                <GridSettingsSubMenu settingsPage={ settingsPage } />
              </div>
              <div className={ `${ namespace }-grid-settings-options` }>
                <Options 
                  namespace={ namespace } 
                  values={ values }
                  onChange={ this.onChange } 
                />
              </div>
            </div>
          </div>
        </ErrorBoundary>
      </EditorContext.Provider>
    );
  }
}

export default withAdminContext( Editor );