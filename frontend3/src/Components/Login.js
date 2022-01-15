import { Form, Input, Button, Checkbox,message } from 'antd';
import 'antd/dist/antd.css'
import React, { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { LOG_IN_USER,REGISTER_USER_MUTATION } from "../graphql";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false)
  const [repassword, setRepassword] = useState('')
  const [LogInUser] = useMutation(LOG_IN_USER);
  const [RegisterUserMutation] = useMutation(REGISTER_USER_MUTATION);

  const Trylogin = async()=>{
    if(register === true){
      if(password === repassword){
        console.log("tryregister");
        const check = await RegisterUserMutation({
          variables:{
            username:username,
            email:email,
            password:password}
        })
        if(check.data.registerUser.message === 'Registered!'){
          message.success('Registered!',1)
          setRegister(false)
        }
        else{
          message.error(check.data.registerUser.message,1)
        }
        // message.success('Registered!',2)
        // console.log(data)
        // 
      }
      else{
        message.error('Fail to verify the password!',2)
        console.log(password,repassword)
        setPassword('')
        setRepassword('')
      }
    }
    else{
      console.log("trylogin");
      const res = await LogInUser({
        variables:{
          username:username,
          password:password}
      })
      console.log(res)
      console.log(res.data.logInUser.message)
      if(res.data.logInUser.message === 'Login Succeed!'){
        message.success(res.data.logInUser.message,1)
      }
      else{
        message.warning(res.data.logInUser.message,1)
      }
      // console.log(datal.message)
      props.setuser(username)
    }
  }

  const onFinish = (values) => {
    // console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input onChange={(e)=>{setUsername(e.target.value)}} value={username}/>
      </Form.Item>

      {register?<><Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
          },
        ]}
      >
        <Input onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </Form.Item></>:<></>}

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </Form.Item>

      {register?<><Form.Item
        label="Verify"
        name="repassword"
        rules={[
          {
            required: true,
            message: 'Please verify your password!',
          },
        ]}
      >
        <Input.Password onChange={(e)=>setRepassword(e.target.value)} value={repassword} placeholder='Type your password again'/>
      </Form.Item></>:<></>}

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={Trylogin} style={{marginRight: 5}}>
          {register?'Submit':'Login'}
        </Button>
        <Button type="primary" htmlType="submit" onClick={()=>setRegister(!register)} style={{marginLeft: 5}}>
          {register?'Back To Login':'Register'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login
