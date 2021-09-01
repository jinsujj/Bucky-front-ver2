import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import colors from '@/styles/colors';

export interface ProgressProps {
  size?: 'xsmall' | 'small' | 'medium' | 'large';
}

const Progress = ({ size = 'medium' }: ProgressProps) => (
  <ProgressBlock size={size}>
    <div />
    <div />
    <div />
  </ProgressBlock>
);

const sizeMap = {
  xsmall: 4,
  small: 5,
  medium: 6,
  large: 7,
  xlarge: 8,
};

const fall = keyframes`
  0% {
    opacity: 0; translateY(-145%);
    transform: translateY(-145%);
  }
  10% {
    opacity: .5;
  }
  20% {
    opacity: 1;
    transform: translateY(0);
  }
  80% {
    opacity: 1;
    transform: translateY(0);
  }
  90% {
    opacity: .5;
  }
  100% {
    opacity: 0;
    transform: translateY(145%);
  }
`;

const ProgressBlock = styled.div<{ size: 'xsmall' | 'small' | 'medium' | 'large' }>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  > div {
    position: relative;
    display: inline-block;
    background-color: ${colors.gray[400]};
    width: ${(props) => sizeMap[props.size]}px;
    height: ${(props) => sizeMap[props.size]}px;
    margin: ${(props) => sizeMap[props.size] / 2}px;
    border-radius: 100%;
    opacity: 0;
    animation: ${fall} 1s ease-in-out infinite;

    &:nth-of-type(1) {
      animation-delay: -200ms;
    }
    &:nth-of-type(2) {
      animation-delay: -100ms;
    }
    &:nth-of-type(3) {
      animation-delay: 0;
    }
  }
`;

export default Progress;
