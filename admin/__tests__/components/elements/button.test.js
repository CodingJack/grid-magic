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
import Button from '../../../src/js/components/buttons/button';

const namespace = 'esg-v4';
Enzyme.configure( { adapter: new Adapter() } );

const text = 'This is a button';

test( 'it renders correctly', () => {
  const tree = create(
    <Button 
      namespace={ namespace } 
      onClick={ () => {} } 
    /> 
  ).toJSON();
  
  if( ! tree ) {
    return;
  }
  expect( tree ).toMatchSnapshot();
  const { props } = tree;

  props.icon = 'check';
  props.onClick = () => {};
  props.disabled = true;
  props.large = true;
  props.namespace = 'name-space';
  props.color = "green";
  props.text = text;
  props.extraClass = `.${ namespace }-decorator`;
  props.children = 'some text';

  expect( tree ).toMatchSnapshot();
} );

describe('onClick callback works and it unmounts', () => {
  let clicked;
  const component = shallow(
    <Button 
      namespace={ namespace } 
      text={ text } 
      icon="check" 
      onClick={ () => clicked = true } 
    /> 
  );

  it('should match the snapshot', () => {
    expect( component.html() ).toMatchSnapshot();
  });

  test( 'Click event', () => {
    component.simulate( 'click', {} );
    expect( clicked ).toEqual( true );
  } );

  test( 'it unmounts', () => {
    component.unmount();
  } );
} );




