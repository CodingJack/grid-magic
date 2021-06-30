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
  //console.log({...values});
  //console.log(path);
  dynamicObject( values, path, 'type', values, 'posts' );

  //console.log({...values});

  const { type = 'posts' } = values;

  //console.log('the type = ');
  //console.log(type);
  //console.log('');

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