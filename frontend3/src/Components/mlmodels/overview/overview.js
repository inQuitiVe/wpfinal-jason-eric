import "antd/dist/antd.css"
import { useState } from 'react';
import {Typography, Divider} from 'antd'
import in0 from './in_overview.jpg'
import in1 from './in_classification.png'
import in2 from './in_transfer.png'
import in3 from './in_hand.png'
import in4 from './in_pose.png'
import in5 from './in_face.png'

const {Title, Text} = Typography

function Overview(props){
    return(
        
        <div className="site-layout-background" style={{ padding: 40, minHeight: 360}}>
            <Title>Overview</Title>
            <Divider/>
            <div style={{display: 'flex', flexDirection: 'row', paddingRight: '20%', alignItems: 'center'}}>
                <Title level = {4} style = {{fontFamily:"monospace",paddingLeft: 40,textIndent: "2em",lineHeight:2}}>Machine learning is a very useful tool implemented in a great variety of fields. However, for a beginner or a person who is curious about the world of deep learning, it is still too far to fetch ; it's not an accessible tool for every one, and it is truly the reason why this website was born. </Title>
                <img src = {in0} style={{maxHeight: 200, marginLeft: 20}}></img>
            </div>
            <Title level = {4} style = {{fontFamily:"monospace",paddingLeft: 40, paddingRight: "20%",textIndent: "2em",lineHeight:2}}>This website collects five cool machine learning models, some of which are the state-of-arts. You can use them by simply following the "QuickStart" or the introduction in the page of each model. Hope all of you find it fun to embrace the gorgeous world of machine learning. </Title>
            <Title level = {2} >Introduction</Title>
            <Title level = {3} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 40}}>Image Classification</Title>
            <Title level = {5} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 60}}>Classifying images</Title>
            <div>
                <img src = {in1} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 60, marginBottom: 10}}></img>
            </div>
            <Title level = {3} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 40}}>Transfer LearningTraining the classifier with few images</Title>
            <Title level = {5} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 60}}>Training the classifier with few images</Title>
            <div>
                <img src = {in2} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 60, marginBottom: 10}}></img>
            </div>
            <Title level = {3} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 40}}>Hand Pose Detection</Title>
            <Title level = {5} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 60}}>All fingers joints detection</Title>
            <div>
                <img src = {in3} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 60, marginBottom: 10}}></img>
            </div>
            <Title level = {3} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 40}}>Body Pose EstimationPose detecting</Title>
            <Title level = {5} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 60}}>Body pose detecting</Title>
            <div>
                <img src = {in4} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 60, marginBottom: 10}}></img>
            </div>
            <Title level = {3} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 40}}>Face Mesh</Title>
            <Title level = {5} style = {{fontFamily: 'monospace', marginTop: 10, marginLeft: 60}}>Drawing face landmarks</Title>
            <div>
                <img src = {in5} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 60, marginBottom: 10}}></img>
            </div>
        </div>
    )
}

export default Overview