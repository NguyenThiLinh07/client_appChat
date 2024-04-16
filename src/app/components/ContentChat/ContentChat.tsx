import React from 'react';
import Avatar from '../../common/Avatar/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types';
import { IoCheckmark, IoCheckmarkDoneOutline } from 'react-icons/io5';

type Props = {};

export const ContentChat: React.FC<Props> = (props: Props) => {
  const { currentUser, currentChatUser } = useSelector((state: RootState) => state.auth);

  const listMessageUser = [
    { id: 'm1', message: 'hehehehe', isRead: true },
    { id: 'm2', message: 'hé lu', isRead: true },
    { id: 'm3', message: 'Dang lmj doi???', isRead: true },
    {
      id: 'm4',
      message:
        'Di an khong ban ei :v nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei : nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei :v nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei : nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei :v nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei : nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei :v nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnDi an khong ban ei : nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
      isRead: false,
    },
  ];

  return (
    <div className="flex-grow m-4 rounded-default p-4 shadow-default">
      <div className="flex flex-row gap-2">
        <Avatar type="xs" image={currentChatUser?.avatar ?? ''} className="!items-start" />
        <div className="flex text-text flex-col gap-2">
          {listMessageUser.map((message) => (
            <p
              key={message?.id}
              className="bg-secondary shadow-default px-6 py-1 rounded-default w-fit"
            >
              {message?.message}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-2 ml-8">
        <div className="flex text-text flex-col gap-2 items-end">
          {listMessageUser.map((message) => (
            <div
              className="flex gap-2 bg-secondary1_50 shadow-default px-6 py-1 rounded-default w-fit"
              key={message?.id}
            >
              <p>{message?.message}</p>
              <div className="my-auto">
                {message?.isRead ? (
                  <IoCheckmarkDoneOutline className="my-auto" />
                ) : (
                  <IoCheckmark className="my-auto" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
