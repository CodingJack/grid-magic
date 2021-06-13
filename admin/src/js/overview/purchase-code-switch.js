/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import NotificationBox from '../components/containers/notification-box';
import PurchaseCodeRegistration from './notification-content/purchase-code-registration';
import RegistrationBenefits from './notification-content/purchase-code-registration/registration-benefits';
import { AdminContext } from '../context';
import { trueFalse } from '../utils';

const {
  useContext,
} = React;

/*
 * @desc swap purchase code display based on the user action
 * @since 0.1.0
*/
const PurchaseCodeSwitch = () => {
  const context = useContext( AdminContext );
  
  const {
      namespace = '',
      masterData = {},
    } = context;
    
  const {
    plugin = {},
  } = masterData;
    
  const { purchaseCodeRegistered } = plugin;
  const registered = trueFalse( purchaseCodeRegistered );
  
  const color = registered ? 'green' : 'red';
  const icon = registered ? 'check' : 'close';
  const title = registered ? 'Purchase Code Registration' : null;
  const extraClass = registered ? null : `${ namespace }-pad-top-30`;
  
  return (
    <>
      { ! registered && (
        <NotificationBox 
          title="Purchase Code Registration" 
          color="green"
          icon="verified_user"
          placeholderHeight={ 217 }
          namespace={ namespace }
          content={ RegistrationBenefits }
        />
      ) }
      <NotificationBox 
        title={ title }
        color={ color }
        icon={ icon }
        namespace={ namespace }
        extraClass={ extraClass }
        content={ PurchaseCodeRegistration }
        placeholderHeight={ registered ? 275 : 245 }
      />
    </>
  );
};

export default PurchaseCodeSwitch;