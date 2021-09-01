import React from 'react';
import Icon, { IconCommonProps } from '.';

/**
 * todo viewBox size 통일
 */

const ArrowUp = React.forwardRef<HTMLSpanElement, IconCommonProps>((props, ref) => (
  <Icon {...props} ref={ref}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M2.25 7L1 5.7772L6 0.999999L11 5.7772L9.75 7L6 3.4L2.25 7Z"
      fill="white"
      stroke="white"
      strokeWidth="0.2"
    />
  </Icon>
));

ArrowUp.displayName = 'ArrowUp';

export default ArrowUp;
