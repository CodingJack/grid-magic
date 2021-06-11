/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../components/icons/icon';

import {
  bool,
  string,
  stringRequired,
} from '../utils/prop-types';

const { 
  Component,
  createRef,
} = React;

/*
 * @desc the little notice that pops in from the top-right after a REST call ius complete
 * @since 4.0.0
*/
class SoftUpdateNotice extends Component {
  constructor() {
    super( ...arguments );
    this.ref = createRef( null );
  }
  
  componentDidMount() {
    const { current } = this.ref;
    if( current ) {
      const { namespace } = this.props;
      void current.offsetWidth;
      this.shown = true;
      current.classList.add( `${ namespace }-update-notice-show` );
    }
  }
  
  hideMe = () => {
    if( this.ignoreTransitionEvents ) {
      return;
    }
    if( this.shown ) {
      this.timer = setTimeout( () => {
        const { namespace = '' } = this.props;
        const { current } = this.ref;

        if( current ) {
          current.classList.remove( `${ namespace }-update-notice-show` );
        }
        this.shown = false;
      }, 2000 );
    } else {
      // initiate unmount
      const { callback } = this.props;
      callback( true );
    }
  };
  
  componentWillUnmount() {
    clearTimeout( this.timer );
    this.ignoreTransitionEvents = true;
    this.ref = null;
  }
  
  render() {
    const {
      namespace = '',
      message = '',
      success = false,
    } = this.props;
    
    const icon = success ? 'check' : 'close';
    const color = success ? 'green' : 'red';
    
    return (
      <div 
        ref={ this.ref } 
        className={ `${ namespace }-update-notice ${ namespace }-flex-solid` } 
        role="alert"
        onTransitionEnd={ this.hideMe }
      >
        <span className={ `${ namespace }-update-notice-icon ${ namespace }-${ color }` }>
          <Icon name={ icon } color="white" />
        </span>{ message }
      </div>
    );
  }
}

SoftUpdateNotice.propTypes = {
  namespace: stringRequired,
  success: bool,
  message: string,
};

export default SoftUpdateNotice;