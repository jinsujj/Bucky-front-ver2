import api from './api';

// Studio Info
export interface GetStudioRespone {
  name: string;
  min_price: number;
  max_price: number;
  homepage: string;
  instagram: string;
  naver: string;
  kakao: string;
  description: string;
  hair_makeup: boolean;
  rent_clothes: boolean;
  tanning: boolean;
  waxing: boolean;
  parking: boolean;
  is_deleted: boolean;
}

// Studio Image Info
export interface StudioImage {
  image_id: number;
  people_num: string;
  sex: string;
  color: string;
  outdoor: boolean;
  image_url: string;
  studio_id: number;
  create_time: string;
  update_time: string;
  is_delete: string;
  is_release: string;
}

// Studio Phone Info
export interface StudioPhone {
  phone: string;
  is_main: string;
}

// Studio Menu Info
export interface StudioMenu {
  product_name: string;
  price: number;
  description: string;
}

// Studio Address Info
export interface StudioAddress {
  address: string;
  is_main: string;
}

// Pick Studio Info
export interface PickStudio {
  studio_id: number;
  studio_name: string;
  like_num: number;
}

export interface PickStudioResponse {
  count: number;
  select_list: PickStudio[];
}

export interface GetStudioImageListResponse {
  count: number;
  images: StudioImage[];
}

export interface GetStudioPhoneListResponse {
  count: number;
  phones: StudioPhone[];
}

export interface GetStudioMenuListResponse {
  count: number;
  menu_board: StudioMenu[];
}

export interface GetStudioAddressListResponse {
  count: number;
  address: StudioAddress[];
}

// Studio List
export interface StudioName {
  studio_id: number;
  name: string;
}

export interface GetStudioNameListResponse {
  count: number;
  studios: StudioName[];
}

export interface GetStudioListParams {
  page?: number;
  name?: string;
}

// Studio summary Info
export interface StudioSummary {
  address: string;
  create_time: string | null;
  is_release: boolean | null;
  name: string;
  phone: string;
  studio_id: number;
  total_images: number;
  update_time: string;
}

export interface GetStudioListResponse {
  count: number;
  last_page: number;
  studios: StudioSummary[];
}

export interface SaveStudioPayload {
  name: string;
  min_price: number;
  max_price: number;
  homepage: string;
  instagram: string;
  naver: string;
  kakao: string;
  description: string;
  hair_makeup: boolean;
  rent_clothes: boolean;
  tanning: boolean;
  waxing: boolean;
  parking: boolean;
  user_id: number;
}

export interface SaveStudioResponse {
  studio_id: number;
}

export interface Phone {
  phone: string;
  is_main: 'Y' | 'N';
}

export interface Menu {
  product_name: string;
  price: number;
  description: string;
}

export interface SaveMenuResponse {
  studio_id: number;
}

export interface SaveStudioPhonesResponse {
  studio_id: number;
}

export interface Address {
  address: string;
  is_main: 'Y' | 'N';
}
export interface SaveStudioAddressPayload {
  address: Array<Address>;
}

export interface SaveStudioPhonesResponse {
  studio_id: number;
}

const getStudio = async (studio_id: number) => {
  const { data: studios } = await api.get<GetStudioRespone>(`/api/v1/studios/${studio_id}`);
  return studios;
};

const getStudioPhone = async (studio_id: number) => {
  const { data: phone } = await api.get<GetStudioPhoneListResponse>(
    `/api/v1/studios/${studio_id}/phones`
  );
  return phone;
};

const getStudioMenu = async (studio_id: number) => {
  const { data: menu } = await api.get<GetStudioMenuListResponse>(
    `/api/v1/studios/${studio_id}/menus`
  );
  return menu;
};

const getStudioAddress = async (studio_id: number) => {
  const { data: address } = await api.get<GetStudioAddressListResponse>(
    `/api/v1/studios/${studio_id}/addresses`
  );
  return address;
};

const getStudioAll = async () => {
  const { data: studios } = await api.get<GetStudioNameListResponse>('/api/v1/studios/all');
  return studios;
};

const getStudioImages = async (studio_id: number) => {
  const { data: images } = await api.get<GetStudioImageListResponse>(
    `/api/v1/studios/${studio_id}/images?page=0&size=20`
  );
  return images;
};

const revisionPAge = (page: number) => {
  if (page > 1) {
    return page - 1;
  }
  return 0;
};

const getStudioList = async ({ page = 1 }: GetStudioListParams) => {
  const { data: studios } = await api.get<GetStudioListResponse>('/api/v1/studios', {
    params: {
      page: revisionPAge(page),
    },
  });
  return studios;
};

const saveStudio = (payload: SaveStudioPayload) =>
  api.post<SaveStudioResponse>('/api/v1/studios', payload);

const deleteStudio = async (studio_id: number) => {
  const { data: studioId } = await api.delete(`/api/v1/studios/${studio_id}`);
  return studioId?.id;
};

const saveStudioPhones = (studio_id: number, payload: Array<Phone>) =>
  api.post<SaveStudioResponse>(`/api/v1/studios/${studio_id}/phones`, payload);

const saveStudioAddress = (studio_id: number, payload: Array<Address>) =>
  api.post<SaveStudioResponse>(`/api/v1/studios/${studio_id}/addresses`, payload);

const saveStudioMenus = (studio_id: number, payload: Array<Menu>) =>
  api.post<SaveMenuResponse>(`/api/v1/studios/${studio_id}/menus`, payload);

const getPickStudios = (user_id: number) => {
  api.post<PickStudioResponse>(`/api/v1/users/${user_id}/selectList/studios`);
};

const studioApi = {
  getStudio,
  getStudioPhone,
  getStudioAddress,
  getStudioMenu,
  getStudioAll,
  getStudioImages,
  getPickStudios,
  saveStudio,
  getStudioList,
  saveStudioPhones,
  saveStudioAddress,
  saveStudioMenus,
  deleteStudio,
};

export default studioApi;
