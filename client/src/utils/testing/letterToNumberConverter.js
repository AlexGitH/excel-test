const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base = letters.length;
const letterToNumberMap = [...letters].reduce( ( res, ltr, idx ) => {
  res[ltr] = idx + 1;  // TODO:  think about 0 as starting index
  return res;
}, {} );

const re = /^[A-Z]+$/;

function lettersToNumber( str ) {
  if ( !re.test( str ) ) throw new Error( 'Column position must consists of A-Z characters' );
  const [ leftLtr, rightLtr ] = [...str.slice( str.length - 2 )];
  const [ left, right ] = [ letterToNumberMap[leftLtr], letterToNumberMap[rightLtr] ];
  return left * base + right;
}

function letterFromNumber( num ) {
  return num > 0 ? letters[num - 1] : letters[base - 1];
}

function numberToLetters( input ) {
  const num = parseInt( input );
  if ( isNaN( num ) && num <= 0 ) throw new Error( 'Argument must be a positive number' );
  const temp = Math.trunc( num / base );
  const right = num % base;
  const left = right <= 0 ? temp - 1 : temp;

  const result = [];

  result.push( letterFromNumber( right ) );
  // TODO: find solution for columns greater ZZ
  if ( left >= 1 && left <= base ) {
    result.unshift( letterFromNumber( left ) );
  }
  return result.join( '' );
}

module.exports = {
  lettersToNumber,
  numberToLetters
};

// CRITICAL TESTS
// CA.lettersToNumber('ZZ') // 702
// `${CA.numberToLetters(26)} ${CA.numberToLetters(27)}`
// Array.from({length: 300}).map((_,i)=>CA.numberToLetters(i+1)).join()
