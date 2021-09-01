import React from 'react';
import Icon, { IconCommonProps } from '.';

const CloseIcon = React.forwardRef<HTMLSpanElement, IconCommonProps>((props, ref) => (
  <Icon {...props} ref={ref}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    />
  </Icon>
));

CloseIcon.displayName = 'CloseIcon';

export default CloseIcon;
