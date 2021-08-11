/**
 * External dependencies.
 */
import React from 'react';

const { 
  Component,
} = React;

/**
 * Internal dependencies.
 */
import PageListing from './page-listing';
import {
  AdminContext,
} from '../../../../../../../context';

let thePages;

class Pages extends Component {
  constructor() {
    super( ...arguments );
  }
  state = {
    data: false,
  };
  display = () => {
    const { namespace = '' } = this.context;
    this.setState( { data: () => (
      <PageListing 
        namespace={ namespace } 
        thePages={ thePages }
      />
    ) } );
  };
  onFetched = ( pages = [] ) => {
    thePages = [ ...pages ];
    if( ! this.unmounted ) {
      this.display();
    }
  };
  componentDidMount() {
    if( ! thePages ) {
      const {
        getPages,
      } = this.context;
      getPages( this.onFetched );
    } else {
      this.display();
    }
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    const { data:Data } = this.state;
    if( ! Data ) {
      const { namespace = '' } = this.context;
      return (
        <div className={ `${ namespace }-basic-spinner-wrap` }>
          <div className={ `${ namespace }-basic-spinner` }></div>
        </div>
      );
    }
    return <Data />;
  }
}
Pages.contextType = AdminContext;

export default Pages;