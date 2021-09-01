import imageApi, { ImageName } from '@/api/image';
import useAuth from '@/hooks/useAuth';
import colors from '@/styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import PickButton from '@/components/PickButton';
import { PickCard } from '@/api/users';

export interface ImageCardProps {
  image: ImageName | PickCard;
  isPicked?: boolean;
  updatePickList: ({ image_id, isPicked }: { image_id: number; isPicked: boolean }) => void;
}

/**
 *
 * todo Image Error 날 경우 defaultImage
 */

function ImageCard({
  image: { image_id, image_url, studio_name },
  isPicked,
  updatePickList,
}: ImageCardProps) {
  const { user } = useAuth();
  const userId = user?.user_id || 0;
  const imageRef = useRef<HTMLImageElement>(null);
  const [loadCompleted, setLoadCompleted] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isShownPopover, setIsShownPopover] = useState(false);

  const handleProfileImageLoad = () => {
    setLoadCompleted(true);
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setLoadCompleted(true);
    }
  }, []);

  const savePickImage = async (imageId: number) => {
    const { image_id } = await imageApi.savePickImage({ user_id: userId, image_id: imageId });
    updatePickList({
      image_id,
      isPicked: true,
    });
  };

  const deletePickImage = async (imageId: number) => {
    const { image_id } = await imageApi.deletePickImage({ user_id: userId, image_id: imageId });
    updatePickList({
      image_id,
      isPicked: false,
    });
  };

  const handleHeartClick = () => {
    isPicked ? deletePickImage(image_id) : savePickImage(image_id);
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

  const link = `/images/${image_id}`;

  useEffect(() => {
    if (isHover === false) {
      setIsShownPopover(false);
    }
  }, [isHover]);

  return (
    <ImageCardBlock>
      <Link href={link} passHref>
        <Anchor onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <ProfileImageWrapper onClick={handleImageWrapperClick}>
            <ProfileImage
              ref={imageRef}
              title={studio_name}
              alt={studio_name}
              src={image_url}
              onLoad={handleProfileImageLoad}
              loading="lazy"
              isVisible={loadCompleted}
            />
            <BookmarkWrapper isPicked={isPicked} isHover={isHover}>
              <PickButton
                onClick={handleHeartClick}
                isPicked={isPicked}
                visible={isShownPopover}
                onChangePopover={handleChangePopover}
              />
            </BookmarkWrapper>
            <StudioCardBlock>
              <StudioName>{studio_name}</StudioName>
            </StudioCardBlock>
          </ProfileImageWrapper>
        </Anchor>
      </Link>
    </ImageCardBlock>
  );
}

const ImageCardBlock = styled.div``;

const Anchor = styled.a`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  text-decoration: none;
`;

const ProfileImageWrapper = styled.div`
  background-color: ${colors.gray[200]};
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  transition: opacity 0.35s ease;
`;

const ProfileImage = styled.img<{ isVisible: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  object-fit: cover;

  ${({ isVisible }) =>
    isVisible &&
    css`
      opacity: 1;
    `};
`;

const StudioCardBlock = styled.div`
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
`;

const BookmarkWrapper = styled.div<{ isPicked?: boolean; isHover: boolean }>`
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0;
  ${({ isHover }) =>
    isHover &&
    css`
      opacity: 1;
    `};

  ${({ isPicked }) =>
    isPicked &&
    css`
      opacity: 1;
    `};
`;

const StudioName = styled.p`
  position: absolute;
  bottom: 28px;
  left: 28px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
  display: flex;
  color: #fff;
  z-index: 10;
  :after {
    content: '';
    display: block;
    height: 5px;
    position: absolute;
    width: 0%;
    bottom: 0;
    z-index: -1;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
  }

  &:hover:after {
    background-color: ${colors.neon};
    width: 100%;
  }
`;

export default ImageCard;
