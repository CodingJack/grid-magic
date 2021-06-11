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
import Tab from '../../../src/js/components/buttons/tab';

const namespace = 'esg-v4';
Enzyme.configure( { adapter: new Adapter() } );

test( 'it renders correctly', () => {
  const tree = create(
    <Tab 
      namespace={ namespace } 
      onClick={ () => {} } 
      section="overview"
    />
  ).toJSON();
  
  if( ! tree ) {
    return;
  }
  expect( tree ).toMatchSnapshot();
  const { props } = tree;

  props.icon = 'check';
  props.onClick = () => {};
  props.namespace = 'name-space';
  props.section = "editor";
  props.selected = true;

  expect( tree ).toMatchSnapshot();
} );

describe('onClick callback works and it unmounts', () => {
  let clicked;
  const component = shallow(
    <Tab 
      namespace={ namespace } 
      icon="check" 
      section="globals"
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




