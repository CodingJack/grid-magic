<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

if ( ! class_exists( 'EssentialGridV4Front' ) ) {
  
  final class EssentialGridV4Front {
  
    private static $instance = null;
    private $version = '4.0.0';

    public static function instance() {
      
      if ( is_null( self::$instance ) ) {
        self::$instance = new self();
      }

      return self::$instance;
    }
    
    public function __construct() {
    
      $this->scriptUrl = plugins_url( 'dist/js/essential-grid-v4.min.js', __FILE__ );
      add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
    }
    
    public function enqueue_scripts() {

      wp_enqueue_script( 
        'essential-grid-v4-js', 
        plugins_url( 'dist/js/essential-grid-v4.min.js', __FILE__ ), 
        $this->version, 
        true 
      );
      
      wp_localize_script(
        'essential-grid-v4-js',
        'essentialGridV4Data', 
        array()
      );
      
      wp_add_inline_script(
        'essential-grid-v4-js', 
        '',
        'after'
      );
      
    }
  }
  
  EssentialGridV4Front::instance();
  
}
