import "antd/dist/antd.css"
import { useState,useEffect } from 'react';
import {Typography,Button,Divider,message} from 'antd'
import { Select } from 'antd';
import * as tf from "@tensorflow/tfjs";
import dataimg from "./data.jpg"
// import ClassTab from "./classtab"
import MpfUpload from "./mpfupload";
import MpfCamera from "./livecamera";
const { Option } = Select;
const {Title, Text} = Typography

function FaceMesh(props){

    const [method, setMethod] = useState("1")
    const Changemethod = (value)=>{
        setMethod(value)
    }

    return(
        <div className="site-layout-background" style={{ padding: 40, minHeight: 360 }}>
            <Title>Face Mesh</Title>
            <Divider/>
            <Title level = {2} >Model<br/>
                <Title level = {4} style = {{paddingLeft: 80, paddingRight: "20%",paddingTop: 30,textIndent: "2em",lineHeight:2}}>MediaPipe Face Mesh is a face geometry solution that estimates 468 3D face landmarks in real-time even on mobile devices. It employs machine learning (ML) to infer the 3D surface geometry, requiring only a single camera input without the need for a dedicated depth sensor. Utilizing lightweight model architectures throughout the pipeline, the solution delivers real-time performance critical for live experiences.</Title>
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
                {method === '1'?<MpfUpload></MpfUpload>:<MpfCamera></MpfCamera>}
            </div>
        </div>
    )
}

export default FaceMesh