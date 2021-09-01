import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useS3Upload, getImageData } from 'next-s3-upload';
import imageApi from '@/api/image';
import { StudioImage } from '@/api/studio';
import { Button, Dimmer, Header, Icon, Loader, Segment } from 'semantic-ui-react';
import ImageFilterField from './ImageFilterField';

export interface ImageInfo {
  width: number | undefined;
  height: number | undefined;
}

export interface Image {
  people_num: string;
  sex: string;
  color: string;
  outdoor: boolean;
  image_url: string;
  studio_id: number;
}

export interface ImageFilter {
  people_num: string;
  sex: string;
  color: string;
  outdoor: boolean;
}

export interface ImageFormProps {
  id: number;
  onSave: (id: number) => void;
  onRemove: (id: number) => void;
  onDelete: (id: number) => void;
  formId: number;
  image: StudioImage;
}

function ImageForm({ id, onSave, onRemove, onDelete, formId, image }: ImageFormProps) {
  const [images, setImages] = useState<Image>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [ImageInfo, setImageInfo] = useState<ImageInfo>();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [loaing, setisLoaing] = useState(false);
  const [initFilter, setInitFilter] = useState<ImageFilter>();

  //initFilter
  useEffect(() => {
    setInitFilter(image);
  }, []);

  // S3 file Upload
  const handleFileChange = async (file: File) => {
    // fileName verification logic
    const hanguelCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    if (hanguelCheck.test(file.name)) {
      alert('파일명은 영어만 가능합니다.');
      return;
    }

    // Image verification logic
    const fileType = file.type.toString().toUpperCase();
    if (!(fileType.includes('PNG') || fileType.includes('JPG') || fileType.includes('JPEG'))) {
      alert('이미지 파일 확장자는 png, jpg, jpeg 만 등록 가능합니다');
      return;
    }

    setisLoaing(true);
    const { url } = await uploadToS3(file);
    const data = await getImageData(file);
    setisLoaing(false);
    setImageInfo(data);
    setImageUrl(url);
  };

  // CheckBox Values
  const onChange = (checkboxValues: ImageFilter) => {
    setImages({
      ...checkboxValues,
      image_url: imageUrl,
      studio_id: id,
    });
  };

  // Edit Image
  const editImageButton = async (image: StudioImage) => {
    if (images === undefined) {
      return;
    }

    if (images.color === '' || images.people_num === '' || images.sex === '') {
      alert('모든 체크박스 항목을 선택해 주세요');
      return;
    }

    if (images.color === '' || images.people_num === '' || images.sex === '') {
      alert('모든 체크박스 항목을 선택해 주세요');
      return;
    }

    try {
      setisLoaing(true);
      const { data } = await imageApi.editImage(image.image_id, image);
      setisLoaing(false);

      console.log(data);
      alert('수정 되었습니다');
    } catch (e) {
      alert('오류가 발생했습니다. 다시 시도해 주세요');
      console.log(e);
    } finally {
      setisLoaing(false);
    }
  };

  // Save Image
  const saveImageButton = async () => {
    if (images === undefined) {
      return;
    }

    if (imageUrl === '') {
      alert('이미지를 선택해 주세요');
      return;
    }

    if (images.color === '' || images.people_num === '' || images.sex === '') {
      alert('모든 체크박스 항목을 선택해 주세요');
      return;
    }

    try {
      setisLoaing(true);
      const { data } = await imageApi.saveImage(images);
      setisLoaing(false);

      console.log(data);
      alert('저장 되었습니다');
    } catch (e) {
      alert('오류가 발생했습니다. 다시 시도해 주세요');
      console.log(e);
    } finally {
      onSave(formId);
      setisLoaing(false);
    }
  };

  // Delete Image
  const deleteImageButton = async (image: StudioImage) => {
    try {
      setisLoaing(true);
      const { data } = await imageApi.deleteImage(image.image_id);
      setisLoaing(false);
      console.log(data);
      alert('삭제 되었습니다');
    } catch (e) {
      alert('오류가 발생했습니다. 다시 시도해 주세요');
      console.log(e);
    } finally {
      onDelete(image.image_id);
      setisLoaing(false);
    }
  };

  return (
    <ImageFormBlock>
      {/* Studio Image */}
      {image !== undefined && initFilter !== undefined && image.image_url.length > 10 && (
        <Segment.Group>
          {loaing ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Segment placeholder>
              <Centered>
                <Img src={image.image_url} alt={image.image_url} />
                <br />
              </Centered>
            </Segment>
          )}
          <ImageFilterField onChange={onChange} filter={initFilter}>
            <Lefted>
              <Button color="blue" type="submit" onClick={() => editImageButton(image)}>
                수정
              </Button>
              <Button color="red" onClick={() => deleteImageButton(image)}>
                삭제
              </Button>
            </Lefted>
          </ImageFilterField>
        </Segment.Group>
      )}
      {/* New Image */}
      {image.image_id === -1 && initFilter !== undefined && (
        <Segment.Group>
          {loaing ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Segment placeholder>
              {imageUrl && (
                <Centered>
                  <Img src={imageUrl} alt={imageUrl} />
                  <br />
                  {ImageInfo?.width} x {ImageInfo?.height}
                </Centered>
              )}
              {!imageUrl && (
                <>
                  <Header icon>
                    <Icon name="image" />
                    이미지를 등록해 주세요.
                  </Header>
                  <Button primary onClick={openFileDialog}>
                    Add Image
                    <FileInput onChange={handleFileChange} />
                  </Button>
                </>
              )}
            </Segment>
          )}
          <ImageFilterField onChange={onChange} filter={initFilter}>
            <Lefted>
              <Button color="blue" type="submit" onClick={saveImageButton}>
                등록
              </Button>
              <Button onClick={() => onRemove(formId)}>닫기</Button>
            </Lefted>
          </ImageFilterField>
        </Segment.Group>
      )}
    </ImageFormBlock>
  );
}

export default ImageForm;

const ImageFormBlock = styled.div`
  margin-bottom: 5px;
`;

const Centered = styled.div`
  text-align: center;
  align-content: center;
  margin-bottom: 5px;
`;

const Lefted = styled.div`
  text-align: left;
  align-content: left;
`;

const Img = styled.img`
  min-width: 270px;
  width: 50%;
  height: auto;
`;
