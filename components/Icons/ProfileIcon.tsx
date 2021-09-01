import React from 'react';
import Icon, { IconCommonProps } from '.';

const SearchIcon = React.forwardRef<HTMLSpanElement, IconCommonProps>((props, ref) => (
  <Icon {...props} ref={ref} size={34} fill="none">
    <svg width="32" height="31" viewBox="0 0 32 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1" fill="white">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32 31C32 22.1634 24.8366 15 16 15C7.16344 15 0 22.1634 0 31H32Z"
        />
      </mask>
      <path
        d="M32 31V34H35V31H32ZM0 31H-3V34H0V31ZM16 18C23.1797 18 29 23.8203 29 31H35C35 20.5066 26.4934 12 16 12V18ZM3 31C3 23.8203 8.8203 18 16 18V12C5.50659 12 -3 20.5066 -3 31H3ZM0 34H32V28H0V34Z"
        fill="black"
        mask="url(#path-1-inside-1)"
      />
      <circle cx="16" cy="9" r="7.5" stroke="black" strokeWidth="3" />
    </svg>
  </Icon>
));

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;
