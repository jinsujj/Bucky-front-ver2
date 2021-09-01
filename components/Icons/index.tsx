import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export interface IconCommonProps {
  color?: string;
  size?: number;
  rotate?: number;
  spin?: boolean;
  fill?: string;
}

export interface IconProps extends IconCommonProps {
  children: ReactNode;
}

const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
  (
    { color, size = 16, rotate = 0, spin = false, children, fill = 'currentColor', ...props },
    ref
  ) => (
    <IconBlock role="img" color={color} spin={spin} rotate={rotate} ref={ref} {...props}>
      <Svg
        width={size}
        height={size}
        fill={fill}
        aria-hidden
        focusable={false}
        preserveAspectRatio="xMidYMid meet"
      >
        {children}
      </Svg>
    </IconBlock>
  )
);

Icon.displayName = 'Icon';

const spin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const IconBlock = styled.span<{
  color?: string;
  spin: boolean;
  rotate: number;
}>`
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.spin &&
    css`
      animation: ${spin} 1s infinite linear;
    `}

  ${(props) =>
    props.rotate > 0 &&
    css`
      transform: rotate(${props.rotate}deg);
    `}
`;

const Svg = styled.svg`
  display: inline-block;
`;

export default Icon;
