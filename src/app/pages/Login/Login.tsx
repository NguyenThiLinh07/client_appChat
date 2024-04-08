import React from 'react';
import { translations } from '../../../locales/translations';
import { InputCommon } from '../../common/InputCommon/InputCommon';
import useService from './services';
import './style.scss';
import { Button, Checkbox, Form, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { REGEX } from '../../../utils/contants/regex';
import { MESSAGES_ERROR } from '../../../utils/contants/messagesError';
import { RiLockPasswordFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';

const Login: React.FC = () => {
  const { t, loading, handleLogin, handleLoginWithGoogle } = useService();

  return (
    <Spin spinning={loading}>
      <div className="login">
        <h1 className="text-4xl font-bold text-primary">{t(translations.LOGIN)}</h1>
        <Form onFinish={handleLogin} className="p-6" initialValues={{ remember: true }}>
          <Form.Item
            required={true}
            name="username"
            rules={[
              {
                required: true,
                message: MESSAGES_ERROR.REQUIRED,
              },
              () => ({
                validator(_, value) {
                  if (!value || value.toString().trim().length >= 8) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(MESSAGES_ERROR.USERNAME));
                },
              }),
            ]}
          >
            <InputCommon
              label="Username"
              placeholder="Enter username"
              id="username"
              prefix={<FaUser />}
            />
          </Form.Item>
          <Form.Item
            required={true}
            name="password"
            rules={[
              {
                required: true,
                message: MESSAGES_ERROR.REQUIRED,
              },
              () => ({
                validator(_, value) {
                  if (!value || REGEX.PASSWORD.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(MESSAGES_ERROR.PASSWORD));
                },
              }),
            ]}
          >
            <InputCommon
              label="Password"
              placeholder="Enter password"
              id="password"
              type="password"
              prefix={<RiLockPasswordFill />}
            />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <div className="flex justify-center gap-2 pb-4">
            <Button
              className="flex gap-1 items-center"
              htmlType="button"
              onClick={handleLoginWithGoogle}
            >
              <FcGoogle className="text-xl" /> <p>Login with Google</p>
            </Button>
            <Link to={'/register'} className="my-auto italic underline text-primary opacity-70">
              Register now!
            </Link>
          </div>
          <Form.Item className="btn-login">
            <Button type="primary" htmlType="submit">
              {t(translations.LOGIN)}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default Login;
