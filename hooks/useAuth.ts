import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/reducers/index';
import { useRouter } from 'next/router';
import { setUser, clearAuth, User } from '@/features/auth/authSlice';
import { setLocalstorageItem, getLocalStorageItem, removeLocalstorageItem } from '@/utils/storage';

function useAuth() {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = async () => {
    dispatch(clearAuth());
    removeLocalstorageItem('buckyUSER');
  };

  const goBackPrevPage = () => router.push(getLocalStorageItem('prevPage') || '/');

  const setUserInfo = async (user: User) => {
    dispatch(setUser(user));
    setLocalstorageItem('buckyUSER', JSON.stringify(user));
    goBackPrevPage();
  };

  const getUserInfo = () => getLocalStorageItem('buckyUSER');

  const syncLocalToRedux = () => {
    const userData = getUserInfo();
    if (userData) {
      dispatch(setUser(userData));
    }
  };

  return {
    setUserInfo,
    logout,
    isAuthenticated,
    user,
    syncLocalToRedux,
  };
}

export default useAuth;
