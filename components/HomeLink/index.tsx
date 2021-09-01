import React from 'react';
import styled from '@emotion/styled';
import Logo from '@/components/Logo';
import Link from 'next/link';

function HomeLink() {
  return (
    <Link href={'/'} passHref>
      <HomeLinkBlock>
        <Logo />
      </HomeLinkBlock>
    </Link>
  );
}

const HomeLinkBlock = styled.a`
  cursor: pointer;
  text-decoration: none;
`;

export default HomeLink;
