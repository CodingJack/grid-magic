/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import {
  bool,
  string,
  funcRequired,
  stringRequired,
} from '../../../utils/prop-types';

const {
  Component,
} = React;

/*
 * @desc an input text element that manages its own state and emmits its value to the callback
 * @since 0.1.0
*/

class InputTextWithState extends Component {
  constructor() {
    super( ...arguments );
    const { initialValue: value = '' } = this.props;
    this.state = { value };
  }
  
  static getDerivedStateFromProps( props, state ) {
    const { clearSearch } = props;
    const { value: curVal } = state;
    const value = ! clearSearch ? curVal : '';
    return { value };
  }
  
  onChange = e => {
    const value = e.target.value;
    const { updateOnChange = false } = this.props;
    const callback = ! updateOnChange ? null : () => this.update( value );
    this.setState( { value }, callback );
  };

  update = value => {
    if( value ) {
      const { onChange } = this.props;
      onChange( value );
    }
  };

  onBlur = () => {
    this.setState( prevState => {
      const { value } = prevState;
      if( value ) {
        const { onChange } = this.props;
        onChange( value );
      }
      return null;
    } );
  };
  
  render() {
    const {
      namespace = '',
      ariaLabel = '',
      extraClass = '',
      placeholder = '',
      readonly = false,
      focusInput = false,
    } = this.props;
    
    const { value = '' } = this.state;
    const dataAttrs = { 'aria-labelledby': ariaLabel };
    const clas = extraClass ? ` ${ extraClass }` : '';
    
    return (
      <input 
        ref={ el => el && focusInput && el.focus() }
        type="text" 
        className={ `${ namespace }-input-text${ clas }` } 
        value={ value } 
        readOnly={ readonly }
        placeholder={ placeholder }
        onChange={ this.onChange }
        onBlur={ this.onBlur }
        tabIndex="0"
        { ...dataAttrs }
      />
    );
  }
}

InputTextWithState.propTypes = {
  onChange: funcRequired,
  namespace: stringRequired,
  ariaLabel: stringRequired,
  initialValue: string,
  extraClass: string,
  placeholder: string,
  focusInput: bool,
  readonly: bool,
};

export default InputTextWithState;