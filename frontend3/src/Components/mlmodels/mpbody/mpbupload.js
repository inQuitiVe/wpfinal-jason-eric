import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import React, { useState,useEffect,useRef } from 'react';
import uploadicon from "./uploadicon.png"
import { Upload,Button,message } from 'antd';
// import * as mphands from '@mediapipe/hands/hands'
// import * as drawing_utils from '@mediapipe/drawing_utils/drawing_utils'
// import ImgCrop from 'antd-img-crop';
import * as tf from '@tensorflow/tfjs'
import * as posenet from '@tensorflow-models/posenet'
// import Webcam from 'react-webcam'
import {drawBody} from '../utilities'
import { useMutation } from "@apollo/client";
import { CREATE_FILE_MUTATION } from "../../../graphql";

const MpbUpload = (props) => {
    const user = props.user;
    const [CreateFile] = useMutation(CREATE_FILE_MUTATION);
    // const videoElement = document.getElementsById('input_video')[0];
    const imgElement = useRef();
    const canvasElement = useRef()
    // const  canvasCtx=  canvasElement.getContext('2d');
    const [model, setModel] = useState()
    const [modelready, setModelready] = useState(false)
    async function loadModel() {
        try {
          const model = await posenet.load();
          setModel(model);
          setModelready(true);
          console.log("setloadedModel");
          message.success("The Body Model is Ready!",1);
        } catch (err) {
          console.log(err);
          console.log("failed load model");
          setModelready(false)
        }
    }

    const uploadresult = async(url) => {
        CreateFile({
            variables:{
                class:"mpbody",
                num:1,
                image: [url],
                user: user,
            }
        })
    }

    useEffect(() => {
        tf.ready().then(() => {loadModel()});
    }, []);

    const Predict=async () => {
        message.success({ content: 'Predict!', duration: 1 })
        const targetImg = imgElement.current
        const imgwidth = imgElement.current.width
        const imgheight = imgElement.current.height
        const naturalwidth = targetImg.naturalWidth
        const naturalheight = targetImg.naturalHeight
        // console.log(imgwidth,imgheight)
        // console.log(targetImg.naturalWidth,targetImg.naturalHeight)
        // console.log('hi')
        const targetCanvas = canvasElement.current
        // webcamRef.current.video.videowidth = videowidth
        // webcamRef.current.video.videoheight = videoheight
        // canvasRef.current.width = videowidth
        // canvasRef.current.height = videoheight
        // // console.log(video.width,video.height)
        
        // console.log('hi2')
        

        const ctx = canvasElement.current.getContext('2d')
        // console.log(ctx)
        ctx.clearRect(
            0,
            0,
            canvasElement.current.width+500,
            canvasElement.current.height+500
            );
            // console.log(ctx)
        ctx.drawImage(targetImg,0,0,naturalwidth,naturalheight,0,0,imgwidth,imgheight)
        //console.log("============buffer=================") 
        //console.log(ctx.canvas.toDataURL());
        
        // console.log(ctx)
        const result = await model.estimateSinglePose(targetCanvas)
        // ctx.drawImage(video, 0, 0, video.width, video.height);
        //console.log(result)
        drawBody(result, ctx,640)
        uploadresult(ctx.canvas.toDataURL());
    }

    const [imgsrc, setImgsrc] = useState("")
    const [canpredict, setCanpredict] = useState(false)
    const Loadimage=(e)=>{
        const link = URL.createObjectURL(e.target.files[0])
        console.log(e.target.files[0])
        // const myimg = new Image()
        // var myImage=new Image();
        // myImage.src=link
        // myImage.onload=function(){
        //     myContext.drawImage(myImage,0,0,myCanvas.width,myCanvas.height);
        // };
        console.log("oerwe")
        // canvasElement.current.drawImage(link)
        setImgsrc(link)
        e.target.files = [e.target.files[0]]
        console.log("yse")
    }
    useEffect(()=>{
        if(!imgsrc)setCanpredict(true)
        else setCanpredict(false)
    },[imgsrc])

    return (
        <>
        <div /*style={{marginRight: 100}}*/>
        {imgsrc ?
        <>
        <img src = {imgsrc} ref={imgElement} style={{maxWidth: 400,maxHeight: 300}}/></>:
        <></>}
        <label htmlFor="file-upload" style={{marginTop: 50,marginBottom: 50,maxWidth: 60, display: "inline-block", padding: "6px 12px", cursor: "pointer"}}>
            <img src = {uploadicon} style={{maxWidth: "100%",}}></img>
        </label>
        <Button type="primary" disabled={canpredict} onClick={Predict}>Predict!</Button>
        <input id="file-upload" type="file" onChange={Loadimage} style={{visibility: "hidden"}}/>
        </div>
        <canvas className='output' width= {400} height={300} ref={canvasElement} style={{marginTop: 30}}></canvas></>
    );
};
export default MpbUpload