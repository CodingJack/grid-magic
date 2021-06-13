let lang;

const __ = ( path = '' ) => {
  if( ! path || typeof path !== 'string' ) {
    return '';
  }
  if( ! lang ) {
    const { translations } = gridMagicData;
    if( translations ) {
      lang = { ...translations };
    }
  }
  let txt = lang || {};
  
  path.split( '.' ).forEach( path => {
    txt = txt[ path ] ? txt[ path ] : ''
  } );
  
  if( typeof txt !== 'string' ) {
    return path;
  }
  return txt || path || '';
};

export default __;