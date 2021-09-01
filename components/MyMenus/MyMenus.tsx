import styled from '@emotion/styled';
import React from 'react';
import MyPickLink from './MyPickLink';
import MyProfile from './MyProfile';
import LoginProfileButton from './LoginProfileButton';
import useAuth from '@/hooks/useAuth';

function MyMenus() {
  const { isAuthenticated } = useAuth();
  return (
    <MyMenusBlock>
      <MyPickLink />
      {isAuthenticated ? <MyProfile /> : <LoginProfileButton />}
    </MyMenusBlock>
  );
}

const MyMenusBlock = styled.div`
  display: flex;
  align-items: center;
`;

export default MyMenus;
