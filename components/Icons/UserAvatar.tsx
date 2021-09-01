import React from 'react';
import styled from '@emotion/styled';

interface UserAvatarProps {
  image?: string;
}

const UserAvatar = ({ image }: UserAvatarProps) => (
  <Profile>
    <img src={image} width={36} height={36} alt="profile" />
  </Profile>
);

UserAvatar.displayName = 'UserAvatar';

const Profile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`;

export default UserAvatar;
