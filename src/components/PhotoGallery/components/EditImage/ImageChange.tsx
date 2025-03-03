import { Input } from 'components/Atoms';
import { imageChangeType, PhotoType } from 'components/PhotoGallery';
import { useEffect, useRef, useState } from 'react';

export const ImageChange = ({ setEditPhoto, imgId }: imageChangeType) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imgParams, setImgParams] = useState({
    size: 0,
    lastModified: '',
    type: '',
  });

  useEffect(() => {
    const current = inputFile.current;

    if (current) {
      current.value = '';
    }
  }, [imgId]);

  const justLogic = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const imgExtensionFromType = (imgType: string): string =>
      ({
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/svg+xml': 'svg',
        'image/webp': 'webp',
      }[imgType] ?? 'jpg');

    const file = event.target.files[0];
    const { size, lastModified, type: imgType } = file;
    const sizeMB = +(size / (1024 * 1024)).toFixed(1);
    const last = new Date(lastModified);
    const lastModifiedText = `${last.getDay()}.${
      last.getMonth() + 1
    }.${last.getFullYear()}`;

    setImgParams({
      size: sizeMB,
      lastModified: lastModifiedText,
      type: imgType,
    });

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = () => setIsLoading(true);
    reader.onloadend = () => setIsLoading(false);
    reader.onload = () => {
      return setEditPhoto((old: PhotoType) => ({
        ...old,
        url: reader.result,
        imgType: imgExtensionFromType(imgType),
      }));
    };
  };

  const imgStatus = () => (
    <>
      {!isLoading && !imgParams.type && <>Vyberte foto</>}
      {isLoading && (
        <span className='isLoading'> . . . n a h r á v á m . . .</span>
      )}
      {!isLoading && imgParams.type && (
        <span>
          {imgParams.type} | {imgParams.size}MB | {imgParams.lastModified}
        </span>
      )}
    </>
  );

  return (
    <Input
      label={imgStatus()}
      ref={inputFile}
      type='file'
      name='upfile'
      accept='image/*'
      onChange={(event) => justLogic(event)}
    />
  );
};
