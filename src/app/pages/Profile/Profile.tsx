import { useSelector } from 'react-redux';
import { RootState } from '../../../types';
import { Avatar, Button, Form, Spin } from 'antd';
import { MESSAGES_ERROR } from '../../../utils/contants/messagesError';
import { InputCommon } from '../../common/InputCommon/InputCommon';
import { FaUser } from 'react-icons/fa';
import { REGEX } from '../../../utils/contants/regex';
import { RiLockPasswordFill } from 'react-icons/ri';
import { translations } from '../../../locales/translations';
import React from 'react';
import useServices from './services';
import { MdEmail } from 'react-icons/md';

const Profile = () => {
  const { currentUser, loading } = useSelector((state: RootState) => state.auth);
  const { t } = useServices();
  const handleUpdateProfile = (values: any) => {
    console.log('values', values);
  };

  return (
    <Spin spinning={loading}>
      <div className="w-[800px] mt-[100px] mx-auto p-6 text-center rounded-[10px]">
        <h1 className="text-4xl font-bold text-primary">Profile</h1>
        <Form onFinish={handleUpdateProfile} className="p-6" initialValues={{ remember: true }}>
          <Avatar size={120} src={currentUser?.avatar} className="cursor-pointer" />
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

          <Form.Item className="btn-login">
            <Button type="primary" htmlType="submit">
              {t(translations.COMMON.SAVE)}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};

export default Profile;
