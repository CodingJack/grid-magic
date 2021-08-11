<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

if ( ! class_exists( 'GridMagicAdmin' ) ) {

  final class GridMagicAdmin {
    
    private static $instance = null;
    private $version = '0.1.0';
    private $isEsgAdmin = false;
    private $gridId = '';
    private $section = 'settings';
    private $priority = PHP_INT_MAX;
    
    public static function instance() {
      if ( is_null( self::$instance ) ) {
        self::$instance = new self();
      }

      return self::$instance;
    }
    
    /*
     * to get the WP Action firing sequence order
     * https://wordpress.org/plugins/debug-bar/
     * https://wordpress.org/plugins/debug-bar-actions-and-filters-addon/
    */
    
    /*
     * helpful to look at these files to see what's hard printed and what can be modified:
     * site/wp-admin/admin-header.php
     * site/wp-admin/admin-footer.php
     * site/wp-includes/theme.php
    */
    
    public function __construct() {
      add_action( 'rest_api_init', array( $this, 'rest_init' ) );
      add_action( 'init', array( $this, 'on_init' ), $this->priority );
      add_action( 'admin_menu', array( $this, 'add_plugin_admin_menu' ), $this->priority );
      add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), $this->priority, 1 );
    }
    
    /*
     * @desc hide the WP menu bar inside our admin
     * @since 0.1.0
    */
    public function print_inline_css() {
      echo '<link rel="icon" type="image/png" href="' . plugins_url( 'dist/icons/favicon.ico', __FILE__ ) . '" />';
      
      echo '
        <style>
          body {margin: 0; background: #f0f0f1}
          #adminmenumain, #wpfooter, #wp-auth-check-wrap, #wpadminbar {display: none}
          #gmagic-app {position: absolute; top: 0; left: 0; width: 100%; z-index: 999999; background: #f0f0f1}
        </style>
      ';
    }
    
    /*
     * @desc remove meta boxes from external sources
     * @since 0.1.0
    */
    public function remove_meta_boxes() {
      global $wp_meta_boxes;

      foreach( $wp_meta_boxes as $key => $box ) {
        unset( $wp_meta_boxes[ $key ] );
      }
    }
    
    /*
     * @desc clean out any custom help tabs from external sources
     * @since 0.1.0
    */
    public function remove_help_tabs() {
      $screen = get_current_screen();
      $screen->remove_help_tabs();
    }
    
    /*
     * @desc convert wildcard to boolean
     * @since 0.1.0
    */
    private function isTrue( $val ) {
      return $val === '1' || $val === 1 || $val === 'true' || $val === true;
    }
    
    /*
     * @desc check if we're in the admin for later usage, start our "remove actions/filters" chain
     * @since 0.1.0
    */
    public function on_init() {
      if( isset( $_GET[ 'page' ] ) && $_GET[ 'page' ] === 'grid-magic' ) {
        $this->isEsgAdmin = true;
        
        remove_all_actions( 'wp_loaded' );
        remove_all_actions( 'admin_init' );
        
        add_filter( 'admin_footer_text', '__return_empty_string', $this->priority ); 
        add_filter( 'update_footer', '__return_empty_string', $this->priority );
        add_filter( 'admin_body_class', '__return_empty_string', $this->priority );
        add_filter( 'debug_bar_classes', '__return_empty_string', $this->priority );
        add_filter( 'screen_options_show_screen', '__return_false', $this->priority );
        add_filter( 'debug_bar_panels', '__return_empty_array()', $this->priority );
        add_action( 'add_meta_boxes', array( $this, 'remove_meta_boxes' ), $this->priority );
        
        if( isset( $_GET[ 'edit_grid' ] ) && isset( $_GET[ 'grid_id' ] ) ) {
          $this->gridId = $_GET[ 'grid_id' ];
          if( isset( $_GET[ 'section' ] ) ) {
            $this->section = $_GET[ 'section' ];
          }
        }
      }
    }
    
    /*
     * @desc just a div for the JS generated HTML to live
     * @since 0.1.0
    */
    public function admin_display() {
      require_once plugin_dir_path( __FILE__ ) . 'view/display.php'; 
    }
    
    /*
     * @desc add admin plugin menu
     * @since 0.1.0
    */
    public function add_plugin_admin_menu() {
      // this action fires after the "init" hook where we check to see if we're in the gmagic admin
      // so what we do here is we remove all the menu items from the WP Menu bar if we're in our own admin,
      // we're not showing the WP menu at all inside our admin, and so this just reduces the page's output HTML
      if( $this->isEsgAdmin ) {
        global $menu;
        if( is_array( $menu ) ) {
          while( count( $menu ) > 1 ) {
            array_pop( $menu );
          }
        }
      }
      add_menu_page(
        'Grid Magic',
        'Grid Magic',
        'manage_options',
        'grid-magic',
        array( $this, 'admin_display' ),
        'dashicons-screenoptions'
      );
    }
    
    /*
     * @desc get/set to the master database object
     * @since 0.1.0
    */
    public function handle_esg_data( WP_REST_Request $request ) {
      $data = $request->get_param( 'data' );
      
      if( ! empty( $data ) ) {
        update_option( 'gmagic_data', $data );
        return 'success';
      }
      
      $data = get_option( 'gmagic_data' );
      return json_encode( $data );
    }
    
    /*
     * @desc subscribe to newsletter
     * @since 0.1.0
    */
    public function handle_newsletter_subscribe( WP_REST_Request $request ) {
      $subscribe = $request->get_param( 'subscribe' );
      // $email = $request->get_param( 'email' );
      
      if( $this->isTrue( subscribe ) ) {
        return array( true, 'Success! Newsletter subscribed' ); // temp
      } else {
        return array( true, 'Success! You are now unsubscribed' ); // temp
      }
    }
    
    /*
     * @desc return partial changelog
     * @since 0.1.0
    */
    public function get_changelog() {
      require_once plugin_dir_path( __FILE__ ) . 'content/changelog.php';
      $changelog = new GridMagicChangelog();
      return $changelog->getShortChangelog();
    }
    
    /*
     * @desc return full changelog
     * @since 0.1.0
    */
    public function get_full_changelog() {
      require_once plugin_dir_path( __FILE__ ) . 'content/changelog.php';
      $changelog = new GridMagicChangelog();
      return $changelog->getFullChangelog();
    }
    
    /*
     * @desc register custom rest routes
     * @since 0.1.0
    */
    public function rest_init() {
      register_rest_route( 'gmagic/v1', '/opt/', array(
        'methods' => array( 'GET', 'POST', 'PUT' ),
        'callback' => array( $this, 'handle_esg_data' ),
        'permission_callback' => function() {
          return true; // temp
        }
      ) );
      register_rest_route( 'gmagic/v1', '/newsletter-subscribe/', array(
        'methods' => array( 'POST' ),
        'callback' => array( $this, 'handle_newsletter_subscribe' ),
        'permission_callback' => function() {
          return true; // temp
        }
      ) );
      register_rest_route( 'gmagic/v1', '/changelog/', array(
        'methods' => array( 'GET' ),
        'callback' => array( $this, 'get_changelog' ),
        'permission_callback' => function() {
          return true; // temp
        }
      ) );
      register_rest_route( 'gmagic/v1', '/fullchangelog/', array(
        'methods' => array( 'GET' ),
        'callback' => array( $this, 'get_full_changelog' ),
        'permission_callback' => function() {
          return true; // temp
        }
      ) );
    }
    
    /*
     * @desc enqueue scripts
     * @since 0.1.0
    */
    public function enqueue_scripts( $hook ) {
      if( $hook !== 'toplevel_page_grid-magic' ) {
        return;
      }
      /*
       * @desc dequeue everything
       * @since 0.1.0
      */
      global $wp_scripts;
      global $wp_styles;
      
      foreach( $wp_scripts->registered as $registered ) {
        if( strpos( $registered->src, '/wp-admin/' ) === FALSE ) {
          wp_deregister_script( $registered->handle );
          wp_dequeue_script( $registered->handle );
        }
      }
      foreach( $wp_styles->registered as $registered ) {
        if( strpos( $registered->src, '/wp-admin/' ) === FALSE ) {
          wp_deregister_style( $registered->handle );
          wp_dequeue_style( $registered->handle );
        }
      }
      wp_dequeue_style( 'wp-color-picker' );
      wp_deregister_style( 'wp-color-picker' );
      
      /*
       * @desc these actions fire after admin_enqueue_scripts and can be safely removed
       * @since 0.1.0
      */
      remove_all_actions( 'admin_head' );
      remove_all_actions( 'admin_footer' );
      remove_all_actions( 'in_admin_header' );
      remove_all_actions( 'in_admin_footer' );
      remove_all_actions( 'admin_print_scripts' );
      remove_all_actions( 'admin_print_styles' );
      remove_all_actions( 'admin_print_footer_scripts' );
      remove_all_actions( 'admin_notices' );
      remove_all_actions( 'user_admin_notices' );
      remove_all_actions( 'all_admin_notices' );
      remove_all_actions( 'network_admin_notices' );
      remove_all_actions( 'after_setup_theme' );
      
      // these action fire after enqueue_scripts so we can just add them here now that we've cleaned the slate
      add_action( 'admin_head', array( $this, 'remove_help_tabs' ), $this->priority );
      add_action( 'admin_print_styles', array( $this, 'print_inline_css' ), $this->priority );
      add_action( 'admin_print_footer_scripts', array( $this, 'print_inline_js' ), $this->priority );
    }
    
    /*
     * @desc since we removed all "admin_print_scripts" actions we can't enqueue so we'll just print them inline instead
     * @since 0.1.0
    */
    public function print_inline_js() {
      // lets check if a translation file exists
      $lang = get_locale();
      $lang = explode( '_', $lang );
      $lang = $lang[0];
      
      // then if it doesn't we'll default to english
      $file = plugin_dir_path( __FILE__ ) . 'language/overview/' . $lang . '.json';
      if( $lang !== 'en' && ! file_exists( $file ) ) {
        $lang = 'en';
      }
      
      $params = array(
        'version' => $this->version,
        'gridId' => $this->gridId,
        'section' => $this->section,
        'adminUrl' => admin_url(),
        'jsPath' => plugins_url( 'dist/js/', __FILE__ ),
        'imgPath' => plugins_url( 'dist/img/', __FILE__ ),
        'endpoint' => get_home_url() . '/wp-json/gmagic/v1/',
        'restapiurl' => get_home_url() . '/wp-json/wp/v2/',
        'language' => plugins_url( 'language/page/', __FILE__ ) . $lang . '.json' // "page" is replaced dynamically with "overview", "editor" or "globals"
      );
      
      echo "<script>var gridMagicData = '" . json_encode( $params ) . "';</script>" . "\n";
      echo '<script src="' . plugins_url( 'dist/js/vendors/gmagic-vendors.min.js', __FILE__ ) . '"></script>' . "\n";
      echo '<script src="' . plugins_url( 'dist/js/gmagic.min.js', __FILE__ ) . '"></script>' . "\n";
    }
  }
  
  gridMagicAdmin::instance();
}
