/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Button from '../../components/buttons/button';
import __ from '../../utils/translate';

import {
  AdminContext,
} from '../../context';

const {
  memo,
  useContext,
} = React;

/*
 * @desc content for the version info section
 * @since 0.1.0
*/
const VersionInformation = () => {
  const context = useContext( AdminContext );
  const { version = '0.1.0' } = gridMagicData;
  
  const {
    namespace = '',
    masterData = {},
  } = context;
  
  const { availableVersion = version } = masterData;
  const txtPath = 'overview.version_info.';
  
  return (
    <div className={ `${ namespace }-flex ${ namespace }-flex-end` }>
      <div className={ `${ namespace }-pad-right-20` }>
        <p>
          { __( `${ txtPath }installed` ) }: { version }<br/>
          { __( `${ txtPath }available` ) }: { availableVersion }
        </p>
      </div>
      <Button 
        namespace={ namespace }
        text={ __( `${ txtPath }check_version` ) }
        color="purple"
        onClick={ () => {} }
      />
    </div>
  );
};

export default memo( VersionInformation );