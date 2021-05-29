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
},
 E1: {
  col     : 5,
  row     : 1,
  value   : null,
  expr    : '=C1+D1', 
}}

function processInputExpr( inputValue, cells ) {
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

function recalculateCells( cls, res={} ) {
  const { result, notCalcCells} = Object.entries( cls ).reduce( ( acc, [ key, cell ] ) => {
    const { expr,value } = cell;
    if ( expr && !value ) {
      const newCell = processInputExpr( expr, { ...cls, ...acc.result } )
      if ( newCell !== cell ) {
        acc.result[key] = {...cell, ...newCell }   
      }
      else {
        acc.notCalcCells[key] = cell
      }
    }
    else {
      acc.result[key] = cell;
    }
    return acc
  }, {result:res, notCalcCells:{} } );
  
  return Object.keys( notCalcCells ).length > 0 
    ? recalculateCells( notCalcCells, result )
    : result;
}

module.exports = {
  cells, // DEBUG: 
  recalculateCells,
}