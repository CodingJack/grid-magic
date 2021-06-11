/**
 * External dependencies.
 */
import React from 'react';

/*
 * @desc content for the purchase code registration section
 * @since 4.0.0
*/
const RegistrationInfo = ( { namespace, registered } ) => {
  if( registered ) {
    return(
      <div className={ `${ namespace }-registered` }>
        <div>
          <h4 >How to get support?</h4>
          <p>Visit our <a rel="noreferrer" href="https://www.themepunch.com/support-center/essential-grid" target="_blank">Support Center</a> for the latest FAQs, Documentation and Ticket Support.</p>
        </div>
        <div>
          <h4>Need a license for another site?</h4>
          <p><a rel="noreferrer" href="https://account.essential-grid.com/licenses/pricing/" target="_blank">Visit our online shop</a> to grab a fresh one!</p>
        </div>
      </div>
    );
  }
  return (
    <p className={ `${ namespace }-pad-top-20` }>
      Enter your Essential Grid purchase code / license key to unlock premium features.<br />
      You can find your key by following the instructions on <a rel="noreferrer" href="https://www.themepunch.com/essgrid-doc/installing-essential-grid/" target="_blank">this page</a>.<br />
      Have no regular license for this installation? <a rel="noreferrer" href="https://account.essential-grid.com/licenses/pricing/" target="_blank">Grab a fresh one!</a><br />
      Click Here to get Premium Support and Auto Updates
    </p>
  );
};

export default RegistrationInfo;