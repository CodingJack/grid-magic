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
 * @since 0.1.0
*/
const NewsletterPerks = ( { namespace = '' } ) => {
  return (
    <>
      <IconTitle
        icon="alt_star"
        color="#C53A58"
        text="Perks of subscribing to our Newsletter"
        bold={ true }
        uppercase={ true }
        namespace={ namespace }
      />
      <ul>
        <li>Receive info on the latest CodingJack product updates</li>
        <li>Be the first to know about new products by CodingJack and their partners</li>
        <li>Participate in polls and customer surveys that help us increase the quality of our products and services</li>
      </ul>
    </>
  );
};

export default NewsletterPerks;