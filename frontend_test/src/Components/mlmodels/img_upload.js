import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import React, { useState } from 'react';
import uploadicon from "./uploadicon.png"
import { Upload } from 'antd';
// import ImgCrop from 'antd-img-crop';

const Img_upload = () => {
    const [imgsrc, setImgsrc] = useState("")
    const Loadimage=(e)=>{

        console.log(e.target.files[0])
        setImgsrc(URL.createObjectURL(e.target.files[0]))
        e.target.files = [e.target.files[0]]
    }

    return (
        <>
        {imgsrc ?<img src = {imgsrc} style={{maxWidth: "50%"}}/>:<></>}
        <label for="file-upload" style={{maxWidth: 60, display: "inline-block", padding: "6px 12px", cursor: "pointer"}}>
            <img src = {uploadicon} style={{maxWidth: "100%"}}></img>
        </label>
        <input id="file-upload" type="file" onChange={Loadimage} style={{visibility: "hidden"}}/>
        </>
    );
};
export default Img_upload