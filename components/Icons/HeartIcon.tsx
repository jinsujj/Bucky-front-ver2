import React from 'react';
import Icon, { IconCommonProps } from '.';

const HeartIcon = React.forwardRef<HTMLSpanElement, IconCommonProps>((props, ref) => (
  <Icon {...props} ref={ref} size={26}>
    <svg width="26" height="24" viewBox="0 0 35 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.15833 3.20015C13.8775 3.20157 16.4106 8.18684 17.5 10.3866C18.5938 8.17684 21.1006 3.21443 25.8504 3.21443C28.8517 3.21443 32.0833 5.08426 32.0833 9.18817C32.0833 14.1049 25.165 20.4029 17.5 27.7579C9.83208 20.4 2.91667 14.1034 2.91667 9.18817C2.91667 5.36566 5.78229 3.19872 9.15833 3.20015ZM9.15979 0.343262C4.51792 0.343262 0 3.46726 0 9.18817C0 15.8461 8.12292 22.6541 17.5 31.769C26.8771 22.6541 35 15.8461 35 9.18817C35 3.45869 30.4835 0.357546 25.8504 0.357546C22.6362 0.357546 19.3667 1.84598 17.5 4.98284C15.626 1.8317 12.3638 0.343262 9.15979 0.343262Z"
        fill="black"
      />
    </svg>
  </Icon>
));

HeartIcon.displayName = 'HeartIcon';

export default HeartIcon;
