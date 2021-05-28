// DEBUG: USED FOR DEBUG ONLY
//tested in browser

var cells = {
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
 C1 : {
  col     : 3,
  row     : 1,
  value   : null,
  expr    : '=A1+B1', 
}}

function processInputExpr( inputValue ) {
 // require cells
  console.log( 'inputValue', inputValue )
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
 const {expr} = c
 // require cells
 if ( !expr ) {
   return c
 }
 else {
 	 return {...c, ...processInputExpr( expr ) }   
 }
}

function recalculateCells() {
  return Object.entries( cells ).reduce((acc,[key,cell])=>( acc[key] = processCell(cell), acc ), {} );
}

module.exports = {
  cells, // DEBUG: 
  processCell,
  recalculateCells,
}