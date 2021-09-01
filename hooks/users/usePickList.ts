import userApi from '@/api/users';
import { useQuery } from 'react-query';
import useAuth from '../useAuth';

export const createMyPickListKey = (userId: number) => ['/my_pick_list', userId];

function usePickList() {
  const { user, isAuthenticated } = useAuth();

  const { data: pickListData, isLoading: pickListLoading } = useQuery(
    createMyPickListKey(user?.user_id || 0),
    async () => {
      if (!isAuthenticated) {
        return {
          count: 0,
          select_list: [],
        };
      }
      return userApi.getPickList(user?.user_id || 0);
    }
  );

  return { pickListData, pickListLoading, pickCount: Number(pickListData?.count) || 0 };
}

export default usePickList;
