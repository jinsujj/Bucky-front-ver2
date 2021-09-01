import styled from '@emotion/styled';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { setLocalstorageItem } from '@/utils/storage';
import colors from '@/styles/colors';

const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY || '';
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || '';

export interface KaKaoLoginPopupProps {
  title?: string;
}

function KaKaoLoginPopup({ title = '' }) {
  const router = useRouter();

  const loginKaKao = () => {
    setLocalstorageItem('prevPage', JSON.stringify(`${router.asPath}`));
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`
    );
  };

  const noTitle = title === '';

  return (
    <KaKaoLoginPopupBlock noTitle={noTitle}>
      {title && <PopoverText>{title}</PopoverText>}
      <KaKaoLoginButton
        variant={noTitle ? 'text' : 'outlined'}
        fullWidth
        onClick={loginKaKao}
        noTitle={noTitle}
      >
        카카오로 시작하기
      </KaKaoLoginButton>
    </KaKaoLoginPopupBlock>
  );
}

const KaKaoLoginPopupBlock = styled.div<{ noTitle: boolean }>`
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

const PopoverText = styled.p`
  margin: 0;
`;

const KaKaoLoginButton = styled(Button)<{ noTitle: boolean }>`
  margin-top: 16px;
  color: ${colors.gray[500]};
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  ${({ noTitle }) =>
    noTitle &&
    css`
      margin-top: 0;
      padding: 16px 40px 16px 16px;
      height: 46px;
      border-radius: 0;
    `};
`;

export default KaKaoLoginPopup;
