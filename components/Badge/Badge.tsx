import colors from '@/styles/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatCount from './formatCount';

export interface BadgeProps {
  count: number;
}

function Badge({ count }: BadgeProps) {
  const largeCount = count > 99;
  return <BadgeBlock largeCount={largeCount}>{formatCount(count)}</BadgeBlock>;
}

const BadgeBlock = styled.div<{ largeCount: boolean }>`
  min-width: 16px;
  height: 16px;
  border-radius: 8.5px;
  font-family: Montserrat;
  font-weight: bold;
  font-size: 10px;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.orange};
  color: #fff;
  padding: 2px;
  /**
    todo position 위치 정의 해줄 수 있도록 수정 
    왜 styled(Badge) 이런식으로 적용 안되는지 알아보기 
   */
  position: absolute;
  top: -1px;
  right: 0px;

  ${({ largeCount }) =>
    largeCount &&
    css`
      right: -1px;
    `};
`;

export default Badge;
