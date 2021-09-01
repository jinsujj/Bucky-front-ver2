import React, { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import useStudio from '@/hooks/useStudio';
import { useRouter } from 'next/router';
import { StudioFilterItem } from './StudioFilterItem';

function StudioFilter() {
  const router = useRouter();
  const isActive = useCallback(
    (id: number) => id === Number(router.query.studio_id),
    [router.query.studio_id]
  );

  const isActiveAllFilter = useMemo(() => !router.query.studio_id, [router.query.studio_id]);

  const { studioList, isStudioLoading } = useStudio();
  /**
   * @todo count 전체선택 갯수가 나와야 되지 않나? 지금 count는 스튜디오 종류 갯수로 나옴
   */

  const totalPicks = useMemo(
    () =>
      studioList.reduce((acc, cur) => {
        return acc + (cur.like_num || 0);
      }, 0),
    [studioList]
  );

  const handleFilterClick = useCallback(
    (id: number) => {
      router.push(`/images/pick?studio_id=${id}`);
    },
    [router]
  );

  if (isStudioLoading) {
    return (
      <Segment.Group>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment.Group>
    );
  }

  return (
    <StudioFilterBlock>
      <StudioFilterItem
        active={isActiveAllFilter}
        onClick={() => router.push('/images/pick')}
        studio_name={'전체선택'}
        like_num={totalPicks}
      />
      {studioList?.map((studio) => (
        <StudioFilterItem
          key={studio.studio_id}
          active={isActive(studio.studio_id)}
          onClick={() => handleFilterClick(studio.studio_id)}
          {...studio}
        />
      ))}
    </StudioFilterBlock>
  );
}

const StudioFilterBlock = styled.ul`
  padding-bottom: 60px;
  display: flex;
  flex-wrap: wrap;
  gap: 35px 60px;
`;

export default StudioFilter;
