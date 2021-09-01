import { css } from '@emotion/react';
import NotoSans from './NotoSans';
import normalize from './normalize';
import colors from '@/styles/colors';

const baseCSS = css`
  * {
    font-family: 'Noto Sans KR', sans-serif;
    box-sizing: border-box;
  }
  body {
    color: ${colors.text.default};
  }
  ${NotoSans};
  ${normalize};
`;

export default baseCSS;
