import { Layout, Menu, Breadcrumb, Transfer } from 'antd';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons';
import "antd/dist/antd.css"
import { useState } from 'react';

import Classification from "./Components/mlmodels/classification/classification";
import Overview from "./Components/mlmodels/overview/overview";
import TransferKnn from './Components/mlmodels/transferlearning/transfer';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuMui from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from './logo.png';
import HandPose from './Components/mlmodels/mphand/mphand';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const pages = ['Models', 'File'];
const settings = ['Profile', 'Logout'];

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


    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };



    return (
    <Router>
      <AppBar position="static" /*style={{float: true}}*/>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <img src = {Logo} alt='LOGOO' style={{width:50}}></img>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <MenuMui
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link to = '/' textAlign="center">{page}</Link>
                  </MenuItem>
                ))}
              </MenuMui>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              align="left"
            >
              <img src = {Logo} alt='LOGOO' style={{width:40, maxWidth: "15vw"}}></img>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link to = '/' textAlign="center"><Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <MenuMui
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </MenuMui>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
            <SubMenu key="sub2" icon={<RocketOutlined />} title="Models">
              <Menu.Item key="6">
                <Link to = "/classification">
                  Classification
                </Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to = "/transfer">Tranfer Learning</Link>
              </Menu.Item>
              <Menu.Item key="9">
                <Link to = "/handposedetection">Hand Pose Detection</Link>
              </Menu.Item>
            </SubMenu>
            {/* <Menu.Item key="9" icon={<FileOutlined />}>
              <Link to = "/Files">Files</Link>
            </Menu.Item> */}
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

          <Routes>
            <Route path="/" element={<Overview/>}></Route>
            <Route path="/classification" element={<Classification/>}></Route>
            <Route path="/transfer" element={<TransferKnn/>}></Route>
            <Route path="/handposedetection" element={<HandPose/>}></Route>
          </Routes>
        
      </Layout>
      </Router>
    );
}

export default Applayout