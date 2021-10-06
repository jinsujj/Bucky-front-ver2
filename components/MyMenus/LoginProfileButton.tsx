import styled from '@emotion/styled';
import Popover from '@/components/Popover';
import { useRef } from 'react';
import Button from '@/components/Button';
import KaKaoLoginPopup from '@/components/KaKaoLoginPopup';
import ProfileIcon from '@/components/Icons/ProfileIcon';

function LoginProfileButton() {
  const myProfileRef = useRef<HTMLDivElement>(null);
  return (
    <MyProLoginProfileButtonBlock ref={myProfileRef}>
      <ProfilePropover
        reference={myProfileRef}
        placement="bottom-end"
        trigger="click"
        content={<KaKaoLoginPopup />}
      >
        <ProfileButton variant="text" size="medium">
          <ProfileIcon />
        </ProfileButton>
      </ProfilePropover>
    </MyProLoginProfileButtonBlock>
  );
}

const MyProLoginProfileButtonBlock = styled.div``;

const ProfileButton = styled(Button)`
  display: flex;
  height: auto;
`;

const ProfilePropover = styled(Popover)`
  margin-top: 12px;
`;

export default LoginProfileButton;
