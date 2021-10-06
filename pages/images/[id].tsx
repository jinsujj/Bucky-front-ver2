import React, { useCallback, useEffect, useMemo, useState } from 'react';
import studioApi, {
  GetStudioRespone,
  GetStudioPhoneListResponse,
  GetStudioAddressListResponse,
  GetStudioMenuListResponse,
} from '@/api/studio';
import imageApi, { ImageName } from '@/api/image';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import styled from '@emotion/styled';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Link from 'next/link';
import Layout from '@/components/Layout';
import useAuth from '@/hooks/useAuth';
import colors from '@/styles/colors';
import PickButton from '@/components/PickButton';
import Button from '@/components/Button';
import ImageCard from '@/components/ImageCard';
import { css } from '@emotion/react';

interface ImageDetailPageProps {
  ImageInfo: ImageName;
  studioInfo: GetStudioRespone;
  phoneList: GetStudioPhoneListResponse;
  addresses: GetStudioAddressListResponse;
  menus: GetStudioMenuListResponse;
}

const ImageDetailPage = ({
  ImageInfo,
  studioInfo,
  phoneList,
  addresses,
  menus,
}: ImageDetailPageProps) => {
  const { user } = useAuth();
  const [similarImage, setSimilarImage] = useState<ImageName[]>([]);
  const [isMainImgPicked, setIsMainImgPicked] = useState(false);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [isPickListLoading, setIsPickListLoading] = useState(false);
  const [pickIdList, setPickIdList] = useState<number[]>([]);
  const [isShownPopover, setIsShownPopover] = useState(false);
  const [beforeImage, setBeforeImage] = useState(0);
  const userId = user?.user_id || 0;

  useEffect(() => {
    if (user) {
      getPickImages(user.user_id);
    }
  }, [user]);

  useEffect(() => {
    setPage(0);
    similarImages(ImageInfo.image_id);
  }, [ImageInfo.image_id]);

  // Left Top Main Image Heart Logic
  const getPickImages = async (user_id: number) => {
    const images = await imageApi.getPickImageList(user_id);
    setIsMainImgPicked(images.select_list.some((image) => image.image_id === ImageInfo.image_id));
    setPickIdList(images.select_list.map(({ image_id }) => image_id));
  };

  const savePickImage = async (imageId: number) => {
    setIsMainImgPicked(true);
    await imageApi.savePickImage({ user_id: userId, image_id: imageId });
  };

  const deletePickImage = async (imageId: number) => {
    setIsMainImgPicked(false);
    await imageApi.deletePickImage({ user_id: userId, image_id: imageId });
  };

  const handleImageWrapperClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isShownPopover) {
      setIsShownPopover(false);
      event.preventDefault();
    }
  };

  const handleChangePopover = useCallback((visible) => {
    setIsShownPopover(visible);
  }, []);

  const handleHeartClick = () => {
    console.log(isMainImgPicked);
    isMainImgPicked ? deletePickImage(ImageInfo.image_id) : savePickImage(ImageInfo.image_id);
  };

  // Similar Image Logic
  const similarImages = async (image_id: number) => {
    let images;
    beforeImage !== image_id
      ? (images = await imageApi.getSimilarImage(image_id, 0))
      : (images = await imageApi.getSimilarImage(image_id, page));

    setSimilarImage(images.images);
    setLastPage(images.last_page);
    setBeforeImage(image_id);
  };

  const loadMoreImages = async () => {
    console.log('lastpage' + lastPage);

    console.log('page' + page);
    setIsPickListLoading(true);
    setPage(page + 1);
    const loadedImageList = await imageApi.getSimilarImage(ImageInfo.image_id, page);
    setSimilarImage(similarImage.concat(loadedImageList?.images || []));
    console.log('page' + page);
    setIsPickListLoading(false);
  };

  const isPicked = useCallback(
    (imageId: number) => {
      const pickSet = new Set(pickIdList);
      return pickSet.has(imageId);
    },
    [pickIdList]
  );

  const updatePickList = ({ image_id, isPicked }: { image_id: number; isPicked: boolean }) => {
    isPicked
      ? setPickIdList((pickIdList) => pickIdList.concat(image_id))
      : setPickIdList((pickIdList) => pickIdList.filter((id) => id !== image_id));
  };

  const isLastPage = useMemo(() => page === lastPage, [page, lastPage]);

  return (
    <>
      <Layout
        headerProps={{
          fixed: true,
          noSearchForm:500
        }}
      >
        <Container>
          <Border>
            <ItemLeft>
              <ProfileImageWrapper onClick={handleImageWrapperClick}>
                <ImageMain src={ImageInfo.image_url} alt="main" />
                <StudioCardBlock isPicked={isMainImgPicked}>
                  <BookmarkWrapper>
                    <PickButton
                      onClick={handleHeartClick}
                      isPicked={isMainImgPicked}
                      visible={isShownPopover}
                      onChangePopover={handleChangePopover}
                    />
                  </BookmarkWrapper>
                </StudioCardBlock>
              </ProfileImageWrapper>
            </ItemLeft>
            <ItemRight>
              <Link href={encodeURI(`/?name=${studioInfo?.name}`)} passHref>
                <TitleLink>
                  <Title>{studioInfo?.name}</Title>
                </TitleLink>
              </Link>
              <hr />
              <StudioInfo>
                {addresses.count !== 0 && <Label>주소</Label>}
                {addresses?.address.map((address) => (
                  <div key={address.address}>{address.address}</div>
                ))}
                <br />
                {phoneList.count !== 0 && <Label>연락처</Label>}
                {phoneList?.phones.map((phone) => (
                  <div key={phone.phone}>{phone.phone}</div>
                ))}
                <br />
              </StudioInfo>
              <LinkIcon>
                {/* Homepage */}
                <Link href={studioInfo?.homepage} passHref>
                  <a target="_blank" href={studioInfo?.homepage} rel="noreferrer">
                    <IconImage
                      src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/Home.svg"
                      alt="Home"
                    />
                  </a>
                </Link>
                {/* Instagram */}
                {studioInfo?.instagram !== '' && (
                  <>
                    <IconImage
                      src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/bar.png"
                      alt="bar"
                    />
                    <Link href={studioInfo?.instagram} passHref>
                      <a target="_blank" href={studioInfo?.instagram} rel="noreferrer">
                        <IconImage
                          src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/Instagram.svg"
                          alt="instagram"
                        />
                      </a>
                    </Link>
                  </>
                )}
                {/* Kakao */}
                {studioInfo.kakao !== '' && (
                  <>
                    <IconImage
                      src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/bar.png"
                      alt="bar"
                    />
                    <Link href={studioInfo.kakao} passHref>
                      <a target="_blank" href={studioInfo.kakao} rel="noreferrer">
                        <IconImage
                          src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/KaKao.svg"
                          alt="Kakako"
                        />
                      </a>
                    </Link>
                  </>
                )}
                {/* Naver */}
                {studioInfo.naver !== '' && (
                  <>
                    <IconImage
                      src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/bar.png"
                      alt="bar"
                    />
                    <Link href={studioInfo.naver} passHref>
                      <a target="_blank" href={studioInfo.naver} rel="noreferrer">
                        <IconImage
                          src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/Naver.svg"
                          alt="Naver"
                        />
                      </a>
                    </Link>
                  </>
                )}
              </LinkIcon>
              <hr />
              <Label>가격대</Label>
              <Value>
                {studioInfo?.min_price} ~ {studioInfo?.max_price} 원
              </Value>
              <br />
              <Label>부가서비스</Label>
              {studioInfo?.hair_makeup && <Value>헤어&메이크업</Value>}
              {studioInfo?.parking && <Value>주차장</Value>}
              {studioInfo?.rent_clothes && <Value>옷 대여</Value>}
              <br />
              <Label>촬영메뉴</Label>
              <MenuName>
                {menus.menu_board &&
                  menus.menu_board.map((menu) => (
                    <>
                      <p key={menu.product_name}>
                        <b>
                          {menu.product_name} - {menu.price}
                        </b>
                      </p>
                      <p>{menu.description}</p>
                    </>
                  ))}
              </MenuName>
              <hr />
              <Description>{studioInfo?.description}</Description>
            </ItemRight>
          </Border>
          <Item>
            <H3>이 사진과 유사한 사진</H3>
            <ResponsiveMasonry columnsCountBreakPoints={{ 380: 1, 450: 2, 900: 3 }}>
              <Masonry columnsCount={5} gutter={20}>
                {similarImage.map((image) => (
                  <Link href={`/images/${image.image_id}`} key={image.image_id} passHref>
                    <ImageCard
                      key={image.image_url}
                      image={image}
                      isPicked={isPicked(image.image_id)}
                      updatePickList={updatePickList}
                    />
                  </Link>
                ))}
              </Masonry>
            </ResponsiveMasonry>
            {!isLastPage && (
              <Action>
                <LoadButton onClick={() => loadMoreImages()}>
                  {isPickListLoading ? 'Loading...' : 'VIEW MORE'}
                </LoadButton>
              </Action>
            )}
          </Item>
        </Container>
      </Layout>
    </>
  );
};

export default ImageDetailPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const image_id = Number(context.query.id);
  const imageInfo = await imageApi.getImageInfo(image_id);
  const studio_id = imageInfo.studio_id;

  const [studioInfo, phones, addresses, menus] = await Promise.all([
    studioApi.getStudio(studio_id),
    studioApi.getStudioPhone(studio_id),
    studioApi.getStudioAddress(studio_id),
    studioApi.getStudioMenu(studio_id),
  ]);

  return {
    props: {
      ImageInfo: imageInfo,
      studioInfo: studioInfo,
      phoneList: phones,
      addresses: addresses,
      menus: menus,
    },
  };
};

const Container = styled.div`
  max-width: 1200px;
  padding-top: 5%;
  justify-content: center;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media only screen and (max-width: 450px) {
    width: 100%;
    margin: auto;
    display: block;
    grid-template-columns: repeat(1, 2fr);
  }

  @media only screen and (max-width: 1250px) {
    width: 95%;
  }
`;

const Border = styled.div`
  grid-column: 1/3;
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  border: 1px solid ${colors.gray[200]};
  background-color: black;

  @media only screen and (max-width: 450px) {
    width: 100%;
    display: block;
    background-color: white;
  }
`;

const ItemLeft = styled.div`
  grid-column: 1/2;
  align-items: center;
  width: 50%;
  background-position: 50% 50%;

  @media only screen and (max-width: 450px) {
    grid-column: 1;
    width: auto;
    margin: 15px 15px;
  }
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  transition: opacity 0.35s ease;
`;

const ImageMain = styled.img`
  width: 100%;
  max-height: 750px;
  object-fit: scale-down;

  @media only screen and (max-width: 450px) {
    margin: auto;
  }
`;

const StudioCardBlock = styled.div<{ isPicked: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  background: rgba(0, 0, 0, 0.4);
  &:hover {
    opacity: 1;
  }

  ${({ isPicked }) =>
    isPicked &&
    css`
      opacity: 1;
      background: rgba(0, 0, 0, 0);

      &:hover {
        background: rgba(0, 0, 0, 0.4);
        opacity: 1;
      }
    `};
`;

const BookmarkWrapper = styled.div`
  z-index: 4000;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
`;

const ItemRight = styled.div`
  grid-column: 2/3;
  width: 50%;
  height: 755px;
  padding: 0 50px 40px 50px;
  overflow-y: scroll;
  background-color: white;

  & > hr {
    margin-left: 0;
    width: 80%;
    border: 1px solid #e5e5e5;
    margin-bottom: 39px;

    @media only screen and (max-width: 450px) {
      margin-bottom: 15px;
    }
  }

  @media only screen and (max-width: 450px) {
    grid-column: 1;
    font-size: 9px;
    width: 100%;
    padding-left: 5px;
    padding-right: 15px;
    margin: 15px 15px;
  }
`;

const TitleLink = styled.a``;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
  line-height: 32px;
  letter-spacing: -0.05em;
  text-indent: 1px;
  margin-top: 45px;
  margin-bottom: 53px;
  color: #000000;
  cursor: pointer;

  @media only screen and (max-width: 450px) {
    font-size: 20px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
`;

const StudioInfo = styled.div`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 100%;
  text-indent: 1px;
  text-transform: lowercase;
  color: #000000;

  & > div {
    margin-top: 16px;

    @media only screen and (max-width: 450px) {
      margin-top: 10px;
      font-size: 14px;
    }
  }
`;

const LinkIcon = styled.div`
  display: flex;
  width: 80%;
  margin-top: 39px;
  margin-bottom: 32px;
  justify-content: flex-start;

  @media only screen and (max-width: 450px) {
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;

const IconImage = styled.img`
  margin-right: 40px;

  @media only screen and (max-width: 450px) {
    margin-right: 30px;
    height: 24px;
  }
`;

const Item = styled.div`
  grid-column: 1/3;
  margin-bottom: 100px;

  @media only screen and (max-width: 450px) {
    margin: 15px 15px;
  }
`;

const Label = styled.div`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: -0.05em;
  text-indent: 1px;
  margin-top: 10px;
  margin-bottom: 3px;
  color: #848484;

  @media only screen and (max-width: 450px) {
    font-size: 14px;
    margin-top: 0px;
    margin-bottom: 1px;
  }
`;

const Value = styled.div`
  font-weight: bold;
  font-size: 20px;
  line-height: 24px;
  text-indent: 1px;
  text-transform: lowercase;

  margin-top: 10px;
  color: #000000;

  @media only screen and (max-width: 450px) {
    font-size: 14px;
    margin-top: 0px;
    margin-bottom: 1px;
  }
`;

const MenuName = styled.div`
  font-family: Montserrat;
  font-size: 18px;
  line-height: 1px;
  letter-spacing: -0.05em;
  text-indent: 1px;
  margin-top: 10px;
  margin-bottom: 50px;
  color: #000000;

  @media only screen and (max-width: 450px) {
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const Description = styled.p`
  font-family: Montserrat;
  font-size: 14px;
  letter-spacing: -0.05em;
  display: flex;
  text-indent: 1px;
  align-items: left;
  color: black;
`;

const H3 = styled.div`
  z-index: 500;
  position: sticky;
  top: 80px;
  font-size: 28px;
  font-weight: bold;
  line-height: 32px;
  text-indent: 1px;
  color: #000000;
  background-color: white;
  padding-bottom: 20px;
  padding-top: 20px;

  @media only screen and (max-width: 450px) {
    font-size:20px;
  }
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
