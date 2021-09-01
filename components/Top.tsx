import { Menu, Grid } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import styled from '@emotion/styled';
import useAuth from '@/hooks/useAuth';

const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY || '';
const REDIRECT_URI = process.env.KAKAO_REDIRECT_URI || '';

export default function Top() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const NAV_ITEMS = [
    {
      name: 'Home',
      to: '/',
    },
    {
      name: 'Studio 등록',
      to: '/admin',
    },
  ];

  return (
    <Grid>
      <Grid.Column>
        <Menu inverted>
          {NAV_ITEMS.map(({ name, to }) => (
            <NextLink key={to} href={to} passHref>
              <MenuLink>
                <Menu.Item name={name} active={to === router.pathname} />
              </MenuLink>
            </NextLink>
          ))}

          {!isAuthenticated ? (
            <Menu.Item>
              <a
                href={`https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`}
              >
                카카오 로그인
              </a>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <img src={user?.profile_image_url} alt={user?.name} />
            </Menu.Item>
          )}
        </Menu>
      </Grid.Column>
    </Grid>
  );
}

const MenuLink = styled.a``;
