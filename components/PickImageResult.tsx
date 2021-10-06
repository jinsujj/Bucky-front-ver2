import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ImageCard from '@/components/ImageCard';
import styled from '@emotion/styled';
import { PickCard } from '@/api/users';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
import usePickList from '@/hooks/usePickList';
import Button from '@/components/Button';
import colors from '@/styles/colors';

function PickImageResult() {
  const { pickListLoading, pickList, count } = usePickList();

  const [pickIdList, setPickIdList] = useState<Array<number>>([]);
  const [page, setPage] = useState<number>(1);

  const displayPickList: PickCard[] = useMemo(() => pickList.slice(0, page * 30), [page, pickList]);
  const isPicked = useCallback(
    (imageId: number) => {
      const pickSet = new Set(pickIdList);
      return pickSet.has(imageId);
    },
    [pickIdList]
  );

  useEffect(() => {
    if (!pickListLoading) {
      setPickIdList(pickList.map(({ image_id }) => image_id));
    }
  }, [pickListLoading, pickList]);

  const isLastPage = useMemo(() => Math.ceil(count / 30) === page, [count, page]);

  const loadMoreImages = () => {
    setPage((page) => page + 1);
  };

  const updatePickList = ({ image_id, isPicked }: { image_id: number; isPicked: boolean }) => {
    isPicked
      ? setPickIdList((pickIdList) => pickIdList.concat(image_id))
      : setPickIdList((pickIdList) => pickIdList?.filter((id) => id !== image_id));
  };

  if (pickListLoading) {
    return (
      <Segment.Group>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      </Segment.Group>
    );
  }

  return (
    <ImageResultBlock>
      <ImageListBlock>
        <ResponsiveMasonry columnsCountBreakPoints={{ 380: 3, 760: 3, 1140: 3 }}>
          <Masonry columnsCount={5} gutter={20}>
            {displayPickList?.map((image) => (
              <ImageCard
                key={image.image_id}
                image={image}
                isPicked={isPicked(image.image_id)}
                updatePickList={updatePickList}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </ImageListBlock>
      {!isLastPage && (
        <Action>
          <LoadButton onClick={() => loadMoreImages()}>
            {pickListLoading ? 'Loading...' : 'VIEW MORE'}
          </LoadButton>
        </Action>
      )}
    </ImageResultBlock>
  );
}

const ImageResultBlock = styled.section`
  padding: 0 0 140px 0;
`;

const ImageListBlock = styled.div`
  margin-bottom: 60px;
`;

const Action = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 120px;
`;

const LoadButton = styled(Button)`
  width: 140px;
  height: 48px;
  border: 1px solid ${colors.gray[400]};
  border-radius: 50px;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;

  @media only screen and (max-width: 450px) {
    width: 120px;
    height: 32px;
    font-size: 9px;
  }
`;

export default PickImageResult;
