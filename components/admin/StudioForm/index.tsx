import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Form, Segment, TextArea, Label } from 'semantic-ui-react';
import StudioNameField from './StudioNameField';
import StudioPhoneFiled from './StudioPhoneFiled';
import StudioAddressField from './StudioAddressField';
import StudioMenuField from './StudioMenuField';
import StudioServiceField from './StudioServiceField';
import { SaveStudioPayload, Phone, Address, Menu } from '@/api/studio';

/**
 * @todo
1. 여기 왜 SavePayload로 대응해주면 안되는지? unknown 수정할 것 !!! 
 */

export interface StudioFormPayload {
  studio: SaveStudioPayload;
  addresses: Array<Address>;
  phones: Array<Phone>;
  menus: Array<Menu>;
}

interface StudioFormProps {
  onSubmit?: (form: StudioFormPayload) => void;
  isLoading?: boolean;
}

function StudioForm({ onSubmit, isLoading }: StudioFormProps) {
  /**
   * @todo
   * 1.유저 관련 정리
   * 2. 컴포넌트 분리
   * 3. ContextApi or Redux 사용 여부 판단
   * 4. ract-hook-form reserch 및 적용
   * 5. 다이나믹 폼 관련 리서치
   * 6. 옵션 관련 아이템 min_price, max_price
   * 7. 옵션 관련 min, max만 등록해도 되는지?
   * 8. 타입관련 재 정의
   */
  const [studioInfo, setStudioInfo] = useState<SaveStudioPayload>({
    name: '',
    min_price: 0,
    max_price: 0,
    homepage: '',
    instagram: '',
    naver: '',
    kakao: '',
    description: '',
    hair_makeup: false,
    rent_clothes: false,
    tanning: false,
    waxing: false,
    parking: false,
    user_id: 1775712869,
  });

  const [phones, setPhones] = useState<Array<string>>([]);
  const [addresses, setAddresses] = useState<Array<string>>([]);
  const [menuOptions, setMenuOptions] = useState<Array<Menu>>([
    {
      product_name: '',
      price: 0,
      description: '',
    },
  ]);
  console.log(setMenuOptions);

  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
    menu: false,
  });

  const setMenus = (menus: Array<Menu>) => {
    setMenuOptions(menus);
    console.log(menus);
  };

  const setStudioField = (key: string, value: string | number | boolean) => {
    setStudioInfo({
      ...studioInfo,
      [key]: value,
    });
    console.log(key, value);
  };

  const calcMinAndMaxPrice = () => {
    const priceList = menuOptions.map((menu) => menu.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
    return {
      minPrice,
      maxPrice,
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!onSubmit) {
      return;
    }

    const { minPrice, maxPrice } = calcMinAndMaxPrice();

    onSubmit({
      studio: {
        ...studioInfo,
        min_price: minPrice,
        max_price: maxPrice,
      },
      addresses: addresses.map((addressItem, index) => ({
        address: addressItem,
        is_main: index === 0 ? 'Y' : 'N',
      })),
      phones: phones.map((phoneItem, index) => ({
        phone: phoneItem || '',
        is_main: index === 0 ? 'Y' : 'N',
      })),
      menus: menuOptions.map((menu) => ({
        ...menu,
        price: Number(menu.price),
      })),
    });
  };

  console.log(setError);

  const { description, homepage, naver, instagram, kakao } = studioInfo;

  return (
    <StudioFormBlock>
      <Form onSubmit={handleSubmit}>
        <StudioNameField isError={error.name} onChange={setStudioField} />
        <StudioPhoneFiled isError={error.phone} onChange={setPhones} />
        <StudioAddressField isError={error.address} onChange={setAddresses} />
        <StudioMenuField isError={error.address} onChange={setMenus} />
        <StudioServiceField onChange={setStudioField} />
        <Segment.Group>
          <Segment>링크</Segment>
          <Segment.Group>
            <Segment>
              <Form.Field>
                <b>HomePage</b>
                <Form.Input
                  type="text"
                  name="homepage"
                  value={homepage}
                  onChange={(e) => setStudioField(e.target.name, e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <b>Naver</b>
                <Form.Input
                  type="text"
                  name="naver"
                  value={naver}
                  onChange={(e) => setStudioField(e.target.name, e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <b>Instagram</b>
                <Form.Input
                  type="text"
                  name="instagram"
                  value={instagram}
                  onChange={(e) => setStudioField(e.target.name, e.target.value)}
                />
              </Form.Field>
              <Form.Field>
                <b>KaKao</b>
                <Form.Input
                  type="text"
                  name="kakao"
                  value={kakao}
                  onChange={(e) => setStudioField(e.target.name, e.target.value)}
                />
              </Form.Field>
            </Segment>
          </Segment.Group>
        </Segment.Group>
        <Label>스튜디오 설명 </Label>
        <TextArea
          label="스튜디오 설명"
          name="description"
          value={description}
          onChange={(e) => setStudioField(e.target.name, e.target.value)}
        ></TextArea>
        <Actions>
          <Button type="submit" disable={Boolean(isLoading).toString()}>
            등록
          </Button>
        </Actions>
      </Form>
    </StudioFormBlock>
  );
}

export default StudioForm;

const StudioFormBlock = styled.div``;

const Actions = styled.div`
  padding: 20px;
  display: flex;
`;
