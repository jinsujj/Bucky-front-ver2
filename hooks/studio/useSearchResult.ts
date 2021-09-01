import studioApi, { GetStudioListParams } from '@/api/studio';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

export const createSearchResultQueryKey = (params: GetStudioListParams) => [
  'studioList/search',
  params,
];

function useSearchResult() {
  const router = useRouter();
  const params = { ...router.query };

  const { data, isLoading } = useQuery(createSearchResultQueryKey(params), () =>
    studioApi.getStudioList(params)
  );

  return { data, isLoading };
}

export default useSearchResult;
