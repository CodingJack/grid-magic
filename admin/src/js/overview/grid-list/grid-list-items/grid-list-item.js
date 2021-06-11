/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import GridListBtns from './grid-list-item/grid-list-btns';
import FavIcon from '../../../components/icons/fav-icon';
import Button from '../../../components/buttons/button';
import colors from '../../../data/colors';

import {
  trueFalse,
  convertDate,
} from '../../../utils';

import {
  bool,
  string,
  shape,
  oneOfType,
  funcRequired,
  stringRequired,
} from '../../../utils/prop-types';

const {
  Component,
} = React;

const {
  purple,
} = colors;

/*
 * @desc an item in the overview's grid list
 * @since 4.0.0
*/
class GridListItem extends Component {
  constructor() {
    super( ...arguments );
    
    const { gridItm = {} } = this.props;
    const { 
      name: curName = '', 
      alias: curAlias = '',
    } = gridItm;
    
    this.state = { 
      curName, 
      curAlias, 
      copyIcon: 'assignment',
    };
  }
  
  onBlur = ( prop, name, alias, curName, curAlias ) => {
    const { id = '', callback } = this.props;
    const oldValue = prop === 'curName' ? name : alias;
    const newValue = prop === 'curName' ? curName : curAlias;
    const realProp = prop === 'curName' ? 'name' : 'alias';
    
    const success = callback( id, realProp, newValue );
    if( ! success ) {
      this.setState( { [ prop ]: oldValue } );
    }
  };
  
  onCopy = () => {
    if( ! this.clicked ) {
      this.clicked = true;
      this.setState( { copyIcon: 'check' } );
    }
  };
  
  onMountTextArea = textArea => {
    if( ! textArea ) {
      return;
    }
    textArea.select();
    document.execCommand( 'copy' );
    clearTimeout( this.timer );

    this.timer = setTimeout( () => {
      this.clicked = false;
      this.setState( { copyIcon: 'assignment' } );
    }, 500 );
  };
  
  componentWillUnmount() {
    clearTimeout( this.timer );
  }
  
  render() {
    const {
      id = '',
      namespace = '',  
      gridItm = {},
      isNew = false,
      gridAction,
    } = this.props;
    
    const {
      name = '',
      alias = '',
      settings = '',
      lastModified = '',
      favorite = false,
    } = gridItm;
    
    const {
      copyIcon = 'assignment',
      curName = '',
      curAlias = '',
    } = this.state;
    
    const isFavorite = trueFalse( favorite );
    const shortcode = `[ess_grid alias="${ curAlias }"][/ess_grid]`;
    const gridCellClass = `${ namespace }-grid-list-cell`;
    const inputSwitchClass = `${ namespace }-input-switch`;
    const highlightClass = ! isNew ? '' : ` ${ namespace }-grid-list-row-new`
    
    return (
      <div className={ `${ namespace }-grid-list-row${ highlightClass }` }>
        <span className={ `${ namespace }-grid-list-fav ${ gridCellClass }-box` }>
          <FavIcon 
            gridId={ id }
            namespace={ namespace } 
            selected={ isFavorite }
            acion="toggle_favorite"
            onClick={ gridAction }
          />
        </span>
        <span className={ `${ gridCellClass }-box ${ gridCellClass }-id` }><span>{ id.replace( 'gmagic-', '' ) }</span></span>
        <div 
          className={ `${ gridCellClass }-short ${ gridCellClass }-collapse-short ${ inputSwitchClass }` }
          tabIndex="0"
          onBlur={ () => this.onBlur( 'curName', name, alias, curName, curAlias ) }
        >
          <span className={ `${ inputSwitchClass }-text` }>{ curName }</span>
          <span className={ `${ inputSwitchClass }-edit` }>
            <input 
              type="text" 
              value={ curName } 
              tabIndex="-1" 
              onChange={ e => this.setState( { curName: e.target.value } ) } 
            />
          </span>
        </div>
        <div 
          className={ `${ gridCellClass }-mid ${ gridCellClass }-collapse-short ${ namespace }-hide-tablet ${ namespace }-input-switch` }
          tabIndex="0"
          onBlur={ () => this.onBlur( 'curAlias', name, alias, curName, curAlias ) }
        >
          <span className={ `${ inputSwitchClass }-text` }>{ shortcode }</span>
          <span className={ `${ inputSwitchClass }-edit` }>
            <input 
              type="text" 
              value={ curAlias } 
              tabIndex="-1" 
              onChange={ e => ! this.clicked && this.setState( { curAlias: e.target.value } ) } 
            />
            <Button 
              namespace={ namespace }
              icon={ copyIcon }
              color="transparent"
              round={ true }
              style={ { fill: purple } }
              onClick={ this.onCopy }
            />
          </span>
        </div>
        <span className={ `${ gridCellClass }-long ${ gridCellClass }-collapse-long` }>
          <GridListBtns id={ id } />
        </span>
        <span className={ `${ gridCellClass }-short ${ namespace }-hide-notebook` }>{ settings }</span>
        <span className={ `${ gridCellClass }-mid ${ namespace }-hide-notebook` }>{ convertDate( lastModified ) }</span>
        { copyIcon === 'check' && <textarea ref={ this.onMountTextArea } value={ shortcode } readOnly /> }
      </div>
    );
  }
}

GridListItem.propTypes = {
  // required
  id: stringRequired,
  namespace: stringRequired,
  gridAction: funcRequired,
  callback: funcRequired,
  gridItm: shape( {
    name: string,
    alias: string,
    settings: string,
    lastModified: string,
    favorite: oneOfType( [ bool, string ] ),
    source: string,
  } ).isRequired,
};

export default GridListItem;