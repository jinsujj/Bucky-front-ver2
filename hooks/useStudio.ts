import userApi, { GetPickStudioListResponse } from '@/api/users';
import { useMemo } from 'react';
import useAuth from '@/hooks/useAuth';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';

export const createMyStudioListKey = (userId: number, studio_id: number) => [
  '/my_studio_list',
  { userId, studio_id },
];

function useStudio() {
  const router = useRouter();
  const { user } = useAuth();

  const { data: studioListData, isLoading: isStudioLoading } = useQuery<GetPickStudioListResponse>(
    createMyStudioListKey(Number(user?.user_id || 0), Number(router.query.studio_id) || 0),
    () => userApi.getPickStudioList(Number(user?.user_id || 0))
  );

  const studioList = useMemo(() => studioListData?.select_list || [], [studioListData]);
  const count = useMemo(() => studioListData?.count || 0, [studioListData]);

  return {
    count,
    isStudioLoading,
    studioList,
  };
}

export default useStudio;
