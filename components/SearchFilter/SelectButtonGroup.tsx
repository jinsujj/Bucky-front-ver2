import styled from '@emotion/styled';
import Button from '@/components/Button';
import colors from '@/styles/colors';
import { css } from '@emotion/react';
import { rgba } from 'polished';

export interface groupItem {
  name: string;
  id: number;
  selected: boolean;
  value: string;
}

export interface SelectButtonGroupProps {
  label: string;
  group: groupItem[];
  onClick: (id: number) => void;
}

function SelectButtonGroup({ label, group, onClick }: SelectButtonGroupProps) {
  return (
    <SelectButtonGroupBlock>
      <Label>{label}</Label>
      <Group>
        {group.map(({ name, id, selected }) => (
          <GroupItem key={id}>
            <SelectButton onClick={() => onClick(id)} selected={selected}>
              {name}
            </SelectButton>
          </GroupItem>
        ))}
      </Group>
    </SelectButtonGroupBlock>
  );
}

const SelectButtonGroupBlock = styled.div`
  display: flex;
  align-items: center;
  margin: 0 6px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  margin-right: 4px;
  color: ${colors.gray[400]};
`;

const Group = styled.ul`
  display: flex;
`;

const GroupItem = styled.li`
  button {
    border-radius: 0;
    border-left-width: 0;
  }
  &:first-of-type {
    button {
      border-left-width: 1px;
      border-radius: 4px 0 0 4px;
    }
  }

  &:last-of-type {
    button {
      border-radius: 0px 4px 4px 0px;
    }
  }
`;

const SelectButton = styled(Button)<{ selected: boolean }>`
  width: 76px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  &:hover,
  &:focus-visible {
    background-color: ${rgba(colors.neon, 0.1)};
    border-color: ${colors.neon};
  }
  &:active {
    background-color: ${rgba(colors.neon, 0.2)};
    border-color: ${colors.neon};
  }
  ${({ selected }) =>
    selected &&
    css`
      border-color: ${colors.neon};
      color: ${colors.gray[500]};
      font-weight: bold;
      font-weight: 500;
    `}
`;

export default SelectButtonGroup;
