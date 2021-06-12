<?php
/*
@package   Grid Magic
@author    CodingJack <support@codingjack.com>
@link      https://github.com/CodingJack/grid-magic
@copyright 2021 CodingJack
@wordpress-plugin
Plugin Name:       Grid Magic
Plugin URI:        https://github.com/CodingJack/grid-magic
Description:       Grid Magic - The Best Premium Grid Plugin
Version:           0.1.0
Author:            CodingJack
Author URI:        https://github.com/CodingJack
Text Domain:       gmagic
Domain Path:       /language
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit;
}

$gmagic_data = get_option( 'gmagic_data' );

// if experiencing issues let this pass once to clear the data
if( empty( $gmagic_data ) ) {
  update_option( 'gmagic_data', array(
    'plugin' => array(
      'availableVersion' => '0.1.0',
      'purchaseCodeRegistered' => true,
      'purchaseCode' => 'ffcb186d-6b03-4a25-bd36-16c0c5d53a7d'
    )
  ));
}

require_once plugin_dir_path( __FILE__ ) . 'admin/admin.php';
