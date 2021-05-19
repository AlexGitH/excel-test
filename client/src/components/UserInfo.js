import 'antd/dist/antd.css';
import { Avatar, Tooltip } from 'antd';
// import { Avatar, Divider, Tooltip } from 'antd';
// import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

// const Demo = () => (
//   <>
//     <Avatar.Group>
//       <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//       <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
//       <Tooltip title="Ant User" placement="top">
//         <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
//       </Tooltip>
//       <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
//     </Avatar.Group>
//     <Divider />
//     <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
//       <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//       <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
//       <Tooltip title="Ant User" placement="top">
//         <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
//       </Tooltip>
//       <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
//     </Avatar.Group>
//     <Divider />
//     <Avatar.Group
//       maxCount={2}
//       size="large"
//       maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
//     >
//       <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//       <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
//       <Tooltip title="Ant User" placement="top">
//         <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
//       </Tooltip>
//       <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
//     </Avatar.Group>
//   </>
// );

const UserInfo = () => (<>
  {/* <Demo /> */}
      <Tooltip title="Ant User" placement="top">
        <Avatar size="large" alt="Ant User" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Tooltip>
</>) 
export default UserInfo