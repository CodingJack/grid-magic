/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import __ from '../../utils/translate';

const {
  memo,
} = React;

/*
 * @desc content for the "how to use" section
 * @since 0.1.0
*/
const HowToUse = () => {
  const txtPath = 'overview.how_to_use.';
  
  return (
    <p>
      { __( `${ txtPath }txt1` ) } <b>{ __( `${ txtPath }txt2` ) }</b> { __( `${ txtPath }txt3` ) }<br/>
      { __( `${ txtPath }txt1` ) } <b>{ __( `${ txtPath }txt4` ) }</b> { __( `${ txtPath }txt5` ) }
    </p>
  );
};

export default memo( HowToUse );