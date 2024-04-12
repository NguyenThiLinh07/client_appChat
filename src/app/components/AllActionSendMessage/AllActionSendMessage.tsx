import React, { useMemo, useState } from 'react';
import { Input } from 'antd';
import { AppDispatch } from '../../../store/configureStore';
import { useDispatch } from 'react-redux';
import { debounce } from '../../../helpers/funcs';
import { login } from '../../../store/auth/authSlice';
import { IoMdSend } from 'react-icons/io';
import { VscSmiley } from 'react-icons/vsc';
import { FaImages } from 'react-icons/fa';
import { MdAttachFile } from 'react-icons/md';

type Props = {};

export const AllActionSendMessage: React.FC<Props> = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [valueSend, setValueSend] = useState('abc');

  const requestAPILogin = useMemo(() => {
    return debounce((e: any) => {
      const data = {
        email: 'linh@gmail.com',
        password: e.target.value,
      };
      dispatch(login(data));
    }, 1000);
  }, []);

  const handleOnchange = (e: any) => {
    setValueSend(e.target.value);
    requestAPILogin(e);
  };

  return (
    <div className="mx-4 mb-4 rounded-default flex flex-row gap-2">
      <div className="flex flex-row gap-2">
        <FaImages size={24} className="my-auto text-secondary1" />
        <MdAttachFile size={24} className="my-auto text-secondary1" />
      </div>
      <div className="flex bg-secondary rounded-default px-4 gap-2 w-full">
        <Input
          value={valueSend}
          onChange={handleOnchange}
          className="border-none bg-[transparent] text-white hover:bg-[transparent] focus:bg-[transparent] focus:!shadow-none truncate"
        />
        <VscSmiley size={26} className="my-auto text-secondary1" />
      </div>
      <div className="my-auto">
        <IoMdSend size={24} className="my-auto text-secondary1" />
      </div>
    </div>
  );
};
