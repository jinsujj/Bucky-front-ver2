import React from 'react';
import styled from '@emotion/styled';
import Layout from '@/components/Layout';
import colors from '@/styles/colors';

import SutdioFilter from '@/components/StudioFilter';
import PickImageResult from '@/components/PickImageResult';

const Pick = () => {
  return (
    <>
      <Layout
        headerProps={{
          fixed: true,
        }}
      >
        <Container>
          <Title>찜한 사진</Title>
          <SutdioFilter />
          <Divider />
          <PickImageResult />
        </Container>
      </Layout>
    </>
  );
};

export default Pick;

const Container = styled.section`
  position: relative;
  padding-top: 140px;
  width: 1200px;
  margin: 0 auto;

  @media only screen and (max-width: 1250px) {
    width: 95%;
  }
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 36px;
  line-height: 1;
  margin-bottom: 36px;
  color: black;
`;

const Divider = styled.div`
  background-color: ${colors.gray[200]};
  width: 100%;
  height: 1px;
  margin-bottom: 100px;
`;
