import React from 'react';

import { 
  EditorContext,
} from '../../../../../../../context';

const {
  Fragment,
  useContext,
  useRef,
} = React;

const PostCats = ( { 
  namespace = '',
  theCategories = [],
  theTags = [],
} ) => {
  const id = `${ namespace }-all-categories`;
  const context = useContext( EditorContext );
  const { 
    curGrid = {},
    onChange,
  } = context;
  const { source = {} } = curGrid;
  const { options = {} } = source;

  const { 
    categories = [],
    tags = [],
  } = options;
  const items = [
    {
      name: 'Categories',
      slug: 'categories',
      data: theCategories,
    },
    {
      name: 'Tags',
      slug: 'tags',
      data: theTags,
    },
  ];
  return items.map( ( obj, index ) => {
    const {
      name = '',
      slug = '',
      data = [],
    } = obj;
    const value = slug === 'categories' ? [ ...categories ] : [ ...tags ];

    const ref = useRef( null );
    return (
      <Fragment key={ `${ namespace }-${ name }-${ index }` }>
        <div className={ `${ namespace }-pad-top-10` }>
          <label htmlFor={ id }>{ name }</label>
        </div>
        <div className={ `${ namespace }-pad-top-5` }>
          <select 
            ref={ ref }
            id={ id } 
            onChange={ () => {
              const { current } = ref;
              if ( current ) {
                const options = Array.from( current.options )
                  .filter( option => option.selected )
                  .map( option => option.value );
                  
                onChange( slug, options, `source.options` );
              }
            } }
            value={ value }
            multiple
          >
          { 
            data.map( ( obj = {}, i ) => {
              const { 
                name = '',
                slug = '',
              } = obj;
              return (
                <option 
                  key={ `${ namespace }-${ slug }-${ i }` }
                  value={ slug }
                >{ name }</option>
              );
            } ) 
          }
          </select>
        </div>
      </Fragment>
    );
  } );
};

export default PostCats;