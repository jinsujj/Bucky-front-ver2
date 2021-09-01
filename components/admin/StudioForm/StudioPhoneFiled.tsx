import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Segment, Label, Icon } from 'semantic-ui-react';

interface StudioPhoneFiledProps {
  isError: boolean;
  onChange: (phones: Array<string>) => void;
}

function StudioPhoneFiled({ isError, onChange }: StudioPhoneFiledProps) {
  const [phones, setPhones] = useState<Array<string>>(['']);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatePhones = phones.map((phone, i) => {
      return i === index ? value : phone;
    });
    setPhones(updatePhones);
    onChange(updatePhones);
  };

  const addPhoneItem = () => {
    setPhones(phones.concat(''));
  };

  const deletePhoneItem = (index: number) => {
    if (phones.length === 1) {
      return alert('최소 연락처 하나는 등록하여야 합니다');
    }
    setPhones(phones.filter((_, i) => i !== index));
  };

  return (
    <Segment.Group widths="equal">
      <Segment>연락처 </Segment>
      <Segment.Group>
        {phones.map((phone, index) => (
          <Segment key={`phone-${index}`}>
            <LabelBlock>
              <Label>연락처 {index + 1}</Label>
              <Icon name="minus circle" size="large" onClick={() => deletePhoneItem(index)} />
            </LabelBlock>
            <input
              type="text"
              name="address"
              value={phone}
              placeholder="000-000-000 형태로 입력해 주세요"
              onChange={(e) => handleOnChange(e, index)}
            />
          </Segment>
        ))}
        <Actions>
          <Icon name="plus circle" size="large" onClick={addPhoneItem} />
        </Actions>
        {isError && (
          <Label basic color="red" pointing>
            누락된 연락처가 있거나 잘 못 기입된 연락처가 있습니다
          </Label>
        )}
      </Segment.Group>
    </Segment.Group>
  );
}

export default StudioPhoneFiled;

const LabelBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
`;
