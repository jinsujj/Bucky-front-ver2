import React from 'react';
import Icon, { IconCommonProps } from '.';

const SearchIcon = React.forwardRef<HTMLSpanElement, IconCommonProps>((props, ref) => (
  <Icon {...props} ref={ref}>
    <path
      xmlns="http://www.w3.org/2000/svg"
      d="m16 14.4307-4.1699-4.1367c.7843-1.07 1.248-2.386 1.248-3.80733 0-3.57667-2.9334-6.48667-6.5394-6.48667-3.60536 0-6.5387 2.91-6.5387 6.48667 0 3.57733 2.93334 6.48663 6.5387 6.48663 1.36688 0 2.63632-.418 3.6873-1.132l4.1921 4.1587zm-14.08207-7.94403c0-2.528 2.07317-4.58467 4.62145-4.58467s4.62142 2.05667 4.62142 4.58467-2.07314 4.58463-4.62142 4.58463c-2.54896 0-4.62145-2.05663-4.62145-4.58463z"
    />
  </Icon>
));

SearchIcon.displayName = 'SearchIcon';

export default SearchIcon;
