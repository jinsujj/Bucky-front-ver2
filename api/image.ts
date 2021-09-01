import { transformSearchParams } from '@/utils/search/images';
import api from './api';

// Image 등록
export interface SaveImage {
  people_num: string;
  sex: string;
  color: string;
  outdoor: boolean;
  image_url: string;
  studio_id: number;
}

// pick Image 등록, 삭제
export interface PickImagePayload {
  user_id: number;
  image_id: number;
}

export interface PickmageResponse {
  image_id: number;
}

// pick Images 조회
export interface PickImageListPayload {
  image_id: number;
  image_url: string;
  studio_id: number;
  studio_name: string;
  is_release: string;
}

export interface PickImageListPayLoadResponse {
  count: number;
  last_page: number;
  select_list: PickImageListPayload[];
}

// Image 개별 정보
export interface ImageName {
  image_id: number;
  image_url: string;
  is_release: string;
  studio_id: number;
  studio_name: string;
}

export type PeopleNumber = 'ONE' | 'TWO' | 'THREE';
export type Sex = 'M' | 'F' | 'C';
export type ImageColor = 'ACHROMATIC' | 'VIVID' | 'PASTEL';
export type PriceMinMax = [number, number];
/**
 * @todo
 * 1. type 정의 주석처리 한 것처럼 저렇게 해도 에러 안나도록
 */
export interface GetSearchImageListParams {
  name?: string;
  page?: number;
  size?: number;
  people_num?: string[];
  sex?: string[];
  // people_num?: PeopleNumber[];
  // sex?: Sex[];
  outdoor?: boolean;
  hair_makeup?: boolean;
  rent_clothes?: boolean;
  tanning?: boolean;
  waxing?: boolean;
  parking?: boolean;
  color?: string[];
  // color?: ImageColor[];
  // api 나오면 재수정 필요
  price?: PriceMinMax[];
}

export interface GetImageListResponse {
  count: number;
  images: ImageName[];
  last_page: number;
}

const revisionPAge = (page: number) => {
  if (page > 1) {
    return page - 1;
  }
  return 0;
};

const getImage = async (params: GetSearchImageListParams = { page: 1 }) => {
  const { data: images } = await api.get<GetImageListResponse>('/api/v1/images', {
    params: {
      ...transformSearchParams(params),
      page: revisionPAge(Number(params.page)),
    },
  });
  return images;
};

const getImageInfo = async (imageId: number) => {
  const { data: image } = await api.get<ImageName>(`/api/v1/images/${imageId}`);
  return image;
};

const getSimilarImage = async (imageId: number, page: number) => {
  const { data: images } = await api.get<GetImageListResponse>(
    `/api/v1/images/${imageId}/similar?page=${page}&size=10`
  );
  return images;
};

const editImage = async (imageId: number, payload: SaveImage) => {
  const { data: image } = await api.put(`/api/v1/images/${imageId}`, payload);
  return image;
};

const saveImage = async (payload: SaveImage) =>
  await api.post<PickmageResponse>('/api/v1/images', payload);

const deleteImage = async (imageId: number) => {
  const { data: image } = await api.delete(`/api/v1/images/${imageId}`);
  return image;
};

const savePickImage = async ({ image_id, user_id }: PickImagePayload) => {
  const { data: image } = await api.put<PickmageResponse>(
    `/api/v1/images/${image_id}/like/${user_id}`
  );
  return image;
};

const deletePickImage = async (payload: PickImagePayload) => {
  const { data: image } = await api.delete<PickmageResponse>(
    `/api/v1/images/${payload.image_id}/unlike/${payload.user_id}`
  );
  return image;
};

const getPickImageList = async (userId: number) => {
  const { data: images } = await api.get<PickImageListPayLoadResponse>(
    `/api/v1/users/${userId}/selectList`
  );
  return images;
};

const imageApi = {
  getImage,
  getImageInfo,
  getSimilarImage,
  editImage,
  saveImage,
  deleteImage,
  savePickImage,
  deletePickImage,
  getPickImageList,
};

export default imageApi;
