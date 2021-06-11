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
 * @since 4.0.0
*/
const BasicSpinner = ( { namespace = '' } ) => <span className={ `${ namespace }-basic-spinner` }></span>;

BasicSpinner.propTypes = {
  namespace: stringRequired,
};

export default BasicSpinner;