import { Button, Form, Spin } from 'antd';
import { MESSAGES_ERROR } from '../../../utils/contants/messagesError';
import { InputCommon } from '../../common/InputCommon/InputCommon';
import { FaUser } from 'react-icons/fa';
import { REGEX } from '../../../utils/contants/regex';
import { RiLockPasswordFill } from 'react-icons/ri';
import { translations } from '../../../locales/translations';
import React from 'react';
import useServices from './services';
import { MdEmail, MdLocalPhone } from 'react-icons/md';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import Avatar from '../../common/Avatar/Avatar';

const Profile = () => {
  const { t, loading, image, setImage, handleUpdateProfile } = useServices();

  return (
    <Spin spinning={loading}>
      <div className="w-[800px]  mx-auto p-6 text-center rounded-[10px]">
        <Form onFinish={handleUpdateProfile} className="p-6" initialValues={{ remember: true }}>
          <div>
            <Avatar type="xl" image={image} setImage={setImage} />
          </div>
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

          <Form.Item>
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
