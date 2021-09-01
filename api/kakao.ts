import api from './api';

export interface kakaoLoginParams {
  code: string;
}

export interface GetKakaoLoginResponse {
  email: string;
  name: string;
  profile_image_url: string;
  role: string;
  thumbnail_image_url: string;
  user_id: number;
}

const kakaoLogin = ({ code }: kakaoLoginParams) =>
  api.get<GetKakaoLoginResponse>('/api/oauth2/kakao', {
    params: {
      code,
      //redirect_url: 'http://localhost:3000/oauth/kakao', // 로컬 테스트시 주석 해제
    },
  });

const kakaoAuthApi = {
  kakaoLogin,
};

export default kakaoAuthApi;
