const templates = {};

const getTemplatePart = ( template = '', part = '' ) => {
  let skin = templates[ template ];
  if ( ! skin ) {
    skin = templates.original;
  }
  let css = skin[ part ];
  if( ! css ) {
    return null;
  }
  return { ...css };
};

export {
  getTemplatePart,
};