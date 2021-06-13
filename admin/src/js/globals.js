require('../scss/global_settings.scss');

/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import ErrorBoundary from './error';

import {
  AdminContext,
  EditorContext,
} from './context';

const { 
  Component,
} = React;

/*
 * @desc the entry point for the globals page
 * @since 0.1.0
*/
class Globals extends Component {
  constructor() {
    super( ...arguments );
  }
  
  render() {
    const { namespace } = this.context;
    return (
      <EditorContext.Provider value={ this.state }>
        <ErrorBoundary>
          <div className={ `${ namespace }-globals` }>this is the global settings</div>
        </ErrorBoundary>
      </EditorContext.Provider>
    );
  }
}

Globals.contextType = AdminContext;

export default Globals;