require('../scss/overview.scss');

/**
 * External dependencies.
 */
import React from 'react';

import {
  forceCheck as checkViewport,
} from 'react-lazyload';

/**
 * Internal dependencies.
 */
import ErrorBoundary from './error';
import NotificationBox from './components/containers/notification-box';
import HowToUse from './overview/notification-content/how-to-use';
import VersionInformation from './overview/notification-content/version-information';
import Newsletter from './overview/notification-content/newsletter';
import Changelog from './overview/notification-content/changelog';
import GridList from './overview/grid-list';
import __ from './utils/translate';

import {
  AdminContext,
  OverviewContext,
} from './context';

const { 
  Component,
} = React;

/*
 * @desc the entry point for the overview page
 * @since 4.0.0
*/
class Overview extends Component {
  constructor() {
    super( ...arguments );
  }
  
  state = {
    section: 'naming',
  };
  
  checkLazyLoad = () => {
    checkViewport();
  };
  
  componentDidMount() {
    checkViewport();
    
    // our LazyLoad component is pretty solid except it doesn't handle blur/focus well
    window.addEventListener( 'focus', this.checkLazyLoad );
  }
  
  componentWillUnmount() {
    window.removeEventListener( 'focus', this.checkLazyLoad );
  }
  
  render() {
    const {
      namespace = '',
      masterData = {},
    } = this.context;
    
    const { gridList = {} } = masterData;
    const grids = Object.keys( gridList );
    
    let overviewEmpty = ! grids.length;
    if( grids.length === 1 ) {
      grids.forEach( key => {
        const { draft } = gridList[ key ];
        if( draft ) {
          overviewEmpty = true;
        }
      } );
    }
    const extraClass = ! overviewEmpty ? '' : ` ${ namespace }-overview-empty`;
    const txtPath = 'overview.';
    
    return (
      <OverviewContext.Provider value={ this.state }>
        <ErrorBoundary>
          <div className={ `${ namespace }-overview${ extraClass }` }>
            <GridList />
            <NotificationBox 
              title={ __( `${ txtPath }how_to_use.title` ) }
              color="purple"
              icon="sync"
              namespace={ namespace }
              content={ HowToUse }
              placeholderHeight={ 112 }
            />
            <NotificationBox 
              title={ __( `${ txtPath }version_info.title` ) }
              color="green"
              icon="info"
              namespace={ namespace }
              content={ VersionInformation }
              placeholderHeight={ 112 }
            />
            <NotificationBox 
              title={ __( `${ txtPath }newsletter` ) }
              color="red"
              icon="email"
              namespace={ namespace }
              content={ Newsletter }
              placeholderHeight={ 294 }
            />
            <NotificationBox 
              title={ __( `${ txtPath }update_history` ) }
              color="purple"
              icon="update"
              namespace={ namespace }
              content={ Changelog }
              placeholderHeight={ 545 }
              extraClass={ `${ namespace }-changelog` }
            />
          </div>
        </ErrorBoundary>
      </OverviewContext.Provider>
    );
  }
}

Overview.contextType = AdminContext;

export default Overview;