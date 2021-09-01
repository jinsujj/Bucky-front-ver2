import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Segment, Label, Icon } from 'semantic-ui-react';

interface StudioPhoneFiledProps {
  isError: boolean;
  onChange: (addresses: Array<string>) => void;
}

function StudioPhoneFiled({ isError, onChange }: StudioPhoneFiledProps) {
  const [addresses, setAddresses] = useState<Array<string>>(['']);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updateAddress = addresses.map((address, i) => {
      return i === index ? value : address;
    });
    setAddresses(updateAddress);
    onChange(updateAddress);
  };

  const addAddressItem = () => {
    setAddresses(addresses.concat(''));
  };

  const deleteAddressItem = (index: number) => {
    if (addresses.length === 1) {
      return alert('최소 주소 하나는 등록하여야 합니다');
    }
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  return (
    <Segment.Group widths="equal">
      <Segment>주소 </Segment>
      <Segment.Group>
        {addresses.map((address, index) => (
          <Segment key={`phone-${index}`}>
            <LabelBlock>
              <Label>주소 {index + 1}</Label>
              <Icon name="minus circle" size="large" onClick={() => deleteAddressItem(index)} />
            </LabelBlock>
            <input
              type="text"
              name="address"
              value={address}
              placeholder="상세주소를 입력해주세요"
              onChange={(e) => handleOnChange(e, index)}
            />
          </Segment>
        ))}
        <Actions>
          <Icon name="plus circle" size="large" onClick={addAddressItem} />
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
