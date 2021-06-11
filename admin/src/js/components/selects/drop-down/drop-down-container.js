/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import DropDownItm from './drop-down-container/drop-down-itm';

import {
  string,
  objectRequired,
  arrayRequired,
  funcRequired,
  stringRequired,
} from '../../../utils/prop-types';

const {
  Component,
} = React;

class DropDownContainer extends Component {
  constructor() {
    super( ...arguments ); 
  }
  
  componentDidMount() {
    document.addEventListener( 'click', this.onClick );
  }
  
  componentWillUnmount() {
    document.removeEventListener( 'click', this.onClick );
  }
  
  onClick = e => {
    const { target } = e;
    const { parentId } = this.props;
    const par = target.closest( `#${ parentId }` );
    const isSelf = par && par.id === parentId;
    
    if( isSelf || target.id === parentId ) {
      return;
		}

    const { setOpen } = this.props;
    setOpen( false );
  };
  
  render() {
    const {
      namespace = '',
      list = [],
      selected = '',
      ariaLabel = '',
      style = {},
      onClick,
    } = this.props;
    
    const attrs = ! ariaLabel ? {} : { 'aria-label': ariaLabel };
  
    return (
      <ul 
        id={ this.containerId }
        className={ `${ namespace }-dropdown-container` } 
        style={ style }
        { ...attrs }
      >
      { list.map( ( itm, i ) => {
        const { label = '', value = '' } = itm;
        
        return (
          <DropDownItm 
            key={ `${ namespace }-itm-${ String( value ) }-${ i }` } 
            namespace={ namespace }
            label={ label }
            value={ value }
            selected={ selected }
            containerId={ this.containerId }
            onClick={ onClick }
          />
        );
      } ) }
      </ul>
    );
  }
}

DropDownContainer.propTypes = {
  // required
  namespace: stringRequired,
  selected: stringRequired,
  list: arrayRequired,
  onClick: funcRequired,
  setOpen: funcRequired,
  style: objectRequired,
  
  // wildcards
  ariaLabel: string,
  
};

export default DropDownContainer;