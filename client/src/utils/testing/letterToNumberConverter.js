const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = letters.length;
// const range = [...letters].reduce( ( res, ltr, idx ) => {
//   res[ltr] = idx + 1;  // TODO:  think about 0 as starting index
//   return res;
// }, {} );

// const re = /^[A-Z]+$/;

// function lettersToNumber( str ) {
//   if ( !re.test( str ) ) throw new Error( 'Column position must consists of A-Z characters' );

//   [...str].reduce( ( ac, letter ) => {
//     return 'hello';
//   } );

//   return false;
// }

function letterFromNumber( num ) {
  return num > 0 ? letters[num - 1] : letters[base - 1];
}

// TESTS
// Array.from({length: 300}).map((_,i)=>CA.numberToLetters(i+1)).join()

function numberToLetters( num ) {
  const temp = Math.trunc( num / base );
  const right = num % base;
  const left = right === 0 ? temp - 1 : temp;

  const result = [];

  result.push( letterFromNumber( right ) );
  // result.unshift( left > base ? numberToLetters( left ) : letterFromNumber( left ) );
  // TODO: find solution for columns greater ZZ
  if ( left >= 1 && left <= base ) {
    result.unshift( letterFromNumber( left ) );
  }
  return result.join( '' );
}

module.exports = {
  // lettersToNumber,
  numberToLetters
};
