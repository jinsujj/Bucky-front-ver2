import { useState } from 'react';
import { useS3Upload, getImageData } from 'next-s3-upload';

const defaultUrl =
  'https://bucky-bodyprofile.s3.ap-northeast-2.amazonaws.com/next-s3-uploads/7e3cc213-80b7-4e1c-bce2-0ae5098f7409/Default.png';

type GreetingsProps = {
  onInsert: (url: string | undefined) => void;
};

export default function UploadTest({ onInsert }: GreetingsProps) {
  const [imageUrl, setImageUrl] = useState<string>();
  const [height, setHeight] = useState([] as any);
  const [width, setWidth] = useState([] as any);
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [filename, setFilename] = useState('');

  // S3 file Upload
  const InputName = (e: any) => setFilename(e.target.value);

  const handleFileChange = async (file: File) => {
    const { url } = await uploadToS3(file);
    alert(url);
    const { height, width } = await getImageData(file);

    setImageUrl(url);
    setWidth(width);
    setHeight(height);
    onInsert(imageUrl);

    console.log(height + 'x' + width);
    console.log(imageUrl);
  };

  return (
    <>
      <div>
        {imageUrl && (
          <div>
            <img src={imageUrl} width={'250px'} height={'auto'} alt={imageUrl} />
            <div>{imageUrl}</div>
            <hr />
            <div>
              {height}x{width}
            </div>
          </div>
        )}
        {!imageUrl && (
          <div>
            <img src={defaultUrl} width={'250px'} height={'auto'} alt={imageUrl} />
            <div>{defaultUrl}</div>
            <hr />
          </div>
        )}
      </div>
      <div>
        <FileInput onChange={handleFileChange} />
        <div>
          <b>이미지 </b>
          <input type="text" value={filename} onChange={InputName}></input>
          <button onClick={openFileDialog}>업로드</button>
        </div>
      </div>
    </>
  );
}
