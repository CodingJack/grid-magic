/**
 * External dependencies.
 */
import React from 'react';

/**
 * Intenal dependencies.
 */
import PostOptions from './source-options/post-options';

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
        <div>custom</div>
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