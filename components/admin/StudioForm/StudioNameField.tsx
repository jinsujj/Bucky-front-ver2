import React, { useState } from 'react';
import { Form, Label } from 'semantic-ui-react';

interface StudioNameFieldProps {
  isError: boolean;
  onChange: (name: string, vale: string) => void;
}

function StudioNameField({ isError, onChange }: StudioNameFieldProps) {
  const [name, setName] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
    onChange(name, value);
  };

  return (
    <Form.Field>
      <b>상호명</b>
      <input
        type="text"
        name="name"
        placeholder={'상호명을 입력해주세요'}
        onChange={handleOnChange}
        value={name}
      />
      {isError && (
        <Label basic color="red" pointing>
          상호명을 입력해 주세요
        </Label>
      )}
    </Form.Field>
  );
}

export default StudioNameField;
