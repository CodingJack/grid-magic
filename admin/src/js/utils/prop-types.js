/**
 * External dependencies.
 */
import PropTypes from 'prop-types'; 
 
const {
  func,
  bool,
  array,
  shape,
  string,
  number,
  object,
  element,
  exact,
  arrayOf,
  oneOfType,
  elementType,
} = PropTypes;

const { isRequired: stringRequired } = string;
const { isRequired: arrayRequired } = array;
const { isRequired: funcRequired } = func;
const { isRequired: boolRequired } = bool;
const { isRequired: numberRequired } = number;
const { isRequired: objectRequired } = object;
const { isRequired: arrayOfRequired } = arrayOf;
const { isRequired: elementTypeRequired } = elementType;
const { isRequired: elementRequired } = element;
const { isRequired: shapeRequired } = shape;

export {
  func,
  bool,
  shape,
  array,
  string,
  number,
  object,
  element,
  exact,
  arrayOf,
  oneOfType,
  elementType,
  funcRequired,
  boolRequired,
  numberRequired,
  objectRequired,
  shapeRequired,
  arrayRequired,
  stringRequired,
  arrayOfRequired,
  elementRequired,
  elementTypeRequired,
};