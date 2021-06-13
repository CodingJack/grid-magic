/*
 * @desc a conditional wrapper, i.e. wrap the child in a parent if a condition is met
 * @since 0.1.0
*/
const Wrapper = ( { wrapIt, wrapper, children } ) => wrapIt ? wrapper( children ) : children;

export default Wrapper;