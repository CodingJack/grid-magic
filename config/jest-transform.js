const config = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-jsx',
  ],
};

module.exports = require( 'babel-jest' ).createTransformer( config );