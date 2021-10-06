import React from 'react';
import styled from '@emotion/styled';

interface UserAvatarProps {
  image?: string;
}

const UserAvatar = ({ image }: UserAvatarProps) => (
  <Profile>
    <img src={image} width={24} height={24} alt="profile" />
  </Profile>
);

UserAvatar.displayName = 'UserAvatar';

const Profile = styled.div`
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
`;

export default UserAvatar;
