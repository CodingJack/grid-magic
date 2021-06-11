/*
 * @desc the admin/editor menus
 * @since 4.0.0
*/

const adminMenu = [
  {
    section: 'overview',
    icon: 'assignment',
  },
  {
    section: 'editor',
    icon: 'edit',
  },
  {
    section: 'globals',
    icon: 'settings',
  },
];

const editorSections = [
  { icon: 'settings', section: 'settings' },
  { icon: 'layout', section: 'layout' },
  { icon: 'nav', section: 'nav' },
  { icon: 'layers', section: 'layers' },
];

const editorMenu = {
  settings: {
    naming: { icon: 'title' },
    source: { icon: 'source' },
    skin: { icon: 'style' },
    loading: { icon: 'loading' },
  },
  layout: {
    naming: { icon: 'title' },
    source: { icon: 'source' },
  },
  nav: {
    naming: { icon: 'title' },
    source: { icon: 'source' },
  },
  layers: {
    naming: { icon: 'title' },
    source: { icon: 'source' },
  },
};

export {
  adminMenu,
  editorSections,
  editorMenu,
};