<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

if ( ! class_exists( 'GridMagicFront' ) ) {
  
  final class GridMagicFront {
  
    private static $instance = null;
    private $version = '0.1.0';

    public static function instance() {
      
      if ( is_null( self::$instance ) ) {
        self::$instance = new self();
      }

      return self::$instance;
    }
    
    public function __construct() {
    
      $this->scriptUrl = plugins_url( 'dist/js/gmagic.min.js', __FILE__ );
      add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }
    
    public function enqueue_scripts() {

      wp_enqueue_script( 
        'gmagic-js', 
        plugins_url( 'dist/js/gmagic.min.js', __FILE__ ), 
        $this->version, 
        true 
      );
      
      wp_localize_script(
        'gmagic-js',
        'gridMagicData', 
        array()
      );
      
      wp_add_inline_script(
        'gmagic-js', 
        '',
        'after'
      );
      
    }
  }
  
  GridMagicFront::instance();
  
}
