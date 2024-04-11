import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Image } from 'antd';

type Props = {
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  hidePhotoLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};

const PhotoLibrary: React.FC<Props> = (props: Props) => {
  const { setImage, hidePhotoLibrary } = props;

  const images = [
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
    '/avatar.jpg',
  ];

  return (
    <div className="fixed top-0 left-0 max-h-[100vh] z-10 flex max-w-[100vw] h-full w-full justify-center items-center">
      <div className="h-max w-max bg-[#fff] gap-6 rounded-lg p-4 shadow-default">
        <div
          className="pt-2 pe-2 cursor-pointer flex items-end justify-end"
          onClick={() => hidePhotoLibrary(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="grid grid-cols-3 justify-center items-center w-full gap-16 p-20">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setImage?.(image);
                hidePhotoLibrary(false);
              }}
            >
              <div className="h-32 w-32 cursor-pointer relative">
                <Image
                  src={image}
                  alt="avatar"
                  className="rounded-full object-cover !h-full"
                  preview={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoLibrary;
