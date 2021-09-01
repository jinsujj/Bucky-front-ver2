import styled from '@emotion/styled';
import Button from '@/components/Button';
import { css } from '@emotion/react';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/router';

export interface LogoutPopupProps {
  title?: string;
}

function LogoutPopup({ title = '' }) {
  const router = useRouter();
  const { logout } = useAuth();
  const noTitle = title === '';

  const handleClickLogoutButton = () => {
    logout();
    /**
     * todo 일단 pickPage만 인증 필요하니 이렇게 처리 나중에 page단에서 redirect 적용
     */
    if (router.asPath === '/images/pick') {
      router.push('/');
    }
  };

  return (
    <LogoutPopupBlock noTitle={noTitle}>
      <LogoutButton variant="text" fullWidth onClick={handleClickLogoutButton} noTitle={noTitle}>
        로그아웃
      </LogoutButton>
    </LogoutPopupBlock>
  );
}

const LogoutPopupBlock = styled.div<{ noTitle: boolean }>`
  padding: 16px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ noTitle }) =>
    noTitle &&
    css`
      padding: 0;
      border-radius: 0;
    `};
`;

const LogoutButton = styled(Button)<{ noTitle: boolean }>`
  margin-top: 16px;
  ${({ noTitle }) =>
    noTitle &&
    css`
      margin-top: 0;
      padding: 16px 40px 16px 16px;
      height: 46px;
      border-radius: 0;
    `};
`;

export default LogoutPopup;
