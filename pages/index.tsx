import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/Layout';
import useSearchResult, { createSearchResultQueryKey } from '@/hooks/images/useSearchResult';
import { GetServerSidePropsContext } from 'next';
import { QueryClient } from 'react-query';
import { defaultSearchParams, detransformSearchParams } from '@/utils/search/images';
import imageApi from '@/api/image';
import { dehydrate } from 'react-query/hydration';
import ImageResult from '@/components/ImageResult';
import colors from '@/styles/colors';
import { css } from '@emotion/react';
import { GA_TRACKING_ID } from 'utils/gtag';

const noResult =
  'https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/assets/icons/no+result.svg';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryClient = new QueryClient();
  const { query } = context;

  await queryClient.prefetchQuery(createSearchResultQueryKey(query), () =>
    imageApi.getImage({
      ...defaultSearchParams,
      ...detransformSearchParams(query),
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home(): JSX.Element {
  const { data } = useSearchResult();

  return (
    <div>
      <Head>
        <title>Bucky | 바디프로필 사진의 모든것!</title>
        {/* Naver 검색 등록 */}
        <meta name="naver-site-verification" content="ce3057fd989bb115ed054354fe0196aada9a3ab2" />
        {/* 메타 정보 */}
        <meta name="description" content="바디프로필 사진의 모든것!" />
        <meta name="Keywords" content="Body, profile, 바디 프로필" />
        <meta property="og:title" content="Bucky" />
        <meta property="og:description" content="바디프로필 사진의 모든것!" />
        <meta
          property="og:image"
          content="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/assets/Logo/Bucky_Logo.png"
        />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });`,
          }}
        />
      </Head>
      <Layout
        headerProps={{
          fixed: true,
        }}
      >
        <Container noResult={data?.count === 0}>
          {data?.count === 0 ? (
            <>
              <NoResultImg src={noResult} alt="noImage" />
              <NoResultTag>일치하는 결과가 없어요</NoResultTag>
            </>
          ) : (
            <ImageResult />
          )}
        </Container>
      </Layout>
    </div>
  );
}

const Container = styled.div<{ noResult: boolean }>`
  position: relative;
  padding-top: 140px;
  width: 1200px;
  margin: 0 auto;

  ${(props) =>
    props.noResult &&
    css`
      padding: 40px 0;
      flex-direction: column;
      display: flex;
      background-color: ${colors.gray[200]};
      width: 100%;
      min-height: 100vh;
      justify-content: center;
      align-items: center;
    `}

  @media only screen and (max-width: 1250px) {
    width: 95%;
  }
`;

const NoResultImg = styled.img`
  align-items: center;
`;

const NoResultTag = styled.div`
  font-weight: 500;
  font-size: 36px;
  text-align: center;
  letter-spacing: -0.045em;
  text-indent: 1px;
  margin-top: 20px;
  color: #393a3c;
`;
