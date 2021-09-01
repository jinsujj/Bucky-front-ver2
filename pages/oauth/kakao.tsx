import Head from 'next/head';
import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Loader } from 'semantic-ui-react';
import useAuth from '@/hooks/useAuth';
import kakaoAuthApi from '@/api/kakao';

export default function KaKaoAuthPage(): JSX.Element {
  const router = useRouter();
  const { setUserInfo } = useAuth();
  const code = router.query.code as string;

  const kakaoLogin = useCallback(async (code: string) => {
    if (!code) {
      return;
    }
    try {
      const { data: user } = await kakaoAuthApi.kakaoLogin({ code });
      setUserInfo(user);
    } catch (err) {
      console.log('소셜로그인 에러', err);
      window.alert('로그인에 실패하였습니다.');
    }
  }, []);
  /**
   * @todo deps 넣어도 한 번 만 실행하게 할 수 있는 방법 찾아보기
   */

  useEffect(() => {
    kakaoLogin(code);
  }, [kakaoLogin, code]);

  return (
    <div>
      <Head>
        <title>Bucky</title>
        <meta name="description" content="바디프로필 사진의 모든것!" />
      </Head>
      <main>
        <Loader>Loading</Loader>
      </main>
    </div>
  );
}
