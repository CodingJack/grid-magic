/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import IconTitle from '../../../components/headers/icon-title';

/*
 * @desc content for the newsletter subscribe section
 * @since 4.0.0
*/
const NewsletterPerks = ( { namespace = '' } ) => {
  return (
    <>
      <IconTitle
        icon="alt_star"
        color="red"
        text="Perks of subscribing to our Newsletter"
        bold={ true }
        uppercase={ true }
        namespace={ namespace }
      />
      <ul>
        <li>Receive info on the latest ThemePunch product updates</li>
        <li>Be the first to know about new products by ThemePunch and their partners</li>
        <li>Participate in polls and customer surveys that help us increase the quality of our products and services</li>
      </ul>
    </>
  );
};

export default NewsletterPerks;