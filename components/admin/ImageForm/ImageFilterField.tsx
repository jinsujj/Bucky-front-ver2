import React, { useState, useMemo } from 'react';
import { Form, Segment } from 'semantic-ui-react';
import styled from '@emotion/styled';

export interface ImageInfo {
  width: number | undefined;
  height: number | undefined;
}

export interface ImageFilter {
  people_num: string;
  sex: string;
  color: string;
  outdoor: boolean;
}

export interface ImageFilterFieldProps {
  onChange: (e: ImageFilter) => void;
  filter: ImageFilter;
  children: any;
}

function ImageFilterField({ onChange, filter, children }: ImageFilterFieldProps) {
  const [imageFilter, setImageFilter] = useState<ImageFilter>({
    people_num: '',
    sex: '',
    color: '',
    outdoor: false,
  });

  // CheckBox Value
  const [color, setColor] = useState(filter.color);
  const [people, setPeople] = useState(filter.people_num);
  const [sex, setSex] = useState(filter.sex);
  const [isOut, setIsOut] = useState(filter.outdoor);

  useMemo(() => {
    onChange(imageFilter);
  }, [imageFilter]);

  const handleonChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newImageFilter: ImageFilter = {
      people_num: people,
      sex: sex,
      color: color,
      outdoor: isOut,
    };

    if (
      e.target.value === 'ACHROMATIC' ||
      e.target.value === 'VIVID' ||
      e.target.value === 'PASTEL'
    ) {
      setColor(e.target.value);
      newImageFilter.color = e.target.value;
    } else if (e.target.value === 'ONE' || e.target.value === 'TWO' || e.target.value === 'THREE') {
      setPeople(e.target.value);
      newImageFilter.people_num = e.target.value;
    } else if (e.target.value === 'M' || e.target.value === 'F' || e.target.value === 'C') {
      setSex(e.target.value);
      newImageFilter.sex = e.target.value;
    } else if (e.target.name === 'outdoor') {
      setIsOut(e.target.checked);
      newImageFilter.outdoor = !isOut;
    }

    setImageFilter(newImageFilter);
  };

  return (
    <ImageFormBlock>
      <Segment>
        {filter.color !== undefined && (
          <Segment>
            <Form.Group inline>
              <b>색상</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="무채색"
                value="ACHROMATIC"
                checked={color === 'ACHROMATIC'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="비비드"
                value="VIVID"
                checked={color === 'VIVID'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="파스텔"
                value="PASTEL"
                checked={color === 'PASTEL'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
            <Form.Group inline>
              <b>야외</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="Y/N"
                name="outdoor"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
            <Form.Group inline>
              <b>인원</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="1인 "
                value="ONE"
                checked={people === 'ONE'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="2인 "
                value="TWO"
                checked={people === 'TWO'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="3인 이상 "
                value="THREE"
                checked={people === 'THREE'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
            <Form.Group inline>
              <b>성별</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="남성 "
                value="M"
                checked={sex === 'M'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="여성 "
                value="F"
                checked={sex === 'F'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="혼성 "
                value="C"
                checked={sex === 'C'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
          </Segment>
        )}
        {filter.color === undefined && (
          <Segment>
            <Form.Group inline>
              <b>색상</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="무채색"
                value="ACHROMATIC"
                checked={color === 'ACHROMATIC'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="비비드"
                value="VIVID"
                checked={color === 'VIVID'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="파스텔"
                value="PASTEL"
                checked={color === 'PASTEL'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
            <Form.Group inline>
              <b>야외</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="Y/N"
                name="outdoor"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
            <Form.Group inline>
              <b>인원</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="1인 "
                value="ONE"
                checked={people === 'ONE'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="2인 "
                value="TWO"
                checked={people === 'TWO'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="3인 이상 "
                value="THREE"
                checked={people === 'THREE'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
            <Form.Group inline>
              <b>성별</b> &nbsp;
              <Form.Field
                control="input"
                type="checkbox"
                label="남성 "
                value="M"
                checked={sex === 'M'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="여성 "
                value="F"
                checked={sex === 'F'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
              <Form.Field
                control="input"
                type="checkbox"
                label="혼성 "
                value="C"
                checked={sex === 'C'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleonChangeCheckBox(e)}
              />
            </Form.Group>
          </Segment>
        )}
        {children}
      </Segment>
    </ImageFormBlock>
  );
}

export default ImageFilterField;

const ImageFormBlock = styled.div``;
