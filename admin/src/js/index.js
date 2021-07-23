/*
 * the main entry point for the App
*/
require('../scss/preloader.scss');

/**
 * External dependencies.
 */
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Internal dependencies.
 */
import AppLoader from './components/loaders/apploader';
import ErrorBoundary from './error';
import { AppContext } from './context';

const namespace = 'gmagic';
const {
  Component,
  // StrictMode,
} = React;

/*
 * @desc the top-level Admin component
 * @since 0.1.0
*/
class GridMagicAdmin extends Component {
  constructor() {
    super( ...arguments );
  }
  state = {
    namespace,
  }
  
  render() {
    return (
      <AppContext.Provider value={ this.state }>
        <ErrorBoundary>
          <AppLoader
            resolve={ () => import( './module' ) }
            data={ true }
          />
        </ErrorBoundary>
      </AppContext.Provider>
    );
  }
}

if( typeof gridMagicData !== 'undefined' ) {
  try {
    gridMagicData = JSON.parse( gridMagicData );
  } catch( e ) {
    gridMagicData = null;
    console.log( 'issue with parsing gridMagicData' );
  }
  
  if( gridMagicData ) {
    const root = document.getElementById( 'gmagic-app' );
    
    if( root ) {
      const { jsPath = '' } = gridMagicData;
      __webpack_public_path__ = jsPath;
      
      document.body.classList.add( `${ namespace }-preloader` );
      ReactDOM.render( <GridMagicAdmin />, root );
    }
  }
}