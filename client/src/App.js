import {Provider, connect}   from 'react-redux';
import store from './reducers/store'
// import {
//   actionFullLogin,
//   actionFullRegister,
//   actionAuthLogin,
// } from './reducers/actions'
import DocumentEditor from './components/DocumentEditor'

// NOTE: for testing only
const CDocumentEditor = connect(state=>({
  auth: state.promise.auth?.payload
}))(DocumentEditor);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* <UserInfo /> */}
        <CDocumentEditor />
      </div>
    </Provider>
  );
}

export default App;
