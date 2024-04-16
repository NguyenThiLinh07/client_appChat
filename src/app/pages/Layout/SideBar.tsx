import React from 'react';
import { Input } from 'antd';
import { IoFilter } from 'react-icons/io5';
import Avatar from '../../common/Avatar/Avatar';
import { TUser } from '../../../types/user/user';
import { useDispatch } from 'react-redux';
import { setCurrentChatUser } from '../../../store/auth/authSlice';

export const SideBar: React.FC = () => {
  const dispatch = useDispatch();
  const listFriend = [
    {
      id: 1,
      name: 'Linh Nguyen',
      avatar: './avatar.jpg',
      message: 'Đang làm gi day???',
      online: true,
    },
    {
      id: 2,
      name: 'Nguyen cute pho mai phe',
      avatar: './avatar2.jpg',
      message: 'Đang làm gi day ha ban oiiiiiiiiiiii???',
      online: true,
    },
    {
      id: 3,
      name: 'Giang sauciu',
      avatar: './avatar3.jpg',
      message: 'Mai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okila',
      online: false,
    },
    {
      id: 4,
      name: 'Ac ma quai di Mai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okila Mai di choi khonggggggggggggg??? Di coMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okilaMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okilaffee nheeeeeeeeeeeeee??? okilaMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okilaMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okilaMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okilaMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okilaMai di choi khonggggggggggggg??? Di coffee nheeeeeeeeeeeeee??? okila',
      avatar: './avatar4.jpg',
      message: 'Đang làm gi day ha ban oiiiiiiiiiiii???',
      online: true,
    },
  ];

  const handleChatWithFriend = (value: TUser) => {
    dispatch(setCurrentChatUser(value));
  };

  return (
    <div className="mt-2">
      <div className="flex bg-[#dcdded] rounded-default px-4 gap-2 w-full shadow-default">
        <Input
          placeholder="Search friend"
          className="border-none bg-[transparent] text-[black] hover:bg-[transparent] focus:bg-[transparent] focus:!shadow-none truncate boxShadowNone"
        />
        <IoFilter size={24} className="my-auto text-secondary" />
      </div>
      <div className="mt-4 text-white flex flex-col gap-1">
        {listFriend.map((friend) => (
          <div
            className="flex flex-row gap-2 cursor-pointer hover:bg-background-hover-primary p-2"
            key={friend?.id}
            onClick={() => handleChatWithFriend(friend)}
          >
            <Avatar type="sm" image={friend?.avatar} />
            <div className="flex flex-col justify-between w-full">
              <p className="font-medium truncate overflow-hidden max-w-[200px]">{friend?.name}</p>
              <div className="flex flex-row justify-between w-full">
                <p className="text-xs text-[#ccc] truncate overflow-hidden max-w-[200px]">
                  {friend?.message}
                </p>
                <p className="text-xs text-[#ccc]">10 giờ</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
