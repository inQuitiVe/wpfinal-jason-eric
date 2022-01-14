import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import React, { useState,useEffect,useRef } from 'react';
import { Button,message } from 'antd';
// import * as mphands from '@mediapipe/hands/hands'
// import * as drawing_utils from '@mediapipe/drawing_utils/drawing_utils'
import * as tf from '@tensorflow/tfjs'
import * as facemesh from '@tensorflow-models/facemesh'
import Webcam from 'react-webcam'
import {drawFace} from '../utilities'

const MpfCamera = (props) => {
    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    const [intervalId,setIntervalId] = useState(0)

    const [model, setModel] = useState()
    const [modelready, setModelready] = useState(false)
    async function loadModel() {
        try {
          const model = await facemesh.load();
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

    const handleClick = () => {
        if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(0);
        message.warning({ content: 'Stop', duration: 1 })
        return;
        }
        message.success({ content: 'Start!', duration: 1 })
        const video = webcamRef.current.video
        const videowidth = webcamRef.current.video.width
        const videoheight = webcamRef.current.video.height
        console.log(videowidth,videoheight)
        webcamRef.current.video.videowidth = videowidth
        webcamRef.current.video.videoheight = videoheight
        canvasRef.current.width = videowidth
        canvasRef.current.height = videoheight

        const newIntervalId = setInterval(()=>{detectPose(video)}, 100);
        setIntervalId(newIntervalId);
    };

    const detectPose=async(video)=>{
        if(webcamRef.current && webcamRef.current.video.readyState===4){
            // console.log(video.width,video.height)
            const result = await model.estimateFaces(video)
            // console.log(result)
            const ctx = canvasRef.current.getContext('2d')
            ctx.clearRect(
                0,
                0,
                webcamRef.current.video.videoWidth+500,
                webcamRef.current.video.videoHeight+500
              );
            // ctx.drawImage(video, 0, 0, video.width, video.height);
            // console.log(ctx)
            drawFace(result, ctx,video.width)
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            {/* <canvas ref={canvasRef} style={{width: 400 ,height: 300,position:'absolute',background: 'transparent',zIndex: "999"}}></canvas>
            <Webcam ref={webcamRef} audio={false} style={{width: 400 ,height: 300}}></Webcam> */}
            <div style={{ position: 'absolute',zIndex: "999" }}>
            <canvas
              ref={canvasRef}
            //   width={videoWidth}
            //   height={videoHeight}
              style={{ backgroundColor: "transparent" ,width: 400 ,height: 300}}
            />
          </div>
          <div /*style={{ position: "absolute" }}*/>
            <Webcam
              audio={false}
              ref={webcamRef}
              width= {400}
              height={300}
            //   style={{width: 400 ,height: 300}}
              // screenshotQuality={1}
              // screenshotFormat="image/jpeg"
              // videoConstraints={videoConstraints}
            />
          </div>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", marginLeft: 20}}>
                <Button type="primary" onClick={handleClick} disabled={modelready===false}>{intervalId?'Stop':"Start"}</Button>
            </div>
            {/* <canvas ref={canvasRef} style={{width: 400 ,height: 300,background: 'transparent',zIndex: "999"}}></canvas> */}
        </div>
    );
};
export default MpfCamera