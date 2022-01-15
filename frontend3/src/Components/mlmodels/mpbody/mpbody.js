import "antd/dist/antd.css"
import { useState,useEffect } from 'react';
import {Typography,Button,Divider,message} from 'antd'
import { Select } from 'antd';
import * as tf from "@tensorflow/tfjs";
import dataimg from "./data.png"
// import ClassTab from "./classtab"
import MpbUpload from "./mpbupload";
import MpbCamera from "./livecamera";
const { Option } = Select;
const {Title, Text} = Typography

function BodyPose(props){
    const user = props.user;
    const [method, setMethod] = useState("1")
    const Changemethod = (value)=>{
        setMethod(value)
    }

    return(
        <div className="site-layout-background" style={{ padding: 40, minHeight: 360 }}>
            <Title>Body Pose Estimation</Title>
            <Divider/>
            <Title level = {2} >Model<br/>
                <Title level = {4} style = {{paddingLeft: 80, paddingRight: "20%",paddingTop: 30,textIndent: "2em",lineHeight:2}}>PoseNet is a previous ML model for body poses estimation. Human pose estimation and tracking is a computer vision task that includes detecting, associating, and tracking semantic key points. The results can be used in activity recognition, motion capture and AR, training robots, and other applications in many fields. </Title>
                <div>
                    <img src = {dataimg} alt = "IMG" style={{maxWidth: "70%", paddingTop: 10, paddingLeft: 80}}></img>
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
                {method === '1'?<MpbUpload user={user}/>:<MpbCamera></MpbCamera>}
            </div>
        </div>
    )
}

export default BodyPose