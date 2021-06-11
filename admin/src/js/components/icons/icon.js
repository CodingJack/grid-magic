/**
 * External dependencies.
 */
import React from 'react';

import Grade from '@material-ui/icons/Grade';
import Help from '@material-ui/icons/Help';
import Edit from '@material-ui/icons/Edit';
import Info from '@material-ui/icons/Info';
import Sync from '@material-ui/icons/Sync';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
import Error from '@material-ui/icons/Error';
import Settings from '@material-ui/icons/Settings';
import Assignment from '@material-ui/icons/Assignment';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import MailOutline from '@material-ui/icons/MailOutline';
import CloudDownload from '@material-ui/icons/CloudDownload';
import StarOutline from '@material-ui/icons/StarOutline';
import Star from '@material-ui/icons/Star';
import Delete from '@material-ui/icons/Delete';
import Update from '@material-ui/icons/Update';
import FileCopy from '@material-ui/icons/FileCopy';
import Apps from '@material-ui/icons/Apps';
import Filter from '@material-ui/icons/Filter';
import Cancel from '@material-ui/icons/Cancel';
import Gamepad from '@material-ui/icons/Gamepad';
import Palette from '@material-ui/icons/Palette';
import Layers from '@material-ui/icons/Layers';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Title from '@material-ui/icons/Title';
import CloudQueue from '@material-ui/icons/CloudQueue';
import InvertColors from '@material-ui/icons/InvertColors';

/**
 * Internal dependencies.
 */
import AltIcon from './alt-icon';
import { camelCase } from '../../utils';

import {
  bool,
  string,
  object,
  stringRequired,
} from '../../utils/prop-types';

const Icons = {
  Help,
  Info,
  Sync,
  Check,
  Close,
  Error,
  Edit,
  Update,
  Star,
  Title,
  Cancel,
  Layers,
  Palette,
  Settings,
  Assignment,
  VerifiedUser,
  Grid: Apps,
  Nav: Gamepad,
  Trash: Delete,
  AltStar: Grade,
  Copy: FileCopy,
  Duplicate: Filter,
  Email: MailOutline,
  BlankStar: StarOutline,
  Download: CloudDownload,
  ArrowDown: ArrowDropDown,
  ArrowUp: ArrowDropUp,
  Checked: AddCircle,
  Unchecked: RemoveCircle,
  Loading: CloudQueue,
  Style: InvertColors,
};

/*
 * @desc handles all Material Icons with a fallback to local custom svgs (AltIcon)
 * @since 4.0.0
*/
const Icon = ( { name = '', color = '', style = {}, indent } ) => {
  const title = camelCase( name, true );
  const Component = Icons[ title ] ? Icons[ title ] : null;
  
  let styles = { ...style };
  if( color ) {
    styles = { ...styles, fill: color };
  }
  if( indent ) {
    styles = { ...styles, marginLeft: '-4px' };
  }
  
  if( ! Component ) {
    return <AltIcon name={ name } style={ styles } />;
  }
  return <Component style={ styles } />;
};

Icon.propTypes = {
  name: stringRequired,
  color: string,
  style: object,
  indent: bool,
};

export default Icon;