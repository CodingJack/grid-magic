/**
 * External dependencies.
 */
import React from 'react';
import LazyLoad from 'react-lazyload';

/**
 * Internal dependencies.
 */
import Box from './notification-box/box';
import ErrorMessage from '../../error/error-message';

import {
  string,
  number,
  stringRequired,
  elementTypeRequired,
} from '../../utils/prop-types';

/*
 * our LazyLoad component needs its "resize" option enabled, as their scrollUpdate event doesn't fire onResize always
 * here we just set the title and the placeholder until the container's svg and content are loaded
*/

/*
 * @desc a custom container with display options that gets lazyloaded
 * @since 0.1.0
*/

const NotificationBox = ( {
  namespace = '', 
  extraClass = '', 
  title = '', 
  color = 'aqua', 
  icon = 'info',
  viewportOffset = 100,
  placeholderHeight = 100,
  content: Content,
} ) => {
  if( ! Content ) {
    return (
      <ErrorMessage 
        namespace={ namespace } 
        message={ `${ title } content does not exist` }
      />
    );
  }
  
  const clas = extraClass ? ` ${ extraClass }` : '';
  
  return(
    <div className={ `${ namespace }-notification-box${ clas }` }>
      { title && <h3>{ title }</h3> }
      <LazyLoad 
        height={ placeholderHeight }
        offset={ viewportOffset }
        unmountIfInvisible={ true }
        resize={ true }
        classNamePrefix={ `${ namespace }-lazyload` }
      >
        <Box 
          namespace={ namespace }
          color={ color }
          icon={ icon }
          content={ Content } 
        />
      </LazyLoad>
    </div>
  );
};

NotificationBox.propTypes = {
  // required
  namespace: stringRequired,
  content: elementTypeRequired,
  
  // wildcards
  extraClass: string,
  title: string,
  color: string,
  icon: string,
  viewportOffset: number,
  placeholderHeight: number,
};

export default NotificationBox;