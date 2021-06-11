/**
 * External dependencies.
 */
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { create } from 'react-test-renderer';
import { shallow } from 'enzyme';

/**
 * Internal dependencies.
 */
import InputText from '../../../src/js/components/inputs/input-text';

const namespace = 'gmagic';
Enzyme.configure( { adapter: new Adapter() } );


test( 'it renders correctly', () => {
  const tree = create(
    <InputText 
      value="Some Value"
      ariaLabel="Some Label"
      namespace={ namespace } 
      onChange={ () => {} }
    />
  ).toJSON();
  
  if( ! tree ) {
    return;
  }
  expect( tree ).toMatchSnapshot();
  const { props } = tree;
  
  props.onChange = () => {};
  props.namespace = 'name-space';
  props.value = 'Another Value';
  props.ariaLabel = 'Another Label';
  props.extraClass = 'my-extra-class';
  props.placeholder = 'some placeholder';
  props.readonly = true;

  expect( tree ).toMatchSnapshot();
} );

describe('it unmounts', () => {
  const onChange = jest.fn();
  
  const component = shallow(
    <InputText 
      value="Some Value" 
      ariaLabel="Some Label"
      namespace={ namespace } 
      onChange={ onChange }
    /> 
  );
  
  test( 'Change event', () => {
    component.simulate( 'change', {
      target: {
        value: 'new value',
      },
    } );
    expect( onChange ).toHaveBeenCalled();
  } );

  it('should match the snapshot', () => {
    expect( component.html() ).toMatchSnapshot();
  });

  test( 'it unmounts', () => {
    component.unmount();
  } );
} );




