import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import studioApi, { StudioName, StudioImage } from '@/api/studio';
import Layout from '@/components/admin/Layout';
import ImageForm from '@/components/admin/ImageForm';
import { Form, Icon, Segment } from 'semantic-ui-react';

function Images() {
  const [selectedStudioId, setSelectedStudioId] = useState(0);
  const [ImageForms, setImageForm] = useState<StudioImage[]>([]);
  const [NewImageForms, SetImageForms] = useState([
    {
      id: 1,
    },
  ]);

  // init data
  const initData = {
    image_id: -1,
    people_num: '',
    sex: '',
    color: '',
    outdoor: false,
    image_url: '',
    studio_id: -1,
    create_time: '',
    update_time: '',
    is_delete: '',
    is_release: '',
  };

  // Studio Info Get
  const [studioList, setStudioList] = useState<StudioName[]>([]);
  useEffect(() => {
    getStudioList();
  }, []);

  const getStudioList = async () => {
    try {
      const studios = await studioApi.getStudioAll();
      setStudioList(studios.studios);
      setSelectedStudioId(studios.studios[0].studio_id); //Null Point Error fix
    } catch (e) {
      console.log(e);
    }
  };

  // SelectBox check value
  const selectBoxOnChange = (e: { target: { value: string } }) => {
    const studio_id = parseInt(e.target.value);
    setSelectedStudioId(studio_id);
    getStudioImages(studio_id);
  };

  // Get studio Images
  const getStudioImages = async (studio_id: number) => {
    setImageForm([]);
    const images = await studioApi.getStudioImages(studio_id);
    setImageForm(images.images);
  };

  const test = (e: any) => {
    console.log(e);
  };

  // plus button Logic
  const nextId = useRef(2);
  const addImageForm = () => {
    const nextForm = {
      id: nextId.current,
    };
    SetImageForms(NewImageForms.concat(nextForm));
    nextId.current += 1;
  };

  // close button Logic
  const onClose = (id: number) => {
    SetImageForms(NewImageForms.filter((form) => form.id !== id));
  };

  // delete button Logic
  const onDelete = (image_id: number) => {
    setImageForm(ImageForms.filter((form) => form.image_id !== image_id));
  };

  // save button Logic
  const onSave = (image_id: number) => {
    SetImageForms(NewImageForms.filter((form) => form.id !== image_id));
    getStudioImages(selectedStudioId);
  };

  return (
    <Layout title="이미지 등록">
      <Form>
        <Form.Field>
          <b>스튜디오</b>
          <select className="studio" onBlur={test} onChange={selectBoxOnChange}>
            {studioList.map((studio: StudioName) => (
              <option value={studio.studio_id} key={studio.studio_id}>
                {studio.name}
              </option>
            ))}
          </select>
        </Form.Field>
        <Segment.Group>
          {ImageForms.map((form) => (
            <ImageForm
              id={form.studio_id}
              onSave={onSave}
              onRemove={onClose}
              onDelete={onDelete}
              formId={form.studio_id}
              key={form.studio_id}
              image={form}
            />
          ))}
          {NewImageForms.map((form) => (
            <ImageForm
              id={selectedStudioId}
              onSave={onSave}
              onRemove={onClose}
              onDelete={onDelete}
              formId={form.id}
              key={form.id}
              image={initData}
            />
          ))}
          <Centered>
            <Icon name="plus circle" size="large" onClick={addImageForm} />
          </Centered>
        </Segment.Group>
      </Form>
    </Layout>
  );
}

export default Images;

const Centered = styled.div`
  text-align: center;
  align-content: center;
  margin-bottom: 5px;
`;
