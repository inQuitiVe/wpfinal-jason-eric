import "antd/dist/antd.css"
import { useState } from 'react';
import {Typography, Divider} from 'antd'
import dataimg from "./data.png"
import Img_upload from "../img_upload";


const {Title, Text} = Typography

function Overview(props){
    return(
        <div className="site-layout-background" style={{ padding: 40, minHeight: 360}}>
            <Title>Overview</Title>
            <Divider/>
            <Title level = {2} >Model<br/>
                <Title level = {4} style = {{fontFamily:"monospace",paddingLeft: 40, paddingRight: "20%",paddingTop: 30,textIndent: "2em",lineHeight:2}}>MobileNet is a simple but efficient and not very computationally intensive convolutional neural networks for mobile vision applications. MobileNet is widely used in many real-world applications which includes object detection, fine-grained classifications, face attributes, and localization.</Title>
                <div>
                    <img src = {dataimg} alt = "IMG" style={{maxWidth: "70%", paddingTop: 10, paddingLeft: 40}}></img>
                </div>
            </Title>
            <Title level = {2} >How to Use?</Title>
            <Title level = {2} >Try!</Title>
            <div style={{paddingLeft: 80}}>
                <Img_upload/>
            </div>
        </div>
    )
}

export default Overview