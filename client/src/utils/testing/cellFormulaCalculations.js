// DEBUG: USED FOR DEBUG ONLY
//tested in browser

const cells = {
  A3: {
  col     : 1,
  row     : 3,
  value   : null,
  expr    : '=A2+A1 + (5-1)',
},
  A2: {
  col     : 1,
  row     : 2,
  value   : null,
  expr    : '=E1+D1*A1',
},
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

function processInputExpr( inputValue, cells_ ) { // NOTE:  cells_ required for eval
  return ( inputValue && inputValue.startsWith('=') )
    ? {
      expr : inputValue,
      value: eval( inputValue.replace(/^=+/, '' ).replace( /(\w+\d+)/g, 'cells_[\'$1\'].value' ) ),
    }
    : {
      expr : null,
      value : inputValue,
    }
}

function isDependingCellsCalculated( expr, cells ) {
  const dependingCells= !expr ? null : expr.replace(/^=+/, '' ).match( /(\w+\d+)/g )
  console.log('===:', 'expr:', dependingCells.map( x =>`${x}:${cells[x].value != null}`));
  return !dependingCells || dependingCells.every( x => cells[x].value != null )
}

function recalculateCells( cells, res={} ) {
  const { result, notCalcCells} = Object.entries( cells ).reduce( ( acc, [ key, cell ] ) => {
    const { expr,value } = cell;
    const allCells = { ...cells, ...acc.result };

    if ( expr && !value ) {
      if ( isDependingCellsCalculated( expr, allCells ) ) {
        const newCell = processInputExpr( expr, allCells )
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