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
import IconTitle from '../../../src/js/components/headers/icon-title';

const namespace = 'esg-v4';
Enzyme.configure( { adapter: new Adapter() } );

test( 'it renders correctly', () => {
  const tree = create(
    <IconTitle 
      namespace={ namespace } 
      text="Some Text"
      icon="close" 
    />
  ).toJSON();
  
  if( ! tree ) {
    return;
  }
  expect( tree ).toMatchSnapshot();
  const { props } = tree;
  
  props.namespace = 'name-space';
  props.text = '';
  props.icon = 'check'; 
  props.color = 'green';
  props.bold = true;
  props.uppercase = true;

  expect( tree ).toMatchSnapshot();
} );

describe('it unmounts', () => {
  let clicked;
  const component = shallow(
    <IconTitle 
      namespace={ namespace } 
      text="Some Text"
      icon="check" 
      onClick={ () => clicked = true } 
    /> 
  );

  it('should match the snapshot', () => {
    expect( component.html() ).toMatchSnapshot();
  });

  test( 'it unmounts', () => {
    component.unmount();
  } );
} );




