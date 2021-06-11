<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

if ( ! class_exists( 'EssentialGridV4Changelog' ) ) {

  final class EssentialGridV4Changelog {
    
    private static $instance = null;
    // private $version = '4.0.0';
    
    public static function instance() {
      if ( is_null( self::$instance ) ) {
        self::$instance = new self();
      }

      return self::$instance;
    }
    
    public function __construct() {}
    
    /*
     * @desc the latest and greatest
     * @since 4.0.0
    */
    public function latestChanges() {
      return array(
        'Version 3.0.12 (xxth February 2021)' => array(
          'new_features' => array(
            'Added option to customize the offline LoadMore error message',
            'Added Global option to customize empty Grid and social stream error messages',
            'Added filter group drill-down visibility options',
          ),
          'changes' => array(
            'Improved notices for when the selected source is empty (i.e. no posts available) or for social streams when credentials need to be added/adjusted'.
            'When attempting to save a post-based Grid with no source selected an Ajax error will now auto-select the source tab',
            'Imported post-based grids will now auto-populate itself on the frontend. Content can then be adjusted further by editing the grid\'s post-category selections.',
            'Imported post-based grids will now auto-select "Posts" as the default Post Type.',
            'Improved the code to remove surpressed notices',
            'Twitter streams no longer require API credentials',
            'Flickr Photosets are now titled "Albums"'
          ),
          'bug_fixes' => array(
            'Fixed a bug where hiding the "Filter - All" button was not possible if more than one filter was added to the grid',
            'Fixed a bug where some specific filter settings were not properly added, if more than one filter was added to the grid',
            'Fixed a bug where shortcodes added to a meta field did not work if they ended with "]',
            'Fixed pages with multiple grids sometimes had duplicate item IDs that caused issues with animations.',
            'Fixed touch-swipe for pagination not always working',
            'Fixed "Edit Skin" button not always loading the correct skin',
            'Fixed Flickr Photosets not Working (now called "Albums")',
            'Fixed Filter "AND" not working in the editor',
            'Fixed Video Lightbox not playing with sound for Vimeo Videos'
          )
        )
      );
    }
    
    /*
     * @desc return most recent changes
     * @since 4.0.0
    */
    public function getShortChangelog() {
      return json_encode( array( 'data' => $this->latestChanges() ) );
    }
    
    /*
     * @desc return full changelog
     * @since 4.0.0
    */
    public function getFullChangelog() {
      return json_encode( array( 'data' => array_merge( $this->latestChanges(), array(
        'Version 1.0.0' => array(
          'new_features' => array(
            'Added option to customize the offline LoadMore error message',
            'Added Global option to customize empty Grid and social stream error messages',
            'Added filter group drill-down visibility options',
          ),
          'changes' => array(
            'Improved notices for when the selected source is empty (i.e. no posts available) or for social streams when credentials need to be added/adjusted'.
            'When attempting to save a post-based Grid with no source selected an Ajax error will now auto-select the source tab',
            'Imported post-based grids will now auto-populate itself on the frontend. Content can then be adjusted further by editing the grid\'s post-category selections.',
            'Imported post-based grids will now auto-select "Posts" as the default Post Type.',
            'Improved the code to remove surpressed notices',
            'Twitter streams no longer require API credentials',
            'Flickr Photosets are now titled "Albums"'
          ),
          'bug_fixes' => array(
            'Fixed a bug where hiding the "Filter - All" button was not possible if more than one filter was added to the grid',
            'Fixed a bug where some specific filter settings were not properly added, if more than one filter was added to the grid',
            'Fixed a bug where shortcodes added to a meta field did not work if they ended with "]',
            'Fixed pages with multiple grids sometimes had duplicate item IDs that caused issues with animations.',
            'Fixed touch-swipe for pagination not always working',
            'Fixed "Edit Skin" button not always loading the correct skin',
            'Fixed Flickr Photosets not Working (now called "Albums")',
            'Fixed Filter "AND" not working in the editor',
            'Fixed Video Lightbox not playing with sound for Vimeo Videos'
          )
        )
      ) ) ) );
    }
  }
  
  EssentialGridV4Changelog::instance();
}