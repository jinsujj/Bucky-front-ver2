import React, { useState } from 'react';
import { Segment, Form } from 'semantic-ui-react';

interface StudioServiceFieldProps {
  onChange: (key: string, value: string | number | boolean) => void;
}

function StudioServiceField({ onChange }: StudioServiceFieldProps) {
  const [services, setService] = useState({
    hair_makeup: false,
    rent_clothes: false,
    tanning: false,
    waxing: false,
    parking: false,
  });

  const { hair_makeup, rent_clothes, tanning, waxing, parking } = services;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    console.log(name, checked);
    setService({ ...services, [name]: checked });
    onChange(name, checked);
  };

  return (
    <Segment.Group widths="equal">
      <Segment> 부가 서비스 </Segment>
      <Segment>
        <Form.Group inline>
          <b>헤어&메이크업</b>
          <Form.Input
            type="checkbox"
            name="hair_makeup"
            onChange={handleOnChange}
            value={hair_makeup}
          />
          <b>의상대여</b>
          <Form.Input
            type="checkbox"
            name="rent_clothes"
            onChange={handleOnChange}
            value={rent_clothes}
          />
          <b>태닝</b>
          <Form.Input type="checkbox" name="tanning" onChange={handleOnChange} value={tanning} />
          <b>왁싱</b>
          <Form.Input type="checkbox" name="waxing" onChange={handleOnChange} value={waxing} />
          <b>주차장</b>
          <Form.Input type="checkbox" name="parking" onChange={handleOnChange} value={parking} />
        </Form.Group>
      </Segment>
    </Segment.Group>
  );
}

export default StudioServiceField;
