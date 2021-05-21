import {Provider, connect}   from 'react-redux';
import store from './reducers/store';
import {actionGetUsers} from './reducers/actions';
// import {
//   actionFullLogin,
//   actionFullRegister,
//   actionAuthLogin,
// } from './reducers/actions'
import DocumentEditor from './components/DocumentEditor'
import NormalLoginForm from './components/LoginForm';
import { Row, Col } from 'antd';
// import Layout from 'antd/lib/layout/layout';

// NOTE: for testing only
const CDocumentEditor = connect(state=>({
  auth: state.promise.auth?.payload,
  users: state.promise.users?.payload,
}), dispatch=>({
  onGetUsers : ()=>dispatch( actionGetUsers() )
}))(DocumentEditor);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <UserInfo /> */}
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col span={8} >

            <NormalLoginForm />

          </Col>
        </Row>

        {/* <CDocumentEditor /> */}
      </div>
    </Provider>
  );
}

export default App;
