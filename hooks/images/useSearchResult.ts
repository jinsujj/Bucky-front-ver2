import imageApi, { GetSearchImageListParams } from '@/api/image';
import { useQuery } from 'react-query';
import useSearch from './useSearch';

export const createSearchResultQueryKey = (params: GetSearchImageListParams) => [
  '/search/image/result',
  params,
];

function useSearchResult() {
  const { searchParams } = useSearch();

  const { data, isLoading } = useQuery(createSearchResultQueryKey({ ...searchParams }), () =>
    imageApi.getImage({ ...searchParams })
  );

  return { data, isLoading };
}

export default useSearchResult;
