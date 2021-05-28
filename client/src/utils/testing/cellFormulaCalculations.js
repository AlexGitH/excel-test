// DEBUG: USED FOR DEBUG ONLY
//tested in browser

const cells = {
  A1: {
  col     : 1,
  row     : 1,
  value   : 5,
  expr    : null,
},
 B1: {
  col     : 2,
  row     : 1,
  value   : 5,
  expr    : null,
},
 C1: {
  col     : 3,
  row     : 1,
  value   : null,
  expr    : '=A1+B1', 
},
 D1: {
  col     : 4,
  row     : 1,
  value   : null,
  expr    : '=C1+1', 
}}

function processInputExpr( inputValue ) {
  // require cells
  console.log( 'inputValue', inputValue )
  const relativeVals= inputValue.replace(/^=+/, '' ).match( /(\w+\d+)/g )
  console.log('processInputExpr:', 'vals:', relativeVals.map( x=> cells[x].value ) );

  if ( inputValue && inputValue.startsWith('=') ) {
    if ( relativeVals.some( x=>x==null) ) {
      return {
        expr : inputValue,
        value : null  // to recalculate on next iteration;
      }
    }

  }
  return ( inputValue && inputValue.startsWith('=') )
    ? {
      expr : inputValue,
      value: eval( inputValue.replace(/^=+/, '' ).replace( /(\w+\d+)/g, 'cells[\'$1\'].value' ) ),
    }
    : {
      expr : null,
      value : inputValue,
    }
}

function processCell( c ) {
  const { expr,value } = c
  if ( expr && !value ) {
    return {...c, ...processInputExpr( expr ) }   
  }
  else {
    return c;
  }
}

function recalculateCells( cls ) {
  return Object.entries( cls ).reduce((acc,[key,cell])=>( acc[key] = processCell(cell), acc ), {} );
  // const {newCls, rest} = Object.entries( cls ).reduce( ( acc, [ key, cell ] ) => {
  //   const newCell = processCell(cell);
  //   acc[key] = processCell(cell);
  //   return acc
  // }, {result:{}, rest} );
}

module.exports = {
  cells, // DEBUG: 
  processCell,
  recalculateCells,
}