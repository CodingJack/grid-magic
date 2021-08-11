import React from 'react';

const {
  Fragment,
} = React;

const PostCats = ( { 
  namespace = '',
  theCategories = [],
  theTags = [],
} ) => {
  const id = `${ namespace }-all-categories`;
  const items = [
    {
      name: 'Categories',
      data: theCategories,
    },
    {
      name: 'Tags',
      data: theTags,
    },
  ];
  return items.map( ( obj, index ) => {
    const {
      name = '',
      data = [],
    } = obj;
    return (
      <Fragment key={ `${ name }-${ index }` }>
        <div className={ `${ namespace }-pad-top-10` }>
          <label htmlFor={ id }>{ name }</label>
        </div>
        <div className={ `${ namespace }-pad-top-5` }>
          <select id={ id } multiple>
          { 
            data.map( ( obj = {} ) => {
              const { 
                name = '',
                slug = '',
              } = obj;
              return (
                <option 
                  key={ slug }
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