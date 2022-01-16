import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import React, { useState,useEffect,useRef } from 'react';
import uploadicon from "./uploadicon.png"
import * as tf from '@tensorflow/tfjs'
import * as mobileNet from "@tensorflow-models/mobilenet"
import { Upload,Button,message } from 'antd';
import { useMutation } from "@apollo/client";
import { CREATE_FILE_MUTATION } from "../../../graphql";
import Classlist from "./classlist"
// import ImgCrop from 'antd-img-crop';

const Img_upload = (props) => {
    const user = props.user;
    const topclass = props.topclass;
    const [CreateFile] = useMutation(CREATE_FILE_MUTATION);
    const imgElement = useRef();
    const canvasElement = useRef()
    const [model, setModel] = useState()
    const [modelready, setModelready] = useState(false)
    const [result,setResult] = useState([])
    const [selectedRowKeys,setSelectedrowkeys] = useState([])
    const [url, seturl] = useState("")


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

    const uploadresult = async() => {
        console.log("============creating===========");
            CreateFile({
                variables:{
                    class:"classification",
                    num: parseInt(topclass,10),
                    image: [url],
                    user: user,
                    text: result[selectedRowKeys].classname,
                    prob: result[selectedRowKeys].probability
                }
            })
    }

    useEffect(() => {
        tf.ready().then(() => {loadModel()});
    }, []);

    const Predict=async()=>{
        message.success({ content: 'Predict!', duration: 1 })
        const targetImg = imgElement.current
        const imgwidth = imgElement.current.width
        const imgheight = imgElement.current.height
        const naturalwidth = targetImg.naturalWidth
        const naturalheight = targetImg.naturalHeight
        console.log(imgwidth,imgheight)
        console.log(targetImg.naturalWidth,targetImg.naturalHeight)
        const targetCanvas = canvasElement.current
        
        const ctx = canvasElement.current.getContext('2d')
        ctx.clearRect(
            0,
            0,
            canvasElement.current.width+500,
            canvasElement.current.height+500
            );
        ctx.drawImage(targetImg,0,0,naturalwidth,naturalheight,0,0,imgwidth,imgheight)
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
        
        seturl (ctx.canvas.toDataURL())



    }

    const [imgsrc, setImgsrc] = useState("")
    const [canpredict, setCanpredict] = useState(false)
    const Loadimage = async(e)=>{
        console.log(e.target.files[0])
        const url =  URL.createObjectURL(e.target.files[0])
        setImgsrc(url);

        e.target.files = [e.target.files[0]]
    }
    useEffect(()=>{
        if(!imgsrc)setCanpredict(true)
        else setCanpredict(false)
    },[imgsrc])

    return (
        <>
        <div style={{paddingLeft: 80, display: "flex", alignItems: "center"}}>
        <div /*style={{marginRight: 100}}*/>
        {imgsrc ?<img src = {imgsrc} id="target_img" ref={imgElement} style={{maxWidth: 400,maxHeight: 300}} />:<></>}
        <label htmlFor="file-upload" style={{marginTop: 50,marginBottom: 50,maxWidth: 60, display: "inline-block", padding: "6px 12px", cursor: "pointer"}}>
            <img src = {uploadicon} style={{maxWidth: "100%",}}></img>
        </label>
        <Button type="primary" disabled={canpredict} onClick={Predict}>Predict!</Button>
        <input id="file-upload" type="file" onChange={Loadimage} style={{visibility: "hidden"}}/>
        </div>
        <canvas className='output' width= {400} height={300} ref={canvasElement} style={{marginTop: 30, display:"none"}} ></canvas>
        </div>
        <Classlist result={result} selectedRowKeys={selectedRowKeys} setSelectedrowkeys={setSelectedrowkeys} uploadresult={uploadresult}/>
        </>);
};
export default Img_upload