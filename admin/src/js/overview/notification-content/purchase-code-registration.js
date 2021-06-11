/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Button from '../../components/buttons/button';
import InputText from '../../components/inputs/input-text';
import RegistrationInfo from './purchase-code-registration/registration-info';
import { AdminContext } from '../../context';
import { trueFalse } from '../../utils';

const {
  useState,
  useContext,
} = React;

/*
 * @desc the purchase code registration section
 * @since 4.0.0
*/
const PurchaseCodeRegistration = () => {
  const context = useContext( AdminContext );
  
  const {
    namespace = '',
    masterData = {},
    updateData,
  } = context;
    
  const {
    plugin = {},
  } = masterData;
    
  const {
    purchaseCode = '',
    purchaseCodeRegistered,
  } = plugin;
  
  const [
    code,
    updateCode,
  ] = useState( purchaseCode );
  
  const registered = trueFalse( purchaseCodeRegistered );
  const btnText = registered ? 'Deactivate' : 'Activate';
  const btnColor = registered ? 'green' : 'red';
  const message = registered ? 'Deactivating' : 'Activating';
  const label = `${ namespace }-purchase-code-registration`;
  
  return (
    <>
      <h4 id={ label }>Purchase code:</h4>
      <div className={ `${ namespace }-flex ${ namespace }-pad-top-10` }>
        <InputText 
          namespace={ namespace }
          value={ code }
          ariaLabel={ label }
          readonly={ registered }
          extraClass={ `${ namespace }-input-long ${ namespace }-pad-right-10` }
          onChange={ e => updateCode( e.target.value ) }
        />
        <Button 
          namespace={ namespace }
          text={ btnText }
          color={ btnColor }
          extraClass={ `${ namespace }-pad-right-20` }
          onClick={ () => {
            updateData(
              { plugin: { purchaseCodeRegistered: ! registered } }, 
              `${ message } Purchase Code...`,
              true,
            )
          } }
        />
      </div>
      <RegistrationInfo namespace={ namespace } registered={ registered } />
    </>
  );
};

export default PurchaseCodeRegistration;