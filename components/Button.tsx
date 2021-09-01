import React, { ButtonHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from '@/styles/colors';
import { rgba } from 'polished';

export type InputSizes = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonVariants = 'default' | 'text' | 'contained' | 'outlined';
export type ButtonColors = 'default' | 'primary' | 'secondary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  size?: InputSizes;
  variant?: ButtonVariants;
  disabled?: boolean;
  color?: ButtonColors;
  rounded?: boolean;
  fullWidth?: boolean;
  href?: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = 'medium',
      variant = 'default',
      disabled = false,
      color = 'default',
      rounded = false,
      fullWidth = false,
      href,
      loading = false,
      ...others
    },
    ref
  ) => (
    <ButtonBlock
      as={href ? 'a' : 'button'}
      color={color}
      variant={variant}
      disabled={disabled || loading}
      size={size}
      rounded={rounded}
      fullWidth={fullWidth}
      href={href}
      ref={ref}
      {...others}
    >
      {children}
    </ButtonBlock>
  )
);

const ButtonBlock = styled.button<ButtonProps>`
  outline: none;
  border-width: 1px;
  border-style: solid;
  box-sizing: border-box;
  border-radius: 4px;
  line-height: 1;
  font-weight: 500;
  transition: background-color 0.3s, border-color 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  user-select: none;
  white-space: nowrap;
  max-width: 100%;
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      min-width: 100%;
      max-width: 100%;
    `}

  ${({ rounded, size }) => sizes({ rounded })[size || 'medium']};
  ${(props) => props.variant === 'default' && defaultStyle[props.color || 'default']};
  ${(props) => props.variant === 'contained' && containedStyle[props.color || 'default']};
  ${(props) => props.variant === 'outlined' && outlinedStyle[props.color || 'default']};
  ${(props) => props.variant === 'text' && textStyle[props.color || 'default']};
`;

const sizes = ({ rounded }: Pick<ButtonProps, 'rounded'>) => ({
  xsmall: buttonSizeBuilder({
    height: 24,
    fontSize: 12,
    padding: 8,
    minWidth: 48,
    rounded,
  }),
  small: buttonSizeBuilder({
    height: 30,
    fontSize: 13,
    padding: 10,
    minWidth: 64,
    rounded,
  }),
  medium: buttonSizeBuilder({
    height: 36,
    fontSize: 14,
    padding: 16,
    minWidth: 64,
    rounded,
  }),
  large: buttonSizeBuilder({
    height: 42,
    fontSize: 15,
    padding: 22,
    minWidth: 76,
    rounded,
  }),
  xlarge: buttonSizeBuilder({
    height: 52,
    fontSize: 16,
    padding: 24,
    minWidth: 100,
    rounded,
  }),
});

interface buttonSizeBuilderProps {
  height: number;
  fontSize: number;
  padding: number;
  minWidth: number;
  rounded?: boolean;
}

const buttonSizeBuilder = ({
  height,
  fontSize,
  padding,
  minWidth,
  rounded = false,
}: buttonSizeBuilderProps) => css`
  height: ${height}px;
  font-size: ${fontSize}px;
  padding: 0 ${padding}px;
  min-width: ${minWidth}px;
  ${rounded &&
  css`
    border-radius: ${height / 2}px;
  `};
`;

const defaultStyleBuilder = (color: ButtonColors) => css`
  background-color: #ffffff;
  border-color: ${colors[color][4]};
  color: ${colors.text.default};
  &:hover,
  &:focus-visible {
    background-color: ${colors[color][2]};
    border-color: ${colors[color][5]};
  }
  &:active {
    background-color: ${colors[color][3]};
    border-color: ${colors[color][6]};
  }
`;

const defaultStyle = {
  default: defaultStyleBuilder('default'),
  primary: defaultStyleBuilder('primary'),
  secondary: defaultStyleBuilder('secondary'),
};

const containedStyleBuilder = (color: ButtonColors, fontColor: string, scale: number) => css`
  background-color: ${colors[color][scale + 1]};
  border-color: ${colors[color][scale + 1]};
  color: ${fontColor};
  &:hover,
  &:focus-visible {
    background-color: ${colors[color][scale + 2]};
    border-color: ${colors[color][scale + 2]};
  }
  &:active {
    background-color: ${colors[color][scale + 3]};
    border-color: ${colors[color][scale + 3]};
  }
`;

const containedStyle = {
  default: css`
    background-color: #ffffff;
    border-color: #ffffff;
    color: ${colors.default[7]};
    &:hover,
    &:focus-visible {
      background-color: ${colors.default[1]};
      border-color: ${colors.default[1]};
    }
    &:active {
      background-color: ${colors.default[2]};
      border-color: ${colors.default[2]};
    }
  `,
  primary: containedStyleBuilder('primary', '#fff', 5),
  secondary: containedStyleBuilder('secondary', '#ffffff', 5),
};

const outlinedStyleBuilder = (color: ButtonColors, scale: number) => css`
  background-color: transparent;
  border-color: ${colors[color][scale]};
  color: ${colors[color][scale]};
  &:hover,
  &:focus-visible {
    background-color: ${rgba(colors[color][scale], 0.1)};
  }
  &:active {
    background-color: ${rgba(colors[color][scale], 0.2)};
  }
`;

const outlinedStyle = {
  default: css`
    background-color: transparent;
    border-color: ${colors.default[8]};
    color: ${colors.default[8]};
    &:hover,
    &:focus-visible {
      background-color: ${rgba(colors.default[8], 0.1)};
    }
    &:active {
      background-color: ${rgba(colors.default[8], 0.2)};
    }
  `,
  primary: outlinedStyleBuilder('primary', 5),
  secondary: outlinedStyleBuilder('secondary', 5),
};

const textStyleBuilder = (color: ButtonColors, scale: number) => css`
  background-color: transparent;
  border-color: transparent;
  color: ${colors[color][scale]};
  &:hover,
  &:focus-visible {
    background-color: ${rgba(colors[color][scale], 0.1)};
  }
  &:active {
    background-color: ${rgba(colors[color][scale], 0.2)};
  }
`;

const textStyle = {
  default: textStyleBuilder('default', 8),
  primary: textStyleBuilder('primary', 5),
  secondary: textStyleBuilder('secondary', 5),
};

export default Button;
