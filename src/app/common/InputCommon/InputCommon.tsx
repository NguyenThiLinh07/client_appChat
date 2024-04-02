import React from 'react';
import { Input } from 'antd';

// @ts-ignore
export const InputCommon = ({ label, ...restProps }) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <Input {...restProps} />
    </div>
  );
};
