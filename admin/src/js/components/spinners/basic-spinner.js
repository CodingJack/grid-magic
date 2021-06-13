/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  stringRequired,
} from '../../utils/prop-types';


/*
 * @desc small spinner for soft-updates
 * @since 0.1.0
*/
const BasicSpinner = ( { namespace = '' } ) => <span className={ `${ namespace }-basic-spinner` }></span>;

BasicSpinner.propTypes = {
  namespace: stringRequired,
};

export default BasicSpinner;