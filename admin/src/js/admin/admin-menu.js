/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Tab from '../components/buttons/tab';

import {
  AdminContext,
} from '../context';

import {
  adminMenu,
} from '../data/menus';

import {
  capitalize,
} from '../utils';

const {
  useContext,
} = React;

/*
 * @desc the main tab menu for the admin
 * @since 4.0.0
*/
const AdminMenu = () => {
  const context = useContext( AdminContext );
  const {
    namespace = '',
    page = 'overview',
    gridLength = 0,
    changePage,
  } = context;
  
  return (
    <div className={ `${ namespace }-menu` } { ...{ 'role': 'tablist' } }>
    {
      adminMenu.map( ( tab, i ) => {
        const { icon, section } = tab;
        let clas;
        if( ! gridLength && section === 'editor' ) {
          clas = `${ namespace }-hide`;
        }
        return (
          <Tab
            key={ `${ namespace }-menu-admin-${ section }-${ i }` }
            namespace={ namespace }
            icon={ icon }
            text={ capitalize( section ) }
            section={ section }
            selected={ section === page }
            onClick={ () => changePage( section ) }
            extraClass={ clas }
          />
        );
      } )
    }
    </div>
  );
};

export default AdminMenu;