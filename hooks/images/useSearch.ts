import { GetSearchImageListParams } from '@/api/image';
import {
  defaultSearchParams,
  detransformSearchParams,
  transformSearchParams,
} from '@/utils/search/images';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';

function useSearch() {
  const router = useRouter();
  const searchParams = useMemo(
    () => ({
      ...defaultSearchParams,
      ...detransformSearchParams(router.query),
    }),
    [router.query]
  );

  const search = useCallback(
    (params: GetSearchImageListParams) => {
      router.push({
        pathname: '/',
        query: {
          ...transformSearchParams(params),
        },
      });
    },
    [router]
  );

  return {
    searchParams,
    search,
  };
}

export default useSearch;
