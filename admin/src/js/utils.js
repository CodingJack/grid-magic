/**
 * External dependencies.
 */
const merge = require( 'lodash.merge' );

/*
 * @desc convert "a_prop" and "a-prop" to "aProp". caps arg would equal "AProp".
 * @since 0.1.0
*/
const camelCase = ( st, caps ) => {
  const str = 
    st && typeof st === 'string' ? 
      st.replace( /-|_([a-z])/g, g => g[1] ? g[1].toUpperCase() : '' ) : 
      '';
      
  return ! caps ? str : capitalize( str );
}

/*
 * @desc return string with first letter capitalized
 * @since 0.1.0
*/
const capitalize = st => {
  return st && typeof st === 'string' ? 
    `${ st.charAt(0).toUpperCase() }${ st.slice(1) }` : 
    '';
};

/*
 * @desc convert a name/title to a slug
 * @since 0.1.0
*/
const toSlug = val => {
  return val && typeof val === 'string' ? 
    val.toLowerCase().split( ' ' ).join( '-' ).replace( '#', '' ) : 
    '';
};

/*
 * @desc convert a name/title to a slug
 * @since 0.1.0
*/
const toPropName = prop => {
  if( ! prop || typeof prop !== 'string' ) {
    return '';
  }
  return prop.split( '_' ).map( word => capitalize( word ) ).join( ' ' );
};

/*
 * @desc verify function
 * @since 0.1.0
*/
const isFunction = func => {
  return {}.toString.call( func ) === '[object Function]';
};

const dymanicObject = ( obj, path, prop, value, defValue ) => {
  const paths = path.split( '.' );
  let scrubber = cloneObj( obj );
  let crawler = cloneObj( obj );
  let point;
  let deep;
  let pushed;

  paths.reduce( ( itm, val ) => {
    if( itm[ val ] ) {
      deep = itm[ val ];
      crawler[ val ] = deep;
      if( ! point ) {
        point = obj;
      }
      return itm[ val ];
    } else {
      scrubber[ val ] = {};
      scrubber = scrubber[ val ];
      if( ! pushed ) {
        crawler[ val ] = scrubber;
        pushed = true;
      }
      deep = scrubber;
      return itm;
    }
  }, scrubber );
  if( deep ) {
    if( value !== defValue ) {
      deep[ prop ] = value;
    } else {
      delete deep[ prop ];
      if( isObject( point ) ) {
        console.log(point);
        delete point[ prop ];
      }
    }
  }
  const merged = Object.assign( {}, obj, crawler );
  const a = merge( obj, merged );
  console.log(a);
  return a;
}

/*
 * @desc verify traditional object
 * @since 0.1.0
*/
const isObject = obj => {
  return obj !== null && 
    typeof obj === 'object' && 
    ! Array.isArray( obj ) && 
    ! isFunction( obj );
};

/*
 * @desc handle possible string value for boolean
 * @since 0.1.0
*/
const trueFalse = val => {
  return val === true || val === 'true' || val === 1 || val === '1';
};

/*
 * @desc find indexes of a query in an array
 * @since 0.1.0
*/
const findMatches = ( arr = [], query = '' ) => {
  if( ! Array.isArray( arr ) || typeof query !== 'string' ) {
    return [];
  }
  const matches = [];
  
  arr.forEach( ( itm, index ) => {
    if( itm.indexOf( query ) !== -1 ) {
      matches.push( index );
    }
  } );
  
  return matches;
};

/*
 * @desc generate a hard formatted timestamp
 * @since 0.1.0
*/
const getTimeStamp = () => {
  const curDate = new Date( Date.now() );
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const day = curDate.getDay();
  const hour = curDate.getHours();
  const min = curDate.getMinutes();
  
  return `${ year } ${ month } ${ day } ${ hour } ${ min }`;
};

/*
 * @desc convert a month - PRIVATE
 * @since 0.1.0
*/
const toMonth = i => {
  let index = parseInt( i, 10 );
  index = ! isNaN( index ) ? index : 0;
  const months = [ 
    'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec',
  ];
  return `${ capitalize( months[ index ] ) }.`;
};

/*
 * @desc convert a day - PRIVATE
 * @since 0.1.0
*/
const toDay = i => {
  let index = parseInt( i, 10 );
  index = ! isNaN( index ) ? index : 0;
  const days = [ 
    'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat',
  ];
  return `${ capitalize( days[ index ] ) }.`;
};

/*
 * @desc convert a day to its short version - PRIVATE
 * @since 0.1.0
*/
const toShortDay = i => {
  let index = parseInt( i, 10 );
  index = ! isNaN( index ) ? index : 0;
  const abbv = [ 
    'th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th',
  ];
  
  let lastNum = index.toString();
  lastNum = lastNum.charAt( lastNum.length - 1 );
  return `${ index }${ abbv[ lastNum ] }`;
};

/*
 * @desc hour prefix for readable date - PRIVATE
 * @since 0.1.0
*/
const hourPrefix = time => {
  const hour = time === 0 ? 12 : time > 12 ? ( 24 - time ) : time;
  return hour < 10 ? hour.toString().padStart( 1, '0' ) : hour;
};

/*
 * @desc hour suffix for readable date - PRIVATE
 * @since 0.1.0
*/
const hourSuffix = hour => {
  return hour < 13 ? 'AM' : 'PM';
};

/*
 * @desc hour suffix for readable date - PRIVATE
 * @since 0.1.0
*/
const toFullMinutes = min => {
  return min < 10 ? min.toString().padStart( 1, '0' ) : min;
};

/*
 * @desc convert our hard formatted date into readable text
 * @since 0.1.0
*/
const convertDate = theDate => {
  const date = String( theDate ).trim().split( ' ' );
  const times = [ 
    'year', 'month', 'day', 'hour', 'min',
  ];
  const allTimes = {};
  
  date.forEach( ( theTime, index ) => {
    allTimes[ times[ index ] ] = parseInt( theTime, 10 );
  } );  
  const { year, month, day, hour, min } = allTimes;
  return `${ toDay( day ) } ${ toMonth( month ) } ${ toShortDay( day ) }, ${ year } ${ hourPrefix( hour ) }:${ toFullMinutes( min ) } ${ hourSuffix( hour ) }`;
};

/*
 * @desc set a cookie
 * @since 0.1.0
*/
const setCookie = ( prop, value ) => {
  document.cookie = `${ prop }=${ value }`;
};

/*
 * @desc get a cookie
 * @since 0.1.0
*/
const getCookie = ( cookie, devValue ) => {
  let value = document.cookie;
  if( value ) {
    value = value
      .split('; ')
      .find( row => row.startsWith( `${ cookie }=` ) );
      
    if( value ) {
      value = value.split( '=' );
      return value.length > 1 && value[1] !== '0' ? value[1] : devValue;
    }
  }
  return devValue;
}

/*
 * @desc deep clone
 * @since 0.1.0
*/
const cloneObj = obj => {
  return JSON.parse( JSON.stringify( obj ) );
};

/*
 * @desc convert a wildcard string to number - PRIVATE
 * @since 0.1.0
*/
const sanitizeString = ( str = '', replace = '', toNumber = false ) => {
  const st = String( str )
    .replace( replace, '' )
    .toLowerCase()
    .trim()
    .split( ' ' )
    .join( '' );
  
  if( ! toNumber ) {
    return st;
  }
  const num = parseInt( st, 10 );
  return ! isNaN( num ) ? num : 0;
};

/*
 * @desc sort in place by Boolean, args already sanitized, PRIVATE
 * @since 0.1.0
*/
const sortByBooleans = ( ar, obj, prop ) => {
  ar.sort( ( keyA, keyB ) => {
    const { [ prop ]: valueA } = obj[ keyA ];
    const { [ prop ]: valueB } = obj[ keyB ];
    const a = trueFalse( valueA );
    const b = trueFalse( valueB );
    return a > b ? 1 : a < b ? -1 : 0;
  } );
};

/*
 * @desc sort in place by Numbers, args already sanitized, PRIVATE
 * @since 0.1.0
*/
const sortByNumbers = ( ar, obj, prop, replace ) => {
  ar.sort( ( keyA, keyB ) => {
    let valA = keyA;
    let valB = keyB;
    
    if( prop !== 'id' ) {
      const { [ prop ]: valueA } = obj[ keyA ];
      const { [ prop ]: valueB } = obj[ keyB ];
      valA = valueA;
      valB = valueB;
    }
    const a = sanitizeString( valA, replace, true );
    const b = sanitizeString( valB, replace, true );
    return a > b ? 1 : a < b ? -1 : 0;
  } );
};

/*
 * @desc sort in place by Strings, args already sanitized, PRIVATE
 * @since 0.1.0
*/
const sortByStrings = ( ar, obj, prop ) => {
  ar.sort( ( keyA, keyB ) => {
    const { [ prop ]: valueA } = obj[ keyA ];
    const { [ prop ]: valueB } = obj[ keyB ];
    const a = sanitizeString( valueA );
    const b = sanitizeString( valueB );
    return a > b ? 1 : a < b ? -1 : 0;
  } );
};

/*
 * @desc sort objects by their keys or an arbitrary prop
 * @since 0.1.0
*/
const sortObject = (
  prop = 'favorite', 
  sortBy = 'string',
  arVal = [],
  objVal = {}, 
  selected = false,
  replaceVal = '',
) => {
  const ar = Array.isArray( arVal ) ? arVal.slice() : [];
  const obj = isObject( objVal ) ? objVal : {};
  
  switch( sortBy ) {
    case 'number':
      sortByNumbers( ar, obj, prop, String( replaceVal ) );
      break;
    case 'boolean':
      sortByBooleans( ar, obj, prop );
      break;
    case 'string':
      sortByStrings( ar, obj, prop );
      break;
  }
  if( ! selected ) {
    ar.reverse();
  }

  const newObj = {};  
  ar.forEach( key => {
    newObj[ key ] = { ...obj[ key ] };
  } );

  return newObj;
};

export {
  toSlug,
  cloneObj,
  isObject,
  isFunction,
  camelCase,
  capitalize,
  trueFalse,
  findMatches,
  convertDate,
  setCookie,
  getCookie,
  getTimeStamp,
  sortObject,
  toPropName,
  dymanicObject,
};