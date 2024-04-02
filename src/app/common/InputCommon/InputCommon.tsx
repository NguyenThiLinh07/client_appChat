import React from 'react';
import { Input } from 'antd';

// @ts-ignore
export const InputCommon = ({ label, id, ...restProps }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="float-start text-base font-normal pb-2">
          {label}
        </label>
      )}
      <Input {...restProps} id={id} />
    </div>
  );
};
