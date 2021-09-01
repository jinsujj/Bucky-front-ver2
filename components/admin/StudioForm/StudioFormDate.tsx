import React from 'react';
import { Form } from 'semantic-ui-react';

interface StudioFormDateProps {
  createTime?: string;
  updateTime?: string;
}

function StudioFormDate({ createTime = '', updateTime = '' }: StudioFormDateProps) {
  return (
    <Form.Group widths="equal">
      <Form.Input
        value={createTime}
        fluid
        label="Create Time"
        placeholder={createTime ? createTime : '등록일'}
        readOnly
      />
      <Form.Input
        value={updateTime}
        fluid
        label="Create Time"
        placeholder={updateTime ? updateTime : '수정일'}
        readOnly
      />
    </Form.Group>
  );
}

export default StudioFormDate;
