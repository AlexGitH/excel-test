import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, } from 'antd';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    span : 24,
    offset: 0,
  },
};

const rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#^$&%~<>(){}[\],.+\-*/_=\\]).{8,}$/

const RegistrationForm = ({onRegister}) => {

  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const [form] = Form.useForm();

  const onFinish = ({firstName,lastName,email,login,password}) => {
    onRegister( firstName,lastName, email, login, password )
    console.log('Received values of form: ', {firstName,lastName,email,login,password}); // DEBUG:
  };

  window.TF = form ;// DEBUG: 

  return (
    <Card>
    <Form
      {...formItemLayout}
      labelAlign="left"
      size="large"
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <Form.Item
        key="r0"
        name="firstName"
        label="First Name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        key="r1"
        name="lastName"
        label="Last Name"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        key="r2"
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        key="r3"
        name="password"
        label="Password"
        validateFirst    // stop validating on first error
        rules={[
          {
            required: true,
            message: 'Please input your password!',
            // TODO: create password character validator
          },
          {
            min: 8,
            message : 'Password must be at least 8 characters long',
          },
          {
            pattern: rePassword,
            // message: 'Password must be at least 8 characters long with numbers, latin letters(both cases) and special characters',
            message: 'Use numbers, latin letters(both cases) and special characters',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        key="r4"
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        validateFirst
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        key="r5"
        name="login"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: false,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item 
        key="r6"
        shouldUpdate   // to disable button on validation fail
      {...tailFormItemLayout}>
      { ({ isFieldsTouched, getFieldsError, setFieldsValue, resetFields })=>    // NOTE: form destructuring
          <>
            <Button
              type="primary"
              htmlType="submit"
              disabled={ 
                !isFieldsTouched(true) ||
                !!getFieldsError().filter(({ errors }) => errors.length).length
              }>
                Register
            </Button>

            {/* // DEBUG: for testing only */}
            <Button type="link" htmlType="button" onClick={()=>{
                  setFieldsValue({
                    firstName: 'Vasya',
                    lastName: 'Pupkin',
                    email: 'pupkinvasya3124@test.com',
                    password: 'Asdfasdf2!',
                    confirm: 'Asdfasdf2!',
                    login: 'vpup223',
                  });
              
            }}>
              Fill test data
            </Button>

            <Button type="ghost" htmlType="button" onClick={()=>resetFields()}>
              Reset
            </Button>
      </>
      }

      </Form.Item>
    </Form>

    </Card>
  );
};

export default RegistrationForm;