import styled from '@emotion/styled';
import Popover from '@/components/Popover';
import { useRef } from 'react';
import Button from '@/components/Button';
import useAuth from '@/hooks/useAuth';
import LogoutPopup from '@/components/LogoutPopup';
import UserAvatar from '@/components/Icons/UserAvatar';

function MyProfile() {
  const myProfileRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  return (
    <MyProfileBlock ref={myProfileRef}>
      <MyProfilePopover
        reference={myProfileRef}
        placement="bottom-end"
        trigger="click"
        content={<LogoutPopup />}
      >
        <MyProfileButton variant="text" size="medium">
          <UserAvatar image={user?.thumbnail_image_url} />
        </MyProfileButton>
      </MyProfilePopover>
    </MyProfileBlock>
  );
}

const MyProfileBlock = styled.div`
  width: 30px;
`;

const MyProfileButton = styled(Button)`
  display: flex;
  height: auto;
  border: none;
`;

const MyProfilePopover = styled(Popover)`
  margin-top: 14px;
`;

export default MyProfile;
