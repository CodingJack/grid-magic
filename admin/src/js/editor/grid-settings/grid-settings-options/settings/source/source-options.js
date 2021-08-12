/**
 * External dependencies.
 */
import React from 'react';

/**
 * Intenal dependencies.
 */
import PostOptions from './source-options/post-options';
import Icon from '../../../../../components/icons/icon';
const { 
  imgPath = '',
} = gridMagicData;
const style = {
  backgroundImage: `url(${ imgPath }lion.jpg)`,
};

const SourceOptions = ( { 
  namespace = '', 
  type = 'custom', 
  values = {}, 
  path = '',
  onChange,
} ) => {
  return (
    <>
      { type === 'custom' && (
        <a 
          className={ `${ namespace }-additem` }
          href="#"
          onClick={ e => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <span style={ style }></span>
          <Icon name="checked" color="white" />
        </a>
      ) }
      { type === 'post' && (
        <PostOptions 
          namespace={ namespace }
          values={ values }
          path={ `${ path }.post` }
          onChange={ onChange }
        /> 
      ) }
      { type === 'stream' && (
        <div>stream</div>
      ) }
    </>
  );
};

export default SourceOptions;