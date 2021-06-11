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

const namespace = 'esg-v4';
const {
  Component,
  // StrictMode,
} = React;

/*
 * @desc the top-level Admin component
 * @since 4.0.0
*/
class EssentialGridV4Admin extends Component {
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

if( typeof essentialGridV4Data !== 'undefined' ) {
  try {
    essentialGridV4Data = JSON.parse( essentialGridV4Data );
  } catch( e ) {
    essentialGridV4Data = null;
    console.log( 'issue with parsing essentialGridV4Data' );
  }
  
  // console.log(essentialGridV4Data);
  
  if( essentialGridV4Data ) {
    const root = document.getElementById( 'esg-v4-app' );
    
    if( root ) {
      const { jsPath = '' } = essentialGridV4Data;
      __webpack_public_path__ = jsPath;
      
      document.body.classList.add( `${ namespace }-preloader` );
      ReactDOM.render( <EssentialGridV4Admin />, root );
    }
  }
}