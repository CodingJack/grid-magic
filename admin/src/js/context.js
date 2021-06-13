/*
 * @desc the four main context points used by the App
 * @since 0.1.0
*/

import React from 'react';

const { 
  createContext,
} = React;

const AppContext = createContext(); // Provider: index
const AdminContext = createContext(); // Provider: admin
const EditorContext = createContext(); // Provider: editor
const OverviewContext = createContext(); // Provider: overview
const GridListContext = createContext(); // Provider: overview/grid-list

export {
  AppContext,
  AdminContext,
  EditorContext,
  OverviewContext,
  GridListContext,
};