import "antd/dist/antd.css"
import { useState } from 'react';
import {Typography} from 'antd'
import dataimg from "./data.png"
import Img_upload from "../img_upload";

const {Title, Text} = Typography

function Classification(props){
    return(
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Title>Image Classification</Title>
            <Title level = {2} style = {{textIndent: "2em" }}>Model<br/>
                <Title level = {4} style = {{paddingLeft: 80, paddingRight: "20%",textIndent: "2em"}}>MobileNet is a simple but efficient and not very computationally intensive convolutional neural networks for mobile vision applications. MobileNet is widely used in many real-world applications which includes object detection, fine-grained classifications, face attributes, and localization.</Title>
                <div>
                    <img src = {dataimg} style={{maxWidth: "70%", paddingTop: 10, paddingLeft: 20}}></img>
                </div>
            </Title>
            <Title level = {2} style = {{textIndent: "2em" }}>How to Use?</Title>
            <Title level = {2} style = {{textIndent: "2em" }}>Try!</Title>
            <div style={{paddingLeft: 80}}>
                <Img_upload/>
            </div>
        </div>
    )
}

export default Classification