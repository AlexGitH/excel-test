import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

const NormalLoginForm = ({onLogin}) => {
  const onFinish = ({login,password}) => {
    console.log('Received values of form: ', {login,password});
    onLogin( login,password );
  };

  return (
    <Card >
    <Form
      // {...layout}
      size="large"
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      // style= {{border:'1px solid black'}}
      onFinish={onFinish}
    >
      <Form.Item
        name="login"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <a className="login-form-forgot" alt="forgot password" href="#">
          Forgot password
        </a> */}
      </Form.Item>

      <Form.Item>
        <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a alt="register" href="#">register now!</a>
      </Form.Item>
    </Form>
    </Card>
  );
};

export default NormalLoginForm;