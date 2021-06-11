/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Header from './header';
import Page from './page';
import AdminMenu from '../admin/admin-menu';
import SoftUpdateNotice from '../admin/soft-update-notice';
import AltIcon from '../components/icons/alt-icon';

import {
  AdminContext,
} from '../context';

const { 
  Component,
  createRef,
} = React;

/*
 * @desc the entry point for the admin header, its main body content and the REST notices
 * @since 4.0.0
*/
class Display extends Component {
  constructor() {
    super( ...arguments );
    this.ref = createRef();
  }
  
  /*
   * @desc fade app in onLoad
   * @since 4.0.0
  */
  componentDidMount() {
    const { current: el } = this.ref;
    const { namespace = '' } = this.context;
    
    if( el ) {
      void el.offsetWidth;
      el.classList.remove( `${ namespace }-content-idle` );
    }
    
    this.mounted = true;
  }
  
  render() {
    const {
      saving,
      updateAdmin,
      namespace = '',
      page = 'overview',
      softUpdateSuccess,
      softUpdateMessage,
      showSoftUpdateNotice,
    } = this.context;
    
    const preloaderClass = this.mounted ? '' : ` ${ namespace }-content-idle`;
    const savingDataClass = ! saving ? '' : ` ${ namespace }-saving`;
    
    return (
      <>
        <div ref={ this.ref } className={ `${ namespace }-content${ preloaderClass }${ savingDataClass }` }>
          <Header namespace={ namespace } page={ page } />
          <AdminMenu />
          <Page />
        </div>
        { saving && (
          <span className={ `${ namespace }-save-message` }>
            <AltIcon name="coffee" />
            <br /><br />
            { saving }
          </span>
        ) }
        { showSoftUpdateNotice && (
          <SoftUpdateNotice 
            namespace={ namespace }
            success={ softUpdateSuccess }
            message={ softUpdateMessage }
            callback={ () => updateAdmin( { showSoftUpdateNotice: false } ) }
          />
        ) }
      </>
    );
  }
}

Display.contextType = AdminContext;

export default Display;