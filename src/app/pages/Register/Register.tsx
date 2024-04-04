import React from 'react';
import { Button, Form } from 'antd';
import { REGEX } from '../../../utils/contants/regex';
import { MESSAGES_ERROR } from '../../../utils/contants/messagesError';
import { InputCommon } from '../../common/InputCommon/InputCommon';
import { translations } from '../../../locales/translations';
import useService from './services';
import './style.scss';
import { FaUser } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdLocalPhone } from 'react-icons/md';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';

const Register: React.FC = () => {
  const { t } = useService();
  const handleRegister = (values: any) => {
    console.log('values', values);
  };

  return (
    <div className="login">
      <h1 className="text-4xl font-bold text-primary">{t(translations.REGISTER.REGISTER)}</h1>
      <Form onFinish={handleRegister}>
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
            type="text"
            label={t(translations.REGISTER.USERNAME)}
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
            label={t(translations.REGISTER.PASSWORD)}
            placeholder="Enter password"
            id="password"
            type="password"
            prefix={<RiLockPasswordFill />}
          />
        </Form.Item>
        <Form.Item
          required={true}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: MESSAGES_ERROR.REQUIRED,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        >
          <InputCommon
            label={t(translations.REGISTER.CONFIRM_PASSWORD)}
            placeholder="Confirm Password"
            id="confirmPassword"
            type="password"
            prefix={<RiLockPasswordFill />}
          />
        </Form.Item>
        <Form.Item name="birthDay">
          <InputCommon
            label={t(translations.REGISTER.BIRTHDAY)}
            placeholder="Birth day"
            id="birthDay"
            type="date"
            prefix={<LiaBirthdayCakeSolid />}
          />
        </Form.Item>
        <Form.Item name="address">
          <InputCommon
            label={t(translations.REGISTER.ADDRESS)}
            placeholder="Address"
            id="address"
            type="text"
          />
        </Form.Item>
        <Form.Item name="phoneNumber">
          <InputCommon
            label="Phone Number"
            placeholder="Phone Number"
            id="phoneNumber"
            type="text"
            prefix={<MdLocalPhone />}
          />
        </Form.Item>
        <Form.Item className="btn-login">
          <Button type="primary" htmlType="submit">
            {t(translations.REGISTER.REGISTER)}
          </Button>
        </Form.Item>
        {/* <Form.Item */}
        {/*  required={true} */}
        {/*  name="email" */}
        {/*  rules={[ */}
        {/*    { */}
        {/*      required: true,*/}
        {/*      pattern: new RegExp(REGEX.EMAIL), */}
        {/*      message: MESSAGES_ERROR.EMAIL, */}
        {/*    }, */}
        {/*  ]} */}
        {/* > */}
        {/*  <InputCommon label="Email" placeholder="Enter email" id="email" prefix={<MdEmail />} /> */}
        {/* </Form.Item> */}
      </Form>
    </div>
  );
};

export default Register;
