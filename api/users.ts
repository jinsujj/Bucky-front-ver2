import api from './api';

// type
/*
 * @todo 다시 정의해서 추가 예정
 */

export interface ImageName {
  image_id: number;
  image_url: string;
  is_release: string;
  studio_id: number;
  studio_name: string;
}

export interface PickStudioCard {
  studio_id: number;
  studio_name: string;
  like_num: number;
}

export interface GetPickStudioListResponse {
  count: number;
  select_list: PickStudioCard[];
}

export interface PickCard {
  image_id: number;
  image_url: string;
  studio_id: number;
  studio_name: string;
  is_release: string;
}

export interface GetPickListResponse {
  count: number;
  select_list: PickCard[];
}

const getPickList = async (user_id: number) => {
  const { data } = await api.get<GetPickListResponse>(`/api/v1/users/${user_id}/selectList/`);
  return data;
};

const getPickStudioList = async (user_id: number) => {
  const { data } = await api.get<GetPickStudioListResponse>(
    `/api/v1/users/${user_id}/selectList/studios/`
  );
  return data;
};

const userApi = {
  getPickList,
  getPickStudioList,
};

export default userApi;
