/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import ErrorMessage from './error/error-message';

import {
  AppContext,
} from './context';

const {
  Component,
} = React;

/*
 * @desc error boundaries catch any errors that may occur
 * @since 0.1.0
*/
class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { hasError: false };
  }

  static getDerivedStateFromError( error ) {
    return { hasError: error };
  }

  render() {
    const { hasError } = this.state;
    
    if ( hasError ) {
      const { namespace = '' } = this.context;
      return <ErrorMessage namespace={ namespace } message={ String( hasError ) } />;
    }

    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.contextType = AppContext;

export default ErrorBoundary;
