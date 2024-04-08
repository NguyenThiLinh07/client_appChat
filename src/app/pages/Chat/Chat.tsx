import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../types';
import { Button } from 'antd';
import { logout } from '../../../store/auth/authSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.auth);

  console.log('currentUser', currentUser);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      Chat
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Chat;
