// promise
const promiseReducer = ( state = {},
                            { type, status, payload, error, name } ) =>
  ( type === 'PROMISE' ? { ...state, [name]: { status, payload, error } } : state )

/// Auth

function makeTokenState( token ) {
  return {token: token, payload: JSON.parse( atob( token.split('.')[1] ) ) };
}
function authReducer(state, action){ //....
  if (state === undefined){
    // добавить в action token из localStorage, и проимитировать LOGIN (action.type = 'LOGIN')
    if (localStorage.authToken) {
      return makeTokenState(localStorage.authToken)
    }
    return {}
  }
  if (action.type === 'LOGIN' && action.token ){
    localStorage.authToken = action.token
    //+localStorage
    //jwt_decode //взять среднюю часть токена, натравить на неё atob, а потом JSON.parse
    return makeTokenState( action.token );
   //  return {token: action.jwt, payload: jwt_decode(action.jwt)}
  }
  if (action.type === 'LOGOUT'){
    localStorage.removeItem('authToken')
    //-localStorage
    //вернуть пустой объект
    return {}
  }
  return state
}//,

export {
  authReducer as auth,
  promiseReducer as promise
}
