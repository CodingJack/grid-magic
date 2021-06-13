/**
 * External dependencies.
 */
import React from 'react';
import axios from 'axios';

/**
 * Internal dependencies.
 */
import { 
  AppContext,
} from '../../context';

const { Component } = React;

/*
 * @desc react lazy loader
 * @since 0.1.0
*/
class AppLoader extends Component {
  constructor() {
    super( ...arguments );
  }
  
  state = {
    Module: null,
  }
  
  /*
   * @desc query database
   * @since 0.1.0
  */
  async getData() {
    const { endpoint = '' } = gridMagicData;
    let response;

    try {
      response = await axios.get( `${ endpoint }opt/` );
    } catch(e) {
      response = null;
      console.error( e );
    }
    
    if( response ) {
      let { data } = response;
      if( data ) {
        try {
          data = JSON.parse( data );
        } catch(e) {
          data = null; 
        }
        if( data ) {
          this.setState( { MasterData: data, Module: this.Module } );
        } else {
          console.log( 'data could not be loaded' );
        }
      }
      const { namespace = '' } = this.context;
      document.body.classList.remove( `${ namespace }-preloading` );
      this.Module = null;
    }
  }
  
  async getLanguage( language ) {
    const lang = language.replace( 'page', 'overview' );
    let response;

    try {
      response = await axios.get( lang );
    } catch(e) {
      response = null;
      console.error( e );
    }
    
    if( response ) {
      const { data } = response;
      if( data ) {
        gridMagicData.translations = { overview: response.data };
      } else {
        console.log( 'ajax error retrieving language' );
      }
    } else {
      console.log( 'ajax error retrieving language' );
    }
    
    this.getData();
  }
  
  /*
   * @desc loads components 
   * @since 0.1.0
  */
  async componentDidMount() {
    const { resolve, data: getData } = this.props;
    const { default: Module } = await resolve();
    this.Module = Module;
    
    if( getData ) {
      const { language } = gridMagicData;
      if( ! language || typeof language !== 'string' ) {
        this.getData();
      } else {
        this.getLanguage( language );
      }
    } else {
      this.setState( { Module } );
    }
  }

  render() {
    const { namespace = '' } = this.context;
    const { Module, MasterData } = this.state;
    const { data: getData } = this.props;
    
    const loaded = ! getData ? Module : Module && MasterData;
    
    if( ! loaded ) {
      return (
        <div className={ `${ namespace }-admin-wrap` }>
          <div className={ `${ namespace }-spinner` } ></div>
        </div>
      );
    }

    return (
      <div className={ `${ namespace }-admin-wrap` }>
        <Module { ...this.props } data={ MasterData } />
      </div>
    );
  }
}

AppLoader.contextType = AppContext;

export default AppLoader;
