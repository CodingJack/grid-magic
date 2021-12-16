/**
 * External dependencies.
 */
import React from 'react';
import jss from 'jss';

/**
 * Internal dependencies.
 */
import ColsRowsControls from './cols-rows-controls';

import {
  EditorContext,
} from '../../context';

const {
  useContext,
} = React;

const GridPreviewItems = ( { 
  namespace = '',
  curGrid = {},
  columns = 4,
  rows = 3,
  breakpoint = 'desktop',
} ) => {
  const context = useContext( EditorContext );
  const { onChange } = context;

  const x = columns > 1 ? columns : 1;
  const y = columns > 1 ? rows : 1;
  
  const colsInt = parseInt( x, 10 );
  const rowsInt = parseInt( y, 10 );

  let cPerc = ( 100 / parseInt( colsInt, 10 ) ).toFixed( 2 );
  const colsPerc = new Array( colsInt );
  const rowsPerc = new Array( rowsInt );

  colsPerc.fill( `${ cPerc }%` );
  rowsPerc.fill( 'auto' );
  
  const padding = ( colsInt - 1 ) * 20;
  const styles = {
    'grid-items': {
      display: 'grid',
      width: `calc(100% - ${ padding }px)`,
      height: 'calc( 100vh - 262px )',
      'grid-gap': '20px',
      'grid-template-columns': colsPerc.join( ' ' ),
      'grid-template-rows': rowsPerc.join( ' ' ),
      'margin-bottom': '20px',
    },
  };

  const { classes } = jss.createStyleSheet( styles ).attach();
  const {
    [ 'grid-items' ]:gridItemsClass,
  } = classes;

  // will eventually hold skin + content
  let { items = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ] } = curGrid;

  // need to add pagination here
  items.length = columns * rows;

  const onUpdate = ( prop, value ) => {
    onChange( prop, value, `layout.${ breakpoint }` )
  };

  return (
    <>
      <div className={ `${ namespace }-grid-preview-controls` }>
        <ColsRowsControls 
          namespace={ namespace }
          columns={ columns } 
          rows={ rows } 
          callback={ onUpdate } 
        />
      </div>
      <div className={ gridItemsClass }>
      {
        items.map( ( itm, i ) => {
          return <div key={ `${ namespace }-grid-item-${ i }` } className={ `${ namespace }-grid-preview-item` }></div>
        })
      }
      </div>
    </>
  );
};

export default GridPreviewItems;