import React from 'react';

import { 
  EditorContext,
} from '../../../../../../../context';

const {
  Fragment,
  useContext,
  useRef,
} = React;

const PageListing = ( { 
  namespace = '',
  thePages = [],
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
    pages:value = [],
  } = options;

  const items = [
    {
      name: 'Pages',
      slug: 'pages',
      data: thePages,
    },
  ];
  return items.map( ( obj, index ) => {
    const {
      name = '',
      slug = '',
      data = [],
    } = obj;

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
                title = {},
                slug = '',
                status = 'publish',
                id = '',
              } = obj;
              if( status !== 'publish' ) {
                return null;
              }
              const { rendered = '' } = title;
              return (
                <option 
                  key={ `${ namespace }-${ slug }-${ i }` }
                  value={ slug }
                >{ `${ rendered } [${ id }]` }</option>
              );
            } ) 
          }
          </select>
        </div>
      </Fragment>
    );
  } );
};

export default PageListing;