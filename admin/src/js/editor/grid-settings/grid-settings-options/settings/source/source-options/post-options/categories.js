/**
 * External dependencies.
 */
import React from 'react';

const { 
  Component,
} = React;

/**
 * Internal dependencies.
 */
import PostCats from './post-cats';
import {
  AdminContext,
} from '../../../../../../../context';

let theCategories;
let theTags;

class Categories extends Component {
  constructor() {
    super( ...arguments );
  }
  state = {
    data: false,
  };
  display = () => {
    const { namespace = '' } = this.context;
    this.setState( { data: () => (
      <PostCats 
        namespace={ namespace } 
        theCategories={ theCategories }
        theTags={ theTags }
      />
    ) } );
  };
  onFetched = ( cats = [], tags = [] ) => {
    theCategories = [ ...cats ];
    theTags = [ ...tags ];
    if( ! this.unmounted ) {
      this.display();
    }
  };
  componentDidMount() {
    if( ! theCategories ) {
      const {
        getCategories,
      } = this.context;
      getCategories( this.onFetched );
    } else {
      this.display();
    }
  }
  componentWillUnmount() {
    this.unmounted = true;
  }
  render() {
    const { data:Data } = this.state;
    if( ! Data ) {
      return null;
    }
    return <Data />;
  }
}
Categories.contextType = AdminContext;

export default Categories;