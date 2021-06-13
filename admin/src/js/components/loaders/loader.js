import React from 'react';

import { 
  AppContext,
} from '../../context';

const { 
  Component,
} = React;

/*
 * @desc loads the additional .js chunks
 * @since 0.1.0
*/
class Loader extends Component {
  constructor() {
    super( ...arguments );
  }
  
  state = {
    Module: null,
  }

  async componentDidMount() {
    if( ! this.unmounted ) {
      const { resolve } = this.props;
      const { default: Module } = await resolve();
      this.setState( { Module } );
    }
  }
  
  // needed because the async bove will still fire after unmount
  componentWillUnmount() {
    this.unmounted = true;
  }

  render() {
    const { namespace = '' } = this.context;
    const { Module } = this.state;
    
    if ( ! Module ) {
      return <div className={ `${ namespace }-lazyload-placeholder` }></div>;
    }

    const { children } = this.props;
    return <Module { ...this.props }>{ children }</Module>;
  }
}

Loader.contextType = AppContext;

export default Loader;
