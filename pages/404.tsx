import Link from 'next/link';
import styled from '@emotion/styled';

function _404Page() {
  return (
    <_404PageBlock>
      <Link href="/" passHref>
        <a>
          <Title>404 page Not Found</Title>
        </a>
      </Link>
    </_404PageBlock>
  );
}

const _404PageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: tomato;
  font-size: 42px;
  margin: 0;
  text-align: center;
  font-family: 'Caveat', cursive;
`;

export default _404Page;
