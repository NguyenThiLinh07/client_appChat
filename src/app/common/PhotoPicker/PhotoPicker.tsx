import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const PhotoPicker: React.FC<Props> = (props: Props) => {
  const { onChange } = props;
  const component = <input type="file" hidden id="photo-picker" onChange={onChange} />;

  return ReactDOM.createPortal(
    component,
    document.getElementById('photo-picker-element') as HTMLElement,
  );
};

export default PhotoPicker;
