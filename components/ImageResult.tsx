import imageApi, { ImageName } from '@/api/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useAuth from '@/hooks/useAuth';
import useSearchResult from '@/hooks/images/useSearchResult';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ImageCard from '@/components/ImageCard';
import styled from '@emotion/styled';
import Button from '@/components/Button';
import colors from '@/styles/colors';
import useSearch from '@/hooks/images/useSearch';
import userApi from '@/api/users';
import { Dimmer, Loader, Segment } from 'semantic-ui-react';
// import { useQuery } from 'react-query';
// import { useInfiniteQuery } from 'react-query';

/**
 * @todo
 *  useInfiniteQuery로 적용
 * Loading Button에 Spinner ui 적용
 * Loading Skeleton UI 적용
 */

function ImageResult() {
  const { user } = useAuth();
  const { data, isLoading } = useSearchResult();
  const [isPickListLoading, setIsPickListLoading] = useState(false);
  const lastPage = data?.last_page;
  const { searchParams } = useSearch();
  const [imageList, setImageList] = useState<ImageName[]>([]);
  const [pickList, setPickList] = useState<number[]>([]);
  const [page, setPage] = useState(searchParams.page || 1);

  // User Pick Image Cnt
  useEffect(() => {
    if (!user?.user_id) {
      setPickList([]);
      return;
    }
    setIsPickListLoading(true);
    getPickImages(user?.user_id);
  }, [user]);

  // Image List
  useEffect(() => {
    if (!isLoading || !isPickListLoading) {
      setImageList(data?.images || []);
    }
  }, [isLoading, data?.images, isPickListLoading]);

  // Pick List
  const getPickImages = async (user_id: number) => {
    const data = await userApi.getPickList(user_id);
    setPickList(data.select_list.map(({ image_id }) => image_id));
    setIsPickListLoading(false);
  };

  // Heart Pick Logic
  const isPicked = useCallback(
    (imageId: number) => {
      const pickSet = new Set(pickList);
      return pickSet.has(imageId);
    },
    [pickList]
  );

  const isLastPage = useMemo(() => page === lastPage, [page, lastPage]);

  const updatePickList = ({ image_id, isPicked }: { image_id: number; isPicked: boolean }) => {
    isPicked
      ? setPickList((pickIdList) => pickIdList.concat(image_id))
      : setPickList((pickIdList) => pickIdList?.filter((id) => id !== image_id));
  };

  const loadMoreImages = async () => {
    const loadedImageList = await imageApi.getImage({
      ...searchParams,
      page: page + 1,
    });
    setImageList(imageList.concat(loadedImageList?.images || []));
    setPage(page + 1);
  };

  if (isLoading) {
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
      <ImageCount>{data?.count} 개의 사진이 검색되었습니다</ImageCount>
      <ImageListBlock>
        <ResponsiveMasonry columnsCountBreakPoints={{ 380: 1, 450: 2, 900: 3 }}>
          <Masonry columnsCount={5} gutter={20}>
            {imageList.map((image) => (
              <ImageCard
                key={image.image_url}
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
            {isLoading ? 'Loading...' : 'VIEW MORE'}
          </LoadButton>
        </Action>
      )}
    </ImageResultBlock>
  );
}

const ImageResultBlock = styled.section`
  padding: 0 0 140px 0;
`;

const ImageCount = styled.div`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 26px;
  line-height: 32px;
  letter-spacing: -0.05em;
  text-indent: 1px;
  margin-bottom: 20px;

  color: #000000;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    line-height: 16px;
  }
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

export default ImageResult;
