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


const CRegistrationForm= connect(state=>({
  auth: state.promise.auth?.payload,
  users: state.promise.users?.payload,
}), dispatch=>({
  onRegister : (  firstName,lastName, email, login, password )=>dispatch( actionFullRegister( firstName,lastName, email, login, password ) )
}))(RegistrationForm);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <UserInfo /> */}
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col span={8} >

            {/* <CNormalLoginForm /> */}
            <CRegistrationForm />

          </Col>
        </Row>

        {/* <CDocumentEditor /> */}
      </div>
    </Provider>
  );
}

export default App;
