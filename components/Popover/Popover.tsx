import React, { ReactElement, useRef } from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import styled from '@emotion/styled';
import { Instance, Props } from 'tippy.js';

export interface PopoverInstance {
  hide: () => void;
}
export interface PopoverProps
  extends Pick<
    TippyProps,
    | 'disabled'
    | 'visible'
    | 'children'
    | 'placement'
    | 'reference'
    | 'trigger'
    | 'maxWidth'
    | 'hideOnClick'
  > {
  content: ReactElement;
  onVisibleChange?: (visible: boolean) => void;
  maxWidth?: number | string;
}

function Popover({
  children,
  placement = 'bottom',
  onVisibleChange,
  maxWidth = '100%',
  visible,
  ...props
}: PopoverProps) {
  const instance = useRef<Instance<Props> | null>(null);

  const handleCreate = (tippy: Instance<Props>) => {
    instance.current = tippy;
  };

  const handleMount = () => {
    if (onVisibleChange) {
      onVisibleChange(true);
    }
  };

  const handleHide = () => {
    if (onVisibleChange) {
      onVisibleChange(false);
    }
  };

  return (
    <PopoverBlock
      onCreate={handleCreate}
      onMount={handleMount}
      onHide={handleHide}
      animation="shift-away"
      placement={placement}
      maxWidth={maxWidth}
      interactive
      visible={visible}
      {...props}
    >
      {children}
    </PopoverBlock>
  );
}

Popover.displayName = 'Popover';

const PopoverBlock = styled(Tippy)`
  position: relative;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.4;
  outline: 0;
  transition-property: transform, visibility, opacity;
  box-shadow: 0px 4px 7px rgba(0, 0, 0, 0.25);

  .tippy-content {
    position: relative;
    padding: 0;
    z-index: 1;
  }

  /**
   * animation
   */
  &[data-animation='shift-away'][data-state='hidden'] {
    opacity: 0;
  }
  &[data-animation='shift-away'][data-state='hidden'][data-placement^='top'] {
    transform: translateY(8px);
  }
  &[data-animation='shift-away'][data-state='hidden'][data-placement^='bottom'] {
    transform: translateY(-8px);
  }
  &[data-animation='shift-away'][data-state='hidden'][data-placement^='left'] {
    transform: translateX(8px);
  }
  &[data-animation='shift-away'][data-state='hidden'][data-placement^='right'] {
    transform: translateX(-8px);
  }
`;
export default Popover;
