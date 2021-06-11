/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  string,
  stringRequired,
} from '../utils/prop-types';


const ErrorMessage = ( { namespace = '', message = '' } ) => {
  return (
    <div className={ `${ namespace }-error-js` }>
      <p>
        Something went wrong.  Please <a href="https://github.com/themepunch/essential-grid-v4/issues">report</a> the error below. 
        <i>{ message }</i>            
      </p>
      <p><i>{ message }</i></p>
    </div>
  );
};

ErrorMessage.propTypes = {
  // required
  namespace: stringRequired,
  
  // wildcards
  message: string,
};

export default ErrorMessage;