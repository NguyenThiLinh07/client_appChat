import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import { FaCamera } from 'react-icons/fa';
import ContextMenu from '../ContextMenu/ContextMenu';
import PhotoLibrary from '../PhotoLibrary/PhotoLibrary';
import CapturePhoto from '../CapturePhoto/CapturePhoto';
import PhotoPicker from '../PhotoPicker/PhotoPicker';
import { useSelector } from 'react-redux';
import { RootState } from '../../../types';

type Props = {
  type: 'sm' | 'md' | 'lg' | 'xl';
  image: string;
  setImage?: React.Dispatch<React.SetStateAction<string>>;
};

const Avatar: React.FC<Props> = (props: Props) => {
  const { type, image, setImage } = props;
  const { currentUser } = useSelector((state: RootState) => state.auth);
  const [hover, setHover] = useState(false);
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [showPhotoLibrary, setShowPhotoLibrary] = useState(false);
  const [showCapturePhoto, setShowCapturePhoto] = useState(false);

  const showContextMenu = (e: any) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX, y: e.pageY });
    setIsContextMenuVisible(true);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker');
      // @ts-ignore
      data.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  const contextMenuOptions = [
    {
      name: 'Task Photo',
      callback: () => {
        setShowCapturePhoto(true);
      },
    },
    {
      name: 'Choose From Library',
      callback: () => {
        setShowPhotoLibrary(true);
      },
    },
    {
      name: 'Upload Photo',
      callback: () => {
        setGrabPhoto(true);
      },
    },
    {
      name: 'Remove Photo',
      callback: () => {
        setImage?.(currentUser?.avatar ?? '/avatar.jpg');
      },
    },
  ];

  const handleChangePhotoPicker = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const data = document.createElement('img');
    reader.onload = async (event: any) => {
      data.src = event.target.result;
      data.setAttribute('data-src', event.target.result);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage?.(data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === 'sm' && (
          <div className="w-10 h-10 rounded-full relative">
            <Image src={image} alt="avatar" className="w-full h-full object-cover" />
          </div>
        )}
        {type === 'md' && (
          <div className="w-12 h-12 rounded-full relative">
            <Image src={image} alt="avatar" className="w-full h-full object-cover" />
          </div>
        )}
        {type === 'lg' && (
          <div className="w-14 h-14 rounded-full relative">
            <Image src={image} alt="avatar" className="w-full h-full object-cover" />
          </div>
        )}
        {type === 'xl' && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`flex absolute top-0 left-0 gap-2 z-10 rounded-full flex-col items-center justify-center w-40 h-40 bg-photopicker-overlay-background
             ${hover ? 'visible' : 'hidden'}`}
              onClick={(e) => showContextMenu(e)}
              id="context-opener"
            >
              <FaCamera
                className="text-2xl"
                id="context-opener"
                onClick={(e) => showContextMenu(e)}
              />
              <span className="text-center" onClick={(e) => showContextMenu(e)} id="context-opener">
                Change profile photo
              </span>
            </div>
            <div className="h-40 w-40 flex justify-center">
              <Image src={image} alt="avatar" className="rounded-full object-cover !h-full" />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
          coordinates={contextMenuCoordinates}
        />
      )}
      {showCapturePhoto && (
        <CapturePhoto setImage={setImage} hideCapturePhoto={setShowCapturePhoto} />
      )}
      {showPhotoLibrary && (
        <PhotoLibrary setImage={setImage} hidePhotoLibrary={setShowPhotoLibrary} />
      )}
      {grabPhoto && <PhotoPicker onChange={handleChangePhotoPicker} />}
    </>
  );
};

export default Avatar;
