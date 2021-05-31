import {Provider, connect}   from 'react-redux';
import store from './reducers/store';
import {actionGetUsers, actionFullLogin, actionFullRegister } from './reducers/actions';
// import {
//   actionFullLogin,
//   actionFullRegister,
//   actionAuthLogin,
// } from './reducers/actions'
import DocumentEditor from './components/DocumentEditor'
import NormalLoginForm from './components/LoginForm';
import { Row, Col } from 'antd';
import RegistrationForm from './components/RegistrationForm';
// import Layout from 'antd/lib/layout/layout';

// DEBUG: 
import { cells, recalculateCells } from './utils/testing/cellFormulaCalculations';
import { lettersToNumber, numberToLetters } from './utils/testing/letterToNumberConverter';
window.TE = { cells, recalculateCells };
window.CA = { lettersToNumber, numberToLetters };


// NOTE: for testing only
const CDocumentEditor = connect(state=>({
  auth: state.promise.auth?.payload,
  users: state.promise.users?.payload,
}), dispatch=>({
  onGetUsers : ()=>dispatch( actionGetUsers() )
}))(DocumentEditor);

const CNormalLoginForm= connect(state=>({
  auth: state.promise.auth?.payload,
  users: state.promise.users?.payload,
}), dispatch=>({
  onLogin : ( l, p )=>dispatch( actionFullLogin( l, p) )
}))(NormalLoginForm);


const CRegistrationForm= connect( null, dispatch=>({
  onRegister : ( firstName,lastName, email, login, password )=>
                dispatch( actionFullRegister( firstName,lastName, email, login, password ) )
}))(RegistrationForm);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <UserInfo /> */}


        {/* <Row justify="center" style={{ minHeight: '100vh' }}>
          <Col xs={24} sm={22} md={18} lg={16} xl={12} >
            // TODO: add Routes
            <h1 align="center" > Login </h1>
            <CNormalLoginForm />

            <h1 align="center" > Registration </h1>
            <CRegistrationForm />

          </Col>
        </Row> */}

        <CDocumentEditor />
      </div>
    </Provider>
  );
}

export default App;
