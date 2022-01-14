import "antd/dist/antd.css"
import { useState,useEffect } from 'react';
import {Typography,Button,Divider,message} from 'antd'
import { Select } from 'antd';
import * as mobileNet from "@tensorflow-models/mobilenet"
import * as tf from "@tensorflow/tfjs";
import dataimg from "./data1.jpeg"
import ClassTab from "./classtab"
import * as knnClassifier from "@tensorflow-models/knn-classifier"
import use1 from './transfer1-1.png'
import use2 from './transfer2-1.png'
const { Option } = Select;
const {Title, Text} = Typography

function TransferKnn(props){
    const [tabname1, setTabname1] = useState('A')
    const [tabname2, setTabname2] = useState('B')
    const [tabname3, setTabname3] = useState('C')
    const [classimg1, setClassimg1] = useState([])
    const [classimg2, setClassimg2] = useState([])
    const [classimg3, setClassimg3] = useState([])
    const [currentclass, setCurrentclass] = useState('1')
    // const [classifier, setClassifier] = useState()
    // const [webcam, setWebcam] = useState()
    const [intervalId, setIntervalId] = useState(0);
    const handleClick = (classifier,webcam,key) => {
        if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        message.warning({ content: 'Stop', key, duration: 1 })
        return;
        }
        message.success({ content: 'Start!', key, duration: 1 })
        const newIntervalId = setInterval(()=>Capturepredict(classifier,webcam), 1000);
        setIntervalId(newIntervalId);
    };
    const [k, setK] = useState('3')
    const Selectk = (value)=>{
        setK(value)
    }
    const [model, setModel] = useState()
    const [modelready, setModelready] = useState(false)
    const [result,setResult] = useState('')
    const [probability, setProbability] = useState(0.0)
    async function loadModel() {
        try {
          const model = await mobileNet.load();
          setModel(model);
          setModelready(true)
          console.log("setloadedModel");
          message.success("The Model is Ready!",1)
        } catch (err) {
          console.log(err);
          console.log("failed load model");
          setModelready(false)
        }
    }

    useEffect(() => {
        tf.ready().then(() => {loadModel()});
    }, []);


    const Predict=async(webcam,key)=>{
        const classifier = await knnClassifier.create();
        for(let i=0;i<classimg1.length;i++){
            classifier.addExample(model.infer(classimg1[i], true), 0);
        }
        for(let i=0;i<classimg2.length;i++){
            classifier.addExample(model.infer(classimg2[i], true), 1);
        }
        for(let i=0;i<classimg3.length;i++){
            classifier.addExample(model.infer(classimg3[i], true), 2);
        }
        // await setClassifier(classifier)
        // await setWebcam(webcam)
        
        handleClick(classifier,webcam,key)
        // setTimeout(() => Capturepredict(classifier,webcam), 500)
    }

    // setInterval(() => Capturepredict(classifier,webcam), 20000)
    const Capturepredict=async(classifier,webcam)=>{
            if (classifier.getNumClasses() > 0) {
            const img = await webcam.capture();
    
            // Get the activation from mobilenet from the webcam.
            const activation = model.infer(img, 'conv_preds');
            // Get the most likely class and confidence from the classifier module.
            const result = await classifier.predictClass(activation);
    
            const classes = [tabname1, tabname2, tabname3];
            console.log(`
            prediction: ${classes[result.label]}\n
            probability: ${result.confidences[result.label]}
            `);
            setResult(classes[result.label])
            setProbability(result.confidences[result.label])
    
            // Dispose the tensor to release the memory.
            img.dispose();
            }
        
            await tf.nextFrame();
    }

    const Changename=(value)=>{
        if(currentclass==='1' && value)setTabname1(value)
        else if(currentclass==='2' && value)setTabname2(value)
        else if(currentclass==='3' && value)setTabname3(value)
    }

    return(
        <div className="site-layout-background" style={{ padding: 40, minHeight: 360 }}>
            <Title>Transfer Learning</Title>
            <Divider/>
            <Title level = {2} >Model<br/>
                <Title level = {4} style = {{paddingLeft: 80, paddingRight: "20%",paddingTop: 30,textIndent: "2em",lineHeight:2}}>K-Nearest Neighbors algorithm (or KNN) is one of the most used learning algorithms due to its simplicity. It stores all the available data and classifies a new data point based on the similarity measure (e.g., distance functions). "K" means the classification result is voted by K nearest data points. In this case, we utilizes MobileNet as the pretrained model.</Title>
                <div>
                    <img src = {dataimg} alt = "IMG" style={{maxWidth: "80%", paddingTop: 10, paddingLeft: 80}}></img>
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
            <div style={{display: "flex", paddingLeft: 80, alignItems: "center", marginBottom: 20}} >
                <Title level = {4}>Assign K : K =</Title>
                <Select defaultValue={k} style={{ width: 120,marginLeft: 10,marginRight: 10 }} onChange={Selectk}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                </Select>
                <Title level = {4}>(Take {k} nearest neighbors of the new data into account.)</Title>
            </div>
            <div style={{paddingLeft: 80}}>
                <ClassTab currentclass={currentclass} setCurrentclass={setCurrentclass} 
                tabname1={tabname1} tabname2={tabname2} tabname3={tabname3}
                Changename={Changename}
                classimg1={classimg1} setClassimg1={setClassimg1}
                classimg2={classimg2} setClassimg2={setClassimg2}
                classimg3={classimg3} setClassimg3={setClassimg3} Predict={Predict}
                result={result} probability={probability} intervalId={intervalId}></ClassTab>
            </div>
        </div>
    )
}

export default TransferKnn