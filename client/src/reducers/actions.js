import gql from '../utils/gql';

// promise
const actionPending = name => ( { type: 'PROMISE', status: 'PENDING', name } )
const actionResolved = ( name, payload ) => ( { type: 'PROMISE', status: 'RESOLVED', payload, name } )
const actionRejected = ( name, error ) => ( { type: 'PROMISE', status: 'REJECTED', error, name } )

const actionPromise = ( name = 'default', p = Promise.resolve() ) =>
  async dispatch => {
    dispatch( actionPending( name ) )
    try {
      const payload = await p
      dispatch( actionResolved( name, payload ) )
      return payload
    } catch ( error ) {
      dispatch( actionRejected( name, error ) )
    }
  }

// login/logout
const actionLogin = (login,password) => {
  const query = {login,password};
  const promise = gql(`query ($login:String!, $password:String!) {
                        login(login:$login, password:$password)
                      }`,query)
  return actionPromise('login', promise)
}

const actionAuthLogin = token=>({ type: 'LOGIN', 'token': token})
const actionAuthLogout = ()=>({ type: 'LOGOUT' })

const actionFullLogin = ( login, password )=>async dispatch=>{
  try {
    const payload = await dispatch( actionLogin(login, password) )
    if ( !payload ) return; 
    dispatch( actionAuthLogin( payload ) );
    return payload;
  }
  catch(e){
    console.warn(' action full Login error ', e);
  }
}

// register
const actionRegister = (firstName,lastName,email,login,password) => {
  const query = {firstName,lastName,email,login,password};
  const promise = gql(`
    mutation reg($firstName:String!,$lastName:String!,$email:String!, $login:String!, $password:String!){
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      login: $login
      password: $password
    ){
      id login
    }
  }
  `, query );

  return actionPromise('register', promise)
}

const actionFullRegister = ( firstName,lastName,email,login,password )=>async dispatch=>{
  try {
    const payload = await dispatch( actionRegister(firstName,lastName,email,login,password ) )
    console.log('authFullRegister payload ', payload )
    if ( !payload ) return; 
    const {error} = payload;
    if ( !(error instanceof Error) ) {
      console.log( 'registerState', payload );
      const result = dispatch( actionFullLogin( login, password ) );
      console.log( 'authFullRegister State', result );
    }
  }
  catch(e){
    console.warn(' action full Register error ', e);
  }
}


// testAction
const actionGetUsers = () => {
  const query = {};
  const promise = gql(`query {
    getUsers {
      id
      firstName
      lastName
      documents {
        id name sheets {
          id name cells { 
            id
            value
          }
        }
      }
    }
  }`,query)
  return actionPromise('users', promise)
}

export {
  // actionPromise,
  actionLogin,
  actionAuthLogin,
  actionAuthLogout,
  actionFullLogin,
  actionRegister,
  actionFullRegister,
  // NOTE: TESTS 
  actionGetUsers,
}