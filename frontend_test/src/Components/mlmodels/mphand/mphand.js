import "antd/dist/antd.css"
import { useState,useEffect } from 'react';
import {Typography,Button,Divider,message} from 'antd'
import { Select } from 'antd';
import * as tf from "@tensorflow/tfjs";
import dataimg from "./data.png"
// import ClassTab from "./classtab"
import MphUpload from "./mphupload";
import MphCamera from "./livecamera";
const { Option } = Select;
const {Title, Text} = Typography

function HandPose(props){
    const user = props.user;
    const [method, setMethod] = useState("1")
    const Changemethod = (value)=>{
        setMethod(value)
    }

    return(
        <div className="site-layout-background" style={{ paddingLeft: 40,paddingRight: 40,paddingTop: 60, minHeight: 360 }}>
            <Title>Hand Pose Detection</Title>
            <Divider/>
            <Title level = {2} >Model<br/>
                <Title level = {4} style = {{paddingLeft: 80, paddingRight: "20%",paddingTop: 30,textIndent: "2em",lineHeight:2}}>MediaPipe Hands is a high-fidelity hand and finger tracking solution. It employs machine learning (ML) to infer 21 3D landmarks of a hand from just a single frame. Whereas current state-of-the-art approaches rely primarily on powerful desktop environments for inference, MediaPipe Hands achieves real-time performance on a mobile phone, and even scales to multiple hands. </Title>
                <div>
                    <img src = {dataimg} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 80}}></img>
                </div>
            </Title>
            <Title level = {2} >How to Use?</Title>
            <Title level = {2} >Try!</Title>
            <div style={{display: "flex", paddingLeft: 80, alignItems: "center", marginBottom: 20}} >
                <Title level = {4}>Choose your source : </Title>
                <Select defaultValue={method} style={{ width: 160,marginLeft: 10,marginRight: 10 }} onChange={Changemethod}>
                    <Option value="1">Upload Image</Option>
                    <Option value="2">Live Camera</Option>
                </Select>
            </div>
            <div>
                {method === '1'?<MphUpload user={user}></MphUpload>:<MphCamera></MphCamera>}
            </div>
        </div>
    )
}

export default HandPose