/**
 * External dependencies.
 */
 import React from 'react';

/**
 * Intenal dependencies.
 */
import RadioGroup from '../../../../../../components/inputs/radio-group';

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
  const { post = {} } = values;
  const { type = 'posts' } = post;

  return (
    <div className={ `${ namespace }-options` }>
      <RadioGroup 
        namespace={ namespace }
        items={ postTypes } 
        prop="type"
        defValue={ type }
        path={ path }
        value={ type }
        onChange={ onChange } 
      />
    </div>
  );
};

export default PostOptions;