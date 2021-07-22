/**
 * External dependencies.
 */
 import React from 'react';

 /**
 * Internal dependencies.
 */
import SettingsInput from '../../../../components/inputs/settings-input';

const Loading = ( { 
  namespace = '', 
  values = {},
  onChange,
} ) => {
  const {
    name = '',
    alias = '',
    cssId = '',
    extraClasses = '',
  } = values;

  return (
    <>
      <SettingsInput 
        namespace={ namespace }
        prop="name"
        type="text"
        initialValue={ name }
        onChange={ onChange }
        updateOnChange={ true }
      />
      <SettingsInput 
        namespace={ namespace }
        prop="alias"
        type="text"
        initialValue={ alias }
        onChange={ onChange }
      />
      <SettingsInput 
        namespace={ namespace }
        prop="css_id"
        propName="CSS ID"
        type="text"
        initialValue={ cssId }
        onChange={ onChange }
      />
      <SettingsInput 
        namespace={ namespace }
        prop="classes"
        type="text"
        initialValue={ extraClasses }
        onChange={ onChange }
      />
    </>
  );
};

export default Loading;