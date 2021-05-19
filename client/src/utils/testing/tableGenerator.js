/* eslint-disable no-return-assign */

/**
 * Create a column template
 *
 * @returns {Object} Object
 *
 * @param {String|Number} dataIndex key
 * @param {Function} renderFn cell rendering callback
 */
const buildColumn = ( dataIndex, renderFn ) => ( {
  dataIndex,
  width : '60px',
  title  : dataIndex,
  key    : `col-${dataIndex}`,
  render : ( text, record, index ) => renderFn( text, record, index )
} )

/**
 * creates testing sourseData
 * @return {Array[Object]} array of rows with columns
 *
 * @param {number} colNum number of columns
 * @param {number} rowNum number of rows
 */
const buildData = ( colNum, rowNum ) =>
  Array.from( { length: rowNum }, ( _, r ) =>
    Array( colNum ).fill( 0 )
        // eslint-disable-next-line no-sequences
        .reduce( ( ac, _, x ) => ( ac[x] = `${x}-${r}`, ac ) //testing only
        , {id: r} ) )

module.exports = {
  buildColumn,
  buildData
}
