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
import BodyPose from './Components/mlmodels/mpbody/mpbody';
import FaceMesh from './Components/mlmodels/mpface/mpface';
import File from './Components/File';
import Login from './Components/Login';
import Register from './Components/Register';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;




function Applayout (){
    const [collapsed, setCollapsed] = useState(false)
    //const [mlModel, setMLModel] = useState("classification")
    const [currentuser, setuser] = useState(undefined)
    //const settings = currentuser ? ['Logout'] : ['Login','Register'];
    //const pages = currentuser ? ['Models', 'File'] : ['Models'];
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

    const logOut = () =>{
      setuser(undefined)
    }

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
      {!currentuser?<div style={{border: "2px solid #1890ff", borderRadius: '10px',marginLeft: "25%",marginRight: "25%",marginTop: 100,paddingRight: "10%",paddingTop: 30}}><Login setuser={setuser}></Login></div>:<>
      <AppBar position="static" color='primary' style={{color: 'secondary'}}>
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
              <>
                <Link to = '/' textalign="center"><Button
                  key="Models"
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                  Models
                  </Button>
                </Link>
              </>
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

            <>
              <Link to = '/' textalign="center"><Button
                key="Models"
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                Models
                </Button>
              </Link>
            </>
                  
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
                    <div>
                      <MenuItem key="/profile" onClick={handleCloseNavMenu}>
                            {currentuser.username}
                      </MenuItem>
                      <MenuItem key="/logout" onClick={()=>{handleCloseUserMenu();logOut();}}>
                        <Link to={"/"} className="nav-link">
                            Logout
                        </Link>
                      </MenuItem>
                    </div>
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
            <Menu.Item key="2" icon={<FileOutlined />}>
              <Link to = '/file'>History</Link>
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
              <Menu.Item key="10">
                <Link to = "/bodyposeestimation">Body Pose Estimation</Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to = "/facemesh">Face Mesh</Link>
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
              <Breadcrumb.Item>{currentuser}</Breadcrumb.Item>
            </Breadcrumb>
            {/* <Models mlModel = {mlModel}></Models> */}
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
        <Routes>
          <Route path="/" element={<Overview/>}></Route>
          <Route path="/file" element={<File user={currentuser}/>}></Route>
          <Route path="/classification" element={<Classification user={currentuser}/>}></Route>
          <Route path="/transfer" element={<TransferKnn user={currentuser}/>}></Route>
          <Route path="/handposedetection" element={<HandPose user={currentuser}/>}></Route>
          <Route path="/bodyposeestimation" element={<BodyPose user={currentuser}/>}></Route>
          <Route path="/facemesh" element={<FaceMesh user={currentuser}/>}></Route>
          {/* <Route path="/login" element={<Login changeuser={setuser}/>}></Route> */}
          <Route path="/register" element={<Register changeuser={setuser}/>}></Route>
        </Routes>

          
        
      </Layout></>}
      
      </Router>
    );
}

export default Applayout