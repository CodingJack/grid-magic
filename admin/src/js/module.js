/*
 * this is the main entry point for the lazy-load chunks
*/
require('../scss/admin.scss');

import React from 'react';
import Admin from './admin';

/*
 * @desc used in combination with the Loader clases to lazy-load components
 * @since 0.1.0
*/
const Module = props => <Admin { ...props } />;

export default Module;

