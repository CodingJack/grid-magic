/**
 * External dependencies.
 */
import React from 'react';

const {
  memo,
} = React;

/*
 * @desc content for the purchase code registration benefits section
 * @since 4.0.0
*/
const RegistrationBenefits = ( { namespace } ) => {
  return (
    <>
      <h4>Benefits:</h4>
      <p>
        <span className={ `${ namespace }-bold` }>Unlock Features -</span> Gain access to the 60+ Grid Templates and more !<br/>
        <span className={ `${ namespace }-bold` }>Get Premium Support -</span> We help you in case of Bugs, installation problems, and Conflicts with other plugins and Themes.<br/>
        <span className={ `${ namespace }-bold` }>Auto Updates -</span> Get the latest version of our Plugin. New Features and Bug Fixes are available regularly !
      </p>
    </>
  );
};

export default memo( RegistrationBenefits );