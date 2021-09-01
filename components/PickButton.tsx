import useAuth from '@/hooks/useAuth';
import styled from '@emotion/styled';
import Popover from '@/components/Popover';
import { useCallback, useRef } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { setLocalstorageItem } from '@/utils/storage';

export interface PickBUttonProps {
  isPicked?: boolean;
  onClick: () => void;
  visible: boolean;
  onChangePopover: (visible: boolean) => void;
}

/**
 * todo s3 주소 이름  heart_selected로 지었으면 -> 다른거는 그냥 heart or hert_not_selected  맞춰서 네이밍 변경
 */
const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY || '';
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || '';
/**
 * todo kakao Link component 혹은 hooks로 빠지면 좋을 듯 여러군데 쓰여서
 */

const noSelectedHeart =
  'https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/Heart2.svg';
const selectedHeart =
  'https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/assets/icons/heart_selected.svg';

export function PickButton({
  isPicked = false,
  onClick,
  visible,
  onChangePopover,
}: PickBUttonProps) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const buttonRef = useRef<HTMLDivElement>(null);

  const heartImage = isPicked ? selectedHeart : noSelectedHeart;

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!isAuthenticated) {
        onChangePopover(true);
        return;
      }

      onClick();
    },
    [onClick, isAuthenticated, onChangePopover]
  );

  const loginKaKao = () => {
    setLocalstorageItem('prevPage', JSON.stringify(`${router.asPath}`));
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    );
  };

  return (
    <PickButtonBlock onClick={handleClick} ref={buttonRef}>
      <Popover
        reference={buttonRef}
        placement="bottom-end"
        disabled={isAuthenticated}
        visible={visible}
        content={
          <PopoverContent>
            <PopoverText>찜하기는 로그인 후 이용 가능합니다.</PopoverText>
            <Button variant="outlined" fullWidth onClick={loginKaKao}>
              카카오로 시작하기
            </Button>
          </PopoverContent>
        }
      >
        <img src={heartImage} alt="heart icon" />
      </Popover>
    </PickButtonBlock>
  );
}

const PickButtonBlock = styled.div``;

const PopoverContent = styled.div`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 248px;
`;

const PopoverText = styled.div`
  margin: 0 0 16px 0;
`;

export default PickButton;
