import React from 'react';
import styled from '@emotion/styled';
import colors from '@/styles/colors';
import { css } from '@emotion/react';
import formatCount from '@/components/Badge/formatCount';
import { PickStudioCard } from '@/api/users';

interface StudioFilterItemProps extends PickStudioCard {
  active: boolean;
  onClick?: () => void;
}
export function StudioFilterItem({
  studio_name,
  like_num,
  active,
  onClick,
}: Omit<StudioFilterItemProps, 'studio_id'>) {
  return (
    <StudioFilterItemBlock onClick={onClick}>
      <StudioName active={active}>{studio_name}</StudioName>
      <Count active={active}>{formatCount(like_num)}</Count>
    </StudioFilterItemBlock>
  );
}
const StudioFilterItemBlock = styled.li`
  position: relative;
  display: flex;
  height: 28px;
  cursor: pointer;
`;
const StudioName = styled.p<{ active: boolean }>`
  height: 28px;
  margin: 0;
  display: flex;
  align-items: flex-end;
  color: ${colors.gray[300]};
  font-weight: bold;
  line-height: 1;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      color: ${colors.gray[500]};
    `}
`;
const Count = styled.div<{ active: boolean }>`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 3.5px;
  min-width: 24px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 4px;
  border-radius: 50px;
  color: white;
  background-color: ${colors.gray[300]};
  font-weight: bold;
  font-size: 12px;
  line-height: 15px;
  font-family: Montserrat;
  cursor: pointer;
  ${({ active }) =>
    active &&
    css`
      background-color: ${colors.neon};
    `}
`;
