/**
 * External dependencies.
 */
import React from 'react';

/*
 * @desc used by component classes that need to hook into multiple contexts
 * @since 0.1.0
*/

import { 
  AppContext,
  AdminContext,
  EditorContext,
  OverviewContext,
} from '../context';

const withAppContext = Component => ( props => (
  <AppContext.Consumer>
    { context => <Component appContext={ context } { ...props } /> }
  </AppContext.Consumer>
) );

const withAdminContext = Component => ( props => (
  <AdminContext.Consumer>
    { context => <Component adminContext={ context } { ...props } /> }
  </AdminContext.Consumer>
) );

const withOverviewContext = Component => ( props => (
  <OverviewContext.Consumer>
    { context => <Component overviewContext={ context } { ...props } /> }
  </OverviewContext.Consumer>
) );

const withEditorContext = Component => ( props => (
  <EditorContext.Consumer>
    { context => <Component editorContext={ context } { ...props } /> }
  </EditorContext.Consumer>
) );

export {
  withAppContext,
  withAdminContext,
  withOverviewContext,
  withEditorContext,
};