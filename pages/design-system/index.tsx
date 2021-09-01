import Head from 'next/head';
import React from 'react';
import colors from '@/styles/colors';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export default function DesignSysytemPage(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Bucky | DesignSysytem</title>
        <meta name="description" content="Bucky | DesignSysytem" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Title>Design System |Colors </Title>
      <main>
        <>
          <SubTitle>Text Default</SubTitle>
          <Paragraph>Bucky: 내가 원하는 Body Profile Studio 찾기!</Paragraph>
        </>
        <>
          <SubTitle>Text Primary</SubTitle>
          <Paragraph
            css={css`
              color: ${colors.text.primary};
            `}
          >
            Bucky: 내가 원하는 Body Profile Studio 찾기!
          </Paragraph>
        </>
        <>
          <SubTitle>Text Secondary</SubTitle>
          <Paragraph
            css={css`
              color: ${colors.text.secondary};
            `}
          >
            Bucky: 내가 원하는 Body Profile Studio 찾기!
          </Paragraph>
        </>
        <>
          <SubTitle>Primary</SubTitle>
          <Paragraph
            css={css`
              color: ${colors.primary[5]};
            `}
          >
            Bucky: 내가 원하는 Body Profile Studio 찾기!
          </Paragraph>
        </>
        <>
          <SubTitle>Success</SubTitle>
          <Paragraph
            css={css`
              color: ${colors.sucesss};
            `}
          >
            Bucky: 내가 원하는 Body Profile Studio 찾기!
          </Paragraph>
        </>
        <>
          <SubTitle>Error</SubTitle>
          <Paragraph
            css={css`
              color: ${colors.error};
            `}
          >
            Bucky: 내가 원하는 Body Profile Studio 찾기!
          </Paragraph>
        </>
      </main>
    </div>
  );
}

const Title = styled.h1`
  font-size: 40px;
`;

const SubTitle = styled.h2`
  font-size: 16px;
  margin: 8px 0;
`;

const Paragraph = styled.p`
  font-size: 28px;
  margin: 0 0 8px 0;
`;
