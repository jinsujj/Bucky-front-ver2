import styled from '@emotion/styled';
import Popover from '@/components/Popover';
import { useCallback, useRef } from 'react';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import HeartIcon from '@/components/Icons/HeartIcon';
import Badge from '@/components/Badge/Badge';
import usePickList from '@/hooks/users/usePickList';
import Progress from '@/components/Progress';
import KaKaoLoginPopup from '@/components/KaKaoLoginPopup';

function MyPickLink() {
  const myPickLinkRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { pickCount, pickListLoading } = usePickList();

  const goToPickListPage = useCallback(() => {
    if (!isAuthenticated) {
      return;
    }
    router.push(`/images/pick`);
  }, [isAuthenticated, router]);

  return (
    <MyPickLinkBlock ref={myPickLinkRef}>
      {pickListLoading ? (
        <Progress size="small" />
      ) : (
        <MyPickPopover
          reference={myPickLinkRef}
          placement="bottom-end"
          disabled={isAuthenticated}
          trigger="click"
          content={<KaKaoLoginPopup title="찜하기는 로그인 후 이용 가능합니다." />}
        >
          <HeartButton onClick={goToPickListPage} variant="text">
            <HeartIcon />
            {pickCount > 0 && <Badge count={pickCount} />}
          </HeartButton>
        </MyPickPopover>
      )}
    </MyPickLinkBlock>
  );
}

const MyPickLinkBlock = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: 2px;
`;

const HeartButton = styled(Button)`
  position: relative;
  min-width: auto;
  padding: 0 6px;
  margin-right: 6px;
`;

const MyPickPopover = styled(Popover)`
  margin-top: 12px;
`;

export default MyPickLink;
