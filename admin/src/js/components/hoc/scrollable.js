require('../../../scss/_/_scrollers.scss');

import React from 'react';

/**
 * Internal dependencies.
 */
import {
  number,
  elementRequired,
} from '../../utils/prop-types';

const {
  PureComponent,
} = React;

const namespace = 'gmagic';
let scrollbarSize;

/*
 * @desc caches the browser's scrollbar width needed for calculations
 * @since 4.0.0
*/
const getScrollbarSize = () => {
  const div = document.createElement( 'div' );
  div.className = `${ namespace }-scrollbar-temp`;
  document.body.appendChild( div );
  scrollbarSize = div.offsetWidth - div.clientWidth;
  document.body.removeChild( div );
};

/*
 * @returns "clientY" from pointerdown, touchstart or mousedown
 * @since 4.0.0
*/
const getPoint = e => {
  return e.targetTouches ? e.targetTouches[0].clientY : e.clientY;
};

class Scrollable extends PureComponent {
  constructor() {
    super( ...arguments );
    
    if ( scrollbarSize === undefined ) {
      getScrollbarSize();
    }
    this.value = 0;
    this.handleDown = false;
    
    // events that will be spread into the handle element
    if ( window.PointerEvent ) {
      this.handleEvents = {
        onPointerDown: this.onHandleDown,
        onPointerMove: this.onHandleMove,
        onPointerUp: this.onHandleUp,
        onPointerCancel: this.onHandleUp,
      };
    } else {
      this.handleEvents = {
        onTouchStart: this.onHandleDown,
        onTouchMove: this.onHandleMove,
        onTouchEnd: this.onHandleUp,
        onTouchCancel: this.onHandleUp,
        onMouseDown: this.onHandleDown,
      };
    }
  }
  
  state = {
    hovered: false,
    active: false,
  };
  
  /*
   * @desc user is scrolling the content with the mousehweel or touch
   * @since 4.0.0
  */
  onScroll = e => {
    if ( e ) {
      e.preventDefault();
    }
    window.cancelAnimationFrame( this.requestUpdateScroll );
    
    const { scrollTop } = this.container;
    const handleY = ( ( scrollTop / this.containerHeight ) * this.handleHeight );
    this.handleY = Math.max( 0, 
      Math.min( 
        this.handleDif, 
        handleY 
      )
    );
    if ( e ) {
      this.requestUpdateScroll = window.requestAnimationFrame( this.updateScrollHandle );
    } else {
      this.updateScrollHandle();
    }
  };
  
  /*
   * @desc async paint for non-blocking scroll
   * @since 4.0.0
  */
  updateScrollHandle = () => {
    this.value = this.handleY;
    this.handle.style.marginTop = `${ this.handleY }px`; 
  }
  
  /*
   * @desc scrolls the content when the scrollbar track is clicked
   * @since 4.0.0
  */
  onTrackClick = e => {
    if ( this.handleDown ) {
      this.handleDown = false;
      return;
    }
    e.preventDefault();
    
    const { top: wrapTop } = this.wrap.getBoundingClientRect();
    const pageY = getPoint( e ) - wrapTop;
    
    const scrollY = Math.max( 0, 
      Math.min( 
        pageY - this.handleHeight * 0.5,
        this.handleDif,
      )
    );
    this.handleDown = true;
    this.value = scrollY;
    this.handle.style.marginTop = `${ scrollY }px`;
    this.onHandleDown( e, true );
    this.onHandleMove( e );
    this.handleDown = false;
  }
  
  /*
   * @desc user is about to begin scrolling via the scrollbar
   * @param boolean fromTrack - if the function is triggered manually from the track click event
   * @since 4.0.0
  */
  onHandleDown = ( e, fromTrack ) => {
    if ( e.touches && e.touches.length > 1 ) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    
    this.pageY = getPoint( e );
    this.startY = this.handle.offsetTop;
    
    // if from a track click event we only need to update this.pageY and this.startY
    if ( fromTrack ) {
      return;
    }
    
    this.handleDown = true;
    if ( window.PointerEvent ) {
      e.target.setPointerCapture( e.pointerId );
    } 
    else {
      document.addEventListener( 'mousemove', this.onHandleMove );
      document.addEventListener( 'mouseup', this.onHandleUp );
      document.addEventListener( 'mouseleave', this.onHandleUp );
    }
    
    document.body.classList.add( `${ namespace }-scrolling` );
    this.setState( { active: true } );
  }
  
  /*
   * @desc user is scrolling with the scrollbar handle, 
   *       updates handle position and content's scroll position
   * @since 4.0.0
  */
  onHandleMove = e => {
    if ( ! this.handleDown ) {
      return;
    }
    
    e.preventDefault();
    const pageY = getPoint( e );
    const scrollY = Math.max( 0, 
      Math.min( 
        pageY - this.pageY + this.startY, 
        this.handleDif 
      ) 
    );
    this.container.scrollTop = Math.max( 0, 
      Math.min( 
        ( scrollY / this.handleDif ) * this.contentDif, 
        this.contentDif 
      ) 
    );
    this.value = scrollY;
    this.handle.style.marginTop = `${ scrollY }px`;
  }
  
  /*
   * @desc user has finished scrolling with the scrollbar handle
   * @since 4.0.0
  */
  onHandleUp = e => {
    if ( e.touches && e.touches.length > 0 ) {
      return;
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    this.removeListeners( e );
    this.setState( { active: false, hovered: this.hovered }, () => {
      this.requestResetHandle = window.requestAnimationFrame( this.resetHandle );
    } );
  }
  
  /*
   * @desc async to prevent bubbling to the track click event
   * @since 4.0.0
  */
  resetHandle = () => {
    this.handleDown = false;
  };
  
  /*
   * @desc remove event listeners when scrolling is complete and on unmount
   * @since 4.0.0
  */
  removeListeners( e ) {
    window.cancelAnimationFrame( this.requestUpdateScroll );
    window.cancelAnimationFrame( this.requestResetHandle );
    
    if ( e && window.PointerEvent ) {
      e.target.releasePointerCapture( e.pointerId );
    } 
    else {
      document.removeEventListener( 'mousemove', this.onHandleMove );
      document.removeEventListener( 'mouseup', this.onHandleUp );
      document.removeEventListener( 'mouseleave', this.onHandleUp );
    }
    
    document.body.classList.remove( `${ namespace }-scrolling` );
  }
  
  /*
   * @desc sets the scrollbars background color to its hovered state
   * @since 4.0.0
  */
  onMouseEnter = () => {
    this.hovered = true;
    this.setState( { hovered: true } );
  }
  
  /*
   * @desc resets the scrollbars background color to its static state
   * @since 4.0.0
  */
  onMouseLeave = () => {
    this.hovered = false;
    const { active } = this.state;
    if ( ! active ) {
      this.setState( { hovered: false } );
    }
  }
  
  /*
   * @desc add observers and reset the scrollTop in case it was cached by the browser
   * @since 4.0.0
  */
  componentDidMount() {
    const contentRect = this.content.getBoundingClientRect();
    const { height: contentHeight } = contentRect;
    const { containerHeight } = this.props;
    
    let handleHeight = ( containerHeight / contentHeight ) * containerHeight;
    handleHeight = Math.max( 0, 
      Math.min( 
        handleHeight, 
        containerHeight
      )
    );
    this.handleHeight = handleHeight;
    this.containerHeight = containerHeight;
    this.handleDif = containerHeight - handleHeight;
    this.contentDif = contentHeight - containerHeight;
    this.handle.style.height = `${ handleHeight }px`;
    this.wrap.style.height = `${ containerHeight }px`;
    this.container.scrollTop = 0;
    this.onScroll();
  }
  
  /*
   * @desc clean up for the observers and objects attached to the class
   * @since 4.0.0
  */
  componentWillUnmount() {
    this.removeListeners();
    this.handleEvents = null;
    this.container = null;
    this.content = null;
    this.handle = null;
    this.wrap = null;
  }
  
  render() {
    const { 
      scrollbarSpacing = 25,
      scrollbarWidth = 10,
      children,
    } = this.props;
    
    const { 
      active, 
      hovered,
    } = this.state;
    
    let handleClass;
    if ( ! active && ! hovered ) {
      handleClass = '';
    } else {
      handleClass = active ? 'active' : 'hover';
      handleClass = ` ${ namespace }-scroll-handle-${ handleClass }`;
    }
    
    const trackStyle = { 
      width: `${ scrollbarWidth }px`,
    };
    
    const contentStyle = { 
      width: `calc(100% - 200px + ${ scrollbarWidth + scrollbarSpacing - scrollbarSize }px)`,
    };
    
    const panelId = `gmagic-${ Math.floor( Math.random() * 100000 ) }`;
    const attrs = {
      'aria-controls': panelId,
      'aria-valuenow': this.value,
    };
    
    return (
      <div 
        className={ `${ namespace }-scroll-wrap` }
        ref={ wrap => ( this.wrap = wrap ) }
      >
        <div 
          className={ `${ namespace }-scroll-inner` }
          ref={ container => ( this.container = container ) }
          onScroll={ this.onScroll }
        >
          <div 
            id={ panelId }
            className={ `${ namespace }-scroll-content` }
            ref={ content => ( this.content = content ) }
            style={ contentStyle }
          >{ children }</div>
          <span 
            className={ `${ namespace }-scrollbar-wrap` }
            onClick={ this.onTrackClick }
          >
            <span 
              className={ `${ namespace }-scrollbar` } 
              style={ trackStyle }
            >
              <span 
                role="scrollbar"
                tabIndex="0"
                className={ `${ namespace }-scrollbar-handle-wrap` }
                ref={ handle => ( this.handle = handle ) }
                onMouseEnter={ this.onMouseEnter }
                onMouseLeave={ this.onMouseLeave }
                { ...this.handleEvents }
                { ...attrs }
              >
                <span className={ `${ namespace }-scrollbar-handle${ handleClass }` }></span>
              </span>
            </span>
          </span>
        </div>
      </div>
    );
  }
}

Scrollable.propTypes = {
  // required
  children: elementRequired,
  
  // optional
  scrollbarSpacing: number,
  scrollbarWidth: number,
  
};

export default Scrollable;
