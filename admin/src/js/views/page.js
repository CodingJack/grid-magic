/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import ErrorBoundary from '../error';
import Loader from '../components/loaders/loader';

import {
  AdminContext,
} from '../context';

const {
  useContext,
} = React;

/*
 * @desc lazyload's the admin's main sections
 * @since 4.0.0
*/
const Page = () => {
  const context = useContext( AdminContext );
  const { page = 'overview' } = context;

  return (
    <ErrorBoundary>
      { page === 'overview' && <Loader resolve={ () => import( '../overview' ) } /> }
      { page === 'editor' && <Loader resolve={ () => import( '../editor' ) } /> }
      { page === 'globals' && <Loader resolve={ () => import( '../globals' ) } /> }
    </ErrorBoundary>
  );
};

export default Page;