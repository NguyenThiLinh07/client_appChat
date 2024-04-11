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
      <Layout className="h-[calc(100vh-60px)]">
        <Sider
          width={300}
          breakpoint="xl"
          collapsedWidth="0"
          className="bg-transperent shadow-default"
        >
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
