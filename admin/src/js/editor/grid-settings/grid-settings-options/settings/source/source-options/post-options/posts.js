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
import {
  AdminContext,
} from '../../../../../../../context';

class Posts extends Component {
  constructor() {
    super( ...arguments );
  }
  state = {
    data: false,
  };
  onFetched = data => {
    if( this.unmounted ) {
      return;
    }
    this.setState( { data } );
  };
  componentDidMount() {
    const {
      getPosts,
    } = this.context;
    getPosts( this.onFetched );
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    const { data } = this.state;
    if( ! data ) {
      return null;
    }
    return <div>{ String( data ) }</div>
  }
}
Posts.contextType = AdminContext;

export default Posts;