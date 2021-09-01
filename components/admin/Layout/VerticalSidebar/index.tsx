import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Sidebar, Menu } from 'semantic-ui-react';
import styled from '@emotion/styled';

const TAB_ITEMS = [
  {
    name: 'studion 관리',
    to: '/admin/studios',
  },
  {
    name: 'Studio 등록',
    to: '/admin/studios/new',
  },
  {
    name: '이미지 등록',
    to: '/admin/images/new',
  },
];

interface VerticalSidebarProps {
  visible: boolean;
}

function VerticalSidebar({ visible }: VerticalSidebarProps) {
  const router = useRouter();
  return (
    <Sidebar
      as={Menu}
      style={{ minHeight: '100vh' }}
      animation="push"
      direction="left"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      width="thin"
    >
      {TAB_ITEMS.map(({ name, to }) => (
        <Menu.Item key={to}>
          <NextLink href={to} passHref>
            <TabLink active={to === router.pathname}>{name}</TabLink>
          </NextLink>
        </Menu.Item>
      ))}
    </Sidebar>
  );
}

const TabLink = styled.a<{ active: boolean }>``;

export default VerticalSidebar;
