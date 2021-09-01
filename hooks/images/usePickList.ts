import imageApi from '@/api/image';
import { useQuery } from 'react-query';
import useAuth from '../useAuth';

export const createMyPickListKey = (userId: number) => ['/my_pick_list', userId];

function usePickList() {
  const { user, isAuthenticated } = useAuth();

  const { data: pickList, isLoading: pickListLoading } = useQuery(
    createMyPickListKey(user?.user_id || 0),
    async () => {
      if (!isAuthenticated) {
        return [];
      }
      return imageApi.getPickImageList(user?.user_id || 0);
    }
  );

  return { pickList, pickListLoading };
}

export default usePickList;
