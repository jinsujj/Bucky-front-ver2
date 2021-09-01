import userApi, { GetPickListResponse } from '@/api/users';
import { useMemo } from 'react';
import useAuth from '@/hooks/useAuth';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export interface PickSearchParams {
  userId: number;
  page?: number;
  studioId?: number;
}

export const createMyPickListKey = (userId: number, studioId: number) => [
  '/my_pick_list',
  {
    userId,
    studioId,
  },
];

function usePickList() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: pickListData, isLoading: pickListLoading } = useQuery<GetPickListResponse>(
    createMyPickListKey(Number(user?.user_id || 0), Number(router.query.studioId) || 0),
    () => userApi.getPickList(Number(user?.user_id || 0))
  );

  const pickList = useMemo(() => {
    if (!router.query.studio_id) {
      return pickListData?.select_list || [];
    }
    return (
      pickListData?.select_list.filter(
        ({ studio_id }) => studio_id === Number(router.query.studio_id)
      ) || []
    );
  }, [pickListData, router.query.studio_id]);
  const count = useMemo(() => pickListData?.count || 0, [pickListData]);

  return {
    count,
    pickListLoading,
    pickList,
  };
}

export default usePickList;
