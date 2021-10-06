import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useMemo, useRef } from 'react';
import HomeLink from '@/components/HomeLink';
import SearchForm from '@/components/SearchForm';
import SearchFilter from '@/components/SearchFilter';
import MyMenus from '@/components/MyMenus';
import { useRouter } from 'next/router';
import { FilterProvider } from '@/components/SearchFilter/context/SearchFilterContext';
import colors from '@/styles/colors';

export interface HeaderProps {
  fixed?: boolean;
  noSearchForm?: number;
}

function Header({ fixed, noSearchForm }: HeaderProps) {
  const router = useRouter();
  const ref = useRef(null);
  const hasFilter = useMemo(() => router.pathname === '/', [router]);


  return (
    <HeaderBlock ref={ref} fixed={fixed}>
      <Main>
        <HomeLink />
        <CenterBlock>
          {hasFilter && (
            <FilterProvider>
              <SearchFilter />
            </FilterProvider>
          )}
          {(noSearchForm != null && noSearchForm> 450) && <SearchForm />}
        </CenterBlock>
        <MyMenus />
      </Main>
    </HeaderBlock>
  );
}

const Main = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 20px;

`;

const CenterBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 0px;
  width: 100%;
  margin: 0 0;
`;

const HeaderBlock = styled.header<{
  fixed?: boolean;
}>`
  z-index: 20;
  background-color: #ffffff;
  height: 80px;
  display: flex;
  justify-content: center;
  transition: background-color 0.3s, border-color 0.3s;
  border-bottom: 1px solid ${colors.gray[200]};

  ${(props) =>
    props.fixed &&
    css`
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
    `}

`;

export default Header;
