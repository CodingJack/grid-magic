/**
 * External dependencies.
 */
 import React from 'react';

/**
 * Intenal dependencies.
 */
import RadioGroup from '../../../../../../components/inputs/radio-group';

import {
  dynamicObject,
} from '../../../../../../utils';

const postTypes = [
  { label: 'Posts', slug: 'posts' },
  { label: 'Pages', slug: 'pages' },
];

const PostOptions = ( { 
  namespace = '', 
  values = {}, 
  path = '',
  onChange,
} ) => {
  dynamicObject( values, path, 'type', values, 'posts' );
  const { type = 'posts' } = values;

  return (
    <div className={ `${ namespace }-options` }>
      <RadioGroup 
        namespace={ namespace }
        items={ postTypes } 
        prop="type"
        defValue="posts"
        path={ path }
        value={ type }
        onChange={ onChange } 
      />
    </div>
  );
};

export default PostOptions;