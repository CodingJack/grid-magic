/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import NewsletterPerks from './newsletter/newsletter-perks';
import InputText from '../../components/inputs/input-text';
import Button from '../../components/buttons/button';
import BasicSpinner from '../../components/spinners/basic-spinner';
 
import {
  AdminContext,
} from '../../context';

import {
  emailRegExp,
} from '../../utils/regexp';

const {
  useState,
  useContext,
} = React;

/*
 * @desc the newsletter subscribe section
 * @since 4.0.0
*/
const Newsletter = () => {
  const context = useContext( AdminContext );
  
  const {
    softUpdate, 
    namespace = '',
  } = context;
  
  const [
    email,
    updateEmail,
  ] = useState( '' );
  
  const [
    view,
    updateView,
  ] = useState( 'subscribe' );
  
  const [
    loading,
    updateLoading,
  ] = useState( false );
  
  const label = `${ namespace }-newsletter-email`;
  
  const onSubscribe = () => {
    updateLoading( true );
    softUpdate( { 
        email, 
        subscribe: view === 'subscribe', 
      },
      'newsletter',
      () => updateLoading( false ),
    );
  };

  return (
    <>
      <h4 id={ label }>Join 15,000 others on the CodingJack mailing list</h4>
      <div className={ `${ namespace }-flex ${ namespace }-pad-top-10` }>
        <InputText 
          namespace={ namespace }
          placeholder="Enter your Email here"
          value={ email }
          ariaLabel={ label }
          extraClass={ `${ namespace }-input-long ${ namespace }-pad-right-10` }
          onChange={ e => updateEmail( e.target.value ) }
        />
        { view === 'subscribe' && (
          <>
            <Button 
              text="Subscribe"
              color="purple"
              namespace={ namespace }
              extraClass={ `${ namespace }-pad-right-10` }
              disabled={ ! emailRegExp.test( email ) }
              onClick={ onSubscribe }
            />
            { loading && <BasicSpinner namespace={ namespace } /> }
          </>
        ) }
        { view !== 'subscribe' && (
          <>
            <Button 
              text="Unsubscribe"
              color="red"
              namespace={ namespace }
              extraClass={ `${ namespace }-pad-right-10` }
              onClick={ onSubscribe }
              disabled={ ! emailRegExp.test( email ) }
            />
            <Button 
              text="Cancel"
              color="green"
              namespace={ namespace }
              extraClass={ `${ namespace }-pad-right-10` }
              onClick={ () => updateView( 'subscribe' ) }
            />
            { loading && <BasicSpinner namespace={ namespace } /> }
          </>
        ) }
      </div>
      { view === 'subscribe' && (
        <p className={ `${ namespace }-pad-top-5` }>
          <a 
            href="#" 
            className={ `${ namespace }-subtle ${ namespace }-underline` }
            onClick={ e => {
              e.stopPropagation();
              e.preventDefault();
              updateView( 'unsubscribe' );
            } }
          >unsubscibe from newsletter</a>
        </p>
      ) }
      <NewsletterPerks namespace={ namespace } />
    </>
  );
};

export default Newsletter;