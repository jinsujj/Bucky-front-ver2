import { GetStudioListParams } from '@/api/studio';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

function useSearch() {
  const router = useRouter();
  const searchParams = useMemo(
    () => ({
      ...router.query,
    }),
    [router.query]
  );

  const search = useCallback(
    (query: GetStudioListParams, options = { shallow: true }) => {
      console.log(query);
      router.push(
        {
          pathname: '/admin/studios',
          query: { ...query },
        },
        undefined,
        options
      );
    },
    [router]
  );

  return {
    search,
    searchParams,
  };
}

export default useSearch;
