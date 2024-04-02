import React from 'react';
import { Table } from 'antd';

export const TableCommon = ({ ...restProps }) => {
  return (
    <Table {...restProps} rowKey={(record) => record.uid} pagination={false} scroll={{ y: 300 }} />
  );
};
