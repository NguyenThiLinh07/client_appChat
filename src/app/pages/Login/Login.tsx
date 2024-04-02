import React from 'react';
import { translations } from '../../../locales/translations';
import { InputCommon } from '../../common/InputCommon/InputCommon';
import useService from './services';
import './style.scss';
import { Button, Checkbox, Form } from 'antd';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { firebaseAuth } from '../../../services/firebase';
import { REGEX } from '../../../utils/contants/regex';
import { MESSAGES_ERROR } from '../../../utils/contants/messagesError';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

const Login: React.FC = () => {
  const { t } = useService();

  const handleLogin = (values: any) => {
    console.log('values', values);
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: avatar },
    } = await signInWithPopup(firebaseAuth, provider);
    console.log();
  };

  return (
    <div className="login">
      <h1 className="text-4xl font-bold text-primary">{t(translations.LOGIN)}</h1>
      <Form onFinish={handleLogin} className="p-6" initialValues={{ remember: true }}>
        <Form.Item
          required={true}
          name="email"
          rules={[
            {
              required: true,
              pattern: new RegExp(REGEX.EMAIL),
              message: MESSAGES_ERROR.EMAIL,
            },
          ]}
        >
          <InputCommon label="Email" placeholder="Enter email" id="email" prefix={<MdEmail />} />
        </Form.Item>
        <Form.Item
          required={true}
          name="passwrod"
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
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
