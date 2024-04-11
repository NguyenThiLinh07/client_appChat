import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setShowToast } from '../../../store/toast/toastSlice';
import { ETypeToast } from '../../enum';
import { AppDispatch } from '../../../store/configureStore';

type Props = {
  setImage?: React.Dispatch<React.SetStateAction<string>>;
  hideCapturePhoto: React.Dispatch<React.SetStateAction<boolean>>;
};

const CapturePhoto: React.FC<Props> = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { setImage, hideCapturePhoto } = props;
  const videoRef = useRef(null);

  useEffect(() => {
    let stream: any = null;
    const startCamera = async () => {
      stream = await navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then((stream) => {
          if (videoRef.current) {
            // @ts-ignore
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          dispatch(
            setShowToast({
              label:
                "Cannot access the camera. Make sure you've allowed access to the camera and that your camera is working properly.",
              type: ETypeToast.Error,
            }),
          );
          hideCapturePhoto(false);
          console.error('Error accessing camera', err);
        });
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((track: { stop: () => any }) => track.stop());
    };
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    if (video) {
      const canvas = document.createElement('canvas');
      canvas.getContext('2d')?.drawImage(video, 0, 0, 300, 150);
      const img = canvas.toDataURL('image/png');
      setImage?.(img);
      hideCapturePhoto(false);
    }
  };

  return (
    <div className="absolute h-2/3 w-2/6 top-1/4 left-1/3 bg-[#fff] shadow-default gap-3 rounded-lg pt-2 flex items-center justify-center z-10">
      <div className="flex flex-col gap-4 w-full items-center justify-between h-full ">
        <div
          className="pt-2 pr-2 cursor-pointer flex items-end justify-end w-full"
          onClick={() => hideCapturePhoto(false)}
        >
          <IoClose className="h-10 w-10 cursor-pointer" />
        </div>
        <div className="flex justify-center w-full h-[400px]">
          <video id="video" width="400" autoPlay ref={videoRef} className="w-full"></video>
        </div>
        <button
          className="h-16 w-16 bg-white rounded-full cursor-pointer border-8 border-teal-light p-2 mb-10"
          onClick={capturePhoto}
        ></button>
      </div>
    </div>
  );
};

export default CapturePhoto;
