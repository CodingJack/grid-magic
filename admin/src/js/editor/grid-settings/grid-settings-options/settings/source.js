/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import RadioGroup from '../../../../components/inputs/radio-group';
import SourceOptions from './source/source-options';

const sources = {
  custom: { 
    label: 'Custom', 
    slug: 'custom',
    options: {},
  }, 
  post: { 
    label: 'Post-Based', 
    slug: 'post',
    options: {
      type: {
        posts: {
          categories: '',
          match: 'or',
          max: -1,
        },
        pages: [],
      }
    },
  },
  stream: {
    label: 'Stream', 
    slug: 'stream',
    options: {},
  }, 
};

const sourceMenu = Object.keys( sources ).map( key => {
  const { label, slug } = sources[ key ];
  return { label, slug };
} );

const Source = ( { 
  namespace = '', 
  values = {},
  onChange,
} ) => {
  const { source = {} } = values;
  const { options = {} } = source;
  const { type = 'custom' } = options;

  return (
    <>
      <RadioGroup 
        namespace={ namespace }
        items={ sourceMenu } 
        prop="type"
        path="source.options"
        defValue={ type }
        value={ type }
        onChange={ onChange } 
        spaceEvenly={ true }
      />
      <SourceOptions 
        namespace={ namespace }
        type={ type }
        values={ values }
        path="source.options"
        onChange={ onChange }
      />
    </>
  );
};

export default Source;