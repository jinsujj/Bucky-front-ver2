import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Segment, Label, Icon, Form } from 'semantic-ui-react';
import { Menu } from '@/api/studio';

interface StudioMenuFiledProps {
  isError: boolean;
  onChange: (nenus: Menu[]) => void;
}

const defaultMenuOption: Menu = {
  product_name: '',
  price: 0,
  description: '',
};

function StudioMenuField({ isError, onChange }: StudioMenuFiledProps) {
  const [menus, setMenus] = useState<Array<Menu>>([
    {
      ...defaultMenuOption,
    },
  ]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let { value } = e.target;
    const { name } = e.target;

    if (name === 'price') {
      value = value.replace(',', '');
    }

    const updateMenus = menus.map((menu, i) => {
      return i === index ? { ...menu, [name]: value } : menu;
    });
    setMenus(updateMenus);
    onChange(updateMenus);
  };

  const addMenuItem = () => {
    setMenus(menus.concat({ ...defaultMenuOption }));
  };

  const deleteMenuItem = (index: number) => {
    if (menus.length === 1) {
      return alert('최소 옵션 하나는 등록하여야 합니다');
    }
    setMenus(menus.filter((_, i) => i !== index));
  };

  return (
    <Segment.Group widths="equal">
      <Segment>메뉴 </Segment>
      <Segment.Group>
        {menus.map((menu, index) => (
          <Segment key={`menu-${index}`}>
            <LabelBlock>
              <Label>메뉴 {index + 1}</Label>
              <Icon name="minus circle" size="large" onClick={() => deleteMenuItem(index)} />
            </LabelBlock>
            <Form.Group widths="equal">
              <Form.Input
                type="text"
                label="메뉴명"
                name="product_name"
                onChange={(e) => handleOnChange(e, index)}
                placeholder="Standard"
              />
              <Form.Input
                type="text"
                label="메뉴가격"
                name="price"
                onChange={(e) => handleOnChange(e, index)}
                placeholder="150,000"
              />
            </Form.Group>
            <Form.Field>
              <Form.Input
                type="text"
                label="설명"
                name="description"
                onChange={(e) => handleOnChange(e, index)}
                placeholder="배경 1개 선택가능(흰색,검은색), 100컷 내외 촬영, 원본제공"
              />
            </Form.Field>
          </Segment>
        ))}
        <Actions>
          <Icon name="plus circle" size="large" onClick={addMenuItem} />
        </Actions>
        {isError && (
          <Label basic color="red" pointing>
            잘못된 메뉴 업션입니다.
          </Label>
        )}
      </Segment.Group>
    </Segment.Group>
  );
}

export default StudioMenuField;

const LabelBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
`;
