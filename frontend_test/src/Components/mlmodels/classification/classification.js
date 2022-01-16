import "antd/dist/antd.css"
import { useState,useEffect } from 'react';
import {Typography,Button,Divider} from 'antd'
import dataimg from "./data.png"
import ImgUpload from "../img_upload";
import { Select } from 'antd';
import Classlist from "./classlist"
import * as mobileNet from "@tensorflow-models/mobilenet"
import * as tf from "@tensorflow/tfjs";
import use1 from './class1-1.png'
import use2 from './class2-1.png'
const { Option } = Select;
const {Title, Text} = Typography

function Classification(props){
    const [selectedRowKeys,setSelectedrowkeys] = useState([])
    const [topclass, setTopclass] = useState("3")
    const Selecttopclass = (value)=>{
        setTopclass(value)
    }
    const [model, setModel] = useState()
    const [modelready, setModelready] = useState(false)
    const [result,setResult] = useState([])
    async function loadModel() {
        try {
          const model = await mobileNet.load();
          setModel(model);
          setModelready(true)
          console.log("setloadedModel");
        } catch (err) {
          console.log(err);
          console.log("failed load model");
          setModelready(false)
        }
    }

    useEffect(() => {
        tf.ready().then(() => {loadModel()});
    }, []);

    const Predict=async()=>{
        const predictions = await model.classify(document.getElementById("target_img"),parseInt(topclass,10))
        // console.log(predictions[0].className)
        // console.log(predictions[0].probability)
        let tmp = []
        for (let i=0;i<predictions.length;i++){
            // console.log(i)
            // console.log(tmp)
            tmp = [...tmp,{key: `${i+1}`,classname: predictions[i].className, probability: predictions[i].probability}]
        }
        setResult(tmp)
        setSelectedrowkeys([])
        // return {classes: predictions[0].className}
    }

    return(
        <div className="site-layout-background" style={{ paddingLeft: 40,paddingRight: 40,paddingTop: 60, minHeight: 360 }}>
            <Title>Image Classification</Title>
            <Divider/>
            <Title level = {2} >Model<br/>
                <Title level = {4} style = {{paddingLeft: 80, paddingRight: "20%",paddingTop: 30,textIndent: "2em",lineHeight:2}}>MobileNet is a simple but efficient and not very computationally intensive convolutional neural networks for mobile vision applications. MobileNet is widely used in many real-world applications which includes object detection, fine-grained classifications, face attributes, and localization.</Title>
                <div>
                    <img src = {dataimg} alt = "IMG" style={{maxWidth: "70%", paddingTop: 10, paddingLeft: 80}}></img>
                </div>
            </Title>
            <Title level = {2} >How to Use?</Title>
            <div>
                <img src = {use1} alt = "IMG" style={{maxWidth: "70%", marginTop: 10, marginLeft: 80, border: '0.5px solid black'}}></img>
            </div>
            <div>
                <img src = {use2} alt = "IMG" style={{maxWidth: "70%", marginTop: 10, marginLeft: 80, border: '0.5px solid black'}}></img>
            </div>
            <Title level = {2} >Try!</Title>
            <div style={{display: "flex", paddingLeft: 80, alignItems: "center"}} >
                <Title level = {4}>Get top</Title>
                <Select defaultValue={topclass} style={{ width: 120,marginLeft: 15,marginRight: 15 }} onChange={Selecttopclass}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                </Select>
                <Title level = {4}>predictions. (Return the class names with the largest {topclass} likelihood.)</Title>
            </div>
            <div style={{paddingLeft: 80, display: "flex", alignItems: "center"}}>
                <ImgUpload modelready={modelready} Predict={Predict}/>
            </div>
            <Classlist result={result} selectedRowKeys={selectedRowKeys} setSelectedrowkeys={setSelectedrowkeys}/>
        </div>
    )
}

export default Classification