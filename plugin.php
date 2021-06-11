<?php
/*
@package   Essential Grid - V4
@author    ThemePunch <info@themepunch.com>
@link      http://codecanyon.net/item/essential-grid-v4-wordpress-plugin/7563340
@copyright 2021 ThemePunch
@wordpress-plugin
Plugin Name:       Essential Grid - V4
Plugin URI:        https://www.essential-grid-v4.com
Description:       Essential Grid - V4 - The Original Premium Grid Plugin
Version:           4.0.0
Author:            ThemePunch
Author URI:        https://themepunch.com
Text Domain:       esg-v4
Domain Path:       /language
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

$esg_v4_data = get_option( 'essential_grid_v4_data' );

// if experiencing issues let this pass once to clear the data
//if( empty( $esg_v4_data ) ) {
  update_option( 'essential_grid_v4_data', array(
    'plugin' => array(
      'availableVersion' => '4.0.0',
      'purchaseCodeRegistered' => true,
      'purchaseCode' => 'ffcb186d-6b03-4a25-bd36-16c0c5d53a7d'
    )
  ));
//}

require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
