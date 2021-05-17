// import './style.css'
import { Avatar, Layout, Menu, Breadcrumb } from 'antd';
import UserInfo from './UserInfo'
import SheetPane from './SheetPane'



// const { Header, Content, Footer } = Layout;
const { Header, Content } = Layout;

const DocumentEditor = () => (
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