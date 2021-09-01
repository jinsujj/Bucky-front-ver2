import React, { useState } from 'react';
import styled from '@emotion/styled';
import studioApi from '@/api/studio';
import { Container, Icon, Segment, Sidebar, Loader } from 'semantic-ui-react';
import VerticalSidebar from '@/components/admin/Layout/VerticalSidebar';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import StudioForm from '@/components/admin/StudioForm';

const createStudioUpdateQueryKey = (id: number) => ['/studio/edit', id];

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  const { id } = context.query;
  const studioId = Number(id);
  await queryClient.prefetchQuery(createStudioUpdateQueryKey(studioId), () =>
    studioApi.getStudio(studioId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function StudioEditPage() {
  const [visible, setVisible] = useState(true);
  const closeSidebar = () => setVisible(false);
  const openSidebar = () => setVisible(true);

  const router = useRouter();
  console.log(router);
  const { id } = router.query;
  const studioId = Number(id);

  const { data, isLoading } = useQuery(createStudioUpdateQueryKey(studioId), () =>
    studioApi.getStudio(studioId)
  );
  console.log('data', data);

  return (
    <>
      <Sidebar.Pushable as={Segment} style={{ overflow: 'visible' }}>
        <VerticalSidebar visible={visible} />
        <Sidebar.Pusher>
          <Segment basic>
            <Container className="container">
              {visible ? (
                <Icon name="angle left" size="large" onClick={closeSidebar}></Icon>
              ) : (
                <Icon name="angle right" size="large" onClick={openSidebar}></Icon>
              )}
              <Title>스튜디오 수정 </Title>
              {isLoading ? <Loader /> : <StudioForm />}
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
}

export default StudioEditPage;

const Title = styled.h1`
  font-size: 28px;
  line-height: 1.53;
  font-weight: bold;
  display: block;
`;
