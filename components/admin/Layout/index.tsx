import React from 'react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { Container, Icon, Segment, Sidebar } from 'semantic-ui-react';
import VerticalSidebar from '@/components/admin/Layout/VerticalSidebar';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

function Layout({ children, title }: LayoutProps) {
  const [visible, setVisible] = useState(true);
  const closeSidebar = () => setVisible(false);
  const openSidebar = () => setVisible(true);
  return (
    <React.Fragment>
      <Sidebar.Pushable as={Segment} style={{ overflow: 'visible' }}>
        <VerticalSidebar visible={visible} />
        <Sidebar.Pusher>
          <Segment basic>
            <Container className="container">
              {visible ? (
                <Icon name="angle left" size="large" onClick={closeSidebar}></Icon>
              ) : (
                <Icon name="angle right" size="large" onClick={openSidebar}></Icon>
              )}
              <Title>{title}</Title>
              {children}
            </Container>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </React.Fragment>
  );
}

export default Layout;

const Title = styled.h1`
  font-size: 28px;
  line-height: 1.53;
  font-weight: bold;
  display: block;
`;
