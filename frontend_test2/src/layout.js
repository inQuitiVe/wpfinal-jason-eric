import { Layout, Menu, Breadcrumb } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css"
import { useState } from 'react';
//import Models from './Components/models';

import Classification from "./Components/mlmodels/classification/classification";
import Overview from "./Components/mlmodels/overview/overview";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Applayout (){
    const [collapsed, setCollapsed] = useState(false)
    //const [mlModel, setMLModel] = useState("classification")

    const OnCollapse = (collapsed) => {
        // console.log(collapsed);
        if(collapsed === false){
            // console.log("hi false")
            setCollapsed(false);
        }
        else {
            // console.log("hi true")
            setCollapsed(true)
        }
    };

    return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={OnCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to = "/">Overview</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to = "/QuickStart">Quick Start</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">
                <Link to = "/Ric">Ric</Link>
                </Menu.Item>
              <Menu.Item key="4">
                <Link to = "/Jason">Jason</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to = "/Eric">Eric</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Models">
              <Menu.Item key="6">
                <Link to = "/Classification">
                  Classification
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to = "/Transformation">Tranformation</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              <Link to = "/Files">Files</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" >
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {/* <Models mlModel = {mlModel}></Models> */}
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>

          <Switch>
            <Route exact path="/"><Overview/></Route>
            <Route exact path="/classification"><Classification/></Route>
          </Switch>
        
      </Layout>
      </Router>
    );
}

export default Applayout