/**
 * External dependencies.
 */
import React from 'react';

/**
 * Internal dependencies.
 */
import Icon from '../../components/icons/icon';
import Button from '../../components/buttons/button';

import {
  AdminContext,
} from '../../context';

import {
  camelCase,
} from '../../utils';

const { 
  Component,
  Fragment,
  createRef,
} = React;

let changeLog;
let fullLoaded;

const icons = {
  new_features: 'alt_star',
  changes: 'changes',
  bug_fixes: 'bug_fixes',
};

/*
 * @desc changelog is now an object, not HTML
 * @since 4.0.0
*/
class Changelog extends Component {
  constructor() {
    super( ...arguments );
  }
  
  state = {
    fullLoaded: false,
    loaded: false,
    contentLoading: true,
  };
  
  inViewport = true;
  ref = createRef();
  
  getFullChangelog = () => {
    this.setState( { contentLoading: true, loaded: false }, () => {
      this.getChangelog( true );
    } );
  };
  
  getChangelog = full => {
    const { getContent } = this.context;
    const route = ! full ? 'changelog' : 'fullchangelog';
    getContent( route, this.dataRetrieved );
  };
  
  dataRetrieved = ( data = '' ) => {
    let content;
    try {
      content = JSON.parse( data );
    } catch(e) {
      content = null;
    }
    
    if( content ) {
      const { data = '' } = content;
      fullLoaded = !! changeLog;
      changeLog = data;
      
      if( this.inViewport && changeLog ) {
        this.setState( {
            fullLoaded, 
            loaded: true, 
            contentLoading: false,
          }, 
          () => this.fadeIn( true )
        );
      }
    }
  };
  
  fadeIn = transition => {
    if( ! this.ref ) {
      return;
    }
    const { current } = this.ref;
    if( current ) {
      if( transition ) {
        void current.offsetWidth;
      }
      current.style.opacity = 1;
    }
  }
  
  componentDidMount() {
    if( ! changeLog ) {
      this.getChangelog();
    } else {
      this.setState( { loaded: true }, this.fadeIn );
    }
  }
  
  componentWillUnmount() {
    this.inViewport = false;
    this.ref = null;
  }
  
  render() {
    const { loaded, fullLoaded } = this.state;
    const { namespace } = this.context;
    
    if( loaded ) {
      return (
        <div>
          <div ref={ this.ref } className={ `${ namespace }-fade-in` }>
          { Object.keys( changeLog ).map( ( key, i ) => {
              const version = changeLog[ key ];
              return (
                <Fragment key={ `${ namespace }-version-${ i }` }>
                  <h4>{ key }</h4>
                  {
                    Object.keys( version ).map( ( section, j ) => {
                      const items = version[ section ];
                      return (
                        <Fragment key={ `${ namespace }-version-${ i }-${ j }` }>
                          <p className={ `${ namespace }-flex-solid ${ namespace }-paragraph ${ namespace }-pad-top-25` }>
                            <>
                              <Icon name={ icons[ section ] } color="purple" indent={ true } />
                              <span 
                                className={ `${ namespace }-pad-left-5 ${ namespace }-bold ${ namespace }-uppercase` }
                              >{ camelCase( section, true ) }</span>
                            </>
                          </p>
                          <ul>{ items.map( ( itm, k ) => <li key={ `${ namespace }-version-${ i }-${ j }${ k }` }>{ itm }</li> ) } </ul>
                        </Fragment>
                      );
                    } )
                  }  
                </Fragment>
              );
            } ) }
            { ! fullLoaded && (
              <Button 
                color="purple" 
                icon="download" 
                text="Load Full Changelog"
                namespace={ namespace }
                extraClass={ `${ namespace }-pad-top-30` }
                onClick={ this.getFullChangelog } 
              />
            ) }
          </div>
        </div>
      );
    }
    return <div className={ `${ namespace }-lazyload-placeholder` }></div>;
  }
}

Changelog.contextType = AdminContext;

export default Changelog;