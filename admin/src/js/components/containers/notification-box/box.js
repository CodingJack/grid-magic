/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../../icons/icon';

import {
  string,
  stringRequired,
  elementTypeRequired,
} from '../../../utils/prop-types';

const {
  useRef,
  useEffect,
} = React;

const Box = ( {
  namespace = '', 
  color = 'aqua', 
  icon = 'info', 
  content: Content,
} ) => {
  const ref = useRef( null );
  
  useEffect( () => {
    const { current } = ref;
    if( current ) {
      void current.offsetWidth;
      current.classList.remove( `${ namespace }-info-box-unmounted` );
    }
  }, [] );
  
  return (
    <div ref={ ref } className={ `${ namespace }-info-box ${ namespace }-info-box-unmounted` }>
      <div className={ `${ namespace }-icon-box ${ namespace }-${ color }` }>{ icon && <Icon name={ icon } /> }</div>
      <div className={ `${ namespace }-info-content` }>
        <Content namespace={ namespace } />
      </div>
    </div>
  )  
};

Box.propTypes = {
  // required
  namespace: stringRequired,
  content: elementTypeRequired,
  
  // wildcards
  color: string,
  icon: string,
};

export default Box;