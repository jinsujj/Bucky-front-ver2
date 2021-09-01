import { GetSearchImageListParams } from '@/api/image';
import { ParsedUrlQuery } from 'querystring';

export const defaultSearchParams: GetSearchImageListParams = {
  name: '',
  page: 1,
};

/**
 * url query를 searchParams로 변환합니다.
 * @param query SearchParams
 */
export const detransformSearchParams = (query: ParsedUrlQuery) => {
  const params: GetSearchImageListParams = {
    ...query,
  };

  if (query.name) {
    params.name = query.name as string;
  }

  if (query.page) {
    params.page = Number(query.page);
  }

  if (query.size) {
    params.size = Number(query.size);
  }

  if (query.people_num) {
    params.people_num = (query.people_num as string).split(',');
  }

  if (query.sex) {
    params.sex = (query.sex as string).split(',');
  }

  if (query.outdoor) {
    params.outdoor = query.outdoor === 'true';
  }

  if (query.hair_makeup) {
    params.hair_makeup = query.hair_makeup === 'true';
  }

  if (query.rent_clothes) {
    params.rent_clothes = query.rent_clothes === 'true';
  }

  if (query.tanning) {
    params.tanning = query.tanning === 'true';
  }

  if (query.waxing) {
    params.waxing = query.waxing === 'true';
  }

  if (query.parking) {
    params.parking = query.parking === 'true';
  }

  if (query.color) {
    params.color = (query.color as string).split(',');
  }

  return params;
};

/**
 * searchParams를 url query로 가공합니다.
 * @param query SearchParams
 */
export const transformSearchParams = (params: GetSearchImageListParams) => {
  return Object.entries(params).reduce((acc, [key, val]) => {
    if (key === 'page') {
      return {
        ...acc,
        page: String(Number(val)),
      };
    }
    return {
      ...acc,
      [key]: String(val),
    };
  }, {});
};
