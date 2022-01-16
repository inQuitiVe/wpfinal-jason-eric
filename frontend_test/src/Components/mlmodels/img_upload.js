import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import React, { useState,useEffect } from 'react';
import uploadicon from "./uploadicon.png"
import { Upload,Button } from 'antd';
import { useMutation } from "@apollo/client";
import { CREATE_FILE_MUTATION } from "../../graphql";
// import ImgCrop from 'antd-img-crop';

const Img_upload = (props) => {
    const [CreateFile] = useMutation(CREATE_FILE_MUTATION);
    const [imgsrc, setImgsrc] = useState("")
    const [canpredict, setCanpredict] = useState(false)
    

    const uploadimg = async(url) => {
        const arrayBuffer = await new Promise((resolve,reject)=>{
            const reader = new FileReader();
            reader.addEventListener('load',() => {
                resolve(reader.result);
            });
            reader.readAsArrayBuffer(url);
        });
        console.log(Array.from(new Uint8Array(arrayBuffer)));
        CreateFile({
            variables:{
                class:"1",
                num:1,
                image: [Array.from(new Uint8Array(arrayBuffer)),],
                user: "eric",
            }
        })

    }

    const Loadimage = async(e)=>{
        console.log(e.target.files[0])
        const url =  URL.createObjectURL(e.target.files[0])
        setImgsrc(url);
        uploadimg(e.target.files[0]);
        e.target.files = [e.target.files[0]]
    }
    useEffect(()=>{
        if(!imgsrc || props.modelready === false)setCanpredict(true)
        else setCanpredict(false)
    },[imgsrc,props.modelready])

    return (
        <div /*style={{marginRight: 100}}*/>
        {imgsrc ?<img src = {imgsrc} style={{maxWidth: "50%"}} id="target_img"/>:<></>}
        <label htmlFor="file-upload" style={{marginTop: 50,marginBottom: 50,maxWidth: 60, display: "inline-block", padding: "6px 12px", cursor: "pointer"}}>
            <img src = {uploadicon} style={{maxWidth: "100%",}}></img>
        </label>
        <Button type="primary" disabled={canpredict} onClick={props.Predict}>Predict!</Button>
        <input id="file-upload" type="file" onChange={Loadimage} style={{visibility: "hidden"}}/>
        </div>
    );
};
export default Img_upload