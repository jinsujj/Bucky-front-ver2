import React, { useState } from 'react';
import styled from '@emotion/styled';
import studioApi from '@/api/studio';
import { Form, Pagination, Loader, Table, Checkbox, CheckboxProps } from 'semantic-ui-react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import NextLink from 'next/link';
import { convertTime } from 'lib/utils/format';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import useSearchResult, { createSearchResultQueryKey } from '@/hooks/studio/useSearchResult';
import useSearch from '@/hooks/studio/useSearch';
import Button from '@/components/Button';
import Layout from '@/components/admin/Layout';

const defaultParams = {
  page: 1,
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  const { query } = context;

  await queryClient.prefetchQuery(createSearchResultQueryKey(query), () =>
    studioApi.getStudioList({ ...query, ...defaultParams })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

function StudioPage() {
  const { search, searchParams } = useSearch();
  const { data: studioData, isLoading } = useSearchResult();

  const [checkedIds, setCheckedIds] = useState<Array<number>>([]);

  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const clearCheckIds = () => setCheckedIds([]);

  const deleteStudio = async () => {
    if (!checkedIds.length) {
      alert('삭제할 스튜디오를 선택해주세요');
      return;
    }
    try {
      setIsLoadingDelete(true);
      const [...deleteIds] = await Promise.all([
        ...checkedIds.map((id) => studioApi.deleteStudio(id)),
      ]);
      console.log(deleteIds);
      alert(`스튜디오 ${deleteIds.toString()} 가 정상적으로 삭제 되었습니다`);
      clearCheckIds();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  const handlePageChange = (activePage: number) => {
    search({ page: activePage });
  };

  const handleCheckboxChange = (id: number, data: CheckboxProps) => {
    if (data.checked) {
      setCheckedIds(checkedIds.concat(id));
    } else {
      setCheckedIds(checkedIds.filter((studioId) => studioId !== id));
    }
  };

  return (
    <Layout title="스튜디오 관리">
      <FormWrapper>
        <Form>
          <Form.Field>
            <input type="text" name="name" placeholder="스튜디오명을 입력해주세요" />
          </Form.Field>
        </Form>
      </FormWrapper>
      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <HeaderAction>
              {/* count가 갯수가 아니고 지금 현재 page로 값이 오고 있다. */}
              <TotalCount>총 {studioData?.studios?.length || 0} 개</TotalCount>
              <Button
                color="secondary"
                variant="contained"
                disabled={isLoading || isLoadingDelete}
                onClick={() => deleteStudio()}
              >
                삭제
              </Button>
            </HeaderAction>

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>선택</Table.HeaderCell>
                  <Table.HeaderCell>No</Table.HeaderCell>
                  <Table.HeaderCell>상호명</Table.HeaderCell>
                  <Table.HeaderCell>주소</Table.HeaderCell>
                  <Table.HeaderCell>연락처</Table.HeaderCell>
                  <Table.HeaderCell>이미지</Table.HeaderCell>
                  <Table.HeaderCell>등록 일자</Table.HeaderCell>
                  <Table.HeaderCell>수정 일자</Table.HeaderCell>
                  <Table.HeaderCell>승인 일자</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {studioData?.studios.map((studio, index) => (
                  <Table.Row key={studio.studio_id}>
                    <Table.Cell>
                      <Checkbox
                        onChange={(_, data) => handleCheckboxChange(studio.studio_id, data)}
                      />
                    </Table.Cell>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>
                      <NextLink href={`/admin/studios/${studio.studio_id}`} passHref>
                        {studio.name}
                      </NextLink>
                    </Table.Cell>
                    <Table.Cell>{studio.address}</Table.Cell>
                    <Table.Cell>{studio.phone}</Table.Cell>
                    <Table.Cell>
                      <NextLink href={`/admin/images/new?id=${studio.studio_id}`} passHref>
                        <ImageEditPageLink>{studio.total_images}</ImageEditPageLink>
                      </NextLink>
                    </Table.Cell>
                    <Table.Cell>{convertTime(studio.create_time)}</Table.Cell>
                    <Table.Cell>{convertTime(studio.update_time)}</Table.Cell>
                    <Table.Cell>{studio.is_release || ''}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <PaginationWrapper>
              <Pagination
                activePage={Number(searchParams.page) || 1}
                totalPages={studioData?.last_page as number}
                onPageChange={(e, { activePage }) => handlePageChange(activePage as number)}
              />
            </PaginationWrapper>
          </>
        )}
      </div>
    </Layout>
  );
}

export default StudioPage;

const FormWrapper = styled.div`
  padding: 20px 0;
`;

const PaginationWrapper = styled.div`
  padding: 20px 0;
`;

const HeaderAction = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalCount = styled.h2`
  font-size: 20px;
`;

const ImageEditPageLink = styled.a``;
