import React, { ReactNode } from 'react';
import { Header } from './Header';
import { SideBar } from './SideBar';
import { Layout } from 'antd';

export const { Content, Sider } = Layout;

type Props = {
  children?: ReactNode;
};

const LayoutPage: React.FC<Props> = (props: Props) => {
  const { children } = props;

  return (
    <Layout>
      <Header />
      <Layout>
        <Sider width={198} breakpoint="xl" collapsedWidth="0" className="bg-transperent">
          <SideBar />
        </Sider>
        <Layout style={{ background: '#fffbf8' }}>
          <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
