// import './style.css'
import { Button, Avatar, Layout, Menu, Space } from 'antd';
import UserInfo from './UserInfo'
import SheetPane from './SheetPane'
import { actionAuthLogout, actionFullLogin } from '../reducers/actions';
import store from '../reducers/store';
import SizeContext from 'antd/lib/config-provider/SizeContext';


// const { Header, Content, Footer } = Layout;
const { Header, Content } = Layout;

const DocumentEditor = ( {auth,users, onGetUsers}) => (
  <Layout style={{ height: '100vh' }}>
    {/* <Header style={{ display: 'flex', flexFlow: 'row nowrap',alignItems: 'center', position: 'fixed', zIndex: 1, width: '100%' }}> */}
    <Header style={{ display: 'flex', flexFlow: 'row nowrap',alignItems: 'center', zIndex: 1, width: '100%' }}>
      {/* <div className="logo" /> */}
      <UserInfo />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
      <Space >
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">
          <Button onClick={async()=>{await onGetUsers(); console.log('DOcuemntEditor:', 'users:', users); }}>GetUsers</Button>
        </Menu.Item>
        <Menu.Item key="2">
          <Button onClick={async()=>{
            store.dispatch( actionFullLogin( 'sem7532', 'SecretP@s2992') )
          }}>login user1</Button>
        </Menu.Item>
        <Menu.Item key="3">
          <Button onClick={async()=>{
            store.dispatch( actionFullLogin( 'petro1949', 'SuperSecretP@s111' ) )
          }}>login user2</Button>
        </Menu.Item>
        <Menu.Item key="4">
          <Button onClick={async()=>{
            store.dispatch( actionAuthLogout() )
          }}>Logout</Button>
        </Menu.Item>
      </Menu>
    </Space>
    </Header>
    {/* <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}> */}
    {/* <Content style={{display:'flex', flex: '1 1 300', flexFlow: 'column nowrap', }} className="site-layout" > */}
    <Content style={{display:'flex', flex: '1 1', flexFlow: 'column nowrap', }} className="site-layout" >
        {/* <SheetPane /> */}
        <SheetPane />
      {/* <div className="site-layout-background" >
        <SheetPane />
      </div> */}
    </Content>

    {/* TODO: think about better visualization of FOOTER */}
    {/* <Footer style={{backgroundColor: 'purple', position: 'fixed', zIndex: 1, bottom: 0, textAlign: 'center', width: '100%' }}>Ant Design ©2018 Created by Ant UED</Footer> */}

    {/* <Footer style={{backgroundColor: 'purple', zIndex: 1, textAlign: 'center', width: '100%' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
  </Layout>
)

export default DocumentEditor