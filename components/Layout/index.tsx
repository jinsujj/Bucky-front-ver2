import React from 'react';
import styled from '@emotion/styled';
import Header, { HeaderProps } from './Header';
import Footer from './Footer';

const MainBlock = styled.main`
  width: 100%;
  position: relative;
  z-index: 1;
  min-height: 100vh;
`;

export interface LayoutProps {
  children: React.ReactNode;
  headerProps?: HeaderProps;
  noHeader?: boolean;
  noFooter?: boolean;
}

function Layout({ children, noFooter, noHeader, headerProps }: LayoutProps) {
  return (
    <React.Fragment>
      {!noHeader && <Header {...headerProps} />}
      <MainBlock>{children}</MainBlock>
      {!noFooter && <Footer />}
    </React.Fragment>
  );
}

export default Layout;
