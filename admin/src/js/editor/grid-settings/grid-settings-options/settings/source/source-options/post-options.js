/**
 * External dependencies.
 */
 import React from 'react';

/**
 * Intenal dependencies.
 */
import RadioGroup from '../../../../../../components/inputs/radio-group';
import Categories from './post-options/categories';

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
  const { source = {} } = values;
  const { options = {} } = source;
  const { post = {} } = options;
  const { type = 'posts' } = post;

  return (
    <div className={ `${ namespace }-options` }>
      <RadioGroup 
        namespace={ namespace }
        items={ postTypes } 
        prop="type"
        path={ path }
        value={ type }
        onChange={ onChange } 
      />
      { type === 'posts' && (
        <Categories />
      ) }
      { type === 'pages' && (
        <div>pages baby</div>
      ) }
    </div>
  );
};

export default PostOptions;