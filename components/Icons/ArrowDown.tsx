import React from 'react';
import styled from '@emotion/styled';

/**
 * todo viewBox size 통일
 * icon svg asset 관리 일단 포기 -> stroke-width -> 뭐 이런 부분 viewBox 등등
 */

const ArrowDown = () => (
  <ArrowDownBlock
    width={12}
    height={8}
    viewBox="0 0 12 8"
    fill="white"
    stroke="white"
    strokeWidth="0.2"
    aria-hidden
    focusable={false}
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M2.25 7L1 5.7772L6 0.999999L11 5.7772L9.75 7L6 3.4L2.25 7Z"
      fill="white"
      stroke="white"
      strokeWidth="0.2"
    />
  </ArrowDownBlock>
);

const ArrowDownBlock = styled.svg``;

ArrowDown.displayName = 'ArrowDown';

export default ArrowDown;
