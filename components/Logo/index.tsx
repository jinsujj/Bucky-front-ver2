import React from 'react';
import styled from '@emotion/styled';

/*
@todo 
1. 파일이름 bucky. -> bucky-logo로 교체 or logo로 교체
2. src -> next-s3-upload와 어플리케이션 aseet link 구분 두어서 관리 
*/
function Logo() {
  return (
    <LogoImage
      src="https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/bucky..svg"
      alt="bucky"
      width={120}
      height={36}
    />
  );
}

const LogoImage = styled.img`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media only screen and (max-width: 1250px) {
    margin-right: 12px;
  }
`;

export default Logo;
